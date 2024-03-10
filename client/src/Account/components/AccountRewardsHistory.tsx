import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC } from 'react'

// gql
import { RewardEvent } from 'gql/graphql'

// common
import { Tab } from 'common/components'

// account
import {
  AccountLatestRewards,
  AccountPreviousRewards,
  AccountRewardsTabs,
} from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
  rewards: RewardEvent[]
}

const AccountRewardsHistory: FC<Props> = ({ isDesktop = false, rewards }) => {
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

export default AccountRewardsHistory
