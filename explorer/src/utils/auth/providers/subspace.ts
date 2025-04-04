import { cryptoWaitReady, signatureVerify } from '@autonomys/auto-utils'
import { AuthProvider, DEFAULT_DISCORD_TOKEN } from 'constants/session'
import { User } from 'next-auth'
import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUserByID, saveUser } from '../user'
import {
  verifySubspaceMainnetAccountRoles,
  verifySubspaceTaurusAccountRoles,
} from '../vcs/subspace'
import { verifyToken } from '../verifyToken'

export const Subspace = () => {
  return CredentialsProvider({
    id: 'subspace',
    name: 'Subspace',

    // The credentials is an object with the fields 'account', 'message' and 'signature'
    credentials: {
      account: { label: 'Subspace Account', type: 'text', placeholder: 'st...' },
      message: { label: 'Message', type: 'text', placeholder: '0x...' },
      signature: { label: 'Signature', type: 'text', placeholder: '0x...' },
      csrfToken: { label: 'CSRF Token', type: 'text', placeholder: '0x...' },
    },

    // The authorize function is called when the user logs in
    authorize: async (credentials) => {
      try {
        // Return null if the credentials are invalid
        if (!credentials || !credentials.account || !credentials.message || !credentials.signature)
          return null
        const { account, message, signature } = credentials
        await cryptoWaitReady()

        // Verify the signature to ensure it is valid
        const { isValid } = signatureVerify(message, signature, account)

        // Return null if the credentials are invalid
        if (!isValid) return null

        const session = verifyToken()
        // Parse the message
        const messageObject = JSON.parse(message)

        // Verify csrf token
        if (credentials.csrfToken !== messageObject.csrfToken) return null

        const did = `did:subspace:${account}`

        // Verify Subspace VCs for mainnet
        const {
          farmer: mainnetFarmer,
          operator: mainnetOperator,
          nominator: mainnetNominator,
        } = await verifySubspaceMainnetAccountRoles(account)

        // Verify Subspace VCs for testnet
        const {
          farmer: taurusFarmer,
          operator: taurusOperator,
          nominator: taurusNominator,
        } = await verifySubspaceTaurusAccountRoles(account)

        const savedUser = await findUserByID(did)

        // create the user object if the credentials are valid
        const user: User = {
          id: did,
          DIDs: [...(savedUser?.data?.DIDs || []), did],
          subspace: {
            ...(savedUser?.data?.subspace ?? {}),
            account,
            message,
            signature,
            vcs: {
              ...(savedUser?.data?.subspace?.vcs ?? {}),
              mainnetFarmer,
              mainnetOperator,
              mainnetNominator,
              taurusFarmer,
              taurusOperator,
              taurusNominator,
            },
          },
          discord: {
            ...(savedUser?.data?.discord ?? DEFAULT_DISCORD_TOKEN),
            ...session.discord,
          },
        }

        if (!savedUser) {
          console.log('User does not exist, saving user:', user)
          await saveUser(user.id, {
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          return user
        } else {
          console.log('User exists, updating user:', user)
          await saveUser(user.id, {
            ...savedUser.data,
            ...user,
            [AuthProvider.subspace]: user[AuthProvider.subspace],
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }

        return {
          ...savedUser.data,
          [AuthProvider.subspace]: user[AuthProvider.subspace],
        }
      } catch (error) {
        console.error('Error verify Subspace wallet ownership:', error)
        throw new Error('Error verify Subspace wallet ownership')
      }
    },
  }) as Provider
}
