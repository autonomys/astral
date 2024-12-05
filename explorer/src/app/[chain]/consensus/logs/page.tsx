import { RoutesConsensus } from '@/constants/routes'
import { getMetadata } from '@/utils/metadata/basic'
import { LogList } from 'components/Consensus/Log/LogList'
import { Metadata } from 'next'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Logs', undefined, `${chain}/${RoutesConsensus.logs}`)

export default async function Page() {
  return <LogList />
}
