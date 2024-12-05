'use client'

import { NotFound } from 'components/layout/NotFound'
import { FarmerLeaderboard } from 'components/Leaderboard'
import { Routes } from 'constants/routes'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { isRouteSupportingNetwork } from 'utils/route'

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.leaderboard) ? <FarmerLeaderboard /> : <NotFound />

export default Page
