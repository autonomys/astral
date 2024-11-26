'use client'

import { Spinner } from '@/components/common/Spinner'
import { NotFound } from '@/components/layout/NotFound'
import { useIndexersQuery } from '@/hooks/useIndexersQuery'
import { useWindowFocus } from '@/hooks/useWindowFocus'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  EventsByExtrinsicIdQuery,
  EventsByExtrinsicIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { countTablePages } from 'utils/table'
import { QUERY_EXTRINSIC_EVENTS } from './query'

type Row = EventsByExtrinsicIdQuery['consensus_events'][number]

export const ExtrinsicDetailsEventList: FC = () => {
  const { ref, inView } = useInView()
  const { extrinsicId } = useParams()
  const { network, section } = useIndexers()
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
        : { id: OrderBy.Asc },
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

  const { data, loading, setIsVisible } = useIndexersQuery<
    EventsByExtrinsicIdQuery,
    EventsByExtrinsicIdQueryVariables
  >(QUERY_EXTRINSIC_EVENTS, {
    variables,
    skip: !inFocus,
  })

  const events = useMemo(() => data && data.consensus_events, [data])

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
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-action`}>{row.original.name.split('.')[1]}</div>
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
        />
      ) : (
        noData
      )}
    </div>
  )
}
