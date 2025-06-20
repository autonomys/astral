import { create } from 'zustand'

export type Profile = {
  id: string
  name: string
  bio: string
  avatar: string
  banner: string
  website: string
  email: string
  discord: string
  github: string
  twitter: string
  emailIsPublic: boolean
  discordIsPublic: boolean
  githubIsPublic: boolean
  twitterIsPublic: boolean
  nameIsPublic: boolean
  bioIsPublic: boolean
  websiteIsPublic: boolean
  wallets?: Array<{
    id: string
    address: string
    type: string
    isPublic: boolean
  }>
  tags?: Array<{
    id: string
    name: string
    type: string
    value: string
    isPublic: boolean
  }>
}
export type Wallet = {
  id: string
  address: string
  type: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string
}
export type ApiKey = {
  id: string
  key: string
  description: string
  totalRequests: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  shortKey?: string
}
export type Tag = {
  id: string
  name: string
  type: string
  isPublic: boolean
  value: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
export interface ProfileState {
  shouldUpdate: boolean
  profile: Profile
  apiKeys: ApiKey[]
  wallets: Wallet[]
  tags: Tag[]
}

interface ProfileStateAndHelper extends ProfileState {
  shouldUpdate: boolean
  profile: Profile
  wallets: Wallet[]
  apiKeys: ApiKey[]
  tags: Tag[]
  isLoading: boolean
  error: string
  setLoading: (loading: boolean) => void
  setError: (error: string) => void
  setProfile: (profile: Profile) => void
  setWallets: (wallets: Wallet[]) => void
  setApiKeys: (apiKeys: ApiKey[]) => void
  setTags: (tags: Tag[]) => void
  setShouldUpdate: (shouldUpdate: boolean) => void
  setUser: (profile: Profile, wallets: Wallet[], apiKeys: ApiKey[], tags: Tag[]) => void
  clear: () => void
  getUserProfile: (account: string, message: string, signature: string) => Promise<void>
}

const initialState: ProfileState = {
  shouldUpdate: false,
  profile: {
    id: '',
    name: '',
    bio: '',
    avatar: '',
    banner: '',
    website: '',
    email: '',
    discord: '',
    github: '',
    twitter: '',
    emailIsPublic: false,
    discordIsPublic: false,
    githubIsPublic: false,
    twitterIsPublic: false,
    nameIsPublic: false,
    bioIsPublic: false,
    websiteIsPublic: false,
  },
  wallets: [],
  apiKeys: [],
  tags: [],
}

export const useProfileStates = create<ProfileStateAndHelper>((set) => ({
  isLoading: true,
  profile: initialState.profile,
  wallets: initialState.wallets,
  apiKeys: initialState.apiKeys,
  tags: initialState.tags,
  shouldUpdate: initialState.shouldUpdate,
  error: '',
  clear: () => set(() => ({ ...initialState })),
  setUser: (profile: Profile, wallets: Wallet[], apiKeys: ApiKey[], tags: Tag[]) =>
    set(() => ({ profile, wallets, apiKeys, tags })),
  setShouldUpdate: (shouldUpdate: boolean) => set(() => ({ shouldUpdate })),
  setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
  setError: (error: string) => set(() => ({ error })),
  setProfile: (profile: Profile) => set(() => ({ profile })),
  setWallets: (wallets: Wallet[]) => set(() => ({ wallets })),
  setApiKeys: (apiKeys: ApiKey[]) => set(() => ({ apiKeys })),
  setTags: (tags: Tag[]) => set(() => ({ tags })),
  getUserProfile: async (account, message, signature) => {
    try {
      const response = await fetch('/api/profile/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, message, signature }),
      })
      if (!response.ok) throw new Error('Failed to read profile')
      const data = await response.json()

      if (!data.success) throw new Error('Failed to read profile')
      set(() => ({
        profile: data.profile,
        wallets: data.wallets,
        apiKeys: data.apiKeys,
        tags: data.tags,
        shouldUpdate: false,
        isLoading: false,
      }))
    } catch (error) {
      set(() => ({
        isLoading: false,
        error: error as string,
        profile: initialState.profile,
        wallets: initialState.wallets,
        apiKeys: initialState.apiKeys,
        tags: initialState.tags,
        shouldUpdate: false,
      }))
    }
  },
}))
