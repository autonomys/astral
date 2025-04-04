import type { DiscordToken, SubspaceToken } from 'types/jwt'

export const TOKEN_EXPIRATION = 60 * 60 * 24 // 1 day

export enum AuthProvider {
  subspace = 'subspace',
  discord = 'discord',
  github = 'github',
}

export const DEFAULT_SUBSPACE_TOKEN: SubspaceToken = {
  account: '',
  message: '',
  signature: '',
  vcs: {
    mainnetFarmer: false,
    mainnetOperator: false,
    mainnetNominator: false,
    taurusFarmer: false,
    taurusOperator: false,
    taurusNominator: false,
  },
  disbursements: {
    stakeWars2: false,
  },
}

export const DEFAULT_DISCORD_TOKEN: DiscordToken = {
  id: '',
  username: '',
  vcs: {
    member: false,
    roles: {
      mainnetFarmer: false,
      mainnetOperator: false,
      mainnetNominator: false,
      taurusFarmer: false,
      taurusOperator: false,
      taurusNominator: false,
    },
  },
}
