'use client'

import { shortString } from '@autonomys/auto-utils'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  ExtrinsicsByBlockIdQuery,
  ExtrinsicsByBlockIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { Cell } from 'types/table'
import { countTablePages } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_BLOCK_EXTRINSICS } from './query'

type Props = {
  isDesktop?: boolean
}

type Row = ExtrinsicsByBlockIdQuery['consensus_extrinsics'][number]

export const BlockDetailsExtrinsicList: FC<Props> = ({ isDesktop = false }) => {
  const { ref, inView } = useInView()
  const { blockId } = useParams()
  const { network, section } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: isDesktop ? PAGE_SIZE : 5,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { id: OrderBy.Asc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      blockId: Number(blockId),
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, blockId],
  )

  const { data, loading } = useIndexersQuery<
    ExtrinsicsByBlockIdQuery,
    ExtrinsicsByBlockIdQueryVariables
  >(
    QUERY_BLOCK_EXTRINSICS,
    {
      variables,
    },
    inView,
    inFocus,
  )

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sort_id',
        header: 'Extrinsic Id',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-extrinsic-id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            {row.original.id}
          </Link>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-extrinsic-hash`}>{shortString(row.original.hash)}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-extrinsic-action`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
      {
        accessorKey: 'success',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${row.index}-home-extrinsic-status`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
      },
    ],
    [network, section],
  )

  const totalCount = useMemo(
    () =>
      data && data.consensus_extrinsics_aggregate.aggregate
        ? data.consensus_extrinsics_aggregate.aggregate.count
        : 0,
    [data],
  )
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0' ref={ref}>
      {!loading && extrinsics ? (
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
      ) : (
        noData
      )}
    </div>
  )
}
