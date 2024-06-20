import { AuthProvider } from '@/constants/session'
import { Client, ExprArg, FaunaHttpErrorResponseContent, query as q } from 'faunadb'
import type { SavedUser, User } from 'next-auth'
import { headers } from 'next/headers'

const client = new Client({
  secret: process.env.FAUNA_DB_SECRET || '',
  keepAlive: false,
  queryTimeout: 2000,
  timeout: 30,
  http2SessionIdleTime: 1000,
  domain: 'db.us.fauna.com',
  scheme: 'https',
})

export const findUserByID = async (userID: string) => {
  return await client
    .query(q.Paginate(q.Match(q.Index('users_by_id'), userID)))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      const resultsRefs = response.data
      if (resultsRefs.length === 0) return null

      const results = resultsRefs.map((ref: ExprArg) => {
        return q.Get(ref)
      })

      return client.query(results) as Promise<{ ref: ExprArg; ts: number; data: SavedUser }[]>
    })
    .catch((error: FaunaHttpErrorResponseContent) => {
      console.log('error', error)
    })
}

export const findUserByAuthProviderId = async (provider: AuthProvider, id: string) => {
  return await client
    .query(q.Paginate(q.Match(q.Index(`users_by_${provider.toString()}_id`), id)))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      const resultsRefs = response.data
      if (resultsRefs.length === 0) return null

      const results = resultsRefs.map((ref: ExprArg) => {
        return q.Get(ref)
      })

      return client.query(results) as Promise<{ ref: ExprArg; ts: number; data: SavedUser }[]>
    })
    .catch((error: FaunaHttpErrorResponseContent) => {
      console.log('error', error)
    })
}

export const saveUser = async (user: User) => {
  const now = q.Now()
  await client
    .query(
      q.Create(q.Ref('classes/users'), {
        data: {
          ...user,
          createdAt: now,
          updatedAt: now,
        },
      }),
    )
    .catch((error: FaunaHttpErrorResponseContent) => {
      console.log('error', error)
    })
}

export const updateUser = async (
  document: ExprArg,
  savedUser: SavedUser,
  provider: AuthProvider,
  updateToUser: object,
) => {
  const newData: SavedUser = {
    ...savedUser,
    [provider]: updateToUser,
    updatedAt: q.Now(),
  }
  await client
    .query(
      q.Update(q.Ref(document), {
        data: newData,
      }),
    )
    .then((response: object) => {
      return response
    })
    .catch((error: FaunaHttpErrorResponseContent) => {
      console.log('error', error)
      return error
    })
}

export const saveUserToken = async (user: User) => {
  await client
    .query(
      q.Create(q.Ref('classes/users_tokens'), {
        data: {
          ...user,
          host: headers().get('host'),
          createdAt: q.Now(),
        },
      }),
    )
    .catch((error: FaunaHttpErrorResponseContent) => {
      console.log('error', error)
    })
}
