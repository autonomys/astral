import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Pagination } from 'common/constants'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { ReactNode, useMemo } from 'react'
import DesktopTable from './DesktopTable'
import TableNavigation from './TableNavigation'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  showNavigation?: boolean
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  onPaginationChange?: OnChangeFn<PaginationState>
  pageCount: number
  pagination: Pagination
  mobileComponent: ReactNode
  fullDataDownloader?: () => Promise<unknown[]>
}

const NewTable = <T extends object>({
  data,
  columns,
  showNavigation,
  sorting,
  pagination,
  pageCount,
  onSortingChange,
  onPaginationChange,
  mobileComponent,
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
    <div className='w-full flex flex-col'>
      {isDesktop ? <DesktopTable table={table} /> : mobileComponent}
      {showNavigation && (
        <TableNavigation table={table} data={data} fullDataDownloader={fullDataDownloader} />
      )}
    </div>
  )
}

export default NewTable
