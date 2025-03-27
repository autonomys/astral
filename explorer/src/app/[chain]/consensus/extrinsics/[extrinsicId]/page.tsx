import { shortString } from '@autonomys/auto-utils'
import { Extrinsic } from 'components/Consensus/Extrinsic/Extrinsic'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, ExtrinsicIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, extrinsicId },
}: ChainPageProps & ExtrinsicIdPageProps): Metadata =>
  getMetadata(chain, 'Extrinsic', extrinsicId ? shortString(extrinsicId) : '')

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.consensus, RoutesConsensus.extrinsics) ? (
    <Extrinsic />
  ) : (
    <NotFound />
  )

export default Page
