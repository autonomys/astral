import { generateArrayOfNumbers } from '@/utils/number'
import { FC, ReactNode, useMemo } from 'react'

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

export const Table: FC<Props> = ({
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
        <table className={`w-full min-w-max table-auto font-['Montserrat'] ${tableProps}`}>
          {hasRows ? (
            <thead>
              <tr className={`text-sm text-purpleShade2 dark:text-white/75 ${tableHeaderProps}`}>
                {columns?.map(({ title, isNumeric = false, centerTitle = false }, index) => (
                  <th key={`table-header-${id}-${index}`} className='font-normal'>
                    {isNumeric ? (
                      <div className='px-5 py-3 text-right font-normal'>{title}</div>
                    ) : centerTitle ? (
                      <div className='px-5 py-3 text-center font-normal'>{title}</div>
                    ) : (
                      <div className='px-5 py-3 text-left font-normal'>{title}</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody className='text-sm font-light text-gray-600 dark:text-white'>
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
                      className='whitespace-nowrap px-5 py-3 text-left'
                    >
                      {content}
                    </td>
                  ) : (
                    <td key={`table-cell-${id}-${index}`} className='px-5 py-3 text-left'>
                      {content}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!hasRows ? (
          <div className='flex justify-center align-middle'>
            <p className='text-md font-medium text-gray-600 dark:text-white'>{emptyMessage}</p>
          </div>
        ) : null}
      </>
      {hasRows && footer != null ? <div className='mt-6 flex justify-end'>{footer}</div> : null}
    </div>
  )
}
