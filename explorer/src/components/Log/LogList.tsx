'use client'

import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import type {
  Log,
  LogWhereInput,
  LogsConnectionQuery,
  LogsConnectionQueryVariables,
} from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { NotFound } from '../layout/NotFound'
import { LogListFilter } from './LogListFilter'
import { QUERY_LOG_CONNECTION_LIST } from './query'

export const LogList: FC = () => {
  const { ref, inView } = useInView()
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const [filters, setFilters] = useState<LogWhereInput>({})
  const novaExplorerBanner = useEvmExplorerBanner()
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

  const { setIsVisible } = useSquidQuery<LogsConnectionQuery, LogsConnectionQueryVariables>(
    QUERY_LOG_CONNECTION_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'logs',
  )

  const {
    consensus: { logs: consensusEntry },
    nova: { logs: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

  const logsConnection = useMemo(() => data && data.logsConnection, [data])
  const logs = useMemo(
    () => logsConnection && logsConnection.edges.map((log) => log.node as Log),
    [logsConnection],
  )
  const totalCount = useMemo(
    () => (logsConnection ? logsConnection.totalCount : 0),
    [logsConnection],
  )
  const totalLabel = useMemo(
    () => (totalCount ? numberWithCommas(Number(totalCount)) : 0),
    [totalCount],
  )
  const logTypes = useMemo(() => data && data.logTypesQuery.result, [data])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Log Index',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div className='flex w-full' key={`${row.index}-log-index`}>
            <Link
              className='w-full hover:text-purpleAccent'
              data-testid={`log-link-${row.index}`}
              href={INTERNAL_ROUTES.logs.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.id,
              )}
            >
              <div>{row.original.id}</div>
            </Link>
            <CopyButton value={row.original.id} message='Id copied' />
          </div>
        ),
      },
      {
        accessorKey: 'block',
        header: 'Block',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div key={`${row.index}-block-height`}>{row.original.block.height}</div>
        ),
      },
      {
        accessorKey: 'kind',
        header: 'Type',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => <div key={`${row.index}-kind`}>{row.original.kind}</div>,
      },
      {
        accessorKey: 'engine',
        header: 'Engine',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div key={`${row.index}-engine`}>{row.original.value?.engine}</div>
        ),
      },
      {
        accessorKey: 'data',
        header: 'Data',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div
            key={`${row.index}-block-height`}
          >{`${row.original.value?.data.slice(0, 20)}...`}</div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
      {logTypes && (
        <div className='mt-5 flex w-full justify-between'>
          <LogListFilter
            title={
              <div className=' font-medium text-grayDark dark:text-white'>Logs {totalLabel}</div>
            }
            filters={filters}
            logTypes={logTypes}
            setFilters={setFilters}
          />
        </div>
      )}
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
            <div ref={ref}>
              {logs ? (
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
