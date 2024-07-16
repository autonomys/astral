import type { Store } from "@subsquid/typeorm-store";
import { Operator } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";

export async function processBundleStoredEvent(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.bundleAuthor);
  const operator = await ctx.store.findOneByOrFail(Operator, { operatorId });

  operator.bundleCount++;
  operator.lastBundleAt = block.header.height;
  operator.updatedAt = block.header.height;

  await ctx.store.save(operator);
}
