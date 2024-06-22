'use client'

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { FC, useCallback, useState } from 'react'

interface TooltipProps {
  text: string
  children: React.ReactNode
}

export const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible])

  return (
    <div className='group relative flex flex-col items-center'>
      {isVisible && (
        <div className='absolute top-full z-10 mt-2 w-auto rounded-md bg-purpleAccent p-2 text-sm text-white shadow-lg'>
          {text}
        </div>
      )}
      <div
        onClick={toggleVisibility}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        tabIndex={0}
        className='cursor-pointer'
      >
        {children}
      </div>
    </div>
  )
}
