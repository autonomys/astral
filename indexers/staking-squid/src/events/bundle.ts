import type { Store } from "@subsquid/typeorm-store";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { getOrCreateOperator } from "../storage";

export async function processBundleStoredEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.bundleAuthor);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.bundleCount++;
  operator.lastBundleAt = block.header.height;
  operator.updatedAt = block.header.height;

  await ctx.store.save(operator);
}
