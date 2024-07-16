import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { processBlocks } from "./blocks";
import { ProcessorContext, processor } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  await processChain(ctx);
});

async function processChain(ctx: ProcessorContext<Store>) {
  await processBlocks(ctx);
}
