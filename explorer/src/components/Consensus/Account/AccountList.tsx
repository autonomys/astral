'use client'

import { useApolloClient } from '@apollo/client'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { AccountsQuery, AccountsQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableStates } from 'states/tables'
import type { AccountsFilters, Cell, TableSettingsTabs } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { AccountIconWithLink } from '../../common/AccountIcon'
import { QUERY_ACCOUNTS } from './query'

type Row = AccountsQuery['consensus_accounts'][number]
const TABLE = 'accounts'

export const AccountList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section, tokenDecimals } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'total', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()
  const apolloClient = useApolloClient()
  const availableColumns = useTableStates((state) => state[TABLE].columns)
  const selectedColumns = useTableStates((state) => state[TABLE].selectedColumns)
  const filtersOptions = useTableStates((state) => state[TABLE].filtersOptions)
  const filters = useTableStates((state) => state[TABLE].filters) as AccountsFilters
  const showTableSettings = useTableStates((state) => state[TABLE].showTableSettings)
  const setColumns = useTableStates((state) => state.setColumns)
  const setFilters = useTableStates((state) => state.setFilters)
  const showSettings = useTableStates((state) => state.showSettings)
  const hideSettings = useTableStates((state) => state.hideSettings)
  const resetSettings = useTableStates((state) => state.resetSettings)
  const showReset = useTableStates((state) => state.showReset)

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { total: OrderBy.Desc },
    [sorting],
  )

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    // Add search conditions
    availableColumns
      .filter((column) => column.searchable)
      .forEach((column) => {
        const searchKey = `search-${column.name}` as keyof AccountsFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // Nonce
    if (filters.nonceMin || filters.nonceMax) {
      conditions['nonce'] = {}
      if (filters.nonceMin) {
        conditions.nonce._gte = filters.nonceMin
      }
      if (filters.nonceMax) {
        conditions.nonce._lte = filters.nonceMax
      }
    }

    // Free
    if (filters.freeMin || filters.freeMax) {
      conditions['free'] = {}
      if (filters.freeMin) {
        conditions.free._gte = BigInt(
          Math.floor(parseFloat(filters.freeMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.freeMax) {
        conditions.free._lte = BigInt(
          Math.floor(parseFloat(filters.freeMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    // Reserved
    if (filters.reservedMin || filters.reservedMax) {
      conditions['reserved'] = {}
      if (filters.reservedMin) {
        conditions.reserved._gte = BigInt(
          Math.floor(parseFloat(filters.reservedMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.reservedMax) {
        conditions.reserved._lte = BigInt(
          Math.floor(parseFloat(filters.reservedMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    // Total
    if (filters.totalMin || filters.totalMax) {
      conditions['total'] = {}
      if (filters.totalMin) {
        conditions.total._gte = BigInt(
          Math.floor(parseFloat(filters.totalMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.totalMax) {
        conditions.total._lte = BigInt(
          Math.floor(parseFloat(filters.totalMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    return conditions
  }, [availableColumns, filters, tokenDecimals])

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
    QUERY_ACCOUNTS,
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
      downloadFullData(apolloClient, QUERY_ACCOUNTS, 'consensus_' + TABLE, {
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

  const handleFilterChange = useCallback(
    (filterName: string, value: string | boolean) => {
      setFilters(TABLE, {
        ...filters,
        [filterName]: value,
      })
    },
    [filters, setFilters],
  )

  const handleClickOnColumnToEditTable = useCallback(
    (column: string, checked: boolean) =>
      checked
        ? setColumns(TABLE, [...selectedColumns, column])
        : setColumns(
            TABLE,
            selectedColumns.filter((c) => c !== column),
          ),
    [selectedColumns, setColumns],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          tableName={capitalizeFirstLetter(TABLE)}
          totalCount={totalCount}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          filters={filters}
          showTableSettings={showTableSettings}
          showSettings={(setting: TableSettingsTabs) => showSettings(TABLE, setting)}
          hideSettings={() => hideSettings(TABLE)}
          handleColumnChange={handleClickOnColumnToEditTable}
          handleFilterChange={handleFilterChange}
          filterOptions={filtersOptions}
          handleReset={() => resetSettings(TABLE)}
          showReset={showReset(TABLE)}
        />
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
