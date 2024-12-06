import { TestnetRewardsPage } from 'components/TestnetRewards'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Testnet Rewards', undefined, '/images/share-testnet-rewards.png', false)

const Page: FC = () => {
  return <TestnetRewardsPage />
}

export default Page
