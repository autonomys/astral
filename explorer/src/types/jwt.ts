export type SubspaceToken = {
  account: string
  message: string
  signature: string
  source: string
  type: string
  vcs: {
    mainnetFarmer: boolean
    mainnetOperator: boolean
    mainnetNominator: boolean
    taurusFarmer: boolean
    taurusOperator: boolean
    taurusNominator: boolean
    // Temporary VCs
    mainnetTalismanFarmer: boolean
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
      mainnetFarmer: boolean
      mainnetOperator: boolean
      mainnetNominator: boolean
      taurusFarmer: boolean
      taurusOperator: boolean
      taurusNominator: boolean
      // Temporary VCs
      mainnetTalismanFarmer: boolean
    }
  }
}
