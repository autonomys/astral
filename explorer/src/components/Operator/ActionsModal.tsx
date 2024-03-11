'use client'

import { bigNumberToNumber, floatToStringWithDecimals, formatUnitsToNumber } from '@/utils/number'
import { Modal } from 'components/common/Modal'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'

export enum OperatorActionType {
  None = 'none',
  AddFunds = 'Add Funds',
  Withdraw = 'Withdraw',
  Deregister = 'Deregister',
}

export type OperatorAction = {
  type: OperatorActionType
  operatorId: number | null
  maxAmount: bigint | null
}

type Props = {
  isOpen: boolean
  action: OperatorAction
  onClose: () => void
}

interface FormValues {
  amount: number
}

const AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT = 0.0001

export const ActionsModal: FC<Props> = ({ isOpen, action, onClose }) => {
  const { selectedChain } = useDomains()
  const { api, actingAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)

  const initialValues: FormValues = useMemo(
    () => ({
      amount: 0,
    }),
    [],
  )
  const maxAmountToAdd = useMemo(
    () =>
      walletBalance > AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT
        ? parseFloat((walletBalance - AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT).toFixed(5))
        : 0,
    [walletBalance],
  )
  const maxAmountToWithdraw = useMemo(
    () => (action.maxAmount ? bigNumberToNumber(action.maxAmount.toString()) : 0),
    [action.maxAmount],
  )
  const maxAmount = useMemo(
    () =>
      OperatorActionType[action.type as keyof typeof OperatorActionType] ===
      OperatorActionType.AddFunds
        ? maxAmountToAdd
        : maxAmountToWithdraw,
    [action.type, maxAmountToAdd, maxAmountToWithdraw],
  )

  const fundsFormValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0, `Amount  need to be greater than 0 ${tokenSymbol}`)
      .max(maxAmount, `Amount need to be less than ${maxAmount} ${tokenSymbol}`)
      .required('Amount to stake is required'),
  })

  const loadData = useCallback(async () => {
    if (!api || !api[selectedChain.urls.page]) return

    const properties = await api[selectedChain.urls.page].rpc.system.properties()
    setTokenDecimals((properties.tokenDecimals.toPrimitive() as number[])[0])
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
  }, [api, selectedChain])

  const loadWalletBalance = useCallback(async () => {
    if (!api || !actingAccount || !api[selectedChain.urls.page]) return

    const balance = await api[selectedChain.urls.page].query.system.account(actingAccount.address)
    setWalletBalance(
      formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
    )
  }, [api, actingAccount, selectedChain])

  const handleClose = useCallback(() => {
    setFormError(null)
    onClose()
  }, [onClose])

  const handleAddFunds = useCallback(
    async (
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector || !api[selectedChain.urls.page])
        return setFormError('We are not able to connect to the blockchain')
      if (!action.operatorId) return setFormError('Please select an operator to add funds to')

      try {
        const block = await api[selectedChain.urls.page].rpc.chain.getBlock()
        const hash = await api[selectedChain.urls.page].tx.domains
          .nominateOperator(
            action.operatorId.toString(),
            floatToStringWithDecimals(values.amount, tokenDecimals),
          )
          .signAndSend(actingAccount.address, { signer: injector.signer })

        console.log('block', block)
        console.log('hash', hash)

        resetForm()
        handleClose()
      } catch (error) {
        setFormError('There was an error while adding funds to the operator')
        console.error('Error', error)
      }
    },
    [api, actingAccount, injector, action.operatorId, tokenDecimals, handleClose, selectedChain],
  )

  const handleWithdraw = useCallback(
    async (
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector || !api[selectedChain.urls.page])
        return setFormError('We are not able to connect to the blockchain')

      try {
        const block = await api[selectedChain.urls.page].rpc.chain.getBlock()
        const hash = await api[selectedChain.urls.page].tx.domains
          .withdrawStake(
            action.operatorId,
            maxAmount === values.amount
              ? { All: null }
              : { Some: floatToStringWithDecimals(values.amount, tokenDecimals) },
          )
          .signAndSend(actingAccount.address, { signer: injector.signer })

        console.log('block', block)
        console.log('hash', hash)

        resetForm()
        handleClose()
      } catch (error) {
        setFormError('There was an error while withdraw funds from the operator')
        console.error('Error', error)
      }
    },
    [
      api,
      actingAccount,
      injector,
      action.operatorId,
      maxAmount,
      tokenDecimals,
      handleClose,
      selectedChain,
    ],
  )

  const handleDeregister = useCallback(async () => {
    if (!api || !actingAccount || !injector || !api[selectedChain.urls.page])
      return setFormError('We are not able to connect to the blockchain')

    try {
      const block = await api[selectedChain.urls.page].rpc.chain.getBlock()
      const hash = await api[selectedChain.urls.page].tx.domains
        .deregisterOperator(action.operatorId)
        .signAndSend(actingAccount.address, { signer: injector.signer })

      console.log('block', block)
      console.log('hash', hash)

      handleClose()
    } catch (error) {
      setFormError('There was an error while de-registering the operator')
      console.error('Error', error)
    }
  }, [actingAccount, action.operatorId, api, injector, handleClose, selectedChain])

  const ErrorPlaceholder = useMemo(
    () =>
      formError ? (
        <div className='text-md h-8 text-red-500' data-testid='errorMessage'>
          {formError}
        </div>
      ) : (
        <div className='text-md h-4' data-testid='placeHolder' />
      ),
    [formError],
  )

  const ActionBody = useMemo(() => {
    switch (OperatorActionType[action.type as keyof typeof OperatorActionType]) {
      case OperatorActionType.AddFunds:
      case OperatorActionType.Withdraw:
        return (
          <div className='flex flex-col items-start gap-4'>
            <Formik
              initialValues={initialValues}
              validationSchema={fundsFormValidationSchema}
              onSubmit={(values, { resetForm }) =>
                OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                OperatorActionType.AddFunds
                  ? handleAddFunds(values, resetForm)
                  : handleWithdraw(values, resetForm)
              }
            >
              {({ errors, touched, handleSubmit, setFieldValue }) => (
                <Form
                  className='w-full'
                  onSubmit={handleSubmit}
                  data-testid='testOperatorStakeForm'
                >
                  <span className='text-base font-medium text-[#241235] dark:text-white'>
                    {`Amount to ${
                      OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                      OperatorActionType.AddFunds
                        ? 'stake'
                        : 'withdraw'
                    }`}
                  </span>
                  <FieldArray
                    name='dischargeNorms'
                    render={() => (
                      <div className='relative'>
                        <Field
                          name='amount'
                          type='number'
                          placeholder={`Amount to ${
                            OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                            OperatorActionType.AddFunds
                              ? 'stake'
                              : 'withdraw'
                          }`}
                          className={`mt-4 block w-full rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white ${
                            errors.amount &&
                            'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                          }`}
                        />
                        <button
                          className='absolute flex items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                          type='button'
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                          onClick={() => setFieldValue('amount', maxAmount)}
                        >
                          Max
                        </button>
                      </div>
                    )}
                  />
                  {(errors.amount && touched.amount) || maxAmountToAdd === 0 ? (
                    maxAmountToAdd === 0 ? (
                      <span className='text-md h-8 text-red-500' data-testid='errorMessage'>
                        You don&apos;t have enough balance to stake
                      </span>
                    ) : (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        {errors.amount}
                      </div>
                    )
                  ) : (
                    <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                  )}
                  {ErrorPlaceholder}
                  {!actingAccount ? (
                    <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                      You need to connect your wallet
                    </div>
                  ) : (
                    <button
                      className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                      type='submit'
                    >
                      {OperatorActionType[action.type as keyof typeof OperatorActionType]}
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        )
      case OperatorActionType.Deregister:
        return (
          <div className='flex flex-col items-start gap-4'>
            <span className='mt-4 text-base font-medium text-[#241235] dark:text-white'>
              Do you really want to deregister your Operator?
            </span>
            {ErrorPlaceholder}
            <button
              className='flex w-full max-w-fit items-center gap-2 rounded-full bg-red-500 px-2 text-sm font-medium text-white dark:bg-red-500 md:space-x-4 md:text-base'
              onClick={handleDeregister}
            >
              {OperatorActionType[action.type as keyof typeof OperatorActionType]}
            </button>
          </div>
        )
      default:
        return null
    }
  }, [
    ErrorPlaceholder,
    actingAccount,
    action.type,
    maxAmountToAdd,
    fundsFormValidationSchema,
    handleAddFunds,
    handleDeregister,
    handleWithdraw,
    initialValues,
    maxAmount,
  ])

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  return (
    <Modal title={action.type} onClose={handleClose} isOpen={isOpen}>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-1 gap-4'>{ActionBody}</div>
        </div>
        <button
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#1E254E] md:space-x-4 md:text-base'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
