import { NotFound } from 'components/layout/NotFound'
import { Swap } from 'components/Swap'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Swap', undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.swap) ? <Swap /> : <NotFound />

export default Page
