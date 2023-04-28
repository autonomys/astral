export const PAGE_SIZE = 10

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

export const MODULES = [
  {
    value: undefined,
    label: 'All',
  },
  {
    value: 'balances',
    label: 'Balances',
  },
  {
    value: 'domains',
    label: 'Domains',
  },
  {
    value: 'feeds',
    label: 'Feeds',
  },
  {
    value: 'grandpafinalityverifier',
    label: 'Grandpa Finality Verifier',
  },
  {
    value: 'objectStore',
    label: 'object Store',
  },
  {
    value: 'offencesSubspace',
    label: 'Offences Subspace',
  },
  {
    value: 'receipts',
    label: 'Receipts',
  },
  {
    value: 'rewards',
    label: 'Rewards',
  },
  {
    value: 'runtimeConfigs',
    label: 'Runtime Configs',
  },
  {
    value: 'subspace',
    label: 'Subspace',
  },
  {
    value: 'sudo',
    label: 'Sudo',
  },
  {
    value: 'system',
    label: 'System',
  },
  {
    value: 'timestamp',
    label: 'Timestamp',
  },
  {
    value: 'transactionFees',
    label: 'Transaction Fees',
  },
  {
    value: 'transactionPayment',
    label: 'Transaction Payment',
  },
  {
    value: 'utility',
    label: 'Utility',
  },
  {
    value: 'vesting',
    label: 'Vesting',
  },
]

export const LOG_TYPES = [
  {
    value: undefined,
    label: 'All',
  },
  {
    value: 'changesTrieRoot',
    label: 'Changes Trie Root',
  },
  {
    value: 'changesTrieSignal',
    label: 'Changes Trie Signal',
  },
  {
    value: 'consensus',
    label: 'Consensus',
  },
  {
    value: 'other',
    label: 'Other',
  },
  {
    value: 'preRuntime',
    label: 'Pre Runtime',
  },
  {
    value: 'seal',
    label: 'Seal',
  },
]
