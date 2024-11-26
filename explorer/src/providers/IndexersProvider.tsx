'use client'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { NetworkId } from '@autonomys/auto-utils'
import { Indexer, defaultIndexer } from 'constants/indexers'
import { Routes } from 'constants/routes'
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from 'react'
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
  const httpLink = createHttpLink({
    uri: () => indexerSet.indexer,
  })

  const client = useMemo(
    () =>
      new ApolloClient({
        link: ApolloLink.from([new RetryLink(), httpLink]),
        cache: new InMemoryCache(),
      }),
    [httpLink],
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
