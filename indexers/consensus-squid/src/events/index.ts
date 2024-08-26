import type { CtxBlock, CtxEvent, CtxExtrinsic } from '../processor'
import { getOrCreateEvent, getOrCreateEventName, getOrCreateModule } from '../storage'
import { getBlockNumber, getCallSigner } from '../utils'
import { Cache } from '../utils/cache'

export function processEvents(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  blockOwner: string,
) {
  const blockHeight = BigInt(block.header.height ?? 0)
  const blockId = block.header.id
  const timestamp = BigInt(block.header.timestamp ?? 0)
  const phase = (extrinsic as any)?.phase ?? BigInt(0)

  for (let [index, event] of extrinsic.events.entries()) {
    try {
      const _event = getOrCreateEvent(cache, block, event.id, {
        indexInBlock: index,
        name: event.name,
        extrinsicId: extrinsic.id,
        accountId: extrinsic.call && extrinsic.call.origin ? getCallSigner(extrinsic.call) : blockOwner,
        blockHeight,
        blockId,
        callId: extrinsic.call?.id ?? '',
        phase,
        timestamp,
      })
      cache.events.set(_event.id, _event)
      cache.isModified = true

      cache = processEvent(cache, block, event)
    } catch (error) {
      console.error('Failed to process event:', error)
    }
  }
  return cache
}

function processEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent,
) {
  const module = getOrCreateModule(cache, block, event.name)
  module.eventCount++
  module.updatedAt = getBlockNumber(block)
  cache.modules.set(module.id, module)

  const eventName = getOrCreateEventName(cache, block, event.name)
  eventName.count++
  eventName.updatedAt = getBlockNumber(block)
  cache.eventNames.set(eventName.id, eventName)
  cache.isModified = true

  return cache
}