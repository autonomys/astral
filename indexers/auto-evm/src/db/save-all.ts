import { Cache } from "../types/cache.ts";
import { insertCachedConsensusData } from "./auto-evm.ts";
import { sql } from "./client.ts";
import { updateLastProcessedHeight, updateTargetHeight } from "./metadata.ts";

export const saveAllData = async (cache: Cache) => {
  return await sql.begin(async (txSql) => {
    const promises = [];

    const consensusPromises = insertCachedConsensusData(cache, txSql);
    promises.push(...consensusPromises);

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
