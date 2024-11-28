import { BlockList } from 'components/Consensus/Block/BlockList'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Blocks', undefined, `${chain}/blocks`)

const Page: FC = () => <BlockList />

export default Page
