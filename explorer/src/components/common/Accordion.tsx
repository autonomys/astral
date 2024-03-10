'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'

type Props = {
  title: React.ReactNode
  children: React.ReactNode
  value?: string
  icon?: React.ReactNode
}

export const Accordion: FC<Props> = ({ title, children, value = '', icon }) => {
  const [isActive, setIsActive] = useState(true)
  return (
    <div className='w-full' id='accordion-open' data-accordion='open'>
      <h2 id='accordion-open-heading-1'>
        <button
          type='button'
          className='text-md flex w-full items-center justify-between truncate pb-5 text-left font-light text-gray-900 dark:text-white/75'
          data-accordion-target='#accordion-open-body-1'
          aria-expanded='true'
          aria-controls='accordion-open-body-1'
          onClick={() => setIsActive(!isActive)}
        >
          <span className='flex items-center'>{title}</span>
          <div className='flex items-center'>
            {value}
            {icon ? (
              <span className='ml-2'>{icon}</span>
            ) : (
              <ChevronDownIcon
                className={isActive ? 'ml-2 size-6 shrink-0 rotate-180' : 'ml-2 size-6 shrink-0'}
                stroke='#DE67E4'
              />
            )}
          </div>
        </button>
      </h2>
      <div
        className={isActive ? 'block' : 'hidden'}
        id='accordion-open-body-1'
        aria-labelledby='accordion-open-heading-1'
      >
        {children}
      </div>
    </div>
  )
}
