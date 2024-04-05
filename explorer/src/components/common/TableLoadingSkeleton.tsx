import { FC } from 'react'

type Props = {
  additionClass?: string
  withPagination?: boolean
}

export const TableLoadingSkeleton: FC<Props> = ({ additionClass = '', withPagination = false }) => {
  return (
    <div className={`w-full ${additionClass}`}>
      <div className='w-full rounded-lg border border-gray-200 bg-white'>
        <div className='animate-pulse'>
          <div className='mb-6 h-10 bg-gray-200' />
          <div className='px-6 py-3'>
            <div className='mb-6 h-5 rounded bg-gray-300' />
            <div className='mb-6 h-5 rounded bg-gray-200' />
            <div className='mb-6 h-5 rounded bg-gray-300' />
            <div className='mb-6 h-5 rounded bg-gray-200' />
            <div className='mb-6 h-4 rounded bg-gray-300' />
            <div className='mb-6 h-4 rounded bg-gray-200' />
            <div className='mb-6 h-4 rounded bg-gray-300' />
            <div className='mb-6 h-4 rounded bg-gray-200' />
            <div className='mb-6 h-4 rounded bg-gray-300' />
            <div className='mb-6 h-4 rounded bg-gray-200' />
          </div>
        </div>
      </div>
      {withPagination ? (
        <div className='flex justify-end py-8'>
          <div className='animate-pulse'>
            <div className='relative z-0 inline-flex shadow-sm'>
              <div className='h-10 w-12 rounded-l-md bg-gray-100' />
              <div className='h-10 w-12 rounded-r-md bg-gray-100 ' />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
