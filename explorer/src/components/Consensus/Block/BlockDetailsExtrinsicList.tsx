'use client'

import { useApolloClient } from '@apollo/client'
import { shortString } from '@autonomys/auto-utils'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  ExtrinsicsByBlockIdDocument,
  ExtrinsicsByBlockIdQuery,
  ExtrinsicsByBlockIdQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { downloadFullData } from 'utils/downloadFullData'
import { countTablePages } from 'utils/table'
import { NotFound } from '../../layout/NotFound'

type Props = {
  blockHeight: number
  extrinsicsCount: number
  isDesktop?: boolean
}

type Row = ExtrinsicsByBlockIdQuery['consensus_extrinsics'][number]

export const BlockDetailsExtrinsicList: FC<Props> = ({
  blockHeight,
  extrinsicsCount,
  isDesktop = false,
}) => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const apolloClient = useApolloClient()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: false }])
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
        : // eslint-disable-next-line camelcase
          { sort_id: OrderBy.Desc },
    [sorting],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      blockHeight,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, blockHeight],
  )

  const { loading, setIsVisible } = useIndexersQuery<
    ExtrinsicsByBlockIdQuery,
    ExtrinsicsByBlockIdQueryVariables
  >(
    ExtrinsicsByBlockIdDocument,
    {
      variables,
      skip: !inFocus,
    },
    Routes.consensus,
    'blockDetailsExtrinsic',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.blockDetailsExtrinsic)
  const extrinsics = useMemo(
    () => hasValue(consensusEntry) && consensusEntry.value.consensus_extrinsics,
    [consensusEntry],
  )

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
        header: 'Extrinsic hash',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-extrinsic-id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.hash)}
          >
            {shortString(row.original.hash)}
          </Link>
        ),
      },
      {
        accessorKey: 'section',
        header: 'Section',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => row.original.section,
      },
      {
        accessorKey: 'module',
        header: 'Module',
        enableSorting: true,
        cell: ({ row }: Cell<Row>) => row.original.module,
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

  const fullDataDownloader = useCallback(
    () =>
      downloadFullData(
        apolloClient,
        ExtrinsicsByBlockIdDocument,
        'consensus_extrinsics',
        variables,
      ),
    [apolloClient, variables],
  )

  const pageCount = useMemo(
    () => countTablePages(extrinsicsCount, pagination.pageSize),
    [extrinsicsCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!hasValue(consensusEntry)) return <NotFound />
    return null
  }, [consensusEntry, loading])

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
          fullDataDownloader={fullDataDownloader}
        />
      ) : (
        noData
      )}
    </div>
  )
}
