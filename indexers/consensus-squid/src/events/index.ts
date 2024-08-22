import type { ApiPromise } from '@autonomys/auto-utils'
import type { CtxBlock, CtxEvent, CtxExtrinsic } from '../processor'
import { getOrCreateEvent, getOrCreateEventName, getOrCreateModule } from '../storage'
import { events } from '../types'
import { getBlockNumber, getCallSigner } from '../utils'
import { Cache } from '../utils/cache'
import { processTransferEvent } from './account'
import { processCodeUpdatedEvent } from './code'

export async function processEvents(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  blockOwner: string,
) {
  for (let [index, event] of extrinsic.events.entries()) {
    try {
      const _event = getOrCreateEvent(cache, block, event.id, {
        indexInBlock: index,
        name: event.name,
        extrinsicId: extrinsic.id,
        accountId:
          extrinsic.call && extrinsic.call.origin ? getCallSigner(extrinsic.call) : blockOwner,
        blockHeight: BigInt(block.header.height ?? 0),
        blockId: block.header.id,
        timestamp: BigInt(block.header.timestamp ?? 0),
      })
      try {
        _event.args = JSON.stringify(extrinsic.call?.args ?? {})
      } catch (error) {
        console.error('Failed to process event:', error)
      }
      cache.events.set(_event.id, _event)
      cache.isModified = true

      cache = await processEvent(cache, api, block, extrinsic, event)
    } catch (error) {
      console.error('Failed to process event:', error)
    }
  }
  return cache
}

async function processEvent(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
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

  switch (event.name) {
    case events.balances.transfer.name:
      return processTransferEvent(cache, block, event)

    case events.system.codeUpdated.name:
      return processCodeUpdatedEvent(cache, api, block, extrinsic, event)

    default:
      return cache
  }
}
