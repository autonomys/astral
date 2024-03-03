import { FC } from 'react'

import { CopyButton, Tooltip } from 'common/components'
import { limitNumberDecimals } from 'common/helpers'
import { WalletActionsButtons } from './WalletActionsButtons'

interface AccountHeaderProps {
  subspaceAccount: string | undefined
  walletBalance: number
  tokenSymbol: string
}

export const AccountHeader: FC<AccountHeaderProps> = ({
  subspaceAccount,
  walletBalance,
  tokenSymbol,
}) => {
  return (
    <>
      {subspaceAccount && (
        <div className='flex items-center justify-center'>
          <input
            name='subspaceAccount'
            type='text'
            value={subspaceAccount}
            readOnly
            className='dark:bg-[#1E254E] dark:text-white block px-4 w-[200px] text-sm text-gray-900 rounded-xl bg-transparent shadow-lg border-[#DE67E4]'
          />
          <div className='ml-2'>
            <Tooltip text='Copy wallet address'>
              <CopyButton value={subspaceAccount} message='Wallet address copied' />
            </Tooltip>
          </div>
        </div>
      )}
      <div className='flex items-center justify-center m-2'>
        <div className='flex items-center text-3xl'>
          {limitNumberDecimals(walletBalance)} {tokenSymbol}
        </div>
      </div>
      <WalletActionsButtons tokenSymbol={tokenSymbol} />
    </>
  )
}
