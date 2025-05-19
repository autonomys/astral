'use client'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { NetworkId } from '@autonomys/auto-utils'
import { Indexer, defaultIndexer } from 'constants/indexers'
import { Routes } from 'constants/routes'
import { createClient } from 'graphql-ws'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from 'react'
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

export const IndexersProvider: FC<Props> = ({ children }) => {
  const [indexerSet, _setIndexerSet] = useState<Indexer>(defaultIndexer)
  const [section, setSection] = useState<Routes>(Routes.consensus)
  const pathname = usePathname()

  // HTTP link for queries and mutations
  const httpLink = createHttpLink({
    uri: () => indexerSet.indexer,
  })

  // WebSocket link for subscriptions
  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: () => {
              // Convert http(s) to ws(s)
              const wsUrl = indexerSet.indexer.replace(/^http/, 'ws')
              return wsUrl
            },
          }),
        )
      : null

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        logError(
          pathname,
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, [Network]: ${indexerSet.network}, [Section]: ${section}`,
        ),
      )
    if (
      networkError &&
      !IGNORED_NETWORK_ERRORS.includes(networkError.toString()) &&
      !IGNORED_NETWORK_ERRORS.includes(networkError.message)
    )
      logError(
        pathname,
        `[Network error]: ${networkError}, [Network]: ${indexerSet.network}, [Section]: ${section}`,
      )
  })

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

  const link = ApolloLink.from([errorLink, new RetryLink(), splitLink])

  const client = useMemo(
    () =>
      new ApolloClient({
        link,
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
      }),
    [link],
  )

  const setIndexerSet = useCallback(
    (indexer: Indexer) => {
      _setIndexerSet(indexer)
    },
    [_setIndexerSet],
  )

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
