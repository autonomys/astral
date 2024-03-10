import { FC } from 'react'

type Props = {
  title: string
  value: string
}

export const StatItem: FC<Props> = ({ title, value }) => {
  return (
    <div className='flex flex-col'>
      <span className='text-xs font-normal text-[#857EC2] dark:text-white/75'>{title}</span>
      <span className='text-sm font-medium text-[#282929] dark:text-white'>{value}</span>
    </div>
  )
}
