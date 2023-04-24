import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { Square2StackIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// common
import { useClipboard } from 'common/hooks/useClipboard'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  message?: string
  children?: ReactNode
  buttonClass?: string
  iconClass?: string
}

const CopyButton: FC<Props> = ({
  value,
  children,
  message = 'Copied',
  buttonClass = 'w-full',
  iconClass = 'w-4 h-4',
  ...rest
}) => {
  const { onCopy } = useClipboard(value)

  const handleCopyClick = (): void => {
    onCopy()
    toast.success(message, {
      position: 'bottom-center',
    })
  }

  return (
    <button className={`flex gap-2 ${buttonClass}`} onClick={handleCopyClick} {...rest}>
      {children}
      <Square2StackIcon className={iconClass} stroke='#DE67E4' />
    </button>
  )
}

export default CopyButton
