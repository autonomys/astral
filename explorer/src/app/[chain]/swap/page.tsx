import { Swap } from 'components/Swap'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  generateMetadataWithLabel(chain, 'Swap')

const Page: FC = () => {
  return <Swap />
}

export default Page
