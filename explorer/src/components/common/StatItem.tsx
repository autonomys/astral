import { FC } from 'react'

type Props = {
  title: string
  value: string
}

export const StatItem: FC<Props> = ({ title, value }) => {
  return (
    <div className='flex flex-col'>
      <span className='text-blueShade text-xs font-normal dark:text-white/75'>{title}</span>
      <span className='text-sm font-medium text-grayDark dark:text-white'>{value}</span>
    </div>
  )
}
