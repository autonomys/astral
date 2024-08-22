import type { ApiPromise } from '@autonomys/auto-utils'
import { Store } from '@subsquid/typeorm-store'
import { processExtrinsics } from '../extrinsics'
import type { Ctx, CtxBlock } from '../processor'
import {
  getOrCreateAccount,
  getOrCreateBlock,
  getOrCreateLog,
  getOrCreateLogKind,
} from '../storage'
import { events } from '../types/'
import { solutionRanges } from '../types/subspace/storage'
import { digest } from '../types/system/storage'
import { calcSpacePledged, getBlockAuthor, getBlockNumber, logBlock, stringUID } from '../utils'
import { Cache, load, save } from '../utils/cache'

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  let cache: Cache = await load(ctx)
  logBlock(ctx.blocks)
  for (let block of ctx.blocks) {
    try {
      const solutionRang = await solutionRanges.v0.get(block.header)
      const spacePledged = solutionRang
        ? calcSpacePledged(solutionRang.current)
        : calcSpacePledged(solutionRanges.v0.getDefault(block.header).current)
      const event = block.events.filter((event) => event.name === events.subspace.farmerVote.name)

      const address = await getBlockAuthor(block, api)
      if (address) {
        const account = getOrCreateAccount(cache, block, address)
        cache.accounts.set(account.id, account)
      }
      const _block = getOrCreateBlock(cache, block, {
        id: block.header.id,
        height: BigInt(block.header.height ?? 0),
        timestamp: BigInt(block.header.timestamp ?? 0),
        hash: block.header.hash ?? '',
        parentHash: block.header.parentHash ?? '',
        specId: block.header.specVersion.toString() ?? '',
        spacePledged,
        extrinsicsCount: block.extrinsics.length ?? 0,
        eventsCount: block.events.length ?? 0,
        accountId: address ?? '',
      })
      cache.blocks.set(_block.id, _block)
      cache.isModified = true
    } catch (error) {
      console.error('Failed to process block:', error)
    }
    try {
      const _digest = await digest.v0.get(block.header)
      if (_digest) {
        _digest.logs.forEach((log, index) => {
          const logKind = getOrCreateLogKind(cache, block, log.__kind)
          logKind.count++
          logKind.updatedAt = getBlockNumber(block)
          cache.logKinds.set(logKind.id, logKind)

          const _log = getOrCreateLog(cache, block, `${block.header.id}-${index}`, {
            kind: log.__kind,
            value: (log as any).value,
            blockId: block.header.id,
          })
          cache.logs.set(_log.id, _log)
        })
      }
    } catch (error) {
      console.error('Failed to process block:', error)
    }

    cache = await processBlock(cache, api, block)
  }

  await save(ctx, cache)
}

async function processBlock(cache: Cache, api: ApiPromise, block: CtxBlock) {
  return await processExtrinsics(cache, api, block, block.extrinsics)
}
