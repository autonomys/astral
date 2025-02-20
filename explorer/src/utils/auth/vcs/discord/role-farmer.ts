import { giveDiscordRole } from './utils'

export const verifyMainnetDiscordFarmerRole = async (roles: string[]) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Check if the user has the farmer role
  return roles.includes(MAINNET_DISCORD_GUILD_ROLE_ID_FARMER)
}

export const verifyTaurusDiscordFarmerRole = async (roles: string[]) => {
  if (!process.env.TAURUS_DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { TAURUS_DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Check if the user has the farmer role
  return roles.includes(TAURUS_DISCORD_GUILD_ROLE_ID_FARMER)
}

export const giveMainnetDiscordFarmerRole = async (userId: string) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Add the farmer role to the user
  await giveDiscordRole(
    userId,
    MAINNET_DISCORD_GUILD_ROLE_ID_FARMER,
    'Give the user the farmer role',
  )
}

export const giveTaurusDiscordFarmerRole = async (userId: string) => {
  if (!process.env.TAURUS_DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { TAURUS_DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Add the farmer role to the user
  await giveDiscordRole(
    userId,
    TAURUS_DISCORD_GUILD_ROLE_ID_FARMER,
    'Give the user the farmer role',
  )
}
