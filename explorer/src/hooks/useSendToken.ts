import { transfer } from '@autonomys/auto-consensus'
import { Hash } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { NetworkSource } from 'constants/transaction'
import { AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT, WalletType } from 'constants/wallet'
import { FormikState } from 'formik'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useConsensusStates } from 'states/consensus'
import type { SendTokenFormValues } from 'types/transaction'
import { floatToStringWithDecimals, formatUnitsToNumber } from 'utils/number'
import * as Yup from 'yup'

export const useSendToken = () => {
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const { tokenSymbol, tokenDecimals } = useConsensusStates()
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const { sendAndSaveTx, handleTxError } = useTxHelper()

  const loadWalletBalance = useCallback(async () => {
    if (!actingAccount || !api || actingAccount.type === WalletType.ethereum) return

    const balance = await api.query.system.account(actingAccount.address)
    setWalletBalance(
      formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
    )
  }, [api, actingAccount])

  const initialSendTokenValues: SendTokenFormValues = useMemo(
    () => ({
      sender: subspaceAccount || '',
      sourceNetwork: NetworkSource.CONSENSUS,
      sourceDomainId: '',
      receiver: '',
      destinationNetwork: NetworkSource.CONSENSUS,
      destinationDomainId: '',
      amount: 0,
      nonce: -1,
    }),
    [subspaceAccount],
  )

  const maxAmount = useMemo(
    () =>
      walletBalance > AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT
        ? parseFloat((walletBalance - AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT).toFixed(5))
        : 0,
    [walletBalance],
  )

  const sendTokenFormValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        amount: Yup.number()
          .min(0, `Amount  need to be greater than 0 ${tokenSymbol}`)
          .max(maxAmount, `Amount need to be less than ${maxAmount} ${tokenSymbol}`)
          .required('Amount to stake is required'),
        nonce: Yup.number().min(-1, 'Nonce must be greater or -1'),
      }),
    [maxAmount, tokenSymbol],
  )

  const handleSendToken = useCallback(
    async (
      values: SendTokenFormValues,
      resetForm: (nextState?: Partial<FormikState<SendTokenFormValues>> | undefined) => void,
      setHash: (hash: Hash | undefined) => void,
      setFormError: (message: string) => void,
    ) => {
      if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
      try {
        const to = values.receiver
        const amount = floatToStringWithDecimals(values.amount, tokenDecimals)

        const tx = await transfer(api, to, amount)
        const hash = await sendAndSaveTx({
          call: 'balances.transferKeepAlive',
          tx,
          signer: injector.signer,
          to,
          amount,
          nonce: values.nonce,
          error: setFormError,
        })
        if (hash) {
          setHash(hash)
          toast.success('The transaction was sent successfully', { position: 'bottom-center' })
          sendGAEvent({
            event: 'walletSideKick_action_sendToken',
            value: `extrinsic:${hash.toString()}`,
          })
          resetForm()
        }
      } catch (error) {
        handleTxError(
          'There was an error while sending the transaction',
          'balances.transferKeepAlive',
          setFormError,
        )
      }
    },
    [injector, api, tokenDecimals, sendAndSaveTx, handleTxError],
  )

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  return {
    initialSendTokenValues,
    walletBalance,
    maxAmount,
    sendTokenFormValidationSchema,
    handleSendToken,
  }
}
