import * as jsonwebtoken from 'jsonwebtoken'
import type { TokenSet } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import type { DiscordProfile } from 'next-auth/providers/discord'
import DiscordProvider from 'next-auth/providers/discord'
import { cookies } from 'next/headers'
import {
  getUserRoles,
  giveDiscordFarmerRole,
  giveDiscordNominatorRole,
  giveDiscordOperatorRole,
  verifyDiscordFarmerRole,
  verifyDiscordGuildMember,
  verifyDiscordNominatorRole,
  verifyDiscordOperatorRole,
} from '../vcs/discord'

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
      try {
        if (!token.access_token) throw new Error('No access token')

        if (!process.env.NEXTAUTH_SECRET) throw new Error('No secret')
        const { NEXTAUTH_SECRET } = process.env

        const { get } = cookies()
        const sessionToken = get('next-auth.session-token')?.value || ''
        const session = jsonwebtoken.verify(sessionToken, NEXTAUTH_SECRET, {
          algorithms: ['HS256'],
        }) as JWT
        const did = 'did:openid:discord:' + profile.id

        const member = await verifyDiscordGuildMember(token.access_token)
        const roles = await getUserRoles(token.access_token)
        let farmer = await verifyDiscordFarmerRole(roles)
        let operator = await verifyDiscordOperatorRole(roles)
        let nominator = await verifyDiscordNominatorRole(roles)

        let newRolesAdded = false
        if (session.subspace?.vcs.farmer && !farmer) {
          await giveDiscordFarmerRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.operator && !operator) {
          await giveDiscordOperatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.nominator && !nominator) {
          await giveDiscordNominatorRole(profile.id)
          newRolesAdded = true
        }
        if (newRolesAdded) {
          const newRoles = await getUserRoles(token.access_token)
          farmer = await verifyDiscordFarmerRole(newRoles)
          operator = await verifyDiscordOperatorRole(newRoles)
          nominator = await verifyDiscordNominatorRole(newRoles)
        }

        return {
          id: session.id || did,
          DIDs: [...session.DIDs, did],
          subspace: session.subspace,
          discord: {
            id: profile.id,
            username: profile.username,
            vcs: {
              member,
              roles: {
                farmer,
                operator,
                nominator,
              },
            },
          },
        }
      } catch (error) {
        console.error('Error fetching Discord profile:', error)
        throw new Error('Failed to fetch Discord profile')
      }
    },
  })
}
