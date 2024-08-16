import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createWithdrawal,
  getOrCreateAccount,
  getOrCreateDomain,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { getBlockNumber, getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processWithdrewStakeEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId } = event.args;
  const { shares = 0 } = extrinsic.call?.args ?? {};
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const sharesBigInt = BigInt(shares);

  const account = getOrCreateAccount(cache, block, address);
  cache.accounts.set(account.id, account);

  const operator = getOrCreateOperator(cache, block, Number(operatorId), {});
  cache.operators.set(operator.id, operator);

  const domain = getOrCreateDomain(cache, block, operator.domainId);
  cache.domains.set(domain.id, domain);

  const nominator = getOrCreateNominator(cache, block, extrinsic, operatorId, {
    domainId: domain.id,
    accountId: account.id,
    operatorId: operator.id,
  });
  cache.nominators.set(nominator.id, nominator);

  const withdrawal = createWithdrawal(
    block,
    extrinsic,
    operator.id,
    account.id,
    nominator.totalWithdrawalsCount,
    {
      domainId: domain.id,
      accountId: account.id,
      operatorId: operator.id,
      nominatorId: nominator.id,
      shares: sharesBigInt,
    }
  );
  cache.withdrawals.set(withdrawal.id, withdrawal);

  nominator.totalWithdrawalsCount++;
  nominator.updatedAt = blockNumber;
  cache.nominators.set(nominator.id, nominator);

  cache.isModified = true;

  return cache;
}
