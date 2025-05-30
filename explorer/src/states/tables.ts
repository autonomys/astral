import { PaginationState, SortingState } from '@tanstack/react-table'
import { INITIAL_TABLES } from 'constants/tables'
import { snakeCase } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Filters, Table, TableSettingsTabs } from 'types/table'
import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { sortBy, sortByAggregate } from 'utils/table'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type PersistentTableState = Omit<Table, 'pagination' | 'filters'>
type VolatileTableState = Pick<Table, 'pagination' | 'filters'>
export type TableName = keyof PersistentTableStates & keyof VolatileTableStates

interface PersistentTableStates {
  accounts: PersistentTableState
  blocks: PersistentTableState
  extrinsics: PersistentTableState
  events: PersistentTableState
  logs: PersistentTableState
  files: PersistentTableState
  folders: PersistentTableState
  domains: PersistentTableState
  operators: PersistentTableState
  leaderboard: PersistentTableState
  transfers: PersistentTableState
}
interface VolatileTableStates {
  accounts: VolatileTableState
  blocks: VolatileTableState
  extrinsics: VolatileTableState
  events: VolatileTableState
  logs: VolatileTableState
  files: VolatileTableState
  folders: VolatileTableState
  domains: VolatileTableState
  operators: VolatileTableState
  leaderboard: VolatileTableState
  transfers: VolatileTableState
}

interface PersistentTableStatesAndFn extends PersistentTableStates {
  setColumns: (table: keyof PersistentTableStates, selectedColumns: string[]) => void
  setSorting: (table: keyof PersistentTableStates, sorting: SortingState) => void
  showSettings: (table: keyof PersistentTableStates, tab: TableSettingsTabs) => void
  hideSettings: (table: keyof PersistentTableStates) => void
  showReset: (table: keyof PersistentTableStates) => boolean
  resetSettings: (table: keyof PersistentTableStates) => void
  clear: () => void
}

interface VolatileTableStatesAndFn extends VolatileTableStates {
  setPagination: (table: keyof PersistentTableStates, pagination: PaginationState) => void
  setFilters: (table: keyof VolatileTableStates, filters: Filters) => void
  showReset: (table: keyof VolatileTableStates) => boolean
  resetSettings: (table: keyof VolatileTableStates) => void
  clear: () => void
}

const initialPersistentState: PersistentTableStates = {
  accounts: INITIAL_TABLES.accounts,
  blocks: INITIAL_TABLES.blocks,
  extrinsics: INITIAL_TABLES.extrinsics,
  events: INITIAL_TABLES.events,
  logs: INITIAL_TABLES.logs,
  files: INITIAL_TABLES.files,
  folders: INITIAL_TABLES.folders,
  domains: INITIAL_TABLES.domains,
  operators: INITIAL_TABLES.operators,
  leaderboard: INITIAL_TABLES.leaderboard,
  transfers: INITIAL_TABLES.transfers,
}

const initialVolatileState: VolatileTableStates = {
  accounts: {
    pagination: INITIAL_TABLES.accounts.pagination,
    filters: INITIAL_TABLES.accounts.filters,
  },
  blocks: {
    pagination: INITIAL_TABLES.blocks.pagination,
    filters: INITIAL_TABLES.blocks.filters,
  },
  extrinsics: {
    pagination: INITIAL_TABLES.extrinsics.pagination,
    filters: INITIAL_TABLES.extrinsics.filters,
  },
  events: {
    pagination: INITIAL_TABLES.events.pagination,
    filters: INITIAL_TABLES.events.filters,
  },
  logs: {
    pagination: INITIAL_TABLES.logs.pagination,
    filters: INITIAL_TABLES.logs.filters,
  },
  files: {
    pagination: INITIAL_TABLES.files.pagination,
    filters: INITIAL_TABLES.files.filters,
  },
  folders: {
    pagination: INITIAL_TABLES.folders.pagination,
    filters: INITIAL_TABLES.folders.filters,
  },
  domains: {
    pagination: INITIAL_TABLES.domains.pagination,
    filters: INITIAL_TABLES.domains.filters,
  },
  operators: {
    pagination: INITIAL_TABLES.operators.pagination,
    filters: INITIAL_TABLES.operators.filters,
  },
  leaderboard: {
    pagination: INITIAL_TABLES.leaderboard.pagination,
    filters: INITIAL_TABLES.leaderboard.filters,
  },
  transfers: {
    pagination: INITIAL_TABLES.transfers.pagination,
    filters: INITIAL_TABLES.transfers.filters,
  },
}

