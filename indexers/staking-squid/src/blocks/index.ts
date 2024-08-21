import type { ApiPromise } from '@autonomys/auto-utils'
import { Store } from '@subsquid/typeorm-store'
import { processExtrinsics } from '../extrinsics'
import type { Ctx, CtxBlock } from '../processor'
import { logBlock } from '../utils'
import { Cache, load, save } from '../utils/cache'

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  let cache: Cache = await load(ctx)
  logBlock(ctx.blocks)
  for (let block of ctx.blocks) {
    cache = await processBlock(cache, api, block)
  }

  await save(ctx, cache)
}

async function processBlock(cache: Cache, api: ApiPromise, block: CtxBlock) {
  return await processExtrinsics(cache, api, block, block.extrinsics)
}
