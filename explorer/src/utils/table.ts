import { ColumnDef, SortingState } from '@tanstack/react-table'
import { AVAILABLE_COLUMNS } from 'constants/tables'
import { Order_By as OrderBy } from 'gql/graphql'
import type { Cell } from 'types/table'
import { camelToSnake } from './string'

export const countTablePages = (totalCount: number, pageSize: number) =>
  Math.ceil(totalCount / pageSize)

const getTableColumn = <T>(
  table: keyof typeof AVAILABLE_COLUMNS,
  column: string,
  cell: ({ row }: Cell<T>) => JSX.Element | string,
  header?: string,
  enableSorting?: boolean,
): ColumnDef<T> => {
  if (!AVAILABLE_COLUMNS[table]) throw new Error(`Table ${table} not found`)
  const columnFound = AVAILABLE_COLUMNS[table].find((col) => col.name === column)
  if (!columnFound) throw new Error(`Column ${column} not found in table ${table}`)
  return {
    accessorKey: columnFound.accessorKey ?? camelToSnake(columnFound.name),
    header: header ?? columnFound.label,
    enableSorting: enableSorting ?? true,
    cell,
    meta: { tooltip: columnFound.tooltip },
  }
}

export const getTableColumns = <T>(
  table: keyof typeof AVAILABLE_COLUMNS,
  columns: string[],
  cells: { [key: string]: ({ row }: Cell<T>) => JSX.Element | string },
  headers?: { [key: string]: string },
  enableSorting?: { [key: string]: boolean },
): ColumnDef<T>[] => {
  return columns.map((c) => getTableColumn(table, c, cells[c], headers?.[c], enableSorting?.[c]))
}

export const sortBy = (sorting: SortingState) =>
  Object.fromEntries(sorting.map((sort) => [sort.id, sort.desc ? OrderBy.Desc : OrderBy.Asc]))

export const sortByAggregate = (sorting: SortingState) => ({
  [sorting[0].id]: { count: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc },
})
