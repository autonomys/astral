import { Event } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, getTimestamp } from '../utils'
import { Cache } from '../utils/cache'

export const createEvent = (block: CtxBlock, id: string, props: Partial<Event> = {}): Event => {
  const blockNumber = getBlockNumber(block)
  return new Event({
    id: id,
    indexInBlock: props.indexInBlock ?? 0,
    name: props.name ?? '',
    phase: props.phase ?? '',
    pos: props.pos ?? 0,
    args: props.args ?? '',
    blockId: props.blockId ?? '',
    accountId: props.accountId ?? '',
    blockHeight: props.blockHeight ?? BigInt(0),
    extrinsicId: props.extrinsicId ?? '',
    callId: props.callId ?? '',
    timestamp: props.timestamp ?? BigInt(0),
    date: props.date ?? getTimestamp(block),
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
