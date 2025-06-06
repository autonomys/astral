'use client'

import { useApolloClient } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  EventsByBlockIdDocument,
  EventsByBlockIdQuery,
  EventsByBlockIdQueryVariables,
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
import { NotFound } from '../../layout/NotFound'

type Row = EventsByBlockIdQuery['consensus_events'][number]

type Props = {
  blockHeight: number
  eventsCount: number
}

export const BlockDetailsEventList: FC<Props> = ({ blockHeight, eventsCount }) => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const apolloClient = useApolloClient()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: false }])
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
      blockHeight,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, blockHeight],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    EventsByBlockIdQuery,
    EventsByBlockIdQueryVariables
  >(
    EventsByBlockIdDocument,
    {
      variables,
      skip: !inFocus,
    },
    Routes.consensus,
    'blockDetailsEvent',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.blockDetailsEvent)
  const events = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_events,
    [consensusEntry],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sort_id',
        header: 'Event Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div className='flex w-full gap-1' key={`${row.index}-block-event-id`}>
            <Link
              className='w-full hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
            >
              {row.original.id}
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'extrinsic_id',
        header: 'Extrinsics  Id',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-event-extrinsic_id`}>{row.original.extrinsic_id}</div>
        ),
      },
      {
        accessorKey: 'section',
        header: 'Section',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-event-section`}>{row.original.section}</div>
        ),
      },
      {
        accessorKey: 'module',
        header: 'Module',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-event-module`}>{row.original.module}</div>
        ),
      },
      {
        accessorKey: 'phase',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-event-phase`}>{row.original.phase}</div>
        ),
      },
    ],
    [network, section],
  )

  const fullDataDownloader = useCallback(
    () => downloadFullData(apolloClient, EventsByBlockIdDocument, 'consensus_events', variables),
    [apolloClient, variables],
  )

  const pageCount = useMemo(
    () => countTablePages(eventsCount, pagination.pageSize),
    [eventsCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [loading, consensusEntry])

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
          filename='block-details-event-list'
          fullDataDownloader={fullDataDownloader}
        />
      ) : (
        noData
      )}
    </div>
  )
}
