import { Event } from 'components/Consensus/Event/Event'
import { RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, EventIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, eventId },
}: ChainPageProps & EventIdPageProps): Metadata =>
  getMetadata(chain, 'Event', eventId, `${chain}/${RoutesConsensus.events}/${eventId}`)

const Page: FC = () => <Event />

export default Page
