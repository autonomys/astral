import { randomUUID } from "crypto";
import { Deposit, DepositStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateNominator } from "./nominator";
import { getOrCreateOperator } from "./operator";

export const createDeposit = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Deposit>
): Deposit => {
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

  const deposit = new Deposit({
    id: randomUUID(),
    account: "st",
    amount: BigInt(0),
    storageFeeDeposit: BigInt(0),
    status: DepositStatus.PENDING,
    ...props,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
  });

  return deposit;
};
