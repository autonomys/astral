import { RoutesConsensus } from '@/constants/routes'
import { getMetadata } from '@/utils/metadata/basic'
import { ExtrinsicList } from 'components/Consensus/Extrinsic/ExtrinsicList'
import { Metadata } from 'next'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Extrinsics', undefined, `${chain}/${RoutesConsensus.extrinsics}`)

export default async function Page() {
  return <ExtrinsicList />
}
