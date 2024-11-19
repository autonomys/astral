'use client'

import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { SortingState } from '@tanstack/react-table'
import { AccountIconWithLink } from 'components/common/AccountIcon'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { NotFound } from 'components/layout/NotFound'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { BlocksQuery, BlocksQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableStates } from 'states/tables'
import { BlocksFilters, Cell, TableSettingsTabs } from 'types/table'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { QUERY_BLOCKS } from './query'

type Row = BlocksQuery['consensus_blocks'][number]
const TABLE = 'blocks'

export const BlockList: FC = () => {
  const { ref, inView } = useInView()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: true }])
  const { network, section } = useChains()

  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()
  const availableColumns = useTableStates((state) => state[TABLE].columns)
  const selectedColumns = useTableStates((state) => state[TABLE].selectedColumns)
  const filtersOptions = useTableStates((state) => state[TABLE].filtersOptions)
  const filters = useTableStates((state) => state[TABLE].filters) as BlocksFilters
  const showTableSettings = useTableStates((state) => state[TABLE].showTableSettings)
  const setColumns = useTableStates((state) => state.setColumns)
  const setFilters = useTableStates((state) => state.setFilters)
  const showSettings = useTableStates((state) => state.showSettings)
  const hideSettings = useTableStates((state) => state.hideSettings)
  const resetSettings = useTableStates((state) => state.resetSettings)
  const showReset = useTableStates((state) => state.showReset)

  const orderBy = useMemo(
    () =>
      sorting && sorting.length > 0
        ? sorting[0].id.endsWith('aggregate')
          ? { [sorting[0].id]: sorting[0].desc ? { count: OrderBy.Desc } : { count: OrderBy.Asc } }
          : { [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }
        : { id: OrderBy.Asc },
    [sorting],
  )

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

  const { loading, setIsVisible } = useSquidQuery<BlocksQuery, BlocksQueryVariables>(
    QUERY_BLOCKS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
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

  const handleFilterChange = useCallback(
    (filterName: string, value: string | boolean) => {
      setFilters(TABLE, {
        ...filters,
        [filterName]: value,
      })
    },
    [filters, setFilters],
  )

  const handleClickOnColumnToEditTable = useCallback(
    (column: string, checked: boolean) =>
      checked
        ? setColumns(TABLE, [...selectedColumns, column])
        : setColumns(
            TABLE,
            selectedColumns.filter((c) => c !== column),
          ),
    [selectedColumns, setColumns],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings
          tableName={capitalizeFirstLetter(TABLE)}
          totalCount={totalCount}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          filters={filters}
          showTableSettings={showTableSettings}
          showSettings={(setting: TableSettingsTabs) => showSettings(TABLE, setting)}
          hideSettings={() => hideSettings(TABLE)}
          handleColumnChange={handleClickOnColumnToEditTable}
          handleFilterChange={handleFilterChange}
          filterOptions={filtersOptions}
          handleReset={() => resetSettings(TABLE)}
          showReset={showReset(TABLE)}
        />
        {!loading && blocks ? (
          <SortedTable
            data={blocks}
            columns={columns}
            showNavigation={true}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={setPagination}
            filename={TABLE}
          />
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