const isPersistentStateEqual = (
  currentState: PersistentTableStates[keyof PersistentTableStates],
  initialState: PersistentTableStates[keyof PersistentTableStates],
) => {
  try {
    return JSON.stringify(currentState) === JSON.stringify(initialState)
  } catch (error) {
    console.error('Error comparing states:', error)
    return false
  }
}
const isVolatileStateEqual = (
  currentState: VolatileTableStates[keyof VolatileTableStates],
  initialState: VolatileTableStates[keyof VolatileTableStates],
) => {
  try {
    return JSON.stringify(currentState) === JSON.stringify(initialState)
  } catch (error) {
    console.error('Error comparing states:', error)
    return false
  }
}

const tableStateUtils = {
  showReset: (
    table: keyof PersistentTableStates,
    persistentState: PersistentTableStates,
    volatileState: VolatileTableStates,
  ) => {
    try {
      const isPersistentDefault = isPersistentStateEqual(
        persistentState[table],
        INITIAL_TABLES[table],
      )
      const isVolatileDefault = isVolatileStateEqual(
        volatileState[table],
        initialVolatileState[table],
      )

      return !isPersistentDefault || !isVolatileDefault
    } catch (error) {
      console.error('Error showing reset:', error)
      return false
    }
  },
  resetSettings: (
    table: keyof PersistentTableStates,
    setPersistentState: (
      fn: (state: PersistentTableStates) => Partial<PersistentTableStates>,
    ) => void,
    setVolatileState: (fn: (state: VolatileTableStates) => Partial<VolatileTableStates>) => void,
  ) => {
    setPersistentState(() => ({
      [table]: INITIAL_TABLES[table],
    }))
    setVolatileState(() => ({
      [table]: initialVolatileState[table],
    }))
  },
  clear: (
    setPersistentState: (fn: (state: PersistentTableStates) => PersistentTableStates) => void,
    setVolatileState: (fn: (state: VolatileTableStates) => VolatileTableStates) => void,
  ) => {
    setPersistentState(() => ({ ...initialPersistentState }))
    setVolatileState(() => ({ ...initialVolatileState }))
  },
}

export const usePersistentTableStates = create<PersistentTableStatesAndFn>()(
  persist(
    (set, get) => ({
      ...initialPersistentState,
      setColumns: (table, selectedColumns) =>
        set((state) => ({
          [table]: {
            ...state[table],
            selectedColumns,
          },
        })),
      setSorting: (table, sorting) =>
        set((state) => ({
          [table]: {
            ...state[table],
            sorting,
          },
        })),
      showSettings: (table, tab) =>
        set((state) => ({
          [table]: {
            ...state[table],
            showTableSettings: tab,
          },
        })),
      hideSettings: (table) =>
        set((state) => ({
          [table]: {
            ...state[table],
            showTableSettings: null,
          },
        })),
      showReset: (table) =>
        tableStateUtils.showReset(table, get(), useVolatileTableStates.getState()),
      resetSettings: (table) =>
        tableStateUtils.resetSettings(table, set, useVolatileTableStates.setState),
      clear: () => tableStateUtils.clear(set, useVolatileTableStates.setState),
    }),
    {
      name: 'table-storage',
      version: 13,
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => JSON.stringify(state, bigIntSerializer),
      deserialize: (str) => JSON.parse(str, bigIntDeserializer),
    },
  ),
)

export const useVolatileTableStates = create<VolatileTableStatesAndFn>((set, get) => ({
  ...initialVolatileState,
  setPagination: (table, pagination) =>
    set((state) => ({
      [table]: {
        ...state[table],
        pagination,
      },
    })),
  setFilters: (table, filters) =>
    set((state) => ({
      [table]: {
        ...state[table],
        filters,
      },
    })),
  showReset: (table) => {
    try {
      return JSON.stringify(get()[table]) !== JSON.stringify(INITIAL_TABLES[table])
    } catch (error) {
      console.error('Error showing reset', error)
      return false
    }
  },
  resetSettings: (table) =>
    set(() => ({
      [table]: INITIAL_TABLES[table],
    })),
  clear: () => set(() => ({ ...initialVolatileState })),
}))

