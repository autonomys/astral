import { Home } from 'components/Consensus/Home'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, undefined, undefined, `${chain}/${Routes.consensus}`)

const Page: FC = () => <Home />

export default Page
