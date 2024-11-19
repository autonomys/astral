'use client'

import { TableSettings } from '@/components/common/TableSettings'
import { useTableStates } from '@/states/tables'
import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { SortingState } from '@tanstack/react-table'
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
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { BlocksFilters, Cell, TableSettingsTabs } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { BlockAuthor } from './BlockAuthor'
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

  const {
    blocks: {
      columns: availableColumns,
      selectedColumns,
      filtersOptions,
      filters: operatorFilters,
      showTableSettings,
    },
    setColumns,
    setFilters,
    showSettings,
    hideSettings,
    resetSettings,
    showReset,
  } = useTableStates()
  const filters = useMemo(() => operatorFilters as BlocksFilters, [operatorFilters])

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
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

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
        parentHash: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-parent-hash`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.parentHash}
              message='Parent hash copied'
            >
              {shortString(row.original.parentHash)}
            </CopyButton>
          </div>
        ),
        authorId: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-author`}>
            <CopyButton value={row.original.authorId || 'Unknown'} message='Author account copied'>
              <BlockAuthor
                domain={section}
                chain={network}
                author={row.original.authorId}
                isDesktop={false}
              />
            </CopyButton>
          </div>
        ),
        specId: ({ row }: Cell<Row>) => shortString(row.original.specId),
        stateRoot: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-state-root`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.stateRoot}
              message='State Root copied'
            >
              {shortString(row.original.stateRoot)}
            </CopyButton>
          </div>
        ),
        extrinsicsRoot: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-block-extrinsics-root`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.extrinsicsRoot}
              message='Extrinsics Root copied'
            >
              {shortString(row.original.extrinsicsRoot)}
            </CopyButton>
          </div>
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
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[1]} />
      </div>

      <div className='my-4' ref={ref}>
        <TableSettings
          tableName={capitalizeFirstLetter(TABLE)}
          totalLabel={totalLabel}
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
