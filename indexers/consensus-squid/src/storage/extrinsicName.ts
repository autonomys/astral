import { ExtrinsicName } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, splitModuleAndId, stringUID } from '../utils'
import { Cache } from '../utils/cache'
import { getOrCreateModule } from './module'

export const createExtrinsicName = (
  block: CtxBlock,
  id: string,
  props: Partial<ExtrinsicName> = {},
): ExtrinsicName => {
  const [moduleId, name] = splitModuleAndId(id)
  const blockNumber = getBlockNumber(block)
  return new ExtrinsicName({
    id: stringUID(id),
    moduleId,
    name,
    count: 0,
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateExtrinsicName = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<ExtrinsicName> = {},
): ExtrinsicName => {
  const module = getOrCreateModule(cache, block, id)
  cache.modules.set(module.id, module)
  cache.isModified = true

  const extrinsicModuleName = cache.extrinsicNames.get(stringUID(id))

  if (!extrinsicModuleName) return createExtrinsicName(block, id)

  return extrinsicModuleName
}
