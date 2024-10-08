'use client'

import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import type { LogsQuery, LogsQueryVariables } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { countTablePages } from 'utils/table'
import { NotFound } from '../../layout/NotFound'
import { QUERY_LOGS } from './query'

type Row = LogsQuery['consensus_logs'][0]

export const LogList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { loading, setIsVisible } = useSquidQuery<LogsQuery, LogsQueryVariables>(
    QUERY_LOGS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'logs',
  )

  const {
    consensus: { logs: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const logs = useMemo(() => data && data.consensus_logs, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_logs_aggregate.aggregate
        ? data.consensus_logs_aggregate.aggregate.count
        : 0,
    [data],
  )
  const totalLabel = useMemo(
    () => (totalCount ? numberWithCommas(Number(totalCount)) : 0),
    [totalCount],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Log Index',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div className='flex w-full' key={`${row.index}-log-index`}>
            <Link
              className='w-full hover:text-primaryAccent'
              data-testid={`log-link-${row.index}`}
              href={INTERNAL_ROUTES.logs.id.page(network, section, row.original.id)}
            >
              <div>{row.original.id}</div>
            </Link>
            <CopyButton value={row.original.id} message='Id copied' />
          </div>
        ),
      },
      {
        accessorKey: 'block_height',
        header: 'Block',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-height`}>{row.original.block_height}</div>
        ),
      },
      {
        accessorKey: 'kind',
        header: 'Type',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => <div key={`${row.index}-kind`}>{row.original.kind}</div>,
      },
      {
        accessorKey: 'value',
        header: 'Engine',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-engine`}>{row.original.value?.[0]}</div>
        ),
      },
      {
        accessorKey: 'value',
        header: 'Data',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div
            key={`${row.index}-block-height`}
          >{`${row.original.value?.[1].slice(0, 20)}...`}</div>
        ),
      },
    ],
    [network, section],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className=' font-medium text-grayDark dark:text-white'>Logs {totalLabel}</div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
            <div ref={ref}>
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
                  filename='logs-list'
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
