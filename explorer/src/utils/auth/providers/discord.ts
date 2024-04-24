import { chains } from '@/constants'
import { QUERY_CHECK_ROLE } from 'components/WalletSideKick/query'
import type { TokenSet } from 'next-auth'
import type { DiscordProfile } from 'next-auth/providers/discord'
import DiscordProvider from 'next-auth/providers/discord'
import { cookies } from 'next/headers'

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env

export const Discord = () => {
  return DiscordProvider({
    // client credentials
    clientId: DISCORD_CLIENT_ID || '',
    clientSecret: DISCORD_CLIENT_SECRET || '',

    // open id connect scopes
    authorization: { params: { scope: 'identify guilds guilds.join guilds.members.read' } },

    // fetch discord profile
    profile: async (profile: DiscordProfile, token: TokenSet) => {
      const guildsUrl = 'https://discord.com/api/users/@me/guilds'
      const headers = {
        Authorization: `Bearer ${token.access_token}`,
      }
      const { get } = cookies()
      const selectedChain = get('selectedChain')
      const subspaceAccount = get('subspaceAccount')

      try {
        const response = await fetch(guildsUrl, { method: 'GET', headers })
        const guilds = await response.json()
        const isGuildMember = guilds.some(
          (guild: { id: string }) => guild.id === process.env.DISCORD_GUILD_ID,
        )
        let isDiscordFarmerRole = false

        try {
          if (!QUERY_CHECK_ROLE.loc) throw new Error('No query')
          if (!subspaceAccount) throw new Error('No subspaceAccount')
          if (!selectedChain) throw new Error('No selected chain')
          const api = chains.find((chain) => chain.urls.page === selectedChain.value)
          if (!api) throw new Error('No selected chain api')
          const request = await fetch(api.urls.api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: QUERY_CHECK_ROLE.loc.source.body,
              variables: {
                subspaceAccount: subspaceAccount.value,
              },
            }),
          })
          const { data } = await request.json()
          isDiscordFarmerRole = data && data.isFarmer && data.isFarmer.length > 0
        } catch (error) {
          console.error('Failed to fetch if user has farmer role on Discord:', error)
          throw new Error('Failed to fetch if user has farmer role on Discord')
        }

        return {
          id: profile.id,
          name: profile.name,
          username: profile.username,
          subspaceAccount: subspaceAccount ? subspaceAccount.value : '',
          discordHandle: profile.name,
          isDiscordGuildMember: isGuildMember,
          isDiscordFarmerRole,
        }
      } catch (error) {
        console.error('Error fetching Discord guilds:', error)
        throw new Error('Failed to fetch Discord guilds')
      }
    },
  })
}
