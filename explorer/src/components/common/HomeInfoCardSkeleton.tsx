import { cn } from '@/utils/cn'
import React from 'react'

export type HomeInfoCardSkeletonProps = {
  className?: string
  imagePlaceholderClassName?: string
}

const HomeInfoCardSkeleton = ({
  className,
  imagePlaceholderClassName,
}: HomeInfoCardSkeletonProps) => {
  return (
    <div className={cn('h-[216px] w-full min-w-[200px] grow md:min-w-[228px]', className)}>
      <div className='flex h-full flex-col justify-center rounded-[20px] bg-white dark:bg-boxDark'>
        {/* Image/Icon placeholder */}
        <div
          className={cn(
            'mb-2 flex w-full items-center justify-center align-middle',
            imagePlaceholderClassName,
          )}
        >
          <div className='m-2 h-[84px] w-[84px] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700' />
        </div>

        {/* Title placeholder */}
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='mb-3 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
          {/* Value placeholder */}
          <div className='h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </div>
      </div>
    </div>
  )
}

export default HomeInfoCardSkeleton
