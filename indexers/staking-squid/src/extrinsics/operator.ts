import { OperatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  createNominator,
  createOperator,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processRegisterOperator(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const { call, events: extrinsicEvents } = extrinsic;
  const { domainId, amount, config } = call?.args ?? {};
  const { signingKey, minimumNominatorStake, nominationTax } = config ?? {};
  const address = getCallSigner(call);
  const domainIdNum = Number(domainId ?? 0);

  const operatorRegisteredEvent = extrinsicEvents.find(
    (e) => e.name === events.domains.operatorRegistered.name
  );
  if (!operatorRegisteredEvent) return cache;

  const storageFeeDepositedEvent = extrinsicEvents.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  const operatorId = Number(operatorRegisteredEvent.args.operatorId ?? 0);
  const amountBigInt = BigInt(amount ?? 0);
  const storageFeeDeposit = BigInt(storageFeeDepositedEvent?.args.amount ?? 0);

  const domain = getOrCreateDomain(cache, block, domainIdNum);
  const account = getOrCreateAccount(cache, block, address);

  const operator = createOperator(block, operatorId, {
    domainId: domain.id,
    accountId: account.id,
    signingKey: signingKey ?? "",
    minimumNominatorStake: BigInt(minimumNominatorStake ?? 0),
    nominationTax: nominationTax ?? 0,
    totalDeposits: amountBigInt,
  });
  cache.operators.set(operator.id, operator);

  const nominator = createNominator(block, extrinsic, operatorId, {
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
    amount: amountBigInt,
    storageFeeDeposit,
  });
  cache.deposits.set(deposit.id, deposit);

  domain.totalDeposits += amountBigInt;
  cache.domains.set(domain.id, domain);

  account.totalDeposits += amountBigInt;
  cache.accounts.set(account.id, account);

  cache.isModified = true;

  return cache;
}

export function processDeregisterOperator(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const { call, events: extrinsicEvents } = extrinsic;
  const operatorId = Number(call?.args.operatorId ?? 0);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const operatorDeregisteredEvent = extrinsicEvents.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );
  if (!operatorDeregisteredEvent) return cache;

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.DEREGISTERED;

  cache.operators.set(operator.id, operator);

  cache.isModified = true;

  return cache;
}
