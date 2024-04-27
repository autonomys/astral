import { REST } from '@discordjs/rest'

export const discordRest = () => {
  if (!process.env.DISCORD_BOT_TOKEN) throw new Error('No Discord bot token')

  const { DISCORD_BOT_TOKEN } = process.env

  const options = { version: '10' }

  return new REST(options).setToken(DISCORD_BOT_TOKEN)
}
