import { processEvents } from '../events'
import type { CtxBlock, CtxExtrinsic } from '../processor'
import {
  getOrCreateExtrinsic,
  getOrCreateExtrinsicName,
  getOrCreateModule,
} from '../storage'
import { getBlockNumber, getCallSigner } from '../utils'
import { Cache } from '../utils/cache'

export function processExtrinsics(
  cache: Cache,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[],
  blockOwner: string,
) {
  for (let [index, extrinsic] of extrinsics.entries()) {
    try {
      const _extrinsic = getOrCreateExtrinsic(cache, block, extrinsic.id, {
        hash: extrinsic.hash,
        indexInBlock: index,
        nonce: BigInt((extrinsic as any).nonce ?? 0),
        name: extrinsic.call?.name ?? '',
        //   tip: BigInt((extrinsic as any)?.tip ?? 0),
        fee: extrinsic.fee ?? BigInt(0),
        success: extrinsic.success,
        blockId: block.header.id,
        signer:
          extrinsic.call && extrinsic.call.origin ? getCallSigner(extrinsic.call) : blockOwner,
        blockHeight: BigInt(block.header.height ?? 0),
        //     pos: Number((extrinsic as any)?.pos ?? 0),
        timestamp: BigInt(block.header.timestamp ?? 0),
      })
      cache.extrinsics.set(_extrinsic.id, _extrinsic)

      cache.isModified = true
    } catch (error) {
      console.error('Failed to process extrinsic:', error)
    }

    cache = processExtrinsic(cache, block, extrinsic, blockOwner)
  }
  return cache
}

export function processExtrinsic(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  blockOwner: string,
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

  return processEvents(cache, block, extrinsic, blockOwner)
}
