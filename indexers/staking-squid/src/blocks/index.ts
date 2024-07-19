import type { ApiPromise } from "@autonomys/auto-utils";
import type { Store } from "@subsquid/typeorm-store";
import { processExtrinsics } from "../extrinsics";
import type { Ctx, CtxBlock } from "../processor";

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  for (let block of ctx.blocks) {
    await processBlock(ctx, api, block);
  }
}

async function processBlock(ctx: Ctx<Store>, api: ApiPromise, block: CtxBlock) {
  await processExtrinsics(ctx, api, block, block.extrinsics);
}
