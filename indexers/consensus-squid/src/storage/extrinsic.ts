import { Extrinsic } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, getTimestamp } from '../utils'
import { Cache } from '../utils/cache'

export const createExtrinsic = (
  block: CtxBlock,
  id: string,
  props: Partial<Extrinsic> = {},
): Extrinsic => {
  const blockNumber = getBlockNumber(block)
  return new Extrinsic({
    id: id,
    hash: props.hash ?? '',
    indexInBlock: props.indexInBlock ?? 0,
    nonce: props.nonce ?? BigInt(0),
    name: props.name ?? '',
    accountId: props.accountId ?? '',
    signature: props.signature ?? '',
    error: props.error ?? '',
    tip: props.tip ?? BigInt(0),
    fee: props.fee ?? BigInt(0),
    success: props.success ?? false,
    blockId: props.blockId ?? '',
    blockHeight: props.blockHeight ?? BigInt(0),
    pos: props.pos ?? 0,
    args: props.args ?? '',
    timestamp: props.timestamp ?? BigInt(0),
    date: props.date ?? getTimestamp(block),
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateExtrinsic = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<Extrinsic> = {},
): Extrinsic => {
  const extrinsic = cache.extrinsics.get(id)

  if (!extrinsic) return createExtrinsic(block, id, props)

  return extrinsic
}
