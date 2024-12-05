import { Domain } from 'components/Domain/Domain'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesDomains } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, DomainIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, domainId },
}: ChainPageProps & DomainIdPageProps): Metadata =>
  getMetadata(chain, 'Domain', domainId, `${chain}/${Routes.domains}/${domainId}`)

const Page: FC<ChainPageProps & DomainIdPageProps> = ({ params: { chain, domainId } }) =>
  isRouteSupportingNetwork(
    chain,
    Routes.domains,
    (Routes.domains + '/' + domainId) as RoutesDomains,
  ) ? (
    <Domain />
  ) : (
    <NotFound />
  )

export default Page
