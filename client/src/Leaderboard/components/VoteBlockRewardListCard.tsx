import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Identicon from '@polkadot/react-identicon'

// gql
import { AccountRewards } from 'gql/graphql'

// common
import { bigNumberToNumber, numberWithCommas } from 'common/helpers'
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  account: AccountRewards
  index: number
}

const VoteBlockRewardListCard: FC<Props> = ({ account, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Block reward',
      value: account.block ? `${numberWithCommas(bigNumberToNumber(account.block, 18))} tSSC` : 0,
    },
    {
      name: 'Vote reward',
      value: account.vote ? `${numberWithCommas(bigNumberToNumber(account.vote, 18))} tSSC` : 0,
    },
    {
      name: 'Total reward',
      value: account.amount ? `${numberWithCommas(bigNumberToNumber(account.amount, 18))} tSSC` : 0,
    },
    {
      name: 'Total rewards (Vote+Block)%',
      value: account.amount
        ? `${(
            ((bigNumberToNumber(account.vote, 18) + bigNumberToNumber(account.block, 18)) /
              bigNumberToNumber(account.amount, 18)) *
            100
          ).toFixed(2)}%`
        : 0,
    },
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

export default VoteBlockRewardListCard
