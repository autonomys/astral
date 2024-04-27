import { REST } from '@discordjs/rest'

export const discordRest = () => {
  if (!process.env.DISCORD_BOT_TOKEN) throw new Error('No Discord bot token')

  const { DISCORD_BOT_TOKEN } = process.env

  const options = { version: '10' }

  return new REST(options).setToken(DISCORD_BOT_TOKEN)
}

export const userRoles = async (accessToken: string) => {
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
