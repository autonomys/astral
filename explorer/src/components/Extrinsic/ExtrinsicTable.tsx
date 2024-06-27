'use client'

import { PAGE_SIZE } from '@/constants/general'
import { shortString } from '@/utils/string'
import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { NewTable } from 'components/common/NewTable'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'

dayjs.extend(relativeTime)

interface Props {
  extrinsics: Extrinsic[]
}

export const ExtrinsicTable: FC<Props> = ({ extrinsics }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <Link
            key={`${row.index}-extrinsic-block`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
          >
            <div>{`${row.original.block.height}-${row.index}`}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-extrinsic-time`}>
            {dayjs(row.original.block.timestamp).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${row.index}-home-extrinsic-status`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
      },
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'blockhash',
        header: 'Block hash',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-extrinsic-hash}`}>
            <CopyButton value={row.original.hash} message='Hash copied'>
              {shortString(row.original.hash)}
            </CopyButton>
          </div>
        ),
      },
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (extrinsics ? extrinsics.length : 0), [extrinsics])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <NewTable
          data={extrinsics}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='extrinsics-list'
        />
      </div>
    </div>
  )
}
