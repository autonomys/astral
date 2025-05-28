'use client'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { NetworkId } from '@autonomys/auto-utils'
import { Indexer, defaultIndexer } from 'constants/indexers'
import { Routes } from 'constants/routes'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { logError } from 'utils/log'
import { getTokenDecimals, getTokenSymbol } from 'utils/network'

const IGNORED_NETWORK_ERRORS = [
  'TypeError: NetworkError when attempting to fetch resource.',
  'TypeError: Failed to fetch',
]

export type IndexersContextValue = {
  indexerSet: Indexer
  network: NetworkId
  section: Routes
  tokenSymbol: string
  tokenDecimals: number
  setIndexerSet: (children: Indexer) => void
  setSection: (section: Routes) => void
}

export const IndexersContext = createContext<IndexersContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

const createApolloClient = (indexerSet: Indexer, section: Routes, pathname: string) => {
  const httpLink = createHttpLink({
    uri: () => indexerSet.indexer,
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        logError(
          pathname,
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, [Network]: ${indexerSet.network}, [Section]: ${section}`,
        ),
      )
    }

    if (
      networkError &&
      !IGNORED_NETWORK_ERRORS.includes(networkError.toString()) &&
      !IGNORED_NETWORK_ERRORS.includes(networkError.message)
    ) {
      logError(
        pathname,
        `[Network error]: ${networkError}, [Network]: ${indexerSet.network}, [Section]: ${section}`,
      )
    }
  })

  // Create WebSocket link for subscriptions
  const wsUri = indexerSet.indexer.replace(/^http/, 'ws')
  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: {},
      inactivityTimeout: 60000,
      lazy: false,
    },
    webSocketImpl: WebSocket,
  })

  // Use split to route operations to appropriate link
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    ApolloLink.from([errorLink, new RetryLink(), httpLink]),
  )

  // Create and return Apollo client
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    connectToDevTools: process.env.NODE_ENV === 'development',
  })
}

export const IndexersProvider: FC<Props> = ({ children }) => {
  const [indexerSet, _setIndexerSet] = useState<Indexer>(defaultIndexer)
  const [section, setSection] = useState<Routes>(Routes.consensus)
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const newClient = createApolloClient(indexerSet, section, pathname)
        setClient(newClient)
      } catch (e) {
        const errMsg = e instanceof Error ? e.message : 'Unknown error initializing GraphQL client'
        logError(pathname, `Failed to initialize Apollo client: ${errMsg}`)
      }
    }
  }, [indexerSet, section, pathname])

  const setIndexerSet = useCallback(
    (indexer: Indexer) => {
      _setIndexerSet(indexer)
    },
    [_setIndexerSet],
  )

  if (!client) {
    return <span className='p-2 text-sm'>loading ...</span>
  }

  return (
    <IndexersContext.Provider
      value={{
        indexerSet,
        network: indexerSet.network,
        section,
        tokenSymbol: getTokenSymbol(indexerSet.network),
        tokenDecimals: getTokenDecimals(indexerSet.network),
        setIndexerSet,
        setSection,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </IndexersContext.Provider>
  )
}
