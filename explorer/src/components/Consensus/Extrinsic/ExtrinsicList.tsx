'use client'

import { TableSettings } from '@/components/common/TableSettings'
import { useTableStates } from '@/states/tables'
import { getTableColumns } from '@/utils/table'
import type { SortingState } from '@tanstack/react-table'
import { CopyButton } from 'components/common/CopyButton'
import { SearchBar } from 'components/common/SearchBar'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { PAGE_SIZE, searchTypes } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { ExtrinsicsQuery, ExtrinsicsQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { Cell, ExtrinsicsFilters, TableSettingsTabs } from 'types/table'
import { numberWithCommas } from 'utils/number'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_EXTRINSICS } from './query'

type Row = ExtrinsicsQuery['consensus_extrinsics'][0]
const TABLE = 'extrinsics'

export const ExtrinsicList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useChains()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'sort_id', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const {
    extrinsics: {
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
  const filters = useMemo(() => operatorFilters as ExtrinsicsFilters, [operatorFilters])

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
        const searchKey = `search-${column.name}` as keyof ExtrinsicsFilters
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
      where,
      orderBy,
    }),
    [pagination.pageSize, pagination.pageIndex, where, orderBy],
  )

  const { loading, setIsVisible } = useSquidQuery<ExtrinsicsQuery, ExtrinsicsQueryVariables>(
    QUERY_EXTRINSICS,
    {
      variables,
      pollInterval: 6000,
    },
    Routes.consensus,
    TABLE,
  )

  const {
    consensus: { extrinsics: consensusEntry },
  } = useQueryStates()

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const extrinsics = useMemo(() => data && data.consensus_extrinsics, [data])
  const totalCount = useMemo(
    () =>
      data && data.consensus_extrinsics_aggregate.aggregate
        ? data.consensus_extrinsics_aggregate.aggregate.count
        : 0,
    [data],
  )
  const pageCount = useMemo(
    () => Math.ceil(Number(totalCount) / pagination.pageSize),
    [totalCount, pagination],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        sortId: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
        timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.timestamp),
        hash: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-hash`}>
            <CopyButton value={row.original.hash} message='Hash copied'>
              {shortString(row.original.hash)}
            </CopyButton>
          </div>
        ),
        section: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.section),
        module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
        name: ({ row }: Cell<Row>) => row.original.name.toUpperCase(),
        blockHeight: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-block_height`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.blockHeight)}
          >
            <div>{row.original.blockHeight}</div>
          </Link>
        ),
        blockHash: ({ row }: Cell<Row>) => (
          <div key={`${row.index}-extrinsic-block_hash`}>
            <CopyButton value={row.original.blockHash} message='Block hash copied'>
              {shortString(row.original.blockHash)}
            </CopyButton>
          </div>
        ),
        indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock.toString(),
        success: ({ row }: Cell<Row>) => (
          <div
            className='md:flex md:items-center md:justify-start md:pl-5'
            key={`${row.index}-home-extrinsic-status`}
          >
            <StatusIcon status={row.original.success} />
          </div>
        ),
        nonce: ({ row }: Cell<Row>) => row.original.nonce,
        signer: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-signer`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.accounts.id.page(network, section, row.original.signer)}
          >
            <div>{row.original.signer}</div>
          </Link>
        ),
        signature: ({ row }: Cell<Row>) => row.original.signature,
        tip: ({ row }: Cell<Row>) => row.original.tip,
        fee: ({ row }: Cell<Row>) => row.original.fee,
      }),
    [network, section, selectedColumns],
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
        <SearchBar fixSearchType={searchTypes[2]} />
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
        {!loading && extrinsics ? (
          <SortedTable
            data={extrinsics}
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
