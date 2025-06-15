import { useApolloClient } from '@apollo/client'
import { shortString } from '@autonomys/auto-utils'
import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  ExtrinsicsByAccountIdCountDocument,
  ExtrinsicsByAccountIdCountQuery,
  ExtrinsicsByAccountIdCountQueryVariables,
  ExtrinsicsByAccountIdDocument,
  ExtrinsicsByAccountIdQuery,
  ExtrinsicsByAccountIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { exportFullData } from 'utils/downloadFullData'
import { countTablePages } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'

type Props = {
  accountId: string
}

type Row = NonNullable<ExtrinsicsByAccountIdQuery['consensus_extrinsics']>[0]

export const AccountExtrinsicList: FC<Props> = ({ accountId }) => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'index_in_block', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { network, section } = useIndexers()
  const apolloClient = useApolloClient()
  const inFocus = useWindowFocus()

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : // eslint-disable-next-line camelcase
          { sort_id: OrderBy.Desc },
    [sorting],
  )

  const where = useMemo(
    () => ({
      signer: { _eq: accountId },
    }),
    [accountId],
  )

  const variables = useMemo(() => {
    return {
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }
  }, [orderBy, pagination.pageIndex, pagination.pageSize, where])

  const { loading, setIsVisible } = useIndexersQuery<
    ExtrinsicsByAccountIdQuery,
    ExtrinsicsByAccountIdQueryVariables
  >(
    ExtrinsicsByAccountIdDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'accountExtrinsic',
  )

  const { loading: countLoading, data: countData } = useIndexersQuery<
    ExtrinsicsByAccountIdCountQuery,
    ExtrinsicsByAccountIdCountQueryVariables
  >(ExtrinsicsByAccountIdCountDocument, {
    variables,
  })

  const consensusEntry = useQueryStates((state) => state.consensus.accountExtrinsic)

  const extrinsics = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_extrinsics,
    [consensusEntry],
  )

  const totalCount = useMemo(
    () => countData?.consensus_extrinsics_aggregate.aggregate?.count || 0,
    [countData],
  )
  const pageCount = useMemo(
    () => (totalCount ? countTablePages(totalCount, pagination.pageSize) : 0),
    [totalCount, pagination.pageSize],
  )

  const fullDataDownloader = useCallback(
    () =>
      exportFullData(
        apolloClient,
        ExtrinsicsByAccountIdDocument,
        'consensus_extrinsics',
        totalCount,
        variables,
      ),
    [apolloClient, variables, totalCount],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sort_id',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.original.id}-extrinsic-block-${row.original.index_in_block}`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-time-${row.index}`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
      {
        accessorKey: 'success',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${row.original.id}-home-extrinsic-status-${row.index}`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-action-${row.index}`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: true,
        cell: ({ row }) => (
          <div key={`${row.original.id}-extrinsic-hash-${row.index}`}>
            <CopyButton value={row.original.hash} message='Hash copied'>
              {shortString(row.original.hash)}
            </CopyButton>
          </div>
        ),
      },
    ],
    [network, section],
  )

  const isDataLoading = useMemo(() => {
    if (loading || isLoading(consensusEntry) || countLoading) return true
    return false
  }, [consensusEntry, countLoading, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col sm:mt-0' ref={ref}>
      <SortedTable
        data={extrinsics || []}
        columns={columns}
        showNavigation={true}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        filename='account-extrinsic-list'
        fullDataDownloader={fullDataDownloader}
        loading={isDataLoading}
        emptyMessage='No extrinsics found'
      />
    </div>
  )
}
