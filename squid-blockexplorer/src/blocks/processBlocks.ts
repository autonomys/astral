import { CallItem, Context, EventItem } from '../processor';
import { Block, Event, Log, RewardEvent } from '../model';
import { partitionItems, createBlock } from './utils';
import { ProcessBlocksDependencies, ExtrinsicsMap, CallsMap } from './types';

export function processBlocksFactory({
  getSpacePledged,
  getHistorySize,
  processExtrinsics,
  processCalls,
  processEvents,
  getLogs,
  getBlockAuthor,
}: ProcessBlocksDependencies) {
  return async function processBlocks(ctx: Context) {
    const extrinsicsMap: ExtrinsicsMap = new Map();
    const callsMap: CallsMap = new Map();
    const events: Event[] = [];
    const rewards: RewardEvent[] = [];
    const blocks: Block[] = [];
    const logs: Log[] = [];

    for (const { header, items } of ctx.blocks) {
      // creating block
      const spacePledged = await getSpacePledged(header);
      const blockchainSize = await getHistorySize(header);
      const author = await getBlockAuthor(header);
      // save block author to avoid foreign key constraint violation
      author && await ctx.store.save(author);
      // get block items: calls and events
      const [callItems, eventItems] = partitionItems(({ kind }: CallItem | EventItem) => kind === "call", items);
      // some extrinsics (i.e. Utility.batch_all) have parent call and child calls
      // in that case we need to process parent calls first
      const [parentCalls, childCalls] = partitionItems(({ call }) => !call.parent, (callItems as CallItem[]));

      const block = createBlock({
        author,
        header,
        spacePledged,
        blockchainSize,
        extrinsicsCount: parentCalls.length,
        eventsCount: eventItems.length,
      });
      blocks.push(block);

      await processExtrinsics(extrinsicsMap, callsMap, parentCalls, block);
      await processCalls(extrinsicsMap, callsMap, childCalls, block);

      const [blockEvents, rewardEvents] = await processEvents(extrinsicsMap, callsMap, eventItems as EventItem[], block);
      events.push(...blockEvents);
      rewards.push(...rewardEvents);

      const blockLogs = await getLogs(header, block);
      logs.push(...blockLogs);
    }

    // saving results
    await ctx.store.save(blocks);
    await ctx.store.save([...extrinsicsMap.values()]);
    await ctx.store.save([...callsMap.values()]);
    await ctx.store.save(events);
    await ctx.store.save(rewards);
    await ctx.store.save(logs);

    ctx.log
      .child('blocks')
      .info(`added: 
      ${blocks.length} blocks, 
      ${extrinsicsMap.size} extrinsics, 
      ${callsMap.size} calls, 
      ${events.length} events
    `);
  };
}

