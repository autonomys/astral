import { PaginationState, SortingState } from '@tanstack/react-table'

export type Row<T> = {
  index: number
  original: T
}
export type Cell<T> = { row: Row<T> }

export type AvailableColumn = {
  name: string
  label: string
  isSelected: boolean
}

export type AvailableColumns = {
  [key: string]: AvailableColumn[]
}

export type Filters = Record<string, string>

export type TableSettingsTabs = 'columns' | 'filters'

export interface Table {
  name: string
  columns: AvailableColumn[]
  selectedColumns: string[]
  filters: Filters
  sorting: SortingState
  pagination: PaginationState
  showTableSettings: TableSettingsTabs | null
}

export type InitialTables = { [key: string]: Table }
