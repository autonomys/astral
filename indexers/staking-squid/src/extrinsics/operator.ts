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
  const address = getCallSigner(extrinsic.call);
  const domainId = Number(extrinsic.call?.args.domainId);

  const operatorRegisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorRegistered.name
  );
  if (!operatorRegisteredEvent) return cache;

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

  const domain = getOrCreateDomain(cache, block, domainId);
  cache.domains.set(domain.id, domain);

  const account = getOrCreateAccount(cache, block, address);
  cache.accounts.set(account.id, account);

  if (operatorRegisteredEvent) {
    const operator = createOperator(block, operatorId, {
      domainId: domain.id,
      accountId: account.id,
      signingKey: extrinsic.call?.args.config.signingKey,
      minimumNominatorStake: BigInt(
        extrinsic.call?.args.config.minimumNominatorStake
      ),
      nominationTax: extrinsic.call?.args.config.nominationTax,
      totalDeposits: amount,
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
      amount,
      storageFeeDeposit,
    });
    cache.deposits.set(deposit.id, deposit);

    domain.totalDeposits += amount;

    cache.domains.set(domain.id, domain);

    account.totalDeposits += amount;

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

  const operator = getOrCreateOperator(cache, block, operatorId);
  const operatorDeregisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );
  if (!operatorDeregisteredEvent) return cache;

  if (operatorDeregisteredEvent) {
    operator.currentTotalStake = BigInt(0);
    operator.currentStorageFeeDeposit = BigInt(0);
    operator.status = OperatorStatus.DEREGISTERED;

    cache.operators.set(operator.id, operator);
  }

  return cache;
}
