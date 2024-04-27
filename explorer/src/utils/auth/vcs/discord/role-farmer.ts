import { getUserRoles, giveDiscordRole } from './utils'

export const verifyDiscordFarmerRole = async (accessToken: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Get the user roles
  const roles = await getUserRoles(accessToken)

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
