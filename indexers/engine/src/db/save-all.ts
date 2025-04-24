import { Cache } from "../types/cache.ts";
import { sql } from "./client.ts";
import { insertCachedConsensusData } from "./consensus.ts";
import { insertCachedFilesData } from "./files.ts";
import { insertCachedLeaderboardData } from "./leaderboards.ts";
import { updateLastProcessedHeight, updateTargetHeight } from "./metadata.ts";
import { insertCachedStakingData } from "./staking.ts";

export const saveAllData = async (cache: Cache) => {
  return await sql.begin(async (txSql) => {
    const promises = [];

    const consensusPromises = insertCachedConsensusData(cache, txSql);
    promises.push(...consensusPromises);

    const leaderboardPromises = insertCachedLeaderboardData(cache, txSql);
    promises.push(...leaderboardPromises);

    const filesPromises = insertCachedFilesData(cache, txSql);
    promises.push(...filesPromises);

    const stakingPromises = insertCachedStakingData(cache, txSql);
    promises.push(...stakingPromises);

    if (cache.currentBlock)
      promises.push(updateLastProcessedHeight(cache.currentBlock, txSql));

    if (cache.targetHeight)
      promises.push(updateTargetHeight(cache.targetHeight, txSql));

    // Execute all insert and update operations concurrently within the transaction
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  });
};
