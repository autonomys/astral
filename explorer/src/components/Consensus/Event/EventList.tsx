'use client'

import { TableSettings } from '@/components/common/TableSettings'
import { useTableStates } from '@/states/tables'
import { capitalizeFirstLetter, shortString } from '@/utils/string'
import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { EventsQuery, EventsQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { Cell, EventsFilters, TableSettingsTabs } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_EVENTS } from './query'

type Row = EventsQuery['consensus_events'][0]
const TABLE = 'events'

export const EventList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()

  const {
    events: {
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
  const filters = useMemo(() => operatorFilters as EventsFilters, [operatorFilters])

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
        const searchKey = `search-${column.name}` as keyof EventsFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // Block Height
    if (filters.blockHeightMin || filters.blockHeightMax) {
      conditions['block_height'] = {}
      if (filters.blockHeightMin) conditions.block_height._gte = filters.blockHeightMin
      if (filters.blockHeightMax) conditions.block_height._lte = filters.blockHeightMax
    }

    // Section
    if (filters.section) {
      conditions['section'] = { _ilike: `%${filters.section}%` }
    }

    // Module
    if (filters.module) {
      conditions['module'] = { _ilike: `%${filters.module}%` }
    }

    return conditions
  }, [filters, availableColumns])

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      orderBy,
      where,
    }),
    [pagination.pageSize, pagination.pageIndex, orderBy, where],
  )

  const { loading, setIsVisible } = useSquidQuery<EventsQuery, EventsQueryVariables>(
    QUERY_EVENTS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const {
    consensus: { events: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const events = useMemo(() => data && data.consensus_events, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_events_aggregate.aggregate
        ? data.consensus_events_aggregate.aggregate.count
        : 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        sortId: ({ row }: Cell<Row>) => (
          <div className='flex w-full gap-1' key={`${row.index}-event-id`}>
            <Link
              className='w-full hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
              data-testid={`event-link-${row.index}`}
            >
              {row.original.id}
            </Link>
            <CopyButton
              data-testid={`testCopyButton-${row.index}`}
              value={row.original.id}
              message='Id copied'
            />
          </div>
        ),
        blockHeight: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-event-block`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.blockHeight)}
          >
            {row.original.blockHeight}
          </Link>
        ),
        blockHash: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-event-block_hash`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.blockHash}
              message='Block hash copied'
            >
              {shortString(row.original.blockHash)}
            </CopyButton>
          </div>
        ),
        extrinsicId: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-event-extrinsic`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.extrinsicId)}
          >
            {row.original.extrinsicId}
          </Link>
        ),
        extrinsicHash: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-event-extrinsic_hash`}>
            <CopyButton
              data-testid={`testCopy-${row.index}`}
              value={row.original.extrinsicHash}
              message='Extrinsic hash copied'
            >
              {shortString(row.original.extrinsicHash)}
            </CopyButton>
          </div>
        ),
        section: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.section),
        module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
        name: ({ row }: Cell<Row>) => row.original.name.toUpperCase(),
        indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock,
        timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.timestamp),
      }),
    [network, section, selectedColumns],
  )

  const pageCount = useMemo(
    () => countTablePages(totalCount, pagination.pageSize),
    [totalCount, pagination],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
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
        <SearchBar fixSearchType={searchTypes[4]} />
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
        {!loading && events ? (
          <SortedTable
            data={events}
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
