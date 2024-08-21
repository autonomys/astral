import type { CtxBlock, CtxEvent } from '../processor'
import { getOrCreateAccount } from '../storage/account'
import { hexToAccount } from '../utils'
import { Cache } from '../utils/cache'

export function processTransferEvent(cache: Cache, block: CtxBlock, event: CtxEvent) {
  const from = hexToAccount(event.args.from)
  const to = hexToAccount(event.args.to)
  const amount = BigInt(event.args.amount)

  const fromAccount = getOrCreateAccount(cache, block, from)
  const toAccount = getOrCreateAccount(cache, block, to)
  cache.accounts.set(fromAccount.id, fromAccount)
  cache.accounts.set(toAccount.id, toAccount)
  cache.isModified = true

  return cache
}
