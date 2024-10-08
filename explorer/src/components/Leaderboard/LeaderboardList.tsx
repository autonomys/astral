'use client'

import { DocumentNode, useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, TOKEN } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  AccountTransferSenderTotalCountQuery,
  AccountTransferSenderTotalCountQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTableStates } from 'states/tables'
import { useViewStates } from 'states/view'
import type { Cell, LeaderboardFilters } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { AccountIcon } from '../common/AccountIcon'
import { NotFound } from '../layout/NotFound'

dayjs.extend(relativeTime)

type LeaderboardListProps = {
  title: string
  query: DocumentNode
  table: string
  idLink: (id: string) => string
  idLabel?: string
  valueType?: 'number' | 'bigNumber'
  valueLabel?: string
  valueSuffix?: string
  showAccountIcon?: boolean
}
type Row =
  AccountTransferSenderTotalCountQuery['leaderboard_account_transfer_sender_total_counts'][0]

export const LeaderboardList: FC<LeaderboardListProps> = ({
  title,
  query,
  table,
  idLink,
  idLabel = 'Account',
  valueType = 'bigNumber',
  valueLabel = table.endsWith('count') ? 'Count' : 'Value',
  valueSuffix = '',
  showAccountIcon = true,
}) => {
  const { ref, inView } = useInView()
  const { myPositionOnly } = useViewStates()
  const { subspaceAccount } = useWallet()
  const {
    leaderboard: { columns: availableColumns, selectedColumns, filters: leaderboardFilters },
  } = useTableStates()
  const filters = useMemo(() => leaderboardFilters as LeaderboardFilters, [leaderboardFilters])

  const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const apolloClient = useApolloClient()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')
  const { network } = useChains()
  const inFocus = useWindowFocus()

  const columns = useMemo(() => {
    const cols = []
    if (selectedColumns.includes('id'))
      cols.push({
        accessorKey: 'rank',
        header: 'Rank',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`rank-${row.original.id}`}>{row.original.rank}</div>
        ),
      })
    if (selectedColumns.includes('id'))
      cols.push({
        accessorKey: 'id',
        header: idLabel,
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => {
          return (
            <div key={`id-${row.original.id}`} className='row flex items-center gap-3'>
              {showAccountIcon && <AccountIcon address={row.original.id} size={26} />}
              <Link
                data-testid={`account-link-${row.index}`}
                href={idLink(row.original.id)}
                className='hover:text-primaryAccent'
              >
                <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
              </Link>
            </div>
          )
        },
      })
    if (selectedColumns.includes('value'))
      cols.push({
        accessorKey: 'value',
        header: valueLabel,
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`value-${row.original.id}`}>
            {row.original.value
              ? `${numberWithCommas(valueType === 'bigNumber' ? bigNumberToNumber(row.original.value) : row.original.value)}`
              : 0}
            {valueSuffix && ` ${valueSuffix}`}
          </div>
        ),
      })
    if (selectedColumns.includes('last_contribution_at'))
      cols.push({
        accessorKey: 'last_contribution_at',
        header: 'Last contribution',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`last_contribution_at-${row.original.id}`}>
            {dayjs(row.original.last_contribution_at).fromNow(true) + ' ago'}
          </div>
        ),
      })
    if (selectedColumns.includes('created_at'))
      cols.push({
        accessorKey: 'created_at',
        header: 'First contribution block',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`created_at-${row.original.id}`}
            data-testid={`created-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              row.original.created_at,
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.created_at}</div>
          </Link>
        ),
      })
    if (selectedColumns.includes('updated_at'))
      cols.push({
        accessorKey: 'updated_at',
        header: 'Last contribution block',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`updated_at-${row.original.id}`}
            data-testid={`updated-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              row.original.updated_at,
            )}
            className='hover:text-primaryAccent'
          >
            <div>{row.original.updated_at}</div>
          </Link>
        ),
      })
    return cols
  }, [
    selectedColumns,
    idLabel,
    valueLabel,
    showAccountIcon,
    idLink,
    isLargeLaptop,
    valueType,
    valueSuffix,
    network,
  ])

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { rank: OrderBy.Asc },
    [sorting],
  )

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    if (subspaceAccount && myPositionOnly) {
      conditions['id'] = {}
      conditions.id._eq = subspaceAccount
    }

    // Add search conditions
    availableColumns
      .filter((column) => column.searchable)
      .forEach((column) => {
        const searchKey = `search-${column.name}` as keyof LeaderboardFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // Rank
    if (filters.rankMin || filters.rankMax) {
      conditions['rank'] = {}
      if (filters.rankMin) conditions.rank._gte = filters.rankMin
      if (filters.rankMax) conditions.rank._lte = filters.rankMax
    }

    // Value
    if (filters.valueMin || filters.valueMax) {
      conditions['value'] = {}
      if (filters.valueMin) {
        conditions.value._gte = BigInt(
          Math.floor(parseFloat(filters.valueMin) * 10 ** TOKEN.decimals),
        ).toString()
      }
      if (filters.valueMax) {
        conditions.value._lte = BigInt(
          Math.floor(parseFloat(filters.valueMax) * 10 ** TOKEN.decimals),
        ).toString()
      }
    }

    return conditions
  }, [availableColumns, filters, myPositionOnly, subspaceAccount])

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : 0,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const {
    loading,
    data: listData,
    setIsVisible,
  } = useSquidQuery<
    AccountTransferSenderTotalCountQuery,
    AccountTransferSenderTotalCountQueryVariables
  >(query, {
    variables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'leaderboard' },
  })

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, query, table, { orderBy }),
    [apolloClient, table, orderBy, query],
  )

  const data = useMemo(
    () =>
      listData
        ? (listData[
            table as keyof AccountTransferSenderTotalCountQuery
          ] as AccountTransferSenderTotalCountQuery['leaderboard_account_transfer_sender_total_counts'])
        : [],
    [listData, table],
  )
  const totalCount = useMemo(
    () =>
      listData && listData[(table + '_aggregate') as keyof AccountTransferSenderTotalCountQuery]
        ? (
            listData[
              (table + '_aggregate') as keyof AccountTransferSenderTotalCountQuery
            ] as AccountTransferSenderTotalCountQuery['leaderboard_account_transfer_sender_total_counts_aggregate']
          )?.aggregate?.count
        : 0,
    [listData, table],
  )
  const pageCount = useMemo(
    () => (totalCount ? countTablePages(totalCount, pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!listData) return <NotFound />
    return null
  }, [listData, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='flex w-full flex-col sm:mt-0'>
        <div className='flex w-full flex-col gap-4 px-4'>
          <div className='text-base font-medium text-grayDark dark:text-white'>{title}</div>
        </div>
        <div className='my-6 rounded'>
          <div ref={ref}>
            {listData ? (
              <SortedTable
                data={data}
                columns={columns}
                showNavigation={true}
                sorting={sorting}
                onSortingChange={setSorting}
                pagination={pagination}
                pageCount={pageCount}
                onPaginationChange={setPagination}
                filename='leaderboard-vote-block-reward-list'
                fullDataDownloader={fullDataDownloader}
              />
            ) : (
              noData
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
