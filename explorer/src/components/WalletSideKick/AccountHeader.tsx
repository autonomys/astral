import { limitNumberDecimals } from '@/utils/number'
import { CopyButton } from 'components/common/CopyButton'
import { Tooltip } from 'components/common/Tooltip'
import { FC } from 'react'
import { ActionsButtons } from './ActionsButtons'

interface AccountHeaderProps {
  subspaceAccount: string
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
      <div className='flex items-center justify-center'>
        <input
          name='subspaceAccount'
          type='text'
          value={subspaceAccount}
          readOnly
          className='block w-[200px] rounded-xl border-[#DE67E4] bg-transparent px-4 text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white'
        />
        <div className='ml-2'>
          <Tooltip text='Copy wallet address'>
            <CopyButton value={subspaceAccount} message='Wallet address copied' />
          </Tooltip>
        </div>
      </div>
      <div className='m-2 flex items-center justify-center'>
        <div className='flex items-center text-3xl text-gray-900 dark:text-white '>
          {limitNumberDecimals(walletBalance)} {tokenSymbol}
        </div>
      </div>
      <ActionsButtons tokenSymbol={tokenSymbol} />
    </>
  )
}
