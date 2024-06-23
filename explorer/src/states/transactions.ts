import { Transaction } from 'types/transaction'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TransactionsDefaultState {
  transactions: Transaction[]
}

interface TransactionsState extends TransactionsDefaultState {
  setTransactions: (transactions: Transaction[]) => void
  clear: () => void
}

const initialState: TransactionsDefaultState = {
  transactions: [],
}

export const useTransactionsStates = create<TransactionsState>()(
  persist(
    (set) => ({
      ...initialState,
      setTransactions: (transactions: Transaction[]) => set(() => ({ transactions })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'transactions-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
