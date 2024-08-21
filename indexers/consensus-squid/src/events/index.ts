import type { ApiPromise } from '@autonomys/auto-utils'
import type { CtxBlock, CtxEvent, CtxExtrinsic } from '../processor'
import { getOrCreateEvent, getOrCreateEventName } from '../storage'
import { events } from '../types'
import { Cache } from '../utils/cache'
import { processTransferEvent } from './account'

export async function processEvents(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
) {
  for (let [index, event] of extrinsic.events.entries()) {
    const _event = getOrCreateEvent(cache, block, event.id, {
      indexInBlock: index,
      name: event.name,
      args: JSON.stringify(extrinsic.call?.args ?? {}),
      extrinsicId: extrinsic.id,
      blockHeight: BigInt(block.header.height ?? 0),
      blockId: block.header.id,
    })
    cache.events.set(_event.id, _event)
    cache.isModified = true

    cache = await processEvent(cache, api, block, extrinsic, event)
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
  const eventName = getOrCreateEventName(cache, block, event.name)
  eventName.count++
  cache.eventNames.set(eventName.id, eventName)
  cache.isModified = true

  switch (event.name) {
    case events.balances.transfer.name:
      return processTransferEvent(cache, block, event)

    default:
      return cache
  }
}
