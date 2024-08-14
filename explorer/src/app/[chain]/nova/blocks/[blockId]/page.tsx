import { Block } from 'components/Block/Block'
import { Metadata } from 'next'
import { FC } from 'react'
import type { BlockIdPageProps, ChainPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({
  params: { chain, blockId },
}: ChainPageProps & BlockIdPageProps): Metadata =>
  generateMetadataWithLabel(chain, `Block #${blockId}`)

const Page: FC = () => {
  return <Block />
}

export default Page
