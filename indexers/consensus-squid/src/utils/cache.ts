import { Store } from '@subsquid/typeorm-store'
import { Entity } from '@subsquid/typeorm-store/src/store'
import {
  Account,
  Block,
  Call,
  Event,
  EventName,
  Extrinsic,
  ExtrinsicName,
  Log,
  Module,
  Transfer,
} from '../model'
import type { Ctx } from '../processor'

export type PermanentCache = {
  modules: Map<string, Module>
  eventNames: Map<string, EventName>
  extrinsicNames: Map<string, ExtrinsicName>

  accounts: Map<string, Account>
}

export type TemporaryCache = {
  blocks: Map<string, Block>
  extrinsics: Map<string, Extrinsic>
  events: Map<string, Event>
  calls: Map<string, Call>
  logs: Map<string, Log>

  transfers: Map<string, Transfer>
}

type CacheManager = {
  isModified: boolean
}

export type Cache = PermanentCache & TemporaryCache & CacheManager

export const initPermanentCache: PermanentCache = {
  modules: new Map(),
  eventNames: new Map(),
  extrinsicNames: new Map(),
  accounts: new Map(),
}

export const initTemporaryCache: TemporaryCache = {
  blocks: new Map(),
  extrinsics: new Map(),
  events: new Map(),
  calls: new Map(),
  logs: new Map(),
  transfers: new Map(),
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
  const [modules, eventNames, extrinsicNames, accounts] = await Promise.all([
    ctx.store.find(Module),
    ctx.store.find(EventName),
    ctx.store.find(ExtrinsicName),
    ctx.store.find(Account),
  ])

  console.log(
    '\x1b[32mLoaded in cache:\x1b[0m',
    modules.length + ' modules, ',
    eventNames.length + ' eventNames, ',
    extrinsicNames.length + ' extrinsicNames, ',
    accounts.length + ' accounts',
  )

  return {
    ...initCache,
    modules: new Map(modules.map((m) => [m.id, m])),
    eventNames: new Map(eventNames.map((e) => [e.id, e])),
    extrinsicNames: new Map(extrinsicNames.map((e) => [e.id, e])),
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

  let logPerm = logEntry('modules', cache.modules)
  logPerm += logEntry('eventNames', cache.eventNames)
  logPerm += logEntry('extrinsicNames', cache.extrinsicNames)
  logPerm += logEntry('accounts', cache.accounts)

  let logTemp = logEntry('blocks', cache.blocks)
  logTemp += logEntry('extrinsics', cache.extrinsics)
  logTemp += logEntry('events', cache.events)
  logTemp += logEntry('calls', cache.calls)
  logTemp += logEntry('logs', cache.logs)
  logTemp += logEntry('transfers', cache.transfers)

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
  cache.transfers.clear()

  cache.isModified = false
}
