import { giveDiscordRole } from './utils'

export const verifyDiscordOperatorRole = async (roles: string[]) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Check if the user has the operator role
  return roles.includes(DISCORD_GUILD_ROLE_ID_OPERATOR)
}

export const giveDiscordOperatorRole = async (userId: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_OPERATOR)
    throw new Error('No Discord guild role ID for operator')
  const { DISCORD_GUILD_ROLE_ID_OPERATOR } = process.env

  // Add the operator role to the user
  await giveDiscordRole(userId, DISCORD_GUILD_ROLE_ID_OPERATOR, 'Give the user the operator role')
}
