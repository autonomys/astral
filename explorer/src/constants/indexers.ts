import { NetworkId } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  squids: {
    old: string
    accounts?: string
    leaderboard?: string
    staking?: string
    testnetRewards?: string
  }
}

export const indexers: Indexer[] = [
  {
    title: 'Gemini 3h',
    network: NetworkId.GEMINI_3H,
    squids: {
      old: 'https://squid.gemini-3h.subspace.network/graphql',
      accounts: 'https://autonomys-labs.squids.live/accounts-squid/addons/hasura/v1/graphql',
      leaderboard: 'https://autonomys-labs.squids.live/leaderboard-squid/addons/hasura/v1/graphql',
      staking: 'https://autonomys-labs.squids.live/staking-squid/addons/hasura/v1/graphql',
      testnetRewards:
        'https://autonomys-labs.squids.live/testnet-rewards-squid/v/v3/addons/hasura/v1/graphql',
    },
  },
  {
    title: 'Localhost',
    network: NetworkId.LOCALHOST,
    squids: {
      old: 'http://localhost:4349/graphql',
    },
  },
]

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.GEMINI_3H) || indexers[0]
