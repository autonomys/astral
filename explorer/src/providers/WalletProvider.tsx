'use client'

import { activate, ApiPromise, createConnection, networks } from '@autonomys/auto-utils'
import { Domain } from '@autonomys/auto-utils/dist/types/domain'
import { sendGAEvent } from '@next/third-parties/google'
import { InjectedExtension } from '@polkadot/extension-inject/types'
import { getWalletBySource } from '@talismn/connect-wallets'
import { WalletType } from 'constants/wallet'
import { getCsrfToken, getSession, signIn, signOut, useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { usePreferencesStates } from 'states/preferences'
import type { ChainParam } from 'types/app'
import type { WalletAccountWithType } from 'types/wallet'
import { formatAddress } from 'utils/formatAddress'

interface DomainWithApi extends Domain {
  api: ApiPromise
}
export type DomainsApis = { [key: string]: DomainWithApi }

export type WalletContextValue = {
  api: ApiPromise | undefined
  domainsApis: DomainsApis
  isReady: boolean
  accounts: WalletAccountWithType[] | undefined | null
  error: Error | null
  injector: InjectedExtension | null
  actingAccount: WalletAccountWithType | undefined
  extensions: InjectedExtension[] | undefined
  disconnectWallet: () => void
  setActingAccount: (account: WalletAccountWithType) => void
  setPreferredExtension: (extension: string | null) => void
  preferredExtension: string | null
  subspaceAccount: string | undefined
  sessionSubspaceAccount: string | undefined
  handleSelectFirstWalletFromExtension: (source: string) => Promise<void>
  changeAccount: (account: WalletAccountWithType) => void
}

export const WalletContext = createContext<WalletContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const WalletProvider: FC<Props> = ({ children }) => {
  const { chain } = useParams<ChainParam>()
  const [api, setApi] = useState<ApiPromise>()
  const [domainsApis, setDomainsApis] = useState<DomainsApis>({})
  const [isReady, setIsReady] = useState(false)
  const [accounts, setAccounts] = useState<WalletAccountWithType[] | null | undefined>(undefined)
  const [extensions] = useState<InjectedExtension[] | undefined>(undefined)
  const [error, setError] = useState<Error | null>(null)
  const [injector, setInjector] = useState<InjectedExtension | null>(null)
  const [actingAccount, setActingAccount] = useState<WalletAccountWithType | undefined>(undefined)
  const [subspaceAccount, setSubspaceAccount] = useState<string | undefined>(undefined)

  const preferredExtension = usePreferencesStates((state) => state.extension)
  const preferredAccount = usePreferencesStates((state) => state.account)
  const proofOfOwnership = usePreferencesStates((state) => state.proofOfOwnership)
  const setPreferredExtension = usePreferencesStates((state) => state.setExtension)
  const setPreferredAccount = usePreferencesStates((state) => state.setAccount)
  const setProofOfOwnership = usePreferencesStates((state) => state.setProofOfOwnership)
  const clearPreferences = usePreferencesStates((state) => state.clearWalletPreferences)

  const { data: session } = useSession()
  const sessionSubspaceAccount = useMemo(() => session?.user?.subspace?.account, [session])

  const prepareApi = useCallback(async () => {
    try {
      return await activate({ networkId: chain })
    } catch (error) {
      console.error('Failed to prepare API for chain', chain, 'error:', error)
    }
  }, [chain])

  const prepareDomainsApis = useCallback(async () => {
    try {
      const network = networks.find((network) => network.id === chain)
      if (!network || !network.domains || network.domains.length === 0) return
      const domains = network.domains

      const unInitializedDomainApis = await Promise.all(
        domains.map((d) =>
          createConnection(d.rpcUrls.map((rpc) => rpc.replace('https://', 'wss://'))),
        ),
      )
      const domainApis = await Promise.all(unInitializedDomainApis.map((d) => d.isReady))

      return domains.reduce(
        (acc, d, index) => ({
          ...acc,
          [d.domainId]: { ...d, api: domainApis[index] },
        }),
        {},
      )
    } catch (error) {
      console.error('Failed to prepare domains API for chain', chain, 'error:', error)
    }
  }, [chain])

  const setup = useCallback(async () => {
    setApi(await prepareApi())
    const domainsApis = await prepareDomainsApis()
    if (domainsApis) setDomainsApis(domainsApis)
  }, [prepareApi, prepareDomainsApis])

  const signOutSessionOnAccountChange = useCallback(async (subspaceAccount?: string) => {
    const session = await getSession()
    if (!subspaceAccount || (session && session?.user?.subspace?.account !== subspaceAccount))
      await signOut({ redirect: false })
  }, [])

  const _changeAccount = useCallback(
    async (account: WalletAccountWithType, newInjector: InjectedExtension) => {
      setInjector(newInjector)
      try {
        const type =
          account.type === WalletType.subspace || (account as { type: string }).type === 'sr25519'
            ? WalletType.subspace
            : WalletType.ethereum

        const _subspaceAccount = formatAddress(account.address)

        // Only proceed with sign in if we have a subspace account and injector
        if (_subspaceAccount && newInjector) {
          // Get the current session to check if we need to sign in
          const currentSession = await getSession()

          // Only sign in if the account is different from the current session
          if (
            !currentSession?.user?.subspace ||
            currentSession.user.subspace.account !== _subspaceAccount
          ) {
            if (proofOfOwnership && proofOfOwnership.address === account.address)
              await signIn('subspace', {
                redirect: false,
                account: _subspaceAccount,
                message: proofOfOwnership.message,
                signature: proofOfOwnership.signature,
              })
            else {
              const csrfToken = await getCsrfToken()
              const message = JSON.stringify({ accountId: _subspaceAccount, csrfToken })
              const signature =
                newInjector.signer.signRaw &&
                (await newInjector.signer.signRaw({
                  address: account.address,
                  type: 'bytes',
                  data: message,
                }))

              if (!signature) throw new Error('No signature')

              setProofOfOwnership({
                address: account.address,
                message,
                signature: signature.signature,
              })

              await signIn('subspace', {
                redirect: false,
                account: _subspaceAccount,
                message,
                signature: signature.signature,
                walletSource: account.source,
                walletType: account.type,
              })
            }
          }
        }

        // Update the account state after authentication
        setActingAccount({
          ...account,
          type,
        })
        setSubspaceAccount(_subspaceAccount)
        setPreferredAccount(account.address)
        await setup()
        setIsReady(true)

        sendGAEvent({
          event: 'wallet_select_account',
          value: `source:${account.source}`,
        })
      } catch (error) {
        console.error('Failed to change account', error)
      }
    },
    [proofOfOwnership, setPreferredAccount, setProofOfOwnership, setup],
  )

  const changeAccount = useCallback(
    (account: WalletAccountWithType) => injector && _changeAccount(account, injector),
    [_changeAccount, injector],
  )

  const disconnectWallet = useCallback(async () => {
    setInjector(null)
    setAccounts([])
    setActingAccount(undefined)
    setSubspaceAccount(undefined)
    clearPreferences()
    setIsReady(false)
    await signOutSessionOnAccountChange()
    sendGAEvent('event', 'wallet_disconnect')
  }, [clearPreferences, signOutSessionOnAccountChange])

  const handleGetWalletFromExtension = useCallback(
    async (source: string) => {
      const wallet = getWalletBySource(source)
      if (wallet) {
        await wallet.enable(process.env.NEXT_PUBLIC_TALESMAN_DAPP_NAME || 'Autonomy Block Explorer')
        if (wallet.extension) setInjector(wallet.extension)
        const walletAccounts = (await wallet.getAccounts()) as WalletAccountWithType[]
        setAccounts(walletAccounts)
        setPreferredExtension(source)
        sendGAEvent({
          event: 'wallet_get_wallet',
          value: `source:${source}`,
        })
        return { walletAccounts, newInjector: wallet.extension }
      }
      return { walletAccounts: [], newInjector: null }
    },
    [setPreferredExtension],
  )

  const handleSelectFirstWalletFromExtension = useCallback(
    async (source: string) => {
      const { walletAccounts, newInjector } = await handleGetWalletFromExtension(source)
      if (!walletAccounts || walletAccounts.length === 0) return
      const mainAccount = walletAccounts.find((account) => account.source === source)
      if (mainAccount) _changeAccount(mainAccount, newInjector)
    },
    [handleGetWalletFromExtension, _changeAccount],
  )

  const handleConnectToExtensionAndAccount = useCallback(
    async (address: string, source: string) => {
      if (injector) return

      const { walletAccounts, newInjector } = await handleGetWalletFromExtension(source)
      if (!walletAccounts || walletAccounts.length === 0) return
      const mainAccount = walletAccounts.find((account) => account.address === address)
      if (mainAccount && newInjector) _changeAccount(mainAccount, newInjector)
      sendGAEvent({
        event: 'wallet_auto_connect_account',
        value: `source:${source}`,
      })
    },
    [handleGetWalletFromExtension, _changeAccount, injector],
  )

  useEffect(() => {
    const initializeWallet = async () => {
      if (actingAccount?.source) {
        try {
          const { web3FromSource } = await import('@polkadot/extension-dapp')
          const newInjector = await web3FromSource(actingAccount.source)
          setInjector(newInjector)
          await setup()
        } catch (e) {
          setError(e as Error)
        }
      }
    }

    initializeWallet()
  }, [actingAccount, setup])

  useEffect(() => {
    const shouldConnect = !actingAccount && preferredExtension && preferredAccount && !injector

    if (shouldConnect) {
      handleConnectToExtensionAndAccount(preferredAccount, preferredExtension)
    }
  }, [
    actingAccount,
    preferredAccount,
    preferredExtension,
    handleConnectToExtensionAndAccount,
    injector,
  ])

  return (
    <WalletContext.Provider
      value={{
        api,
        domainsApis,
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
        sessionSubspaceAccount,
        handleSelectFirstWalletFromExtension,
        changeAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
