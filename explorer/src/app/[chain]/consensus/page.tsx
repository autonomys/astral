import { Home } from 'components/Consensus/Home'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata => {
  const metadata = getMetadata(chain, 'Consensus', undefined)
  return {
    ...metadata,
    title: 'Autonomys Consensus | PoAS Chain Metrics & Overview',
    description:
      'Autonomys Explorer provides real-time blockchain data and analytics. Explore the latest blocks, track transactions, monitor validators, and search accounts on the Autonomy blockchain',
  }
}

const Page: FC = () => <Home />

export default Page
