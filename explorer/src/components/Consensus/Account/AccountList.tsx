'use client'

import { formatAddress } from '@/utils/formatAddress'
import { useApolloClient } from '@apollo/client'
import { isAddress } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { NotFound } from 'components/layout/NotFound'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { AccountsDocument, AccountsQuery, AccountsQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { snakeCase } from 'lodash'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import type { AccountsFilters, Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { AccountIconWithLink } from '../../common/AccountIcon'

type Row = AccountsQuery['consensus_accounts'][number]
const TABLE = 'accounts'

export const AccountList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section, tokenDecimals } = useIndexers()
  const inFocus = useWindowFocus()
  const apolloClient = useApolloClient()
  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    orderBy,
    availableColumns,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<AccountsFilters>(TABLE)

  const where = useMemo(
    () => ({
      ...availableColumns
        .filter((column) => column.searchable)
        .reduce((conditions, column) => {
          const searchKey = `search-${column.name}` as keyof AccountsFilters
          const searchValue = filters[searchKey]
          return searchValue
            ? {
                ...conditions,
                [snakeCase(column.name)]:
                  column.name === 'id' && isAddress(searchValue)
                    ? { _eq: formatAddress(searchValue) }
                    : { _ilike: `%${searchValue}%` },
              }
            : conditions
        }, {}),
      // Nonce
      ...((filters.nonceMin || filters.nonceMax) && {
        nonce: {
          ...(filters.nonceMin && { _gte: filters.nonceMin }),
          ...(filters.nonceMax && { _lte: filters.nonceMax }),
        },
      }),
      // Free
      ...((filters.freeMin || filters.freeMax) && {
        free: {
          ...(filters.freeMin && {
            _gte: BigInt(Math.floor(parseFloat(filters.freeMin) * 10 ** tokenDecimals)).toString(),
          }),
          ...(filters.freeMax && {
            _lte: BigInt(Math.floor(parseFloat(filters.freeMax) * 10 ** tokenDecimals)).toString(),
          }),
        },
      }),
      // Reserved
      ...((filters.reservedMin || filters.reservedMax) && {
        reserved: {
          ...(filters.reservedMin && {
            _gte: BigInt(
              Math.floor(parseFloat(filters.reservedMin) * 10 ** tokenDecimals),
            ).toString(),
          }),
          ...(filters.reservedMax && {
            _lte: BigInt(
              Math.floor(parseFloat(filters.reservedMax) * 10 ** tokenDecimals),
            ).toString(),
          }),
        },
      }),
      // Total
      ...((filters.totalMin || filters.totalMax) && {
        total: {
          ...(filters.totalMin && {
            _gte: BigInt(Math.floor(parseFloat(filters.totalMin) * 10 ** tokenDecimals)).toString(),
          }),
          ...(filters.totalMax && {
            _lte: BigInt(Math.floor(parseFloat(filters.totalMax) * 10 ** tokenDecimals)).toString(),
          }),
        },
      }),
    }),
    [filters, availableColumns, tokenDecimals],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { loading, setIsVisible } = useIndexersQuery<AccountsQuery, AccountsQueryVariables>(
    AccountsDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state.consensus.accounts)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const accounts = useMemo(() => data && data.consensus_accounts, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_accounts_aggregate.aggregate
        ? data.consensus_accounts_aggregate.aggregate.count
        : 0,
    [data],
  )

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          id: ({ row }: Cell<Row>) => (
            <AccountIconWithLink address={row.original.id} network={network} section={section} />
          ),
          nonce: ({ row }: Cell<Row>) => row.original.nonce.toString(),
          free: ({ row }: Cell<Row>) => numberWithCommas(bigNumberToNumber(row.original.free)),
          reserved: ({ row }: Cell<Row>) =>
            numberWithCommas(bigNumberToNumber(row.original.reserved)),
          total: ({ row }: Cell<Row>) => numberWithCommas(bigNumberToNumber(row.original.total)),
          createdAt: ({ row }: Cell<Row>) => (
            <Link
              key={`${row.index}-account-createdAt`}
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.createdAt)}
            >
              <div>{row.original.createdAt}</div>
            </Link>
          ),
          updatedAt: ({ row }: Cell<Row>) => (
            <Link
              key={`${row.index}-account-updatedAt`}
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.updatedAt)}
            >
              <div>{row.original.updatedAt}</div>
            </Link>
          ),
        },
        {},
        { extrinsicsCount: false },
      ),
    [network, section, selectedColumns],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, AccountsDocument, 'consensus_' + TABLE, {
        orderBy,
        where,
      }),
    [apolloClient, orderBy, where],
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
      <div className='my-4' ref={ref}>
        <TableSettings table={TABLE} totalCount={totalCount} filters={filters} />
        {!loading && accounts ? (
          <SortedTable
            data={accounts}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={onSortingChange}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={onPaginationChange}
            filename={TABLE}
            fullDataDownloader={fullDataDownloader}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
