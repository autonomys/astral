'use client'

import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { ExtrinsicsQuery, ExtrinsicsQueryVariables } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { shortString } from 'utils/string'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_EXTRINSICS } from './query'

type Row = ExtrinsicsQuery['consensus_extrinsics'][0]

export const ExtrinsicList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { loading, setIsVisible } = useSquidQuery<ExtrinsicsQuery, ExtrinsicsQueryVariables>(
    QUERY_EXTRINSICS,
    {
      variables,
      pollInterval: 6000,
    },
    Routes.consensus,
    'extrinsics',
  )

  const {
    consensus: { extrinsics: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_extrinsics_aggregate.aggregate
        ? data.consensus_extrinsics_aggregate.aggregate.count
        : 0,
    [data],
  )
  const pageCount = useMemo(
    () => Math.ceil(Number(totalCount) / pagination.pageSize),
    [totalCount, pagination],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const modules = useMemo(
    () => data && data.consensus_extrinsic_modules.map((module) => module.method),
    [data],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block',
        header: 'Extrinsic Id',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-block`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            <div>{`${row.original.block_height}-${row.index}`}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-time`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
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
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'blockhash',
        header: 'Block hash',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-hash}`}>
            <CopyButton value={row.original.hash} message='Hash copied'>
              {shortString(row.original.hash)}
            </CopyButton>
          </div>
        ),
      },
    ],
    [network, section],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[2]} />
      </div>
      {modules && (
        <div className='mt-5 flex w-full justify-between'>
          <div className=' font-medium text-grayDark dark:text-white'>Extrinsics {totalLabel}</div>
        </div>
      )}
      <div className='mt-8 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
            <div ref={ref}>
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
                  filename='extrinsics-list'
                />
              ) : (
                noData
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
