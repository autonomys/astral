import { CopyButton } from 'components/common/CopyButton'
import useWallet from 'hooks/useWallet'
import { FC } from 'react'
import { limitNumberDecimals } from 'utils/number'
import { ActionsButtons } from './ActionsButtons'

interface AccountHeaderProps {
  walletBalance: number
  tokenSymbol: string
}

export const AccountHeader: FC<AccountHeaderProps> = ({ walletBalance, tokenSymbol }) => {
  const { actingAccount, subspaceAccount } = useWallet()

  if (!actingAccount) return null

  return (
    <>
      <div className='flex items-center justify-center'>
        <input
          name='subspaceAccount'
          type='text'
          value={subspaceAccount ?? actingAccount.address}
          readOnly
          className='block w-[200px] rounded-lg border-primaryAccent bg-transparent px-4 text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
        />
        <div className='ml-2'>
          <CopyButton
            value={subspaceAccount ?? actingAccount.address}
            message='Wallet address copied'
          />
        </div>
      </div>
      <div className='m-2 flex items-center justify-center'>
        <div className='flex items-center text-3xl text-gray-900 dark:text-white'>
          {limitNumberDecimals(walletBalance)} {tokenSymbol}
        </div>
      </div>
      <ActionsButtons tokenSymbol={tokenSymbol} />
    </>
  )
}
