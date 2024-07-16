import type { Store } from "@subsquid/typeorm-store";
import { Operator } from "../model";
import type { ProcessorContext } from "../processor";

export async function processBundleStoredEvent(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0],
  event: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["events"][0]
) {
  const operatorId = Number(event.args.bundleAuthor);
  const operator = await ctx.store.findOneByOrFail(Operator, { operatorId });

  operator.bundleCount++;
  operator.lastBundleAt = block.header.height;
  operator.updatedAt = block.header.height;

  await ctx.store.save(operator);
}
