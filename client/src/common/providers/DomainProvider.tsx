import { FC, useState, createContext, useContext, ReactNode } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// domains
import domains from 'layout/config/domain.json'

type Value = {
  domainApiAddress: string
  updateDomainAddress: (apiAddress: string) => void
  domains: {
    title: string
    urls: {
      api: string
    }
  }[]
}

const DomainContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const DomainProvider: FC<Props> = ({ children }) => {
  const [domainApiAddress, setDomainApiAddress] = useState(domains[0].urls.api)

  const client = new ApolloClient({
    uri: domainApiAddress,
    cache: new InMemoryCache(),
  })

  const updateDomainAddress = (apiAddress: string) => {
    setDomainApiAddress(apiAddress)
  }

  return (
    <DomainContext.Provider
      value={{
        updateDomainAddress: updateDomainAddress,
        domainApiAddress: domainApiAddress,
        domains,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </DomainContext.Provider>
  )
}

export const useDomains = (): Value => {
  const context = useContext(DomainContext)

  if (!context) throw new Error('DomainContext must be used within DomainProvider')

  return context
}
