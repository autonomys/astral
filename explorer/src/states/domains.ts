import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DomainsDefaultState {
  domainsLastBlockNumbers: Map<string, number>
}

interface DomainsState extends DomainsDefaultState {
  setDomainsLastBlockNumber: (domainsLastBlockNumbers: Map<string, number>) => void
  clear: () => void
}

const initialState: DomainsDefaultState = {
  domainsLastBlockNumbers: new Map(),
}

export const useDomainsStates = create<DomainsState>()(
  persist(
    (set) => ({
      ...initialState,
      setDomainsLastBlockNumber: (domainsLastBlockNumbers) =>
        set(() => ({ domainsLastBlockNumbers })),
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
