import { shortString } from '@autonomys/auto-utils'
import { Account } from 'components/Consensus/Account/Account'
import { NotFound } from 'components/layout/NotFound'
import { Routes, RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, accountId },
}: ChainPageProps & AccountIdPageProps): Metadata =>
  getMetadata(chain, 'Account', accountId ? shortString(accountId) : '')

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.consensus, RoutesConsensus.accounts) ? (
    <Account />
  ) : (
    <NotFound />
  )

export default Page
