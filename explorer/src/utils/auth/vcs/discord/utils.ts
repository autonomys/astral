import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

export const discordRest = () => {
  if (!process.env.DISCORD_BOT_TOKEN) throw new Error('No Discord bot token')

  const { DISCORD_BOT_TOKEN } = process.env

  const options = { version: '10' }

  return new REST(options).setToken(DISCORD_BOT_TOKEN)
}

export const getUserRoles = async (accessToken: string) => {
  try {
    if (!process.env.DISCORD_GUILD_ID) throw new Error('No Discord guild ID')
    const { DISCORD_GUILD_ID } = process.env

    // Prepare the request
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    // Get the user guild member details
    const response = await fetch(
      `https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      {
        method: 'GET',
        headers: headers,
      },
    )
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()

    // Return the user roles
    return data.roles
  } catch (error) {
    console.error('Failed to fetch user roles from Discord', error)
    throw error
  }
}

export const giveDiscordRole = async (userId: string, roleId: string, reason: string) => {
  try {
    if (!process.env.DISCORD_GUILD_ID) throw new Error('No Discord guild ID')
    const { DISCORD_GUILD_ID } = process.env

    // Initialize the Discord REST client
    const rest = discordRest()

    // Add the role to the user
    await rest.put(Routes.guildMemberRole(DISCORD_GUILD_ID, userId, roleId), { reason })
  } catch (error) {
    console.error('Failed to add role:', error)
    throw new Error('Failed to add role')
  }
}
