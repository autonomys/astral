'use client'

import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { shortString } from '@autonomys/auto-utils'
import { AccountIconWithLink } from 'components/common/AccountIcon'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { NotFound } from 'components/layout/NotFound'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { BlocksQuery, BlocksQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { BlocksFilters, Cell } from 'types/table'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { QUERY_BLOCKS } from './query'

type Row = BlocksQuery['consensus_blocks'][number]
const TABLE = 'blocks'

export const BlockList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const inFocus = useWindowFocus()
  const {
    pagination,
    sorting,
    availableColumns,
    selectedColumns,
    filters,
    orderBy,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<BlocksFilters>(TABLE)

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    // Add search conditions
    availableColumns
      .filter((column) => column.searchable)
      .forEach((column) => {
        const searchKey = `search-${column.name}` as keyof BlocksFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // Height
    if (filters.heightMin || filters.heightMax) {
      conditions['height'] = {}
      if (filters.heightMin) {
        conditions.height._gte = Math.floor(parseFloat(filters.heightMin)).toString()
      }
      if (filters.heightMax) {
        conditions.height._lte = Math.floor(parseFloat(filters.heightMax)).toString()
      }
    }

    // Space Pledged
    if (filters.spacePledgedMin || filters.spacePledgedMax) {
      conditions['space_pledged'] = {}
      if (filters.spacePledgedMin) {
        conditions.space_pledged._gte = Math.floor(parseFloat(filters.spacePledgedMin)).toString()
      }
      if (filters.spacePledgedMax) {
        conditions.space_pledged._lte = Math.floor(parseFloat(filters.spacePledgedMax)).toString()
      }
    }

    // Blockchain Size
    if (filters.blockchainSizeMin || filters.blockchainSizeMax) {
      conditions['blockchain_size'] = {}
      if (filters.blockchainSizeMin) {
        conditions.blockchain_size._gte = Math.floor(
          parseFloat(filters.blockchainSizeMin),
        ).toString()
      }
      if (filters.blockchainSizeMax) {
        conditions.blockchain_size._lte = Math.floor(
          parseFloat(filters.blockchainSizeMax),
        ).toString()
      }
    }

    return conditions
  }, [availableColumns, filters])

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
    QUERY_BLOCKS,
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
        sortId: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-block-height`}
            data-testid={`block-link-${row.index}`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.height)}
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
            section={section}
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
        spacePledged: ({ row }: Cell<Row>) => formatSpaceToDecimal(row.original.spacePledged),
        blockchainSize: ({ row }: Cell<Row>) => formatSpaceToDecimal(row.original.blockchainSize),
      }),
    [network, section, selectedColumns],
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
      <div className='my-4' ref={ref}>
        <TableSettings table={TABLE} totalCount={totalCount} filters={filters} />
        {!loading && blocks ? (
          <SortedTable
            data={blocks}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={onSortingChange}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={onPaginationChange}
            filename={TABLE}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
