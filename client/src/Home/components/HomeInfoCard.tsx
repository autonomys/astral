import { FC, ReactElement } from 'react'

type Props = {
  title: string
  value: string
  icon: ReactElement
  additionalClass?: string
}

const HomeInfoCard: FC<Props> = ({ title, icon, value, additionalClass = '' }) => {
  return (
    <div
      className={`h-[216px] min-w-[200px] md:min-w-[228px] font-['Montserrat'] ${additionalClass}`}
    >
      <div className='h-full flex justify-center flex-col rounded-[20px] bg-white'>
        <div className='mb-6 w-full flex items-center justify-center align-middle'>{icon}</div>
        <div className='w-full flex flex-col  align-middle items-center justify-center'>
          <h2 className='text-gray-900 mb-2.5 font-normal text-center text-xs'>{title}</h2>
          <p className='leading-relaxed text-xl font-medium text-center'>{value}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeInfoCard
