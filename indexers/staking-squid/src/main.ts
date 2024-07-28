import { activate } from "@autonomys/auto-utils";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { processBlocks } from "./blocks";
import { processor } from "./processor";
import { save } from "./utils/cache";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const api = await activate();

  const cache = await processBlocks(ctx, api);

  await save(ctx, cache);
});
