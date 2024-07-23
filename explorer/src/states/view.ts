import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ViewStates {
  useRpcData: boolean
  myPositionOnly: boolean
}

interface ViewStatesAndFn extends ViewStates {
  setUseRpcData: (useRpcData: boolean) => void
  setMyPositionOnly: (myPositionOnly: boolean) => void
  clear: () => void
}

const initialState: ViewStates = {
  useRpcData: false,
  myPositionOnly: false,
}

export const useViewStates = create<ViewStatesAndFn>()(
  persist(
    (set) => ({
      ...initialState,
      setUseRpcData: (useRpcData) => set(() => ({ useRpcData })),
      setMyPositionOnly: (myPositionOnly) => set(() => ({ myPositionOnly })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'view-storage',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => JSON.stringify(state, bigIntSerializer),
      deserialize: (str) => JSON.parse(str, bigIntDeserializer),
    },
  ),
)
