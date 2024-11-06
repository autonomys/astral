import { TestnetRewardsPage } from 'components/TestnetRewards'
import { indexers } from 'constants/indexers'
import { metadata, url } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Testnet Rewards`
  const images = {
    url: url + '/images/share-testnet-rewards.png',
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
  return <TestnetRewardsPage />
}

export default Page
