import { PaginationState, SortingState } from '@tanstack/react-table'
import { INITIAL_TABLES } from 'constants/tables'
import { Filters, Table, TableSettingsTabs } from 'types/table'
import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TableStates {
  domains: Table
  operators: Table
}

interface TableStatesAndFn extends TableStates {
  setColumns: (table: keyof TableStates, selectedColumns: string[]) => void
  setSorting: (table: keyof TableStates, sorting: SortingState) => void
  setPagination: (table: keyof TableStates, pagination: PaginationState) => void
  setFilters: (table: keyof TableStates, filters: Filters) => void
  showSettings: (table: keyof TableStates, tab: TableSettingsTabs) => void
  hideSettings: (table: keyof TableStates) => void
  clear: () => void
}

const initialState: TableStates = {
  domains: INITIAL_TABLES.domains,
  operators: INITIAL_TABLES.operators,
}

export const useTableStates = create<TableStatesAndFn>()(
  persist(
    (set) => ({
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
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'table-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => JSON.stringify(state, bigIntSerializer),
      deserialize: (str) => JSON.parse(str, bigIntDeserializer),
    },
  ),
)
