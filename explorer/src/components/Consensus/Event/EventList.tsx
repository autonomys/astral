'use client'

import { numberWithCommas } from '@/utils/number'
import { useSubscription } from '@apollo/client'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { Tooltip } from 'components/common/Tooltip'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  EventsDocument,
  EventsSubscription,
  EventsSubscriptionVariables,
  // eslint-disable-next-line camelcase
  Order_By,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useEffect, useMemo, useRef } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, EventsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = EventsSubscription['consensus_events'][0]
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
      ...(filters.section && { section: { _eq: `${filters.section}` } }),
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
        block_height: Order_By.Desc,
      },
    }),
    [pagination.pageSize, pagination.pageIndex, where],
  )

  const { loading, data } = useSubscription<EventsSubscription, EventsSubscriptionVariables>(
    EventsDocument,
    {
      variables,
    },
  )

  const events = useMemo(() => (data ? data.consensus_events : []), [data])
  const pageCount = useMemo(() => {
    return Math.ceil(MAX_RECORDS / pagination.pageSize)
  }, [pagination.pageSize])

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
          timestamp: ({ row }: Cell<Row>) => (
            <Tooltip text={utcToLocalTime(row.original.timestamp)}>
              <div>{utcToLocalRelativeTime(row.original.timestamp)}</div>
            </Tooltip>
          ),
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

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={[]}
          totalCount={`(${numberWithCommas(MAX_RECORDS)}+)`}
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
