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
  searchable?: true
}

export type AvailableColumns = {
  [key: string]: AvailableColumn[]
}

export type Filters = object

export type FilterOption = {
  type: 'range' | 'checkbox' | 'number'
  label: string
  key: string
  options?: string[]
}

export type FiltersOptions = {
  [key: string]: FilterOption[]
}

export type TableSettingsTabs = 'search' | 'columns' | 'filters'

export interface Table {
  name: string
  columns: AvailableColumn[]
  selectedColumns: string[]
  filtersOptions: FilterOption[]
  filters: Filters
  sorting: SortingState
  pagination: PaginationState
  showTableSettings: TableSettingsTabs | null
}

export type InitialTables = { [key: string]: Table }

export type DomainsFilters = {
  totalStakeMin: string
  totalStakeMax: string
  totalDepositsMin: string
  totalDepositsMax: string
  totalRewardsCollectedMin: string
  totalRewardsCollectedMax: string
  depositsCountMin: string
  depositsCountMax: string
  completedEpochMin: string
  completedEpochMax: string
  bundleCountMin: string
  bundleCountMax: string
}

export type OperatorsFilters = {
  totalStakeMin: string
  totalStakeMax: string
  nominationTaxMin: string
  nominationTaxMax: string
  minimumNominatorStakeMin: string
  minimumNominatorStakeMax: string
  totalRewardsCollectedMin: string
  totalRewardsCollectedMax: string
  nominatorsCountMin: string
  nominatorsCountMax: string
  depositsCountMin: string
  depositsCountMax: string
  statusRegistered: string
  statusDeregistered: string
  statusSlashed: string
  statusReadyToUnlock: string
  activeEpochCountMin: string
  activeEpochCountMax: string
  bundleCountMin: string
  bundleCountMax: string
}

export type LeaderboardFilters = {
  rankMin: string
  rankMax: string
  valueMin: string
  valueMax: string
}
