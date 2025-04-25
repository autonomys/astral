import { giveDiscordRole } from './utils'

export const verifyMainnetDiscordTalismanFarmerRole = async (roles: string[]) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_TAILSMAN_FARMER)
    throw new Error('No Discord guild role ID for talisman farmer')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_TAILSMAN_FARMER } = process.env

  // Check if the user has the nominator role
  return roles.includes(MAINNET_DISCORD_GUILD_ROLE_ID_TAILSMAN_FARMER)
}

export const giveMainnetDiscordTalismanFarmerRole = async (userId: string) => {
  if (!process.env.MAINNET_DISCORD_GUILD_ROLE_ID_TAILSMAN_FARMER)
    throw new Error('No Discord guild role ID for talisman farmer')
  const { MAINNET_DISCORD_GUILD_ROLE_ID_TAILSMAN_FARMER } = process.env

  // Add the talisman farmer role to the user
  await giveDiscordRole(
    userId,
    MAINNET_DISCORD_GUILD_ROLE_ID_TAILSMAN_FARMER,
    'Give the user the talisman farmer role',
  )
}
