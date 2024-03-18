import * as jsonwebtoken from 'jsonwebtoken'
import NextAuth, { AuthOptions, TokenSet } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import { NextRequest } from 'next/server'

const authOptions = (req: NextRequest): AuthOptions => {
  console.log('req', req.body)
  const providers: AuthOptions['providers'] = [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: { scope: 'read:user public_repo' },
      },
      profile: async (profile: GithubProfile, token: TokenSet) => {
        let isGitHubFollower = false

        await fetch(`https://api.github.com/users/${profile.login}/following`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            // Detect if user is following the GitHub account
            isGitHubFollower =
              json.find(
                (user: { login: string }) => user.login === process.env.GITHUB_ACCOUNT_NAME,
              ) !== undefined
          })
          .catch((err) => console.error(err))
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: profile.username,
          accountType: 'github',
          isGitHubFollower,
        }
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      authorization: { params: { scope: 'identify guilds guilds.members.read' } },
      profile: async (profile: DiscordProfile, token: TokenSet) => {
        let isDiscordGuildMember = false

        await fetch('https://discord.com/api/users/@me/guilds', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            isDiscordGuildMember =
              json.find((guild: { id: string }) => guild.id === process.env.DISCORD_GUILD_ID) !==
              undefined
          })
          .catch((err) => console.error(err))

        return {
          id: profile.id,
          name: profile.name,
          username: profile.username,
          accountType: 'discord',
          isDiscordGuildMember,
        }
      },
    }),
  ]
  return {
    debug: false,
    secret: process.env.NEXTAUTH_SECRET,
    providers,
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
          token.accountType = user.accountType
          token.isGitHubFollower = user.isGitHubFollower
          token.isDiscordGuildMember = user.isDiscordGuildMember
        }
        return token
      },
      session: async ({ session, token }) => {
        session.user = token
        return session
      },
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = async (req: NextRequest, res: any) => NextAuth(req, res, authOptions(req))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async (req: NextRequest, res: any) => NextAuth(req, res, authOptions(req))
