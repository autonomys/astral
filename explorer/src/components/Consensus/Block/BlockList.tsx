'use client'

import { CopyButton } from 'components/common/CopyButton'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { BlocksQuery, BlocksQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import type { Cell } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { shortString } from 'utils/string'
import { countTablePages } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { BlockAuthor } from './BlockAuthor'
import { QUERY_BLOCKS } from './query'

type Row = BlocksQuery['consensus_blocks'][number]

export const BlockList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useChains()

  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const orderBy = useMemo(() => ({ height: OrderBy.Desc }), [])
  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy],
  )

  const { loading, setIsVisible } = useSquidQuery<BlocksQuery, BlocksQueryVariables>(
    QUERY_BLOCKS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    'blocks',
  )

  const {
    consensus: { blocks: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const blocks = useMemo(() => data && data.consensus_blocks, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_blocks_aggregate.aggregate
        ? data.consensus_blocks_aggregate.aggregate.count
        : 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const chain = useMemo(() => network, [network])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'height',
        header: 'Block number',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-height`}
            data-testid={`block-link-${row.index}`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(chain, section, row.original.height)}
          >
            <div>{row.original.height}</div>
          </Link>
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-time`}>
            {utcToLocalRelativeTime(row.original.timestamp)}
          </div>
        ),
      },
      {
        accessorKey: 'extrinsics',
        header: 'Extrinsics',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-time`}>{row.original.extrinsics?.length}</div>
        ),
      },
      {
        accessorKey: 'Events',
        header: 'Events',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-time`}>{row.original.events?.length}</div>
        ),
      },
      {
        accessorKey: 'hash',
        header: 'Block hash',
        enableSorting: false,
        cell: ({ row }: Cell<Row>) => (
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
        cell: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-author`}>
            <CopyButton value={row.original.author_id || 'Unkown'} message='Author account copied'>
              <BlockAuthor
                domain={section}
                chain={chain}
                author={row.original.author_id}
                isDesktop={false}
              />
            </CopyButton>
          </div>
        ),
      },
    ],
    [chain, section],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (isLoading(consensusEntry) || loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
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
              {!loading && blocks ? (
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
