import { floatToStringWithDecimals, formatUnitsToNumber } from '@/utils/number'
import { camelToNormal } from '@/utils/string'
import { sendGAEvent } from '@next/third-parties/google'
import { SignerResult } from '@polkadot/api/types'
import { Hash } from '@polkadot/types/interfaces'
import { CopyButton } from 'components/common/CopyButton'
import { Modal } from 'components/common/Modal'
import { Tooltip } from 'components/common/Tooltip'
import { chains } from 'constants/chains'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT,
  ExtrinsicsSupportedModule,
  WalletAction,
} from 'constants/wallet'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import {
  CustomExtrinsicFormValues,
  ExtrinsicModule,
  ExtrinsicsCategorySelector,
  ExtrinsicsInputs,
  ExtrinsicsList,
  ExtrinsicsMethodSelector,
} from './ExtrinsicsLab'

type ActionsModalProps = {
  isOpen: boolean
  action: WalletAction
  onClose: () => void
}

interface SendTokenFormValues {
  receiver: string
  amount: number
}
interface MessageFormValues {
  message: string
}

export const ActionsModal: FC<ActionsModalProps> = ({ isOpen, action, onClose }) => {
  const { selectedChain } = useDomains()
  const { api, actingAccount, injector, subspaceAccount } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [signature, setSignature] = useState<SignerResult | undefined>(undefined)
  const [hash, setHash] = useState<Hash | undefined>(undefined)
  const [extrinsicsList, setExtrinsicsList] = useState<ExtrinsicsList>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const resetCategory = useCallback((extra?: () => void) => {
    setSelectedCategory(null)
    setSelectedMethod(null)
    extra && extra()
  }, [])
  const resetMethod = useCallback((extra?: () => void) => {
    setSelectedMethod(null)
    extra && extra()
  }, [])

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
  const initialCustomExtrinsicValues: CustomExtrinsicFormValues = useMemo(
    () =>
      selectedCategory &&
      selectedMethod &&
      extrinsicsList[selectedCategory][selectedMethod] &&
      extrinsicsList[selectedCategory][selectedMethod].args
        ? Object.keys(extrinsicsList[selectedCategory][selectedMethod].args).reduce(
            (acc, key) => ({ ...acc, [key]: '' }),
            {},
          )
        : {},
    [selectedCategory, selectedMethod, extrinsicsList],
  )

  const maxAmount = useMemo(
    () =>
      walletBalance > AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT
        ? parseFloat((walletBalance - AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT).toFixed(5))
        : 0,
    [walletBalance],
  )

  const customExtrinsicFormValidationSchema = useMemo(
    () =>
      selectedCategory &&
      selectedMethod &&
      extrinsicsList[selectedCategory][selectedMethod] &&
      extrinsicsList[selectedCategory][selectedMethod].args &&
      Yup.object().shape(
        Object.keys(extrinsicsList[selectedCategory][selectedMethod].args).reduce(
          (acc, key) => ({ ...acc, [key]: Yup.string().required('This field is required') }),
          {},
        ),
      ),
    [selectedCategory, selectedMethod, extrinsicsList],
  )
  const consensusChain = useMemo(
    () => chains.find((chain) => chain.urls.page === selectedChain.urls.page) ?? chains[0],
    [selectedChain],
  )
  const consensusApi = useMemo(() => api && api[consensusChain.urls.page], [api, consensusChain])

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
    if (!consensusApi) return
    const data = await Promise.all([
      consensusApi.rpc.system.properties(),
      ...Object.values(ExtrinsicsSupportedModule).map((module) => consensusApi.tx[module]),
    ])
    const properties = data[0]
    const modules = (data.slice(1) as ExtrinsicModule[]).reduce(
      (acc, module, idx) => ({
        ...acc,
        [Object.values(ExtrinsicsSupportedModule)[idx]]: module,
      }),
      {} as ExtrinsicsList,
    )
    setTokenDecimals((properties.tokenDecimals.toPrimitive() as number[])[0])
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
    setExtrinsicsList(modules)
  }, [consensusApi])

  const loadWalletBalance = useCallback(async () => {
    if (!actingAccount || !consensusApi) return

    const balance = await consensusApi.query.system.account(actingAccount.address)
    setWalletBalance(
      formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
    )
  }, [consensusApi, actingAccount])

  const handleClose = useCallback(() => {
    setFormError(null)
    setSignature(undefined)
    setHash(undefined)
    resetCategory()
    onClose()
  }, [onClose, resetCategory])

  const handleSendToken = useCallback(
    async (
      values: SendTokenFormValues,
      resetForm: (nextState?: Partial<FormikState<SendTokenFormValues>> | undefined) => void,
    ) => {
      if (!actingAccount || !injector || !consensusApi)
        return setFormError('We are not able to connect to the blockchain')
      try {
        const hash = await consensusApi.tx.balances
          .transferKeepAlive(
            values.receiver,
            floatToStringWithDecimals(values.amount, tokenDecimals),
          )
          .signAndSend(actingAccount.address, { signer: injector.signer })
        setHash(hash)
        toast.success('The transaction was sent successfully', { position: 'bottom-center' })
        sendGAEvent({
          event: 'walletSideKick_action_sendToken',
          value: `extrinsic:${hash.toString()}`,
        })
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the transaction'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
        sendGAEvent({
          event: 'walletSideKick_action_sendToken_error',
          value: error || 'unknown error',
        })
      }
    },
    [consensusApi, actingAccount, injector, tokenDecimals],
  )

  const handleSignMessage = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
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
        const reason = 'There was an error while signing the message'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
        sendGAEvent({
          event: 'walletSideKick_action_signMessage_error',
          value: error || 'unknown error',
        })
      }
    },
    [actingAccount, injector],
  )

  const handleSendRemark = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
    ) => {
      if (!actingAccount || !injector || !consensusApi)
        return setFormError('We are not able to connect to the blockchain')
      try {
        const hash = await consensusApi.tx.system
          .remark(values.message)
          .signAndSend(actingAccount.address, { signer: injector.signer })
        setHash(hash)
        toast.success('The remark was sent', { position: 'bottom-center' })
        sendGAEvent({
          event: 'walletSideKick_action_sendRemark',
          value: `msg:${values.message}`,
        })
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the remark'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
        sendGAEvent({
          event: 'walletSideKick_action_sendRemark_error',
          value: error || 'unknown error',
        })
      }
    },
    [actingAccount, consensusApi, injector],
  )

  const handleCustomExtrinsic = useCallback(
    async (
      values: CustomExtrinsicFormValues,
      resetForm: (nextState?: Partial<FormikState<CustomExtrinsicFormValues>> | undefined) => void,
    ) => {
      if (!actingAccount || !injector || !consensusApi)
        return setFormError('We are not able to connect to the blockchain')
      if (!selectedCategory) return setFormError('You need to select a category')
      if (!selectedMethod) return setFormError('You need to select a method')
      try {
        const hash = await consensusApi.tx[selectedCategory][selectedMethod](
          ...Object.keys(values).map((key) => values[key]),
        ).signAndSend(actingAccount.address, { signer: injector.signer })
        setHash(hash)
        toast.success('The extrinsic was sent', { position: 'bottom-center' })
        sendGAEvent({
          event: 'walletSideKick_action_customExtrinsic',
          value: `category:${selectedCategory}:method:${selectedMethod}:extrinsic:${hash.toString()}`,
        })
        resetCategory()
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the extrinsic'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
        sendGAEvent({
          event: 'walletSideKick_action_customExtrinsic_error',
          value: error || 'unknown error',
        })
      }
    },
    [actingAccount, consensusApi, injector, selectedCategory, selectedMethod, resetCategory],
  )

  const handleCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard', { position: 'bottom-center' })
  }, [])

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

  const result = useMemo(() => {
    switch (WalletAction[action]) {
      case WalletAction.SendToken:
      case WalletAction.SendRemark:
      case WalletAction.ExtrinsicsLab:
        return hash && hash.toString()
      case WalletAction.SignMessage:
        return signature && signature.signature
    }
  }, [action, hash, signature])

  const ActionBody = useMemo(() => {
    switch (WalletAction[action]) {
      case WalletAction.SendToken:
        return (
          <div className='flex flex-col items-start gap-4'>
            {result ? (
              <>
                {hash && WalletAction[action] === WalletAction.SendToken && (
                  <span className='text-base font-medium text-[#241235] dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                <textarea
                  name='hash'
                  value={result}
                  className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                  type='submit'
                >
                  Copy
                </button>
              </>
            ) : (
              <Formik
                initialValues={initialSendTokenValues}
                validationSchema={sendTokenFormValidationSchema}
                onSubmit={(values, { resetForm }) => handleSendToken(values, resetForm)}
              >
                {({ errors, touched, handleSubmit, setFieldValue }) => (
                  <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                    <span className='text-base font-medium text-[#241235] dark:text-white'>
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
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white ${
                              errors.amount &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          />
                        </div>
                      )}
                    />
                    {errors.receiver && touched.receiver ? (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        {errors.receiver}
                      </div>
                    ) : (
                      <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                    )}
                    <span className='text-base font-medium text-[#241235] dark:text-white'>
                      {`Amount to ${
                        WalletAction[action] === WalletAction.SendToken ? 'send' : 'withdraw'
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
                              WalletAction[action] === WalletAction.SendToken ? 'stake' : 'withdraw'
                            }`}
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white ${
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
                    {(errors.amount && touched.amount) || maxAmount === 0 ? (
                      maxAmount === 0 ? (
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
                        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium capitalize text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                        type='submit'
                      >
                        {camelToNormal(WalletAction[action])}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )
      case WalletAction.SendRemark:
      case WalletAction.SignMessage:
        return (
          <div className='flex flex-col items-start gap-4'>
            {result ? (
              <>
                {hash && WalletAction[action] === WalletAction.SendRemark && (
                  <span className='text-base font-medium text-[#241235] dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                {signature && WalletAction[action] === WalletAction.SignMessage && (
                  <span className='text-base font-medium text-[#241235] dark:text-white'>
                    Signature # {signature.id}
                  </span>
                )}
                <textarea
                  name={WalletAction[action] === WalletAction.SendRemark ? 'hash' : 'signature'}
                  value={result}
                  className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
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
                  WalletAction[action] === WalletAction.SendRemark
                    ? handleSendRemark(values, resetForm)
                    : handleSignMessage(values, resetForm)
                }
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                    <span className='text-base font-medium text-[#241235] dark:text-white'>
                      {WalletAction[action] === WalletAction.SendRemark ? 'Remark' : 'Message'}
                    </span>
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='message'
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white ${
                              errors.message &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {({ field }: any) => (
                              <textarea
                                {...field}
                                placeholder='Message'
                                className={`mt-4 block h-[120px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white ${
                                  errors.message &&
                                  'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                                }`}
                              />
                            )}
                          </Field>
                        </div>
                      )}
                    />
                    {errors.message && touched.message ? (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        {errors.message}
                      </div>
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
                        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium capitalize text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                        type='submit'
                      >
                        {camelToNormal(WalletAction[action])}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )
      case WalletAction.ReceiveToken:
        return (
          <div className='flex flex-col items-start gap-4'>
            {subspaceAccount && actingAccount && (
              <>
                <div className='flex items-center'>
                  <Link
                    data-testid='wallet-link'
                    className='pr-2 hover:text-[#DE67E4]'
                    href={INTERNAL_ROUTES.accounts.id.page(
                      selectedChain.urls.page,
                      'consensus',
                      subspaceAccount,
                    )}
                  >
                    <span className='ml-2 w-5 truncate text-lg font-medium text-[#241235] underline dark:text-white md:w-full'>
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
                  className='block w-full rounded-xl bg-white px-4 py-2 text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white dark:focus:bg-[#1E254E]'
                />
              </>
            )}
          </div>
        )
      case WalletAction.ExtrinsicsLab:
        return (
          <div className='flex flex-col items-start gap-4'>
            {result ? (
              <>
                <span className='text-base font-medium text-[#241235] dark:text-white'>
                  Extrinsic Hash
                </span>
                <textarea
                  name='hash'
                  value={result}
                  className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#1E254E] dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                  type='submit'
                >
                  Copy
                </button>
              </>
            ) : (
              <Formik
                initialValues={initialCustomExtrinsicValues}
                validationSchema={customExtrinsicFormValidationSchema}
                onSubmit={(values, { resetForm }) => handleCustomExtrinsic(values, resetForm)}
              >
                {({ errors, touched, handleSubmit, setFieldValue, resetForm }) => (
                  <Form
                    className='w-[400px]'
                    onSubmit={handleSubmit}
                    data-testid='testSendTokenForm'
                  >
                    <ExtrinsicsCategorySelector
                      extrinsicsList={extrinsicsList}
                      setSelectedCategory={setSelectedCategory}
                      resetCategory={() => resetCategory(resetForm)}
                    />
                    {selectedCategory && (
                      <ExtrinsicsMethodSelector
                        extrinsicsList={extrinsicsList}
                        selectedCategory={selectedCategory}
                        setSelectedMethod={setSelectedMethod}
                        resetMethod={() => resetMethod(resetForm)}
                      />
                    )}
                    {selectedCategory && selectedMethod && (
                      <ExtrinsicsInputs
                        extrinsicsList={extrinsicsList}
                        selectedCategory={selectedCategory}
                        selectedMethod={selectedMethod}
                        errors={errors}
                        touched={touched}
                        setSelectedValues={setFieldValue}
                      />
                    )}
                    {ErrorPlaceholder}
                    {!actingAccount && (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        You need to connect your wallet
                      </div>
                    )}
                    {selectedCategory && selectedMethod && (
                      <button
                        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium capitalize text-white dark:bg-[#DE67E4] md:space-x-4 md:text-base'
                        type='submit'
                      >
                        {camelToNormal(selectedMethod)}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
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
    extrinsicsList,
    selectedCategory,
    selectedMethod,
    setSelectedCategory,
    handleCustomExtrinsic,
    resetCategory,
    resetMethod,
    customExtrinsicFormValidationSchema,
    initialCustomExtrinsicValues,
  ])

  useEffect(() => {
    loadData()
  }, [api, loadData])

  useEffect(() => {
    loadWalletBalance()
  }, [api, actingAccount, loadWalletBalance])

  return (
    <Modal title={action} onClose={handleClose} isOpen={isOpen}>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-1 gap-4'>{ActionBody}</div>
        </div>
        <button
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#1E254E] md:space-x-4 md:text-base'
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
