'use client'

import { WalletType } from '@/constants/wallet'
import { useProfileStates } from '@/states/profile'
import { WalletAccountWithType } from '@/types/wallet'
import { formatAddress } from '@/utils/formatAddress'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentDuplicateIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { sendGAEvent } from '@next/third-parties/google'
import { getWalletBySource } from '@talismn/connect-wallets'
import useWallet from 'hooks/useWallet'
import { useSession } from 'next-auth/react'
import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../common/Button'
import { Spinner } from '../common/Spinner'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import { SmallProfileBox } from './SmallProfileBox'

export const WalletsPage: FC = () => {
  const { accounts, actingAccount, sessionSubspaceAccount } = useWallet()
  const { data: session } = useSession()
  const { setShouldUpdate, profile, wallets, isLoading } = useProfileStates((state) => state)

  const [isLinking, setIsLinking] = useState<string | null>(null)
  const [walletToLink, setWalletToLink] = useState<WalletAccountWithType | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const unlinkedWallets = useMemo(() => {
    return accounts?.filter((account) => {
      const accountAddress =
        account.type === WalletType.subspace || (account as { type: string }).type === 'sr25519'
          ? formatAddress(account.address)
          : account.address
      return !wallets.some((wallet) => wallet.address === accountAddress)
    })
  }, [accounts, wallets])

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard', {
      duration: 2000,
      position: 'bottom-center',
    })
  }

  const confirmLinkWallet = (wallet: WalletAccountWithType) => {
    setWalletToLink(wallet)
    setShowConfirmModal(true)
  }

  const handleConfirmLinking = async () => {
    if (!walletToLink || !session || !session.user?.subspace) {
      setShowConfirmModal(false)
      return
    }
    setShowConfirmModal(false)
    await linkWallet(walletToLink)
  }

  const linkWallet = async (wallet: WalletAccountWithType) => {
    if (!session || !session.user?.subspace) return
    setIsLinking(wallet.address)
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
      if (!response.ok) throw new Error('Failed to link wallet')
      setShouldUpdate(true)
      toast.success('Wallet linked successfully')
    } catch (error) {
      console.error('Error linking wallet:', error)
      toast.error('Failed to link wallet')
    } finally {
      setIsLinking(null)
    }
  }

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  if (actingAccount && !sessionSubspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4 p-8 text-center'>
        <p className='text-lg font-medium'>
          Please connect to a Substrate compatible wallet to view your profile.
        </p>
        <AccountListDropdown />
      </div>
    )

  if (!sessionSubspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4 p-8 text-center'>
        <p className='text-lg font-medium'>
          Please connect your Autonomys wallet to view your profile.
        </p>
        <WalletButton />
      </div>
    )

  return (
    <>
      <div className='flex min-h-screen w-full flex-col gap-6 p-6 sm:flex-row sm:gap-8'>
        <SmallProfileBox />

        {/* Right Side: Wallets Container */}

        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center rounded-2xl bg-white shadow-sm dark:border-none dark:bg-boxDark'>
            <Spinner />
          </div>
        ) : (
          <div className='w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-sm dark:border-none dark:bg-boxDark'>
            <div className='p-6 sm:p-8'>
              <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Wallets</h1>
              <p className='mb-6 text-sm text-gray-600 dark:text-gray-300'>
                Manage your connected wallets
              </p>

              {/* Link Wallets Section */}
              {unlinkedWallets && unlinkedWallets.length > 0 && (
                <div className='mb-8 space-y-4'>
                  <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    Link your wallet to access all features
                  </h2>

                  <div className='flex items-start gap-2 rounded-md bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'>
                    <ExclamationTriangleIcon className='mt-0.5 h-5 w-5 flex-shrink-0' />
                    <p className='text-sm'>
                      Warning: Linking an account is permanent and cannot be undone.
                    </p>
                  </div>

                  <div className='space-y-2'>
                    {unlinkedWallets?.map((wallet) => {
                      const address =
                        wallet.type === WalletType.subspace ||
                        (wallet as { type: string }).type === 'sr25519'
                          ? formatAddress(wallet.address)
                          : wallet.address
                      const walletType = address?.startsWith('s') ? 'subspace' : 'sr25519'

                      return (
                        <div
                          key={address}
                          className='flex items-center justify-between rounded-lg border border-gray-100 p-4 shadow-sm dark:border-gray-700'
                        >
                          <div className='space-y-1'>
                            <div className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200'>
                              {walletType}
                            </div>
                            <div className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                              {address}
                            </div>
                          </div>
                          <Button
                            isDisabled={isLinking === wallet.address}
                            label='Link Wallet'
                            loadingLabel={'Linking...'}
                            isLoading={isLinking === wallet.address}
                            className='text-[13px]'
                            onClick={() => confirmLinkWallet(wallet)}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Connected Wallets Section */}
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                  Connected Wallets
                </h2>

                {wallets.length === 0 ? (
                  <div className='rounded-lg border border-gray-200 p-8 text-center dark:border-gray-700'>
                    <p className='text-gray-500 dark:text-gray-400'>
                      No wallets connected. Link a wallet to get started.
                    </p>
                  </div>
                ) : (
                  <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
                    <table className='w-full table-auto'>
                      <thead className='bg-gray-50 dark:bg-gray-800'>
                        <tr>
                          <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                            Type
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                            Address
                          </th>
                          <th className='w-12 px-4 py-3'></th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                        {wallets.map((wallet) => (
                          <tr key={wallet.id} className='bg-white dark:bg-boxDark'>
                            <td className='whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white'>
                              <span className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200'>
                                {wallet.type}
                              </span>
                            </td>
                            <td className='whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                              {wallet.address}
                            </td>
                            <td className='whitespace-nowrap px-4 py-3 text-right text-sm'>
                              <button
                                onClick={() => copyAddress(wallet.address)}
                                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
                                aria-label='Copy address'
                              >
                                <DocumentDuplicateIcon className='h-5 w-5' />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Transition appear show={showConfirmModal} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => setShowConfirmModal(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-boxDark'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-gray-900 dark:text-white'
                  >
                    Confirm Wallet Linking
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 dark:text-gray-300'>
                      You are about to link wallet:
                    </p>
                    <p className='mt-2 overflow-auto break-all text-sm font-medium text-gray-700 dark:text-gray-300'>
                      {walletToLink?.address && formatAddress(walletToLink.address)}
                    </p>
                    <div className='mt-4 flex items-start rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'>
                      <ExclamationTriangleIcon className='mt-0.5 h-5 w-5 flex-shrink-0' />
                      <p className='ml-2 text-sm'>
                        This action is permanent and cannot be undone. Are you sure you want to
                        continue?
                      </p>
                    </div>
                  </div>

                  <div className='mt-6 flex justify-end space-x-3'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                      onClick={() => setShowConfirmModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-full border border-transparent bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none dark:bg-primaryAccent'
                      onClick={handleConfirmLinking}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
