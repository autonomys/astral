import { TestnetRewardsPage } from '@/components/TestnetRewards'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Testnet Rewards`
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

const Page: FC = () => {
  return <TestnetRewardsPage />
}

export default Page
