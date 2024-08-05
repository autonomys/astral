// file: explorer/src/components/Swap/AmountField.tsx

import { limitNumberDecimals } from '@/utils/number'
import { FC } from 'react'

interface AmountFieldProps {
  label: string
  value: number
  tokenSymbol: string
  onChange: (value: number) => void
  maxAmount?: number
}

export const AmountField: FC<AmountFieldProps> = ({
  label,
  value,
  tokenSymbol,
  onChange,
  maxAmount,
}) => {
  return (
    <div className='bg-grayLighter flex flex-col space-y-1 rounded-xl border-grayDarker p-4 dark:border-purpleDeepAccent dark:bg-purpleUndertone'>
      <div className='text-grayText flex items-center justify-between text-sm'>
        <span className='text-bold text-sm font-bold'>{label}</span>
        {maxAmount && (
          <div
            role='button'
            tabIndex={0}
            onClick={() => onChange(maxAmount)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onChange(maxAmount)
              }
            }}
          >
            <span className='cursor-pointer font-bold hover:underline'>
              Max: {limitNumberDecimals(maxAmount)} {tokenSymbol}
            </span>{' '}
          </div>
        )}
      </div>

      <div className='text-grayText flex items-center justify-between text-sm'>
        <input
          type='number'
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='bg-grayLighter ml-0 mt-4 rounded-xl border-0 pl-0 text-lg font-bold text-grayDark focus:outline-none dark:bg-purpleUndertone dark:text-white'
          placeholder='0.00'
        />
        <span className='mr-4 mt-4 text-lg font-bold'>{tokenSymbol}</span>
      </div>
    </div>
  )
}
