import { Table } from '@tanstack/react-table'

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import DebouncedInput from './DebouncedInput'
import ExportButton from './ExportButton'
import LazyExportButton from './LazyExportButton'

interface TableProps<T extends object> {
  data?: T[]
  fullDataDownloader?: () => Promise<unknown[]>
  table: Table<T>
}

const TableNavigation = <T extends object>({ table, data, fullDataDownloader }: TableProps<T>) => (
  <>
    <div className='h-2 mt-5' />
    <div className='w-full flex items-center justify-between'>
      <div className='w-full flex flex-col gap-6 sm:hidden'>
        <div className='w-full flex flex-1 justify-between sm:hidden'>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='relative inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-white dark:bg-[#1E254E] dark:border-none'
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='rounded-full relative ml-3 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-white dark:bg-[#1E254E] dark:border-none'
          >
            Next
          </button>
        </div>
        <div className='w-full flex justify-between sm:hidden'>
          <div className='w-full'>
            {data && <ExportButton data={data} filename='account-list' />}
          </div>
          <div className='w-full'>
            {fullDataDownloader && (
              <LazyExportButton query={fullDataDownloader} filename='account-list' />
            )}
          </div>
        </div>
      </div>
      <div className='hidden sm:flex sm:flex-col lg:flex-row sm:gap-4 sm:w-full sm:items-center sm:justify-between '>
        <div className='hidden sm:flex  sm:flex-1   justify-between gap-2'>
          {data && <ExportButton data={data} filename='account-list' />}
          <div className='flex w-full'>
            {fullDataDownloader && (
              <LazyExportButton query={fullDataDownloader} filename='account-list' />
            )}
          </div>
        </div>
        <div className='sm:flex sm:flex-1 sm:items-center sm:justify-end items-center gap-2'>
          <button
            className='cursor-pointer relative inline-flex items-center rounded-full bg-white px-2 py-2 text-sm font-medium text-[#DE67E4] hover:bg-gray-50 focus:z-20 mr-[14px] dark:text-white dark:bg-[#1E254E] dark:border-none'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span>
              <span className='sr-only'>First</span>
              <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
            </span>
          </button>
          <button
            className='cursor-pointer relative inline-flex items-center rounded-full bg-white px-2 py-2 text-sm font-medium text-[#DE67E4] hover:bg-gray-50 focus:z-20 mr-[14px] dark:text-white dark:bg-[#1E254E] dark:border-none'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </span>
          </button>
          <button
            className='cursor-pointer relative inline-flex items-center rounded-full bg-white px-2 py-2 text-sm font-medium text-[#DE67E4] hover:bg-gray-50 focus:z-20 mr-[14px] dark:text-white dark:bg-[#1E254E] dark:border-none'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </span>
          </button>
          <button
            className='cursor-pointer relative inline-flex items-center rounded-full bg-white px-2 py-2 text-sm font-medium text-[#DE67E4] hover:bg-gray-50 focus:z-20 mr-[14px] dark:text-white dark:bg-[#1E254E] dark:border-none'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span>
              <span className='sr-only'>Last</span>
              <ChevronDoubleRightIcon className='h-5 w-5' aria-hidden='true' />
            </span>
          </button>
          <span className='flex cursor-pointer items-center gap-1'>
            <div className='dark:text-white'>Page</div>
            <strong className='dark:text-white'>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span className='flex items-center gap-1'>
            <div className='dark:text-white'>| Go to page:</div>
            <DebouncedInput
              type='number'
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(value) => {
                const page = value ? Number(value) - 1 : 0
                table.setPageIndex(page)
              }}
              debounceTime={400}
              className='w-20 rounded-3xl border-none'
            />
          </span>
          <select
            className='rounded-3xl border-none'
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <div className='h-4' />
        </div>
      </div>
    </div>
  </>
)

export default TableNavigation
