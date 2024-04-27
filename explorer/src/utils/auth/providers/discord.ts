import { chains } from '@/constants'
import { QUERY_CHECK_ROLE } from 'components/WalletSideKick/query'
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
      const selectedChain = get('selectedChain')
      const sessionToken = get('next-auth.session-token')?.value || ''
      const session = jsonwebtoken.verify(sessionToken, NEXTAUTH_SECRET, {
        algorithms: ['HS256'],
      }) as JWT

      try {
        const isDiscordGuildMember = await verifyDiscordGuildMember(token.access_token)

        let isDiscordFarmerRole = false

        // To-Do: Implement VCs (in a separate file)
        // try {
        //   if (!QUERY_CHECK_ROLE.loc) throw new Error('No query')
        //   if (!subspaceAccount) throw new Error('No subspaceAccount')
        //   if (!selectedChain) throw new Error('No selected chain')
        //   const api = chains.find((chain) => chain.urls.page === selectedChain.value)
        //   if (!api) throw new Error('No selected chain api')
        //   const request = await fetch(api.urls.api, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       query: QUERY_CHECK_ROLE.loc.source.body,
        //       variables: {
        //         subspaceAccount: subspaceAccount.value,
        //       },
        //     }),
        //   })
        //   const { data } = await request.json()
        //   isDiscordFarmerRole = data && data.isFarmer && data.isFarmer.length > 0
        // } catch (error) {
        //   console.error('Failed to fetch if user has farmer role on Discord:', error)
        //   throw new Error('Failed to fetch if user has farmer role on Discord')
        // }

        const did = 'did:openid:discord:' + profile.id

        console.log('did', did)

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
                farmer: isDiscordFarmerRole,
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
