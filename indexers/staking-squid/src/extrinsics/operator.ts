import {
  NominatorPendingAction,
  NominatorStatus,
  OperatorPendingAction,
  OperatorStatus,
} from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  createNominator,
  createOperator,
  createWithdrawal,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import {
  getBlockNumber,
  getCallSigner,
  SHARES_CALCULATION_MULTIPLIER,
} from "../utils";
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
  const blockNumber = getBlockNumber(block);
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
    pendingAction: OperatorPendingAction.PENDING_REGISTRATION,
  });
  cache.operators.set(operator.id, operator);

  const nominator = createNominator(block, extrinsic, operatorId, {
    domainId: domain.id,
    accountId: account.id,
    operatorId: operator.id,
    pendingAction: NominatorPendingAction.PENDING_EPOCH_CHANGE,
  });
  cache.nominators.set(nominator.id, nominator);

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
      amount: amountBigInt,
      storageFeeDeposit,
      totalAmount: amountBigInt + storageFeeDeposit,
      epochDepositedAt: domain.completedEpoch ?? 0,
      domainBlockNumberDepositedAt: domain.lastDomainBlockNumber ?? 0,
    }
  );
  cache.deposits.set(deposit.id, deposit);

  domain.totalDeposits += amountBigInt;
  domain.updatedAt = blockNumber;
  cache.domains.set(domain.id, domain);

  account.totalDeposits += amountBigInt;
  account.updatedAt = blockNumber;
  cache.accounts.set(account.id, account);

  operator.totalDeposits += amountBigInt;
  operator.updatedAt = blockNumber;
  cache.operators.set(operator.id, operator);

  nominator.totalDeposits += amountBigInt;
  nominator.totalDepositsCount++;
  nominator.updatedAt = blockNumber;
  cache.nominators.set(nominator.id, nominator);

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
  const blockNumber = getBlockNumber(block);

  const operator = getOrCreateOperator(cache, block, operatorId);
  cache.operators.set(operator.id, operator);

  const domain = getOrCreateDomain(cache, block, operator.domainId);
  cache.domains.set(domain.id, domain);

  const account = getOrCreateAccount(cache, block, operator.accountId);
  cache.accounts.set(account.id, account);

  const operatorDeregisteredEvent = extrinsicEvents.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );
  if (!operatorDeregisteredEvent) return cache;

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.DEREGISTERED;

  Array.from(cache.nominators.values())
    .filter(
      (n) =>
        (n.status === NominatorStatus.STAKED ||
          n.status === NominatorStatus.PENDING) &&
        n.operatorId === operator.id
    )
    .forEach((n) => {
      const estimatedAmount =
        (operator.currentSharePrice * n.knownShares) /
        SHARES_CALCULATION_MULTIPLIER;
      const w = createWithdrawal(
        block,
        extrinsic,
        operator.id,
        n.accountId,
        n.totalWithdrawalsCount,
        {
          domainId: n.domainId,
          accountId: n.accountId,
          operatorId: n.operatorId,
          nominatorId: n.id,
          shares: n.knownShares,
          epochWithdrawalRequestedAt: domain.completedEpoch ?? 0,
          domainBlockNumberWithdrawalRequestedAt:
            domain.lastDomainBlockNumber ?? 0,
          estimatedAmount,
        }
      );
      cache.withdrawals.set(w.id, w);

      n.status = NominatorStatus.PENDING;
      n.totalWithdrawalsCount++;
      n.updatedAt = blockNumber;
      cache.nominators.set(n.id, n);

      operator.totalEstimatedWithdrawals += estimatedAmount;
      operator.updatedAt = blockNumber;
      cache.operators.set(operator.id, operator);

      account.totalEstimatedWithdrawals += estimatedAmount;
      account.updatedAt = blockNumber;
      cache.accounts.set(account.id, account);

      domain.totalEstimatedWithdrawals += estimatedAmount;
      domain.updatedAt = blockNumber;
      cache.domains.set(domain.id, domain);
    });

  cache.operators.set(operator.id, operator);

  cache.isModified = true;

  return cache;
}
