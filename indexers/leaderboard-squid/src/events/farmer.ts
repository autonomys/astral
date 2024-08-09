import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  getOrCreateFarmerBlockTotalCount,
  getOrCreateFarmerBlockTotalValue,
  getOrCreateFarmerVoteAndBlockTotalCount,
  getOrCreateFarmerVoteAndBlockTotalValue,
  getOrCreateFarmerVoteTotalCount,
  getOrCreateFarmerVoteTotalValue,
} from "../storage/farmer";
import { getBlockNumber, getTimestamp, hexToAccount } from "../utils";
import { Cache } from "../utils/cache";

export function processFarmerVoteRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.voter);
  const reward = BigInt(event.args.reward);

  const farmerVoteTotalCount = getOrCreateFarmerVoteTotalCount(
    cache,
    block,
    accountId
  );

  farmerVoteTotalCount.value++;
  farmerVoteTotalCount.lastContributionAt = getTimestamp(block);
  farmerVoteTotalCount.updatedAt = getBlockNumber(block);

  cache.farmerVoteTotalCount.set(farmerVoteTotalCount.id, farmerVoteTotalCount);

  const farmerVoteTotalValue = getOrCreateFarmerVoteTotalValue(
    cache,
    block,
    accountId
  );

  farmerVoteTotalValue.value += reward;
  farmerVoteTotalValue.lastContributionAt = getTimestamp(block);
  farmerVoteTotalValue.updatedAt = getBlockNumber(block);

  cache.farmerVoteTotalValue.set(farmerVoteTotalValue.id, farmerVoteTotalValue);

  const farmerVoteAndBlockTotalCount = getOrCreateFarmerVoteAndBlockTotalCount(
    cache,
    block,
    accountId
  );

  farmerVoteAndBlockTotalCount.value++;
  farmerVoteAndBlockTotalCount.lastContributionAt = getTimestamp(block);
  farmerVoteAndBlockTotalCount.updatedAt = getBlockNumber(block);

  cache.farmerVoteAndBlockTotalCount.set(
    farmerVoteAndBlockTotalCount.id,
    farmerVoteAndBlockTotalCount
  );

  const farmerVoteAndBlockTotalValue = getOrCreateFarmerVoteAndBlockTotalValue(
    cache,
    block,
    accountId
  );

  farmerVoteAndBlockTotalValue.value += reward;
  farmerVoteAndBlockTotalValue.lastContributionAt = getTimestamp(block);
  farmerVoteAndBlockTotalValue.updatedAt = getBlockNumber(block);

  cache.farmerVoteAndBlockTotalValue.set(
    farmerVoteAndBlockTotalValue.id,
    farmerVoteAndBlockTotalValue
  );

  cache.isModified = true;

  return cache;
}

export function processFarmerBlockRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.blockAuthor);
  const reward = BigInt(event.args.reward);

  const farmerBlockTotalCount = getOrCreateFarmerBlockTotalCount(
    cache,
    block,
    accountId
  );

  farmerBlockTotalCount.value++;
  farmerBlockTotalCount.lastContributionAt = getTimestamp(block);
  farmerBlockTotalCount.updatedAt = getBlockNumber(block);

  cache.farmerBlockTotalCount.set(
    farmerBlockTotalCount.id,
    farmerBlockTotalCount
  );

  const farmerBlockTotalValue = getOrCreateFarmerBlockTotalValue(
    cache,
    block,
    accountId
  );

  farmerBlockTotalValue.value += reward;
  farmerBlockTotalValue.lastContributionAt = getTimestamp(block);
  farmerBlockTotalValue.updatedAt = getBlockNumber(block);

  cache.farmerBlockTotalValue.set(
    farmerBlockTotalValue.id,
    farmerBlockTotalValue
  );

  const farmerVoteAndBlockTotalCount = getOrCreateFarmerVoteAndBlockTotalCount(
    cache,
    block,
    accountId
  );

  farmerVoteAndBlockTotalCount.value++;
  farmerVoteAndBlockTotalCount.lastContributionAt = getTimestamp(block);
  farmerVoteAndBlockTotalCount.updatedAt = getBlockNumber(block);

  cache.farmerVoteAndBlockTotalCount.set(
    farmerVoteAndBlockTotalCount.id,
    farmerVoteAndBlockTotalCount
  );

  const farmerVoteAndBlockTotalValue = getOrCreateFarmerVoteAndBlockTotalValue(
    cache,
    block,
    accountId
  );

  farmerVoteAndBlockTotalValue.value += reward;
  farmerVoteAndBlockTotalValue.lastContributionAt = getTimestamp(block);
  farmerVoteAndBlockTotalValue.updatedAt = getBlockNumber(block);

  cache.farmerVoteAndBlockTotalValue.set(
    farmerVoteAndBlockTotalValue.id,
    farmerVoteAndBlockTotalValue
  );

  cache.isModified = true;

  return cache;
}
