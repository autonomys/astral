import type { ApiPromise } from '@autonomys/auto-utils'
import type { CtxBlock, CtxEvent, CtxExtrinsic } from '../processor'
import { getOrCreateMetadata } from '../storage'
import { Cache } from '../utils/cache'

export function processCodeUpdatedEvent(
  cache: Cache,
  apiAt: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent,
) {
  console.log('block', block)
  const metadataId = block.header._runtime
  console.log('metadataId', metadataId)
  const metadata = getOrCreateMetadata(cache, block, '')
  console.log('metadata', metadata)

  cache.metadata.set(metadata.id, metadata)

  cache.isModified = true

  return cache
}
