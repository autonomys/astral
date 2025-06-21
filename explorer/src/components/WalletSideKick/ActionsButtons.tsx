import { NetworkId } from '@autonomys/auto-utils'
import {
  AdjustmentsVerticalIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  PencilIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { sendGAEvent } from '@next/third-parties/google'
import { Tooltip } from 'components/common/Tooltip'
import { WalletAction } from 'constants/wallet'
import useIndexers from 'hooks/useIndexers'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useState } from 'react'
import { ActionsModal } from './ActionsModal'

interface ActionsButtonsProps {
  tokenSymbol: string
}

export const ActionsButtons: FC<ActionsButtonsProps> = ({ tokenSymbol }) => {
  const { subspaceAccount } = useWallet()
  const { network } = useIndexers()
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<WalletAction>(WalletAction.None)

  const onAction = useCallback((action: WalletAction) => {
    setAction(action)
    setIsOpen(true)
    sendGAEvent({
      event: 'walletSideKick_action_button_trigger',
      value: `action:${action.toString()}`,
    })
  }, [])
  const onSendToken = useCallback(() => onAction(WalletAction.SendToken), [onAction])
  const onReceiveToken = useCallback(() => onAction(WalletAction.ReceiveToken), [onAction])
  const onSignMessage = useCallback(() => onAction(WalletAction.SignMessage), [onAction])
  const onSendRemark = useCallback(() => onAction(WalletAction.SendRemark), [onAction])
  const onExtrinsicsLab = useCallback(() => onAction(WalletAction.ExtrinsicsLab), [onAction])
  const onClose = useCallback(() => setIsOpen(false), [])

  if (!subspaceAccount) return null

  return (
    <div className='flex items-center justify-center gap-3'>
      {/* TODO: Remove this once Mainnet is supporting tokens transfer */}
      {network === NetworkId.TAURUS && (
        <Tooltip text={`Send ${tokenSymbol}`}>
          <button
            onClick={onSendToken}
            className='m-2 flex cursor-default items-center justify-center rounded-lg bg-primaryAccent p-2'
          >
            <PaperAirplaneIcon className='w-8 text-white' />
          </button>
        </Tooltip>
      )}
      <Tooltip text={`Receive ${tokenSymbol}`}>
        <button
          onClick={onReceiveToken}
          className='m-2 flex cursor-default items-center justify-center rounded-lg bg-primaryAccent p-2'
        >
          <QrCodeIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <Tooltip text='Sign Message'>
        <button
          onClick={onSignMessage}
          className='m-2 flex cursor-default items-center justify-center rounded-lg bg-primaryAccent p-2'
        >
          <LockClosedIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <Tooltip text='Send Remark'>
        <button
          onClick={onSendRemark}
          className='m-2 flex cursor-default items-center justify-center rounded-lg bg-primaryAccent p-2'
        >
          <PencilIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <Tooltip text='Custom extrinsic'>
        <button
          onClick={onExtrinsicsLab}
          className='m-2 flex cursor-default items-center justify-center rounded-lg bg-primaryAccent p-2'
        >
          <AdjustmentsVerticalIcon className='w-8 text-white' />
        </button>
      </Tooltip>
      <ActionsModal isOpen={isOpen} action={action} onClose={onClose} />
    </div>
  )
}
