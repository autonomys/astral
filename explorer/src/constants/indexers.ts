import { NetworkId } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  squids: {
    old: string
    leaderboard?: string
    staking?: string
  }
}

export const indexers: Indexer[] = [
  {
    title: 'Gemini 3h',
    network: NetworkId.GEMINI_3H,
    squids: {
      old: 'https://squid.gemini-3h.subspace.network/graphql',
      leaderboard:
        'https://autonomys-labs.squids.live/leaderboard-squid/v/v6/addons/hasura/v1/graphql',
      staking: 'https://autonomys-labs.squids.live/staking-squid/v/v11/addons/hasura/v1/graphql',
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
