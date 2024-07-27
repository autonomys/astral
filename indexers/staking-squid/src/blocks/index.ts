import type { ApiPromise } from "@autonomys/auto-utils";
import type { ApiDecoration } from "@polkadot/api/types";
import { processExtrinsics } from "../extrinsics";
import type { CtxBlock } from "../processor";
import { Cache, initCache } from "../utils/cache";

export async function processBlocks(blocks: CtxBlock[], api: ApiPromise) {
  let cache: Cache = initCache;
  for (let block of blocks) {
    const apiAt = await api.at(block.header.hash);
    cache = await processBlock(cache, apiAt, block);
  }
  return cache;
}

async function processBlock(
  cache: Cache,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock
) {
  return await processExtrinsics(cache, apiAt, block, block.extrinsics);
}
