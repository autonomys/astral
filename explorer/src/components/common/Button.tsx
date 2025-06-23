import { cn } from '@/utils/cn'
import { SpinnerSvg } from 'components/common/SpinnerSvg'
import { FC } from 'react'

type ButtonProps = {
  isLoading?: boolean
  children?: React.ReactNode
  isDisabled?: boolean
  label?: string
  onClick?: () => void
  className?: string
  loadingLabel?: string
}

export const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  isDisabled,
  label,
  onClick,
  className,
  loadingLabel = 'Loading...',
}) => {
  const getButtonContent = () => {
    if (children) {
      return children
    }
    if (isLoading) {
      return (
        <div className='flex items-center'>
          <SpinnerSvg />
          {loadingLabel}
        </div>
      )
    }
    return label
  }
  return (
    <button
      type='submit'
      disabled={isDisabled}
      className={cn(
        'inline-flex w-full items-center justify-center rounded-lg bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-buttonLightFrom/90 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-primaryAccent dark:hover:bg-primaryAccent/90 sm:w-auto',
        className,
      )}
      onClick={onClick}
    >
      {getButtonContent()}
    </button>
  )
}
