'use client'

import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import useMediaQuery from 'hooks/useMediaQuery'
import React from 'react'
import { NominatorRewardsList } from './NominatorRewardsList'
import { OperatorRewardsList } from './OperatorRewardsList'
import { VoteBlockRewardList } from './VoteBlockRewardList'

export const Leaderboard = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <div className='flex w-full flex-col space-y-6'>
      <div className='grid w-full lg:grid-cols-2'>
        <div className='text-base font-medium text-[#282929] dark:text-white'>
          Testnet Leaderboard
        </div>
      </div>
      <div className='mt-7 flex w-full justify-between'>
        <div className='text-base font-thin text-[#282929] dark:text-white'>
          Subspace Network Block and Vote rewards leaderboard
        </div>
      </div>
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Farmers'>
          <VoteBlockRewardList />
        </Tab>
        <Tab title='Operators'>
          <OperatorRewardsList />
        </Tab>
        <Tab title='Nominators'>
          <NominatorRewardsList />
        </Tab>
      </PageTabs>
    </div>
  )
}
