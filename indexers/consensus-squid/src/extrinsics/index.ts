import type { ApiPromise } from '@autonomys/auto-utils'
import { processEvents } from '../events'
import type { CtxBlock, CtxExtrinsic } from '../processor'
import {
  getOrCreateCall,
  getOrCreateExtrinsic,
  getOrCreateExtrinsicName,
  getOrCreateModule,
} from '../storage'
import { getBlockNumber } from '../utils'
import { Cache } from '../utils/cache'

export async function processExtrinsics(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[],
) {
  for (let [index, extrinsic] of extrinsics.entries()) {
    try {
      console.log('Processing extrinsic:', extrinsic.id)
      console.log('extrinsic:', extrinsic)
      console.log('extrinsic.call:', extrinsic.call)
      const _extrinsic = getOrCreateExtrinsic(cache, block, extrinsic.id, {
        hash: extrinsic.hash,
        indexInBlock: index,
        name: extrinsic.call?.name ?? '',
        // tip: extrinsic.tip ?? BigInt(0),
        fee: extrinsic.fee ?? BigInt(0),
        success: extrinsic.success,
        blockId: block.header.id,
        timestamp: BigInt(block.header.timestamp ?? 0),
        blockHeight: BigInt(block.header.height ?? 0),
      })
      try {
        _extrinsic.args = JSON.stringify(extrinsic.call?.args ?? {})
      } catch (error) {
        console.error('Failed to process extrinsic:', error)
      }
      cache.extrinsics.set(_extrinsic.id, _extrinsic)

      if (extrinsic.call) {
        const _call = getOrCreateCall(cache, block, extrinsic.call.id, {
          name: extrinsic.call.name,
          success: extrinsic.success,
          args: JSON.stringify(extrinsic.call?.args ?? {}),
          blockId: block.header.id,
          extrinsicId: extrinsic.id,
          error: '',
          timestamp: BigInt(block.header.timestamp ?? 0),
        })
        cache.calls.set(_call.id, _call)
      }

      cache.isModified = true
    } catch (error) {
      console.error('Failed to process extrinsic:', error)
    }

    cache = await processExtrinsic(cache, api, block, extrinsic)
  }
  return cache
}

export async function processExtrinsic(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
) {
  if (extrinsic.call) {
    const module = getOrCreateModule(cache, block, extrinsic.call.name)
    module.extrinsicCount++
    module.updatedAt = getBlockNumber(block)
    cache.modules.set(module.id, module)

    const extrinsicName = getOrCreateExtrinsicName(cache, block, extrinsic.call.name)
    extrinsicName.count++
    extrinsicName.updatedAt = getBlockNumber(block)
    cache.extrinsicNames.set(extrinsicName.id, extrinsicName)
    cache.isModified = true
  }

  switch (extrinsic.call?.name) {
    default:
      return await processEvents(cache, api, block, extrinsic)
  }
}
