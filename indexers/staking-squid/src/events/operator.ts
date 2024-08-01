import { NominatorStatus, OperatorStatus } from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  createOperatorRewardEvent,
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
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const operatorId = Number(event.args.operatorId);

  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  const amount = extrinsic.call
    ? BigInt(extrinsic.call.args.amount)
    : BigInt(0);
  const storageFeeDeposit = storageFeeDepositedEvent
    ? BigInt(storageFeeDepositedEvent.args.amount)
    : BigInt(0);

  const account = getOrCreateAccount(cache, block, address);
  cache.accounts.set(account.id, account);

  const operator = getOrCreateOperator(cache, block, operatorId, {});
  cache.operators.set(operator.id, operator);

  const domain = getOrCreateDomain(cache, block, operator.domainId);
  cache.domains.set(domain.id, domain);

  const nominator = getOrCreateNominator(cache, block, extrinsic, operatorId, {
    domainId: domain.id,
    accountId: account.id,
    operatorId: operator.id,
  });
  cache.nominators.set(nominator.id, nominator);

  const deposit = createDeposit(block, extrinsic, {
    domainId: domain.id,
    accountId: account.id,
    operatorId: operator.id,
    nominatorId: nominator.id,
    amount,
    storageFeeDeposit,
  });
  cache.deposits.set(deposit.id, deposit);

  operator.totalDeposits += amount;
  operator.updatedAt = blockNumber;

  cache.operators.set(operator.id, operator);

  nominator.totalDeposits += amount;
  nominator.updatedAt = blockNumber;

  cache.nominators.set(nominator.id, nominator);

  domain.totalDeposits += amount;
  domain.updatedAt = blockNumber;

  cache.domains.set(domain.id, domain);

  account.totalDeposits += amount;
  account.updatedAt = blockNumber;

  cache.accounts.set(account.id, account);

  return cache;
}

export function processOperatorSlashedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = getOrCreateOperator(cache, block, operatorId);

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  const nominators = Array.from(cache.nominators.values()).filter(
    (n) => n.operatorId === operator.id
  );
  for (const nominator of nominators) {
    nominator.status = NominatorStatus.SLASHED;
    nominator.updatedAt = getBlockNumber(block);

    cache.nominators.set(nominator.id, nominator);
  }

  return cache;
}

export function processOperatorTaxCollectedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const blockNumber = getBlockNumber(block);
  const operatorId = Number(event.args.operatorId);
  const tax = BigInt(event.args.tax);

  const operator = getOrCreateOperator(cache, block, operatorId);
  cache.operators.set(operator.id, operator);

  const account = getOrCreateAccount(cache, block, operator.accountId);
  cache.accounts.set(account.id, account);

  const domain = getOrCreateDomain(cache, block, operator.domainId);
  cache.domains.set(domain.id, domain);

  operator.totalTaxCollected += tax;
  operator.updatedAt = blockNumber;

  cache.operators.set(operator.id, operator);

  account.totalTaxCollected += tax;
  account.updatedAt = blockNumber;

  cache.accounts.set(account.id, account);

  domain.totalTaxCollected += tax;

  domain.updatedAt = blockNumber;

  cache.domains.set(domain.id, domain);

  return cache;
}

export function processOperatorRewardedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const amount = BigInt(event.args.reward);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const domain = getOrCreateDomain(cache, block, operator.domainId);

  operator.totalRewardsCollected += amount;
  cache.operators.set(operator.id, operator);

  domain.totalRewardsCollected += amount;
  cache.domains.set(domain.id, domain);

  const operatorRewardedEvent = createOperatorRewardEvent(block, extrinsic, {
    operatorId: operator.id,
    domainId: operator.domainId,
    amount,
  });
  cache.operatorRewardedEvents.set(
    operatorRewardedEvent.id,
    operatorRewardedEvent
  );

  return cache;
}
