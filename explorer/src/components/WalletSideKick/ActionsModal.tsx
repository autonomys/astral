import { remark, transfer } from '@autonomys/auto-consensus'
import { shortString, SignerResult } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { sendGAEvent } from '@next/third-parties/google'
import { CopyButton } from 'components/common/CopyButton'
import { Modal } from 'components/common/Modal'
import { Tooltip } from 'components/common/Tooltip'
import { INTERNAL_ROUTES } from 'constants/routes'
import {
  AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT,
  ExtrinsicsSupportedModule,
  WalletAction,
  WalletType,
} from 'constants/wallet'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import useIndexers from 'hooks/useIndexers'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAddressBookStates } from 'states/addressBook'
import { usePreferencesStates } from 'states/preferences'
import { formatAddress } from 'utils//formatAddress'
import { floatToStringWithDecimals, formatUnitsToNumber } from 'utils/number'
import { camelToNormal } from 'utils/string'
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

interface OptionalTxFormValues {
  nonce?: number
}

interface SendTokenFormValues extends OptionalTxFormValues {
  receiver: string
  amount: number
}
interface MessageFormValues extends OptionalTxFormValues {
  message: string
}

export const ActionsModal: FC<ActionsModalProps> = ({ isOpen, action, onClose }) => {
  const { network } = useIndexers()
  const { api, actingAccount, accounts, injector, subspaceAccount } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [signature, setSignature] = useState<SignerResult | undefined>(undefined)
  const [hash, setHash] = useState<string | undefined>(undefined)
  const [extrinsicsList, setExtrinsicsList] = useState<ExtrinsicsList>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [addressBookIsOpen, setAddressBookIsOpen] = useState<boolean>(false)
  const { sendAndSaveTx, handleTxError } = useTxHelper()
  const { addresses } = useAddressBookStates()
  const { enableDevMode } = usePreferencesStates()

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
      nonce: -1,
    }),
    [],
  )
  const initialMessageValues: MessageFormValues = useMemo(
    () => ({
      message: '',
      nonce: -1,
    }),
    [],
  )
  const initialCustomExtrinsicValues: CustomExtrinsicFormValues & OptionalTxFormValues = useMemo(
    () =>
      selectedCategory &&
      selectedMethod &&
      extrinsicsList[selectedCategory][selectedMethod] &&
      extrinsicsList[selectedCategory][selectedMethod].args
        ? Object.keys(extrinsicsList[selectedCategory][selectedMethod].args).reduce(
            (acc, key) => ({ ...acc, [key]: '' }),
            { nonce: -1 },
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
      Yup.object().shape({
        ...Object.keys(extrinsicsList[selectedCategory][selectedMethod].args).reduce(
          (acc, key) => ({ ...acc, [key]: Yup.string().required('This field is required') }),
          {},
        ),
        nonce: Yup.number().min(-1, 'Nonce must be greater or -1'),
      }),
    [selectedCategory, selectedMethod, extrinsicsList],
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
  const messageFormValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        message: Yup.string().required('Message is required'),
      }),
    [],
  )

  const loadData = useCallback(async () => {
    if (!api) return
    const data = await Promise.all([
      api.rpc.system.properties(),
      ...Object.values(ExtrinsicsSupportedModule).map((module) => api.tx[module]),
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
  }, [api])

  const loadWalletBalance = useCallback(async () => {
    if (!actingAccount || !api || actingAccount.type === WalletType.ethereum) return

    const balance = await api.query.system.account(actingAccount.address)
    setWalletBalance(
      formatUnitsToNumber((balance.toJSON() as { data: { free: string } }).data.free),
    )
  }, [api, actingAccount])

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
          setHash(hash.toString())
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
        handleTxError('There was an error while signing the message', 'signMessage', setFormError)
      }
    },
    [actingAccount, handleTxError, injector],
  )

  const handleSendRemark = useCallback(
    async (
      values: MessageFormValues,
      resetForm: (nextState?: Partial<FormikState<MessageFormValues>> | undefined) => void,
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
          setHash(hash.toString())
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

  const handleCustomExtrinsic = useCallback(
    async (
      values: CustomExtrinsicFormValues,
      resetForm: (nextState?: Partial<FormikState<CustomExtrinsicFormValues>> | undefined) => void,
    ) => {
      if (!injector || !api) return setFormError('We are not able to connect to the blockchain')
      if (!selectedCategory) return setFormError('You need to select a category')
      if (!selectedMethod) return setFormError('You need to select a method')
      try {
        const tx = await api.tx[selectedCategory][selectedMethod](
          ...Object.keys(values).map((key) => values[key]),
        )
        const hash = await sendAndSaveTx({
          call: `${selectedCategory}.${selectedMethod}`,
          tx,
          signer: injector.signer,
          nonce: typeof values.nonce === 'string' ? parseInt(values.nonce) : values.nonce,
          error: setFormError,
        })
        if (hash) {
          setHash(hash.toString())
          toast.success('The extrinsic was sent', { position: 'bottom-center' })
          sendGAEvent({
            event: 'walletSideKick_action_customExtrinsic',
            value: `category:${selectedCategory}:method:${selectedMethod}:extrinsic:${hash.toString()}`,
          })
          resetCategory()
          resetForm()
        }
      } catch (error) {
        handleTxError(
          'There was an error while sending the extrinsic',
          `${selectedCategory}.${selectedMethod}`,
          setFormError,
        )
      }
    },
    [injector, api, selectedCategory, selectedMethod, sendAndSaveTx, resetCategory, handleTxError],
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
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                <textarea
                  name='hash'
                  value={result}
                  className='mt-4 block h-[80px] w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
                    <span className='text-base font-medium text-grayDarker dark:text-white'>
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
                            className={`mt-4 block w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.amount &&
                              'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          />

                          <Listbox value={actingAccount}>
                            <Listbox.Button
                              className={
                                'absolute flex items-center gap-2 rounded-lg bg-grayDarker px-2 text-sm font-medium text-white dark:bg-primaryAccent md:space-x-4 md:text-base'
                              }
                              style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                              onClick={() => setAddressBookIsOpen(!addressBookIsOpen)}
                            >
                              Address book
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave='transition ease-in duration-100'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'
                            >
                              <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-40 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
                                {accounts &&
                                  accounts.map((account, chainIdx) => (
                                    <Listbox.Option
                                      key={chainIdx}
                                      className={({ active }) =>
                                        `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                                          active && 'bg-gray-100 dark:bg-blueDarkAccent'
                                        }`
                                      }
                                      value={account}
                                      onClick={() => setFieldValue('receiver', account.address)}
                                    >
                                      {({ selected }) => {
                                        const subAccount =
                                          account.type === WalletType.subspace ||
                                          (account as { type: string }).type === 'sr25519'
                                            ? formatAddress(account.address)
                                            : account.address
                                        const formattedAccount =
                                          subAccount && shortString(subAccount)
                                        return (
                                          <div className='px-2'>
                                            <span
                                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                              {account.name} {formattedAccount}{' '}
                                              <span className='my-0 ml-4 rounded-lg bg-grayDarker text-xs font-medium text-white dark:bg-primaryAccent md:space-x-6 md:text-xs'>
                                                Wallet
                                              </span>
                                            </span>
                                          </div>
                                        )
                                      }}
                                    </Listbox.Option>
                                  ))}
                                {addresses &&
                                  addresses.map((address, index) => (
                                    <Listbox.Option
                                      key={`address-book-saved-${index}-label-${address.label}`}
                                      className={({ active }) =>
                                        `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                                          active && 'bg-gray-100 dark:bg-blueDarkAccent'
                                        }`
                                      }
                                      value={address.address}
                                      onClick={() => setFieldValue('receiver', address.address)}
                                    >
                                      {({ selected }) => {
                                        const subAccount = !address.address.startsWith('st')
                                          ? formatAddress(address.address)
                                          : address.address
                                        const formattedAccount =
                                          subAccount && shortString(subAccount)
                                        return (
                                          <div className='px-2'>
                                            <span
                                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                              {address.label} {formattedAccount}{' '}
                                              <span className='ml-4 rounded-lg bg-grayDarker px-2 text-xs font-medium text-white dark:bg-primaryAccent md:space-x-6 md:text-xs'>
                                                Saved
                                              </span>
                                            </span>
                                          </div>
                                        )
                                      }}
                                    </Listbox.Option>
                                  ))}
                              </Listbox.Options>
                            </Transition>
                          </Listbox>
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
                    <span className='text-base font-medium text-grayDarker dark:text-white'>
                      {`Amount to ${
                        WalletAction[action] === WalletAction.SendToken ? 'send' : 'withdraw'
                      }`}{' '}
                      ({tokenSymbol})
                    </span>
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className={addressBookIsOpen ? 'relative z-10' : 'relative'}>
                          <Field
                            name='amount'
                            type='number'
                            placeholder={`Amount to ${
                              WalletAction[action] === WalletAction.SendToken ? 'stake' : 'withdraw'
                            }`}
                            className={`mt-4 block w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.amount &&
                              'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          />
                          <button
                            className='absolute flex items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
                    {enableDevMode && (
                      <>
                        <span className='text-base font-medium text-grayDarker dark:text-white'>
                          Nonce
                        </span>
                        <FieldArray
                          name='dischargeNorms'
                          render={() => (
                            <div className={addressBookIsOpen ? 'relative z-10' : 'relative'}>
                              <Field
                                name='nonce'
                                type='number'
                                placeholder={'Nonce'}
                                className={`mt-4 block w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.nonce &&
                                  'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                                }`}
                              />
                            </div>
                          )}
                        />
                        {errors.nonce && touched.nonce ? (
                          <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                            {errors.nonce}
                          </div>
                        ) : (
                          <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                        )}
                      </>
                    )}
                    {ErrorPlaceholder}
                    {!actingAccount ? (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        You need to connect your wallet
                      </div>
                    ) : (
                      <button
                        className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium capitalize text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    Extrinsic Hash
                  </span>
                )}
                {signature && WalletAction[action] === WalletAction.SignMessage && (
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    Signature # {signature.id}
                  </span>
                )}
                <textarea
                  name={WalletAction[action] === WalletAction.SendRemark ? 'hash' : 'signature'}
                  value={result}
                  className='mt-4 block h-[80px] w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
                    <span className='text-base font-medium text-grayDarker dark:text-white'>
                      {WalletAction[action] === WalletAction.SendRemark ? 'Remark' : 'Message'}
                    </span>
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='message'
                            className={`mt-4 block w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.message &&
                              'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {({ field }: any) => (
                              <textarea
                                {...field}
                                placeholder='Message'
                                className={`mt-4 block h-[120px] w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.message &&
                                  'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
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
                    {enableDevMode && action === WalletAction.SendRemark && (
                      <>
                        <span className='text-base font-medium text-grayDarker dark:text-white'>
                          Nonce
                        </span>
                        <FieldArray
                          name='dischargeNorms'
                          render={() => (
                            <div className={addressBookIsOpen ? 'relative z-10' : 'relative'}>
                              <Field
                                name='nonce'
                                type='number'
                                placeholder={'Nonce'}
                                className={`mt-4 block w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.nonce &&
                                  'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                                }`}
                              />
                            </div>
                          )}
                        />
                        {errors.nonce && touched.nonce ? (
                          <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                            {errors.nonce}
                          </div>
                        ) : (
                          <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                        )}
                      </>
                    )}
                    {ErrorPlaceholder}
                    {!actingAccount ? (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        You need to connect your wallet
                      </div>
                    ) : (
                      <button
                        className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium capitalize text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
                    className='pr-2 hover:text-primaryAccent'
                    href={INTERNAL_ROUTES.accounts.id.page(network, 'consensus', subspaceAccount)}
                  >
                    <span className='ml-2 w-5 truncate text-lg font-medium text-grayDarker underline dark:text-white md:w-full'>
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
                  className='block w-full rounded-lg bg-white px-4 py-2 text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white dark:focus:bg-blueAccent'
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
                <span className='text-base font-medium text-grayDarker dark:text-white'>
                  Extrinsic Hash
                </span>
                <textarea
                  name='hash'
                  value={result}
                  className='mt-4 block h-[80px] w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
                    {enableDevMode && (
                      <>
                        <span className='text-base font-medium text-grayDarker dark:text-white'>
                          Nonce
                        </span>
                        <FieldArray
                          name='dischargeNorms'
                          render={() => (
                            <div className={addressBookIsOpen ? 'relative z-10' : 'relative'}>
                              <Field
                                name='nonce'
                                type='number'
                                placeholder={'Nonce'}
                                className={`mt-4 block w-[400px] rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.nonce &&
                                  'block w-full rounded-lg bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                                }`}
                              />
                            </div>
                          )}
                        />
                        {errors.nonce && touched.nonce ? (
                          <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                            {errors.nonce}
                          </div>
                        ) : (
                          <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                        )}
                      </>
                    )}
                    {ErrorPlaceholder}
                    {!actingAccount && (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        You need to connect your wallet
                      </div>
                    )}
                    {selectedCategory && selectedMethod && (
                      <button
                        className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightFrom px-2 text-sm font-medium capitalize text-white dark:bg-buttonDarkFrom md:space-x-4 md:text-base'
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
    action,
    result,
    hash,
    initialSendTokenValues,
    sendTokenFormValidationSchema,
    signature,
    initialMessageValues,
    messageFormValidationSchema,
    subspaceAccount,
    actingAccount,
    network,
    initialCustomExtrinsicValues,
    customExtrinsicFormValidationSchema,
    handleCopy,
    handleSendToken,
    maxAmount,
    enableDevMode,
    ErrorPlaceholder,
    accounts,
    addresses,
    addressBookIsOpen,
    handleSendRemark,
    handleSignMessage,
    handleCustomExtrinsic,
    extrinsicsList,
    selectedCategory,
    selectedMethod,
    resetCategory,
    resetMethod,
    tokenSymbol,
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
          className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-buttonLightTo px-2 text-sm font-medium text-white dark:bg-buttonDarkTo md:space-x-4 md:text-base'
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
