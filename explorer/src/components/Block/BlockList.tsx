'use client'

import { searchTypes } from '@/constants'
import { PAGE_SIZE } from '@/constants/general'
import { numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { CopyButton } from 'components/common/CopyButton'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Block,
  BlocksConnectionDomainQuery,
  BlocksConnectionDomainQueryVariables,
  BlocksConnectionQuery,
  BlocksConnectionQueryVariables,
} from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { BlockAuthor } from './BlockAuthor'
import { QUERY_BLOCK_LIST_CONNECTION, QUERY_BLOCK_LIST_CONNECTION_DOMAIN } from './query'

dayjs.extend(relativeTime)

export const BlockList: FC = () => {
  const { ref, inView } = useInView()
  const { selectedChain, selectedDomain } = useDomains()
  const novaExplorerBanner = useEvmExplorerBanner('blocks')

  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()
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

  const { setIsVisible } = useSquidQuery<
    BlocksConnectionQuery | BlocksConnectionDomainQuery,
    BlocksConnectionQueryVariables | BlocksConnectionDomainQueryVariables
  >(
    BlockListQuery,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    selectedChain?.isDomain ? Routes.nova : Routes.consensus,
    'blocks',
  )

  const {
    consensus: { blocks: consensusEntry },
    nova: { blocks: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (selectedChain?.isDomain) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, selectedChain])

  const data = useMemo(() => {
    if (selectedChain?.isDomain && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, selectedChain])

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
          <div key={`${row.index}-block-time`}>{row.original.extrinsics?.length}</div>
        ),
      },
      {
        accessorKey: 'Events',
        header: 'Events',
        enableSorting: false,
        cell: ({ row }: Cell<Block>) => (
          <div key={`${row.index}-block-time`}>{row.original.events?.length}</div>
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

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

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
            <div ref={ref}>
              {blocks ? (
                <SortedTable
                  data={blocks}
                  columns={columns}
                  showNavigation={true}
                  pagination={pagination}
                  pageCount={pageCount}
                  onPaginationChange={setPagination}
                  filename='blocks-list'
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
