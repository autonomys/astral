'use client'

import { cn } from '@/utils/cn'
import { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  text: string | React.ReactNode
  children: React.ReactNode
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export const Tooltip: FC<TooltipProps> = ({ text, children, direction = 'top', className }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let top = triggerRect.top + window.scrollY
    let left = triggerRect.left + window.scrollX

    if (direction === 'bottom') {
      top += triggerRect.height + 8 // Small gap for better visibility
      left += triggerRect.width / 2 - tooltipRect.width / 2
    } else if (direction === 'top') {
      top -= tooltipRect.height + 8
      left += triggerRect.width / 2 - tooltipRect.width / 2
    } else if (direction === 'left') {
      top += triggerRect.height / 2 - tooltipRect.height / 2
      left -= tooltipRect.width + 8
    } else if (direction === 'right') {
      top += triggerRect.height / 2 - tooltipRect.height / 2
      left += triggerRect.width + 8
    }

    // Ensure tooltip does not overflow viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (left < 8) left = 8
    if (left + tooltipRect.width > viewportWidth - 8) left = viewportWidth - tooltipRect.width - 8
    if (top < 8) top = 8
    if (top + tooltipRect.height > viewportHeight - 8) top = viewportHeight - tooltipRect.height - 8

    setPosition({ top, left })
  }, [isVisible, direction])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className='inline-block cursor-pointer'
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'absolute z-[1000] rounded-md bg-primaryAccent p-2 text-sm text-white shadow-lg transition-opacity duration-200 ease-in-out',
              className,
            )}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {text}
          </div>,
          document.body,
        )}
    </>
  )
}
