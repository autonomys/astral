'use client'

import { searchTypes } from '@/constants'
import { PAGE_SIZE } from '@/constants/general'
import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { useQuery } from '@apollo/client'
import { CopyButton } from 'components/common/CopyButton'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block, BlocksConnectionDomainQuery, BlocksConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { Cell } from 'types/table'
import { BlockAuthor } from './BlockAuthor'
import { QUERY_BLOCK_LIST_CONNECTION, QUERY_BLOCK_LIST_CONNECTION_DOMAIN } from './query'

dayjs.extend(relativeTime)

export const BlockList: FC = () => {
  const { selectedChain, selectedDomain } = useDomains()
  const novaExplorerBanner = useEvmExplorerBanner('blocks')

  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const BlockListQuery = useMemo(
    () =>
      selectedChain.isDomain ? QUERY_BLOCK_LIST_CONNECTION_DOMAIN : QUERY_BLOCK_LIST_CONNECTION,
    [selectedChain.isDomain],
  )

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

  const { data, error, loading } = useQuery<BlocksConnectionQuery | BlocksConnectionDomainQuery>(
    BlockListQuery,
    {
      variables,
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const blocksConnection = useMemo(() => data && data.blocksConnection, [data])
  const blocks = useMemo(
    () => blocksConnection && blocksConnection.edges.map((block) => block.node as Block),
    [blocksConnection],
  )
  const totalCount = useMemo(
    () => (blocksConnection ? blocksConnection.totalCount : 0),
    [blocksConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const chain = useMemo(() => selectedChain.urls.page, [selectedChain])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'height',
        header: 'Id',
        enableSorting: false,
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
        enableSorting: false,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>{dayjs(row.original.timestamp).fromNow(true)}</div>
        ),
      },
      {
        accessorKey: 'extrinsics',
        header: 'Extrinsics',
        enableSorting: false,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>
            {dayjs(row.original.extrinsics?.length).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'Events',
        header: 'Events',
        enableSorting: false,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>
            {dayjs(row.original.events?.length).fromNow(true)}
          </div>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: false,
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
        enableSorting: false,
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

  const pageCount = useMemo(
    () => Math.floor(totalCount / pagination.pageSize),
    [totalCount, pagination],
  )

  if (loading) return <Spinner />
  if (!data || !blocks)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[1]} />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Blocks (${totalLabel})`}</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <div className='w-full'>
          <div className='my-6 rounded'>
            <SortedTable
              data={blocks}
              columns={columns}
              showNavigation={true}
              pagination={pagination}
              pageCount={pageCount}
              onPaginationChange={setPagination}
              filename='blocks-list'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
