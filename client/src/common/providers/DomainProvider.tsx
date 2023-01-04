import { FC, useState, createContext, useContext, ReactNode } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

type Value = {
  domainApiAddress: string
  updateDomainAddress: (apiAddress: string) => void
}

const DomainContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const DomainProvider: FC<Props> = ({ children }) => {
  const [domainApiAddress, setDomainApiAddress] = useState(process.env.REACT_APP_GRAPHQL_API_URL)

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
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </DomainContext.Provider>
  )
}

export const useDomain = (): Value => {
  const context = useContext(DomainContext)

  if (!context) throw new Error('DomainContext must be used within DomainProvider')

  return context
}
