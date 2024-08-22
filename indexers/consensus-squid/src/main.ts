import { createConnection } from '@autonomys/auto-utils'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { assertNotNull } from '@subsquid/util-internal'
import { processBlocks } from './blocks'
import { processor } from './processor'

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

  await processBlocks(ctx, api)

  await api.disconnect()
})
