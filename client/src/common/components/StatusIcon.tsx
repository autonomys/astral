import { FC } from 'react'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

type Props = {
  status: boolean
}

const StatusIcon: FC<Props> = ({ status }) => {
  return status ? (
    <CheckCircleIcon className='h-5 w-5' stroke='#37D058' />
  ) : (
    <ClockIcon className='h-5 w-5' stroke='orange' />
  )
}

export default StatusIcon
