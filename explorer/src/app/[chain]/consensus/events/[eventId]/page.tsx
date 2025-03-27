import { Event } from 'components/Consensus/Event/Event'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, EventIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, eventId },
}: ChainPageProps & EventIdPageProps): Metadata => getMetadata(chain, 'Event', eventId)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.consensus, RoutesConsensus.events) ? (
    <Event />
  ) : (
    <NotFound />
  )

export default Page
