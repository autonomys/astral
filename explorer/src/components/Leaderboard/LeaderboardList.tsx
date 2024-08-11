'use client'

import { DocumentNode, useApolloClient } from '@apollo/client'
import { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  AccountTransferSenderTotalCountQuery,
  AccountTransferSenderTotalCountQueryVariables,
} from 'gql/types/leaderboard'
import { Order_By as OrderBy } from 'gql/types/staking'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useViewStates } from 'states/view'
import type { Cell } from 'types/table'
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
  valueSuffix?: string
  showAccountIcon?: boolean
}
type Row = AccountTransferSenderTotalCountQuery['account_transfer_sender_total_count'][0]

export const LeaderboardList: FC<LeaderboardListProps> = ({
  title,
  query,
  table,
  idLink,
  idLabel = 'Account',
  valueType = 'bigNumber',
  valueSuffix = '',
  showAccountIcon = true,
}) => {
  const { ref, inView } = useInView()
  const { myPositionOnly } = useViewStates()
  const { subspaceAccount } = useWallet()
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
    return [
      {
        accessorKey: 'rank',
        header: 'Rank',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`rank-${row.original.id}`}>{row.original.rank}</div>
        ),
      },
      {
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
                className='hover:text-purpleAccent'
              >
                <div>{isLargeLaptop ? row.original.id : shortString(row.original.id)}</div>
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: 'value',
        header: 'Value',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`value-${row.original.id}`}>
            {row.original.value
              ? `${numberWithCommas(valueType === 'bigNumber' ? bigNumberToNumber(row.original.value) : row.original.value)}`
              : 0}
            {valueSuffix && ` ${valueSuffix}`}
          </div>
        ),
      },
      {
        accessorKey: 'last_contribution_at',
        header: 'Last contribution',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`last_contribution_at-${row.original.id}`}>
            {dayjs(row.original.last_contribution_at).fromNow(true) + ' ago'}
          </div>
        ),
      },
      {
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
            className='hover:text-purpleAccent'
          >
            <div>{row.original.created_at}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'last_contribution_at',
        header: 'Last contribution block',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`updated_at-${row.original.id}`}
            data-testid={`updated-at-${row.index}`}
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              row.original.created_at,
            )}
            className='hover:text-purpleAccent'
          >
            <div>{row.original.updated_at}</div>
          </Link>
        ),
      },
    ]
  }, [idLabel, showAccountIcon, idLink, isLargeLaptop, valueType, valueSuffix, network])

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { rank: OrderBy.Asc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : 0,
      orderBy,
      // eslint-disable-next-line camelcase
      where: myPositionOnly ? { id: { _eq: subspaceAccount } } : {},
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, myPositionOnly, subspaceAccount],
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
          ] as AccountTransferSenderTotalCountQuery['account_transfer_sender_total_count'])
        : [],
    [listData, table],
  )
  const totalCount = useMemo(
    () =>
      listData && listData[(table + '_aggregate') as keyof AccountTransferSenderTotalCountQuery]
        ? (
            listData[
              (table + '_aggregate') as keyof AccountTransferSenderTotalCountQuery
            ] as AccountTransferSenderTotalCountQuery['account_transfer_sender_total_count_aggregate']
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
            {data ? (
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
