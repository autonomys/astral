'use client'

import { ApiPromise, WsProvider } from '@polkadot/api'
import { InjectedExtension } from '@polkadot/extension-inject/types'
import { getWalletBySource } from '@subwallet/wallet-connect/dotsama/wallets'
import { WalletAccount } from '@subwallet/wallet-connect/types'
import { chains } from 'constants/chains'
import { useSafeLocalStorage } from 'hooks/useSafeLocalStorage'
import { signOut, useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { formatAddress } from 'utils//formatAddress'

export type WalletContextValue = {
  api: { [key: string]: ApiPromise } | undefined
  isReady: boolean
  accounts: WalletAccount[] | undefined | null
  error: Error | null
  injector: InjectedExtension | null
  actingAccount: WalletAccount | undefined
  extensions: InjectedExtension[] | undefined
  disconnectWallet: () => void
  setActingAccount: (account: WalletAccount) => void
  setPreferredExtension: (extension: string) => void
  preferredExtension: string | undefined
  subspaceAccount: string | undefined
  handleSelectFirstWalletFromExtension: (source: string) => Promise<void>
  changeAccount: (account: WalletAccount) => void
}

export const WalletContext = createContext<WalletContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const WalletProvider: FC<Props> = ({ children }) => {
  const { data: session } = useSession()
  const [api, setApi] = useState<{ [key: string]: ApiPromise }>()
  const [isReady, setIsReady] = useState(false)
  const [accounts, setAccounts] = useState<WalletAccount[] | null | undefined>(undefined)
  const [extensions] = useState<InjectedExtension[] | undefined>(undefined)
  const [error, setError] = useState<Error | null>(null)
  const [injector, setInjector] = useState<InjectedExtension | null>(null)
  const [actingAccount, setActingAccount] = useState<WalletAccount | undefined>(undefined)
  const [subspaceAccount, setSubspaceAccount] = useState<string | undefined>(undefined)
  const [preferredAccount, setPreferredAccount] = useSafeLocalStorage('localAccount', null)
  const [preferredExtension, setPreferredExtension] = useSafeLocalStorage('extensionSource', null)

  const prepareApi = useCallback(async (chain: (typeof chains)[0]) => {
    const wsProvider = new WsProvider(chain.urls.rpc)
    const api = await ApiPromise.create({ provider: wsProvider })
    await api.isReady
    return api
  }, [])

  const setup = useCallback(async () => {
    const rpcSupportedChains = chains.filter((chain) => chain.urls.rpc)

    const apis = await Promise.all(
      rpcSupportedChains.map(async (chain) => {
        return {
          [chain.urls.page]: await prepareApi(chain),
        }
      }),
    )

    setApi(apis.reduce((acc, cur) => ({ ...acc, ...cur }), {}))
  }, [prepareApi])

  const changeAccount = useCallback(
    (account: WalletAccount) => {
      setActingAccount(account)
      const _subspaceAccount = formatAddress(account.address)
      setSubspaceAccount(_subspaceAccount)
      setPreferredAccount(account.address)
      const newInjector = extensions?.find((extension) => extension.name === account.source)
      if (newInjector) setInjector(newInjector)
      setIsReady(true)
      if (session && session.user) signOut({ redirect: false })
    },
    [extensions, session, setPreferredAccount],
  )

  const disconnectWallet = useCallback(() => {
    setInjector(null)
    setAccounts([])
    setActingAccount(undefined)
    setSubspaceAccount(undefined)
    setPreferredAccount(null)
    setPreferredExtension(null)
    setIsReady(false)
  }, [setInjector, setAccounts, setPreferredAccount, setPreferredExtension])

  const handleGetWalletFromExtension = useCallback(
    async (source: string) => {
      const wallet = getWalletBySource(source)
      if (wallet) {
        await wallet.enable()
        if (wallet.extension) setInjector(wallet.extension)
        const walletAccounts = await wallet.getAccounts()
        setAccounts(walletAccounts)
        setPreferredExtension(source)
        return walletAccounts
      }
    },
    [setPreferredExtension],
  )

  const handleSelectFirstWalletFromExtension = useCallback(
    async (source: string) => {
      const walletAccounts = await handleGetWalletFromExtension(source)
      if (!walletAccounts || walletAccounts.length === 0) return
      const mainAccount = walletAccounts.find((account) => account.source === source)
      if (mainAccount) changeAccount(mainAccount)
    },
    [handleGetWalletFromExtension, changeAccount],
  )

  const handleConnectToExtensionAndAccount = useCallback(
    async (address: string, source: string) => {
      const walletAccounts = await handleGetWalletFromExtension(source)
      if (!walletAccounts || walletAccounts.length === 0) return
      const mainAccount = walletAccounts.find((account) => account.address === address)
      if (mainAccount) changeAccount(mainAccount)
    },
    [handleGetWalletFromExtension, changeAccount],
  )

  useEffect(() => {
    // This effect is used to get the injector from the selected account
    // and is triggered when the accounts or the actingAccountIdx change
    const getInjector = async () => {
      const { web3FromSource } = await import('@polkadot/extension-dapp')

      if (actingAccount?.source) {
        try {
          const injector = await web3FromSource(actingAccount?.source)

          setInjector(injector)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          setError(e)
        }
      }
    }

    getInjector()
  }, [actingAccount])

  useEffect(() => {
    if (!injector) return
    setup()
  }, [injector, setup])

  useEffect(() => {
    if (!actingAccount && preferredExtension && preferredAccount)
      handleConnectToExtensionAndAccount(preferredAccount, preferredExtension)
  }, [actingAccount, preferredAccount, preferredExtension, handleConnectToExtensionAndAccount])

  // This effect is used to mock the wallet when the environment variables are set in the .env file
  useEffect(() => {
    if (
      process.env.REACT_APP_MOCK_WALLET &&
      process.env.REACT_APP_MOCK_WALLET_ADDRESS &&
      process.env.REACT_APP_MOCK_WALLET_SOURCE
    ) {
      const mockAccount = {
        address: process.env.REACT_APP_MOCK_WALLET_ADDRESS,
        source: process.env.REACT_APP_MOCK_WALLET_SOURCE,
      }
      setActingAccount(mockAccount)
      setAccounts([mockAccount])
      setSubspaceAccount(formatAddress(process.env.REACT_APP_MOCK_WALLET_ADDRESS))
      setIsReady(true)
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        api,
        accounts,
        actingAccount,
        isReady,
        error,
        injector,
        disconnectWallet,
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
