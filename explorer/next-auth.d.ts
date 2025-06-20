import 'next-auth'
import type { DiscordToken, SubspaceToken } from 'types/jwt'

// Extending the 'next-auth' module to include custom user and session types
declare module 'next-auth' {
  export type Qualifiers = string[]

  interface User {
    id: string
    DIDs: string[]
    subspace?: SubspaceToken
    discord?: DiscordToken
  }

  export interface Session {
    user: User | null
    token: string
  }

  export interface SavedUser extends User {
    createdAt: Date
    updatedAt: Date
  }
}

// Extending the 'next-auth/client' module for client-side usage
declare module 'next-auth/client' {
  interface User {
    id: string
    DIDs: string[]
    subspace?: SubspaceToken
    discord?: DiscordToken
  }

  export interface Session {
    user: User
    token: string
  }
}

// Extending the 'next-auth/jwt' module to include custom JWT payload structure
declare module 'next-auth/jwt' {
  interface User {
    id: string
    DIDs: string[]
    subspace?: SubspaceToken
    discord?: DiscordToken
  }

  interface JWT {
    id: string
    DIDs: string[]
    subspace?: SubspaceToken
    discord?: DiscordToken
  }
}
