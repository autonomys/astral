import { Store } from '@subsquid/typeorm-store'
import { Entity } from '@subsquid/typeorm-store/src/store'
import {
  Account,
  SlackMessage,
  Transfer
} from '../model'
import type { Ctx } from '../processor'

export type PermanentCache = {
  slackMessages: Map<string, SlackMessage>
}

export type TemporaryCache = {
  accounts: Map<string, Account>
  transfers: Map<string, Transfer>
}

export type LastSlackMsg = `lastSlackMsg`
export const lastSlackMsgKey: LastSlackMsg = 'lastSlackMsg'

type InternalKeyStore = LastSlackMsg

type CacheManager = {
  isModified: boolean
  internalKeyStore: Map<InternalKeyStore, string>
}

export type Cache = PermanentCache & TemporaryCache & CacheManager

export const initPermanentCache: PermanentCache = {
  slackMessages: new Map(),
}

export const initTemporaryCache: TemporaryCache = {
  accounts: new Map(),
  transfers: new Map(),
}

export const initCacheManager: CacheManager = {
  isModified: false,
  internalKeyStore: new Map(),
}

export const initCache: Cache = {
  ...initPermanentCache,
  ...initTemporaryCache,
  ...initCacheManager,
}

export const load = async (ctx: Ctx<Store>): Promise<Cache> => {
  const [slackMessages] = await Promise.all([
    ctx.store.find(SlackMessage),
  ])

  console.log(
    '\x1b[32mLoaded in cache:\x1b[0m',
    slackMessages.length + ' slackMessages',
  )

  return {
    ...initCache,
    slackMessages: new Map(slackMessages.map((s) => [s.id, s])),
  }
}

const saveEntry = async <E extends Entity>(ctx: Ctx<Store>, cache: Cache, name: keyof Cache) => {
  try {
    const entity = cache[name] as unknown as Map<string, E>
    if (entity.size === 0) return

    await ctx.store.save(Array.from(entity.values()))
  } catch (e) {
    console.error(`Failed to save ${name} with error:`, e)
  }
}

const logEntry = <K>(name: string, entry: Map<string, K>) =>
  entry.size > 0 ? entry.size + ' ' + name + ', ' : ''

export const save = async (ctx: Ctx<Store>, cache: Cache) => {
  // If the cache is not modified, skip saving
  if (!cache.isModified) return

  let logPerm = logEntry('slackMessages', cache.slackMessages)

  let logTemp = logEntry('accounts', cache.accounts)
  logTemp += logEntry('transfers', cache.transfers)

  console.log('\x1b[34mSaving in database:\x1b[0m', logPerm)
  console.log(' and ', logTemp, '\n')

  await Promise.all(
    Object.keys(cache).map((k) =>
      !Object.keys(initCacheManager).includes(k) ? saveEntry(ctx, cache, k as keyof Cache) : null,
    ),
  )

  // Clear the cache for entries not needed for reference
  cache.accounts.clear()
  cache.transfers.clear()

  cache.isModified = false
}
