import { SubstrateBlock } from '@subsquid/substrate-processor';
import { CallItem, Context, EventItem } from './processor'
import { Block, Extrinsic, Event } from './model';

export async function processBlocks(ctx: Context) {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const batchEvents: Event[] = [];
  // TODO: add batch calls

  const batchBlocks = ctx.blocks.map(({ header, items }) => {
    const block = createBlock(header);
    const calls = items.filter(({ kind }) => kind === "call") as CallItem[];
    const events = items.filter(({ kind }) => kind === "event") as EventItem[];

    calls
      // only need parent calls:
      // `Utility.batch_all` can have multiple nested calls, but here we only care about the extrinsic
      .filter(({ call }) => !call.parent)
      .forEach((call) => {
        const extrinsic = createExtrinsic(call, block);
        extrinsicsMap.set(extrinsic.id, extrinsic);
      });

    events.forEach((item) => {
      const extrinsic = extrinsicsMap.get(item.event.extrinsic!.id);
      const event = new Event({ ...item.event, block, extrinsic });
      batchEvents.push(event);
    });

    // TODO: add block calls

    return block;
  })

  await ctx.store.save(batchBlocks);
  await ctx.store.save([...extrinsicsMap.values()]);
  await ctx.store.save(batchEvents);

  ctx.log
    .child('blocks')
    .info(`
      added: 
      ${batchBlocks.length} blocks, 
      ${extrinsicsMap.size} extrinsics, 
      ${batchEvents.length} events
    `);
}

function createBlock(header: SubstrateBlock) {
  return new Block({
    ...header,
    height: BigInt(header.height),
    timestamp: new Date(header.timestamp),
    // TODO: add implementation for space pledged
    spacePledged: BigInt(1),
    // TODO: add implementation for blockchain size
    blockchainSize: BigInt(1),
  });
}

function createExtrinsic({ name, extrinsic }: CallItem, block: Block) {
  const { fee, tip, signature } = extrinsic;
  return new Extrinsic({
    ...extrinsic,
    name,
    fee: fee || null,
    tip: tip || null,
    signer: signature ? signature.address.value : null,
    signature: signature ? signature.signature.value : null,
    block,
  })
}
