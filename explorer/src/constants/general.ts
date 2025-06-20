export const PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]

export const STAKE_WARS_PAGE_SIZE = 150

export const MAX_DOWNLOADER_BATCH_SIZE = 50

export const STAKE_WARS_PHASES = {
  phase2: {
    start: 334753,
    end: 536562,
  },
  phase3: {
    start: 536562,
    end: 1040169,
  },
  endgame: {
    start: 1040169,
    end: 1040169,
  },
}

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
  { id: 2, name: 'Account', unavailable: true },
  { id: 3, name: 'Block', unavailable: false },
  { id: 4, name: 'Extrinsic', unavailable: false },
  { id: 5, name: 'Event', unavailable: false },
]

export const SUBSPACE_ACC_PREFIX = 6094
export const SUBSPACE_ACC_PREFIX_TESTNET = 2254

export const BIGINT_ZERO = BigInt(0)

export const SHARES_CALCULATION_MULTIPLIER = BigInt(1000000000000000000)
