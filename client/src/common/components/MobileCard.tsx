import { FC, ReactNode } from 'react'

type Props = {
  header: ReactNode
  body: Row[]
  id: string
  children?: ReactNode
}

type Row = {
  name: string
  value: string | number
}

const MobileCard: FC<Props> = ({ header, body, id, children }) => {
  return (
    <div className="w-full bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] rounded-lg py-7 px-4 font-['Montserrat'] mb-6">
      <div className='flex gap-2 items-center mb-2'>{header}</div>
      <div className='w-full divide-y divide-gray-200 dark:divide-white/20'>
        {body.map(({ name, value }, index) => (
          <div className='flex justify-between items-center py-2' key={`${id}-${value}-${index}`}>
            <div className='text-[#857EC2] text-xs  dark:text-white/75'>{name}</div>
            <div className='text-[#241235] text-sm dark:text-white'>{value}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

export default MobileCard
