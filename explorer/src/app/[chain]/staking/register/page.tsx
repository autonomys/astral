import { RegisterOperators } from 'components/Staking/RegisterOperators'
import { Metadata } from 'next'
import type { ChainPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  generateMetadataWithLabel(chain, 'Register Operator')

export default async function Page() {
  return <RegisterOperators />
}
