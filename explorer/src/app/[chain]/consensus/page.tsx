import { Home } from 'components/Home'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const headersList = headers()
  const domain = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''

  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  return {
    ...metadata,
    title: `${metadata.title} - ${chainTitle}`,
    openGraph: {
      ...metadata.openGraph,
      title: `${metadata.openGraph.title} - ${chainTitle}`,
      images: {
        ...metadata.openGraph.images,
        url: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
        secureUrl: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
      },
    },
    twitter: {
      ...metadata.twitter,
      title: `${metadata.twitter.title} - ${chainTitle}`,
      images: {
        ...metadata.twitter.images,
        url: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
        secureUrl: new URL(`${chain}/image`, `${protocol}://${domain}`).toString(),
      },
    },
  }
}

const Page: FC = () => {
  return <Home />
}

export default Page
