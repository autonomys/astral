import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Account } from 'gql/graphql'

// common
import { Tab } from 'common/components'

// account
import { AccountBalanceStats, AccountGraphTabs } from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  account: Account
  isDesktop?: boolean
}

const AccountGraphs: FC<Props> = ({ account, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <AccountGraphTabs total={account?.total} isDesktop={isDesktop}>
        {[
          <Tab key='account-balance-stats' title='Balance'>
            <div className='lg:h-[500px]'>
              <AccountBalanceStats account={account} />
            </div>
          </Tab>,
        ]}
      </AccountGraphTabs>
    </div>
  )
}

export default AccountGraphs
