import * as jsonwebtoken from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions, TokenSet } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'

export const authOptions: AuthOptions = {
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      authorization: { params: { scope: 'identify guilds guilds.join guilds.members.read' } },
      profile: async (profile: DiscordProfile, token: TokenSet) => {
        console.log('Discord Profile:', profile, token)
        let isDiscordGuildMember = false
        const isDiscordFarmerRole = false

        await fetch('https://discord.com/api/users/@me/guilds', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log('extra0', json)
            isDiscordGuildMember =
              json.find((guild: { id: string }) => guild.id === process.env.DISCORD_GUILD_ID) !==
              undefined
          })
          .catch((err) => console.error(err))

        try {
          await fetch(
            `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=bot&permissions=268435456`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            },
          )
            // .then((res) => res.json())
            .then((json) => {
              console.log('extra1', json)
            })
            .catch((err) => console.error(err))
        } catch (e) {
          console.error(e)
        }

        try {
          await fetch(`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/roles`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((json) => {
              console.log('extra1', json)
            })
            .catch((err) => console.error(err))
        } catch (e) {
          console.error(e)
        }

        try {
          await fetch(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${profile.id}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            },
          )
            .then((res) => res.json())
            .then((json) => {
              console.log('extra2', json)
            })
            .catch((err) => console.error(err))
        } catch (e) {
          console.error(e)
        }

        try {
          await fetch(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${profile.id}/roles/${process.env.DISCORD_GUILD_FARMER_ROLE_ID}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            },
          )
            .then((res) => res.json())
            .then((json) => {
              console.log('put-role', json)
            })
            .catch((err) => console.error(err))
        } catch (e) {
          console.error(e)
        }

        return {
          id: profile.id,
          name: profile.name,
          username: profile.username,
          discordHandle: profile.name,
          isDiscordGuildMember,
          isDiscordFarmerRole,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: {
    encode: ({ token, secret }) => jsonwebtoken.sign(token!, secret, { algorithm: 'HS256' }),
    decode: async ({ token, secret }) =>
      jsonwebtoken.verify(token!, secret, { algorithms: ['HS256'] }) as JWT,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.discordHandle = user.discordHandle
        token.isDiscordGuildMember = user.isDiscordGuildMember
        token.isDiscordFarmerRole = user.isDiscordFarmerRole
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = token
      return session
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions)
}

export { handler as GET, handler as POST }
