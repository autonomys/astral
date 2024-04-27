import * as jsonwebtoken from 'jsonwebtoken'
import type { TokenSet } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import type { DiscordProfile } from 'next-auth/providers/discord'
import DiscordProvider from 'next-auth/providers/discord'
import { cookies } from 'next/headers'
import { verifyDiscordGuildMember } from '../vcs/discord/member'

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
      if (!token.access_token) throw new Error('No access token')

      if (!process.env.NEXTAUTH_SECRET) throw new Error('No secret')
      const { NEXTAUTH_SECRET } = process.env

      const { get } = cookies()
      const sessionToken = get('next-auth.session-token')?.value || ''
      const session = jsonwebtoken.verify(sessionToken, NEXTAUTH_SECRET, {
        algorithms: ['HS256'],
      }) as JWT

      try {
        const isDiscordGuildMember = await verifyDiscordGuildMember(token.access_token)

        const did = 'did:openid:discord:' + profile.id

        return {
          id: session.id || did,
          DIDs: [...session.DIDs, did],
          subspace: session.subspace,
          discord: {
            id: profile.id,
            username: profile.username,
            vcs: {
              member: isDiscordGuildMember,
              // To-Do: Implement role VCs
              roles: {
                farmer: false,
                operator: false,
                nominator: false,
              },
            },
          },
        }
      } catch (error) {
        console.error('Error fetching Discord guilds:', error)
        throw new Error('Failed to fetch Discord guilds')
      }
    },
  })
}
