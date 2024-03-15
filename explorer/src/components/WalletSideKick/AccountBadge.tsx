import Link from 'next/link'
import { FC } from 'react'

interface AccountBadgeProps {
  to: string
  label: string
}

export const AccountBadge: FC<AccountBadgeProps> = ({ to, label }) => {
  return (
    <Link data-testid='AccountBadge-link' className='hover:text-[#DE67E4]' href={to}>
      <span className='rounded-full bg-[#DE67E4] p-2 text-base font-medium text-[#241235] dark:text-white'>
        {label}
      </span>
    </Link>
  )
}
