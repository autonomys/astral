import { OperatorStatus } from '@/constants/staking'
import { allCapsToNormal } from '@/utils/string'
import { FC } from 'react'

const OPERATOR_STATUS_CLASSNAME = {
  [OperatorStatus.PENDING_NEXT_EPOCH]:
    'bg-yellow-300 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300',
  [OperatorStatus.ACTIVE]: 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-500',
  [OperatorStatus.DEREGISTERED]: 'bg-red-300 dark:bg-red-300 text-red-700 dark:text-red-700',
  [OperatorStatus.NOMINATORS_UNLOCKED]:
    'bg-pink-200 dark:bg-pink-300 text-pink-700 dark:text-pink-700',
  [OperatorStatus.SLASHED]: 'bg-red-300 dark:bg-red-300 text-red-700 dark:text-red-700',
}

type Props = {
  status: OperatorStatus
}

export const OperatorStatusBadge: FC<Props> = ({ status }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-sm font-normal ${OPERATOR_STATUS_CLASSNAME[status]}`}
  >
    {allCapsToNormal(status)}
  </span>
)
