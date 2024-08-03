import { FC } from 'react'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`flex w-full flex-col align-middle ${className}`}>
      <div className='mt-2 flex w-full flex-col sm:mt-0'>
        <div className="w-full rounded-[20px] bg-white p-6 font-['Montserrat'] dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset">
          {children}
        </div>
      </div>
    </div>
  )
}
