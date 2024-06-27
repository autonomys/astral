'use client'

import { PAGE_SIZE } from '@/constants/general'
import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import Identicon from '@polkadot/react-identicon'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Account } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'

dayjs.extend(relativeTime)

interface Props {
  accounts: Account[]
  page: number
}

export const AccountTable: FC<Props> = ({ accounts, page }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const theme = useMemo(() => (selectedChain.isDomain ? 'ethereum' : 'beachball'), [selectedChain])
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  const newCount = useMemo(() => PAGE_SIZE * Number(page + 1) - 10, [page])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-index`}>
            {page + 1 > 1 ? newCount + row.index + 1 : row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: 'account',
        header: 'Account',
        enableSorting: true,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-id`} className='row flex items-center gap-3'>
            <Identicon value={row.original.id} size={26} theme={theme} />
            <Link
              data-testid={`account-link-${row.index}`}
              href={INTERNAL_ROUTES.accounts.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.id,
              )}
              className='hover:text-purpleAccent'
            >
              <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'extrinsics',
        header: 'Extrinsics',
        enableSorting: true,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-extrinsic`}>{row.original.extrinsics.length}</div>
        ),
      },
      {
        accessorKey: 'reserved',
        header: 'Locked (tSSC)',
        enableSorting: true,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-locked`}>
            {row.original.reserved ? numberWithCommas(bigNumberToNumber(row.original.reserved)) : 0}
          </div>
        ),
      },
      {
        accessorKey: 'free',
        header: 'Balance (tSSC)',
        enableSorting: true,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-locked`}>
            {row.original.free ? numberWithCommas(bigNumberToNumber(row.original.free)) : 0}
          </div>
        ),
      },
    ],
    [isLargeLaptop, newCount, page, selectedChain.urls.page, selectedDomain, theme],
  )

  const totalCount = useMemo(() => (accounts ? accounts.length : 0), [accounts])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <SortedTable
          data={accounts}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='accounts-list'
        />
      </div>
    </div>
  )
}
