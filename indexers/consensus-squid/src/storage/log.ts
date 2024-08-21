import { Log } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber } from '../utils'
import { Cache } from '../utils/cache'

export const createLog = (block: CtxBlock, id: string, props: Partial<Log> = {}): Log => {
  const blockNumber = getBlockNumber(block)
  return new Log({
    id: id,
    kind: props.kind ?? '',
    value: props.value ?? '',
    blockId: props.blockId ?? '',
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateLog = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Log> = {},
): Log => {
  const log = cache.logs.get(id)

  if (!log) return createLog(block, id, props)

  return log
}
