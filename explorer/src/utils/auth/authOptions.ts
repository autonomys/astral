import { TOKEN_EXPIRATION } from 'constants/session'
import { sign, verify } from 'jsonwebtoken'
import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { saveUserToken } from 'utils/fauna'
import { providers } from './providers'

const { NEXTAUTH_SECRET } = process.env

export const authOptions: AuthOptions = {
  debug: true,
  secret: NEXTAUTH_SECRET,
  providers,
  session: {
    strategy: 'jwt',
    maxAge: TOKEN_EXPIRATION,
  },
  jwt: {
    encode: async ({ token, secret }) => sign(token!, secret, { algorithm: 'HS256' }),
    decode: async ({ token, secret }) => verify(token!, secret, { algorithms: ['HS256'] }) as JWT,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        await saveUserToken(user)
        token.id = user.id
        token.DIDs = user.DIDs
        token.subspace = user.subspace
        token.discord = user.discord
      }
      return token
    },
    redirect: async ({ url, baseUrl }) => {
      if (process.env.NEXTAUTH_URL && url.startsWith(process.env.NEXTAUTH_URL)) return url
      if (process.env.NEXTAUTH_SECONDARY_URL && url.startsWith(process.env.NEXTAUTH_SECONDARY_URL))
        return url
      return baseUrl
    },
    session: async ({ session, token }) => {
      if (token) session.user = token
      return session
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.COOKIE_DOMAIN || undefined,
      },
    },
  },
}
