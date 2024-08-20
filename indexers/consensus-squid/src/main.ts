import { createConnection } from "@autonomys/auto-utils";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { assertNotNull } from "@subsquid/util-internal";
import { processBlocks } from "./blocks";
import { processor } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const api = await createConnection(
    assertNotNull(process.env.RPC_CONSENSUS_HTTP, "No RPC_CONSENSUS_HTTP env")
  );

  await processBlocks(ctx, api);

  await api.disconnect();
});
