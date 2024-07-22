'use client'

import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { countTablePages } from 'utils/table'

dayjs.extend(relativeTime)

export type Result = {
  id: string
  timestamp: string
  action: string
  blockHeight: number
  indexInBlock: number
  type: string
}

interface Props {
  results: Result[]
}

export const ExtrinsicAndEventResultTable: FC<Props> = ({ results }) => {
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
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<Result>) => {
          const link =
            row.original.type === 'Extrinsic'
              ? INTERNAL_ROUTES.extrinsics.id.page(
                  selectedChain.urls.page,
                  selectedDomain,
                  row.original.id,
                )
              : INTERNAL_ROUTES.events.id.page(
                  selectedChain.urls.page,
                  selectedDomain,
                  row.original.id,
                )
          return (
            <Link key={`${row.index}-result-id`} className='hover:text-purpleAccent' href={link}>
              <div>{row.original.id}</div>
            </Link>
          )
        },
      },
      {
        accessorKey: 'blockHeight',
        header: 'Block',
        enableSorting: true,
        cell: ({ row }: Cell<Result>) => (
          <Link
            key={`${row.index}-result-block`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.blocks.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.blockHeight,
            )}
          >
            <div>{row.original.blockHeight}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<Result>) => (
          <div key={`${row.index}-result-time`}>{dayjs(row.original.timestamp).fromNow(true)}</div>
        ),
      },
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Result>) => (
          <div key={`${row.index}-result-action`}>
            {row.original.action.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Result>) => (
          <div key={`${row.index}-result-type`}>{row.original.type}</div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (results ? results.length : 0), [results])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  return (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <SortedTable
          data={results}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='latest-extrinsics'
        />
      </div>
    </div>
  )
}

export default ExtrinsicAndEventResultTable
