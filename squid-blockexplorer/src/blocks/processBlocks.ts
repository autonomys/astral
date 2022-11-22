import { CallItem, Context, EventItem } from '../processor';
import { Block, Event } from '../model';
import { partitionItems, createBlock } from './utils';
import { ProcessBlocksDependencies, ExtrinsicsMap, CallsMap } from './types';

export function processBlocksFactory({
  getSpacePledged,
  getHistorySize,
  processExtrinsics,
  processCalls,
  processEvents,
}: ProcessBlocksDependencies) {
  return async function processBlocks(ctx: Context) {
    const extrinsicsMap: ExtrinsicsMap = new Map();
    const callsMap: CallsMap = new Map();
    const events: Event[] = [];
    const blocks: Block[] = [];

    for (const { header, items } of ctx.blocks) {
      // creating block
      const spacePledged = await getSpacePledged(header);
      const blockchainSize = await getHistorySize(header);
      const block = createBlock(header, spacePledged, blockchainSize);
      blocks.push(block);

      // processing block items: calls and events
      const [callItems, eventItems] = partitionItems(({ kind }: CallItem | EventItem) => kind === "call", items);
      // some extrinsics (i.e. Utility.batch_all) have parent call and child calls
      // in that case we need to process parent calls first
      const [parentCalls, childCalls] = partitionItems(({ call }) => !call.parent, (callItems as CallItem[]));
      await processExtrinsics(extrinsicsMap, callsMap, parentCalls, block);
      await processCalls(extrinsicsMap, callsMap, childCalls, block);
      await processEvents(extrinsicsMap, callsMap, events, eventItems as EventItem[], block);
    }

    // saving results
    await ctx.store.save(blocks);
    await ctx.store.save([...extrinsicsMap.values()]);
    await ctx.store.save([...callsMap.values()]);
    await ctx.store.save(events);

    ctx.log
      .child('blocks')
      .info(`added: 
      ${blocks.length} blocks, 
      ${extrinsicsMap.size} extrinsics, 
      ${callsMap.size} calls, 
      ${events.length} events
    `);
  }
}

