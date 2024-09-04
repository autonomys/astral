import {
  DepositStatus,
  NominatorPendingAction,
  NominatorStatus,
  OperatorPendingAction,
  WithdrawalStatus,
} from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateNominator,
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

  operator.pendingAction = OperatorPendingAction.NO_ACTION_REQUIRED;
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
  const nominator = getOrCreateNominator(cache, block, extrinsic, operatorId);

  Array.from(cache.withdrawals.values())
    .filter(
      (w) =>
        w.status === WithdrawalStatus.PENDING_LOCK &&
        w.operatorId === operator.id &&
        w.accountId === account.id
    )
    .forEach((w) => {
      w.status = WithdrawalStatus.WITHDRAW;
      w.unlockedAmount = amountBigInt;
      w.unlockedAt = blockNumber;
      w.updatedAt = blockNumber;
      cache.withdrawals.set(w.id, w);
    });

  let amountToWithdraw = amountBigInt;
  Array.from(cache.deposits.values())
    .filter(
      (d) =>
        d.status === DepositStatus.DEPOSITED &&
        d.operatorId === operator.id &&
        d.accountId === account.id
    )
    .forEach((d) => {
      if (amountToWithdraw > 0) {
        if (amountToWithdraw > d.totalAmount) {
          amountToWithdraw -= d.totalAmount;
          d.totalWithdrawn = d.totalAmount;
          d.status = DepositStatus.WITHDRAWN;
        } else {
          d.totalWithdrawn = amountToWithdraw;
          d.status = DepositStatus.PARTIALLY_WITHDRAWN;
          amountToWithdraw = BigInt(0);
        }
        d.updatedAt = blockNumber;
        cache.deposits.set(d.id, d);
      }
    });

  domain.totalWithdrawals += amountBigInt;
  cache.domains.set(domain.id, domain);

  account.totalWithdrawals += amountBigInt;
  cache.accounts.set(account.id, account);

  operator.totalWithdrawals += amountBigInt;
  cache.operators.set(operator.id, operator);

  nominator.totalWithdrawals += amountBigInt;
  nominator.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
  cache.nominators.set(nominator.id, nominator);

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
  const nominator = getOrCreateNominator(cache, block, extrinsic, operatorId);
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

  let amountToWithdraw = unlockedAmountBigInt;
  Array.from(cache.deposits.values())
    .filter(
      (d) =>
        d.status === DepositStatus.DEPOSITED &&
        d.operatorId === operator.id &&
        d.accountId === account.id
    )
    .forEach((d) => {
      if (amountToWithdraw > 0) {
        if (amountToWithdraw > d.totalAmount) {
          amountToWithdraw -= d.totalAmount;
          d.totalWithdrawn = d.totalAmount;
          d.status = DepositStatus.WITHDRAWN;
        } else {
          d.totalWithdrawn = amountToWithdraw;
          d.status = DepositStatus.PARTIALLY_WITHDRAWN;
          amountToWithdraw = BigInt(0);
        }
        d.updatedAt = blockNumber;
        cache.deposits.set(d.id, d);
      }
    });

  domain.totalWithdrawals += unlockedAmountBigInt;
  cache.domains.set(domain.id, domain);

  account.totalWithdrawals += unlockedAmountBigInt;
  cache.accounts.set(account.id, account);

  operator.totalWithdrawals += unlockedAmountBigInt;
  cache.operators.set(operator.id, operator);

  nominator.totalWithdrawals += unlockedAmountBigInt;
  nominator.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
  cache.nominators.set(nominator.id, nominator);

  cache.isModified = true;

  return cache;
}
