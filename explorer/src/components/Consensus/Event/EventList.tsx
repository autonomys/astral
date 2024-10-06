'use client'

import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { EventsQuery, EventsQueryVariables } from 'gql/graphql'
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
import { QUERY_EVENTS } from './query'

dayjs.extend(relativeTime)

type Row = EventsQuery['consensus_events'][0]

export const EventList: FC = () => {
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

  const { loading, setIsVisible } = useSquidQuery<EventsQuery, EventsQueryVariables>(
    QUERY_EVENTS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'events',
  )

  const {
    consensus: { events: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const events = useMemo(() => data && data.consensus_events, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_events_aggregate.aggregate
        ? data.consensus_events_aggregate.aggregate.count
        : 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const modules = useMemo(
    () => data && data.consensus_event_modules.map((module) => module.method),
    [data],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Event Id',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div className='flex w-full gap-1' key={`${row.index}-event-id`}>
            <Link
              className='w-full hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
              data-testid={`event-link-${row.index}`}
            >
              {row.original.id}
            </Link>
            <CopyButton
              data-testid={`testCopyButton-${row.index}`}
              value={row.original.id}
              message='Id copied'
            />
          </div>
        ),
      },
      {
        accessorKey: 'block.height',
        header: 'Block',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-event-block`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
          >
            {row.original.block?.height}
          </Link>
        ),
      },
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-event-action`}>
            {row.original.name
              .split('.')[1]
              .split(/(?=[A-Z])/)
              .join(' ')}
          </div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-event-phase`}>
            {row.original.phase.split(/(?=[A-Z])/).join(' ')}
          </div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => dayjs(row.original.block?.timestamp).fromNow(true),
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
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[4]} />
      </div>
      {modules && (
        <div className='mt-5 flex w-full justify-between'>
          <div className=' font-medium text-grayDark dark:text-white'>Events {totalLabel}</div>
        </div>
      )}
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
            <div ref={ref}>
              {!loading && events ? (
                <SortedTable
                  data={events}
                  columns={columns}
                  showNavigation={true}
                  sorting={sorting}
                  onSortingChange={setSorting}
                  pagination={pagination}
                  pageCount={pageCount}
                  onPaginationChange={setPagination}
                  filename='events-list'
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
