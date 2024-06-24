import { Table, flexRender } from '@tanstack/react-table'

type ListCardProps<T extends object> = {
  table: Table<T>
}

export const ListCard = <T extends object>({ table }: ListCardProps<T>) => (
  <div>
    <div className='w-full divide-y divide-gray-200 dark:divide-white/20'>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row, index) => (
          <div
            key={`row-${index}`}
            className="dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset mb-6 w-full rounded-lg bg-white px-4 py-7 font-['Montserrat'] dark:bg-gradient-to-r"
          >
            {row.getVisibleCells().map((cell, index) => {
              const header = table.getHeaderGroups()[0].headers[index]
              return (
                <div className='flex items-center justify-between py-2' key={`cell-${index}`}>
                  <div className='text-purpleShade2 text-xs  dark:text-white/75'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  <div className='text-grayDarker text-xs dark:text-white'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              )
            })}
          </div>
        ))
      ) : (
        <div className="dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset mb-6 w-full rounded-lg bg-white px-4 py-7 font-['Montserrat'] dark:bg-gradient-to-r">
          <div className='flex w-full p-6 hover:bg-gray-100 dark:hover:bg-transparent/10'>
            <div className='text-purpleShade2 text-sm dark:text-white/75'>No entries to show</div>
          </div>
        </div>
      )}
    </div>
  </div>
)
