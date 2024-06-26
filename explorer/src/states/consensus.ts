import type { Domain } from 'types/domain'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ConsensusDefaultState {
  tokenDecimals: number
  tokenSymbol: string
}

interface ConsensusState extends ConsensusDefaultState {
  setTokenDecimals: (tokenDecimals: number) => void
  setTokenSymbol: (tokenSymbol: string) => void
  clear: () => void
}

const initialState: ConsensusDefaultState = {
  tokenDecimals: 0,
  tokenSymbol: '',
}

export const useConsensusStates = create<ConsensusState>()(
  persist(
    (set) => ({
      ...initialState,
      setTokenDecimals: (tokenDecimals) => set(() => ({ tokenDecimals })),
      setTokenSymbol: (tokenSymbol) => set(() => ({ tokenSymbol })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'consensus-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
