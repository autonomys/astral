import type { CtxBlock, CtxEvent } from "../processor";
import {
  getOrCreateNominatorDepositsTotalCount,
  getOrCreateNominatorDepositsTotalValue,
  getOrCreateNominatorWithdrawalsTotalCount,
} from "../storage/nominator";
import {
  getOrCreateOperatorBundleTotalCount,
  getOrCreateOperatorDepositsTotalCount,
  getOrCreateOperatorDepositsTotalValue,
  getOrCreateOperatorTotalRewardsCollected,
  getOrCreateOperatorTotalTaxCollected,
  getOrCreateOperatorWithdrawalsTotalCount,
} from "../storage/operator";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export function processOperatorRewardedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";

  const reward = BigInt(event.args.reward);
  if (reward === BigInt(0)) return cache;

  const operatorTotalRewardsCollected =
    getOrCreateOperatorTotalRewardsCollected(cache, block, operatorId);

  operatorTotalRewardsCollected.value += reward;
  operatorTotalRewardsCollected.lastContributionAt = getTimestamp(block);
  operatorTotalRewardsCollected.updatedAt = getBlockNumber(block);

  cache.operatorTotalRewardsCollected.set(
    operatorTotalRewardsCollected.id,
    operatorTotalRewardsCollected
  );

  cache.isModified = true;

  return cache;
}

export function processOperatorTaxCollectedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";
  const tax = BigInt(event.args.tax ?? 0);

  const operatorTotalTaxCollected = getOrCreateOperatorTotalTaxCollected(
    cache,
    block,
    operatorId
  );

  operatorTotalTaxCollected.value += tax;
  operatorTotalTaxCollected.lastContributionAt = getTimestamp(block);
  operatorTotalTaxCollected.updatedAt = getBlockNumber(block);

  cache.operatorTotalTaxCollected.set(
    operatorTotalTaxCollected.id,
    operatorTotalTaxCollected
  );

  cache.isModified = true;

  return cache;
}

export function processBundleStoredEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const domainId = String(event.args.operatorId) ?? "0";
  const operatorId = String(event.args.bundleAuthor) ?? "0";

  const operatorBundleTotalCount = getOrCreateOperatorBundleTotalCount(
    cache,
    block,
    domainId,
    operatorId
  );

  operatorBundleTotalCount.value++;
  operatorBundleTotalCount.lastContributionAt = getTimestamp(block);
  operatorBundleTotalCount.updatedAt = getBlockNumber(block);

  cache.operatorBundleTotalCount.set(
    operatorBundleTotalCount.id,
    operatorBundleTotalCount
  );

  cache.isModified = true;

  return cache;
}

export function processOperatorRegisteredEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";

  const operatorDepositsTotalCount = getOrCreateOperatorDepositsTotalCount(
    cache,
    block,
    operatorId
  );

  operatorDepositsTotalCount.value++;
  operatorDepositsTotalCount.lastContributionAt = getTimestamp(block);
  operatorDepositsTotalCount.updatedAt = getBlockNumber(block);

  cache.operatorDepositsTotalCount.set(
    operatorDepositsTotalCount.id,
    operatorDepositsTotalCount
  );

  cache.isModified = true;

  return cache;
}

export function processOperatorNominatedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";
  const accountId = String(event.args.nominatorId);
  const amount = BigInt(event.args.amount ?? 0);

  const operatorDepositsTotalCount = getOrCreateOperatorDepositsTotalCount(
    cache,
    block,
    operatorId
  );

  operatorDepositsTotalCount.value++;
  operatorDepositsTotalCount.lastContributionAt = getTimestamp(block);
  operatorDepositsTotalCount.updatedAt = getBlockNumber(block);

  cache.operatorDepositsTotalCount.set(
    operatorDepositsTotalCount.id,
    operatorDepositsTotalCount
  );

  const operatorDepositsTotalValue = getOrCreateOperatorDepositsTotalValue(
    cache,
    block,
    operatorId
  );

  operatorDepositsTotalValue.value += amount;
  operatorDepositsTotalValue.lastContributionAt = getTimestamp(block);
  operatorDepositsTotalValue.updatedAt = getBlockNumber(block);

  cache.operatorDepositsTotalValue.set(
    operatorDepositsTotalValue.id,
    operatorDepositsTotalValue
  );

  const nominatorDepositsTotalCount = getOrCreateNominatorDepositsTotalCount(
    cache,
    block,
    accountId
  );

  nominatorDepositsTotalCount.value++;
  nominatorDepositsTotalCount.lastContributionAt = getTimestamp(block);
  nominatorDepositsTotalCount.updatedAt = getBlockNumber(block);

  cache.nominatorDepositsTotalCount.set(
    nominatorDepositsTotalCount.id,
    nominatorDepositsTotalCount
  );

  const nominatorDepositsTotalValue = getOrCreateNominatorDepositsTotalValue(
    cache,
    block,
    accountId
  );

  nominatorDepositsTotalValue.value += amount;
  nominatorDepositsTotalValue.lastContributionAt = getTimestamp(block);
  nominatorDepositsTotalValue.updatedAt = getBlockNumber(block);

  cache.nominatorDepositsTotalValue.set(
    nominatorDepositsTotalValue.id,
    nominatorDepositsTotalValue
  );

  cache.isModified = true;

  return cache;
}

export function processWithdrewStakeEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";
  const accountId = String(event.args.nominatorId);

  const operatorWithdrawalsTotalCount =
    getOrCreateOperatorWithdrawalsTotalCount(cache, block, operatorId);

  operatorWithdrawalsTotalCount.value++;
  operatorWithdrawalsTotalCount.lastContributionAt = getTimestamp(block);
  operatorWithdrawalsTotalCount.updatedAt = getBlockNumber(block);

  cache.operatorWithdrawalsTotalCount.set(
    operatorWithdrawalsTotalCount.id,
    operatorWithdrawalsTotalCount
  );

  const nominatorWithdrawalsTotalCount =
    getOrCreateNominatorWithdrawalsTotalCount(cache, block, accountId);

  nominatorWithdrawalsTotalCount.value++;
  nominatorWithdrawalsTotalCount.lastContributionAt = getTimestamp(block);
  nominatorWithdrawalsTotalCount.updatedAt = getBlockNumber(block);

  cache.nominatorWithdrawalsTotalCount.set(
    nominatorWithdrawalsTotalCount.id,
    nominatorWithdrawalsTotalCount
  );

  cache.isModified = true;

  return cache;
}
