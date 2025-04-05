import { cn } from '@/utils/cn'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

interface SocialLinkProps {
  icon: ReactNode
  label?: string
  value: string | null | undefined
  url: string | null
  isExternal?: boolean
  iconBgClass?: string
  showExternalIcon?: boolean
  className?: string
}

export const SocialLink = ({
  icon,
  label,
  value,
  url,
  isExternal = true,
  iconBgClass = 'bg-gray-50 dark:bg-gray-800',
  showExternalIcon = true,
  className,
}: SocialLinkProps) => {
  const hasValue = !!value
  const displayValue = value || `No ${label} provided`

  return (
    <div className={cn('flex items-center rounded-lg p-2 transition-colors', className)}>
      <div className={cn('flex h-9 w-9 items-center justify-center rounded-full', iconBgClass)}>
        {icon}
      </div>
      <a
        href={url || '#'}
        target={isExternal && hasValue ? '_blank' : undefined}
        rel={isExternal && hasValue ? 'noopener noreferrer' : undefined}
        className={cn(
          'ml-3',
          hasValue
            ? 'cursor-pointer text-gray-700 hover:text-primaryAccent hover:underline dark:text-gray-200 dark:hover:text-pastelBlue'
            : 'cursor-default text-gray-500 dark:text-gray-400',
        )}
      >
        {label ? (
          <div className='flex flex-col'>
            <div className='text-sm font-medium'>{label}</div>
            <div className='text-sm'>{displayValue}</div>
          </div>
        ) : (
          <div className='flex items-center text-sm font-medium'>
            <span>{displayValue}</span>
            {showExternalIcon && hasValue && isExternal && (
              <ArrowTopRightOnSquareIcon className='ml-1 h-3.5 w-3.5' />
            )}
          </div>
        )}
      </a>
    </div>
  )
}
