export type SubspaceToken = {
  account: string
  message: string
  signature: string
  vcs: {
    farmer: boolean
    operator: boolean
    nominator: boolean
  }
}

export type DiscordToken = {
  id: string
  username: string
  vcs: {
    member: boolean
    roles: {
      farmer: boolean
      operator: boolean
      nominator: boolean
    }
  }
}
