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
    <div className="w-full bg-white rounded-[20px] py-7 px-4 font-['Montserrat'] mb-6">
      <div className='flex gap-2 items-center mb-2'>{header}</div>
      <div className='w-full divide-y divide-gray-200'>
        {body.map(({ name, value }, index) => (
          <div className='flex justify-between items-center py-2' key={`${id}-${value}-${index}`}>
            <div className='text-[#857EC2] text-xs'>{name}</div>
            <div className='text-[#241235] text-xs'>{value}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

export default MobileCard
