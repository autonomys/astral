import type { CtxBlock, CtxEvent } from '../processor'
import {
  getOrCreateAccountExtrinsicFailedTotalCount,
  getOrCreateAccountExtrinsicSuccessTotalCount,
  getOrCreateAccountExtrinsicTotalCount,
} from '../storage/account'
import { getBlockNumber, getExtrinsicSigner, getTimestamp } from '../utils'
import { Cache } from '../utils/cache'

export function processExtrinsicSuccessEvent(cache: Cache, block: CtxBlock, event: CtxEvent) {
  const extrinsicIndex = event.extrinsicIndex ?? 0
  const extrinsic = block.extrinsics[extrinsicIndex]

  // exit if extrinsic has no signature
  if (!extrinsic.signature) return cache

  const accountId = getExtrinsicSigner(extrinsic)
  const accountExtrinsicTotalCount = getOrCreateAccountExtrinsicTotalCount(cache, block, accountId)

  accountExtrinsicTotalCount.value++
  accountExtrinsicTotalCount.lastContributionAt = getTimestamp(block)
  accountExtrinsicTotalCount.updatedAt = getBlockNumber(block)

  cache.accountExtrinsicTotalCount.set(accountExtrinsicTotalCount.id, accountExtrinsicTotalCount)

  const accountExtrinsicSuccessTotalCount = getOrCreateAccountExtrinsicSuccessTotalCount(
    cache,
    block,
    accountId,
  )

  accountExtrinsicSuccessTotalCount.value++
  accountExtrinsicSuccessTotalCount.lastContributionAt = getTimestamp(block)
  accountExtrinsicSuccessTotalCount.updatedAt = getBlockNumber(block)

  cache.accountExtrinsicSuccessTotalCount.set(
    accountExtrinsicSuccessTotalCount.id,
    accountExtrinsicSuccessTotalCount,
  )

  cache.isModified = true

  return cache
}

export function processExtrinsicFailedEvent(cache: Cache, block: CtxBlock, event: CtxEvent) {
  const extrinsicIndex = event.extrinsicIndex ?? 0
  const extrinsic = block.extrinsics[extrinsicIndex]

  // exit if extrinsic has no signature
  if (!extrinsic.signature) return cache

  const accountId = getExtrinsicSigner(extrinsic)
  const accountExtrinsicTotalCount = getOrCreateAccountExtrinsicTotalCount(cache, block, accountId)

  accountExtrinsicTotalCount.value++
  accountExtrinsicTotalCount.lastContributionAt = getTimestamp(block)
  accountExtrinsicTotalCount.updatedAt = getBlockNumber(block)

  cache.accountExtrinsicTotalCount.set(accountExtrinsicTotalCount.id, accountExtrinsicTotalCount)

  const accountExtrinsicFailedTotalCount = getOrCreateAccountExtrinsicFailedTotalCount(
    cache,
    block,
    accountId,
  )

  accountExtrinsicFailedTotalCount.value++
  accountExtrinsicFailedTotalCount.lastContributionAt = getTimestamp(block)
  accountExtrinsicFailedTotalCount.updatedAt = getBlockNumber(block)

  cache.accountExtrinsicFailedTotalCount.set(
    accountExtrinsicFailedTotalCount.id,
    accountExtrinsicFailedTotalCount,
  )

  cache.isModified = true

  return cache
}
