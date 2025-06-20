import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'
import { Table, flexRender } from '@tanstack/react-table'
import type { SortingOptions } from '@tanstack/table-core/'
import { ColumnMeta } from 'types/table'
import { SkeletonRow } from './TableSkeleton'
import { Tooltip } from './Tooltip'

interface TableProps<T extends object> {
  table: Table<T>
  emptyMessage?: string
  loading?: boolean
  skeletonLoaderClassName?: string
}

export const DesktopTable = <T extends object>({
  table,
  emptyMessage,
  loading,
  skeletonLoaderClassName,
}: TableProps<T>) => (
  <div className='overflow-x-auto'>
    <table className='w-full min-w-max table-auto rounded-lg bg-white dark:border-none dark:bg-boxDark'>
      <thead className='border-b border-gray-200 text-sm text-blueShade dark:text-white/75'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                {...(header.column.getCanSort()
                  ? { onClick: header.column.getToggleSortingHandler() }
                  : {})}
                className={`${
                  index === 0 || headerGroup.headers.length - 1
                    ? index === 0
                      ? 'rounded-tl-[20px]'
                      : 'rounded-tr-[20px]'
                    : 'rounded-lg'
                } px-3 py-4 text-start text-sm font-normal ${index === 0 ? 'sticky left-0 bg-white dark:bg-boxDark' : ''} ${index === headerGroup.headers.length - 1 ? 'sticky right-0 bg-white dark:bg-boxDark' : ''}`}
              >
                <div className='flex justify-items-center gap-1 align-middle'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}

                  {(() => {
                    const columnMeta = header.column.columnDef.meta as ColumnMeta
                    const tooltipText: string = columnMeta?.tooltip || ''
                    return tooltipText ? (
                      <Tooltip text={tooltipText} direction='top'>
                        <InformationCircleIcon className='ml-1 size-5' aria-hidden='true' />
                      </Tooltip>
                    ) : null
                  })()}

                  {(header.column.columnDef as SortingOptions<T>).enableSorting && (
                    <>
                      {header.column.getIsSorted() === 'asc' ? (
                        <span className='relative mr-[14px] inline-flex cursor-pointer items-center rounded-lg text-sm font-medium text-primaryAccent focus:z-20 dark:border-none dark:text-white'>
                          <span className='sr-only'>Up</span>
                          <ChevronUpIcon className='size-5' aria-hidden='true' />
                        </span>
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <span className='relative mr-[14px] inline-flex cursor-pointer items-center rounded-lg text-sm font-medium text-primaryAccent focus:z-20 dark:border-none dark:text-white'>
                          <span className='sr-only'>Up</span>
                          <ChevronDownIcon className='size-5' aria-hidden='true' />
                        </span>
                      ) : (
                        <span className='relative mr-[14px] inline-flex cursor-pointer items-center rounded-lg text-sm font-medium text-primaryAccent focus:z-20 dark:border-none dark:text-white'>
                          <span className='sr-only'>Up</span>
                          <ChevronUpDownIcon className='size-5' aria-hidden='true' />
                        </span>
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='text-sm font-light text-gray-600 dark:text-white'>
        {loading ? (
          // Show skeleton rows when loading
          Array.from({ length: table.getRowCount() || 10 }).map((_, index) => (
            <SkeletonRow
              key={index}
              columnsCount={table.getAllColumns().length}
              isLastRow={index === table.getRowCount() - 1}
              className={skeletonLoaderClassName}
            />
          ))
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-100 dark:hover:bg-transparent/10 ${
                rowIndex !== table.getRowModel().rows.length - 1 && 'border-y border-gray-200'
              } `}
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <td
                  className={`whitespace-nowrap px-6 py-4 text-sm font-light ${
                    cellIndex === 0 ? 'sticky left-0 bg-white dark:bg-boxDark' : ''
                  } ${
                    cellIndex === row.getVisibleCells().length - 1
                      ? 'sticky right-0 bg-white dark:bg-boxDark'
                      : ''
                  } ${
                    rowIndex === table.getRowModel().rows.length - 1 && cellIndex === 0
                      ? 'rounded-bl-[20px]'
                      : ''
                  } ${
                    rowIndex === table.getRowModel().rows.length - 1 &&
                    cellIndex === row.getVisibleCells().length - 1
                      ? 'rounded-br-[20px]'
                      : ''
                  }`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={table.getAllColumns().length} className='p-6 text-center'>
              <div className='text-sm text-blueShade dark:text-white/75'>
                {emptyMessage || 'No entries to show'}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)
