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
import { solutionRanges } from '../types/subspace/storage'
import { digest } from '../types/system/storage'
import {
  calcSpacePledged,
  getBlockAuthor,
  getBlockNumber,
  getHistorySize,
  logBlock,
} from '../utils'
import { Cache, load, save } from '../utils/cache'

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  let cache: Cache = await load(ctx)
  logBlock(ctx.blocks)
  for (let block of ctx.blocks) {
    console.log('Processing block:', block.header.id)
    const solutionRang = await solutionRanges.v0.get(block.header)
    const spacePledged = solutionRang
      ? calcSpacePledged(solutionRang.current)
      : calcSpacePledged(solutionRanges.v0.getDefault(block.header).current)
    const blockchainSize = await getHistorySize(ctx, block, api)

    const owner = await getBlockAuthor(block, api)
    if (owner) {
      const account = getOrCreateAccount(cache, block, owner)
      cache.accounts.set(account.id, account)
    }
    const _block = getOrCreateBlock(cache, block, {
      id: block.header.id,
      height: BigInt(block.header.height ?? 0),
      timestamp: BigInt(block.header.timestamp ?? 0),
      hash: block.header.hash ?? '',
      parentHash: block.header.parentHash ?? '',
      specId: block.header.specVersion.toString() ?? '',
      stateRoot: (block.header as any)?.stateRoot ?? '',
      extrinsicsRoot: (block.header as any)?.extrinsicsRoot ?? '',
      spacePledged,
      blockchainSize,
      extrinsicsCount: block.extrinsics.length ?? 0,
      eventsCount: block.events.length ?? 0,
      owner: owner ?? '',
    })
    cache.blocks.set(_block.id, _block)

    try {
      const _digest = await digest.v0.get(block.header)
      if (_digest) {
        _digest.logs.forEach((log, index) => {
          const logKind = getOrCreateLogKind(cache, block, log.__kind, {
            kind: log.__kind,
          })
          logKind.count++
          logKind.updatedAt = getBlockNumber(block)
          cache.logKinds.set(logKind.id, logKind)

          const _log = getOrCreateLog(cache, block, `${block.header.id}-${index}`, {
            kind: log.__kind,
            value: (log as any).value,
            blockId: block.header.id,
            accountId: owner ?? '',
          })
          cache.logs.set(_log.id, _log)
        })
      }
    } catch (error) {
      console.error('Failed to process log:', error)
    }

    cache.isModified = true

    cache = await processBlock(cache, api, block, owner ?? '')
  }

  await save(ctx, cache)
}

async function processBlock(cache: Cache, api: ApiPromise, block: CtxBlock, blockOwner: string) {
  return await processExtrinsics(cache, api, block, block.extrinsics, blockOwner)
}
