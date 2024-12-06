import { PaginationState, SortingState } from '@tanstack/react-table'
import { INITIAL_TABLES } from 'constants/tables'
import { Filters, Table, TableSettingsTabs } from 'types/table'
import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TableStates {
  accounts: Table
  blocks: Table
  extrinsics: Table
  events: Table
  logs: Table
  files: Table
  folders: Table
  domains: Table
  operators: Table
  leaderboard: Table
}

interface TableStatesAndFn extends TableStates {
  setColumns: (table: keyof TableStates, selectedColumns: string[]) => void
  setSorting: (table: keyof TableStates, sorting: SortingState) => void
  setPagination: (table: keyof TableStates, pagination: PaginationState) => void
  setFilters: (table: keyof TableStates, filters: Filters) => void
  showSettings: (table: keyof TableStates, tab: TableSettingsTabs) => void
  hideSettings: (table: keyof TableStates) => void
  showReset: (table: keyof TableStates) => boolean
  resetSettings: (table: keyof TableStates) => void
  clear: () => void
}

const initialState: TableStates = {
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
}

export const useTableStates = create<TableStatesAndFn>()(
  persist(
    (set, get) => ({
      ...initialState,
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
      showReset: (table) => {
        try {
          const currentTable = get()[table]
          const initialTable = INITIAL_TABLES[table]

          return (
            JSON.stringify(currentTable.filters) !== JSON.stringify(initialTable.filters) ||
            JSON.stringify(currentTable.selectedColumns) !==
              JSON.stringify(initialTable.selectedColumns)
          )
        } catch (error) {
          console.error('Error showing reset', error)
          return false
        }
      },
      resetSettings: (table) =>
        set(() => ({
          [table]: INITIAL_TABLES[table],
        })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'table-storage',
      version: 5,
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => JSON.stringify(state, bigIntSerializer),
      deserialize: (str) => JSON.parse(str, bigIntDeserializer),
    },
  ),
)
