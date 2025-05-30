import { DomainPage } from 'components/Domain'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata => {
  const metadata = getMetadata(chain, 'Domains', undefined)
  return {
    ...metadata,
    title: 'Autonomys Network Domains ',
    description:
      'Run multiple domains, each with different runtimes, genesis configurations, and validator sets',
  }
}

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.domains) ? <DomainPage /> : <NotFound />

export default Page
