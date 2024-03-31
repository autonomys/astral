import { cookies } from 'next/headers'
import { giveDiscordRoleToUser } from 'utils/auth/giveDiscordRoleToUser'

export const POST = async () => {
  const cookieVal = cookies()

  console.log('cookieVal', cookieVal)

  const test = await giveDiscordRoleToUser(
    process.env.DISCORD_GUILD_ID!,
    'userId',
    process.env.DISCORD_GUILD_FARMER_ROLE_ID!,
    'User is a farmer! 🚜',
  )
  console.log('test', test)
  return { error: 'Not implemented' }
}
