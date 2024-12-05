import { getMetadata } from '@/utils/metadata/basic'
import { Block } from 'components/Consensus/Block/Block'
import { RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { BlockIdPageProps, ChainPageProps } from 'types/app'

export const generateMetadata = ({
  params: { chain, blockId },
}: ChainPageProps & BlockIdPageProps): Metadata =>
  getMetadata(chain, 'Block', blockId, `${chain}/${RoutesConsensus.blocks}/${blockId}`)

const Page: FC = () => <Block />

export default Page
