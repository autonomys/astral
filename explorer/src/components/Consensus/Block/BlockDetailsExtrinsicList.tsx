'use client'

import { shortString } from '@autonomys/auto-utils'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import { ExtrinsicsByBlockIdQuery, ExtrinsicsByBlockIdQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
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
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const limit = useMemo(() => (isDesktop ? 10 : 5), [isDesktop])
  const { data, loading, setIsVisible } = useSquidQuery<
    ExtrinsicsByBlockIdQuery,
    ExtrinsicsByBlockIdQueryVariables
  >(QUERY_BLOCK_EXTRINSICS, {
    variables: { blockId: Number(blockId), limit },
    skip: !inFocus,
  })

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block',
        header: 'Extrinsic Id',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-extrinsic-id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            {`${row.original.block_height}-${row.index}`}
          </Link>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-extrinsic-hash`}>{shortString(row.original.hash)}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'block.timestamp',
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
        enableSorting: false,
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

  const totalCount = useMemo(() => (extrinsics ? extrinsics.length : 0), [extrinsics])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

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
