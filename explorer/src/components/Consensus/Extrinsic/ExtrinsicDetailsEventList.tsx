'use client'

import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ExtrinsicsByIdQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { countTablePages } from 'utils/table'

dayjs.extend(relativeTime)

type Props = {
  events: NonNullable<ExtrinsicsByIdQuery['consensus_extrinsics_by_pk']>['events']
}

type Row = NonNullable<ExtrinsicsByIdQuery['consensus_extrinsics_by_pk']>['events'][number]

export const ExtrinsicDetailsEventList: FC<Props> = ({ events }) => {
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
        enableSorting: false,
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
        accessorKey: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-event-action`}>{row.original.name.split('.')[1]}</div>
        ),
      },
      {
        accessorKey: 'phase',
        header: 'Type',
        enableSorting: false,
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
