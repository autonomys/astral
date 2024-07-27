import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createWithdrawal,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { appendOrArray, getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export function processWithdrewStakeEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const shares = extrinsic.call?.args.shares.toBigInt();

  const operator = getOrCreateOperator(cache, block, operatorId);
  const nominator = getOrCreateNominator(cache, block, extrinsic, operator);
  const withdrawal = createWithdrawal(cache, block, extrinsic, {
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

  return cache;
}
