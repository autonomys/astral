'use client'

import { isHex, shortString } from '@autonomys/auto-utils'
import { AccountIconWithLink } from 'components/common/AccountIcon'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { BlocksDocument, BlocksQuery, BlocksQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { BlocksFilters, Cell } from 'types/table'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'

type Row = BlocksQuery['consensus_blocks'][number]
const TABLE = 'blocks'

export const BlockList: FC = () => {
  const { ref, inView } = useInView()
  const { network } = useIndexers()
  const { push } = useRouter()
  const inFocus = useWindowFocus()
  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    orderBy,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<BlocksFilters>(TABLE)

  // Handle custom search for unique identifiers
  const handleSearchSubmit = useCallback(
    (columnName: string, value: string): boolean => {
      if (value.trim()) {
        // Block height search - navigate directly
        if (columnName === 'height') {
          const blockNumber = Number(value.trim())
          if (!isNaN(blockNumber) && blockNumber >= 0) {
            push(INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, blockNumber))
            return true // Handled
          }
        }

        // Hash search - navigate directly
        if (columnName === 'hash' && isHex(value.trim())) {
          push(INTERNAL_ROUTES.blocks.hash.page(network, Routes.consensus, value.trim()))
          return true // Handled
        }

        // Parent hash search - navigate directly
        if (columnName === 'parentHash' && isHex(value.trim())) {
          push(INTERNAL_ROUTES.blocks.hash.page(network, Routes.consensus, value.trim()))
          return true // Handled
        }
      }

      return false // Not handled, use default behavior
    },
    [network, push],
  )

  const where = useMemo(
    () => ({
      ...whereForSearch,
      // Height
      ...((filters.heightMin || filters.heightMax) && {
        height: {
          ...(filters.heightMin && { _gte: Math.floor(parseFloat(filters.heightMin)).toString() }),
          ...(filters.heightMax && { _lte: Math.floor(parseFloat(filters.heightMax)).toString() }),
        },
      }),
    }),
    [filters, whereForSearch],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { loading, setIsVisible } = useIndexersQuery<BlocksQuery, BlocksQueryVariables>(
    BlocksDocument,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state.consensus.blocks)

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

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        height: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-height`}
            data-testid={`block-link-${row.index}`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, row.original.height)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
        timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.timestamp),
        extrinsicsCount: ({ row }: Cell<Row>) => row.original.extrinsicsCount.toString(),
        eventsCount: ({ row }: Cell<Row>) => row.original.eventsCount.toString(),
        hash: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.hash} message='Hash copied'>
            {shortString(row.original.hash)}
          </CopyButton>
        ),
        parentHash: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.parentHash} message='Parent hash copied'>
            {shortString(row.original.parentHash)}
          </CopyButton>
        ),
        authorId: ({ row }: Cell<Row>) => (
          <AccountIconWithLink
            address={row.original.authorId}
            network={network}
            section={Routes.consensus}
          />
        ),
        specId: ({ row }: Cell<Row>) => row.original.specId,
        stateRoot: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.stateRoot} message='State Root copied'>
            {shortString(row.original.stateRoot)}
          </CopyButton>
        ),
        extrinsicsRoot: ({ row }: Cell<Row>) => (
          <CopyButton value={row.original.extrinsicsRoot} message='Extrinsics Root copied'>
            {shortString(row.original.extrinsicsRoot)}
          </CopyButton>
        ),
      }),
    [network, selectedColumns],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const isDataLoading = useMemo(() => {
    if (isLoading(consensusEntry) || loading) return true
    return false
  }, [consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          table={TABLE}
          totalCount={totalCount}
          filters={filters as BlocksFilters & Record<string, string | undefined>}
          onSearchSubmit={handleSearchSubmit}
        />
        <SortedTable
          data={blocks ?? []}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={onSortingChange}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={onPaginationChange}
          filename={TABLE}
          loading={isDataLoading}
          emptyMessage='No blocks found'
          skeletonLoaderClassName='py-[21px]'
        />
      </div>
    </div>
  )
}
