import { NetworkId } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  indexer: string
}

const LOCAL_INDEXER = 'https://subql.green.gemini-3h.subspace.network/v1/graphql'

export const indexers: Indexer[] = [
  {
    title: 'Gemini 3h',
    network: NetworkId.GEMINI_3H,
    indexer: process.env.NEXT_PUBLIC_GEMINI_3H_INDEXERS || LOCAL_INDEXER,
  },
  {
    title: 'Localhost',
    network: NetworkId.LOCALHOST,
    indexer: LOCAL_INDEXER,
  },
]

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.GEMINI_3H) || indexers[0]
