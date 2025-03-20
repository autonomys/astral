import { NetworkId, NetworkName } from '@autonomys/auto-utils'

export interface Indexer {
  title: string
  network: NetworkId
  indexer: string
  telemetryNetworkName?: string
}

export const indexers: Indexer[] = []
if (process.env.NEXT_PUBLIC_MAINNET_INDEXERS)
  indexers.push({
    title: NetworkName.MAINNET,
    network: NetworkId.MAINNET,
    indexer: process.env.NEXT_PUBLIC_MAINNET_INDEXERS,
    telemetryNetworkName: 'Autonomys Mainnet',
  })

if (process.env.NEXT_PUBLIC_TAURUS_INDEXERS)
  indexers.push({
    title: NetworkName.TAURUS,
    network: NetworkId.TAURUS,
    indexer: process.env.NEXT_PUBLIC_TAURUS_INDEXERS,
    telemetryNetworkName: 'Autonomys Taurus Testnet',
  })

if (process.env.NEXT_PUBLIC_LOCALHOST_INDEXERS)
  indexers.push({
    title: NetworkName.LOCALHOST,
    network: NetworkId.LOCALHOST,
    indexer: process.env.NEXT_PUBLIC_LOCALHOST_INDEXERS,
  })

export const DEFAULT_INDEXER = 'https://subql.green.taurus.subspace.network/v1/graphql'

export const networks = new Set(indexers.map((chain) => chain.network))

export const defaultIndexer =
  indexers.find((indexer) => indexer.network === NetworkId.MAINNET) || indexers[0]
