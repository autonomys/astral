import { Context } from './processor'
import { Block } from './model';

export async function processBlocks(ctx: Context) {
  const blocks = ctx.blocks.map(({ header }) => {
    return new Block({ 
      ...header, 
      height: BigInt(header.height), 
      timestamp: new Date(header.timestamp), 
      // TODO: add implementation for space pledged
      spacePledged: BigInt(header.height), 
      // TODO: add implementation for blockchain size
      blockchainSize: BigInt(header.height), 
      // TODO: add implementation for extrinsics
      // extrinsics: [],
      // TODO: add implementation for events
      // events: [],
    });
  })

  await ctx.store.save(blocks);

  ctx.log
    .child('blocks')
    .info(`updated: ${blocks.length}`);
}
