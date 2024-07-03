'use client'

import { PAGE_SIZE } from '@/constants/general'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Log } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'

dayjs.extend(relativeTime)

type Props = {
  logs: Log[]
}

export const BlockDetailsLogList: FC<Props> = ({ logs }) => {
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
        header: 'Log Index',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <Link
            key={`${row.index}-block-log-id`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.logs.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
          >
            {row.original.id}
          </Link>
        ),
      },
      {
        accessorKey: 'block',
        header: 'Block',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div key={`${row.index}-block-log-block`}>{row.original.block.height}</div>
        ),
      },
      {
        accessorKey: 'kind',
        header: 'Type',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div key={`${row.index}-block-log-type`}>{row.original.kind}</div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (logs ? logs.length : 0), [logs])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return (
    <SortedTable
      data={logs}
      columns={columns}
      showNavigation={true}
      sorting={sorting}
      onSortingChange={setSorting}
      pagination={pagination}
      pageCount={pageCount}
      onPaginationChange={setPagination}
      filename='block-details-logs-list'
    />
  )
}
