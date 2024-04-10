'use client'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { FC, ReactNode, createContext, useState } from 'react'

// chains
import { chains } from 'constants/chains'

export type Chain = {
  title: string
  urls: {
    api: string
    page: string
    rpc?: string
  }
  isDomain: boolean
}

export type ChainContextValue = {
  selectedChain: Chain
  setSelectedChain: (children: Chain) => void
  selectedDomain: string
  setSelectedDomain: (children: string) => void
  chains: Chain[]
}

export const ChainContext = createContext<ChainContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

interface SelectedChainProps extends Props {
  selectedChain: Chain
}

const squidLinks = {
  general: 'https://squid.green.gemini-3h.subspace.network/graphql',
  rewards: 'http://localhost:4550/graphql',
  account: 'https://account.squid.green.gemini-3h.subspace.network/graphql',
}

export const SelectedChainProvider: FC<SelectedChainProps> = ({ selectedChain, children }) => {
  const httpLink = createHttpLink({
    uri: ({ getContext }) => {
      const { clientName } = getContext()

      if (clientName === 'general') return squidLinks.general
      if (clientName === 'rewards') return squidLinks.rewards
      if (clientName === 'account') return squidLinks.account
      if (!clientName) return selectedChain.urls.api
    },
  })

  const client = new ApolloClient({
    link: ApolloLink.from([new RetryLink(), httpLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export const ChainProvider: FC<Props> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0])
  const [selectedDomain, setSelectedDomain] = useState('consensus')

  return (
    <ChainContext.Provider
      value={{
        selectedChain,
        setSelectedChain,
        selectedDomain,
        setSelectedDomain,
        chains,
      }}
    >
      <SelectedChainProvider selectedChain={selectedChain}>{children}</SelectedChainProvider>
    </ChainContext.Provider>
  )
}
