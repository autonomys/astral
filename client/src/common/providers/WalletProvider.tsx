import { ApiPromise, WsProvider } from '@polkadot/api'
import { InjectedExtension } from '@polkadot/extension-inject/types'
import { getWalletBySource } from '@subwallet/wallet-connect/dotsama/wallets'
import { WalletAccount } from '@subwallet/wallet-connect/types'
import { formatAddress } from 'common/helpers/formatAddress'
import { FC, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react'

export type WalletContextValue = {
  api: ApiPromise | undefined
  isReady: boolean
  accounts: WalletAccount[] | undefined | null
  error: Error | null
  injector: InjectedExtension | null
  actingAccount: WalletAccount | undefined
  extensions: InjectedExtension[] | undefined
  setActingAccountIdx: (idx: number) => void
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
  const [api, setApi] = useState<ApiPromise>()
  const [isReady, setIsReady] = useState(false)
  const [accounts, setAccounts] = useState<WalletAccount[] | null | undefined>(undefined)
  const [extensions] = useState<InjectedExtension[] | undefined>(undefined)
  const [preferredExtension, setPreferredExtension] = useState<string | undefined>(undefined)
  const [actingAccountIdx, setActingAccountIdx] = useState<number>(0)
  const [error, setError] = useState<Error | null>(null)
  const [injector, setInjector] = useState<InjectedExtension | null>(null)
  const [actingAccount, setActingAccount] = useState<WalletAccount | undefined>(undefined)
  const [subspaceAccount, setSubspaceAccount] = useState<string | undefined>(undefined)

  useMemo(() => {
    const selectedAccount =
      accounts && accounts.find((account) => account.source === preferredExtension)
    if (selectedAccount) {
      setActingAccount(selectedAccount)
      setSubspaceAccount(formatAddress(selectedAccount?.address))
    }
  }, [accounts, preferredExtension])

  const setup = async () => {
    const wsProvider = new WsProvider(process.env.REACT_APP_RPC_URL)
    const api = await ApiPromise.create({ provider: wsProvider })

    await api.isReady

    setApi(api)
  }

  const changeAccount = (account: WalletAccount) => {
    setActingAccount(account)
    setSubspaceAccount(formatAddress(account.address))
    const newInjector = extensions?.find((extension) => extension.name === account.source)
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

  const handleSelectFirstWalletFromExtension = useCallback(async (source: string) => {
    const wallet = getWalletBySource(source)
    if (wallet) {
      await wallet.enable()
      if (wallet.extension) setInjector(wallet.extension)
      const walletAccounts = await wallet.getAccounts()
      setAccounts(walletAccounts)
      setPreferredExtension(source)
      const mainAccount = walletAccounts?.find((account) => account.source === source)
      if (mainAccount) {
        setActingAccount(mainAccount)
        setSubspaceAccount(formatAddress(mainAccount.address))
        setIsReady(true)
      }
    }
  }, [])

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
