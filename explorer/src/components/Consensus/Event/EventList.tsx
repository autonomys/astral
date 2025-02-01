'use client'

import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { EventsQuery, EventsQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableStates } from 'states/tables'
import { Cell, EventsFilters, TableSettingsTabs } from 'types/table'
import { countTablePages, getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_EVENTS } from './query'

type Row = EventsQuery['consensus_events'][0]
const TABLE = 'events'

export const EventList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const inFocus = useWindowFocus()
  const availableColumns = useTableStates((state) => state[TABLE].columns)
  const selectedColumns = useTableStates((state) => state[TABLE].selectedColumns)
  const filtersOptions = useTableStates((state) => state[TABLE].filtersOptions)
  const filters = useTableStates((state) => state[TABLE].filters) as EventsFilters
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

  const { loading, setIsVisible } = useIndexersQuery<EventsQuery, EventsQueryVariables>(
    QUERY_EVENTS,
    {
      variables,
      skip: !inFocus,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state.consensus.events)

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

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        sortId: ({ row }: Cell<Row>) => (
          <div className='flex w-full gap-1 whitespace-nowrap'>
            <Link
              className='w-full hover:text-primaryAccent'
              href={INTERNAL_ROUTES.events.id.page(network, section, row.original.id)}
            >
              {row.original.id}
            </Link>
            <CopyButton value={row.original.id} message='Id copied' />
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
          <CopyButton value={row.original.blockHash} message='Block hash copied'>
            {shortString(row.original.blockHash)}
          </CopyButton>
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
          <CopyButton value={row.original.extrinsicHash} message='Extrinsic hash copied'>
            {shortString(row.original.extrinsicHash)}
          </CopyButton>
        ),
        section: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.section),
        module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
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
