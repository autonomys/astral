import { MobileCard } from 'components/common/MobileCard'
import { TOKEN } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { AccountsConnectionRewardsQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC } from 'react'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { AccountIcon } from '../common/AccountIcon'

type Props = {
  account: AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
  index: number
}

export const VoteBlockRewardListCard: FC<Props> = ({ account, index }) => {
  const { network } = useChains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Block reward',
      value: account.block
        ? `${numberWithCommas(bigNumberToNumber(account.block))} ${TOKEN.symbol}`
        : 0,
    },
    {
      name: 'Vote reward',
      value: account.vote
        ? `${numberWithCommas(bigNumberToNumber(account.vote))} ${TOKEN.symbol}`
        : 0,
    },
    {
      name: 'Total reward',
      value: account.amount
        ? `${numberWithCommas(bigNumberToNumber(account.amount))} ${TOKEN.symbol}`
        : 0,
    },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${account.id}-account-id`} className='row -mx-1 -mt-3 flex items-center gap-3'>
          <AccountIcon address={account.id} />
          <Link href={INTERNAL_ROUTES.accounts.id.page(network, 'consensus', account.id)}>
            <p className='break-all text-sm font-medium text-grayDarker dark:text-white'>
              {account.id}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}
