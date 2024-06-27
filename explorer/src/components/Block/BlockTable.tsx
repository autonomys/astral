'use client'

import { PAGE_SIZE } from '@/constants/general'
import { shortString } from '@/utils/string'
import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { NewTable } from 'components/common/NewTable'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { BlockAuthor } from './BlockAuthor'

dayjs.extend(relativeTime)

interface Props {
  blocks: Block[]
  isDesktop?: boolean
}

export const BlockTable: FC<Props> = ({ blocks }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const chain = useMemo(() => selectedChain.urls.page, [selectedChain])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <Link
            key={`${row.index}-block-height`}
            data-testid={`block-link-${row.index}`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.blocks.id.page(chain, selectedDomain, row.original.height)}
          >
            <div>{row.original.height}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>{dayjs(row.original.timestamp).fromNow(true)}</div>
        ),
      },
      {
        accessorKey: 'extrinsics',
        header: 'Extrinsics',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>
            {dayjs(row.original.extrinsics?.length).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'Events',
        header: 'Events',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>
            {dayjs(row.original.events?.length).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-hash`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.hash}
              message='Hash copied'
            >
              {shortString(row.original.hash)}
            </CopyButton>
          </div>
        ),
      },
      {
        accessorKey: 'author',
        header: 'Block Author',
        enableSorting: true,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-author`}>
            <CopyButton value={row.original.author?.id || 'Unkown'} message='Author account copied'>
              <BlockAuthor
                domain={selectedDomain}
                chain={chain}
                author={row.original.author?.id}
                isDesktop={false}
              />
            </CopyButton>
          </div>
        ),
      },
    ],
    [chain, selectedDomain],
  )

  const totalCount = useMemo(() => (blocks ? blocks.length : 0), [blocks])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  return (
    <div className='w-full'>
      <div className='my-6 rounded'>
        <NewTable
          data={blocks}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={setSorting}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={setPagination}
          filename='blocks-list'
        />
      </div>
    </div>
  )
}
