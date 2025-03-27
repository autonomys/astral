import { giveDiscordRole } from './utils'

export const verifyMainnetDiscordNominatorRole = async (roles: string[]) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Check if the user has the nominator role
  return roles.includes(MAINNET_DISCORD_GUILD_ROLE_ID_NOMINATOR)
}

export const verifyTaurusDiscordNominatorRole = async (roles: string[]) => {
  if (!process.env.TAURUS_DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { TAURUS_DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Check if the user has the nominator role
  return roles.includes(TAURUS_DISCORD_GUILD_ROLE_ID_NOMINATOR)
}

export const giveMainnetDiscordNominatorRole = async (userId: string) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Add the nominator role to the user
  await giveDiscordRole(
    userId,
    MAINNET_DISCORD_GUILD_ROLE_ID_NOMINATOR,
    'Give the user the nominator role',
  )
}

export const giveTaurusDiscordNominatorRole = async (userId: string) => {
  if (!process.env.TAURUS_DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { TAURUS_DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Add the nominator role to the user
  await giveDiscordRole(
    userId,
    TAURUS_DISCORD_GUILD_ROLE_ID_NOMINATOR,
    'Give the user the nominator role',
  )
}
