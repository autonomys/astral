export type SubspaceToken = {
  account: string
  message: string
  signature: string
  vcs: {
    farmer: boolean
    operator: boolean
    nominator: boolean
  }
  disbursements?: {
    stakeWars2: boolean
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
