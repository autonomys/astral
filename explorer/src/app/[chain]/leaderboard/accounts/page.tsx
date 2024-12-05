import { getMetadata } from '@/utils/metadata/basic'
import { NotFound } from 'components/layout/NotFound'
import { AccountLeaderboard } from 'components/Leaderboard'
import { Routes, RoutesLeaderboard } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(
    chain,
    'Top Accounts',
    undefined,
    `${chain}/${Routes.leaderboard}/${RoutesLeaderboard.accounts}`,
  )

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.leaderboard, RoutesLeaderboard.accounts) ? (
    <AccountLeaderboard />
  ) : (
    <NotFound />
  )

export default Page
