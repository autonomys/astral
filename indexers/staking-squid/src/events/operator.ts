import { NominatorStatus, OperatorStatus } from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { appendOrArray, getBlockNumber, getCallSigner } from "../utils";
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
  const domainId = Number(extrinsic.call?.args.domainId);

  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  const shares = extrinsic.call
    ? BigInt(extrinsic.call.args.shares)
    : BigInt(0);
  const amount = extrinsic.call
    ? BigInt(extrinsic.call.args.amount)
    : BigInt(0);
  const storageFeeDeposit = storageFeeDepositedEvent
    ? BigInt(storageFeeDepositedEvent.args.amount)
    : BigInt(0);

  const account = getOrCreateAccount(cache, block, address);
  const domain = getOrCreateDomain(cache, block, domainId);

  const operator = getOrCreateOperator(cache, block, extrinsic, operatorId, {
    account,
  });
  const nominator = getOrCreateNominator(cache, block, extrinsic, operator, {
    account,
    shares,
  });
  const deposit = createDeposit(cache, block, extrinsic, {
    account,
    operator,
    nominator,
    amount,
    storageFeeDeposit,
  });
  cache.deposits.set(deposit.id, deposit);

  operator.totalDeposits += deposit.amount;

  const operatorNominators = appendOrArray(operator.nominators, nominator);
  operator.nominators = operatorNominators;
  operator.nominatorsCount = operatorNominators.length;

  const operatorDeposits = appendOrArray(operator.deposits, deposit);
  operator.deposits = operatorDeposits;
  operator.depositsCount = operatorDeposits.length;

  operator.updatedAt = blockNumber;

  cache.operators.set(operator.id, operator);

  nominator.totalDeposits += amount;

  const nominatorDeposits = appendOrArray(nominator.deposits, deposit);
  nominator.deposits = nominatorDeposits;
  nominator.depositsCount = nominatorDeposits.length;

  nominator.updatedAt = blockNumber;

  cache.nominators.set(nominator.id, nominator);

  const domainNominators = appendOrArray(domain.nominators, nominator);
  domain.nominators = domainNominators;
  domain.nominatorsCount = domainNominators.length;

  const domainDeposits = appendOrArray(domain.deposits, deposit);
  domain.deposits = domainDeposits;
  domain.depositsCount = domainDeposits.length;

  domain.totalDeposits += amount;

  domain.updatedAt = blockNumber;

  cache.domains.set(domain.id, domain);

  const accountNominators = appendOrArray(account.nominators, nominator);
  account.nominators = accountNominators;
  account.nominatorsCount = accountNominators.length;

  const accountDeposit = appendOrArray(account.deposits, deposit);
  account.deposits = accountDeposit;
  account.depositsCount = accountDeposit.length;

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
  const operator = getOrCreateOperator(cache, block, extrinsic, operatorId);

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  const nominators = Array.from(cache.nominators.values()).filter(
    (n) => n.operator.id === operator.id
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

  const operator = getOrCreateOperator(cache, block, extrinsic, operatorId);
  const account = operator.account;

  operator.totalTaxCollected += tax;
  operator.updatedAt = blockNumber;

  cache.operators.set(operator.id, operator);

  account.totalTaxCollected += tax;
  account.updatedAt = blockNumber;

  cache.accounts.set(account.id, account);

  const domain = operator.domain;

  domain.totalTaxCollected += tax;

  domain.updatedAt = blockNumber;

  cache.domains.set(domain.id, domain);

  return cache;
}
