import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import { useClipboard } from 'hooks/useClipboard'
import { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  message?: string
  children?: ReactNode
  buttonClass?: string
  iconClass?: string
}

export const CopyButton: FC<Props> = ({
  value,
  children,
  message = 'Copied',
  buttonClass = 'w-full',
  iconClass = 'w-4 h-4',
  ...rest
}) => {
  const { onCopy, hasCopied } = useClipboard(value)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleCopyClick = (): void => {
    onCopy()
  }

  const handleMouseEnter = (): void => {
    setShowTooltip(true)
  }

  const handleMouseLeave = (): void => {
    setShowTooltip(false)
  }

  const tooltipMessage = hasCopied ? message : 'Copy to clipboard'

  return (
    <div className='relative inline-block'>
      <button
        className={`relative flex gap-2 ${buttonClass}`}
        onClick={handleCopyClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {children}
        {hasCopied ? (
          <CheckIcon className={`${iconClass} my-auto stroke-green-500`} />
        ) : (
          <Square2StackIcon
            className={`${iconClass} my-auto stroke-blue-500 hover:stroke-blue-600`}
          />
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className='absolute bottom-full right-[-10px] z-50 mb-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg'>
          {tooltipMessage}
          {/* Tooltip arrow */}
          <div className='absolute right-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'></div>
        </div>
      )}
    </div>
  )
}
