import { FC } from 'react'
import { cn } from 'utils/cn'

type SkeletonRowProps = {
  columnsCount: number
  isLastRow?: boolean
  className?: string
}

export const SkeletonRow: FC<SkeletonRowProps> = ({ columnsCount, isLastRow, className }) => (
  <tr
    className={`border-y border-gray-200 hover:bg-gray-100 dark:hover:bg-transparent/10 ${className}`}
  >
    {Array.from({ length: columnsCount }).map((_, cellIndex) => (
      <td
        key={cellIndex}
        className={cn(
          'whitespace-nowrap px-6 py-[18px] text-sm font-light',
          cellIndex === 0 ? 'sticky left-0 bg-white dark:bg-boxDark' : '',
          cellIndex === columnsCount - 1 ? 'sticky right-0 bg-white dark:bg-boxDark' : '',
          isLastRow && cellIndex === 0 ? 'rounded-bl-[20px]' : '',
          isLastRow && cellIndex === columnsCount - 1 ? 'rounded-br-[20px]' : '',
          className,
        )}
      >
        <div className='h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
      </td>
    ))}
  </tr>
)

type SkeletonCardProps = {
  fieldsCount: number
  className?: string
}

export const SkeletonCard: FC<SkeletonCardProps> = ({ fieldsCount, className }) => (
  <div className={cn('mb-4 w-full rounded-lg bg-white px-4 py-2 dark:bg-boxDark', className)}>
    {Array.from({ length: fieldsCount }).map((_, index) => (
      <div className='flex items-center justify-between py-2' key={`skeleton-field-${index}`}>
        <div className='w-[20%]'>
          <div className='h-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
        <div className='w-[70%]'>
          <div className='h-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
    ))}
  </div>
)
