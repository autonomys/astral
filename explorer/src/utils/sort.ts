import type { SortingState } from '@tanstack/react-table'

export const sort = (sorting: SortingState, init: string): string =>
  sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',') || init
