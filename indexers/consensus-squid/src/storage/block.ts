import { Block } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber, getTimestamp } from '../utils'
import { Cache } from '../utils/cache'

export const createBlock = (block: CtxBlock, props: Partial<Block> = {}): Block => {
  const blockNumber = getBlockNumber(block)
  return new Block({
    id: props.id ?? '',
    height: props.height ?? BigInt(0),
    hash: props.hash ?? '',
    parentHash: props.parentHash ?? '',
    specId: props.specId ?? '',
    stateRoot: props.stateRoot ?? '',
    extrinsicsRoot: props.extrinsicsRoot ?? '',
    spacePledged: props.spacePledged ?? BigInt(0),
    blockchainSize: props.blockchainSize ?? BigInt(0),
    extrinsicsCount: props.extrinsicsCount ?? 0,
    eventsCount: props.eventsCount ?? 0,
    owner: props.owner ?? '',
    timestamp: props.timestamp ?? BigInt(0),
    date: props.date ?? getTimestamp(block),
    ...props,
  })
}

export const getOrCreateBlock = (
  cache: Cache,
  block: CtxBlock,
  props: Partial<Block> = {},
): Block => {
  const blockId = props.id ?? ''
  const cachedBlock = cache.blocks.get(blockId)

  if (!cachedBlock) return createBlock(block, props)

  return cachedBlock
}
