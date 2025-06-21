'use client'

import { shortString } from '@autonomys/auto-utils'
import { TrashIcon } from '@heroicons/react/24/outline'
import { WalletButton } from 'components/WalletButton'
import AccountListDropdown from 'components/WalletButton/AccountListDropdown'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { WalletType } from 'constants/wallet'
import useIndexers from 'hooks/useIndexers'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { useViewStates } from 'states/view'
import { formatAddress } from 'utils/formatAddress'
import { AccountIcon } from '../common/AccountIcon'

export const RewardHistory: FC = () => {
  const { network } = useIndexers()
  const { actingAccount, subspaceAccount, accounts } = useWallet()
  const { mySubspaceWallets, addSubspaceWallet, removeSubspaceWallet } = useViewStates()

  const isSubspaceWalletConnected = useMemo(
    () => (subspaceAccount ? mySubspaceWallets.includes(subspaceAccount) : false),
    [subspaceAccount, mySubspaceWallets],
  )

  const handleAddSubspaceWallet = useCallback(() => {
    if (subspaceAccount && !isSubspaceWalletConnected) {
      addSubspaceWallet(subspaceAccount)
    }
  }, [addSubspaceWallet, subspaceAccount, isSubspaceWalletConnected])

  const handleRemoveSubspaceWallet = useCallback(() => {
    if (subspaceAccount && isSubspaceWalletConnected) {
      removeSubspaceWallet(subspaceAccount)
    }
  }, [removeSubspaceWallet, subspaceAccount, isSubspaceWalletConnected])

  const connectedWallets = useMemo(
    () => (
      <div className='mt-4 w-full px-4 py-2'>
        <h2 className='pb-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200'>
          Connected Wallets
        </h2>
        <ul className='mt-2 list-inside list-disc space-y-4 text-gray-700 dark:text-gray-300'>
          {mySubspaceWallets.map((wallet) => (
            <div key={`${wallet}-account-id`} className='flex items-center justify-between gap-3'>
              <div className='flex items-center gap-3'>
                <AccountIcon address={wallet} size={26} theme='beachball' />
                <Link
                  data-testid={`account-link-${wallet}`}
                  href={INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, wallet)}
                  className='hover:text-primaryAccent'
                >
                  <div>
                    {shortString(wallet)}{' '}
                    {
                      accounts?.find((account) =>
                        account.type === WalletType.subspace ||
                        (account as { type: string }).type === 'sr25519'
                          ? formatAddress(account.address) === wallet
                          : account.address === wallet,
                      )?.name
                    }
                  </div>
                </Link>
              </div>
              <button
                onClick={() => removeSubspaceWallet(wallet)}
                className='ml-2 text-red-500 hover:text-red-700'
                aria-label={`Remove ${wallet}`}
              >
                <TrashIcon className='h-5 w-5' />
              </button>
            </div>
          ))}
        </ul>
      </div>
    ),
    [accounts, mySubspaceWallets, network, removeSubspaceWallet],
  )

  return (
    <div className='w-full max-w-xl'>
      <div className='mb-4 w-full rounded-lg border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
        <div className='mb-6 flex flex-col items-center justify-center'>
          <h1 className='mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white'>
            Reward History
          </h1>
        </div>
        <div className='m-4 flow-root text-gray-900 dark:text-white'>
          <div className='mb-8 flex w-full flex-col items-center gap-3'>
            <p className='mb-1 text-center text-lg font-semibold text-gray-700 dark:text-gray-300'>
              Congratulations!
            </p>
            <p className='mb-2 text-center text-gray-600 dark:text-gray-400'>
              We sincerely appreciate your continued support and belief in the Network throughout
              the years.
            </p>
            <p className='mb-4 text-center text-gray-600 dark:text-gray-400'>
              Please review your Subspace Network rewards for the testnet phases.
            </p>
            <div className='flex justify-center'>
              {!actingAccount ? (
                <WalletButton />
              ) : (
                <AccountListDropdown className='rounded-lg' labelClassName='block w-full' />
              )}
            </div>
            {actingAccount && !subspaceAccount && (
              <div className='flex justify-center'>
                <span className='py-4 text-red-500'>
                  Please connect a substrate-compatible wallet to view your rewards.
                </span>
              </div>
            )}
            {actingAccount && (
              <div className='flex justify-center'>
                <button
                  className={`rounded-lg px-6 py-2 font-semibold text-white ${
                    isSubspaceWalletConnected
                      ? 'cursor-not-allowed bg-blue-300'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={handleAddSubspaceWallet}
                  disabled={isSubspaceWalletConnected}
                >
                  ⚡ Connect more Wallets ⚡
                </button>
              </div>
            )}
            {isSubspaceWalletConnected && (
              <div className='flex justify-center'>
                <button
                  className='rounded-lg bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700'
                  onClick={handleRemoveSubspaceWallet}
                >
                  ⚡ Remove Wallet ⚡
                </button>
              </div>
            )}
            {mySubspaceWallets.length > 0 && connectedWallets}
          </div>
        </div>
      </div>
    </div>
  )
}
