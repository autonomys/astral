'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event, EventsByBlockIdQuery, EventsByBlockIdQueryVariables } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { sort } from 'utils/sort'
import { countTablePages } from 'utils/table'
import { NotFound } from '../layout/NotFound'
import { QUERY_BLOCK_EVENTS } from './query'

dayjs.extend(relativeTime)

export const BlockDetailsEventList: FC = () => {
  const { ref, inView } = useInView()
  const { blockId } = useParams()
  const { network, section, isEvm } = useChains()
  const apolloClient = useApolloClient()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const orderBy = useMemo(() => sort(sorting, 'id_ASC'), [sorting])

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy,
      blockId: Number(blockId),
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, blockId],
  )

  const { data, loading, setIsVisible } = useSquidQuery<
    EventsByBlockIdQuery,
    EventsByBlockIdQueryVariables
  >(QUERY_BLOCK_EVENTS, {
    variables,
    skip: !inFocus,
    context: { clientName: isEvm ? 'nova' : 'consensus' },
  })

  const eventsConnection = useMemo(() => data && data.eventsConnection, [data])
  const events = useMemo(
    () => eventsConnection && (eventsConnection.edges.map((event) => event.node) as Event[]),
    [eventsConnection],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Event Id',
        enableSorting: false,
        cell: ({ row }: Cell<Event>) => (
          <div className='flex w-full gap-1' key={`${row.index}-block-event-id`}>
            <Link
              className='w-full hover:text-purpleAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
            >
              {`${row.original.block?.height}-${row.index}`}
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'extrinsic',
        header: 'Extrinsics  Id',
        enableSorting: false,
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-block-event-extrinsic`}>
            {row.original.extrinsic
              ? `${row.original.extrinsic.block.height}-${row.original.extrinsic.indexInBlock}`
              : '-'}
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-block-event-action`}>{row.original.name.split('.')[1]}</div>
        ),
      },
      {
        accessorKey: 'phase',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-block-event-phase`}>{row.original.phase}</div>
        ),
      },
    ],
    [network, section],
  )

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, QUERY_BLOCK_EVENTS, 'eventsConnection', {
        first: 10,
        orderBy,
      }),
    [apolloClient, orderBy],
  )

  const totalCount = useMemo(() => (events ? events.length : 0), [events])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
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
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0' ref={ref}>
      {events ? (
        <SortedTable
          data={events}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='block-details-event-list'
          fullDataDownloader={fullDataDownloader}
        />
      ) : (
        noData
      )}
    </div>
  )
}
