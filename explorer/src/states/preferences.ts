import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type ProofOfOwnership = {
  address: string
  message: string
  signature: string
}
interface BasicPreferencesDefaultState {
  darkMode: boolean
  cookieBanner: boolean
}

interface WalletPreferencesDefaultState {
  extension: string | null
  account: string | null
  proofOfOwnership: ProofOfOwnership | null
  enableDevMode: boolean
}
interface PreferencesDefaultState
  extends BasicPreferencesDefaultState,
    WalletPreferencesDefaultState {}

interface PreferencesState extends PreferencesDefaultState {
  setDarkMode: (darkMode: boolean) => void
  hideCookieBanner: () => void
  setExtension: (extension: string | null) => void
  setAccount: (account: string | null) => void
  setProofOfOwnership: (proofOfOwnership: ProofOfOwnership | null) => void
  switchDevMode: () => void
  clearBasicPreferences: () => void
  clearWalletPreferences: () => void
  clearAllPreferences: () => void
}

const basicInitialState: BasicPreferencesDefaultState = {
  darkMode: false,
  cookieBanner: true,
}

const walletInitialState: WalletPreferencesDefaultState = {
  extension: null,
  account: null,
  proofOfOwnership: null,
  enableDevMode: false,
}

const initialState: PreferencesDefaultState = {
  ...basicInitialState,
  ...walletInitialState,
}

export const usePreferencesStates = create<PreferencesState>()(
  persist(
    (set) => ({
      ...initialState,
      setDarkMode: (darkMode: boolean) => set({ darkMode }),
      hideCookieBanner: () => set({ cookieBanner: false }),
      setExtension: (extension: string | null) => set({ extension }),
      setAccount: (account: string | null) => set({ account }),
      setProofOfOwnership: (proofOfOwnership: ProofOfOwnership | null) => set({ proofOfOwnership }),
      switchDevMode: () =>
        set((state) => ({
          enableDevMode: !state.enableDevMode,
        })),
      clearBasicPreferences: () => set((state) => ({ ...state, ...basicInitialState })),
      clearWalletPreferences: () => set((state) => ({ ...state, ...walletInitialState })),
      clearAllPreferences: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'preferences-storage',
      version: 2,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
