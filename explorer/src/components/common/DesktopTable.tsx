import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Table, flexRender } from '@tanstack/react-table'

interface TableProps<T extends object> {
  table: Table<T>
}

export const DesktopTable = <T extends object>({ table }: TableProps<T>) => (
  <table className="min-w-max table-auto rounded-[20px] bg-white font-['Montserrat'] dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]">
    <thead className='border-b border-gray-200 text-sm text-[#857EC2] dark:text-white/75'>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              {...(header.column.getCanSort()
                ? { onClick: header.column.getToggleSortingHandler() }
                : {})}
              className='px-3 py-4 text-start text-sm font-normal'
            >
              <div className='flex justify-items-center gap-1 align-middle'>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() === 'asc' ? (
                  <span className='relative mr-[14px] inline-flex cursor-pointer items-center rounded-full text-sm font-medium  text-[#DE67E4] focus:z-20 dark:border-none  dark:text-white'>
                    <span className='sr-only'>Up</span>
                    <ChevronUpIcon className='size-5' aria-hidden='true' />
                  </span>
                ) : header.column.getIsSorted() === 'desc' ? (
                  <span className='relative mr-[14px] inline-flex cursor-pointer items-center rounded-full text-sm font-medium text-[#DE67E4] focus:z-20 dark:border-none  dark:text-white'>
                    <span className='sr-only'>Up</span>
                    <ChevronDownIcon className='size-5' aria-hidden='true' />
                  </span>
                ) : (
                  <span className='relative mr-[14px] inline-flex cursor-pointer items-center rounded-full text-sm font-medium  text-[#DE67E4] focus:z-20 dark:border-none  dark:text-white'>
                    <span className='sr-only'>Up</span>
                    <ChevronUpDownIcon className='size-5' aria-hidden='true' />
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody className='text-sm font-light text-gray-600 dark:text-white'>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={`hover:bg-gray-100 dark:hover:bg-transparent/10 ${
              index !== table.getRowModel().rows.length - 1 && 'border-y border-gray-200'
            } `}
          >
            {row.getVisibleCells().map((cell) => (
              <td className='whitespace-nowrap px-6 py-4 text-sm font-light' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <div className='flex w-full p-6 hover:bg-gray-100 dark:hover:bg-transparent/10'>
          <div className='text-sm text-[#857EC2] dark:text-white/75'>No entries to show</div>
        </div>
      )}
    </tbody>
  </table>
)
