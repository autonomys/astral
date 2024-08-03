import { Chains, chains } from 'constants/chains'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'

export const generateMetadataWithLabel = (chain: Chains | undefined, label: string): Metadata => {
  if (!chain) return metadata
  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
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
