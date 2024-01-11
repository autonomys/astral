import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Table, flexRender } from '@tanstack/react-table'

interface TableProps<T extends object> {
  table: Table<T>
}

const DesktopTable = <T extends object>({ table }: TableProps<T>) => (
  <table className="min-w-max w-full table-auto font-['Montserrat'] bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none">
    <thead className='text-[#857EC2] text-sm dark:text-white/75 border-b border-gray-200'>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              {...(header.column.getCanSort()
                ? { onClick: header.column.getToggleSortingHandler() }
                : {})}
              className='px-6 py-4 text-sm font-normal text-start'
            >
              <div className='flex gap-2 justify-items-center align-middle'>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() === 'asc' ? (
                  <span className='cursor-pointer relative inline-flex items-center rounded-full text-sm font-medium text-[#DE67E4]  focus:z-20 mr-[14px] dark:text-white  dark:border-none'>
                    <span className='sr-only'>Up</span>
                    <ChevronUpIcon className='h-5 w-5' aria-hidden='true' />
                  </span>
                ) : header.column.getIsSorted() === 'desc' ? (
                  <span className='cursor-pointer relative inline-flex items-center rounded-full text-sm font-medium text-[#DE67E4] focus:z-20 mr-[14px] dark:text-white  dark:border-none'>
                    <span className='sr-only'>Up</span>
                    <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                  </span>
                ) : (
                  <span className='cursor-pointer relative inline-flex items-center rounded-full text-sm font-medium text-[#DE67E4]  focus:z-20 mr-[14px] dark:text-white  dark:border-none'>
                    <span className='sr-only'>Up</span>
                    <ChevronUpDownIcon className='h-5 w-5' aria-hidden='true' />
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody className='text-gray-600 text-sm font-light dark:text-white'>
      {table.getRowModel().rows.map((row, index) => (
        <tr
          key={row.id}
          className={`hover:bg-gray-100 dark:hover:bg-transparent/10 ${
            index !== table.getRowModel().rows.length - 1 && 'border-y border-gray-200'
          } `}
        >
          {row.getVisibleCells().map((cell) => (
            <td className='whitespace-nowrap px-6 py-4 text-sm font-light ' key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default DesktopTable
