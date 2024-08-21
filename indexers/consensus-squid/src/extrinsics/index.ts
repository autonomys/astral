import type { ApiPromise } from '@autonomys/auto-utils'
import { processEvents } from '../events'
import type { CtxBlock, CtxExtrinsic } from '../processor'
import { getOrCreateExtrinsic, getOrCreateExtrinsicModuleName } from '../storage'
import { Cache } from '../utils/cache'

export async function processExtrinsics(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[],
) {
  for (let [index, extrinsic] of extrinsics.entries()) {
    console.log('extrinsic', extrinsic)

    const _extrinsic = getOrCreateExtrinsic(cache, block, extrinsic.id, {
      hash: extrinsic.hash,
      indexInBlock: index,
    })
    cache.extrinsics.set(_extrinsic.id, _extrinsic)

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
  const _extrinsicModuleName = getOrCreateExtrinsicModuleName(cache, block, extrinsic.id, {
    name: extrinsic.call?.name,
  })
  cache.extrinsicModuleNames.set(_extrinsicModuleName.id, _extrinsicModuleName)

  switch (extrinsic.call?.name) {
    default:
      return await processEvents(cache, api, block, extrinsic)
  }
}
