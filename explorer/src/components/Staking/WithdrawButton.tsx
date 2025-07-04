'use client'

import { FC, useCallback } from 'react'
import { OperatorAction, OperatorActionType } from './ActionsModal'

export type WithdrawButtonRow = {
  original: {
    id: string
    current_total_shares: bigint
    totalStake?: bigint
  }
}

interface WithdrawButtonProps {
  handleAction: (action: OperatorAction) => void
  row: WithdrawButtonRow
}

export const WithdrawButton: FC<WithdrawButtonProps> = ({ handleAction, row }) => {
  const handleClick = useCallback(
    () =>
      handleAction({
        type: 'Withdraw' as OperatorActionType,
        operatorId: parseInt(row.original.id),
        totalStake: row.original.totalStake,
      }),
    [handleAction, row.original.id, row.original.totalStake],
  )

  return (
    <div className='relative'>
      <button
        className='relative w-full cursor-pointer rounded-lg bg-primaryAccent from-primaryAccent to-blueUndertone py-[10px] pl-3 pr-16 text-left font-sans text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gradient-to-r dark:text-white sm:text-sm md:pr-10'
        onClick={handleClick}
      >
        <div className='flex items-center justify-center'>
          <span className='ml-2 w-28 text-center text-sm'>Withdraw</span>
        </div>
      </button>
    </div>
  )
}
