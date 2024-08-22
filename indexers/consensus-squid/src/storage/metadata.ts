import { Metadata } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, stringUID } from '../utils'
import { Cache } from '../utils/cache'

export const createMetadata = (
  block: CtxBlock,
  metadataId: string,
  props: Partial<Metadata>,
): Metadata =>
  new Metadata({
    id: stringUID(metadataId),
    sortId: typeof metadataId === 'string' ? parseInt(metadataId) : metadataId,
    blockHash: '',
    specName: '',
    metadata: '',
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  })

export const getOrCreateMetadata = (
  cache: Cache,
  block: CtxBlock,
  metadataId: string,
  props: Partial<Metadata> = {},
): Metadata => {
  const metadata = cache.metadata.get(stringUID(metadataId))

  if (!metadata) return createMetadata(block, metadataId, props)

  return metadata
}
