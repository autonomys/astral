import { CallItem, Context, EventItem } from './processor'
import { Block, Extrinsic } from './model';

export async function processBlocks(ctx: Context) {
  // extrinsics for the whole batch of blocks
  const batchExtrinsics: Extrinsic[] = [];
  const batchEvents = [];

  const batchBlocks = ctx.blocks.map(({ header, items }) => {
    const height = BigInt(header.height);
    const block = new Block({
      ...header,
      height,
      timestamp: new Date(header.timestamp),
      // TODO: add implementation for space pledged
      spacePledged: BigInt(header.height),
      // TODO: add implementation for blockchain size
      blockchainSize: BigInt(header.height),
      // TODO: add implementation for events
      // events: [],
    });

    const blockExtrinsics = getExtrinsics(block, items);
    batchExtrinsics.push(...blockExtrinsics);

    return block;
  })

  await ctx.store.save(batchBlocks);
  await ctx.store.save(batchExtrinsics);

  ctx.log
    .child('blocks')
    .info(`
      added: 
      ${batchBlocks.length} blocks, 
      ${batchExtrinsics.length} extrinsics, 
      ${batchEvents.length} events
    `);
}

function getExtrinsics(block: Block, items: Array<EventItem | CallItem>) {
  // only need parent calls:
  // `Utility.batch_all` can have multiple nested calls, but here we only care about the extrinsic
  const calls = items.filter((item) => item.kind === "call" && !item.call.parent) as CallItem[];

  const extrinsics = calls.map(({ name, extrinsic }) => {
    const { id, hash, indexInBlock, success, fee, tip, signature } = extrinsic;
    return new Extrinsic({
      id,
      hash,
      indexInBlock,
      // TODO: add nonce?
      nonce: BigInt(1),
      name,
      success,
      fee: fee || null,
      tip: tip || null,
      block,
      signer: signature ? signature.address.value : null,
      signature: signature ? signature.signature.value : null,
    })
  })

  return extrinsics;
}

// export function createEvent(extrinsicEntity: Extrinsic, event: Event): Events {
//   const { id, name, call, indexInBlock } = event;
//   return new Events({
//     id,
//     extrinsic: extrinsicEntity,
//     name,
//     method: call?.name,
//     blockNumber: extrinsicEntity.blockNumber.toString(),
//     indexInBlock: indexInBlock.toString(),
//     createdAt: extrinsicEntity.createdAt,
//     params: <Args>event.args,
//   });
// }
