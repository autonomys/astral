'use client'

import { DocumentNode, useApolloClient } from '@apollo/client'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  AccountTransferSenderTotalCountQuery,
  AccountTransferSenderTotalCountQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTableSettings } from 'states/tables'
import { useViewStates } from 'states/view'
import type { Cell, LeaderboardFilters } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { AccountIconWithLink } from '../common/AccountIcon'
import { NotFound } from '../layout/NotFound'

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
const TABLE = 'leaderboard'

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
    pagination,
    sorting,
    selectedColumns,
    filters,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<LeaderboardFilters>(TABLE)

  const apolloClient = useApolloClient()
  const { network, tokenDecimals } = useIndexers()
  const inFocus = useWindowFocus()

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          rank: ({ row }: Cell<Row>) => row.original.rank.toString(),
          id: ({ row }: Cell<Row>) =>
            showAccountIcon ? (
              <AccountIconWithLink
                address={row.original.id}
                network={network}
                section={Routes.consensus}
                link={idLink(row.original.id)}
              />
            ) : (
              <Link href={idLink(row.original.id)}>{row.original.id}</Link>
            ),
          value: ({ row }: Cell<Row>) =>
            `${numberWithCommas(
              valueType === 'bigNumber'
                ? bigNumberToNumber(row.original.value)
                : row.original.value,
            )} ${valueSuffix && ` ${valueSuffix}`}`,
          lastContributionAt: ({ row }: Cell<Row>) =>
            utcToLocalRelativeTime(row.original.lastContributionAt),
          createdAt: ({ row }: Cell<Row>) => (
            <Link
              key={`created_at-${row.original.id}`}
              data-testid={`created-at-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                row.original.createdAt,
              )}
              className='hover:text-primaryAccent'
            >
              {row.original.createdAt}
            </Link>
          ),
          updatedAt: ({ row }: Cell<Row>) => (
            <Link
              key={`updated_at-${row.original.id}`}
              data-testid={`updated-at-${row.index}`}
              href={INTERNAL_ROUTES.blocks.id.page(
                network,
                Routes.consensus,
                row.original.updatedAt,
              )}
              className='hover:text-primaryAccent'
            >
              <div>{row.original.updatedAt}</div>
            </Link>
          ),
        },
        { id: idLabel, value: valueLabel },
      ),
    [
      selectedColumns,
      idLabel,
      valueLabel,
      showAccountIcon,
      idLink,
      network,
      valueType,
      valueSuffix,
    ],
  )

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
    const conditions: Record<string, any> = whereForSearch

    if (subspaceAccount && myPositionOnly) {
      conditions['id'] = {}
      conditions.id._eq = subspaceAccount
    }

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
          Math.floor(parseFloat(filters.valueMin) * 10 ** tokenDecimals),
        ).toString()
      }
      if (filters.valueMax) {
        conditions.value._lte = BigInt(
          Math.floor(parseFloat(filters.valueMax) * 10 ** tokenDecimals),
        ).toString()
      }
    }

    return conditions
  }, [whereForSearch, filters, myPositionOnly, subspaceAccount, tokenDecimals])

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
  } = useIndexersQuery<
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
                onSortingChange={onSortingChange}
                pagination={pagination}
                pageCount={pageCount}
                onPaginationChange={onPaginationChange}
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
