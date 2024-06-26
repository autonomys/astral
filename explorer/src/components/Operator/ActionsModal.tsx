'use client'

import { WalletType } from '@/constants'
import { floatToStringWithDecimals, formatUnitsToNumber } from '@/utils/number'
import { sendGAEvent } from '@next/third-parties/google'
import { Modal } from 'components/common/Modal'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import useDomains from 'hooks/useDomains'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'

export enum OperatorActionType {
  None = 'none',
  Nominating = 'Nominate',
  Withdraw = 'Withdraw',
  Deregister = 'Deregister',
  UnlockFunds = 'Unlock Funds',
  UnlockOperator = 'Unlock Operator',
}
export const ActionsInRed = [
  OperatorActionType.Deregister,
  OperatorActionType.UnlockFunds,
  OperatorActionType.UnlockOperator,
]

export type OperatorAction = {
  type: OperatorActionType
  operatorId: number | null
  maxShares: bigint | null
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
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [sliderValue, setSliderValue] = useState(0)
  const { sendAndSaveTx } = useTxHelper()

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
  const maxSharesToWithdraw = useMemo(
    () => (action.maxShares ? action.maxShares : BigInt(0)),
    [action.maxShares],
  )

  const addFundsFormValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0, `Amount need to be greater than 0 ${tokenSymbol}`)
      .max(maxAmountToAdd, `Amount need to be less than ${maxAmountToAdd} ${tokenSymbol}`)
      .required('Amount to stake is required'),
  })

  const withdrawFundsFormValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0, 'Amount need to be greater than 0 shares')
      .test('max', `Amount need to be less than ${maxSharesToWithdraw} shares`, function (value) {
        return typeof value === 'number' && BigInt(value) <= maxSharesToWithdraw
      })
      .required('Amount of shares to withdraw is required'),
  })

  const loadData = useCallback(async () => {
    if (!api) return

    const properties = await api.rpc.system.properties()
    setTokenDecimals((properties.tokenDecimals.toPrimitive() as number[])[0])
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
  }, [api])

  const loadWalletBalance = useCallback(async () => {
    if (!api || !actingAccount) return

    if (actingAccount.type === WalletType.subspace) {
      const balance = await api.query.system.account(actingAccount.address)
      setWalletBalance(
        formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
      )
    }
  }, [api, actingAccount])

  const handleClose = useCallback(() => {
    setFormError(null)
    onClose()
  }, [onClose])

  const handleAddFunds = useCallback(
    async (
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
      if (!subspaceAccount) return setFormError('Not a subspace account connected')
      if (action.operatorId === null)
        return setFormError('Please select an operator to add funds to')

      try {
        const amount = floatToStringWithDecimals(values.amount, tokenDecimals)
        const tx = await api.tx.domains.nominateOperator(action.operatorId.toString(), amount)
        await sendAndSaveTx({
          call: 'nominateOperator',
          tx,
          signer: injector.signer,
          error: setFormError,
        })
        sendGAEvent('event', 'nominateOperator', {
          value: `operatorID:${action.operatorId.toString()}`,
        })
        resetForm()
        handleClose()
      } catch (error) {
        setFormError('There was an error while adding funds to the operator')
        console.error('Error', error)
        sendGAEvent('event', 'error', { value: 'nominateOperator' })
      }
    },
    [api, injector, subspaceAccount, action.operatorId, tokenDecimals, sendAndSaveTx, handleClose],
  )

  const handleWithdraw = useCallback(
    async (
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
      if (action.operatorId === null)
        return setFormError('Please select an operator to add funds to')

      try {
        const tx = await api.tx.domains.withdrawStake(action.operatorId, values.amount.toString())
        await sendAndSaveTx({
          call: 'withdrawStake',
          tx,
          signer: injector.signer,
          error: setFormError,
        })
        sendGAEvent('event', 'withdrawStake', {
          value: `operatorID:${action.operatorId.toString()}`,
        })
        resetForm()
        handleClose()
      } catch (error) {
        setFormError('There was an error while withdraw funds from the operator')
        console.error('Error', error)
        sendGAEvent('event', 'error', { value: 'withdrawStake' })
      }
    },
    [api, injector, action.operatorId, sendAndSaveTx, handleClose],
  )

  const handleDeregister = useCallback(async () => {
    if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
    if (action.operatorId === null) return setFormError('Please select an operator to add funds to')

    try {
      const tx = await api.tx.domains.deregisterOperator(action.operatorId)
      await sendAndSaveTx({
        call: 'deregisterOperator',
        tx,
        signer: injector.signer,
        error: setFormError,
      })
      sendGAEvent('event', 'deregisterOperator', {
        value: `operatorID:${action.operatorId.toString()}`,
      })
      handleClose()
    } catch (error) {
      setFormError('There was an error while de-registering the operator')
      console.error('Error', error)
      sendGAEvent('event', 'error', { value: 'deregisterOperator' })
    }
  }, [api, injector, action.operatorId, sendAndSaveTx, handleClose])

  const handleUnlockFunds = useCallback(async () => {
    if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
    if (action.operatorId === null) return setFormError('Please select an operator to add funds to')

    try {
      const tx = await api.tx.domains.unlockFunds(action.operatorId)
      await sendAndSaveTx({
        call: 'unlockFunds',
        tx,
        signer: injector.signer,
        error: setFormError,
      })
      sendGAEvent('event', 'unlockFunds', {
        value: `operatorID:${action.operatorId.toString()}`,
      })
      handleClose()
    } catch (error) {
      setFormError('There was an error while de-registering the operator')
      console.error('Error', error)
      sendGAEvent('event', 'error', { value: 'unlockFunds' })
    }
  }, [api, injector, action.operatorId, sendAndSaveTx, handleClose])

  const handleUnlockOperator = useCallback(async () => {
    if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
    if (action.operatorId === null) return setFormError('Please select an operator to add funds to')

    try {
      const tx = await api.tx.domains.unlockOperator(action.operatorId)
      await sendAndSaveTx({
        call: 'unlockFunds',
        tx,
        signer: injector.signer,
        error: setFormError,
      })
      sendGAEvent('event', 'unlockOperator', {
        value: `operatorID:${action.operatorId.toString()}`,
      })
      handleClose()
    } catch (error) {
      setFormError('There was an error while de-registering the operator')
      console.error('Error', error)
      sendGAEvent('event', 'error', { value: 'unlockOperator' })
    }
  }, [api, injector, action.operatorId, sendAndSaveTx, handleClose])

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
      case OperatorActionType.Nominating:
        return (
          <div className='flex flex-col items-start gap-4'>
            <Formik
              initialValues={initialValues}
              validationSchema={addFundsFormValidationSchema}
              onSubmit={(values, { resetForm }) =>
                OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                OperatorActionType.Nominating
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
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    {`Amount to ${
                      OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                      OperatorActionType.Nominating
                        ? 'stake'
                        : 'withdraw'
                    }`}{' '}
                    ({selectedChain.token.symbol})
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
                            OperatorActionType.Nominating
                              ? 'stake'
                              : 'withdraw'
                          }`}
                          className={`mt-4 block w-full rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                            errors.amount &&
                            'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                          }`}
                        />
                        <button
                          className='absolute flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
                          type='button'
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                          onClick={() => setFieldValue('amount', maxAmountToAdd)}
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
                      className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
      case OperatorActionType.Withdraw:
        return (
          <div className='flex flex-col items-start gap-4'>
            <Formik
              initialValues={initialValues}
              validationSchema={withdrawFundsFormValidationSchema}
              onSubmit={(values, { resetForm }) =>
                OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                OperatorActionType.Nominating
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
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    {`Amount to ${
                      OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                      OperatorActionType.Nominating
                        ? 'stake'
                        : 'withdraw'
                    }`}
                  </span>
                  <FieldArray
                    name='dischargeNorms'
                    render={() => (
                      <div className='relative w-[400px]'>
                        <div className='flex items-center'>
                          <Slider
                            min={0}
                            max={100}
                            defaultValue={0}
                            value={sliderValue}
                            onChange={(value) => {
                              const newValue = Array.isArray(value) ? value[0] : value
                              setSliderValue(newValue)
                              setFieldValue(
                                'amount',
                                (maxSharesToWithdraw * BigInt(newValue)) / BigInt(100),
                              )
                            }}
                            style={{ flexGrow: 1, marginRight: '10px' }} // Added margin to the right
                          />
                          <button
                            className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
                            type='button'
                            onClick={() => {
                              setSliderValue(100)
                              setFieldValue('amount', maxSharesToWithdraw)
                            }}
                          >
                            Max
                          </button>
                        </div>
                        <div className='mt-2 text-center text-sm font-medium dark:text-white'>
                          {sliderValue.toFixed(0)}% of your shares
                        </div>
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
                      className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
            <span className='mt-4 text-base font-medium text-grayDarker dark:text-white'>
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
      case OperatorActionType.UnlockFunds:
      case OperatorActionType.UnlockOperator:
        return (
          <div className='flex flex-col items-start gap-4'>
            <span className='mt-4 text-base font-medium text-grayDarker dark:text-white'>
              Do you really want to{' '}
              {OperatorActionType[action.type as keyof typeof OperatorActionType] ===
              OperatorActionType.UnlockFunds
                ? 'unlock the funds in your nomination'
                : 'unlock the funds in your operator'}{' '}
              ?
            </span>
            {ErrorPlaceholder}
            <button
              className='flex w-full max-w-fit items-center gap-2 rounded-full bg-red-500 px-2 text-sm font-medium text-white dark:bg-red-500 md:space-x-4 md:text-base'
              onClick={
                OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                OperatorActionType.UnlockFunds
                  ? handleUnlockFunds
                  : handleUnlockOperator
              }
            >
              {OperatorActionType[action.type as keyof typeof OperatorActionType]}
            </button>
          </div>
        )
      default:
        return null
    }
  }, [
    action.type,
    initialValues,
    addFundsFormValidationSchema,
    withdrawFundsFormValidationSchema,
    ErrorPlaceholder,
    handleDeregister,
    handleUnlockFunds,
    handleUnlockOperator,
    handleAddFunds,
    handleWithdraw,
    selectedChain.token.symbol,
    maxAmountToAdd,
    actingAccount,
    sliderValue,
    maxSharesToWithdraw,
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
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-blueAccent md:space-x-4 md:text-base'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
