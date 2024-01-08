import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
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
  pagination: {
    pageSize: number
    pageIndex: number
  }
  mobileComponent: ReactNode
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
}: ReactTableProps<T>) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const memoizedData = useMemo(() => data, [data])
  const memoizedColumns = useMemo(() => columns, [columns])

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
      pagination,
      sorting,
    },
    pageCount,
  })

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-4 sm:px-6 lg:px-8'>
          <div className='overflow-hidden p-2'>
            {isDesktop ? <DesktopTable table={table} /> : mobileComponent}
            {showNavigation && <TableNavigation table={table} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewTable
