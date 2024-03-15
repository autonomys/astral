'use client'

import { Leaderboard } from 'components/Leaderboard'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

const Page: FC<ChainPageProps> = () => {
  return <Leaderboard />
}

export default Page
