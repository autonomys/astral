import { Tab } from 'components/common/Tabs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AccountByIdQuery } from 'gql/graphql'
import { FC } from 'react'
import { AccountBalanceStats } from './AccountBalanceStats'
import { AccountGraphTabs } from './AccountGraphTabs'

dayjs.extend(relativeTime)

type Props = {
  account: AccountByIdQuery['consensus_accounts'][number] | undefined
  isDesktop?: boolean
}

export const AccountGraphs: FC<Props> = ({ account, isDesktop = false }) => {
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
