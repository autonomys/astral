'use client'

import { PAGE_SIZE } from '@/constants/general'
import { shortString } from '@/utils/string'
import { useQuery } from '@apollo/client'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic, ExtrinsicsByBlockIdQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useMemo, useState } from 'react'
import type { Cell } from 'types/table'
import { QUERY_BLOCK_EXTRINSICS } from './query'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
}

export const BlockDetailsExtrinsicList: FC<Props> = ({ isDesktop = false }) => {
  const { blockId } = useParams()
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const first = useMemo(() => (isDesktop ? 10 : 5), [isDesktop])
  const { data, error, loading } = useQuery<ExtrinsicsByBlockIdQuery>(QUERY_BLOCK_EXTRINSICS, {
    variables: { blockId: Number(blockId), first },
  })

  const extrinsicsConnection = useMemo(() => data && data.extrinsicsConnection, [data])
  const extrinsics = useMemo(
    () =>
      extrinsicsConnection &&
      extrinsicsConnection.edges.map((extrinsic) => extrinsic.node as Extrinsic),
    [extrinsicsConnection],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <Link
            key={`${row.index}-block-extrinsic-id`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(
              selectedChain.urls.page,
              selectedDomain,
              row.original.id,
            )}
          >
            {`${row.original.block.height}-${row.index}`}
          </Link>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-block-extrinsic-hash`}>{shortString(row.original.hash)}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-block-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'block.timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-block-extrinsic-action`}>
            {dayjs(row.original.block.timestamp).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'success',
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
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const totalCount = useMemo(() => (extrinsics ? extrinsics.length : 0), [extrinsics])
  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  if (error)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )
  if (loading)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <div className='size-20 '>
          <Spinner />
        </div>
      </div>
    )
  if (!data || !columns || !extrinsics)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0'>
      <SortedTable
        data={extrinsics}
        columns={columns}
        showNavigation={true}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        filename='block-details-extrinsics-list'
      />
    </div>
  )
}
