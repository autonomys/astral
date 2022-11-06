import { Context } from './processor'

export async function processBlocks(ctx: Context) {
  console.log(ctx.blocks[0]);
}
