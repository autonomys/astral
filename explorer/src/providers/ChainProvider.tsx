'use client'

import { Routes } from '@/constants'
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
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from 'react'

export type ChainContextValue = {
  indexerSet: Indexer
  network: NetworkId
  section: Routes
  setIndexerSet: (children: Indexer) => void
  setSection: (section: Routes) => void
}

export const ChainContext = createContext<ChainContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

interface SelectedChainProps extends Props {
  indexerSet: Indexer
}

const SelectedChainProvider: FC<SelectedChainProps> = ({ indexerSet, children }) => {
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

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export const ChainProvider: FC<Props> = ({ children }) => {
  const [indexerSet, _setIndexerSet] = useState<Indexer>(defaultIndexer)
  const [section, setSection] = useState<Routes>(Routes.consensus)

  const setIndexerSet = useCallback(
    (indexer: Indexer) => {
      _setIndexerSet(indexer)
    },
    [_setIndexerSet],
  )

  return (
    <ChainContext.Provider
      value={{
        indexerSet,
        network: indexerSet.network,
        section,
        setIndexerSet,
        setSection,
      }}
    >
      <SelectedChainProvider indexerSet={indexerSet}>{children}</SelectedChainProvider>
    </ChainContext.Provider>
  )
}
