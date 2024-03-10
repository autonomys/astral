/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { FC, useCallback, useState } from 'react'

interface TooltipProps {
  text: string
  children: React.ReactNode
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible])

  return (
    <div className='relative flex flex-col items-center group'>
      {isVisible && (
        <div className='absolute top-full mt-2 z-10 w-auto p-2 bg-[#DE67E4] text-white text-sm rounded-md shadow-lg'>
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

export default Tooltip
