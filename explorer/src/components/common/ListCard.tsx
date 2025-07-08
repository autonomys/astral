import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { Table, flexRender } from '@tanstack/react-table'
import { ColumnMeta } from 'types/table'
import { SkeletonCard } from './TableSkeleton'
import { Tooltip } from './Tooltip'

type ListCardProps<T extends object> = {
  table: Table<T>
  emptyMessage?: string
  loading?: boolean
  skeletonLoaderClassName?: string
}

export const ListCard = <T extends object>({
  table,
  emptyMessage,
  loading,
  skeletonLoaderClassName,
}: ListCardProps<T>) => (
  <div>
    <div className='w-full divide-y divide-gray-200 dark:divide-white/20'>
      {loading ? (
        // Show skeleton cards when loading
        Array.from({ length: table.getRowCount() || 10 }).map((_, index) => (
          <SkeletonCard
            key={`skeleton-card-${index}`}
            fieldsCount={table.getAllColumns().length}
            className={skeletonLoaderClassName}
          />
        ))
      ) : table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row, index) => (
          <div
            key={`row-${index}`}
            className='mb-4 w-full rounded-lg bg-white px-4 py-2 dark:bg-boxDark'
          >
            {row.getVisibleCells().map((cell, index) => {
              const header = table.getHeaderGroups()[0].headers[index]
              return (
                <div className='flex items-center justify-between py-2' key={`cell-${index}`}>
                  <div className='text-xs text-blueShade dark:text-white/75'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}

                    {(() => {
                      const columnMeta = header.column.columnDef.meta as ColumnMeta
                      const tooltipText: string = columnMeta?.tooltip || ''
                      return tooltipText ? (
                        <Tooltip text={tooltipText} direction='top'>
                          <InformationCircleIcon className='ml-1 mt-1 size-4' aria-hidden='true' />
                        </Tooltip>
                      ) : null
                    })()}
                  </div>
                  <div className='text-xs text-grayDarker dark:text-white'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              )
            })}
          </div>
        ))
      ) : (
        <div className='w-full rounded-lg bg-white px-4 py-4 dark:bg-boxDark'>
          <div className='flex w-full justify-center'>
            <div className='text-sm text-blueShade dark:text-white/75'>
              {emptyMessage || 'No entries to show'}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)
