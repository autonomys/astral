'use client'

import { PAGE_SIZE } from '@/constants/general'
import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { NewTable } from 'components/common/NewTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Event } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { EventListCard } from './EventListCard'

dayjs.extend(relativeTime)

interface Props {
  events: Event[]
  isDesktop?: boolean
}

export const EventTable: FC<Props> = ({ events, isDesktop = false }) => {
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
          <div className='flex w-full gap-1' key={`${row.index}-event-id`}>
            <Link
              className='w-full hover:text-purpleAccent'
              href={INTERNAL_ROUTES.events.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.id,
              )}
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
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <Link
            key={`${row.index}-event-block`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.events.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
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
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (events ? events.length : 0), [events])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <NewTable
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
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {events.map((event) => (
        <EventListCard event={event} key={`event-list-card-${event.id}-${event.indexInBlock}`} />
      ))}
    </div>
  )
}
