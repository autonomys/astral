import { userRoles } from './utils'

export const verifyDiscordFarmerRole = async (accessToken: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Get the user roles
  const roles = await userRoles(accessToken)

  // Check if the user has the farmer role
  return roles.includes(DISCORD_GUILD_ROLE_ID_FARMER)
}
