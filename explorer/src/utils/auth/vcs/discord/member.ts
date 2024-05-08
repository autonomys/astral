export const verifyDiscordGuildMember = async (accessToken: string) => {
  if (!process.env.DISCORD_GUILD_ID) throw new Error('No discord guild id')
  const { DISCORD_GUILD_ID } = process.env

  // Prepare the request
  const guildsUrl = 'https://discord.com/api/users/@me/guilds'
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  // Get the user's guilds
  const response = await fetch(guildsUrl, { method: 'GET', headers })
  const guilds = await response.json()

  // Check if the user is a member of our guild
  return guilds.some((guild: { id: string }) => guild.id === DISCORD_GUILD_ID)
}
