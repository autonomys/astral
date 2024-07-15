import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ViewStates {
  useRpcData: boolean
}

interface ViewStatesAndFn extends ViewStates {
  setUseRpcData: (useRpcData: boolean) => void
  clear: () => void
}

const initialState: ViewStates = {
  useRpcData: false,
}

export const useViewStates = create<ViewStatesAndFn>()(
  persist(
    (set) => ({
      ...initialState,
      setUseRpcData: (useRpcData) => set(() => ({ useRpcData })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'view-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
