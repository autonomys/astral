import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'

export const Subspace = () => {
  return CredentialsProvider({
    id: 'subspace',
    name: 'Subspace',
    credentials: {
      subspaceAccount: { label: 'Subspace Account', type: 'text', placeholder: 'st...' },
      message: { label: 'Message', type: 'text', placeholder: '0x...' },
      signature: { label: 'Signature', type: 'text', placeholder: '0x...' },
    },
    authorize: async (credentials) => {
      console.log('credentials', credentials)
      throw new Error('Not implemented')
    },
  }) as Provider
}
