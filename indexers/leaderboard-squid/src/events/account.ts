import type { CtxBlock, CtxEvent } from '../processor'
import {
  getOrCreateAccountRemarkCount,
  getOrCreateAccountTransferReceiverTotalCount,
  getOrCreateAccountTransferReceiverTotalValue,
  getOrCreateAccountTransferSenderTotalCount,
  getOrCreateAccountTransferSenderTotalValue,
} from '../storage/account'
import { getBlockNumber, getExtrinsicSigner, getTimestamp, hexToAccount } from '../utils'
import { Cache } from '../utils/cache'

export function processTransferEvent(cache: Cache, block: CtxBlock, event: CtxEvent) {
  const from = hexToAccount(event.args.from)
  const to = hexToAccount(event.args.to)
  const amount = BigInt(event.args.amount)

  const accountTransferSenderTotalCount = getOrCreateAccountTransferSenderTotalCount(
    cache,
    block,
    from,
  )

  accountTransferSenderTotalCount.value++
  accountTransferSenderTotalCount.lastContributionAt = getTimestamp(block)
  accountTransferSenderTotalCount.updatedAt = getBlockNumber(block)

  cache.accountTransferSenderTotalCount.set(
    accountTransferSenderTotalCount.id,
    accountTransferSenderTotalCount,
  )

  const accountTransferSenderTotalValue = getOrCreateAccountTransferSenderTotalValue(
    cache,
    block,
    from,
  )

  accountTransferSenderTotalValue.value += amount
  accountTransferSenderTotalValue.lastContributionAt = getTimestamp(block)
  accountTransferSenderTotalValue.updatedAt = getBlockNumber(block)

  cache.accountTransferSenderTotalValue.set(
    accountTransferSenderTotalValue.id,
    accountTransferSenderTotalValue,
  )

  const accountTransferReceiverTotalCount = getOrCreateAccountTransferReceiverTotalCount(
    cache,
    block,
    to,
  )

  accountTransferReceiverTotalCount.value++
  accountTransferReceiverTotalCount.lastContributionAt = getTimestamp(block)
  accountTransferReceiverTotalCount.updatedAt = getBlockNumber(block)

  cache.accountTransferReceiverTotalCount.set(
    accountTransferReceiverTotalCount.id,
    accountTransferReceiverTotalCount,
  )

  const accountTransferReceiverTotalValue = getOrCreateAccountTransferReceiverTotalValue(
    cache,
    block,
    to,
  )

  accountTransferReceiverTotalValue.value += amount
  accountTransferReceiverTotalValue.lastContributionAt = getTimestamp(block)
  accountTransferReceiverTotalValue.updatedAt = getBlockNumber(block)

  cache.accountTransferReceiverTotalValue.set(
    accountTransferReceiverTotalValue.id,
    accountTransferReceiverTotalValue,
  )

  cache.isModified = true

  return cache
}

export function processRemarkEvent(cache: Cache, block: CtxBlock, event: CtxEvent) {
  const extrinsicIndex = event.extrinsicIndex ?? 0
  const extrinsic = block.extrinsics[extrinsicIndex]

  // exit if extrinsic has no signature
  if (!extrinsic.signature) return cache

  const accountId = getExtrinsicSigner(extrinsic)
  console.log('accountId', accountId)

  const accountRemarkCount = getOrCreateAccountRemarkCount(cache, block, accountId)

  accountRemarkCount.value++
  accountRemarkCount.lastContributionAt = getTimestamp(block)
  accountRemarkCount.updatedAt = getBlockNumber(block)

  cache.accountRemarkCount.set(accountRemarkCount.id, accountRemarkCount)

  cache.isModified = true

  return cache
}
