import * as jsonwebtoken from 'jsonwebtoken'
import type { TokenSet } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import { cookies } from 'next/headers'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

export const GitHub = () => {
  return GitHubProvider({
    // client credentials
    clientId: GITHUB_CLIENT_ID || '',
    clientSecret: GITHUB_CLIENT_SECRET || '',

    // fetch discord profile
    profile: async (profile: GithubProfile, token: TokenSet) => {
      try {
        if (!token.access_token) throw new Error('No access token')

        if (!process.env.NEXTAUTH_SECRET) throw new Error('No secret')
        const { NEXTAUTH_SECRET } = process.env

        const { get } = cookies()
        const sessionToken = get('next-auth.session-token')?.value || ''
        const session = jsonwebtoken.verify(sessionToken, NEXTAUTH_SECRET, {
          algorithms: ['HS256'],
        }) as JWT
        const did = 'did:openid:github:' + profile.id

        return {
          id: session.id || did,
          DIDs: [...session.DIDs, did],
          subspace: session.subspace,
          discord: session.discord,
          github: {
            id: profile.id,
            username: profile.login,
          },
        }
      } catch (error) {
        console.error('Error fetching Discord profile:', error)
        throw new Error('Failed to fetch Discord profile')
      }
    },
  })
}
