import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

type Props = {
  status: boolean
  isPending?: boolean
}

export const StatusIcon: FC<Props> = ({ status, isPending }) => {
  if (isPending) return <ClockIcon className='size-5' stroke='orange' />
  return status ? (
    <CheckCircleIcon className='size-5' stroke='#37D058' />
  ) : (
    <XCircleIcon className='size-5' stroke='#D70040' />
  )
}
