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

dayjs.extend(relativeTime)

type Props = {
  account: Account
  index: number
}

const AccountListCard: FC<Props> = ({ account, index }) => {
  const body = [
    { name: 'Rank', value: index },
    { name: 'Extrinsics', value: account.extrinsics.length },
    { name: 'Locked (TSSC)', value: bigNumberToNumber(account.reserved || 0, 18) },
    { name: 'Balance (TSSC)', value: bigNumberToNumber(account.total || 0, 18) },
  ]
  return (
    <MobileCard
      id='account-list-mobile'
      header={
        <div key={`${account.id}-account-id`} className='flex row items-center gap-3 -mt-3 -mx-1'>
          <Identicon value={account.id} size={49} theme='beachball' />
          <Link to={INTERNAL_ROUTES.accounts.id.page(account.id)}>
            <p className='font-medium text-[#241235] text-sm break-all'>{account.id}</p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}

export default AccountListCard
