'use client'

import { CopyButton } from '@/components/common/CopyButton'
import { numberWithCommas } from '@/utils/number'
import { useQuery, useSubscription } from '@apollo/client'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
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
  SearchEventsByBlockHashDocument,
  SearchEventsByBlockHashQuery,
  SearchEventsByBlockHashQueryVariables,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useTableSettings } from 'states/tables'
import { Cell, EventsFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'

type Row = EventsSubscription['consensus_events'][0]
const TABLE = 'events'
let MAX_RECORDS = 500000

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
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy: {
        // eslint-disable-next-line camelcase
        block_height: Order_By.Desc,
      },
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { loading, data } = useSubscription<EventsSubscription, EventsSubscriptionVariables>(
    EventsDocument,
    {
      variables,
    },
  )

  const { loading: loadingSearch, data: dataSearch } = useQuery<
    SearchEventsByBlockHashQuery,
    SearchEventsByBlockHashQueryVariables
  >(SearchEventsByBlockHashDocument, {
    variables: {
      search: (stringForSearch as { block_hash: string })?.block_hash,
      limit: 10,
    },
    skip: !stringForSearch,
  })

  const events = useMemo(() => {
    if (dataSearch) return dataSearch.consensus_search_events_by_block_hash
    if (data) return data.consensus_events
    return []
  }, [data, dataSearch])

  const pageCount = useMemo(() => {
    if (dataSearch) {
      MAX_RECORDS =
        dataSearch.consensus_search_events_by_block_hash_aggregate?.aggregate?.count ?? 0
    }
    return Math.ceil(MAX_RECORDS / pagination.pageSize)
  }, [dataSearch, pagination.pageSize])

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
          blockHash: ({ row }: Cell<Row>) => (
            <CopyButton value={row.original.blockHash} message='Block hash copied'>
              {shortString(row.original.blockHash)}
            </CopyButton>
          ),
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
    if (loading || loadingSearch) return <Spinner isSmall />
    if (!data && !dataSearch) return <NotFound />
    return null
  }, [data, loading, loadingSearch, dataSearch])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-0'>
        <TableSettings
          table={TABLE}
          filters={filters}
          overrideFiltersOptions={[]}
          totalCount={`(${numberWithCommas(MAX_RECORDS)}+)`}
        />
        {!loading && !loadingSearch && events ? (
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
