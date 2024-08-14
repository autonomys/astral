// file: explorer/src/components/common/Card.tsx

import { FC } from 'react'

type CardProps = {
  children: React.ReactNode
  className?: string
  width?: string
}

export const Card: FC<CardProps> = ({ children, className, width = 'w-full' }) => {
  return (
    <div className={`flex  ${width} flex-col align-middle ${className}`}>
      <div className={'mt-2 flex w-full flex-col sm:mt-0'}>
        <div className="w-full rounded-[20px] bg-white p-6 font-['Montserrat'] dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset">
          {children}
        </div>
      </div>
    </div>
  )
}
