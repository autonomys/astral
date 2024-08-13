'use client'

import { AccountLeaderboard } from 'components/Leaderboard'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

const Page: FC<ChainPageProps> = () => {
  return <AccountLeaderboard />
}

export default Page
