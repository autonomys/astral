import 'next-auth'

// Extending the 'next-auth' module to include custom user and session types
declare module 'next-auth' {
  export type Qualifiers = string[]

  interface User {
    id: string
    username: string
    subspaceAccount: string
    name: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }

  export interface Session {
    user: User | null
    token: string
  }
}

// Extending the 'next-auth/client' module for client-side usage
declare module 'next-auth/client' {
  interface User {
    id: string
    subspaceAccount: string
    name: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
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
    username: string
    subspaceAccount: string
    name: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }

  interface JWT {
    user: User | null
    username: string
    id: string
    subspaceAccount: string
    name: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }
}
