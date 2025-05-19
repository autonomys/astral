'use client'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  split,
  useSubscription,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { FC, useEffect, useState } from 'react'

// Types for our data
interface Block {
  id: string
  height: number
  timestamp: string
}

interface SubscriptionData {
  consensus_blocks: Block[]
}

// Define a very simple subscription that's more likely to work
const BLOCKS_SUBSCRIPTION = gql`
  subscription {
    consensus_blocks(limit: 5, order_by: { height: desc }) {
      id
      height
      timestamp
    }
  }
`

// Component that displays real-time block data
const BlockSubscription: FC = () => {
  // Subscribe to real-time block updates
  const { data, loading, error } = useSubscription<SubscriptionData>(BLOCKS_SUBSCRIPTION)

  console.log('Subscription state:', { data, loading, error })

  if (loading) return <div className='p-4 text-gray-500'>Waiting for subscription data...</div>
  if (error) return <div className='p-4 text-red-500'>Error: {JSON.stringify(error, null, 2)}</div>
  if (!data?.consensus_blocks?.length) return <div className='p-4'>No blocks available</div>

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Latest Blocks (Real-time)</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.consensus_blocks.map((block) => (
          <div key={block.id} className='rounded-lg border bg-white p-4 shadow-sm'>
            <h3 className='text-lg font-bold'>Block #{block.height}</h3>
            <div className='text-sm text-gray-600'>
              {new Date(block.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className='mt-2 text-sm italic text-gray-500'>
        Blocks update automatically via GraphQL Subscription
      </div>
    </div>
  )
}

// Wrapper component that provides Apollo client
export const SubscriptionDemo: FC = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Initialize Apollo client for subscriptions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Create HTTP link
        const httpLink = new HttpLink({
          uri: 'http://localhost:8080/v1/graphql',
          headers: {
            'x-hasura-admin-secret': 'helloworld',
          },
        })

        // Create WebSocket link
        const wsLink = new WebSocketLink({
          uri: 'ws://localhost:8080/v1/graphql',
          options: {
            reconnect: true,
            timeout: 30000,
            connectionParams: {
              headers: {
                'x-hasura-admin-secret': 'helloworld',
              },
            },
            inactivityTimeout: 60000,
            lazy: false,
            reconnectionAttempts: 5,
            connectionCallback: (err) => {
              if (err) {
                console.error('WebSocket connection error:', err)
                setError(`WebSocket connection error: ${JSON.stringify(err)}`)
              } else {
                console.log('WebSocket connected successfully')
                setError(null)
              }
            },
          },
          webSocketImpl: WebSocket,
        })

        // Split links
        const splitLink = split(
          ({ query }) => {
            const definition = getMainDefinition(query)
            return (
              definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            )
          },
          wsLink,
          httpLink,
        )

        // Create client
        const newClient = new ApolloClient({
          link: splitLink,
          cache: new InMemoryCache(),
          connectToDevTools: true,
        })

        setClient(newClient)
      } catch (e) {
        const errMsg = e instanceof Error ? e.message : 'Unknown error initializing GraphQL client'
        console.error('Failed to initialize Apollo client:', errMsg)
        setError(errMsg)
      }
    }
  }, [])

  if (error) return <div className='p-8 text-red-500'>Error: {error}</div>
  if (!client) return <div className='p-8'>Initializing subscription client...</div>

  return (
    <ApolloProvider client={client}>
      <div className='mx-auto max-w-6xl p-6'>
        <h1 className='mb-6 text-2xl font-bold'>GraphQL Subscription Demo</h1>
        <div className='rounded-lg border bg-gray-50 p-6'>
          <BlockSubscription />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default SubscriptionDemo
