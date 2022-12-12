import { FC, useState, createContext, useContext, ReactNode } from 'react'

type Value = {
  domainApiAddress: string
  domainWSAddress: string
  updateDomainAddress: (apiAddress: string, wsAddress: string) => void
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
  const [domainWSAddress, setDomainWSAddress] = useState(process.env.REACT_APP_GRAPHQL_API_WS)

  const updateDomainAddress = (apiAddress: string, wsAddress: string) => {
    setDomainApiAddress(apiAddress)
    setDomainWSAddress(wsAddress)
  }

  return (
    <DomainContext.Provider
      value={{
        updateDomainAddress: updateDomainAddress,
        domainApiAddress: domainApiAddress,
        domainWSAddress: domainWSAddress,
      }}
    >
      {children}
    </DomainContext.Provider>
  )
}

export const useDomain = (): Value => {
  const context = useContext(DomainContext)

  if (!context) throw new Error('DomainContext must be used within DomainProvider')

  return context
}
