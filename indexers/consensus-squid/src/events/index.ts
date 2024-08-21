import type { ApiPromise } from '@autonomys/auto-utils'
import type { CtxBlock, CtxEvent, CtxExtrinsic } from '../processor'
import { getOrCreateEvent, getOrCreateEventName } from '../storage'
import { Cache } from '../utils/cache'

export async function processEvents(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
) {
  for (let event of extrinsic.events) {
    const _event = getOrCreateEvent(cache, block, event.id, {
      name: event.name,
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
    default:
      return cache
  }
}
