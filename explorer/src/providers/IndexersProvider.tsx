'use client'

import { createHttpLink, from, split } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'
import { NetworkId } from '@autonomys/auto-utils'
import { Indexer, defaultIndexer } from 'constants/indexers'
import { Routes } from 'constants/routes'
import { createClient } from 'graphql-ws'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, createContext, useCallback, useState } from 'react'
import { logError } from 'utils/log'
import { getTokenDecimals, getTokenSymbol } from 'utils/network'

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
  const httpLink = createHttpLink({
    uri: () => indexerSet.indexer,
  })

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: indexerSet.indexer.replace('http', 'ws'),
            // TODO: might need to
            retryAttempts: Infinity,
            shouldRetry: () => true,
            keepAlive: 10000,
          }),
        )
      : null

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
    console.log('operation', operation)
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        logError(
          pathname,
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, [Network]: ${indexerSet.network}, [Section]: ${section}`,
        ),
      )
    if (networkError)
      logError(
        pathname,
        `[Network error]: ${networkError}, [Network]: ${indexerSet.network}, [Section]: ${section}`,
      )
    return forward(operation)
  })

  const link =
    typeof window !== 'undefined' && wsLink != null
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query)
            return (
              definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            )
          },
          split(({ query }) => getMainDefinition(query).name?.kind === 'Name', wsLink),
          httpLink,
        )
      : httpLink

  const client = new ApolloClient({
    link: from([errorLink, new RetryLink(), link]),
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
  })

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
      <ApolloNextAppProvider makeClient={() => client}>{children}</ApolloNextAppProvider>
    </IndexersContext.Provider>
  )
}
