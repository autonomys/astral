import {
  NominatorPendingAction,
  NominatorStatus,
  OperatorStatus,
  WithdrawalStatus,
} from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  createRewardEvent,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { getBlockNumber, getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processOperatorNominatedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId } = event.args;
  const operatorIdNum = Number(operatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);

  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );
  const operatorNominatedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorNominated.name
  );

  const amount = BigInt(operatorNominatedEvent?.args.amount ?? 0);
  const storageFeeDeposit = BigInt(storageFeeDepositedEvent?.args.amount ?? 0);
  const totalAmount = BigInt(amount + storageFeeDeposit);

  const account = getOrCreateAccount(cache, block, address);
  const operator = getOrCreateOperator(cache, block, operatorIdNum, {});
  const domain = getOrCreateDomain(cache, block, operator.domainId);

  const nominator = getOrCreateNominator(
    cache,
    block,
    extrinsic,
    operatorIdNum,
    {
      domainId: domain.id,
      accountId: account.id,
      operatorId: operator.id,
    }
  );

  const deposit = createDeposit(
    block,
    extrinsic,
    operator.id,
    account.id,
    nominator.totalDepositsCount,
    {
      domainId: domain.id,
      accountId: account.id,
      operatorId: operator.id,
      nominatorId: nominator.id,
      amount,
      storageFeeDeposit,
      totalAmount,
      epochDepositedAt: domain.completedEpoch ?? 0,
      domainBlockNumberDepositedAt: domain.lastDomainBlockNumber ?? 0,
    }
  );

  operator.totalDeposits += totalAmount;
  operator.updatedAt = blockNumber;
  cache.operators.set(operator.id, operator);

  if (nominator.totalDepositsCount === 0) {
    nominator.pendingAction = NominatorPendingAction.PENDING_EPOCH_CHANGE;
  }
  nominator.totalDeposits += totalAmount;
  nominator.totalDepositsCount++;
  nominator.updatedAt = blockNumber;
  cache.nominators.set(nominator.id, nominator);

  domain.totalDeposits += totalAmount;
  domain.updatedAt = blockNumber;
  cache.domains.set(domain.id, domain);

  account.totalDeposits += totalAmount;
  account.updatedAt = blockNumber;
  cache.accounts.set(account.id, account);

  cache.deposits.set(deposit.id, deposit);

  cache.isModified = true;

  return cache;
}

export function processOperatorSlashedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId } = event.args;
  const blockNumber = getBlockNumber(block);

  const operator = getOrCreateOperator(cache, block, operatorId);

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = blockNumber;
  cache.operators.set(operator.id, operator);

  Array.from(cache.nominators.values())
    .filter((n) => n.operatorId === operator.id)
    .forEach((n) => {
      n.status = NominatorStatus.SLASHED;
      n.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
      n.updatedAt = blockNumber;
      cache.nominators.set(n.id, n);
    });

  Array.from(cache.withdrawals.values())
    .filter(
      (w) =>
        (w.status === WithdrawalStatus.PENDING_LOCK ||
          w.status === WithdrawalStatus.PENDING_OPERATOR ||
          w.status === WithdrawalStatus.READY) &&
        w.operatorId === operator.id
    )
    .forEach((w) => {
      w.status = WithdrawalStatus.SLASHED;
      w.updatedAt = blockNumber;
      cache.withdrawals.set(w.id, w);
    });

  cache.isModified = true;

  return cache;
}

export function processOperatorTaxCollectedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, tax } = event.args;
  const blockNumber = getBlockNumber(block);
  const taxAmount = BigInt(tax);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const account = getOrCreateAccount(cache, block, operator.accountId);
  const domain = getOrCreateDomain(cache, block, operator.domainId);

  operator.totalTaxCollected += taxAmount;
  operator.updatedAt = blockNumber;
  cache.operators.set(operator.id, operator);

  account.totalTaxCollected += taxAmount;
  account.updatedAt = blockNumber;
  cache.accounts.set(account.id, account);

  domain.totalTaxCollected += taxAmount;
  domain.updatedAt = blockNumber;
  cache.domains.set(domain.id, domain);

  cache.isModified = true;

  return cache;
}

export function processOperatorRewardedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, reward } = event.args;
  const amount = BigInt(reward);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const domain = getOrCreateDomain(cache, block, operator.domainId);

  operator.totalRewardsCollected += amount;
  cache.operators.set(operator.id, operator);

  domain.totalRewardsCollected += amount;
  cache.domains.set(domain.id, domain);

  const operatorRewardedEvent = createRewardEvent(block, extrinsic, {
    operatorId: operator.id,
    domainId: operator.domainId,
    amount,
  });
  cache.operatorRewardedEvents.set(
    operatorRewardedEvent.id,
    operatorRewardedEvent
  );

  cache.isModified = true;

  return cache;
}
