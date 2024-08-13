'use client'

import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic, ExtrinsicsByBlockIdQuery, ExtrinsicsByBlockIdQueryVariables } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { NotFound } from '../layout/NotFound'
import { QUERY_BLOCK_EXTRINSICS } from './query'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
}

export const BlockDetailsExtrinsicList: FC<Props> = ({ isDesktop = false }) => {
  const { ref, inView } = useInView()
  const { blockId } = useParams()
  const { network, section, isEvm } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const first = useMemo(() => (isDesktop ? 10 : 5), [isDesktop])
  const { loading, setIsVisible } = useSquidQuery<
    ExtrinsicsByBlockIdQuery,
    ExtrinsicsByBlockIdQueryVariables
  >(
    QUERY_BLOCK_EXTRINSICS,
    {
      variables: { blockId: Number(blockId), first },
      skip: !inFocus,
      context: { clientName: isEvm ? 'nova' : 'consensus' },
    },
    isEvm ? Routes.nova : Routes.consensus,
    'blockDetailsExtrinsic',
  )

  const {
    consensus: { blockDetailsExtrinsic: consensusEntry },
    consensus: { blockDetailsExtrinsic: evmEntry },
  } = useQueryStates()

  const dataLoading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

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
        enableSorting: false,
        cell: ({ row }: Cell<Extrinsic>) => (
          <Link
            key={`${row.index}-block-extrinsic-id`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            {`${row.original.block.height}-${row.index}`}
          </Link>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: false,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-block-extrinsic-hash`}>{shortString(row.original.hash)}</div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Action',
        enableSorting: false,
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
        enableSorting: false,
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
    [network, section],
  )

  const totalCount = useMemo(() => (extrinsics ? extrinsics.length : 0), [extrinsics])
  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || dataLoading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, dataLoading, loading])

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
