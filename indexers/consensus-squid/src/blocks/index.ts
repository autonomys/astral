import type { ApiPromise } from '@autonomys/auto-utils'
import { Store } from '@subsquid/typeorm-store'
import { processExtrinsics } from '../extrinsics'
import { SlackMessage } from '../model'
import type { Ctx } from '../processor'
import {
  getOrCreateBlock,
} from '../storage'
import { solutionRanges } from '../types/subspace/storage'
import {
  calcSpacePledged,
  getBlockAuthor,
  getHistorySize,
  logBlock,
} from '../utils'
import { Cache, LastSlackMsg, load, save } from '../utils/cache'
import { sendSlackStatsMessage } from '../utils/slack'

export async function processBlocks(ctx: Ctx<Store>, api: ApiPromise) {
  let cache: Cache = await load(ctx)

  const logMsg = logBlock(ctx.blocks)
  const lastSlackMsgKey: LastSlackMsg = 'lastSlackMsg'
  const lastSlackMsg = cache.slackMessages.get(lastSlackMsgKey)
  const slackMsg = await sendSlackStatsMessage(logMsg, lastSlackMsg ? lastSlackMsg.messageId : undefined)
  if (slackMsg) cache.slackMessages.set(lastSlackMsgKey, new SlackMessage({
    id: lastSlackMsgKey,
    messageId: slackMsg,
    }))

  for (let block of ctx.blocks) {
    const [solutionRang, blockchainSize, owner] = await Promise.all([
      solutionRanges.v0.get(block.header),
      getHistorySize(ctx, block, api),
      getBlockAuthor(block, api),
    ])
    const spacePledged = solutionRang
      ? calcSpacePledged(solutionRang.current)
      : calcSpacePledged(solutionRanges.v0.getDefault(block.header).current)

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

    cache = processExtrinsics(cache, block, block.extrinsics, owner ?? '')

    if (block.header.height % 100 === 0) await save(ctx, cache)
  }

  await save(ctx, cache)
}