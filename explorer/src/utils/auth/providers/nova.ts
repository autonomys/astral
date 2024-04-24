import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'

export const Nova = () => {
  return CredentialsProvider({
    id: 'nova',
    name: 'Nova',
    credentials: {
      address: { label: 'Nova Account (EVM address)', type: 'text', placeholder: '0x...' },
      message: { label: 'Message', type: 'text', placeholder: '0x...' },
      signature: { label: 'Signature', type: 'text', placeholder: '0x...' },
    },
    authorize: async (credentials) => {
      console.log('credentials', credentials)
      throw new Error('Not implemented')
    },
  }) as Provider
}
