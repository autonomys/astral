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
    amount: BigInt(0),
    storageFeeDeposit: BigInt(0),
    status: DepositStatus.PENDING,
    epochDepositedAt: 0,
    domainBlockNumberDepositedAt: 0,
    stakedAt: 0,
    ...props,
    timestamp: getTimestamp(block),
    extrinsicHash: extrinsic.hash,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });
