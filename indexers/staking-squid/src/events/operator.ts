import { NominatorStatus, OperatorStatus } from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { appendOrArray, getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export function processOperatorNominatedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);

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

  const operator = getOrCreateOperator(cache, block, operatorId);
  const nominator = getOrCreateNominator(cache, block, extrinsic, operator, {
    shares,
  });
  const deposit = createDeposit(cache, block, extrinsic, {
    operator,
    nominator,
    amount,
    storageFeeDeposit,
  });

  operator.totalDeposits += deposit.amount;

  const operatorNominators = appendOrArray(operator.nominators, nominator);
  operator.nominators = operatorNominators;
  operator.nominatorsCount = operatorNominators.length;

  const operatorDeposits = appendOrArray(operator.deposits, deposit);
  operator.deposits = operatorDeposits;
  operator.depositsCount = operatorDeposits.length;

  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  nominator.totalDeposits += deposit.amount;

  const nominatorDeposits = appendOrArray(nominator.deposits, deposit);
  nominator.deposits = nominatorDeposits;
  nominator.depositsCount = nominatorDeposits.length;

  nominator.updatedAt = getBlockNumber(block);

  cache.nominators.set(nominator.id, nominator);

  return cache;
}

export function processOperatorSlashedEvent(
  cache: Cache,
  block: CtxBlock,
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
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = getOrCreateOperator(cache, block, operatorId);

  operator.totalTaxCollected =
    operator.totalTaxCollected + BigInt(event.args.tax);
  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  return cache;
}
