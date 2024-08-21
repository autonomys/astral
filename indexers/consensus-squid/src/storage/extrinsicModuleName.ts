import { ExtrinsicModuleName } from '../model'
import type { CtxBlock } from '../processor'
import { getBlockNumber } from '../utils'
import { Cache } from '../utils/cache'

export const createExtrinsicModuleName = (
  block: CtxBlock,
  id: string,
  props: Partial<ExtrinsicModuleName> = {},
): ExtrinsicModuleName => {
  const blockNumber = getBlockNumber(block)
  return new ExtrinsicModuleName({
    id: id,
    name: '',
    createdAt: blockNumber,
    ...props,
  })
}

export const getOrCreateExtrinsicModuleName = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<ExtrinsicModuleName> = {},
): ExtrinsicModuleName => {
  const extrinsicModuleName = cache.extrinsicModuleNames.get(id)

  if (!extrinsicModuleName) return createExtrinsicModuleName(block, id, props)

  return extrinsicModuleName
}
