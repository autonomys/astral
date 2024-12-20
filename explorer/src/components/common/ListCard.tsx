import { Table, flexRender } from '@tanstack/react-table'

type ListCardProps<T extends object> = {
  table: Table<T>
  emptyMessage?: string
}

export const ListCard = <T extends object>({ table, emptyMessage }: ListCardProps<T>) => (
  <div>
    <div className='w-full divide-y divide-gray-200 dark:divide-white/20'>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row, index) => (
          <div
            key={`row-${index}`}
            className='dark:bg-boxDark mb-4 w-full rounded-lg bg-white px-4 py-2'
          >
            {row.getVisibleCells().map((cell, index) => {
              const header = table.getHeaderGroups()[0].headers[index]
              return (
                <div className='flex items-center justify-between py-2' key={`cell-${index}`}>
                  <div className='text-blueShade text-xs dark:text-white/75'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
        <div className='dark:bg-boxDark w-full rounded-lg bg-white px-4 py-4'>
          <div className='flex w-full justify-center'>
            <div className='text-blueShade text-sm dark:text-white/75'>
              {emptyMessage || 'No entries to show'}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)
