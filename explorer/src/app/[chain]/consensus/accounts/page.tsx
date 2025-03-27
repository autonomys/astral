import { AccountList } from 'components/Consensus/Account/AccountList'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Accounts', undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.consensus, RoutesConsensus.accounts) ? (
    <AccountList />
  ) : (
    <NotFound />
  )

export default Page
