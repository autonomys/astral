import { DownloadPage } from '@/components/Farming'
import { chains } from 'constants/chains'
import { metadata, url } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Farming`
  const images = {
    url: url + '/images/share-farming.png',
    secureUrl: url + 'image/png',
    width: 900,
    height: 600,
    alt: title,
  }
  return {
    ...metadata,
    title,
    openGraph: {
      ...metadata.openGraph,
      title,
      images,
    },
    twitter: {
      ...metadata.twitter,
      title,
      images,
    },
  }
}

const Page: FC = () => {
  return <DownloadPage />
}

export default Page
