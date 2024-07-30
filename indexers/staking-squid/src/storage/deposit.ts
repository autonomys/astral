import { randomUUID } from "crypto";
import { Deposit, DepositStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateAccount } from "./account";
import { getOrCreateDomain } from "./domain";
import { getOrCreateNominator } from "./nominator";
import { getOrCreateOperator } from "./operator";

export const createDeposit = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Deposit>
): Deposit => {
  const address = getCallSigner(extrinsic.call);
  if (!props.account)
    props.account = props.account = getOrCreateAccount(cache, block, address);
  if (!props.domain) props.domain = getOrCreateDomain(cache, block, 0);

  if (!props.operator)
    props.operator = getOrCreateOperator(cache, block, extrinsic, 0);
  if (!props.nominator)
    props.nominator = getOrCreateNominator(cache, block, extrinsic, 0);

  const deposit = new Deposit({
    id: randomUUID(),
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
