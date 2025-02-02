'use client'

import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FilesQuery, FilesQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { Cell, FilesFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'
import { NotFound } from '../../layout/NotFound'
import { QUERY_FILES } from './query'

type Row = FilesQuery['files_files'][0]
const TABLE = 'files'

export const FileList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const {
    pagination,
    sorting,
    availableColumns,
    selectedColumns,
    filters,
    orderBy,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<FilesFilters>(TABLE)

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    // Add search conditions
    availableColumns
      .filter((column) => column.searchable)
      .forEach((column) => {
        const searchKey = `search-${column.name}` as keyof FilesFilters
        const searchValue = filters[searchKey]
        if (searchValue) {
          conditions[column.name] = { _ilike: `%${searchValue}%` }
        }
      })

    // CID
    if (filters.id) {
      conditions['id'] = { _ilike: `%${filters.id}%` }
    }

    // Name
    if (filters.name) {
      conditions['name'] = { _ilike: `%${filters.name}%` }
    }

    // Block Height
    if (filters.blockHeightMin || filters.blockHeightMax) {
      conditions['block_height'] = {}
      if (filters.blockHeightMin) conditions.block_height._gte = filters.blockHeightMin
      if (filters.blockHeightMax) conditions.block_height._lte = filters.blockHeightMax
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
        blockHeight: ({ row }: Cell<Row>) => (
          <Link
            key={`${row.index}-file-block_height`}
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.blocks.id.page(
              network,
              Routes.consensus,
              row.original.cid?.blockHeight,
            )}
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
              Routes.consensus,
              row.original.cid?.extrinsicId ?? '',
            )}
          >
            <div>{row.original.cid?.extrinsicId}</div>
          </Link>
        ),
        timestamp: ({ row }: Cell<Row>) => utcToLocalRelativeTime(row.original.cid?.timestamp),
      }),
    [network, section, selectedColumns],
  )

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
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
        {!loading && files ? (
          <SortedTable
            data={files}
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
