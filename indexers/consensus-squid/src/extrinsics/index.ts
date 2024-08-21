import type { ApiPromise } from '@autonomys/auto-utils'
import { processEvents } from '../events'
import type { CtxBlock, CtxExtrinsic } from '../processor'
import { getOrCreateExtrinsic, getOrCreateExtrinsicName } from '../storage'
import { Cache } from '../utils/cache'

export async function processExtrinsics(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[],
) {
  for (let [index, extrinsic] of extrinsics.entries()) {
    const _extrinsic = getOrCreateExtrinsic(cache, block, extrinsic.id, {
      hash: extrinsic.hash,
      indexInBlock: index,
    })
    cache.extrinsics.set(_extrinsic.id, _extrinsic)
    cache.isModified = true

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
    const extrinsicName = getOrCreateExtrinsicName(cache, block, extrinsic.call.name)
    extrinsicName.count++
    cache.extrinsicNames.set(extrinsicName.id, extrinsicName)
    cache.isModified = true
  }

  switch (extrinsic.call?.name) {
    default:
      return await processEvents(cache, api, block, extrinsic)
  }
}
