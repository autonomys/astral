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

export const verifyDiscordOperatorRole = async (accessToken: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Get the user roles
  const roles = await getUserRoles(accessToken)

  // Check if the user has the operator role
  return roles.includes(DISCORD_GUILD_ROLE_ID_OPERATOR)
}

export const verifyDiscordNominatorRole = async (accessToken: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Get the user roles
  const roles = await getUserRoles(accessToken)

  // Check if the user has the nominator role
  return roles.includes(DISCORD_GUILD_ROLE_ID_NOMINATOR)
}

export const giveDiscordFarmerRole = async (userId: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for farmer')
  const { DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Add the farmer role to the user
  await giveDiscordRole(userId, DISCORD_GUILD_ROLE_ID_FARMER, 'Give the user the farmer role')
}

export const giveDiscordOperatorRole = async (userId: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Add the operator role to the user
  await giveDiscordRole(userId, DISCORD_GUILD_ROLE_ID_OPERATOR, 'Give the user the operator role')
}

export const giveDiscordNominatorRole = async (userId: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_FARMER)
    throw new Error('No Discord guild role ID for nominator')
  const { DISCORD_GUILD_ROLE_ID_FARMER } = process.env

  // Add the nominator role to the user
  await giveDiscordRole(userId, DISCORD_GUILD_ROLE_ID_FARMER, 'Give the user the nominator role')
}
