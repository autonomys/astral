import { LogKind } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, stringUID } from '../utils'
import { Cache } from '../utils/cache'

export const createLogKind = (
  block: CtxBlock,
  id: string,
  props: Partial<LogKind> = {},
): LogKind => {
  const blockNumber = getBlockNumber(block)
  return new LogKind({
    id: stringUID(id),
    kind: props.kind ?? '',
    count: props.count ?? 0,
    createdAt: blockNumber,
    updatedAt: blockNumber,
    ...props,
  })
}

export const getOrCreateLogKind = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<LogKind> = {},
): LogKind => {
  const logKind = cache.logKinds.get(stringUID(id))

  if (!logKind) return createLogKind(block, id, props)

  return logKind
}
