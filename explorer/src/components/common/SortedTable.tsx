import { Pagination } from '@/constants/general'
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import useMediaQuery from 'hooks/useMediaQuery'
import { useMemo } from 'react'
import { DesktopTable } from './DesktopTable'
import { ListCard } from './ListCard'
import { TableNavigation } from './TableNavigation'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  showNavigation?: boolean
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  onPaginationChange?: OnChangeFn<PaginationState>
  pageCount: number
  pagination?: Pagination
  filename?: string
  pageSizeOptions?: number[]
  hideDownloadButton?: boolean
  hidePageSizeOptions?: boolean
  fullDataDownloader?: () => Promise<unknown[]>
}

export const SortedTable = <T extends object>({
  data,
  columns,
  showNavigation,
  sorting,
  onSortingChange,
  onPaginationChange,
  pageCount,
  pagination,
  filename,
  pageSizeOptions,
  hideDownloadButton,
  hidePageSizeOptions,
  fullDataDownloader,
}: ReactTableProps<T>) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const memoizedData = useMemo(() => data, [data])
  const memoizedColumns = useMemo(() => columns, [columns])
  const memoizedPagination = useMemo(() => pagination, [pagination])
  const memoizedSorting = useMemo(() => sorting, [sorting])

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    onPaginationChange,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: memoizedPagination,
      sorting: memoizedSorting,
    },
    pageCount,
  })

  return (
    <div className='flex w-full flex-col'>
      {isDesktop ? <DesktopTable table={table} /> : <ListCard table={table} />}
      {showNavigation && (
        <TableNavigation
          table={table}
          data={data}
          filename={filename}
          pageSizeOptions={pageSizeOptions}
          hideDownloadButton={hideDownloadButton}
          hidePageSizeOptions={hidePageSizeOptions}
          fullDataDownloader={fullDataDownloader}
        />
      )}
    </div>
  )
}
