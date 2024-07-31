import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createWithdrawal,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { getCallSigner } from "../utils";
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
  cache.accounts.set(account.id, account);

  const operator = getOrCreateOperator(cache, block, operatorId, {});
  cache.operators.set(operator.id, operator);

  const domain = getOrCreateDomain(cache, block, operator.domainId);
  cache.domains.set(domain.id, domain);

  const nominator = getOrCreateNominator(cache, block, extrinsic, operatorId, {
    domainId: domain.id,
    accountId: account.id,
    operatorId: operator.id,
    shares,
  });
  cache.nominators.set(nominator.id, nominator);

  const withdrawal = createWithdrawal(block, extrinsic, {
    domainId: domain.id,
    accountId: account.id,
    operatorId: operator.id,
    nominatorId: nominator.id,
    shares,
  });
  cache.withdrawals.set(withdrawal.id, withdrawal);

  return cache;
}
