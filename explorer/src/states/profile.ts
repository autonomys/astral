import { create } from 'zustand'

type Profile = {
  id: string
  name: string
  description: string
  avatar: string
  banner: string
  website: string
  email: string
  discord: string
  github: string
  twitter: string
}
type Wallet = {
  id: string
  address: string
  type: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}
type ApiKey = {
  id: string
  key: string
  description: string
  totalRequests: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

interface ProfileState {
  shouldUpdate: boolean
  profile: Profile
  apiKeys: ApiKey[]
  wallets: Wallet[]
}

interface ProfileStateAndHelper extends ProfileState {
  setUser: (profile: Profile, wallets: Wallet[], apiKeys: ApiKey[]) => void
  setShouldUpdate: (shouldUpdate: boolean) => void
  clear: () => void
}

const initialState: ProfileState = {
  shouldUpdate: false,
  profile: {
    id: '',
    name: '',
    description: '',
    avatar: '',
    banner: '',
    website: '',
    email: '',
    discord: '',
    github: '',
    twitter: '',
  },
  wallets: [],
  apiKeys: [],
}

export const useProfileStates = create<ProfileStateAndHelper>((set) => ({
  ...initialState,
  setUser: (profile, wallets, apiKeys) => set(() => ({ profile, wallets, apiKeys })),
  setShouldUpdate: (shouldUpdate) => set(() => ({ shouldUpdate })),
  clear: () => set(() => ({ ...initialState })),
}))
