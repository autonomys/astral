import Image from 'next/image'
import { FC, ReactElement, useMemo } from 'react'

type Props = {
  title: string
  value: string
  icon?: ReactElement
  imagePath?: string
  tooltip?: string | React.ReactNode
  darkBgClass?: string
  additionalClass?: string
}

export const HomeInfoCard: FC<Props> = ({
  title,
  icon,
  imagePath,
  value,
  darkBgClass,
  additionalClass = '',
}) => {
  const text = useMemo(
    () => (
      <p className='text-center text-xl font-medium leading-relaxed dark:text-white'>{value}</p>
    ),
    [value],
  )
  return (
    <div
      className={`h-[${icon || imagePath ? '216px' : '120px'}] w-full min-w-[200px] grow md:min-w-[228px] ${additionalClass}`}
    >
      <div className={`flex h-full flex-col justify-center rounded-[20px] bg-white ${darkBgClass}`}>
        {imagePath && (
          <div className='mb-2 mt-2 flex w-full items-center justify-center align-middle'>
            <Image src={imagePath} alt={title} width={96} height={96} />
          </div>
        )}
        {icon && (
          <div className='mt-6 flex w-full items-center justify-center align-middle'>{icon}</div>
        )}
        <div className='flex w-full flex-col items-center justify-center align-middle'>
          <h2 className='mb-2.5 text-center text-xs font-normal text-gray-900 dark:text-white'>
            {title}
          </h2>
          {text}
        </div>
      </div>
    </div>
  )
}
