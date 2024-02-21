import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { FC, ReactNode, createContext, useState } from 'react'

// chains
import chains from 'layout/config/chains.json'

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

export const ChainProvider: FC<Props> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0])
  const [selectedDomain, setSelectedDomain] = useState('consensus')

  const client = new ApolloClient({
    link: ApolloLink.from([new RetryLink(), new HttpLink({ uri: selectedChain.urls.api })]),
    cache: new InMemoryCache(),
  })

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
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ChainContext.Provider>
  )
}
