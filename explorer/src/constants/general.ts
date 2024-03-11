export const PAGE_SIZE = 10

export const MAX_DOWNLOADER_BATCH_SIZE = 100

export type Pagination = {
  pageSize: number
  pageIndex: number
}

export type SearchType = {
  id: number
  name: string
  unavailable: boolean
}

export const searchTypes: SearchType[] = [
  { id: 1, name: 'All', unavailable: false },
  { id: 2, name: 'Block', unavailable: false },
  { id: 3, name: 'Extrinsic', unavailable: false },
  { id: 4, name: 'Account', unavailable: true },
  { id: 5, name: 'Event', unavailable: false },
]

export const SUBSPACE_ACC_PREFIX = 2254
