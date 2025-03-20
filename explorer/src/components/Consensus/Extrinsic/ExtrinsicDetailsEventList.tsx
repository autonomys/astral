'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  EventsByExtrinsicIdDocument,
  EventsByExtrinsicIdQuery,
  EventsByExtrinsicIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { countTablePages } from 'utils/table'

type Row = EventsByExtrinsicIdQuery['consensus_events'][number]

type ExtrinsicDetailsEventListProps = {
  eventsCount: number
  extrinsicId: string
}

export const ExtrinsicDetailsEventList: FC<ExtrinsicDetailsEventListProps> = ({
  eventsCount,
  extrinsicId,
}) => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const apolloClient = useApolloClient()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : // eslint-disable-next-line camelcase
          { sort_id: OrderBy.Desc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      extrinsicId: extrinsicId as string,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, extrinsicId],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    EventsByExtrinsicIdQuery,
    EventsByExtrinsicIdQueryVariables
  >(
    EventsByExtrinsicIdDocument,
    {
      variables,
      skip: !inFocus,
    },
    Routes.consensus,
    'extrinsicDetailsEvent',
  )

  const extrinsicDetailsEvent = useQueryStates((state) => state.consensus.extrinsicDetailsEvent)
  const events = useMemo(
    () => hasValue(extrinsicDetailsEvent) && extrinsicDetailsEvent.value.consensus_events,
    [extrinsicDetailsEvent],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sort_id',
        header: 'Event Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-event-id`}
            className='w-full hover:text-primaryAccent'
            href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'extrinsic',
        header: 'Extrinsic Id',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-extrinsic`}>{row.original.extrinsic_id}</div>
        ),
      },
      {
        accessorKey: 'section',
        header: 'Section',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-section`}>{row.original.section}</div>
        ),
      },
      {
        accessorKey: 'module',
        header: 'Module',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-module`}>{row.original.module}</div>
        ),
      },
      {
        accessorKey: 'phase',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-phase`}>{row.original.phase}</div>
        ),
      },
    ],
    [network, section],
  )

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(apolloClient, EventsByExtrinsicIdDocument, 'consensus_events', variables),
    [apolloClient, variables],
  )

  const pageCount = useMemo(
    () => countTablePages(eventsCount, pagination.pageSize),
    [eventsCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(extrinsicDetailsEvent)) return <Spinner isSmall />
    if (!hasValue(extrinsicDetailsEvent)) return <NotFound />
    return null
  }, [loading, extrinsicDetailsEvent])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0' ref={ref}>
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
          filename='extrinsic-details-event-list'
          fullDataDownloader={fullDataDownloader}
        />
      ) : (
        noData
      )}
    </div>
  )
}
