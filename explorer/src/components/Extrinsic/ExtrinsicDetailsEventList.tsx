'use client'

import { PAGE_SIZE } from '@/constants/general'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

export const ExtrinsicDetailsEventList: FC<Props> = ({ events }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Event Id',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <Link
            key={`${row.index}-extrinsic-event-id`}
            className='w-full hover:text-purpleAccent'
            href={INTERNAL_ROUTES.events.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
          >
            <div>{`${row.original.block?.height}-${row.index}`}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'extrinsic',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div
            key={`${row.index}-extrinsic-event-extrinsic`}
          >{`${row.original.block?.height}-${row.original.extrinsic?.indexInBlock}`}</div>
        ),
      },
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-extrinsic-event-action`}>{row.original.name.split('.')[1]}</div>
        ),
      },
      {
        accessorKey: 'phase',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-extrinsic-event-phase`}>{row.original.phase}</div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (events ? events.length : 0), [events])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return (
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
  )
}
