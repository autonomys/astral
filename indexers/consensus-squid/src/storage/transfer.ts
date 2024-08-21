import { Transfer } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber } from '../utils'
import { Cache } from '../utils/cache'

export const createTransfer = (
  block: CtxBlock,
  id: string,
  props: Partial<Transfer> = {},
): Transfer => {
  const blockNumber = getBlockNumber(block)
  return new Transfer({
    id: id,
    from: props.from ?? '',
    to: props.to ?? '',
    value: props.value ?? BigInt(0),
    fee: props.fee ?? BigInt(0),
    timestamp: props.timestamp ?? BigInt(0),
    createdAt: blockNumber,
  })
}

export const getOrCreateTransfer = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Transfer> = {},
): Transfer => {
  const transfer = cache.transfers.get(id)

  if (!transfer) return createTransfer(block, id, props)

  return transfer
}
