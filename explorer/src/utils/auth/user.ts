import { NetworkId } from '@autonomys/auto-utils'
import { UserSession } from '@autonomys/user-session'
import { SavedUser } from 'next-auth'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

const { findUserByID: findUserByIDAutoEvm, saveUser: saveUserAutoEvm } = UserSession<SavedUser>({
  apiKey: process.env.AUTO_DRIVE_API_KEY || '',
  network: 'mainnet',
  rpcUrl: process.env.AUTO_EVM_RPC_URL || '',
  address: process.env.USER_SESSION_CONTRACT_ADDRESS || '',
  privateKey: process.env.USER_SESSION_PRIVATE_KEY || '',
  password: process.env.USER_SESSION_PASSWORD,
  fileName: 'explorer-user-session.json',
  showLogs: true,
  waitReceipt: true,
})

const findUserByID = async (userId: string): Promise<{ cid: string; data: SavedUser } | null> => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const response = await Promise.race([
      queryGraphqlServer(
        `
          query GetSession($userId: String!) {
            users_session(where: { id: { _eq: $userId}}) {
              id,
              data
            }
          }`,
        {
          userId,
        },
        NETWORK,
      ),
      findUserByIDAutoEvm(userId),
    ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (response && (response as any).users_session && (response as any).users_session[0])
      return {
        cid: 'none',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: (response as any).users_session[0].data as SavedUser,
      }
    if (response) return response as { cid: string; data: SavedUser }
    return null
  } catch (error) {
    console.error('Error finding user:', error)
    return null
  }
}

const saveUser = async (userId: string, user: SavedUser) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const response = await Promise.race([
      queryGraphqlServer(
        `
          mutation SaveSession($user: users_session_insert_input!) {
            insert_users_session_one(object: $user) {
              id,
              data
            }
          }`,
        {
          user: {
            id: userId,
            dids: user.DIDs,
            data: user,
          },
        },
        NETWORK,
      ),
      saveUserAutoEvm(userId, user),
    ])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((response as any).insert_users_session_one)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (response as any).insert_users_session_one.data
    if (response) return response
    return null
  } catch (error) {
    console.error('Error saving user:', error)
    return null
  }
}

export { findUserByID, saveUser }
