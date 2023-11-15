import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Identicon from '@polkadot/react-identicon'

// gql
import { Account } from 'gql/graphql'

// common
import { bigNumberToNumber } from 'common/helpers'
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  account: Account
  index: number
}

const RewardListCard: FC<Props> = ({ account, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Block reward',
      value: account.blockRewardsTotal ? bigNumberToNumber(account.blockRewardsTotal, 18) : 0,
    },
    {
      name: 'Vote reward',
      value: account.voteRewardsTotal ? bigNumberToNumber(account.blockRewardsTotal, 18) : 0,
    },
    { name: 'Total reward', value: account.total ? bigNumberToNumber(account.total, 18) : 0 },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${account.id}-account-id`} className='flex row items-center gap-3 -mt-3 -mx-1'>
          <Identicon value={account.id} size={49} theme='beachball' />
          <Link to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, account.id)}>
            <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
              {account.id}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}

export default RewardListCard
