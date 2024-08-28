'use client'

import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

export const LogDetailsEventList: FC<Props> = ({ events }) => {
  const { network, section } = useChains()
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
          <div className='flex w-full gap-1' key={`${row.index}-log-event-id`}>
            <Link
              className='w-full hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
            >
              {`${row.original.block?.height}-${row.index}`}
            </Link>
          </div>
        ),
      },
      {
        accessorKey: 'block',
        header: 'Hash',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div
            key={`${row.index}-block`}
          >{`${row.original.block && shortString(row.original.block.hash)}`}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => (
          <div key={`${row.index}-name`}>{row.original.name.split('.')[1]}</div>
        ),
      },
      {
        accessorKey: 'phase',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Event>) => <div key={`${row.index}-phase`}>{row.original.phase}</div>,
      },
    ],
    [network, section],
  )

  const totalCount = useMemo(() => (events ? events.length : 0), [events])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
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
      filename='event-list'
    />
  )
}
