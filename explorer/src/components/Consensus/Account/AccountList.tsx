'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import type { AccountsQuery, AccountsQueryVariables } from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../../common/AccountIcon'
import { QUERY_ACCOUNTS } from './query'

type Row = AccountsQuery['accounts_accounts'][number]

export const AccountList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const inFocus = useWindowFocus()

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { loading, setIsVisible } = useSquidQuery<AccountsQuery, AccountsQueryVariables>(
    QUERY_ACCOUNTS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'accounts',
  )

  const {
    consensus: { accounts: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const accounts = useMemo(() => data && data.accounts_accounts, [data])
  const totalCount = useMemo(
    () =>
      data && data.accounts_accounts_aggregate.aggregate
        ? data.accounts_accounts_aggregate.aggregate.count
        : 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-account-index`}>
            {pagination.pageIndex * pagination.pageSize + row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: 'account',
        header: 'Account',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-account-id`} className='row flex items-center gap-3'>
            <AccountIcon address={row.original.id} size={26} theme='beachball' />
            <Link
              data-testid={`account-link-${row.index}`}
              href={INTERNAL_ROUTES.accounts.id.page(network, section, row.original.id)}
              className='hover:text-primaryAccent'
            >
              <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'extrinsics',
        header: 'Extrinsics',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-account-extrinsic`}>{row.original.extrinsics.length}</div>
        ),
      },
      {
        accessorKey: 'reserved',
        header: 'Locked (tSSC)',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-account-locked`}>
            {row.original.reserved ? numberWithCommas(bigNumberToNumber(row.original.reserved)) : 0}
          </div>
        ),
      },
      {
        accessorKey: 'free',
        header: 'Balance (tSSC)',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-account-locked`}>
            {row.original.free ? numberWithCommas(bigNumberToNumber(row.original.free)) : 0}
          </div>
        ),
      },
    ],
    [isLargeLaptop, network, pagination.pageIndex, pagination.pageSize, section],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const apolloClient = useApolloClient()
  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_ACCOUNTS, 'accounts_accounts'),
    [apolloClient],
  )

  const noData = useMemo(() => {
    if (isLoading(consensusEntry) || loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading, consensusEntry])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[3]} />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Holders (${totalLabel})`}</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
            <div ref={ref}>
              {!loading && accounts ? (
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
                  fullDataDownloader={fullDataDownloader}
                />
              ) : (
                noData
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
