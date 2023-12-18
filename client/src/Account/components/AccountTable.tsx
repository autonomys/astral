import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import Identicon from '@polkadot/react-identicon'

// gql
import { Account } from 'gql/graphql'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { bigNumberToNumber, shortString } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// account
import { AccountListCard } from 'Account/components'
import { PAGE_SIZE } from 'common/constants'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

interface Props {
  accounts: Account[]
  page: number
}

const AccountTable: FC<Props> = ({ accounts, page }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const theme = selectedChain.isDomain ? 'ethereum' : 'beachball'

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const newCount = PAGE_SIZE * Number(page + 1) - 10

  // methods
  const generateColumns = (accounts: Account[]): Column[] => [
    {
      title: 'Rank',
      cells: accounts.map((id, index) => (
        <div key={`${id}-account-index`}>{page + 1 > 1 ? newCount + index + 1 : index + 1}</div>
      )),
    },
    {
      title: 'Account',
      cells: accounts.map(({ id }, index) => (
        <div key={`${id}-account-id`} className='flex row items-center gap-3'>
          <Identicon value={id} size={26} theme={theme} />
          <Link
            data-testid={`account-link-${index}`}
            to={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, selectedDomain, id)}
            className='hover:text-[#DE67E4]'
          >
            <div>{isLargeLaptop ? id : shortString(id)}</div>
          </Link>
        </div>
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
        <div key={`${id}-account-locked`}>{reserved ? bigNumberToNumber(reserved) : 0}</div>
      )),
    },
    {
      title: 'Balance (TSSC)',
      cells: accounts.map(({ total, id }) => (
        <div key={`${id}-account-balance`}>{total ? bigNumberToNumber(total) : 0}</div>
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
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
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
