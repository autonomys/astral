import { SignerResult } from '@polkadot/api/types'
import { Hash } from '@polkadot/types/interfaces'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import { QRCodeSVG } from 'qrcode.react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

// common
import { CopyButton, Tooltip } from 'common/components'
import Modal from 'common/components/Modal'
import { floatToStringWithDecimals, formatUnitsToNumber } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

export enum WalletActionType {
  None = 'none',
  SendToken = 'SendToken',
  ReceiveToken = 'ReceiveToken',
  SignMessage = 'SignMessage',
  SendRemark = 'SendRemark',
}

type Props = {
  isOpen: boolean
  action: WalletActionType
  onClose: () => void
}

interface SendTokenFormValues {
  receiver: string
  amount: number
}
interface MessageFormValues {
  message: string
}

const AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT = 0.0001

export const ActionsModal: FC<Props> = ({ isOpen, action, onClose }) => {
  const { selectedChain } = useDomains()
  const { api, actingAccount, injector, subspaceAccount } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [signature, setSignature] = useState<SignerResult | undefined>(undefined)
  const [hash, setHash] = useState<Hash | undefined>(undefined)

  const initialSendTokenValues: SendTokenFormValues = useMemo(
    () => ({
      receiver: '',
      amount: 0,
    }),
    [],
  )
  const initialMessageValues: MessageFormValues = useMemo(
    () => ({
      message: '',
    }),
    [],
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
      }),
    [maxAmount, tokenSymbol],
  )
  const messageFormValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        message: Yup.string().required('Message is required'),
      }),
    [],
  )

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
    setSignature(undefined)
    setHash(undefined)
    onClose()
  }, [onClose])

  const handleSendToken = useCallback(
    async (
      values: SendTokenFormValues,
      resetForm: (nextState?: Partial<FormikState<SendTokenFormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector || !api[selectedChain.urls.page])
        return setFormError('We are not able to connect to the blockchain')

      try {
        const block = await api[selectedChain.urls.page].rpc.chain.getBlock()
        const hash = await api[selectedChain.urls.page].tx.balances
          .transferKeepAlive(
            values.receiver,
            floatToStringWithDecimals(values.amount, tokenDecimals),
          )
          .signAndSend(actingAccount.address, { signer: injector.signer })

        setHash(hash)
        console.log('block', block)
        console.log('hash', hash)

        toast.success('The transaction was sent successfully', { position: 'bottom-center' })
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the transaction'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
      }
    },
    [api, actingAccount, injector, tokenDecimals, selectedChain],
  )

  const handleSignMessage = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector || !api[selectedChain.urls.page])
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
        resetForm()
      } catch (error) {
        const reason = 'There was an error while signing the message'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
      }
    },
    [api, actingAccount, injector, selectedChain],
  )

  const handleSendRemark = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector || !api[selectedChain.urls.page])
        return setFormError('We are not able to connect to the blockchain')

      try {
        const block = await api[selectedChain.urls.page].rpc.chain.getBlock()
        const hash = await api[selectedChain.urls.page].tx.system
          .remark(values.message)
          .signAndSend(actingAccount.address, { signer: injector.signer })

        setHash(hash)
        console.log('block', block)
        console.log('hash', hash)

        toast.success('The remark was sent', { position: 'bottom-center' })
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the remark'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
      }
    },
    [actingAccount, api, injector, selectedChain],
  )

  const handleCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard', { position: 'bottom-center' })
  }, [])

  const ErrorPlaceholder = useMemo(
    () =>
      formError ? (
        <div className='text-red-500 text-md h-8' data-testid='errorMessage'>
          {formError}
        </div>
      ) : (
        <div className='text-md h-4' data-testid='placeHolder' />
      ),
    [formError],
  )

  const result = useMemo(() => {
    switch (WalletActionType[action]) {
      case WalletActionType.SendRemark:
        return hash && hash.toString()
      case WalletActionType.SignMessage:
        return signature && signature.signature
    }
  }, [action, hash, signature])

  const ActionBody = useMemo(() => {
    switch (WalletActionType[action]) {
      case WalletActionType.SendToken:
        return (
          <div className='flex flex-col gap-4 items-start'>
            <Formik
              initialValues={initialSendTokenValues}
              validationSchema={sendTokenFormValidationSchema}
              onSubmit={(values, { resetForm }) => handleSendToken(values, resetForm)}
            >
              {({ errors, touched, handleSubmit, setFieldValue }) => (
                <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Send to
                  </span>
                  <FieldArray
                    name='dischargeNorms'
                    render={() => (
                      <div className='relative'>
                        <Field
                          name='receiver'
                          type='text'
                          placeholder='Send to'
                          className={`dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] mt-4 w-[400px] text-sm text-gray-900 rounded-xl bg-white shadow-lg ${
                            errors.amount &&
                            'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg'
                          }`}
                        />
                      </div>
                    )}
                  />
                  {errors.receiver && touched.receiver ? (
                    <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                      {errors.receiver}
                    </div>
                  ) : (
                    <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                  )}
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    {`Amount to ${
                      WalletActionType[action] === WalletActionType.SendToken ? 'send' : 'withdraw'
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
                            WalletActionType[action] === WalletActionType.SendToken
                              ? 'stake'
                              : 'withdraw'
                          }`}
                          className={`dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] mt-4 w-[400px] text-sm text-gray-900 rounded-xl bg-white shadow-lg ${
                            errors.amount &&
                            'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg'
                          }`}
                        />
                        <button
                          className='absolute flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4]'
                          type='button'
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                          onClick={() => setFieldValue('amount', maxAmount)}
                        >
                          Max
                        </button>
                      </div>
                    )}
                  />
                  {(errors.amount && touched.amount) || maxAmount === 0 ? (
                    maxAmount === 0 ? (
                      <span className='text-red-500 text-md h-8' data-testid='errorMessage'>
                        You don&apos;t have enough balance to stake
                      </span>
                    ) : (
                      <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                        {errors.amount}
                      </div>
                    )
                  ) : (
                    <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                  )}
                  {ErrorPlaceholder}
                  {!actingAccount ? (
                    <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                      You need to connect your wallet
                    </div>
                  ) : (
                    <button
                      className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4]'
                      type='submit'
                    >
                      {WalletActionType[action]}
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        )
      case WalletActionType.SendRemark:
      case WalletActionType.SignMessage:
        return (
          <div className='flex flex-col gap-4 items-start'>
            {result ? (
              <>
                {hash && WalletActionType[action] === WalletActionType.SendRemark && (
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                {signature && WalletActionType[action] === WalletActionType.SignMessage && (
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Signature # {signature.id}
                  </span>
                )}
                <textarea
                  name='signature'
                  value={result}
                  className='dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] mt-4 w-[400px] h-[80px] text-sm text-gray-900 rounded-xl bg-white shadow-lg'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4]'
                  type='submit'
                >
                  Copy
                </button>
              </>
            ) : (
              <Formik
                initialValues={initialMessageValues}
                validationSchema={messageFormValidationSchema}
                onSubmit={(values, { resetForm }) =>
                  WalletActionType[action] === WalletActionType.SendRemark
                    ? handleSendRemark(values, resetForm)
                    : handleSignMessage(values, resetForm)
                }
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                    <span className='text-[#241235] text-base font-medium dark:text-white'>
                      {WalletActionType[action] === WalletActionType.SendRemark
                        ? 'Remark'
                        : 'Message'}
                    </span>
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='message'
                            className={`dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] mt-4 w-[400px] text-sm text-gray-900 rounded-xl bg-white shadow-lg ${
                              errors.message &&
                              'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg'
                            }`}
                          >
                            {({ field }) => (
                              <textarea
                                {...field}
                                placeholder='Message'
                                className={`dark:bg-[#1E254E] dark:text-white block px-4 py-[10px] mt-4 w-[400px] h-[120px] text-sm text-gray-900 rounded-xl bg-white shadow-lg ${
                                  errors.message &&
                                  'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg'
                                }`}
                              />
                            )}
                          </Field>
                        </div>
                      )}
                    />
                    {errors.message && touched.message ? (
                      <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                        {errors.message}
                      </div>
                    ) : (
                      <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                    )}
                    {ErrorPlaceholder}
                    {!actingAccount ? (
                      <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                        You need to connect your wallet
                      </div>
                    ) : (
                      <button
                        className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4]'
                        type='submit'
                      >
                        {WalletActionType[action]}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )
      case WalletActionType.ReceiveToken:
        return (
          <div className='flex flex-col gap-4 items-start'>
            {subspaceAccount && actingAccount && (
              <>
                <div className='flex items-center'>
                  <Link
                    data-testid='wallet-link'
                    className='hover:text-[#DE67E4] pr-2'
                    to={INTERNAL_ROUTES.accounts.id.page(
                      selectedChain.urls.page,
                      'consensus',
                      subspaceAccount,
                    )}
                  >
                    <span className='ml-2 truncate w-5 text-lg underline md:w-full text-[#241235] font-medium dark:text-white'>
                      {actingAccount.name}
                    </span>
                  </Link>
                  <Tooltip text='Copy wallet address'>
                    <CopyButton value={subspaceAccount} message='Wallet address copied' />
                  </Tooltip>
                </div>
                <QRCodeSVG value={subspaceAccount} size={256} />
                <input
                  name='subspaceAccount'
                  type='text'
                  value={subspaceAccount}
                  readOnly
                  className='dark:bg-[#1E254E] dark:text-white block px-4 py-2 w-full text-sm text-gray-900 rounded-xl bg-white shadow-lg'
                />
              </>
            )}
          </div>
        )
      default:
        return null
    }
  }, [
    ErrorPlaceholder,
    actingAccount,
    action,
    sendTokenFormValidationSchema,
    messageFormValidationSchema,
    handleSendRemark,
    handleSendToken,
    handleSignMessage,
    initialSendTokenValues,
    initialMessageValues,
    maxAmount,
    subspaceAccount,
    selectedChain.urls.page,
    handleCopy,
    signature,
    hash,
    result,
  ])

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  return (
    <Modal title={action} onClose={handleClose} isOpen={isOpen}>
      <div className='flex flex-col gap-4 items-start'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='grid grid-cols-1 gap-4'>{ActionBody}</div>
        </div>
        <button
          className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#1E254E]'
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
