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
    accountId: "",
    domainId: "",
    operatorId: "",
    nominatorId: "",
    shares: BigInt(0),
    status: WithdrawalStatus.PENDING,
    epochWithdrawalRequestedAt: 0,
    domainBlockNumberWithdrawalRequestedAt: 0,
    unlockExtrinsicHash: "",
    readyAt: 0,
    unlockedAt: 0,
    ...props,
    timestamp: getTimestamp(block),
    withdrawExtrinsicHash: extrinsic.hash,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });
