import { FC, useState, createContext, useContext, ReactNode } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// chains
import chains from 'layout/config/chains.json'

export type Chain = {
  title: string
  urls: {
    api: string
    page: string
  }
}

type Value = {
  selectedChain: Chain
  setSelectedChain: (children: Chain) => void
  chains: Chain[]
}

const ChainContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const ChainProvider: FC<Props> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0])

  const client = new ApolloClient({
    uri: selectedChain.urls.api,
    cache: new InMemoryCache(),
  })

  return (
    <ChainContext.Provider
      value={{
        setSelectedChain,
        selectedChain,
        chains,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ChainContext.Provider>
  )
}

export const useDomains = (): Value => {
  const context = useContext(ChainContext)

  if (!context) throw new Error('ChainContext must be used within ChainProvider')

  return context
}
