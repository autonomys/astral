import { NetworkId, NetworkName } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  indexer: string
}

const LOCAL_INDEXER = 'https://subql.green.gemini-3h.subspace.network/v1/graphql'

export const indexers: Indexer[] = [
  {
    title: NetworkName.TAURUS,
    network: NetworkId.TAURUS,
    indexer: process.env.NEXT_PUBLIC_TAURUS_INDEXERS || LOCAL_INDEXER,
  },
  {
    title: NetworkName.LOCALHOST,
    network: NetworkId.LOCALHOST,
    indexer: LOCAL_INDEXER,
  },
]

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.TAURUS) || indexers[0]
