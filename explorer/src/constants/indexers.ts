import { NetworkId } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  squids: {
    old: string
    general?: string
    staking?: string
    account?: string
    rewards?: string
    nova?: string
  }
}

export const indexers: Indexer[] = [
  {
    title: 'Gemini 3h',
    network: NetworkId.GEMINI_3H,
    squids: {
      old: 'https://squid.gemini-3h.subspace.network/graphql',
      general: 'https://squid.green.gemini-3h.subspace.network/graphql',
      staking: 'https://autonomys-labs.squids.live/staking-squid/v/v8/addons/hasura/v1/graphql',
      rewards: 'https://rewards.squid.green.gemini-3h.subspace.network/graphql',
      account: 'https://account.squid.green.gemini-3h.subspace.network/graphql',
      nova: 'https://nova.squid.gemini-3h.subspace.network/graphql',
    },
  },
  {
    title: 'Localhost',
    network: NetworkId.LOCALHOST,
    squids: {
      old: 'http://localhost:4349/graphql',
      general: 'http://localhost:4350/graphql',
      rewards: 'http://localhost:4351/graphql',
      account: 'http://localhost:4352/graphql',
    },
  },
]

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.GEMINI_3H) || indexers[0]
