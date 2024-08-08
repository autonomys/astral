import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  getOrCreateFarmerBlockTotalCount,
  getOrCreateFarmerBlockTotalValue,
  getOrCreateFarmerVoteAndBlockTotalCount,
  getOrCreateFarmerVoteAndBlockTotalValue,
  getOrCreateFarmerVoteTotalCount,
  getOrCreateFarmerVoteTotalValue,
} from "../storage/farmer";
import { getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export function processFarmerVoteRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = String(event.args.voter);
  const reward = BigInt(event.args.reward);

  const farmerVoteTotalCount = getOrCreateFarmerVoteTotalCount(
    cache,
    block,
    accountId
  );

  farmerVoteTotalCount.totalVoteCount++;
  farmerVoteTotalCount.lastVotedAt = getTimestamp(block);
  farmerVoteTotalCount.updatedAt = getBlockNumber(block);

  cache.farmerVoteTotalCount.set(farmerVoteTotalCount.id, farmerVoteTotalCount);

  const farmerVoteTotalValue = getOrCreateFarmerVoteTotalValue(
    cache,
    block,
    accountId
  );

  farmerVoteTotalValue.totalVoteValue += reward;
  farmerVoteTotalValue.lastVotedAt = getTimestamp(block);
  farmerVoteTotalValue.updatedAt = getBlockNumber(block);

  cache.farmerVoteTotalValue.set(farmerVoteTotalValue.id, farmerVoteTotalValue);

  const farmerVoteAndBlockTotalCount = getOrCreateFarmerVoteAndBlockTotalCount(
    cache,
    block,
    accountId
  );

  farmerVoteAndBlockTotalCount.totalVoteAndBlockCount++;
  farmerVoteAndBlockTotalCount.lastVotedAndBlockAt = getTimestamp(block);
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

  farmerVoteAndBlockTotalValue.totalVoteAndBlockValue += reward;
  farmerVoteAndBlockTotalValue.lastVotedAndBlockAt = getTimestamp(block);
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
  const accountId = String(event.args.blockAuthor);
  const reward = BigInt(event.args.reward);

  const farmerBlockTotalCount = getOrCreateFarmerBlockTotalCount(
    cache,
    block,
    accountId
  );

  farmerBlockTotalCount.totalBlockCount++;
  farmerBlockTotalCount.lastBlockedAt = getTimestamp(block);
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

  farmerBlockTotalValue.totalBlockValue += reward;
  farmerBlockTotalValue.lastBlockedAt = getTimestamp(block);
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

  farmerVoteAndBlockTotalCount.totalVoteAndBlockCount++;
  farmerVoteAndBlockTotalCount.lastVotedAndBlockAt = getTimestamp(block);
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

  farmerVoteAndBlockTotalValue.totalVoteAndBlockValue += reward;
  farmerVoteAndBlockTotalValue.lastVotedAndBlockAt = getTimestamp(block);
  farmerVoteAndBlockTotalValue.updatedAt = getBlockNumber(block);

  cache.farmerVoteAndBlockTotalValue.set(
    farmerVoteAndBlockTotalValue.id,
    farmerVoteAndBlockTotalValue
  );

  cache.isModified = true;

  return cache;
}
