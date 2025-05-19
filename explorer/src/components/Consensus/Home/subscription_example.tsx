'use client'

import {
  ApolloClient,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
  split,
  useQuery,
  useSubscription,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { useEffect, useState } from 'react'

// Define block type
interface Block {
  id: string
  height: number
  timestamp: string
  extrinsics_count: number
  events_count: number
  space_pledged: string | number
  blockchain_size: string | number
  sort_id?: string
}

interface AccountAggregate {
  id: string
  count: number
}

interface SubscriptionData {
  consensus_blocks: Block[]
  consensus_accounts_aggregate: AccountAggregate[]
}

// Define the subscription query
const HOME_SUBSCRIPTION = gql`
  subscription HomeSubscription($limit: Int!, $offset: Int!) {
    consensus_blocks(limit: $limit, offset: $offset, order_by: { height: desc }) {
      id
      height
      timestamp
      extrinsics_count
      events_count
      space_pledged
      blockchain_size
    }
    consensus_accounts_aggregate {
      id
      count
    }
  }
`

// Define the query as fallback
const HOME_QUERY = gql`
  query Home($limit: Int!, $offset: Int!) {
    consensus_blocks(limit: $limit, offset: $offset, order_by: { height: desc }) {
      id
      height
      timestamp
      extrinsics_count
      events_count
      space_pledged
      blockchain_size
    }
    consensus_accounts_aggregate {
      id
      count
    }
  }
`

// Create Apollo Client with WebSocket support for subscriptions
const createApolloClient = () => {
  // HTTP link for queries and mutations
  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'helloworld',
      'x-hasura-role': 'user',
    },
  })

  // WebSocket link for subscriptions
  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: 'ws://localhost:8080/v1/graphql',
            connectionParams: {
              headers: {
                'x-hasura-admin-secret': 'helloworld',
                'x-hasura-role': 'user',
              },
            },
          }),
        )
      : null

  // Split links based on operation type
  const splitLink =
    typeof window !== 'undefined' && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query)
            return (
              definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            )
          },
          wsLink,
          httpLink,
        )
      : httpLink

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  })
}

// Component using subscription
const HomeWithSubscription = () => {
  const PAGE_SIZE = 10

  // Use subscription
  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription<SubscriptionData>(HOME_SUBSCRIPTION, {
    variables: { limit: PAGE_SIZE, offset: 0 },
  })

  // Fallback to query if subscription fails
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery<SubscriptionData>(HOME_QUERY, {
    variables: { limit: PAGE_SIZE, offset: 0 },
    skip: !!subscriptionData,
    pollInterval: 6000, // Use polling as fallback
  })

  // Use subscription data when available, fall back to query data
  const data = subscriptionData || queryData
  const loading = subscriptionLoading || queryLoading
  const error = subscriptionError || queryError

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available</div>

  return (
    <div>
      <h1>Consensus Blocks (Subscription Demo)</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Total Accounts: {data.consensus_accounts_aggregate?.[0]?.count || 0}</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {data.consensus_blocks.map((block: Block) => (
          <div
            key={block.id}
            style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}
          >
            <h3>Block #{block.height}</h3>
            <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
            <p>Extrinsics: {block.extrinsics_count}</p>
            <p>Events: {block.events_count}</p>
            <p>Space Pledged: {block.space_pledged}</p>
            <p>Blockchain Size: {block.blockchain_size}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Wrapper with Apollo Provider
export function HomeSubscriptionExample() {
  const [client, setClient] = useState<ApolloClient<Record<string, unknown>> | null>(null)

  useEffect(() => {
    setClient(createApolloClient())
  }, [])

  if (!client) return <div>Loading Apollo Client...</div>

  return (
    <ApolloProvider client={client}>
      <HomeWithSubscription />
    </ApolloProvider>
  )
}

export default HomeSubscriptionExample
