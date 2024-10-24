import Link from 'next/link'
import { FC } from 'react'

interface AccountBadgeProps {
  to: string
  label: string
}

export const AccountBadge: FC<AccountBadgeProps> = ({ to, label }) => {
  return (
    <Link data-testid='AccountBadge-link' className='hover:text-primaryAccent' href={to}>
      <span className='rounded-full bg-primaryAccent p-2 text-base font-medium text-grayDarker dark:text-white'>
        {label}
      </span>
    </Link>
  )
}
