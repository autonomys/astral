import { Event } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber } from '../utils'
import { Cache } from '../utils/cache'

export const createEvent = (block: CtxBlock, id: string, props: Partial<Event> = {}): Event => {
  const blockNumber = getBlockNumber(block)
  return new Event({
    id: id,
    indexInBlock: props.indexInBlock ?? 0,
    name: props.name ?? '',
    timestamp: props.timestamp ?? new Date(),
    phase: props.phase ?? '',
    pos: props.pos ?? 0,
    args: props.args ?? '',
    blockId: props.blockId ?? '',
    extrinsicId: props.extrinsicId ?? '',
    callId: props.callId ?? '',
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateEvent = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Event> = {},
): Event => {
  const event = cache.events.get(id)

  if (!event) return createEvent(block, id, props)

  return event
}
