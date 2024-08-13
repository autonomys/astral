'use client'

import { countTablePages } from '@/utils/table'
import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Event,
  EventWhereInput,
  EventsConnectionQuery,
  EventsConnectionQueryVariables,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { NotFound } from '../layout/NotFound'
import { EventListFilter } from './EventListFilter'
import { QUERY_EVENT_CONNECTION_LIST } from './query'

dayjs.extend(relativeTime)

export const EventList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section, isEvm } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()
  const [filters, setFilters] = useState<EventWhereInput>({})
  const novaExplorerBanner = useEvmExplorerBanner()

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

  const { loading, setIsVisible } = useSquidQuery<
    EventsConnectionQuery,
    EventsConnectionQueryVariables
  >(
    QUERY_EVENT_CONNECTION_LIST,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
      context: { clientName: isEvm ? 'nova' : 'consensus' },
    },
    isEvm ? Routes.nova : Routes.consensus,
    'events',
  )

  const {
    consensus: { events: consensusEntry },
    nova: { events: evmEntry },
  } = useQueryStates()

  const dataLoading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

  const eventsConnection = useMemo(() => data && data.eventsConnection, [data])
  const events = useMemo(
    () => eventsConnection && eventsConnection.edges.map((event) => event.node as Event),
    [eventsConnection],
  )
  const totalCount = useMemo(
    () => (eventsConnection ? eventsConnection.totalCount : 0),
    [eventsConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const modules = useMemo(
    () => data && data.eventModuleNames.map((module) => module.name.split('.')[0]),
    [data],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Event Id',
        enableSorting: false,
        cell: ({ row }: Cell<Event>) => (
          <div className='flex w-full gap-1' key={`${row.index}-event-id`}>
            <Link
              className='w-full hover:text-purpleAccent'
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
        cell: ({ row }: Cell<Event>) => (
          <Link
            key={`${row.index}-event-block`}
            className='hover:text-purpleAccent'
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
        cell: ({ row }: Cell<Event>) => (
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
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-event-phase`}>
            {row.original.phase.split(/(?=[A-Z])/).join(' ')}
          </div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: false,
        cell: ({ row }: Cell<Event>) => dayjs(row.original.block?.timestamp).fromNow(true),
      },
    ],
    [network, section],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || dataLoading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, dataLoading, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[4]} />
      </div>
      {modules && (
        <div className='mt-5 flex w-full justify-between'>
          <EventListFilter
            title={
              <div className=' font-medium text-grayDark dark:text-white'>Events {totalLabel}</div>
            }
            filters={filters}
            modules={modules}
            setFilters={setFilters}
          />
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
