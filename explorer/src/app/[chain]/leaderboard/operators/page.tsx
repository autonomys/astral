import { NotFound } from 'components/layout/NotFound'
import { OperatorLeaderboard } from 'components/Leaderboard/index'
import { Routes, RoutesLeaderboard } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Top Operators', undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.leaderboard, RoutesLeaderboard.operators) ? (
    <OperatorLeaderboard />
  ) : (
    <NotFound />
  )

export default Page
