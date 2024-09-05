'use client'

import { FC } from 'react'
import AccountListDropdown from '../WalletButton/AccountListDropdown'

export const RewardHistory: FC = () => {
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
              <button className='rounded-full bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700'>
                ⚡ Connect Wallet ⚡
              </button>
              <AccountListDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
