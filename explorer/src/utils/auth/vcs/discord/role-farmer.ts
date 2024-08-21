import { giveDiscordRole } from './utils'

export const verifyDiscordFarmerRole = async (roles: string[]) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Check if the user has the farmer role
  return roles.includes(DISCORD_GUILD_ROLE_ID_FARMER)
}

export const giveDiscordFarmerRole = async (userId: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Add the farmer role to the user
  await giveDiscordRole(userId, DISCORD_GUILD_ROLE_ID_FARMER, 'Give the user the farmer role')
}
