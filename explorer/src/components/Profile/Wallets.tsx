'use client'

import { WalletType } from '@/constants/wallet'
import { useProfileStates } from '@/states/profile'
import { WalletAccountWithType } from '@/types/wallet'
import { formatAddress } from '@/utils/formatAddress'
import { sendGAEvent } from '@next/third-parties/google'
import { getWalletBySource } from '@talismn/connect-wallets'
import useWallet from 'hooks/useWallet'
import { useSession } from 'next-auth/react'
import { FC, useEffect, useMemo } from 'react'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import { SmallProfileBox } from './SmallProfileBox'

export const WalletsPage: FC = () => {
  const { accounts, actingAccount, sessionSubspaceAccount } = useWallet()
  const { data: session } = useSession()
  const profile = useProfileStates((state) => state.profile)
  const wallets = useProfileStates((state) => state.wallets)
  const setShouldUpdate = useProfileStates((state) => state.setShouldUpdate)

  const unlinkedWallets = useMemo(() => {
    return accounts?.filter((account) => {
      const accountAddress =
        account.type === WalletType.subspace || (account as { type: string }).type === 'sr25519'
          ? formatAddress(account.address)
          : account.address
      return !wallets.some((wallet) => wallet.address === accountAddress)
    })
  }, [accounts, wallets])

  const linkWallet = async (wallet: WalletAccountWithType) => {
    if (!session || !session.user?.subspace) return
    const values = {
      address: formatAddress(wallet.address),
      profileId: profile.id,
      originalAccountId: sessionSubspaceAccount,
      originalMessage: session.user.subspace.message,
      originalSignature: session.user.subspace.signature,
    }

    try {
      const walletExtension = getWalletBySource(wallet.source)
      await walletExtension?.enable(
        process.env.NEXT_PUBLIC_TALESMAN_DAPP_NAME || 'Autonomy Block Explorer',
      )
      const injector = walletExtension?.extension
      if (!injector) return

      const message = JSON.stringify(values)
      const signature =
        injector.signer.signRaw &&
        (await injector.signer.signRaw({
          address: wallet.address,
          type: 'bytes',
          data: message,
        }))

      if (!signature) throw new Error('No signature')
      const response = await fetch('/api/profile/save-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values, message, signature: signature.signature }),
      })
      if (!response.ok) throw new Error('Failed to delete API key')
      setShouldUpdate(true)
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  if (actingAccount && !sessionSubspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center p-4'>
        Please connect to a Substrate compatible wallet to view your profile.{' '}
        <AccountListDropdown />
      </div>
    )

  if (!sessionSubspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center p-4'>
        Please connect your Autonomys wallet to view your profile. <WalletButton />
      </div>
    )

  return (
    <div className='flex min-h-screen w-full flex-col p-4 sm:flex-row sm:space-x-8'>
      <SmallProfileBox />

      {/* Right Side: Existing Form */}
      <div className='m-0 w-full flex-1 rounded-[20px] bg-white dark:border-none dark:bg-boxDark'>
        <div className='m-10'>
          <div className='text-2xl font-bold'>Wallets</div>
          {unlinkedWallets && unlinkedWallets.length > 0 && (
            <div className='mb-4'>
              <label htmlFor='new-key-description'>Link wallet</label>
              <p className='mt-1 text-sm text-red-500'>
                Warning: Linking an account is permanent and cannot be undone.
              </p>
              {unlinkedWallets?.map((wallet) => {
                const address =
                  wallet.type === WalletType.subspace ||
                  (wallet as { type: string }).type === 'sr25519'
                    ? formatAddress(wallet.address)
                    : wallet.address
                return (
                  <div key={address} className='flex items-center justify-between py-2'>
                    <div className='text-gray-700 dark:text-gray-300'>{address}</div>
                    <button
                      className='rounded-full bg-buttonLightFrom px-5 py-2 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent'
                      onClick={() => linkWallet(wallet)}
                    >
                      Link Wallet
                    </button>
                  </div>
                )
              })}
            </div>
          )}
          <table className='mb-4 w-full'>
            <thead>
              <tr className='font-bold'>
                <th className='text-left'>Type</th>
                <th className='text-left'>Address</th>
              </tr>
            </thead>
            <tbody>
              {wallets.length === 0 ? (
                <tr>
                  <td colSpan={3} className='text-center text-gray-500'>
                    No wallets. Link a wallet to get started.
                  </td>
                </tr>
              ) : (
                wallets.map((wallet) => (
                  <tr key={wallet.id} className='mb-4'>
                    <td className='flex-1'>{wallet.type}</td>
                    <td className='flex-1'>{wallet.address}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
