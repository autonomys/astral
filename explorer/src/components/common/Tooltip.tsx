'use client'

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { FC, useCallback, useMemo, useState } from 'react'

interface TooltipProps {
  text: string | React.ReactNode
  children: React.ReactNode
  direction?: 'top' | 'bottom' | 'left' | 'right' // New prop for tooltip direction
}

export const Tooltip: FC<TooltipProps> = ({ text, children, direction = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible])
  const className = useMemo(
    () =>
      `absolute ${direction === 'top' ? 'bottom-full' : 'top-full'} ${direction === 'left' && 'right-full'} ${direction === 'right' && 'left-full'} bg-primaryAccent z-10 mt-2 w-auto rounded-md p-2 text-sm text-white shadow-lg`,
    [direction],
  )
  const tooltip = useMemo(() => {
    return (
      <div
        className={className}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {text}
      </div>
    )
  }, [className, text])

  return (
    <div className='group relative flex flex-col items-center'>
      {isVisible && tooltip}
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
