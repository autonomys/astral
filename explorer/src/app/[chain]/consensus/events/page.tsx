import { RoutesConsensus } from '@/constants/routes'
import { getMetadata } from '@/utils/metadata/basic'
import { EventList } from 'components/Consensus/Event/EventList'
import { Metadata } from 'next'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Events', undefined, `${chain}/${RoutesConsensus.events}`)

export default async function Page() {
  return <EventList />
}
