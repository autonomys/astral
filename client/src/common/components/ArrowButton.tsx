import { FC, ReactNode } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

type Props = {
  children?: ReactNode;
  onClick?: () => void;
}

const ArrowButton: FC<Props> = ({ children, ...rest }) => (
  <button
    {...rest}
    className='text-xs font-light px-5 py-3 rounded-full leading-normal text-white bg-[#241235]'
  >
    <div className='flex items-center gap-x-5'>
      {children}
      <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
    </div>
  </button>
)

export default ArrowButton
