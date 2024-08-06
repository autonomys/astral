import { NetworkId } from '@autonomys/auto-utils'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'

export const generateMetadataWithLabel = (
  chain: NetworkId | undefined,
  label: string,
): Metadata => {
  if (!chain) return metadata
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - ${label}`
  return {
    ...metadata,
    title,
    openGraph: {
      ...metadata.openGraph,
      title,
    },
    twitter: {
      ...metadata.twitter,
      title,
    },
  }
}
