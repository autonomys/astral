'use client'

import { sendGAEvent } from '@next/third-parties/google'
import useWallet from 'hooks/useWallet'
import { FC, useEffect } from 'react'
import { FAQ } from './FAQ'
import { RewardHistory } from './RewardHistory'
import { TestnetRewardsTable } from './TestnetRewardsTable'

export const TestnetRewardsPage: FC = () => {
  const { subspaceAccount } = useWallet()

  useEffect(() => {
    sendGAEvent('event', 'visit_testnet_rewards_page', { value: 'index' })
  }, [])

  return (
    <div className='flex min-h-screen w-full flex-col items-center space-y-4 p-4'>
      <RewardHistory />
      {subspaceAccount && <TestnetRewardsTable />}
      <FAQ />
    </div>
  )
}
