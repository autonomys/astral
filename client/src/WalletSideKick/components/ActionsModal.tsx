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
import { camelToNormal, floatToStringWithDecimals, formatUnitsToNumber } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import useWallet from 'common/hooks/useWallet'
import { INTERNAL_ROUTES } from 'common/routes'

// layout
import chains from 'layout/config/chains.json'

// wallet sidekick
import {
  AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT,
  ActionType,
  ExtrinsicsSupportedModule,
} from '../constants'
import {
  ExtrinsicModule,
  ExtrinsicsCategorySelector,
  ExtrinsicsInputs,
  ExtrinsicsList,
  ExtrinsicsMethodSelector,
} from './ExtrinsicsLab'

type ActionsModalProps = {
  isOpen: boolean
  action: ActionType
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
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({})

  const resetCategory = useCallback(() => {
    setSelectedCategory(null)
    setSelectedMethod(null)
    setSelectedValues({})
  }, [])
  const resetMethod = useCallback(() => {
    setSelectedMethod(null)
    setSelectedValues({})
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
  const consensusChain = useMemo(
    () => chains.find((chain) => chain.urls.page === selectedChain.urls.page) ?? chains[0],
    [selectedChain],
  )
  const consensusApi = useMemo(() => api && api[consensusChain.urls.page], [api, consensusChain])

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
        [Object.values(ExtrinsicsSupportedModule)[idx.toString()]]: module,
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
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the transaction'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
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
        resetForm()
      } catch (error) {
        const reason = 'There was an error while signing the message'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
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
        resetForm()
      } catch (error) {
        const reason = 'There was an error while sending the remark'
        setFormError(reason)
        toast.error(reason, { position: 'bottom-center' })
        console.error('Error', error)
      }
    },
    [actingAccount, consensusApi, injector],
  )

  const handleCustomExtrinsic = useCallback(async () => {
    if (!actingAccount || !injector || !consensusApi)
      return setFormError('We are not able to connect to the blockchain')

    if (!selectedCategory) return setFormError('You need to select a category')
    if (!selectedMethod) return setFormError('You need to select a method')

    try {
      const hash = await consensusApi.tx[selectedCategory][selectedMethod](
        selectedValues,
      ).signAndSend(actingAccount.address, { signer: injector.signer })
      setHash(hash)
      toast.success('The extrinsic was sent', { position: 'bottom-center' })
      setSelectedValues({})
    } catch (error) {
      const reason = 'There was an error while sending the extrinsic'
      setFormError(reason)
      toast.error(reason, { position: 'bottom-center' })
      console.error('Error', error)
    }
  }, [actingAccount, consensusApi, injector, selectedCategory, selectedMethod, selectedValues])

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
    switch (ActionType[action]) {
      case ActionType.SendToken:
      case ActionType.SendRemark:
      case ActionType.ExtrinsicsLab:
        return hash && hash.toString()
      case ActionType.SignMessage:
        return signature && signature.signature
    }
  }, [action, hash, signature])

  const ActionBody = useMemo(() => {
    switch (ActionType[action]) {
      case ActionType.SendToken:
        return (
          <div className='flex flex-col gap-4 items-start'>
            {result ? (
              <>
                {hash && ActionType[action] === ActionType.SendToken && (
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                <textarea
                  name='hash'
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
                        ActionType[action] === ActionType.SendToken ? 'send' : 'withdraw'
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
                              ActionType[action] === ActionType.SendToken ? 'stake' : 'withdraw'
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
                        className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4] capitalize'
                        type='submit'
                      >
                        {camelToNormal(ActionType[action])}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )
      case ActionType.SendRemark:
      case ActionType.SignMessage:
        return (
          <div className='flex flex-col gap-4 items-start'>
            {result ? (
              <>
                {hash && ActionType[action] === ActionType.SendRemark && (
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                {signature && ActionType[action] === ActionType.SignMessage && (
                  <span className='text-[#241235] text-base font-medium dark:text-white'>
                    Signature # {signature.id}
                  </span>
                )}
                <textarea
                  name={ActionType[action] === ActionType.SendRemark ? 'hash' : 'signature'}
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
                  ActionType[action] === ActionType.SendRemark
                    ? handleSendRemark(values, resetForm)
                    : handleSignMessage(values, resetForm)
                }
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                    <span className='text-[#241235] text-base font-medium dark:text-white'>
                      {ActionType[action] === ActionType.SendRemark ? 'Remark' : 'Message'}
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
                        className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4] capitalize'
                        type='submit'
                      >
                        {camelToNormal(ActionType[action])}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )
      case ActionType.ReceiveToken:
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
                  className='dark:bg-[#1E254E] dark:focus:bg-[#1E254E] dark:text-white block px-4 py-2 w-full text-sm text-gray-900 rounded-xl bg-white shadow-lg'
                />
              </>
            )}
          </div>
        )
      case ActionType.ExtrinsicsLab:
        return (
          <div className='flex flex-col gap-4 items-start'>
            {result ? (
              <>
                <span className='text-[#241235] text-base font-medium dark:text-white'>
                  Extrinsic Hash
                </span>
                <textarea
                  name='hash'
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
                initialValues={initialSendTokenValues}
                validationSchema={sendTokenFormValidationSchema}
                onSubmit={() => handleCustomExtrinsic()}
              >
                {({ handleSubmit }) => (
                  <Form
                    className='w-[400px]'
                    onSubmit={handleSubmit}
                    data-testid='testSendTokenForm'
                  >
                    <ExtrinsicsCategorySelector
                      extrinsicsList={extrinsicsList}
                      setSelectedCategory={setSelectedCategory}
                      resetCategory={resetCategory}
                    />
                    {selectedCategory && (
                      <ExtrinsicsMethodSelector
                        extrinsicsList={extrinsicsList}
                        selectedCategory={selectedCategory}
                        setSelectedMethod={setSelectedMethod}
                        resetMethod={resetMethod}
                      />
                    )}
                    {selectedCategory && selectedMethod && (
                      <ExtrinsicsInputs
                        extrinsicsList={extrinsicsList}
                        selectedCategory={selectedCategory}
                        selectedMethod={selectedMethod}
                        setSelectedValues={setSelectedValues}
                      />
                    )}
                    {ErrorPlaceholder}
                    {!actingAccount && (
                      <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                        You need to connect your wallet
                      </div>
                    )}
                    {selectedCategory && selectedMethod && (
                      <button
                        className='w-full max-w-fit flex px-2 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#DE67E4] capitalize'
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
