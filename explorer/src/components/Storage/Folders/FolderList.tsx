'use client'

import { SortedTable } from 'components/common/SortedTable'
import { TableSettings } from 'components/common/TableSettings'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { FoldersDocument, FoldersQuery, FoldersQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { useTableSettings } from 'states/tables'
import { Cell, FoldersFilters } from 'types/table'
import { getTableColumns } from 'utils/table'
import { utcToLocalRelativeTime } from 'utils/time'

type Row = FoldersQuery['files_folders'][0]
const TABLE = 'folders'

export const FolderList: FC = () => {
  const { ref, inView } = useInView()
  const { network, section } = useIndexers()
  const {
    pagination,
    sorting,
    selectedColumns,
    filters,
    orderBy,
    whereForSearch,
    onPaginationChange,
    onSortingChange,
  } = useTableSettings<FoldersFilters>(TABLE)

  const where = useMemo(
    () => ({
      ...whereForSearch,
      // CID
      ...(filters.id && { id: { _ilike: `%${filters.id}%` } }),
      // Name
      ...(filters.name && { name: { _ilike: `%${filters.name}%` } }),
      // Block Height
      ...((filters.blockHeightMin || filters.blockHeightMax) && {
        // eslint-disable-next-line camelcase
        block_height: {
          ...(filters.blockHeightMin && { _gte: filters.blockHeightMin }),
          ...(filters.blockHeightMax && { _lte: filters.blockHeightMax }),
        },
      }),
    }),
    [filters, whereForSearch],
  )

  const variables = useMemo(
    () => ({
      limit: pagination.pageSize,
      offset: pagination.pageIndex > 0 ? pagination.pageIndex * pagination.pageSize : undefined,
      where,
      orderBy,
    }),
    [pagination.pageSize, pagination.pageIndex, where, orderBy],
  )

  const { loading, setIsVisible } = useIndexersQuery<FoldersQuery, FoldersQueryVariables>(
    FoldersDocument,
    {
      variables,
      pollInterval: 6000,
    },
    Routes.storage,
    TABLE,
  )

  const consensusEntry = useQueryStates((state) => state[Routes.storage].folders)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const folders = useMemo(() => data && data.files_folders, [data])
  const totalCount = useMemo(
    () =>
      data && data.files_folders_aggregate.aggregate
        ? data.files_folders_aggregate.aggregate.count
        : 0,
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
            href={INTERNAL_ROUTES.folders.id.page(network, section, row.original.id)}
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

  const isDataLoading = useMemo(() => {
    if (loading || isLoading(consensusEntry) || !folders) return true
    return false
  }, [consensusEntry, loading, folders])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='my-4' ref={ref}>
        <TableSettings table={TABLE} totalCount={totalCount} filters={filters} />
        <SortedTable
          data={folders ?? []}
          columns={columns}
          showNavigation={true}
          sorting={sorting}
          onSortingChange={onSortingChange}
          pagination={pagination}
          pageCount={pageCount}
          onPaginationChange={onPaginationChange}
          filename={TABLE}
          loading={isDataLoading}
          emptyMessage='No folders found'
        />
      </div>
    </div>
  )
}
