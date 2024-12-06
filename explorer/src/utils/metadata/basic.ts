import { NetworkId } from '@autonomys/auto-utils'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { getImageMetadata } from './image'

export const getMetadata = (
  chain: NetworkId | undefined,
  startTitle: string | undefined,
  endTitle: string | undefined,
  imagePath?: string,
  generatedImage: boolean = true,
): Metadata => {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${startTitle ? `${startTitle} - ` : ''}${metadata.title} - ${chainTitle}${endTitle ? ` - ${endTitle}` : ''}`
  const images = imagePath && getImageMetadata(imagePath, generatedImage)
  return {
    ...metadata,
    title,
    openGraph: images
      ? {
          ...metadata.openGraph,
          title,
          images,
        }
      : {
          ...metadata.openGraph,
          title,
        },
    twitter: images
      ? {
          ...metadata.twitter,
          title,
          images,
        }
      : {
          ...metadata.twitter,
          title,
        },
  }
}
