'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  LogsByBlockIdDocument,
  LogsByBlockIdQuery,
  LogsByBlockIdQueryVariables,
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
import { downloadFullData } from 'utils/downloadFullData'
import { countTablePages } from 'utils/table'

type Row = LogsByBlockIdQuery['consensus_logs'][number]

type Props = {
  blockHeight: number
  logsCount: number
}

export const BlockDetailsLogList: FC<Props> = ({ blockHeight, logsCount }) => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const apolloClient = useApolloClient()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
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

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      blockId: blockHeight,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, blockHeight],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    LogsByBlockIdQuery,
    LogsByBlockIdQueryVariables
  >(
    LogsByBlockIdDocument,
    {
      variables,
      skip: !inFocus,
    },
    Routes.consensus,
    'blockDetailsLog',
  )
  const consensusEntry = useQueryStates((state) => state.consensus.blockDetailsLog)
  const logs = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_logs,
    [consensusEntry],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Log Index',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-log-id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.logs.id.page(network, section, row.original.id)}
          >
            {row.original.id}
          </Link>
        ),
      },
      {
        accessorKey: 'block',
        header: 'Block',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-log-block`}>{row.original.block_height}</div>
        ),
      },
      {
        accessorKey: 'kind',
        header: 'Type',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-log-type`}>{row.original.kind}</div>
        ),
      },
    ],
    [network, section],
  )

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, LogsByBlockIdDocument, 'consensus_logs', variables),
    [apolloClient, variables],
  )

  const pageCount = useMemo(
    () => countTablePages(logsCount, pagination.pageSize),
    [logsCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [loading, consensusEntry])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0' ref={ref}>
      {!loading && logs ? (
        <SortedTable
          data={logs}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='block-details-logs-list'
          fullDataDownloader={fullDataDownloader}
        />
      ) : (
        noData
      )}
    </div>
  )
}
