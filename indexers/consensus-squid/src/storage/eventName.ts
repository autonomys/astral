import { EventName } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, splitModuleAndId, stringUID } from '../utils'
import { Cache } from '../utils/cache'
import { getOrCreateModule } from './module'

export const createEventName = (
  block: CtxBlock,
  id: string,
  props: Partial<EventName> = {},
): EventName => {
  const [moduleId, name] = splitModuleAndId(id)
  const blockNumber = getBlockNumber(block)
  return new EventName({
    id: stringUID(id),
    moduleId,
    name,
    count: 0,
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateEventName = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<EventName> = {},
): EventName => {
  const module = getOrCreateModule(cache, block, id)
  cache.modules.set(module.id, module)
  cache.isModified = true

  const eventModuleName = cache.eventNames.get(stringUID(id))

  if (!eventModuleName) return createEventName(block, id, props)

  return eventModuleName
}
