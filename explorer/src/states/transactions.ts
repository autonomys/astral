import { Transaction } from 'types/transaction'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface TransactionsDefaultState {
  pendingTransactions: Transaction[]
  finalizedTransactions: Transaction[]
}

interface TransactionsState extends TransactionsDefaultState {
  addPendingTransactions: (transaction: Transaction) => void
  moveToFinalizedTransactions: (transaction: Transaction) => void
  clear: () => void
}

const initialState: TransactionsDefaultState = {
  pendingTransactions: [],
  finalizedTransactions: [],
}

export const useTransactionsStates = create<TransactionsState>()(
  persist(
    (set) => ({
      ...initialState,
      addPendingTransactions: (transaction: Transaction) =>
        set((state) => ({
          pendingTransactions: [...state.pendingTransactions, transaction],
        })),
      moveToFinalizedTransactions: (transaction: Transaction) =>
        set((state) => ({
          pendingTransactions: state.pendingTransactions.filter(
            (t) => t.txHash !== transaction.txHash && t.blockHash !== transaction.blockHash,
          ),
          finalizedTransactions: [...state.finalizedTransactions, transaction],
        })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'transactions-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
