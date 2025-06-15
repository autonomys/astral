'use client'

import { CopyButton } from '@/components/common/CopyButton'
import { numberWithCommas } from '@/utils/number'
import { useQuery, useSubscription } from '@apollo/client'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { SortedTable } from 'components/common/SortedTable'
import { TableSettings } from 'components/common/TableSettings'
import { Tooltip } from 'components/common/Tooltip'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  EventsByBlockHashDocument,
  EventsByBlockHashQuery,
  EventsByBlockHashQueryVariables,
  EventsDocument,
  EventsSubscription,
  EventsSubscriptionVariables,
  // eslint-disable-next-line camelcase
  Order_By,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, EventsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'

type Row =
  | EventsSubscription['consensus_events'][0]
  | EventsByBlockHashQuery['consensus_blocks'][0]['events'][0]
const TABLE = 'events'
const MAX_RECORDS = 500000

export const EventList: FC = () => {
  const { network, section } = useIndexers()

  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    stringForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<EventsFilters>(TABLE)

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      where: stringForSearch,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy: [
        // eslint-disable-next-line camelcase
        { block_height: Order_By.Desc },
        // eslint-disable-next-line camelcase
        { index_in_block: Order_By.Asc },
      ],
    }),
    [pagination.pageSize, pagination.pageIndex, stringForSearch],
  )

  const { loading, data } = useSubscription<EventsSubscription, EventsSubscriptionVariables>(
    EventsDocument,
    {
      variables,
      skip: Object.keys(stringForSearch).length > 0,
    },
  )

  const { data: dataByBlockHash, loading: loadingByBlockHash } = useQuery<
    EventsByBlockHashQuery,
    EventsByBlockHashQueryVariables
  >(EventsByBlockHashDocument, {
    variables: {
      where: stringForSearch,
      limit: 1,
      offset: 0,
    },
    skip: Object.keys(stringForSearch).length === 0,
  })

  const currentTotalRecords = useMemo(() => {
    if (Object.keys(stringForSearch).length > 0 && dataByBlockHash) {
      return dataByBlockHash.consensus_blocks[0]?.events?.length ?? 0
    }
    return MAX_RECORDS
  }, [dataByBlockHash, stringForSearch])

  const events = useMemo(() => {
    if (Object.keys(stringForSearch).length > 0 && dataByBlockHash) {
      return (
        dataByBlockHash.consensus_blocks[0]?.events?.slice(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize,
        ) ?? []
      )
    }

    if (data) return data.consensus_events ?? []
    return []
  }, [data, dataByBlockHash, stringForSearch, pagination.pageIndex, pagination.pageSize])

  const pageCount = useMemo(() => {
    return Math.ceil(currentTotalRecords / pagination.pageSize)
  }, [currentTotalRecords, pagination.pageSize])

  const columns = useMemo(
    () =>
      getTableColumns<Row>(
        TABLE,
        selectedColumns,
        {
          id: ({ row }: Cell<Row>) => (
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
          hash: ({ row }: Cell<Row>) => (
            <CopyButton value={row.original.blockHash} message='Block hash copied'>
              {shortString(row.original.blockHash)}
            </CopyButton>
          ),
        },
        {},
        {
          id: false,
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
    if (Object.keys(stringForSearch).length > 0) {
      return !loadingByBlockHash
    }
    return !loading && events
  }, [loading, loadingByBlockHash, events, stringForSearch])

  const isDataLoading = useMemo(() => {
    if (loading || loadingByBlockHash || !isDataLoaded) return true
    return false
  }, [loading, loadingByBlockHash, isDataLoaded])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={[]}
          totalCount={`(${numberWithCommas(currentTotalRecords)}${currentTotalRecords === MAX_RECORDS && Object.keys(stringForSearch).length === 0 ? '+' : ''})`}
        />
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
          loading={isDataLoading}
          emptyMessage='No events found'
        />
      </div>
    </div>
  )
}
