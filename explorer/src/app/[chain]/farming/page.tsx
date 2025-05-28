import { DownloadPage } from 'components/Farming'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata => {
  const baseMetadata = getMetadata(chain, 'Farming', undefined, '/images/share-farming.png', false)
  return {
    ...baseMetadata,
    title: 'Autonomys Farming | Contribute storage space and earn rewards on the Autonomys Network',
    description:
      'Put your unused disk space to work and contribute to the Network, By contributing storage and compute to the network, you play a crucial role in securing it, while also earning rewards',
  }
}

const Page: FC = () => {
  return <DownloadPage />
}

export default Page
