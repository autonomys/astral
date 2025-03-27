'use client'

import { cn } from '@/utils/cn'
import { flip, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react'
import { FC, useState } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  text: string | React.ReactNode
  children: React.ReactNode
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

export const Tooltip: FC<TooltipProps> = ({ text, children, direction = 'top', className }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Floating UI for precise positioning
  const { refs, floatingStyles } = useFloating({
    placement: direction,
    middleware: [offset(8), flip(), shift()],
  })

  return (
    <>
      {/* Tooltip Trigger */}
      <div
        ref={refs.setReference}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className='inline-block cursor-pointer'
      >
        {children}
      </div>

      {/* Tooltip Content (Using FloatingPortal) */}
      {isVisible &&
        createPortal(
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={cn(
                'z-[1000] rounded-md bg-primaryAccent p-2 text-sm text-white shadow-lg transition-opacity duration-200 ease-in-out',
                className,
              )}
            >
              {text}
            </div>
          </FloatingPortal>,
          document.body,
        )}
    </>
  )
}
