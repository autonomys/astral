import {
  StoreWithCache,
  TypeormDatabaseWithCache,
} from "@belopash/typeorm-store";
import { ApiPromise, WsProvider } from "@polkadot/api";

import {
  saveBlock,
  saveCall,
  saveEvent,
  saveExtrinsic,
  saveLog,
} from "./blocks/databaseOperations";
import { BlockChainTypes as types } from "./blocks/types";
import { getBlockAuthor } from "./blocks/utils";
import { Block, BlockHeader, ProcessorContext, processor } from "./processor";
import { digest } from "./types/system/storage";

processor.run(new TypeormDatabaseWithCache(), async (ctx) => {
  const api = await createApi();

  for (const blockData of ctx.blocks) {
    logBlockProcessing(ctx, blockData);

    const blockAuthor = await getBlockAuthor(blockData.header, api);
    await processBlock(ctx, blockData, blockAuthor);
  }

  logCompletion(ctx);
});

// Create API instance
async function createApi() {
  const provider = new WsProvider(process.env.RPC_ENDPOINT);
  return ApiPromise.create({ provider, types });
}

// Log information about the block being processed
function logBlockProcessing(
  ctx: ProcessorContext<StoreWithCache>,
  { header, calls, events, extrinsics }: Block
) {
  ctx.log.child(
    `block ${header.height}: extrinsics - ${extrinsics.length}, calls - ${calls.length}, events - ${events.length}`
  );
}

// Log the completion of block processing
function logCompletion(ctx: ProcessorContext<StoreWithCache>) {
  ctx.log.child("blocks").info(`added: ${ctx.blocks.length} blocks`);
}

// Process digest logs for a block
async function processDigestLogs(
  ctx: ProcessorContext<StoreWithCache>,
  block: BlockHeader
) {
  const digestLogs = await digest.v0.get(block);

  if (digestLogs) {
    for (const [index, log] of digestLogs.logs.entries()) {
      await saveLog(ctx, block, log, index);
    }
  }
}

// Process and save block data
async function processBlock(
  ctx: ProcessorContext<StoreWithCache>,
  { header, calls, events, extrinsics }: Block,
  blockAuthor: string
) {
  await saveBlock(ctx, header, blockAuthor);

  for (const extrinsic of extrinsics) {
    await saveExtrinsic(ctx, extrinsic);
  }

  // Process calls in reverse order as required
  for (const call of calls.reverse()) {
    await saveCall(ctx, call);
  }

  for (const event of events) {
    await saveEvent(ctx, event);
  }

  await processDigestLogs(ctx, header);
}
