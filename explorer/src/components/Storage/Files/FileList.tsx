'use client'

import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import type { SortingState } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { PAGE_SIZE } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FilesQuery, FilesQueryVariables, Order_By as OrderBy } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableStates } from 'states/tables'
import { Cell, ExtrinsicsFilters, TableSettingsTabs } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_FILES } from './query'

type Row = FilesQuery['files_files'][0]
const TABLE = 'files'

export const FileList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'cid_timestamp', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })
  const availableColumns = useTableStates((state) => state[TABLE].columns)
  const selectedColumns = useTableStates((state) => state[TABLE].selectedColumns)
  const filtersOptions = useTableStates((state) => state[TABLE].filtersOptions)
  const filters = useTableStates((state) => state[TABLE].filters) as ExtrinsicsFilters
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
          : sorting[0].id.startsWith('cid_')
            ? {
                cid: {
                  [sorting[0].id.replace('cid_', '').toString()]: sorting[0].desc
                    ? OrderBy.Desc
                    : OrderBy.Asc,
                },
              }
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
    // if (filters.blockHeightMin || filters.blockHeightMax) {
    //   conditions['block_height'] = {}
    //   if (filters.blockHeightMin) conditions.block_height._gte = filters.blockHeightMin
    //   if (filters.blockHeightMax) conditions.block_height._lte = filters.blockHeightMax
    // }

    // // Section
    // if (filters.section) {
    //   conditions['section'] = { _ilike: `%${filters.section}%` }
    // }

    // // Module
    // if (filters.module) {
    //   conditions['module'] = { _ilike: `%${filters.module}%` }
    // }

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

  const { loading, setIsVisible } = useIndexersQuery<FilesQuery, FilesQueryVariables>(
    QUERY_FILES,
    {
      variables,
      pollInterval: 6000,
    },
    Routes.storage,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state[Routes.storage].files)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const files = useMemo(() => data && data.files_files, [data])
  const totalCount = useMemo(
    () =>
      data && data.files_files_aggregate.aggregate ? data.files_files_aggregate.aggregate.count : 0,
    [data],
  )
  const pageCount = useMemo(
    () => Math.ceil(Number(totalCount) / pagination.pageSize),
    [totalCount, pagination],
  )

  const columns = useMemo(
    () =>
      getTableColumns<Row>(TABLE, selectedColumns, {
        id: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-extrinsic-id`}
            className='w-full whitespace-nowrap hover:text-primaryAccent'
            href={INTERNAL_ROUTES.files.id.page(network, section, row.original.id)}
          >
            <div>{row.original.id}</div>
          </Link>
        ),
        name: ({ row }: Cell<Row>) => `${row.original.name ?? ''}`,
        // hash: ({ row }: Cell<Row>) => (
        //   <CopyButton value={row.original.hash} message='Hash copied'>
        //     {shortString(row.original.hash)}
        //   </CopyButton>
        // ),
        // section: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.section),
        // module: ({ row }: Cell<Row>) => capitalizeFirstLetter(row.original.module),
        // name: ({ row }: Cell<Row>) => row.original.name.toUpperCase(),
        blockHeight: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-file-block_height`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(network, section, row.original.cid?.blockHeight)}
          >
            <div>{row.original.cid?.blockHeight}</div>
          </Link>
        ),
        extrinsicId: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-file-extrinsic_id`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(
              network,
              section,
              row.original.cid?.extrinsicId ?? '',
            )}
          >
            <div>{row.original.cid?.extrinsicId}</div>
          </Link>
        ),
        timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.cid?.timestamp),
        // indexInBlock: ({ row }: Cell<Row>) => row.original.indexInBlock.toString(),
        // success: ({ row }: Cell<Row>) => <StatusIcon status={row.original.success} />,
        // nonce: ({ row }: Cell<Row>) => row.original.nonce,
        // signer: ({ row }: Cell<Row>) => (
        //   <AccountIconWithLink
        //     address={row.original.signer}
        //     network={network}
        //     section={Routes.consensus}
        //     forceShortString={true}
        //   />
        // ),
        // signature: ({ row }: Cell<Row>) => (
        //   <CopyButton value={row.original.signature} message='Signature copied'>
        //     {shortString(row.original.signature)}
        //   </CopyButton>
        // ),
        // tip: ({ row }: Cell<Row>) => row.original.tip,
        // fee: ({ row }: Cell<Row>) => row.original.fee,
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
        {!loading && files ? (
          <SortedTable
            data={files}
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
