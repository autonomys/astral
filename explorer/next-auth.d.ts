import 'next-auth'

declare module 'next-auth' {
  export type Qualifiers = string[]

  interface User {
    id: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }

  export interface Session {
    user: User | null
    token: string
  }
}

declare module 'next-auth/client' {
  interface User {
    id: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }

  export interface Session {
    user: User
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface User {
    id: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }

  interface JWT {
    user: User | null
    id: string
    discordHandle: string
    isDiscordGuildMember: boolean
    isDiscordFarmerRole: boolean
  }
}
