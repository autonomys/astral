'use client'

import { PAGE_SIZE, searchTypes } from '@/constants'
import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useQuery } from '@apollo/client'
import { sendGAEvent } from '@next/third-parties/google'
import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic, ExtrinsicWhereInput, ExtrinsicsConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { NotFound } from '../layout/NotFound'
import { ExtrinsicListFilter } from './ExtrinsicListFilter'
import { QUERY_EXTRINSIC_LIST_CONNECTION } from './query'

dayjs.extend(relativeTime)

export const ExtrinsicList: FC = () => {
  const { selectedChain, selectedDomain } = useDomains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const [filters, setFilters] = useState<ExtrinsicWhereInput>({})
  const novaExplorerBanner = useEvmExplorerBanner('txs')

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
    }),
    [pagination.pageSize, pagination.pageIndex],
  )

  const { data, error, loading } = useQuery<ExtrinsicsConnectionQuery>(
    QUERY_EXTRINSIC_LIST_CONNECTION,
    {
      variables,
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const extrinsicsConnection = useMemo(() => data && data.extrinsicsConnection, [data])
  const extrinsics = useMemo(
    () =>
      extrinsicsConnection &&
      extrinsicsConnection.edges.map((extrinsic) => extrinsic.node as Extrinsic),
    [extrinsicsConnection],
  )
  const totalCount = useMemo(
    () => extrinsicsConnection && extrinsicsConnection.totalCount,
    [extrinsicsConnection],
  )
  const pageCount = useMemo(
    () => Math.ceil(Number(totalCount) / pagination.pageSize),
    [totalCount, pagination],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const modules = useMemo(
    () => data && data.extrinsicModuleNames.map((module) => module.name.split('.')[0]),
    [data],
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'block',
        header: 'Extrinsic Id',
        enableSorting: false,
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
        enableSorting: false,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-extrinsic-time`}>
            {dayjs(row.original.block.timestamp).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
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
      {
        accessorKey: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }: Cell<Extrinsic>) => (
          <div key={`${row.index}-extrinsic-action`}>
            {row.original.name.split('.')[1].toUpperCase()}
          </div>
        ),
      },
      {
        accessorKey: 'blockhash',
        header: 'Block hash',
        enableSorting: false,
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

  useEffect(() => {
    try {
      sendGAEvent('event', 'extrinsic_filter', { value: `filters:${filters.toString()}` })
    } catch (error) {
      console.log('Error sending GA event', error)
    }
  }, [filters])

  if (loading) return <Spinner />
  if (!data || !modules || !extrinsics) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[2]} />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <ExtrinsicListFilter
          title={
            <div className=' font-medium text-grayDark dark:text-white'>
              Extrinsics {totalLabel}
            </div>
          }
          filters={filters}
          modules={modules}
          setFilters={setFilters}
        />
      </div>
      <div className='mt-8 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
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
          </div>
        </div>
      </div>
    </div>
  )
}
