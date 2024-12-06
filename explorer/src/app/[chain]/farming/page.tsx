import { DownloadPage } from 'components/Farming'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Farming', undefined, '/images/share-farming.png', false)

const Page: FC = () => {
  return <DownloadPage />
}

export default Page
