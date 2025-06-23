import { FC, ReactNode } from 'react'

interface StyledButtonProps {
  children: ReactNode
  className?: string
  isDisabled?: boolean
  onClick?: () => void
}

export const StyledButton: FC<StyledButtonProps> = ({
  children,
  className,
  isDisabled,
  onClick,
}) => (
  <button
    className={`border-purpleAccent w-[100px] rounded-lg border bg-transparent px-4 shadow-lg ${className}`}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
)
