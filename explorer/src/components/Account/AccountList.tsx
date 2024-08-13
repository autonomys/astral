'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import type {
  Account,
  AccountsConnectionQuery,
  AccountsConnectionQueryVariables,
} from 'gql/graphql'
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
import { AccountIcon } from '../common/AccountIcon'
import { QUERY_ACCOUNT_CONNECTION_LIST } from './query'

export const AccountList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section, isEvm } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const novaExplorerBanner = useEvmExplorerBanner('accounts')
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const inFocus = useWindowFocus()

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { loading: isDataLoading, setIsVisible } = useSquidQuery<
    AccountsConnectionQuery,
    AccountsConnectionQueryVariables
  >(
    QUERY_ACCOUNT_CONNECTION_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: isEvm ? 'nova' : 'consensus' },
    },
    isEvm ? Routes.nova : Routes.consensus,
    'accounts',
  )

  const {
    consensus: { accounts: consensusEntry },
    nova: { accounts: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

  const accountsConnection = useMemo(() => data && data.accountsConnection, [data])
  const accounts = useMemo(
    () => data && data.accountsConnection.edges.map((account) => account.node as Account),
    [data],
  )
  const totalCount = useMemo(
    () => (accountsConnection ? accountsConnection.totalCount : 0),
    [accountsConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const theme = useMemo(() => (isEvm ? 'ethereum' : 'beachball'), [isEvm])
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-index`}>
            {pagination.pageIndex * pagination.pageSize + row.index + 1}
          </div>
        ),
      },
      {
        accessorKey: 'account',
        header: 'Account',
        enableSorting: false,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-id`} className='row flex items-center gap-3'>
            <AccountIcon address={row.original.id} size={26} theme={theme} />
            <Link
              data-testid={`account-link-${row.index}`}
              href={INTERNAL_ROUTES.accounts.id.page(network, section, row.original.id)}
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
        enableSorting: false,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-extrinsic`}>{row.original.extrinsics.length}</div>
        ),
      },
      {
        accessorKey: 'reserved',
        header: 'Locked (tSSC)',
        enableSorting: false,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-locked`}>
            {row.original.reserved ? numberWithCommas(bigNumberToNumber(row.original.reserved)) : 0}
          </div>
        ),
      },
      {
        accessorKey: 'free',
        header: 'Balance (tSSC)',
        enableSorting: false,
        cell: ({ row }: Cell<Account>) => (
          <div key={`${row.index}-account-locked`}>
            {row.original.free ? numberWithCommas(bigNumberToNumber(row.original.free)) : 0}
          </div>
        ),
      },
    ],
    [isLargeLaptop, network, pagination.pageIndex, pagination.pageSize, section, theme],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const apolloClient = useApolloClient()
  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, QUERY_ACCOUNT_CONNECTION_LIST, 'accountsConnection'),
    [apolloClient],
  )

  const noData = useMemo(() => {
    if (loading || isDataLoading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, isDataLoading, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
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
              {!isDataLoading && accounts ? (
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
