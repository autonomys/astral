'use client'

import { FC } from 'react'
import { FAQ } from './FAQ'
import { RewardHistory } from './RewardHistory'
import { TestnetRewardsTable } from './TestnetRewardsTable'

export const TestnetRewardsPage: FC = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center space-y-4 p-4'>
      <RewardHistory />
      <FAQ />
      <TestnetRewardsTable />
    </div>
  )
}
