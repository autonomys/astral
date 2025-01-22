import { Block } from 'components/Consensus/Block/Block'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { BlockIdPageProps, ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, blockId },
}: ChainPageProps & BlockIdPageProps): Metadata => getMetadata(chain, 'Block', blockId)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.consensus, RoutesConsensus.blocks) ? (
    <Block />
  ) : (
    <NotFound />
  )

export default Page
