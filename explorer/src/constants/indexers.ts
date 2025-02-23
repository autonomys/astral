import { NetworkId, NetworkName } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  indexer: string
  telemetryNetworkName?: string
}

const LOCAL_INDEXER = 'https://subql.blue.mainnet.subspace.network/v1/graphql'

export const indexers: Indexer[] = [
  {
    title: NetworkName.MAINNET,
    network: NetworkId.MAINNET,
    indexer: process.env.NEXT_PUBLIC_MAINNET_INDEXERS || LOCAL_INDEXER,
    telemetryNetworkName: 'Autonomys Mainnet',
  },
  {
    title: NetworkName.TAURUS,
    network: NetworkId.TAURUS,
    indexer: process.env.NEXT_PUBLIC_TAURUS_INDEXERS || LOCAL_INDEXER,
    telemetryNetworkName: 'Autonomys Taurus Testnet',
  },
  {
    title: NetworkName.LOCALHOST,
    network: NetworkId.LOCALHOST,
    indexer: LOCAL_INDEXER,
  },
]

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.MAINNET) || indexers[0]
