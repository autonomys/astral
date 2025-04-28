import { getLastBlock } from "./chain/calls.ts";
import { getLastProcessedHeight, getMetadata } from "./db/metadata.ts";
import { blockMapping } from "./mappings/block.ts";
import {
  initializeCache,
  initializePersistentCache,
  updatePersistentCache,
} from "./utils/cache.ts";
import {
  generateReport,
  initStats,
  trackProcessedBlock,
  updateLastBlock,
} from "./utils/stats.ts";

const stats = initStats();
const persistentCache = initializePersistentCache();

async function run() {
  try {
    const cache = initializeCache(persistentCache);

    const lastChainBlock = await getLastBlock();
    cache.targetHeight = lastChainBlock.number;
    updateLastBlock(stats, lastChainBlock.number);

    const metadata = await getMetadata();
    const lastDBProcessedHeight = getLastProcessedHeight(metadata);

    // Map next block
    const START_BLOCK = parseInt(Deno.env.get("START_BLOCK") || "1");
    const lastProcessedHeight =
      lastDBProcessedHeight > START_BLOCK ? lastDBProcessedHeight : START_BLOCK;
    cache.lastProcessedHeight = lastProcessedHeight;
    const { currentBlock } = await blockMapping(cache);

    // Track processed block and report if needed
    if (currentBlock && trackProcessedBlock(stats, currentBlock)) {
      console.log(generateReport(stats, currentBlock));
    }

    updatePersistentCache(cache, persistentCache);
  } catch (error) {
    console.error("Error:", error);
  }
}

while (true) {
  await run();
}
