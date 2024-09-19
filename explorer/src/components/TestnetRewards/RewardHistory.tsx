'use client'

import { INTERNAL_ROUTES, Routes } from '@/constants'
import { shortString } from '@/utils/string'
import { WalletButton } from 'components/WalletButton'
import AccountListDropdown from 'components/WalletButton/AccountListDropdown'
import useChains from 'hooks/useChains'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { useViewStates } from 'states/view'
import { AccountIcon } from '../common/AccountIcon'

export const RewardHistory: FC = () => {
  const { network } = useChains()
  const { actingAccount, subspaceAccount } = useWallet()
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

  return (
    <div className='w-full max-w-xl'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:p-6'>
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
              {!actingAccount ? <WalletButton /> : <AccountListDropdown />}
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
                  className={`rounded-full px-6 py-2 font-semibold text-white ${
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
                  className='rounded-full bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700'
                  onClick={handleRemoveSubspaceWallet}
                >
                  ⚡ Remove Wallet ⚡
                </button>
              </div>
            )}

            {mySubspaceWallets.length > 0 && (
              <div className='mt-4 w-full px-4 py-2'>
                <h2 className='pb-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200'>
                  Connected Wallets
                </h2>
                <ul className='mt-2 list-inside list-disc space-y-4 text-gray-700 dark:text-gray-300'>
                  {mySubspaceWallets.map((wallet) => (
                    <div key={`${wallet}-account-id`} className='row flex items-center gap-3'>
                      <AccountIcon address={wallet} size={26} theme='beachball' />
                      <Link
                        data-testid={`account-link-${wallet}`}
                        href={INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, wallet)}
                        className='hover:text-primaryAccent'
                      >
                        <div>{shortString(wallet)}</div>
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
