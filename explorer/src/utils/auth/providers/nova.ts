import { JsonRpcProvider } from 'ethers'
import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage, VerifyOpts, VerifyParams } from 'siwe'

export const Nova = () => {
  const { REACT_APP_NOVA_RPC_URL } = process.env

  return CredentialsProvider({
    id: 'nova',
    name: 'Nova',
    credentials: {
      address: { label: 'Nova Account (EVM address)', type: 'text', placeholder: '0x...' },
      message: { label: 'Message', type: 'text', placeholder: '0x...' },
      signature: { label: 'Signature', type: 'text', placeholder: '0x...' },
    },
    authorize: async (credentials, req) => {
      console.log('credentials', credentials)
      try {
        if (!REACT_APP_NOVA_RPC_URL) throw new Error('Missing Nova RPC URL')

        if (!credentials || !credentials.address || !credentials.message || !credentials.signature)
          throw new Error('Missing credentials')

        const signature = credentials.signature
        const message = new SiweMessage(JSON.parse(credentials.message))

        if (message.address !== credentials.address) throw new Error('Invalid address')

        const verifyParams: VerifyParams = {
          signature,
          domain: 'autonomys.xyz',
          nonce: await getCsrfToken({ req }),
        }

        const verifyOpts: VerifyOpts = {
          provider: new JsonRpcProvider(REACT_APP_NOVA_RPC_URL),
          suppressExceptions: false,
        }

        if (!message.verify(verifyParams, verifyOpts)) throw new Error('Invalid signature')

        // To-do: return user object
        throw new Error('Not implemented')
      } catch (error) {
        console.error('Nova authorize error', error)
        return null
      }
    },
  }) as Provider
}
