import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import Identicon from '@polkadot/react-identicon'
import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import type { AccountsConnectionRewardsQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  account: AccountsConnectionRewardsQuery['accountRewardsConnection']['edges'][0]['node']
  index: number
}

export const VoteBlockRewardListCard: FC<Props> = ({ account, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Block reward',
      value: account.block
        ? `${numberWithCommas(bigNumberToNumber(account.block))} ${selectedChain.token.symbol}`
        : 0,
    },
    {
      name: 'Vote reward',
      value: account.vote
        ? `${numberWithCommas(bigNumberToNumber(account.vote))} ${selectedChain.token.symbol}`
        : 0,
    },
    {
      name: 'Total reward',
      value: account.amount
        ? `${numberWithCommas(bigNumberToNumber(account.amount))} ${selectedChain.token.symbol}`
        : 0,
    },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${account.id}-account-id`} className='row -mx-1 -mt-3 flex items-center gap-3'>
          <Identicon value={account.id} size={49} theme='beachball' />
          <Link
            href={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              'consensus',
              account.id,
            )}
          >
            <p className='text-grayDarker break-all text-sm font-medium dark:text-white'>
              {account.id}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}
