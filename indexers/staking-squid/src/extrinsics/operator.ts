import { OperatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  createOperator,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { appendOrArray, getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processRegisterOperator(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const address = getCallSigner(extrinsic.call);
  const domainId = Number(extrinsic.call?.args.domainId);

  const operatorRegisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorRegistered.name
  );

  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  const operatorId = operatorRegisteredEvent
    ? Number(operatorRegisteredEvent.args.operatorId)
    : 0;
  const amount = extrinsic.call
    ? BigInt(extrinsic.call.args.amount)
    : BigInt(0);
  const storageFeeDeposit = storageFeeDepositedEvent
    ? BigInt(storageFeeDepositedEvent.args.amount)
    : BigInt(0);

  const account = getOrCreateAccount(cache, block, address);
  const domain = getOrCreateDomain(cache, block, domainId);

  if (operatorRegisteredEvent) {
    const operator = createOperator(cache, block, extrinsic, {
      account,
      domain,
      operatorId,
      signingKey: extrinsic.call?.args.config.signingKey,
      minimumNominatorStake: BigInt(
        extrinsic.call?.args.config.minimumNominatorStake
      ),
      nominationTax: extrinsic.call?.args.config.nominationTax,
      totalDeposits: extrinsic.call
        ? BigInt(extrinsic.call.args.amount)
        : BigInt(0),
    });
    const nominator = getOrCreateNominator(cache, block, extrinsic, operator, {
      domain,
      account,
    });
    const deposit = createDeposit(cache, block, extrinsic, {
      domain,
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

    cache.operators.set(operator.id, operator);

    nominator.totalDeposits += amount;

    const nominatorDeposits = appendOrArray(nominator.deposits, deposit);
    nominator.deposits = nominatorDeposits;
    nominator.depositsCount = nominatorDeposits.length;

    cache.nominators.set(nominator.id, nominator);

    const domainOperators = appendOrArray(domain.operators, operator);
    domain.operators = domainOperators;
    domain.operatorsCount = domainOperators.length;

    const domainNominators = appendOrArray(domain.nominators, nominator);
    domain.nominators = domainNominators;
    domain.nominatorsCount = domainNominators.length;

    const domainDeposits = appendOrArray(domain.deposits, deposit);
    domain.deposits = domainDeposits;
    domain.depositsCount = domainDeposits.length;

    domain.totalDeposits += amount;

    cache.domains.set(domain.id, domain);

    const accountOperators = appendOrArray(account.operators, operator);
    account.operators = accountOperators;
    account.operatorsCount = accountOperators.length;

    const accountNominators = appendOrArray(account.nominators, nominator);
    account.nominators = accountNominators;
    account.nominatorsCount = accountNominators.length;

    const accountDeposit = appendOrArray(account.deposits, deposit);
    account.deposits = accountDeposit;
    account.depositsCount = accountDeposit.length;

    cache.accounts.set(account.id, account);
  }

  return cache;
}

export function processDeregisterOperator(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = getOrCreateOperator(cache, block, extrinsic, operatorId);
  const operatorDeregisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );

  if (operatorDeregisteredEvent) {
    operator.currentTotalStake = BigInt(0);
    operator.currentStorageFeeDeposit = BigInt(0);
    operator.status = OperatorStatus.DEREGISTERED;

    cache.operators.set(operator.id, operator);
  }

  return cache;
}
