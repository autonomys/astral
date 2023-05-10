import { FC, ReactNode, useMemo } from 'react'
import { generateArrayOfNumbers } from '../helpers'

export type Column = {
  title: ReactNode
  cells: ReactNode[]
  isNumeric?: boolean
  centerTitle?: boolean
}

type Props = {
  id: string
  columns: Column[]
  emptyMessage: string
  footer?: ReactNode
  tableRowProps?: string
  tableHeaderProps?: string
  tableProps?: string
}

const Table: FC<Props> = ({
  id,
  columns,
  emptyMessage,
  footer,
  tableHeaderProps,
  tableRowProps,
  tableProps,
}) => {
  const cellsCount = useMemo(() => columns?.[0]?.cells?.length ?? 0, [columns])
  const rows = useMemo(
    () =>
      generateArrayOfNumbers(cellsCount)?.reduce<ReactNode[][]>((acc, _, index) => {
        const row = columns.map((column) => column.cells[index])

        return [...acc, row]
      }, []),
    [cellsCount, columns],
  )
  const hasRows = Boolean(rows.length)

  return (
    <div className='w-full'>
      <>
        <table className={`min-w-max w-full table-auto font-['Montserrat'] ${tableProps}`}>
          {hasRows ? (
            <thead>
              <tr className={`text-[#857EC2] text-sm dark:text-white/75 ${tableHeaderProps}`}>
                {columns?.map(({ title, isNumeric = false, centerTitle = false }, index) => (
                  <th key={`table-header-${id}-${index}`} className='font-normal'>
                    {isNumeric ? (
                      <div className='py-3 px-5 text-right font-normal'>{title}</div>
                    ) : centerTitle ? (
                      <div className='py-3 px-5 text-center font-normal'>{title}</div>
                    ) : (
                      <div className='py-3 px-5 text-left font-normal'>{title}</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody className='text-gray-600 text-sm font-light dark:text-white'>
            {rows?.map((row, index) => (
              <tr
                key={`table-row-${id}-${index}`}
                data-testid={`${id}-${index}`}
                className={`hover:bg-gray-100 dark:hover:bg-transparent/10 ${
                  index !== rows.length - 1 && 'border-y border-gray-200'
                } ${tableRowProps}`}
              >
                {row.map((content, index) =>
                  index === 1 ? (
                    <td
                      key={`table-cell-${id}-${index}`}
                      className='py-3 px-5 text-left whitespace-nowrap'
                    >
                      {content}
                    </td>
                  ) : (
                    <td key={`table-cell-${id}-${index}`} className='py-3 px-5 text-left'>
                      {content}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!hasRows ? (
          <div className='flex align-middle justify-center'>
            <p className='text-gray-600 text-md font-medium dark:text-white'>{emptyMessage}</p>
          </div>
        ) : null}
      </>
      {hasRows && footer != null ? <div className='flex justify-end mt-6'>{footer}</div> : null}
    </div>
  )
}

export default Table
