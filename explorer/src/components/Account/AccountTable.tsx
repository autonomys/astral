import { PAGE_SIZE } from '@/constants/general'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import Identicon from '@polkadot/react-identicon'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Account } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { AccountListCard } from './AccountListCard'

dayjs.extend(relativeTime)

interface Props {
  accounts: Account[]
  page: number
}

export const AccountTable: FC<Props> = ({ accounts, page }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const theme = selectedChain.isDomain ? 'ethereum' : 'beachball'

  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const newCount = PAGE_SIZE * Number(page + 1) - 10

  // methods
  const generateColumns = useCallback(
    (accounts: Account[]): Column[] => [
      {
        title: 'Rank',
        cells: accounts.map((id, index) => (
          <div key={`${id}-account-index`}>{page + 1 > 1 ? newCount + index + 1 : index + 1}</div>
        )),
      },
      {
        title: 'Account',
        cells: accounts.map(({ id }, index) => (
          <div key={`${id}-account-id`} className='row flex items-center gap-3'>
            <Identicon value={id} size={26} theme={theme} />
            <Link
              data-testid={`account-link-${index}`}
              href={INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, selectedDomain, id)}
              className='hover:text-purpleAccent'
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
          <div key={`${id}-account-locked`}>
            {reserved ? numberWithCommas(bigNumberToNumber(reserved)) : 0}
          </div>
        )),
      },
      {
        title: 'Balance (TSSC)',
        cells: accounts.map(({ total, id }) => (
          <div key={`${id}-account-balance`}>
            {total ? numberWithCommas(bigNumberToNumber(total)) : 0}
          </div>
        )),
      },
    ],
    [selectedDomain, selectedChain, theme, isLargeLaptop, newCount, page],
  )

  // constants
  const columns = useMemo(() => generateColumns(accounts), [accounts, generateColumns])

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <Table
          columns={columns}
          emptyMessage='There are no accounts to show'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset dark:border-none'
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
