import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import { AccountRewards } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'
import { AccountIcon } from '../common/AccountIcon'

type Props = {
  account: AccountRewards
  index: number
}

export const NominatorRewardsListCard: FC<Props> = ({ account, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Nominator reward',
      value: account.operator
        ? `${numberWithCommas(bigNumberToNumber(account.operator))} ${selectedChain.token.symbol}`
        : 0,
    },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${account.id}-account-id`} className='row -mx-1 -mt-3 flex items-center gap-3'>
          <AccountIcon address={account.id} />
          <Link
            href={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              'consensus',
              account.id,
            )}
          >
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
