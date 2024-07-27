import { randomUUID } from "crypto";
import { Withdrawal, WithdrawalStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateNominator } from "./nominator";
import { getOrCreateOperator } from "./operator";

export const createWithdrawal = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Withdrawal>
): Withdrawal => {
  if (!props.account) props.account = getCallSigner(extrinsic.call);
  if (!props.operator) props.operator = getOrCreateOperator(cache, block, 0);
  if (!props.domain) props.domain = props.operator.domain;
  if (!props.nominator && props.operator)
    props.nominator = getOrCreateNominator(
      cache,
      block,
      extrinsic,
      props.operator
    );

  const withdrawal = new Withdrawal({
    id: randomUUID(),
    account: "st",
    shares: BigInt(0),
    status: WithdrawalStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
  });

  return withdrawal;
};
