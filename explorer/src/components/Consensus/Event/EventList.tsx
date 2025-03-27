'use client'

import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FILTERS_OPTIONS } from 'constants/tables'
import { EventsDocument, EventsQuery, EventsQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { Cell, EventsFilters } from 'types/table'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = EventsQuery['consensus_events'][0]
const TABLE = 'events'

export const EventList: FC = () => {
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
  } = useTableSettings<EventsFilters>(TABLE)

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
      // Section
      ...(filters.section && { section: { _ilike: `%${filters.section}%` } }),
      // Module
      ...(filters.module && { module: { _ilike: `%${filters.module}%` } }),
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

  const { loading, setIsVisible } = useIndexersQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state.consensus.events)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const events = useMemo(() => data && data.consensus_events, [data])
  const filtersOptions = useMemo(
    () =>
      data
        ? FILTERS_OPTIONS[TABLE].map((filter) => ({
            ...filter,
            ...(filter.key === 'section' && {
              options: [...new Set(data.consensus_event_modules.map((m) => m.section))],
            }),
            ...(filter.key === 'module' && {
              options: data.consensus_event_modules.map((m) => ({
                value: m.method,
                label: m.method + ' (' + m.section + ')',
              })),
            }),
          }))
        : undefined,
    [data],
  )
  const totalCount = useMemo(
    () =>
      data && data.consensus_events_aggregate.aggregate
        ? data.consensus_events_aggregate.aggregate.count
        : 0,
    [data],
  )

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        sortId: ({ row }: Cell<Row>) => (
          <div className='flex w-full gap-1 whitespace-nowrap'>
            <Link
              className='w-full hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
            >
              {row.original.id}
            </Link>
            <CopyButton value={row.original.id} message='Id copied' />
          </div>
        ),
        blockHeight: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-event-block`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.blockHeight)}
          >
            {row.original.blockHeight}
          </Link>
        ),
        blockHash: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.blockHash} message='Block hash copied'>
            {shortString(row.original.blockHash)}
          </CopyButton>
        ),
        extrinsicId: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-event-extrinsic`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.extrinsicId)}
          >
            {row.original.extrinsicId}
          </Link>
        ),
        extrinsicHash: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.extrinsicHash} message='Extrinsic hash copied'>
            {shortString(row.original.extrinsicHash)}
          </CopyButton>
        ),
        section: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.section),
        module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
        indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock,
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
        <TableSettings
          table={TABLE}
          totalCount={totalCount}
          filters={filters}
          overrideFiltersOptions={filtersOptions}
        />
        {!loading && events ? (
          <SortedTable
            data={events}
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
