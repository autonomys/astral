import 'next-auth'

declare module 'next-auth' {
  export type Qualifiers = string[]

  interface User {
    id: string
    accountType: string
    isGitHubFollower?: boolean
    isDiscordGuildMember?: boolean
  }

  export interface Session {
    user: User | null
    token: string
  }
}

declare module 'next-auth/client' {
  interface User {
    id: string
    accountType: string
    isGitHubFollower?: boolean
    isDiscordGuildMember?: boolean
  }

  export interface Session {
    user: User
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface User {
    id: string
    accountType: string
    isGitHubFollower?: boolean
    isDiscordGuildMember?: boolean
  }

  interface JWT {
    user: User | null
    id: string
    accountType: string
    isGitHubFollower?: boolean
    isDiscordGuildMember?: boolean
  }
}
