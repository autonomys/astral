import { OperatorsList } from 'components/Staking/OperatorsList'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  generateMetadataWithLabel(chain, 'Operators')

const Page: FC = () => {
  return <OperatorsList />
}

export default Page
