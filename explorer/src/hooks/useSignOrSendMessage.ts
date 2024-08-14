import { remark } from '@autonomys/auto-consensus'
import { Hash, SignerResult } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { FormikState } from 'formik'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import type { MessageFormValues } from 'types/transaction'
import * as Yup from 'yup'

export const useSignOrSendMessage = () => {
  const { api, actingAccount, injector } = useWallet()
  const { sendAndSaveTx, handleTxError } = useTxHelper()

  const initialMessageValues: MessageFormValues = useMemo(
    () => ({
      message: '',
      nonce: -1,
    }),
    [],
  )

  const messageFormValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        message: Yup.string().required('Message is required'),
      }),
    [],
  )

  const handleSignMessage = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
      setSignature: (hash: SignerResult | undefined) => void,
      setFormError: (message: string) => void,
    ) => {
      if (!actingAccount || !injector)
        return setFormError('We are not able to connect to the blockchain')
      try {
        const signature =
          injector.signer.signRaw &&
          (await injector.signer.signRaw({
            address: actingAccount.address,
            type: 'bytes',
            data: values.message,
          }))
        setSignature(signature)
        toast.success('The message was signed', { position: 'bottom-center' })
        sendGAEvent({
          event: 'walletSideKick_action_signMessage',
          value: `msg:${values.message}`,
        })
        resetForm()
      } catch (error) {
        handleTxError('There was an error while signing the message', 'signMessage', setFormError)
      }
    },
    [actingAccount, handleTxError, injector],
  )

  const handleSendRemark = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
      setHash: (hash: Hash | undefined) => void,
      setFormError: (message: string) => void,
    ) => {
      if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
      try {
        const tx = await remark(api, values.message)
        const hash = await sendAndSaveTx({
          call: 'system.remark',
          tx,
          signer: injector.signer,
          nonce: values.nonce,
          error: setFormError,
        })
        if (hash) {
          setHash(hash)
          toast.success('The remark was sent', { position: 'bottom-center' })
          sendGAEvent({
            event: 'walletSideKick_action_sendRemark',
            value: `msg:${values.message}`,
          })
          resetForm()
        }
      } catch (error) {
        handleTxError('There was an error while sending the remark', 'system.remark', setFormError)
      }
    },
    [api, handleTxError, injector, sendAndSaveTx],
  )

  return {
    initialMessageValues,
    messageFormValidationSchema,
    handleSignMessage,
    handleSendRemark,
  }
}
