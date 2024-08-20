import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DomainsDefaultState {
  domainsLastBlockNumbers: Map<string, number>
}

interface DomainsState extends DomainsDefaultState {
  setDomainsLastBlockNumber: (domainId: string, blockNumber: number) => void
  clear: () => void
}

const initialState: DomainsDefaultState = {
  domainsLastBlockNumbers: new Map(),
}

export const useDomainsStates = create<DomainsState>()(
  persist(
    (set) => ({
      ...initialState,
      setDomainsLastBlockNumber: (chain, blockNumber) =>
        set((state) => {
          const domainsLastBlockNumbers = new Map(state.domainsLastBlockNumbers)
          domainsLastBlockNumbers.set(chain, blockNumber)
          return { domainsLastBlockNumbers }
        }),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'domains-storage',
      version: 4,
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => JSON.stringify(state, bigIntSerializer),
      deserialize: (str) => JSON.parse(str, bigIntDeserializer),
    },
  ),
)
