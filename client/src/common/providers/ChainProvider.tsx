import { FC, createContext, ReactNode, useState, useEffect } from 'react'
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'
import { ApiPromise, WsProvider } from '@polkadot/api'

// chains
import chains from 'layout/config/chains.json'

export type Chain = {
  title: string
  urls: {
    api: string
    page: string
  }
  isDomain: boolean
}

export type ChainContextValue = {
  selectedChain: Chain
  setSelectedChain: (children: Chain) => void
  selectedDomain: string
  setSelectedDomain: (children: string) => void
  chains: Chain[]
  connectWallet(): Promise<void>
  selectedAccount: InjectedAccountWithMeta | undefined
  api: ApiPromise | undefined
  injectedExtension: InjectedExtension | undefined
}

export const ChainContext = createContext<ChainContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const ChainProvider: FC<Props> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState(chains[0])
  const [selectedDomain, setSelectedDomain] = useState('consensus')
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>()
  const [injectedExtension, setInjectedExtension] = useState<InjectedExtension>()
  const [api, setApi] = useState<ApiPromise>()

  const client = new ApolloClient({
    link: ApolloLink.from([new RetryLink(), new HttpLink({ uri: selectedChain.urls.api })]),
    cache: new InMemoryCache(),
  })

  const setup = async () => {
    const wsProvider = new WsProvider(process.env.REACT_APP_RPC_URL)
    const api = await ApiPromise.create({ provider: wsProvider })

    await api.isReady

    setApi(api)
  }

  useEffect(() => {
    setup()
  }, [])

  async function connectWallet() {
    const extensions = await web3Enable('Polki')

    if (!extensions) {
      throw Error('No Extension Found')
    }

    setInjectedExtension(extensions[0])

    const allAccounts = await web3Accounts()

    if (allAccounts.length === 1) {
      setSelectedAccount(allAccounts[0])
    }
  }

  return (
    <ChainContext.Provider
      value={{
        setSelectedChain,
        selectedChain,
        selectedDomain,
        setSelectedDomain,
        chains,
        connectWallet,
        selectedAccount,
        api,
        injectedExtension,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ChainContext.Provider>
  )
}
