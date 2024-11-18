'use client'

import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import { BlockByIdQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { countTablePages } from 'utils/table'

type Log = NonNullable<BlockByIdQuery['consensus_blocks'][number]>['logs'][number]

type Props = {
  logs: Log[]
}

export const BlockDetailsLogList: FC<Props> = ({ logs }) => {
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
        header: 'Log Index',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <Link
            key={`${row.index}-block-log-id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.logs.id.page(network, section, row.original.id)}
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
          <div key={`${row.index}-block-log-block`}>{row.original.block_height}</div>
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
    [network, section],
  )

  const totalCount = useMemo(() => (logs ? logs.length : 0), [logs])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
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
