import { FC, ReactNode } from 'react'

type Props = {
  header: ReactNode
  body: Row[]
  id: string
  children?: ReactNode
}

export type Row = {
  name: string
  value: string | number | ReactNode
}

export const MobileCard: FC<Props> = ({ header, body, id, children }) => {
  return (
    <div className="mb-6 w-full rounded-lg bg-white px-4 py-7 font-['Montserrat'] dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset">
      <div className='mb-2 flex items-center gap-2'>{header}</div>
      <div className='w-full divide-y divide-gray-200 dark:divide-white/20'>
        {body.map(({ name, value }, index) => (
          <div className='flex items-center justify-between py-2' key={`${id}-${index}`}>
            <div className='text-xs text-purpleShade2  dark:text-white/75'>{name}</div>
            <div className='text-xs text-grayDarker dark:text-white'>{value}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}
