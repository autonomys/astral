import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Account } from 'gql/graphql'

// common
import { Tab } from 'common/components'

// account
import { AccountBalanceStats, AccountGraphTabs, AccountRewardGraph } from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  account: Account
  hexAddress: string
  isDesktop?: boolean
}

const AccountGraphs: FC<Props> = ({ account, hexAddress, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <AccountGraphTabs total={account?.total} isDesktop={isDesktop}>
        <Tab title='Rewards'>
          <div className='h-[500px] flex align-middle justify-center items-center  dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] rounded-[20px]'>
            <AccountRewardGraph hexAddress={hexAddress} />
          </div>
        </Tab>
        <Tab title='Balance'>
          <div className='h-[500px]'>
            <AccountBalanceStats account={account} />
          </div>
        </Tab>
      </AccountGraphTabs>
    </div>
  )
}

export default AccountGraphs
