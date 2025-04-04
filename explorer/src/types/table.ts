import { PaginationState, SortingState } from '@tanstack/react-table'

type Row<T> = {
  index: number
  original: T
}
export type Cell<T> = { row: Row<T> }

export type ColumnMeta = {
  tooltip?: string
}

export type AvailableColumn = {
  name: string
  label: string
  isSelected: boolean
  searchable?: true
  accessorKey?: string
  tooltip?: string
}

export type AvailableColumns = {
  [key: string]: AvailableColumn[]
}

export type Filters = object

export type FilterOption = {
  type: 'range' | 'checkbox' | 'number' | 'text' | 'dropdown'
  label: string
  key: string
  options?: string[] | { label: string; value: string }[]
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

export type AccountsFilters = {
  nonceMin: string
  nonceMax: string
  freeMin: string
  freeMax: string
  reservedMin: string
  reservedMax: string
  totalMin: string
  totalMax: string
}

export type BlocksFilters = {
  heightMin: string
  heightMax: string
  spacePledgedMin: string
  spacePledgedMax: string
  blockchainSizeMin: string
  blockchainSizeMax: string
}

export type ExtrinsicsFilters = {
  blockHeightMin: string
  blockHeightMax: string
  section: string
  module: string
}

export type EventsFilters = {
  blockHeightMin: string
  blockHeightMax: string
  section: string
  module: string
}

export type LogsFilters = {
  blockHeightMin: string
  blockHeightMax: string
  kind: string
}

export type FilesFilters = {
  id: string
  name: string
  blockHeightMin: string
  blockHeightMax: string
}

export type FoldersFilters = {
  id: string
  name: string
  blockHeightMin: string
  blockHeightMax: string
}

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

export type TransferHistoryFilters = {
  fromChain: string
  toChain: string
  valueMin: string
  valueMax: string
  success: string
  feeMin: string
  feeMax: string
  blockHeight: string
  from: string
  to: string
}
