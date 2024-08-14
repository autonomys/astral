import { Operator } from 'components/Staking/Operator'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({
  params: { chain, accountId },
}: ChainPageProps & AccountIdPageProps): Metadata =>
  generateMetadataWithLabel(chain, `Operator #${accountId}`)

const Page: FC = () => {
  return <Operator />
}

export default Page
