import { Withdrawal, WithdrawalStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getTimestamp, withdrawalUID } from "../utils";

export const createWithdrawal = (
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operatorId: number | string,
  accountId: string,
  withdrawalIndex: number | string,
  props: Partial<Withdrawal>
): Withdrawal =>
  new Withdrawal({
    id: withdrawalUID(operatorId, accountId, withdrawalIndex),
    accountId: accountId,
    domainId: "",
    operatorId: operatorId.toString(),
    nominatorId: "",
    shares: BigInt(0),
    estimatedAmount: BigInt(0),
    unlockedAmount: BigInt(0),
    unlockedStorageFee: BigInt(0),
    totalAmount: BigInt(0),
    status: WithdrawalStatus.PENDING_LOCK,
    timestamp: getTimestamp(block),
    withdrawExtrinsicHash: extrinsic.hash.toString(),
    unlockExtrinsicHash: "",
    epochWithdrawalRequestedAt: 0,
    domainBlockNumberWithdrawalRequestedAt: 0,
    createdAt: getBlockNumber(block),
    readyAt: 0,
    unlockedAt: 0,
    updatedAt: getBlockNumber(block),
    ...props,
  });
