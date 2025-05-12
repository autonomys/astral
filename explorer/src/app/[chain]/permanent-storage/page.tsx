import { FileList } from 'components/Storage/Files/FileList'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata => {
  const baseMetadata = getMetadata(
    chain,
    'Permanent Storage',
    undefined,
    '/images/share-permanent-storage.png',
  )
  return {
    ...baseMetadata,
    title: 'Autonomys Permanent Storage | Decentralized File Storage on Autonomys Network',
    description:
      'Store data permanently on the Autonomy Network. Leverage decentralized, censorship-resistant storage with validator-backed archival guarantees and PoAS consensus',
  }
}

const Page: FC = () => <FileList />

export default Page
