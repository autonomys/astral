import { Module } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, splitModuleAndId, stringUID } from '../utils'
import { Cache } from '../utils/cache'

export const createModule = (
  block: CtxBlock,
  name: string,
  props: Partial<Module> = {},
): Module => {
  const blockNumber = getBlockNumber(block)
  return new Module({
    id: stringUID(name),
    name,
    extrinsicCount: 0,
    eventCount: 0,
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateModule = (
  cache: Cache,
  block: CtxBlock,
  eventOrCall: string,
  props: Partial<Module> = {},
): Module => {
  const [moduleId] = splitModuleAndId(eventOrCall)
  const moduleName = cache.modules.get(stringUID(moduleId))

  if (!moduleName) return createModule(block, moduleId, props)

  return moduleName
}
