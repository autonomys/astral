'use client'

import { shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { LogsDocument, LogsQuery, LogsQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { Cell, LogsFilters } from 'types/table'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = LogsQuery['consensus_logs'][0]
const TABLE = 'logs'

export const LogList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const inFocus = useWindowFocus()
  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    orderBy,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<LogsFilters>(TABLE)

  const where = useMemo(
    () => ({
      ...whereForSearch,
      // Block Height
      ...((filters.blockHeightMin || filters.blockHeightMax) && {
        // eslint-disable-next-line camelcase
        block_height: {
          ...(filters.blockHeightMin && { _gte: filters.blockHeightMin }),
          ...(filters.blockHeightMax && { _lte: filters.blockHeightMax }),
        },
      }),
      // Log Kind
      ...(filters.kind && { kind: { _ilike: `%${filters.kind}%` } }),
    }),
    [filters, whereForSearch],
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

  const { loading, setIsVisible } = useIndexersQuery<LogsQuery, LogsQueryVariables>(
    LogsDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state.consensus.logs)

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

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        id: ({ row }: Cell<Row>) => (
          <div className='flex w-full' key={`${row.index}-log-index`}>
            <Link
              className='w-full whitespace-nowrap hover:text-primaryAccent'
              data-testid={`log-link-${row.index}`}
              href={INTERNAL_ROUTES.logs.id.page(network, section, row.original.id)}
            >
              <div>{row.original.id}</div>
            </Link>
            <CopyButton value={row.original.id} message='Id copied' />
          </div>
        ),
        blockHeight: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-log-block`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.blockHeight)}
          >
            {row.original.blockHeight}
          </Link>
        ),
        blockHash: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-log-block_hash`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.blockHash}
              message='Block hash copied'
            >
              {shortString(row.original.blockHash)}
            </CopyButton>
          </div>
        ),
        indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock.toString(),
        kind: ({ row }: Cell<Row>) => row.original.kind,
        timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.timestamp),
      }),
    [network, section, selectedColumns],
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
      <div className='my-4' ref={ref}>
        <TableSettings table={TABLE} totalCount={totalCount} filters={filters} />
        {!loading && logs ? (
          <SortedTable
            data={logs}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={onSortingChange}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={onPaginationChange}
            filename={TABLE}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
