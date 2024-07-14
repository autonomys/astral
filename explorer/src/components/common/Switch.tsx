import React, { FC } from 'react'

interface SwitchProps {
  title: string
  checked: boolean
  onChange: () => void
}

export const Switch: FC<SwitchProps> = ({ title, checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onChange()
      }}
      className={`${
        checked ? 'bg-purpleAccent' : 'bg-transparent'
      } border-color-grayDarker dark:border-color-white relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border-2`}
      role='switch'
      aria-checked={checked}
    >
      <span className='sr-only'>{title}</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-purpleSoft`}
      />
    </button>
  )
}
