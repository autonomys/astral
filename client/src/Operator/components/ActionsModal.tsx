import Modal from 'common/components/Modal'
import useWallet from 'common/hooks/useWallet'
import { FC, useCallback, useMemo, useState } from 'react'

export enum OperatorActionType {
  None = 'none',
  AddFunds = 'Add Funds',
  Withdraw = 'Withdraw',
  Deregister = 'Deregister',
}

export type OperatorAction = {
  type: OperatorActionType
  operatorId: number | null
}

type Props = {
  isOpen: boolean
  action: OperatorAction
  onClose: () => void
}

export const ActionsModal: FC<Props> = ({ isOpen, action, onClose }) => {
  const { api, actingAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)

  const handleDeregister = useCallback(async () => {
    if (!api || !actingAccount || !injector)
      return setFormError('We are not able to connect to the blockchain')

    try {
      const block = await api.rpc.chain.getBlock()
      const hash = await api.tx.domains
        .deregisterOperator(action.operatorId)
        .signAndSend(actingAccount.address, { signer: injector.signer })

      console.log('block', block)
      console.log('hash', hash)

      onClose()
    } catch (error) {
      setFormError('There was an error while de-registering the operator')
      console.error('Error', error)
    }
  }, [actingAccount, action.operatorId, api, injector, onClose])

  const ErrorPlaceholder = useMemo(
    () =>
      formError ? (
        <div className='text-red-500 text-md h-4' data-testid='errorMessage'>
          {formError}
        </div>
      ) : (
        <div className='text-md h-4' data-testid='placeHolder' />
      ),
    [formError],
  )

  const ActionBody = useMemo(() => {
    switch (action.type) {
      case OperatorActionType.AddFunds:
        return <>Add Funds</>
      case OperatorActionType.Withdraw:
        return <>Withdraw</>
      case OperatorActionType.Deregister:
        return (
          <div className='flex flex-col gap-4 items-start'>
            <span className='text-[#241235] text-base font-medium mt-4 dark:text-white'>
              Do you really want to deregister your Operator?
            </span>
            {ErrorPlaceholder}
            <button
              className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-red-500 text-white font-medium dark:bg-red-500'
              onClick={handleDeregister}
            >
              {action.type}
            </button>
          </div>
        )
      default:
        return null
    }
  }, [ErrorPlaceholder, action.type, handleDeregister])

  return (
    <Modal title={action.type} onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col gap-4 items-start'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='grid grid-cols-1 gap-4'>{ActionBody}</div>
        </div>
        <button
          className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#1E254E]'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
