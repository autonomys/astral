'use client'

import { PAGE_SIZE } from '@/constants/general'
import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { NewTable } from 'components/common/NewTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Log } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { LogListCard } from './LogListCard'

dayjs.extend(relativeTime)

interface Props {
  logs: Log[]
  isDesktop?: boolean
}

export const LogTable: FC<Props> = ({ logs, isDesktop = false }) => {
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
        enableSorting: true,
        cell: ({ row }: Cell<Log>) => (
          <div className='flex w-full' key={`${row.index}-log-index`}>
            <Link
              className='w-full hover:text-purpleAccent'
              data-testid={`log-link-${row.index}`}
              href={INTERNAL_ROUTES.logs.id.page(
                selectedChain.urls.page,
                selectedDomain,
                row.original.id,
              )}
            >
              <div>{row.original.id}</div>
            </Link>
            <CopyButton value={row.original.id} message='Id copied' />
          </div>
        ),
      },
      {
        accessorKey: 'block',
        header: 'Block',
        enableSorting: true,
        cell: ({ row }: Cell<Log>) => (
          <div key={`${row.index}-block-height`}>{row.original.block.height}</div>
        ),
      },
      {
        accessorKey: 'kind',
        header: 'Type',
        enableSorting: true,
        cell: ({ row }: Cell<Log>) => <div key={`${row.index}-kind`}>{row.original.kind}</div>,
      },
      {
        accessorKey: 'engine',
        header: 'Engine',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div key={`${row.index}-engine`}>{row.original.value?.engine}</div>
        ),
      },
      {
        accessorKey: 'data',
        header: 'Data',
        enableSorting: false,
        cell: ({ row }: Cell<Log>) => (
          <div
            key={`${row.index}-block-height`}
          >{`${row.original.value?.data.slice(0, 20)}...`}</div>
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

  return isDesktop ? (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <NewTable
          data={logs}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='logs-list'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {logs.map((log) => (
        <LogListCard log={log} key={`log-list-card-${log.id}`} />
      ))}
    </div>
  )
}
