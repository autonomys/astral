import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

type Props = {
  status: boolean
}

export const StatusIcon: FC<Props> = ({ status }) => {
  return status ? (
    <CheckCircleIcon className='size-5' stroke='#37D058' />
  ) : (
    <ClockIcon className='size-5' stroke='orange' />
  )
}
