import type { Store } from "@subsquid/typeorm-store";
import { processExtrinsics } from "../extrinsics";
import type { ProcessorContext } from "../processor";

export async function processBlocks(ctx: ProcessorContext<Store>) {
  for (let block of ctx.blocks) {
    await processBlock(ctx, block);
  }
}

async function processBlock(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0]
) {
  await processExtrinsics(ctx, block, block.extrinsics);
}
