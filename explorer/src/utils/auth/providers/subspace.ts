import { cryptoWaitReady, signatureVerify } from '@polkadot/util-crypto'
import { DEFAULT_DISCORD_TOKEN, DEFAULT_GITHUB_TOKEN } from 'constants/session'
import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifySubspaceAccountRoles } from '../vcs/subspace'

export const Subspace = () => {
  return CredentialsProvider({
    id: 'subspace',
    name: 'Subspace',

    // The credentials is an object with the fields 'account', 'message' and 'signature'
    credentials: {
      account: { label: 'Subspace Account', type: 'text', placeholder: 'st...' },
      message: { label: 'Message', type: 'text', placeholder: '0x...' },
      signature: { label: 'Signature', type: 'text', placeholder: '0x...' },
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

        const did = `did:subspace:${account}`

        // Verify Subspace VCs
        const { farmer, operator, nominator } = await verifySubspaceAccountRoles(account)

        // Return the user object if the credentials are valid
        return {
          id: did,
          DIDs: [did],
          subspace: {
            account,
            message,
            signature,
            vcs: {
              farmer,
              operator,
              nominator,
            },
          },
          discord: DEFAULT_DISCORD_TOKEN,
          github: DEFAULT_GITHUB_TOKEN,
        }
      } catch (error) {
        console.error('Error verify Subspace wallet ownership:', error)
        throw new Error('Error verify Subspace wallet ownership')
      }
    },
  }) as Provider
}
