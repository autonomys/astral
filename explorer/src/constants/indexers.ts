import { NetworkId } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  indexer: string
}

export const indexers: Indexer[] = [
  {
    title: 'Gemini 3h',
    network: NetworkId.GEMINI_3H,
    indexer: 'http://localhost:8080/v1/graphql',
  },
  {
    title: 'Localhost',
    network: NetworkId.LOCALHOST,
    indexer: 'http://localhost:8080/v1/graphql',
  },
]

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.GEMINI_3H) || indexers[0]
