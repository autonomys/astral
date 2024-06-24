import type { Chains } from 'constants/chains'
import type { AuthProvider } from 'constants/session'
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

const queryIndex = async (index: string, terms: string | string[]) =>
  await client
    .query(q.Paginate(q.Match(q.Index(index), ...(Array.isArray(terms) ? terms : [terms]))))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      const resultsRefs = response.data
      if (resultsRefs.length === 0) return null

      const results = resultsRefs.map((ref: ExprArg) => q.Get(ref))

      return client.query(results) as Promise<{ ref: ExprArg; ts: number; data: SavedUser }[]>
    })
    .catch((error: FaunaHttpErrorResponseContent) => console.log('error', error))

const saveData = async (collection: string, data: object) =>
  await client
    .query(q.Create(q.Ref(collection), { data }))
    .catch((error: FaunaHttpErrorResponseContent) => console.log('error', error))

const updateData = async (document: ExprArg, data: object) =>
  await client
    .query(q.Update(q.Ref(document), { data }))
    .then((response: object) => response)
    .catch((error: FaunaHttpErrorResponseContent) => {
      console.log('error', error)
      return error
    })

export const findClaim = async (userID: string, chain: string, claimType: string) =>
  await queryIndex('claim_by_id_chain_and_claimType', [userID, chain, claimType])

export const findUserByID = async (userID: string) => await queryIndex('users_by_id', userID)

export const findUserByAuthProviderId = async (provider: AuthProvider, userID: string) =>
  await queryIndex(`users_by_${provider.toString()}_id`, userID)

export const saveClaim = async (
  user: User,
  chain: Chains,
  claimType: string,
  claim: object,
  tx: object,
) => {
  const now = q.Now()
  return await saveData('classes/claims', {
    id: `${user.id}-${chain}-${claimType}`,
    chain,
    claimType,
    claim,
    user,
    tx,
    createdAt: now,
    updatedAt: now,
  })
}

export const saveUser = async (user: User) => {
  const now = q.Now()
  return await saveData('classes/users', {
    ...user,
    createdAt: now,
    updatedAt: now,
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
  return await updateData(document, newData)
}

export const saveUserToken = async (user: User) =>
  await saveData('classes/users_tokens', {
    ...user,
    host: headers().get('host'),
    createdAt: q.Now(),
  })
