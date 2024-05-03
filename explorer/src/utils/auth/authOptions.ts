import { TOKEN_EXPIRATION } from 'constants/session'
import { sign, verify } from 'jsonwebtoken'
import { AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
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
        token.id = user.id
        token.DIDs = user.DIDs
        token.subspace = user.subspace
        token.discord = user.discord
        token.github = user.github
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) session.user = token
      return session
    },
  },
}
