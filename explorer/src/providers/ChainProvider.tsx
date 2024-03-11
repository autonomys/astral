'use client'

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
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

export const SelectedChainProvider: FC<SelectedChainProps> = ({ selectedChain, children }) => {
  const client = new ApolloClient({
    link: ApolloLink.from([new RetryLink(), new HttpLink({ uri: selectedChain.urls.api })]),
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
