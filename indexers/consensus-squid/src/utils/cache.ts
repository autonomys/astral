import { Store } from '@subsquid/typeorm-store'
import { Entity } from '@subsquid/typeorm-store/src/store'
import {
  Account,
  Block,
  Call,
  Event,
  EventModuleName,
  Extrinsic,
  ExtrinsicModuleName,
  Log,
} from '../model'
import type { Ctx } from '../processor'

export type PermanentCache = {
  extrinsicModuleNames: Map<string, ExtrinsicModuleName>
  eventModuleNames: Map<string, EventModuleName>

  accounts: Map<string, Account>
}

export type TemporaryCache = {
  blocks: Map<string, Block>
  extrinsics: Map<string, Extrinsic>
  events: Map<string, Event>
  calls: Map<string, Call>
  logs: Map<string, Log>
}

type CacheManager = {
  isModified: boolean
}

export type Cache = PermanentCache & TemporaryCache & CacheManager

export const initPermanentCache: PermanentCache = {
  extrinsicModuleNames: new Map(),
  eventModuleNames: new Map(),
  accounts: new Map(),
}

export const initTemporaryCache: TemporaryCache = {
  blocks: new Map(),
  extrinsics: new Map(),
  events: new Map(),
  calls: new Map(),
  logs: new Map(),
}

export const initCacheManager: CacheManager = {
  isModified: false,
}

export const initCache: Cache = {
  ...initPermanentCache,
  ...initTemporaryCache,
  ...initCacheManager,
}

export const load = async (ctx: Ctx<Store>): Promise<Cache> => {
  const [extrinsicModuleNames, eventModuleNames, accounts] = await Promise.all([
    ctx.store.find(ExtrinsicModuleName),
    ctx.store.find(EventModuleName),
    ctx.store.find(Account),
  ])

  console.log(
    '\x1b[32mLoaded in cache:\x1b[0m',
    extrinsicModuleNames.length + ' extrinsicModuleNames, ',
    eventModuleNames.length + ' eventModuleNames, ',
    accounts.length + ' accounts',
  )

  return {
    ...initCache,
    extrinsicModuleNames: new Map(extrinsicModuleNames.map((e) => [e.id, e])),
    eventModuleNames: new Map(eventModuleNames.map((e) => [e.id, e])),
    accounts: new Map(accounts.map((a) => [a.id, a])),
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

  let logPerm = logEntry('eventModuleNames', cache.eventModuleNames)
  logPerm += logEntry('extrinsicModuleNames', cache.extrinsicModuleNames)
  logPerm += logEntry('accounts', cache.accounts)

  let logTemp = logEntry('blocks', cache.blocks)
  logTemp += logEntry('extrinsics', cache.extrinsics)
  logTemp += logEntry('events', cache.events)
  logTemp += logEntry('calls', cache.calls)
  logTemp += logEntry('logs', cache.logs)

  console.log('\x1b[34mSaving in database:\x1b[0m', logPerm)
  console.log(' and ', logTemp, '\n')

  await Promise.all(
    Object.keys(cache).map((k) =>
      !Object.keys(initCacheManager).includes(k) ? saveEntry(ctx, cache, k as keyof Cache) : null,
    ),
  )

  // Clear the cache for entries not needed for reference
  cache.blocks.clear()
  cache.extrinsics.clear()
  cache.events.clear()
  cache.calls.clear()
  cache.logs.clear()
}
