'use client'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Operation,
  createHttpLink,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { chains, squidLinks } from 'constants/chains'
import Cookies from 'js-cookie'
import { FC, ReactNode, createContext, useCallback, useState } from 'react'

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
  const httpLink = createHttpLink({
    uri: ({ getContext }: Operation) => {
      const { clientName } = getContext()

      if (clientName === 'general') return squidLinks.general
      if (clientName === 'rewards') return squidLinks.rewards
      if (clientName === 'account') return squidLinks.account

      return selectedChain.urls.api
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

  const handleSelectChain = useCallback(
    (chain: Chain) => {
      if (chain) Cookies.set('selectedChain', chain.urls.page, { expires: 1 })
      setSelectedChain(chain)
    },
    [setSelectedChain],
  )

  return (
    <ChainContext.Provider
      value={{
        selectedChain,
        setSelectedChain: handleSelectChain,
        selectedDomain,
        setSelectedDomain,
        chains,
      }}
    >
      <SelectedChainProvider selectedChain={selectedChain}>{children}</SelectedChainProvider>
    </ChainContext.Provider>
  )
}
