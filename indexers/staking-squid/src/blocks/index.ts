import type { Store } from "@subsquid/typeorm-store";
import { processExtrinsics } from "../extrinsics";
import type { Ctx, CtxBlock } from "../processor";

export async function processBlocks(ctx: Ctx<Store>) {
  for (let block of ctx.blocks) {
    await processBlock(ctx, block);
  }
}

async function processBlock(ctx: Ctx<Store>, block: CtxBlock) {
  await processExtrinsics(ctx, block, block.extrinsics);
}
