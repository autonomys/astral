import { PageTabs, Tab } from 'common/components'
import React from 'react'
import VoteBlockRewardList from './VoteBlockRewardList'
import useMediaQuery from 'common/hooks/useMediaQuery'
import NominatorRewardsList from './NominatorRewardsList'
import OperatorRewardsList from './OperatorRewardsList'

const Leaderboard = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <div className='w-full flex flex-col space-y-6'>
      <div className='w-full grid lg:grid-cols-2'>
        <div className='text-[#282929] text-base font-medium dark:text-white'>
          Testnet Leaderboard
        </div>
      </div>
      <div className='w-full flex justify-between mt-7'>
        <div className='text-[#282929] text-base font-thin dark:text-white'>
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

export default Leaderboard
