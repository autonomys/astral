'use client'

import { FC, useCallback, useMemo } from 'react'
import { Tooltip } from '../common/Tooltip'
import { CancelIcon } from '../icons/CancelIcon'
import { UnlockIcon } from '../icons/UnlockIcon'
import { OperatorAction, OperatorActionType } from './ActionsModal'

export type OperatorActionsRow = {
  original: {
    id: string
    current_total_shares: bigint
    minimumNominatorStake?: string
    accountId?: string
    nominationTax?: string
    currentTotalStake?: string
    apy30d?: string
  }
}

interface OperatorActionsProps {
  handleAction: (action: OperatorAction) => void
  row: OperatorActionsRow
  excludeActions?: OperatorActionType[]
}

export const OperatorActions: FC<OperatorActionsProps> = ({
  handleAction,
  row,
  excludeActions,
}) => {
  const actionsAvailable = useMemo(
    () =>
      Object.keys(OperatorActionType)
        .slice(1)
        .filter(
          (type) =>
            !excludeActions ||
            !excludeActions.includes(OperatorActionType[type as keyof typeof OperatorActionType]),
        ),
    [excludeActions],
  )

  const handleClick = useCallback(
    (actionType: OperatorActionType) =>
      handleAction({
        type: actionType,
        operatorId: parseInt(row.original.id),
        accountId: row.original.accountId,
        nominationTax: row.original.nominationTax,
        currentTotalStake: row.original.currentTotalStake,
        apy30d: row.original.apy30d,
      }),
    [
      handleAction,
      row.original.id,
      row.original.accountId,
      row.original.nominationTax,
      row.original.currentTotalStake,
      row.original.apy30d,
    ],
  )

  if (actionsAvailable.length === 0) return <></>

  return (
    <>
      {actionsAvailable.map((actionType, index) => {
        switch (OperatorActionType[actionType as keyof typeof OperatorActionType]) {
          case OperatorActionType.Deregister:
            return (
              <button
                key={index + 'Deregister'}
                onClick={() => handleClick(actionType as OperatorActionType)}
              >
                <Tooltip text='Deregister' direction='top'>
                  <CancelIcon />
                </Tooltip>
              </button>
            )
          case OperatorActionType.UnlockNominator:
            return (
              <button
                key={index + 'UnlockNominator'}
                onClick={() => handleClick(actionType as OperatorActionType)}
              >
                <Tooltip text='Unlock Nominator' direction='top'>
                  <UnlockIcon />
                </Tooltip>
              </button>
            )
          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
