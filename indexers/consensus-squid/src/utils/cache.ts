import { Store } from '@subsquid/typeorm-store'
import { Entity } from '@subsquid/typeorm-store/src/store'
import {
  Block,
  Event,
  EventName,
  Extrinsic,
  ExtrinsicName,
  Module,
  SlackMessage,
} from '../model'
import type { Ctx } from '../processor'

export type PermanentCache = {
  modules: Map<string, Module>
  eventNames: Map<string, EventName>
  extrinsicNames: Map<string, ExtrinsicName>

  slackMessages: Map<string, SlackMessage>
}

export type TemporaryCache = {
  blocks: Map<string, Block>
  extrinsics: Map<string, Extrinsic>
  events: Map<string, Event>
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
  modules: new Map(),
  eventNames: new Map(),
  extrinsicNames: new Map(),
  slackMessages: new Map(),
}

export const initTemporaryCache: TemporaryCache = {
  blocks: new Map(),
  extrinsics: new Map(),
  events: new Map(),
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
  const [modules, eventNames, extrinsicNames, slackMessages] = await Promise.all([
    ctx.store.find(Module),
    ctx.store.find(EventName),
    ctx.store.find(ExtrinsicName),
    ctx.store.find(SlackMessage),
  ])

  console.log(
    '\x1b[32mLoaded in cache:\x1b[0m',
    modules.length + ' modules, ',
    eventNames.length + ' eventNames, ',
    extrinsicNames.length + ' extrinsicNames, ',
    slackMessages.length + ' slackMessages',
  )

  return {
    ...initCache,
    modules: new Map(modules.map((m) => [m.id, m])),
    eventNames: new Map(eventNames.map((e) => [e.id, e])),
    extrinsicNames: new Map(extrinsicNames.map((e) => [e.id, e])),
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

  let logPerm = logEntry('modules', cache.modules)
  logPerm += logEntry('eventNames', cache.eventNames)
  logPerm += logEntry('extrinsicNames', cache.extrinsicNames)
  logPerm += logEntry('slackMessages', cache.slackMessages)

  let logTemp = logEntry('blocks', cache.blocks)
  logTemp += logEntry('extrinsics', cache.extrinsics)
  logTemp += logEntry('events', cache.events)

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

  cache.isModified = false
}
