import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// gql
import { Account } from 'gql/graphql'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { bigNumberToNumber, shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// account
import { AccountListCard } from 'Account/components'

dayjs.extend(relativeTime)

interface Props {
  accounts: Account[]
}

const AccountTable: FC<Props> = ({ accounts }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  // methods
  const generateColumns = (accounts: Account[]): Column[] => [
    {
      title: 'Rank',
      cells: accounts.map((id, index) => <div key={`${id}-account-index`}>{index + 1}</div>),
    },
    {
      title: 'Account',
      cells: accounts.map(({ id }) => (
        <Link key={`${id}-account-id`} to={INTERNAL_ROUTES.accounts.id.page(id)}>
          <div>{isLargeLaptop ? id : shortString(id)}</div>
        </Link>
      )),
    },
    {
      title: 'Extrinsics',
      cells: accounts.map(({ extrinsics, id }) => (
        <div key={`${id}-account-extrinsic`}>{extrinsics.length}</div>
      )),
    },
    {
      title: 'Locked (TSSC)',
      cells: accounts.map(({ reserved, id }) => (
        <div key={`${id}-account-locked`}>{reserved ? bigNumberToNumber(reserved, 18) : 0}</div>
      )),
    },
    {
      title: 'Balance (TSSC)',
      cells: accounts.map(({ total, id }) => (
        <div key={`${id}-account-balance`}>{total ? bigNumberToNumber(total, 18) : 0}</div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(accounts)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no accounts to show'
          tableProps='bg-white rounded-lg'
          tableHeaderProps='border-b border-gray-200'
          id='accounts-list'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {accounts.map((account, index) => (
        <AccountListCard index={index} account={account} key={`account-list-card-${account.id}`} />
      ))}
    </div>
  )
}

export default AccountTable
