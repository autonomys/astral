'use client'

import { FC, useCallback } from 'react'
import { OperatorAction, OperatorActionType } from './ActionsModal'

export type NominationButtonRow = {
  original: {
    id: string
    current_total_shares: bigint
    minimumNominatorStake: bigint
  }
}

interface NominationButtonProps {
  handleAction: (action: OperatorAction) => void
  row: NominationButtonRow
}

export const NominationButton: FC<NominationButtonProps> = ({ handleAction, row }) => {
  const handleClick = useCallback(
    () =>
      handleAction({
        type: 'Nominating' as OperatorActionType,
        operatorId: parseInt(row.original.id),
        minimumStake: row.original.minimumNominatorStake,
      }),
    [handleAction, row.original.id, row.original.minimumNominatorStake],
  )

  return (
    <div className='relative'>
      <button
        className='relative w-full cursor-pointer rounded-full bg-primaryAccent from-primaryAccent to-blueUndertone py-[10px] pl-3 pr-16 text-left font-["Montserrat"] text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gradient-to-r dark:text-white sm:text-sm md:pr-10'
        onClick={handleClick}
      >
        <div className='flex items-center justify-center'>
          <span className='ml-2 w-28 text-center text-sm'>Nominate</span>
        </div>
      </button>
    </div>
  )
}
