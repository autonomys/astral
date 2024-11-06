'use client'

import { NotFound } from 'components/layout/NotFound'
import { AccountLeaderboard } from 'components/Leaderboard'
import { Routes } from 'constants/routes'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { isRouteSupportingNetwork } from 'utils/route'

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.staking) ? <AccountLeaderboard /> : <NotFound />

export default Page
