import type { ApiPromise } from '@autonomys/auto-utils'
import { Store } from '@subsquid/typeorm-store'
import { processExtrinsics } from '../extrinsics'
import type { Ctx, CtxBlock } from '../processor'
import { getOrCreateBlock } from '../storage'
import { logBlock } from '../utils'
import { Cache, load, save } from '../utils/cache'

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  let cache: Cache = await load(ctx)
  logBlock(ctx.blocks)
  for (let block of ctx.blocks) {
    const _block = getOrCreateBlock(cache, block, {
      id: block.header.id,
      height: BigInt(block.header.height ?? 0),
      timestamp: Number(block.header.timestamp ?? 0),
      hash: block.header.hash ?? '',
      parentHash: block.header.parentHash ?? '',
      specId: block.header.specVersion.toString() ?? '',
    })
    cache.blocks.set(_block.id, _block)
    cache.isModified = true

    cache = await processBlock(cache, api, block)
  }

  await save(ctx, cache)
}

async function processBlock(cache: Cache, api: ApiPromise, block: CtxBlock) {
  return await processExtrinsics(cache, api, block, block.extrinsics)
}
