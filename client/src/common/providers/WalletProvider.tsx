import { ApiPromise, WsProvider } from '@polkadot/api'
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'
import { formatAddress } from 'common/helpers/formatAddress'
import { documentReadyPromise } from 'common/hooks/utils'
import { FC, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react'

export type WalletContextValue = {
  api: ApiPromise | undefined
  isReady: boolean
  accounts: InjectedAccountWithMeta[] | undefined
  error: Error | null
  injector: InjectedExtension | null
  actingAccount: InjectedAccountWithMeta | undefined
  extensions: InjectedExtension[] | undefined
  setActingAccountIdx: (idx: number) => void
  disconnectWallet: () => void
  connectWallet: () => void
  setActingAccount: (account: InjectedAccountWithMeta) => void
  setPreferredExtension: (extension: string) => void
  preferredExtension: string | undefined
  subspaceAccount: string | undefined
  handleSelectFirstWalletFromExtension: (source: string) => Promise<void>
  changeAccount: (account: InjectedAccountWithMeta) => void
}

export const WalletContext = createContext<WalletContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const WalletProvider: FC<Props> = ({ children }) => {
  const [api, setApi] = useState<ApiPromise>()
  const [isReady, setIsReady] = useState(false)
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | undefined>(undefined)
  const [extensions, setExtensions] = useState<InjectedExtension[] | undefined>(undefined)
  const [preferredExtension, setPreferredExtension] = useState<string | undefined>(undefined)
  const [actingAccountIdx, setActingAccountIdx] = useState<number>(0)
  const [error, setError] = useState<Error | null>(null)
  const [injector, setInjector] = useState<InjectedExtension | null>(null)
  const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta | undefined>(undefined)
  const [subspaceAccount, setSubspaceAccount] = useState<string | undefined>(undefined)

  useMemo(() => {
    const selectedAccount =
      accounts && accounts.find((account) => account.meta.source === preferredExtension)
    setActingAccount(selectedAccount)
    setSubspaceAccount(formatAddress(selectedAccount?.address))
  }, [accounts, preferredExtension])

  const setup = async () => {
    const wsProvider = new WsProvider(process.env.REACT_APP_RPC_URL)
    const api = await ApiPromise.create({ provider: wsProvider })

    await api.isReady

    setApi(api)
  }

  const changeAccount = (account: InjectedAccountWithMeta) => {
    setActingAccount(account)
    setSubspaceAccount(formatAddress(account.address))
    const newInjector = extensions?.find((extension) => extension.name === account.meta.source)
    if (newInjector) {
      setInjector(newInjector)
    }
  }

  const disconnectWallet = useCallback(() => {
    setInjector(null)
    setAccounts([])
    setActingAccount(undefined)
    setIsReady(false)
  }, [setInjector, setAccounts])

  const connectWallet = useCallback(async () => {
    // This effect is used to setup the browser extension
    const extensionSetup = async () => {
      const extensionDapp = await import('@polkadot/extension-dapp')
      const { web3AccountsSubscribe, web3Enable } = extensionDapp

      const injectedPromise = documentReadyPromise(() => web3Enable('Subspace Astral'))
      const extensions = await injectedPromise

      setExtensions(extensions)

      if (extensions.length === 0) {
        return
      }

      if (accounts && accounts?.length > 0) {
        setIsReady(true)
      } else {
        // we subscribe to any account change
        // note that `web3AccountsSubscribe` returns the function to unsubscribe
        const unsubscribe = await web3AccountsSubscribe((injectedAccounts) => {
          setAccounts(injectedAccounts)
        })

        return () => unsubscribe && unsubscribe()
      }
    }

    if (!isReady) {
      extensionSetup()
    }
  }, [accounts, isReady])

  const handleSelectFirstWalletFromExtension = useCallback(
    async (source: string) => {
      setPreferredExtension(source)
      await connectWallet()
      const mainAccount = accounts?.find((account) => account.meta.source === source)
      if (mainAccount) {
        setActingAccount(mainAccount)
        setSubspaceAccount(formatAddress(mainAccount.address))
      }
    },
    [accounts, connectWallet],
  )

  useEffect(() => {
    // This effect is used to get the injector from the selected account
    // and is triggered when the accounts or the actingAccountIdx change
    const getInjector = async () => {
      const { web3FromSource } = await import('@polkadot/extension-dapp')
      // const actingAccount =
      //   accounts && actingAccountIdx !== undefined ? accounts[actingAccountIdx] : undefined
      if (actingAccount?.meta.source) {
        try {
          const injector = await web3FromSource(actingAccount?.meta.source)

          setInjector(injector)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          setError(e)
        }
      }
    }

    getInjector()
  }, [actingAccountIdx, accounts, actingAccount])

  useEffect(() => {
    if (!injector) return
    setup()
  }, [injector])

  return (
    <WalletContext.Provider
      value={{
        api,
        accounts,
        actingAccount,
        setActingAccountIdx,
        isReady,
        error,
        injector,
        disconnectWallet,
        connectWallet,
        extensions,
        setActingAccount,
        preferredExtension,
        setPreferredExtension,
        subspaceAccount,
        handleSelectFirstWalletFromExtension,
        changeAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
