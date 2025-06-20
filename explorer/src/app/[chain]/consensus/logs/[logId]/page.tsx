import { Log } from 'components/Consensus/Log/Log'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, LogIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, logId },
}: ChainPageProps & LogIdPageProps): Metadata =>
  getMetadata(chain, 'Log', logId, `${chain}/logs/${logId}`)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.consensus, RoutesConsensus.extrinsics) ? (
    <Log />
  ) : (
    <NotFound />
  )

export default Page
