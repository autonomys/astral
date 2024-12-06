import { NotFound } from 'components/layout/NotFound'
import { NovaPage } from 'components/Nova'
import { Routes, RoutesDomains } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Auto-EVM', undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.domains, RoutesDomains.autoevm) ? (
    <NovaPage />
  ) : (
    <NotFound />
  )

export default Page
