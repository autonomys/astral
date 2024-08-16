import {
  NominatorPendingAction,
  NominatorStatus,
  WithdrawalStatus,
} from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { getBlockNumber, getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processOperatorUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId } = event.args;
  const operatorIdNum = Number(operatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const domain = getOrCreateDomain(cache, block, operator.domainId);
  const account = getOrCreateAccount(cache, block, address);

  operator.updatedAt = blockNumber;
  cache.operators.set(operator.id, operator);

  Array.from(cache.nominators.values())
    .filter(
      (n) =>
        (n.status === NominatorStatus.PENDING ||
          n.status === NominatorStatus.STAKED) &&
        n.operatorId === operator.id
    )
    .forEach((n) => {
      n.status = NominatorStatus.PENDING;
      n.pendingAction = NominatorPendingAction.READY_TO_UNLOCK_ALL_FUNDS;
      n.updatedAt = blockNumber;
      cache.nominators.set(n.id, n);
    });

  Array.from(cache.withdrawals.values())
    .filter(
      (w) =>
        w.status === WithdrawalStatus.PENDING_OPERATOR &&
        w.domainId === domain.id
    )
    .forEach((w) => {
      w.status = WithdrawalStatus.READY;
      w.readyAt = blockNumber;
      w.updatedAt = blockNumber;
      cache.withdrawals.set(w.id, w);
    });

  cache.isModified = true;

  return cache;
}

export function processFundsUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId, amount } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const amountBigInt = BigInt(amount);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const domain = getOrCreateDomain(cache, block, operator.domainId);
  const account = getOrCreateAccount(cache, block, address);

  Array.from(cache.withdrawals.values())
    .filter(
      (w) =>
        w.status === WithdrawalStatus.PENDING_LOCK &&
        w.operatorId === operator.id &&
        w.accountId === account.id
    )
    .forEach((w) => {
      w.status = WithdrawalStatus.WITHDRAW;
      w.unlockedAt = blockNumber;
      w.updatedAt = blockNumber;
      cache.withdrawals.set(w.id, w);
    });

  cache.isModified = true;

  return cache;
}

export function processNominatedStakedUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId, unlockedAmount } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const unlockedAmountBigInt = BigInt(unlockedAmount);
  let unlockedAmountBigIntLeft = unlockedAmountBigInt;

  const operator = getOrCreateOperator(cache, block, operatorId);
  const domain = getOrCreateDomain(cache, block, operator.domainId);
  const account = getOrCreateAccount(cache, block, address);

  const userOpenWithdrawals = Array.from(cache.withdrawals.values()).filter(
    (w) =>
      w.status === WithdrawalStatus.PENDING_LOCK &&
      w.operatorId === operator.id &&
      w.accountId === account.id
  );

  if (userOpenWithdrawals.length === 1) {
    const w = userOpenWithdrawals[0];
    w.status = WithdrawalStatus.WITHDRAW;
    w.unlockedAmount = unlockedAmountBigInt;
    w.unlockedAt = blockNumber;
    w.updatedAt = blockNumber;
    cache.withdrawals.set(w.id, w);
  } else {
    userOpenWithdrawals.forEach((w) => {
      w.status = WithdrawalStatus.WITHDRAW;
      if (unlockedAmountBigIntLeft > w.estimatedAmount) {
        w.unlockedAmount = w.estimatedAmount;
        unlockedAmountBigIntLeft -= w.estimatedAmount;
      } else {
        w.unlockedAmount = unlockedAmountBigIntLeft;
        unlockedAmountBigIntLeft = BigInt(0);
      }
      w.unlockedAt = blockNumber;
      w.updatedAt = blockNumber;
      cache.withdrawals.set(w.id, w);
    });
  }

  cache.isModified = true;

  return cache;
}

export function processNominatorUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);

  cache.isModified = true;

  return cache;
}

export function processStorageFeeUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId, storageFee } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const storageFeeBigInt = BigInt(storageFee);

  cache.isModified = true;

  return cache;
}
