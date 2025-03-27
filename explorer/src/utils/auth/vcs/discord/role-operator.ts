import { giveDiscordRole } from './utils'

export const verifyMainnetDiscordOperatorRole = async (roles: string[]) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Check if the user has the operator role
  return roles.includes(MAINNET_DISCORD_GUILD_ROLE_ID_OPERATOR)
}

export const verifyTaurusDiscordOperatorRole = async (roles: string[]) => {
  if (!process.env.TAURUS_DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { TAURUS_DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Check if the user has the operator role
  return roles.includes(TAURUS_DISCORD_GUILD_ROLE_ID_OPERATOR)
}

export const giveMainnetDiscordOperatorRole = async (userId: string) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Add the operator role to the user
  await giveDiscordRole(
    userId,
    MAINNET_DISCORD_GUILD_ROLE_ID_OPERATOR,
    'Give the user the operator role',
  )
}

export const giveTaurusDiscordOperatorRole = async (userId: string) => {
  if (!process.env.TAURUS_DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { TAURUS_DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Add the operator role to the user
  await giveDiscordRole(
    userId,
    TAURUS_DISCORD_GUILD_ROLE_ID_OPERATOR,
    'Give the user the operator role',
  )
}
