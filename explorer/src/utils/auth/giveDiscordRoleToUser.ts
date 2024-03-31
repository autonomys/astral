import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

export const giveDiscordRoleToUser = async (
  guildId: string,
  userId: string,
  roleId: string,
  reason: string = 'Needed to give the user a specific role',
): Promise<void> => {
  try {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!)

    await rest.put(Routes.guildMemberRole(guildId, userId, roleId), { reason })

    console.log(`Role ${roleId} has been added to user ${userId} in guild ${guildId}.`)
  } catch (error) {
    console.error('Failed to add role:', error)
    throw new Error('Failed to add role')
  }
}
