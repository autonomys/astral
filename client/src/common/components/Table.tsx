import { FC, ReactNode, useMemo } from 'react'
import { generateArrayOfNumbers } from '../helpers'

export type Column = {
  title: string
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
              <tr className={`text-[#857EC2] text-sm font-light ${tableHeaderProps} dark:text-white/75`}>
                {columns?.map(({ title, isNumeric = false, centerTitle = false }, index) => (
                  <th key={`table-header-${id}-${index}`} className="font-normal">
                    {isNumeric ? (
                      <div className='py-3 px-5 text-right'>{title}</div>
                    ) : centerTitle ? (
                      <div className='py-3 px-5 text-center'>{title}</div>
                    ) : (
                      <div className='py-3 px-5 text-left'>{title}</div>
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
                className={`border-b border-gray-200 hover:bg-gray-100 ${tableRowProps} dark:hover:bg-transparent/10`}
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
