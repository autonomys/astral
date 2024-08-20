import { Deposit, DepositStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { depositUID, getBlockNumber, getTimestamp } from "../utils";

export const createDeposit = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operatorId: number | string,
  accountId: string,
  depositIndex: number | string,
  props: Partial<Deposit>
): Deposit =>
  new Deposit({
    id: depositUID(operatorId, accountId, depositIndex),
    accountId: accountId,
    domainId: "",
    operatorId: operatorId.toString(),
    nominatorId: "",
    amount: BigInt(0),
    storageFeeDeposit: BigInt(0),
    status: DepositStatus.PENDING,
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash.toString(),
    epochDepositedAt: 0,
    domainBlockNumberDepositedAt: 0,
    createdAt: getBlockNumber(block),
    stakedAt: 0,
    updatedAt: getBlockNumber(block),
    ...props,
  });
