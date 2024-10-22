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
    className={`w-[100px] rounded-xl border border-purpleAccent bg-transparent px-4 shadow-lg ${className}`}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
)
