import { sign, verify } from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import DiscordProvider from 'next-auth/providers/discord'
import { fetchDiscordProfile } from 'utils/fetchDiscordProfile'

const { NEXTAUTH_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env

const authOptions: AuthOptions = {
  debug: false,
  secret: NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID || '',
      clientSecret: DISCORD_CLIENT_SECRET || '',
      authorization: { params: { scope: 'identify guilds guilds.join guilds.members.read' } },
      profile: fetchDiscordProfile,
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: {
    encode: async ({ token, secret }) => sign(token!, secret, { algorithm: 'HS256' }),
    decode: async ({ token, secret }) => verify(token!, secret, { algorithms: ['HS256'] }) as JWT,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('JWT callback - user:', user) // Add logging for the user object

      if (user) {
        token.id = user.id
        token.name = user.name
        token.username = user.username
        token.subspaceAccount = user.subspaceAccount
        token.discordHandle = user.discordHandle
        token.isDiscordGuildMember = user.isDiscordGuildMember
        token.isDiscordFarmerRole = user.isDiscordFarmerRole
      }
      console.log('JWT callback - token:', token) // Add logging for the token object
      return token
    },
    session: async ({ session, token }) => {
      console.log('Session callback - token:', token) // Add logging for the token object
      session.user = token
      console.log('Session callback - session:', session) // Add logging for the session object
      return session
    },
  },
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions)
}

export { handler as GET, handler as POST, authOptions }
