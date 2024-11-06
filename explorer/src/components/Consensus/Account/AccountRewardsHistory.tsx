import { Tab } from 'components/common/Tabs'
import { AccountByIdQuery } from 'gql/graphql'
import { FC } from 'react'
import { AccountLatestRewards } from './AccountLatestRewards'
import { AccountPreviousRewards } from './AccountPreviousRewards'
import { AccountRewardsTabs } from './AccountRewardsTabs'

type Props = {
  isDesktop?: boolean
  rewards: AccountByIdQuery['consensus_rewards']
}

export const AccountRewardsHistory: FC<Props> = ({ isDesktop = false, rewards }) => {
  return (
    <div className='w-full'>
      <AccountRewardsTabs isDesktop={isDesktop}>
        <Tab title='Current Rewards'>
          <div className='lg:h-[500px]'>
            <AccountLatestRewards rewards={rewards} isDesktop={isDesktop} />
          </div>
        </Tab>
        <Tab title='Prev. Testnets Rewards'>
          <div className='lg:h-[500px]'>
            <AccountPreviousRewards isDesktop={isDesktop} />
          </div>
        </Tab>
      </AccountRewardsTabs>
    </div>
  )
}
