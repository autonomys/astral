import { createConnection } from '@autonomys/auto-utils'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { assertNotNull } from '@subsquid/util-internal'
import { SlackMessage } from './model'
import { processor } from './processor'
import { getOrCreateAccount, getOrCreateTransfer } from './storage'
import { events } from './types'
import { account } from './types/system/storage'
import {
  getBlockNumber,
  hexToAccount,
  logBlock
} from './utils'
import { Cache, LastSlackMsg, load, save } from './utils/cache'
import { sendSlackStatsMessage } from './utils/slack'

const types = {
  Solution: {
    public_key: 'AccountId32',
    reward_address: 'AccountId32',
  },
  SubPreDigest: {
    slot: 'u64',
    solution: 'Solution',
  },
}

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const api = await createConnection(
    assertNotNull(process.env.RPC_CONSENSUS_HTTP, 'No RPC_CONSENSUS_HTTP env'),
    { types },
  )

  let cache: Cache = await load(ctx)

  const logMsg = logBlock(ctx.blocks)
  const lastSlackMsgKey: LastSlackMsg = 'lastSlackMsg'
  const lastSlackMsg = cache.slackMessages.get(lastSlackMsgKey)
  const slackMsg = await sendSlackStatsMessage(logMsg, lastSlackMsg ? lastSlackMsg.messageId : undefined)
  if (slackMsg) cache.slackMessages.set(lastSlackMsgKey, new SlackMessage({
    id: lastSlackMsgKey,
    messageId: slackMsg,
    }))
    cache.isModified = true

  for (let block of ctx.blocks) {
    for (const extrinsic of block.extrinsics) {
      for (const event of extrinsic.events) {
        if (event.name === events.balances.transfer.name) {
          const from = hexToAccount(event.args.from)
          const to = hexToAccount(event.args.to)
          const amount = BigInt(event.args.amount)

          const blockNumber = getBlockNumber(block)

          const fromAct = await account.v0.get(block.header, event.args.from)
          const toAct = await account.v0.get(block.header, event.args.to)

          if (fromAct) {
            const fromAccount = getOrCreateAccount(cache, block, from)
              fromAccount.nonce = BigInt(fromAct.nonce)
              fromAccount.free = fromAct.data.free
              fromAccount.reserved = fromAct.data.reserved
              fromAccount.total = fromAct.data.free + fromAct.data.reserved
              fromAccount.updatedAt = blockNumber
              
              cache.accounts.set(fromAccount.id, fromAccount)
          }

          if (toAct) {
            const toAccount = getOrCreateAccount(cache, block, to)
              toAccount.nonce = BigInt(toAct.nonce)
              toAccount.free = toAct.data.free
              toAccount.reserved = toAct.data.reserved
              toAccount.total = toAct.data.free + toAct.data.reserved
              toAccount.updatedAt = blockNumber
              
              cache.accounts.set(toAccount.id, toAccount)
          }

          const transfer = getOrCreateTransfer(cache, block, event.id, {
            from,
            to,
            value: amount,
            fee: BigInt(extrinsic.fee ?? 0),
            timestamp: BigInt(block.header.timestamp ?? 0),
          })
          cache.transfers.set(transfer.id, transfer)

          cache.isModified = true
        }
      }
    }

    if (block.header.height % 100 === 0) await save(ctx, cache)
  }

  await save(ctx, cache)

  await api.disconnect()
})
