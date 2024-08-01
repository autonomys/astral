import { activate } from "@autonomys/auto-utils";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { processBlocks } from "./blocks";
import { processor } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  console.log("Starting processor");

  const api = await activate();

  await processBlocks(ctx, api);

  await api.disconnect();
});