export const useTableSettings = <TFilter>(table: TableName) => {
  const pagination = useVolatileTableStates((state) => state[table].pagination)
  const sorting = usePersistentTableStates((state) => state[table].sorting)
  const availableColumns = usePersistentTableStates((state) => state[table].columns)
  const selectedColumns = usePersistentTableStates((state) => state[table].selectedColumns)
  const filtersOptions = usePersistentTableStates((state) => state[table].filtersOptions)
  const filters = useVolatileTableStates((state) => state[table].filters) as TFilter
  const showTableSettings = usePersistentTableStates((state) => state[table].showTableSettings)
  const setPagination = useVolatileTableStates((state) => state.setPagination)
  const setSorting = usePersistentTableStates((state) => state.setSorting)
  const setColumns = usePersistentTableStates((state) => state.setColumns)
  const setFilters = useVolatileTableStates((state) => state.setFilters)
  const _showSettings = usePersistentTableStates((state) => state.showSettings)
  const _hideSettings = usePersistentTableStates((state) => state.hideSettings)
  const resetSettings = usePersistentTableStates((state) => state.resetSettings)
  const _showReset = usePersistentTableStates((state) => state.showReset)

  const orderBy = useMemo(() => {
    if (!sorting || sorting.length === 0) return sortBy(INITIAL_TABLES[table].sorting)
    return sorting[0].id.endsWith('aggregate') ? sortByAggregate(sorting) : sortBy(sorting)
  }, [sorting, table])

  const whereForSearch = useMemo(
    () =>
      availableColumns
        .filter((column) => column.searchable)
        .reduce((conditions, column) => {
          const searchValue = filters[`search-${column.name}` as keyof TFilter]
          return searchValue
            ? { ...conditions, [snakeCase(column.name)]: { _ilike: `%${searchValue}%` } }
            : conditions
        }, {}),
    [availableColumns, filters],
  )

  const stringForSearch = useMemo(
    () =>
      availableColumns
        .filter((column) => column.searchable)
        .reduce((conditions, column) => {
          const searchValue = filters[`search-${column.name}` as keyof TFilter]
          return searchValue
            ? { ...conditions, [snakeCase(column.name)]: { _eq: searchValue } }
            : conditions
        }, {}),
    [availableColumns, filters],
  )

  const showReset = useMemo(() => _showReset(table), [_showReset, table])

  const onSortingChange = useCallback(
    (newSorting: SortingState | ((prev: SortingState) => SortingState)) =>
      setSorting(table, typeof newSorting === 'function' ? newSorting(sorting) : newSorting),
    [sorting, setSorting, table],
  )

  const onPaginationChange = useCallback(
    (newPagination: PaginationState | ((prev: PaginationState) => PaginationState)) =>
      setPagination(
        table,
        typeof newPagination === 'function' ? newPagination(pagination) : newPagination,
      ),
    [setPagination, table, pagination],
  )

  const handleFilterChange = useCallback(
    (filterName: string, value: string | boolean) =>
      setFilters(table, {
        ...filters,
        [filterName]: value,
      }),
    [filters, setFilters, table],
  )

  const handleColumnChange = useCallback(
    (column: string, checked: boolean) =>
      checked
        ? setColumns(table, [...selectedColumns, column])
        : setColumns(
            table,
            selectedColumns.filter((c) => c !== column),
          ),
    [selectedColumns, setColumns, table],
  )
  const showSettings = useCallback(
    (setting: TableSettingsTabs) => _showSettings(table, setting),
    [_showSettings, table],
  )
  const hideSettings = useCallback(() => _hideSettings(table), [_hideSettings, table])
  const handleReset = useCallback(() => resetSettings(table), [resetSettings, table])

  return {
    pagination,
    sorting,
    availableColumns,
    selectedColumns,
    filtersOptions,
    filters,
    orderBy,
    whereForSearch,
    stringForSearch,
    showTableSettings,
    showReset,
    onPaginationChange,
    onSortingChange,
    setColumns,
    setFilters,
    handleFilterChange,
    handleColumnChange,
    showSettings,
    hideSettings,
    resetSettings,
    handleReset,
  }
}
