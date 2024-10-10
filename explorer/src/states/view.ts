import { bigIntDeserializer, bigIntSerializer } from 'utils/number'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ViewStates {
  useRpcData: boolean
  myPositionOnly: boolean
  registeredOnly: boolean
  mySubspaceWallets: string[]
}

interface ViewStatesAndFn extends ViewStates {
  setUseRpcData: (useRpcData: boolean) => void
  setMyPositionOnly: (myPositionOnly: boolean) => void
  setRegisteredOnly: (registeredOnly: boolean) => void
  addSubspaceWallet: (address: string) => void
  removeSubspaceWallet: (address: string) => void
  clear: () => void
}

const initialState: ViewStates = {
  useRpcData: false,
  myPositionOnly: false,
  registeredOnly: false,
  mySubspaceWallets: [],
}

export const useViewStates = create<ViewStatesAndFn>()(
  persist(
    (set) => ({
      ...initialState,
      setUseRpcData: (useRpcData) => set(() => ({ useRpcData })),
      setMyPositionOnly: (myPositionOnly) => set(() => ({ myPositionOnly })),
      setRegisteredOnly: (registeredOnly) => set(() => ({ registeredOnly })),
      addSubspaceWallet: (address) =>
        set((state) => ({ mySubspaceWallets: [...state.mySubspaceWallets, address] })),
      removeSubspaceWallet: (address) =>
        set((state) => ({
          mySubspaceWallets: state.mySubspaceWallets.filter((wallet) => wallet !== address),
        })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'view-storage',
      version: 4,
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => JSON.stringify(state, bigIntSerializer),
      deserialize: (str) => JSON.parse(str, bigIntDeserializer),
    },
  ),
)
