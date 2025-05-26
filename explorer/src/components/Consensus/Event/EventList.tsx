'use client'

import { numberWithCommas } from '@/utils/number'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES } from 'constants/routes'
import { FILTERS_OPTIONS } from 'constants/tables'
import {
  EventsAggregateDocument,
  EventsAggregateQuery,
  EventsAggregateQueryVariables,
  EventsDocument,
  EventsModulesDocument,
  EventsModulesQuery,
  EventsModulesQueryVariables,
  EventsQuery,
  EventsQueryVariables,
  // eslint-disable-next-line camelcase
  Order_By,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useEffect, useMemo, useRef } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, EventsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = EventsQuery['consensus_events'][0]
const TABLE = 'events'
const MAX_RECORDS = 500000

export const EventList: FC = () => {
  const { network, section } = useIndexers()

  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<EventsFilters>(TABLE)

  const prevWhereRef = useRef<string | null>(null)

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
      // Module
      ...(filters.module && { module: { _eq: `${filters.module}` } }),
    }),
    [filters, whereForSearch],
  )

  // Effect to reset pagination when where clause changes
  useEffect(() => {
    const currentWhere = JSON.stringify(where)
    const prevWhere = prevWhereRef.current

    if (prevWhere !== null && prevWhere !== currentWhere) {
      // Reset pagination to first page when where clause changes
      onPaginationChange({ pageIndex: 0, pageSize: pagination.pageSize })
    }

    prevWhereRef.current = currentWhere
  }, [where, onPaginationChange, pagination.pageSize])

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      where,
      orderBy: {
        // eslint-disable-next-line camelcase
        sort_id: Order_By.Desc,
      },
    }),
    [pagination.pageSize, pagination.pageIndex, where],
  )

  const countVariables = useMemo(
    () => ({
      where: Object.keys(where).length > 0 ? where : undefined,
    }),
    [where],
  )

  const { loading: loadingAggregate, data: dataAggregate } = useIndexersQuery<
    EventsAggregateQuery,
    EventsAggregateQueryVariables
  >(EventsAggregateDocument, {
    variables: countVariables,
  })

  const { loading, data } = useIndexersQuery<EventsQuery, EventsQueryVariables>(EventsDocument, {
    variables,
    skip: !variables.where,
    pollInterval: 6000,
  })

  const { loading: loadingModules, data: dataModules } = useIndexersQuery<
    EventsModulesQuery,
    EventsModulesQueryVariables
  >(EventsModulesDocument, {
    variables: {},
  })

  const totalCount = useMemo(
    () =>
      dataAggregate && dataAggregate.consensus_events_aggregate.aggregate
        ? dataAggregate.consensus_events_aggregate.aggregate.count
        : 0,
    [dataAggregate],
  )

  const events = useMemo(() => (data ? data.consensus_events : []), [data])
  const filtersOptions = useMemo(
    () =>
      dataModules
        ? FILTERS_OPTIONS[TABLE].map((filter) => ({
            ...filter,
            ...(filter.key === 'section' && {
              options: [...new Set(dataModules?.consensus_event_modules.map((m) => m.section))],
            }),
            ...(filter.key === 'module' && {
              options: dataModules?.consensus_event_modules.map((m) => ({
                value: m.method,
                label: m.method + ' (' + m.section + ')',
              })),
            }),
          }))
        : undefined,
    [dataModules],
  )

  console.log('dataAggregate', dataAggregate)
  console.log('dataModules', data)
  console.log('data', data)
  console.log('loading', loading)
  console.log('loadingAggregate', loadingAggregate)
  console.log('loadingModules', loading)
  console.log('filtersOptions', filtersOptions)
  console.log('events', events)

  const pageCount = useMemo(() => {
    const countToUse = Object.keys(where).length > 0 ? totalCount : MAX_RECORDS
    return Math.ceil(countToUse / pagination.pageSize)
  }, [pagination.pageSize, totalCount, where])

  console.log('events', events)

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          sortId: ({ row }: Cell<Row>) => (
            <Link
              key={`${row.index}-event-id`}
              className='w-full whitespace-nowrap hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
            >
              <div>{row.original.id}</div>
            </Link>
          ),
          timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.timestamp),
          blockHeight: ({ row }: Cell<Row>) => (
            <Link
              key={`${row.index}-event-block`}
              className='hover:text-primaryAccent'
              href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.blockHeight)}
            >
              {numberWithCommas(row.original.blockHeight)}
            </Link>
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
          module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
          indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock,
        },
        {},
        {
          sortId: false,
          blockHeight: false,
          blockHash: false,
          extrinsicId: false,
          extrinsicHash: false,
          section: false,
          module: false,
          indexInBlock: false,
          timestamp: false,
        },
      ),
    [network, section, selectedColumns],
  )

  const isDataLoaded = useMemo(() => {
    if (countVariables.where) {
      return !loading && !loadingAggregate && !loadingModules
    }
    return !loading && !loadingModules
  }, [loading, loadingAggregate, loadingModules, countVariables])

  const noData = useMemo(() => {
    if (loading || loadingAggregate) return <Spinner isSmall />
    if (!data || !dataAggregate) return <NotFound />
    return null
  }, [data, dataAggregate, loading, loadingAggregate])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={filtersOptions}
          totalCount={`(${numberWithCommas(MAX_RECORDS)}+)`}
        />
        {isDataLoaded && events ? (
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
