import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PreferencesDefaultState {
  enableDevMode: boolean
}

interface PreferencesState extends PreferencesDefaultState {
  switchDevMode: () => void
  clear: () => void
}

const initialState: PreferencesDefaultState = {
  enableDevMode: false,
}

export const usePreferencesStates = create<PreferencesState>()(
  persist(
    (set) => ({
      ...initialState,
      switchDevMode: () =>
        set((state) => ({
          enableDevMode: !state.enableDevMode,
        })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'preferences-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
