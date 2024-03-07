import { FC } from 'react'
import { Link } from 'react-router-dom'

interface AccountBadgeProps {
  to: string
  label: string
}

export const AccountBadge: FC<AccountBadgeProps> = ({ to, label }) => {
  return (
    <Link data-testid='AccountBadge-link' className='hover:text-[#DE67E4]' to={to}>
      <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
        {label}
      </span>
    </Link>
  )
}
