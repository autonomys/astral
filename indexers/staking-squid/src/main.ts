import { activate, ApiPromise } from "@autonomys/auto-utils";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { processBlocks } from "./blocks";
import { Ctx, processor } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const api = await activate();
  await processChain(ctx, api);
});
async function processChain(ctx: Ctx<Store>, api: ApiPromise) {
  await processBlocks(ctx, api);
}
