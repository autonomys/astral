import { Call } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, getTimestamp } from '../utils'
import { Cache } from '../utils/cache'

export const createCall = (block: CtxBlock, id: string, props: Partial<Call> = {}): Call => {
  const blockNumber = getBlockNumber(block)
  return new Call({
    id: id,
    name: props.name ?? '',
    success: props.success ?? false,
    args: props.args ?? '',
    blockId: props.blockId ?? '',
    extrinsicId: props.extrinsicId ?? '',
    error: props.error ?? '',
    accountId: props.accountId ?? '',
    parent: props.parent ?? '',
    pos: props.pos ?? 0,
    timestamp: props.timestamp ?? BigInt(0),
    date: props.date ?? getTimestamp(block),
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateCall = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Call> = {},
): Call => {
  const call = cache.calls.get(id)

  if (!call) return createCall(block, id, props)

  return call
}
