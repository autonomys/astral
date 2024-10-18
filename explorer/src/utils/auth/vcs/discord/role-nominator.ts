import { giveDiscordRole } from './utils'

export const verifyDiscordNominatorRole = async (roles: string[]) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Check if the user has the nominator role
  return roles.includes(DISCORD_GUILD_ROLE_ID_NOMINATOR)
}

export const giveDiscordNominatorRole = async (userId: string) => {
  if (!process.env.DISCORD_GUILD_ROLE_ID_NOMINATOR)
    throw new Error('No Discord guild role ID for nominator')
  const { DISCORD_GUILD_ROLE_ID_NOMINATOR } = process.env

  // Add the nominator role to the user
  await giveDiscordRole(userId, DISCORD_GUILD_ROLE_ID_NOMINATOR, 'Give the user the nominator role')
}
