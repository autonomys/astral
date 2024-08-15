'use client'

import { Routes } from '@/constants'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Operation,
  createHttpLink,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { NetworkId } from '@autonomys/auto-utils'
import { Indexer, defaultIndexer } from 'constants/indexers'
import Cookies from 'js-cookie'
import { FC, ReactNode, createContext, useCallback, useState } from 'react'

export type ChainContextValue = {
  indexerSet: Indexer
  network: NetworkId
  section: Routes
  isEvm: boolean
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

export const SelectedChainProvider: FC<SelectedChainProps> = ({ indexerSet, children }) => {
  const httpLink = createHttpLink({
    uri: ({ getContext }: Operation) => {
      const { clientName } = getContext()

      if (clientName === 'leaderboard' && indexerSet.squids.leaderboard)
        return indexerSet.squids.leaderboard
      if (clientName === 'staking' && indexerSet.squids.staking) return indexerSet.squids.staking

      return indexerSet.squids.old
    },
  })

  const client = new ApolloClient({
    link: ApolloLink.from([new RetryLink(), httpLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export const ChainProvider: FC<Props> = ({ children }) => {
  const [indexerSet, _setIndexerSet] = useState<Indexer>(defaultIndexer)
  const [network, setNetwork] = useState<NetworkId>(defaultIndexer.network)
  const [section, setSection] = useState<Routes>(Routes.consensus)

  const setIndexerSet = useCallback(
    (indexer: Indexer) => {
      Cookies.set('selected-network', indexer.network, { expires: 1 })
      _setIndexerSet(indexer)
      setNetwork(indexer.network)
    },
    [_setIndexerSet],
  )

  return (
    <ChainContext.Provider
      value={{
        indexerSet,
        network,
        section,
        isEvm: section === Routes.nova,
        setIndexerSet,
        setSection,
      }}
    >
      <SelectedChainProvider indexerSet={indexerSet}>{children}</SelectedChainProvider>
    </ChainContext.Provider>
  )
}
