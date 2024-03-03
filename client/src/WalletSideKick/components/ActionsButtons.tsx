import {
  LockClosedIcon,
  PaperAirplaneIcon,
  PencilIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { Tooltip } from 'common/components'
import useWallet from 'common/hooks/useWallet'
import { FC, useCallback, useState } from 'react'

// wallet sidekick
import { ActionsModal, ActionType } from './ActionsModal'

interface ActionsButtonsProps {
  tokenSymbol: string
}

export const ActionsButtons: FC<ActionsButtonsProps> = ({ tokenSymbol }) => {
  const { subspaceAccount } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<ActionType>(ActionType.None)

  const onAction = useCallback((action: ActionType) => {
    setAction(action)
    setIsOpen(true)
  }, [])
  const onSendToken = useCallback(() => onAction(ActionType.SendToken), [onAction])
  const onReceiveToken = useCallback(() => onAction(ActionType.ReceiveToken), [onAction])
  const onSignMessage = useCallback(() => onAction(ActionType.SignMessage), [onAction])
  const onSendRemark = useCallback(() => onAction(ActionType.SendRemark), [onAction])
  const onClose = useCallback(() => setIsOpen(false), [])

  if (!subspaceAccount) return null

  return (
    <div className='flex gap-3 items-center justify-center'>
      <Tooltip text={`Send ${tokenSymbol}`}>
        <button
          onClick={onSendToken}
          className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'
        >
          <PaperAirplaneIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <Tooltip text={`Receive ${tokenSymbol}`}>
        <button
          onClick={onReceiveToken}
          className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'
        >
          <QrCodeIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <Tooltip text='Sign Message'>
        <button
          onClick={onSignMessage}
          className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'
        >
          <LockClosedIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <Tooltip text='Send Remark'>
        <button
          onClick={onSendRemark}
          className='flex items-center justify-center cursor-default m-2 p-2 rounded-full bg-[#DE67E4]'
        >
          <PencilIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <ActionsModal isOpen={isOpen} action={action} onClose={onClose} />
    </div>
  )
}
