'use client'

import {
  deregisterOperator,
  nominateOperator,
  unlockFunds,
  unlockNominator,
  withdrawStake,
  WithdrawStakeParams,
} from '@autonomys/auto-consensus'
import { sendGAEvent } from '@next/third-parties/google'
import { Modal } from 'components/common/Modal'
import { WalletType } from 'constants/wallet'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import { usePathname } from 'next/navigation'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { logTx } from 'utils/log'
import {
  bigNumberToFormattedString,
  floatToStringWithDecimals,
  formatUnitsToNumber,
} from 'utils/number'
import * as Yup from 'yup'

export enum OperatorActionType {
  None = 'none',
  Nominating = 'Nominate',
  Withdraw = 'Withdraw',
  Deregister = 'Deregister',
  UnlockFunds = 'Unlock Funds',
  UnlockNominator = 'Unlock Nominator',
}
export const ActionsInRed = [
  OperatorActionType.Deregister,
  OperatorActionType.Withdraw,
  OperatorActionType.UnlockFunds,
  OperatorActionType.UnlockNominator,
]

export type OperatorAction = {
  type: OperatorActionType
  operatorId: number | null
  minimumStake: bigint
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
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [sliderValue, setSliderValue] = useState(0)
  const { handleTxError, sendAndSaveTx } = useTxHelper()
  const pathname = usePathname()

  const initialValues: FormValues = useMemo(
    () => ({
      amount: 0,
    }),
    [],
  )

  const nominationInitialValue = useMemo(
    () => ({
      amount: parseFloat(bigNumberToFormattedString(action.minimumStake)),
    }),
    [action.minimumStake],
  )

  const maxAmountToAdd = useMemo(
    () =>
      walletBalance > AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT
        ? parseFloat((walletBalance - AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT).toFixed(5))
        : 0,
    [walletBalance],
  )

  const addFundsFormValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .moreThan(0, `Amount need to be greater than 0 ${tokenSymbol}`)
      .max(maxAmountToAdd, `Amount need to be less than ${maxAmountToAdd} ${tokenSymbol}`)
      .required('Amount to stake is required'),
  })

  const withdrawFundsFormValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .moreThan(0, 'Amount need to be greater than 0%')
      .test('max', 'Amount need to be less than 100%', function (value) {
        return typeof value === 'number' && value <= 100
      })
      .required('Percentage to withdraw is required'),
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
        const operatorId = action.operatorId.toString()
        const amountToStake = floatToStringWithDecimals(values.amount, tokenDecimals)
        const tx = await nominateOperator({
          api,
          operatorId,
          amountToStake,
        })
        const hash = await sendAndSaveTx({
          call: 'nominateOperator',
          tx,
          signer: injector.signer,
          error: setFormError,
        })
        sendGAEvent('event', 'nominateOperator', {
          value: `operatorID:${action.operatorId.toString()}`,
        })
        resetForm()
        if (hash) await logTx(pathname, hash.toString(), 'nominateOperator')
        handleClose()
      } catch (error) {
        handleTxError(
          'There was an error while adding funds to the operator',
          'nominateOperator',
          setFormError,
        )
      }
    },
    [
      injector,
      api,
      subspaceAccount,
      action.operatorId,
      tokenDecimals,
      sendAndSaveTx,
      pathname,
      handleClose,
      handleTxError,
    ],
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
        const operatorId = action.operatorId.toString()
        const percent = values.amount.toString()
        const params: WithdrawStakeParams = {
          api,
          operatorId,
          ...(percent === '100' ? { all: true } : { percent }),
        }
        const tx = await withdrawStake(params)
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
        handleTxError(
          'There was an error while withdraw funds from the operator',
          'withdrawStake',
          setFormError,
        )
      }
    },
    [injector, api, action.operatorId, sendAndSaveTx, handleClose, handleTxError],
  )

  const handleDeregister = useCallback(async () => {
    if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
    if (action.operatorId === null) return setFormError('Please select an operator to add funds to')

    try {
      const operatorId = action.operatorId.toString()
      const tx = await deregisterOperator({ api, operatorId })
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
      const operatorId = action.operatorId.toString()
      const tx = await unlockFunds({ api, operatorId })
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
      handleTxError(
        'There was an error while unlocking the funds of the operator',
        'unlockFunds',
        setFormError,
      )
    }
  }, [injector, api, action.operatorId, sendAndSaveTx, handleClose, handleTxError])

  const handleUnlockNominator = useCallback(async () => {
    if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
    if (action.operatorId === null) return setFormError('Please select an operator to add funds to')

    try {
      const operatorId = action.operatorId.toString()
      const tx = await unlockNominator({ api, operatorId })
      await sendAndSaveTx({
        call: 'unlockNominator',
        tx,
        signer: injector.signer,
        error: setFormError,
      })
      sendGAEvent('event', 'unlockNominator', {
        value: `operatorID:${action.operatorId.toString()}`,
      })
      handleClose()
    } catch (error) {
      handleTxError(
        'There was an error while unlocking the stake of the nominator',
        'unlockNominator',
        setFormError,
      )
    }
  }, [injector, api, action.operatorId, sendAndSaveTx, handleClose, handleTxError])

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
              initialValues={nominationInitialValue}
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
                  <span className='text-sm font-medium text-grayDarker dark:text-white'>
                    {`Amount to ${
                      OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                      OperatorActionType.Nominating
                        ? 'stake'
                        : 'withdraw'
                    }`}{' '}
                    ({tokenSymbol})
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
                          className={`mt-2 block w-full rounded-md border border-grayDark bg-white px-4 py-[10px] pr-[60px] text-sm text-gray-900 dark:bg-blueAccent dark:text-white ${
                            errors.amount &&
                            'block w-full rounded-full border border-red-500 bg-white px-4 py-[10px] text-sm text-gray-900'
                          }`}
                        />
                        <button
                          className='absolute flex items-center gap-2 rounded-md px-2 text-sm font-medium text-primaryAccent dark:text-white md:space-x-4 md:text-base'
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
                      <span className='mt-2 h-6 text-xs text-red-500' data-testid='errorMessage'>
                        You don&apos;t have enough balance to stake
                      </span>
                    ) : (
                      <div className='mt-2 h-6 text-xs text-red-500' data-testid='errorMessage'>
                        {errors.amount}
                      </div>
                    )
                  ) : null}
                  {ErrorPlaceholder}
                  {!actingAccount ? (
                    <div
                      className='mt-4 text-center text-xs text-red-500'
                      data-testid='errorMessage'
                    >
                      You need to connect your wallet
                    </div>
                  ) : (
                    <div className='mt-4 flex w-full items-center justify-center gap-2'>
                      <button
                        className='w-full rounded-full bg-gradient-to-r from-buttonLightFrom to-buttonLightTo px-4 py-2 font-medium text-white transition-colors hover:from-gradientVia hover:to-gradientTo focus:outline-none focus:ring-2 focus:ring-primaryAccent focus:ring-offset-2'
                        type='submit'
                      >
                        {OperatorActionType[action.type as keyof typeof OperatorActionType]}
                      </button>
                      <button
                        className='w-full rounded-full border border-grayDark bg-white px-4 py-2 text-sm font-medium text-grayDarker hover:bg-gray-100 dark:bg-primaryAccent'
                        type='button'
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
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
                        <div className='mb-4 flex w-full items-center justify-between'>
                          <button
                            className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
                            type='button'
                            onClick={() => {
                              setSliderValue(25)
                              setFieldValue('amount', 25)
                            }}
                          >
                            25%
                          </button>
                          <button
                            className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
                            type='button'
                            onClick={() => {
                              setSliderValue(50)
                              setFieldValue('amount', 50)
                            }}
                          >
                            50%
                          </button>
                          <button
                            className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
                            type='button'
                            onClick={() => {
                              setSliderValue(75)
                              setFieldValue('amount', 75)
                            }}
                          >
                            75%
                          </button>
                          <button
                            className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
                            type='button'
                            onClick={() => {
                              setSliderValue(100)
                              setFieldValue('amount', 100)
                            }}
                          >
                            All
                          </button>
                        </div>
                        <div className='flex items-center'>
                          <Slider
                            min={0}
                            max={100}
                            defaultValue={0}
                            value={sliderValue}
                            onChange={(value) => {
                              const newValue = Array.isArray(value) ? value[0] : value
                              setSliderValue(newValue)
                              setFieldValue('amount', newValue)
                            }}
                            style={{ flexGrow: 1, marginRight: '10px' }} // Added margin to the right
                          />
                          <button
                            className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
                            type='button'
                            onClick={() => {
                              setSliderValue(100)
                              setFieldValue('amount', 100)
                            }}
                          >
                            Max
                          </button>
                        </div>
                        <div className='mt-2 text-center text-sm font-medium dark:text-white'>
                          {sliderValue.toFixed(0)}% of your stake
                        </div>
                      </div>
                    )}
                  />
                  {(errors.amount && touched.amount) || maxAmountToAdd === 0 ? (
                    maxAmountToAdd === 0 ? (
                      <span className='mt-2 h-6 text-xs text-red-500' data-testid='errorMessage'>
                        You don&apos;t have enough balance to stake
                      </span>
                    ) : (
                      <div className='mt-2 h-6 text-sm text-red-500' data-testid='errorMessage'>
                        {errors.amount}
                      </div>
                    )
                  ) : (
                    <div className='mt-2 h-6 text-sm' data-testid='placeHolder' />
                  )}
                  {ErrorPlaceholder}
                  {!actingAccount ? (
                    <div className='mt-2 h-6 text-sm text-red-500' data-testid='errorMessage'>
                      You need to connect your wallet
                    </div>
                  ) : (
                    <button
                      className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
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
      case OperatorActionType.UnlockNominator:
        return (
          <div className='flex flex-col items-start gap-4'>
            <span className='mt-4 text-base font-medium text-grayDarker dark:text-white'>
              Do you really want to unlock the funds in your
              {action.type === OperatorActionType.UnlockFunds ? 'operator' : 'nominator'} ?
            </span>
            {ErrorPlaceholder}
            <button
              className='flex w-full max-w-fit items-center gap-2 rounded-full bg-red-500 px-2 text-sm font-medium text-white dark:bg-red-500 md:space-x-4 md:text-base'
              onClick={
                OperatorActionType[action.type as keyof typeof OperatorActionType] ===
                OperatorActionType.UnlockFunds
                  ? handleUnlockFunds
                  : handleUnlockNominator
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
    handleUnlockNominator,
    handleAddFunds,
    handleWithdraw,
    tokenSymbol,
    maxAmountToAdd,
    actingAccount,
    sliderValue,
    handleClose,
  ])

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  return (
    <Modal title={action.type} onClose={handleClose} isOpen={isOpen} size='md'>
      {/* <div className='flex flex-col items-start gap-4'> */}
      {/* <div className='flex flex-col items-center gap-4'> */}
      {/* <div className='grid grid-cols-1 gap-4'> */}
      {ActionBody}

      {/* </div> */}
      {/* </div> */}
      {/* <button
        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-blueAccent md:space-x-4 md:text-base'
        onClick={onClose}
      >
        Close
      </button> */}
      {/* </div> */}
    </Modal>
  )
}
