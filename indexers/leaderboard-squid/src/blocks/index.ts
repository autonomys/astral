import type { ApiPromise } from '@autonomys/auto-utils'
import { Store } from '@subsquid/typeorm-store'
import { processEvents } from '../events'
import type { Ctx, CtxBlock } from '../processor'
import { logBlock } from '../utils'
import { Cache, load, save } from '../utils/cache'
import { sort } from '../utils/sort'

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  let cache: Cache = await load(ctx)
  logBlock(ctx.blocks)
  for (let block of ctx.blocks) {
    cache = await processBlock(cache, api, block)
  }
  await save(ctx, sort(cache))
}

async function processBlock(cache: Cache, api: ApiPromise, block: CtxBlock) {
  return await processEvents(cache, api, block, block.events)
}
