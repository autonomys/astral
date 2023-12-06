import { FC } from 'react'
import { Link } from 'react-router-dom'
import Identicon from '@polkadot/react-identicon'

// gql
import { AccountRewards } from 'gql/graphql'

// common
import { bigNumberToNumber, numberWithCommas } from 'common/helpers'
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

type Props = {
  account: AccountRewards
  index: number
}

const NominatorRewardsListCard: FC<Props> = ({ account, index }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Rank', value: index },
    {
      name: 'Operator reward',
      value: account.operator
        ? `${numberWithCommas(bigNumberToNumber(account.operator, 18))} tSSC`
        : 0,
    },
    {
      name: 'Total reward',
      value: account.amount ? `${numberWithCommas(bigNumberToNumber(account.amount, 18))} tSSC` : 0,
    },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${account.id}-account-id`} className='flex row items-center gap-3 -mt-3 -mx-1'>
          <Identicon value={account.id} size={49} theme='beachball' />
          <Link
            to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, 'consensus', account.id)}
          >
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

export default NominatorRewardsListCard
