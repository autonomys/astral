import { AVAILABLE_COLUMNS } from 'constants/tables'
import type { Cell } from 'types/table'

export const countTablePages = (totalCount: number, pageSize: number) =>
  Math.ceil(totalCount / pageSize)

const getTableColumn = <T>(
  table: keyof typeof AVAILABLE_COLUMNS,
  column: string,
  header?: string,
  enableSorting?: boolean,
  cell?: ({ row }: Cell<T>) => JSX.Element | string,
) => {
  const columnFound = AVAILABLE_COLUMNS[table].find((col) => col.name === column)
  return columnFound
    ? {
        accessorKey: columnFound.name,
        header: header ?? columnFound.label,
        enableSorting: enableSorting ?? true,
        cell,
      }
    : null
}

export const getTableColumns = <T>(
  table: keyof typeof AVAILABLE_COLUMNS,
  columns: string[],
  cells: { [key: string]: ({ row }: Cell<T>) => JSX.Element | string },
  headers?: { [key: string]: string },
  enableSorting?: { [key: string]: boolean },
) => {
  return columns
    .map((c) => getTableColumn(table, c, headers?.[c], enableSorting?.[c], cells[c]))
    .filter((column) => column !== null)
}
