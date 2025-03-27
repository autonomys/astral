import { NotFound } from 'components/layout/NotFound'
import { FarmerLeaderboard } from 'components/Leaderboard'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Top Farmers', undefined, '/images/share-leaderboard.png')

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.leaderboard) ? <FarmerLeaderboard /> : <NotFound />

export default Page
