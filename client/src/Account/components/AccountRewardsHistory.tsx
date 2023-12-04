import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Account, RewardEvent } from 'gql/graphql'

// common
import { Tab } from 'common/components'

// account
import { AccountLatestRewards, AccountPreviousRewards, AccountGraphTabs } from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  account: Account
  isDesktop?: boolean
  rewards: RewardEvent[]
}

const AccountRewardsHistory: FC<Props> = ({ account, isDesktop = false, rewards }) => {

  return (
    <div className='w-full'>
      <AccountGraphTabs total={account?.total} isDesktop={isDesktop}>
        <Tab title='Current Rewards'>
          <div className='lg:h-[500px]'>
            <AccountLatestRewards rewards={rewards} isDesktop={isDesktop} />
          </div>
        </Tab>
        <Tab title='Prev. Testnets Rewards'>
          <div className='lg:h-[500px]'>
            <AccountPreviousRewards rewards={rewards} isDesktop={isDesktop} />
          </div>
        </Tab>
      </AccountGraphTabs>
    </div>
  )
}

export default AccountRewardsHistory
