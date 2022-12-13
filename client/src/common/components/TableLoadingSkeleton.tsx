import { FC } from 'react'

type Props = {
  additionClass?: string
  withPagination?: boolean
}

const TableLoadingSkeleton: FC<Props> = ({ additionClass = '', withPagination = false }) => {
  return (
    <div className={`w-full ${additionClass}`}>
      <div className='w-full border border-gray-200 rounded-lg bg-white'>
        <div className='animate-pulse'>
          <div className='h-10 bg-gray-200 mb-6' />
          <div className='py-3 px-6'>
            <div className='h-5 bg-gray-300 mb-6 rounded' />
            <div className='h-5 bg-gray-200 mb-6 rounded' />
            <div className='h-5 bg-gray-300 mb-6 rounded' />
            <div className='h-5 bg-gray-200 mb-6 rounded' />
            <div className='h-4 bg-gray-300 mb-6 rounded' />
            <div className='h-4 bg-gray-200 mb-6 rounded' />
            <div className='h-4 bg-gray-300 mb-6 rounded' />
            <div className='h-4 bg-gray-200 mb-6 rounded' />
            <div className='h-4 bg-gray-300 mb-6 rounded' />
            <div className='h-4 bg-gray-200 mb-6 rounded' />
          </div>
        </div>
      </div>
      {withPagination ? (
        <div className='flex py-8 justify-end'>
          <div className='animate-pulse'>
            <div className='relative z-0 inline-flex shadow-sm'>
              <div className='h-10 bg-gray-100 w-12 rounded-l-md' />
              <div className='h-10 bg-gray-100 rounded-r-md w-12 ' />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TableLoadingSkeleton
