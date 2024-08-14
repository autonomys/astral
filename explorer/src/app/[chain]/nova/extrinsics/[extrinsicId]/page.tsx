import { Extrinsic } from 'components/Extrinsic/Extrinsic'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, ExtrinsicIdPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'
import { shortString } from 'utils/string'

export const generateMetadata = ({
  params: { chain, extrinsicId },
}: ChainPageProps & ExtrinsicIdPageProps): Metadata =>
  generateMetadataWithLabel(chain, `Extrinsic ${extrinsicId ? shortString(extrinsicId) : ''}`)

const Page: FC = () => {
  return <Extrinsic />
}

export default Page
