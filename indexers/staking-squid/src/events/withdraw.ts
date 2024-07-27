import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createWithdrawal,
  getOrCreateAccount,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { appendOrArray, getBlockNumber, getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processWithdrewStakeEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const address = getCallSigner(extrinsic.call);
  const operatorId = Number(event.args.operatorId);
  const shares = extrinsic.call?.args.shares.toBigInt();

  const account = getOrCreateAccount(cache, block, address);
  const operator = getOrCreateOperator(cache, block, extrinsic, operatorId, {
    account,
  });
  const nominator = getOrCreateNominator(cache, block, extrinsic, operator, {
    account,
    shares,
  });
  const withdrawal = createWithdrawal(cache, block, extrinsic, {
    account,
    operator,
    nominator,
    shares,
  });

  const operatorWithdrawals = appendOrArray(operator.withdrawals, withdrawal);
  operator.withdrawals = operatorWithdrawals;
  operator.withdrawalsCount = operatorWithdrawals.length;

  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);

  const nominatorWithdrawals = appendOrArray(nominator.withdrawals, withdrawal);
  nominator.withdrawals = nominatorWithdrawals;
  nominator.withdrawalsCount = nominatorWithdrawals.length;

  nominator.updatedAt = getBlockNumber(block);

  cache.nominators.set(nominator.id, nominator);

  const domain = operator.domain;
  const domainWithdrawals = appendOrArray(domain.withdrawals, withdrawal);
  domain.withdrawals = domainWithdrawals;
  domain.withdrawalsCount = domainWithdrawals.length;

  cache.domains.set(domain.id, domain);

  const accountWithdrawal = appendOrArray(account.withdrawals, withdrawal);
  account.withdrawals = accountWithdrawal;
  account.withdrawalsCount = accountWithdrawal.length;

  cache.accounts.set(account.id, account);

  return cache;
}
