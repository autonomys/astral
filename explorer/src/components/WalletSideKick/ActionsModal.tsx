import { Hash, networks, SignerResult } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { CopyButton } from 'components/common/CopyButton'
import { Modal } from 'components/common/Modal'
import { Tooltip } from 'components/common/Tooltip'
import { NetworkSource } from 'constants/chains'
import { INTERNAL_ROUTES } from 'constants/routes'
import { WalletAction, WalletType } from 'constants/wallet'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useCustomExtrinsic } from 'hooks/useCustomExtrinsic'
import useDomains from 'hooks/useDomains'
import { useSendToken } from 'hooks/useSendToken'
import { useSignOrSendMessage } from 'hooks/useSignOrSendMessage'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAddressBookStates } from 'states/addressBook'
import { usePreferencesStates } from 'states/preferences'
import { formatAddress } from 'utils//formatAddress'
import { camelToNormal, shortString } from 'utils/string'
import {
  ExtrinsicsCategorySelector,
  ExtrinsicsInputs,
  ExtrinsicsMethodSelector,
} from './ExtrinsicsLab'

type ActionsModalProps = {
  isOpen: boolean
  action: WalletAction
  onClose: () => void
}

const NetworkSelector: FC<{
  isOpen: boolean
  setOpen: (value: boolean) => void
  setNetwork: (value: NetworkSource) => void
  setDomainId: (value: string) => void
}> = ({ isOpen, setOpen, setNetwork, setDomainId }) => {
  const network = useMemo(() => networks[0], [])

  if (!network) return null

  return (
    <Listbox value={network['domains']}>
      <Listbox.Button
        className={
          'absolute flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
        }
        style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        onClick={() => setOpen(!isOpen)}
      >
        Network
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-40 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
          <Listbox.Option
            key={`domain-book-saved-${network.id}-label-${network.name}`}
            className={({ active }) =>
              `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                active && 'bg-gray-100 dark:bg-blueDarkAccent'
              }`
            }
            value={network.id}
            onClick={() => {
              setNetwork(NetworkSource.CONSENSUS)
              setDomainId('')
            }}
          >
            {({ selected }) => {
              return (
                <div className='px-2'>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {network.name}{' '}
                    <span className='ml-4 rounded-full bg-grayDarker px-2 text-xs font-medium text-white dark:bg-purpleAccent md:space-x-6 md:text-xs'>
                      Consensus
                    </span>
                  </span>
                </div>
              )
            }}
          </Listbox.Option>
          {network['domains'] &&
            network['domains'].map((domain, index) => (
              <Listbox.Option
                key={`network-source-${index}`}
                className={({ active }) =>
                  `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                    active && 'bg-gray-100 dark:bg-blueDarkAccent'
                  }`
                }
                value={domain.id}
                onClick={() => {
                  setNetwork(NetworkSource.DOMAIN)
                  setDomainId(domain.id)
                }}
              >
                {({ selected }) => {
                  return (
                    <div className='px-2'>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {domain.name}{' '}
                        <span className='ml-4 rounded-full bg-grayDarker px-2 text-xs font-medium text-white dark:bg-purpleAccent md:space-x-6 md:text-xs'>
                          Domain
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
  )
}

export const ActionsModal: FC<ActionsModalProps> = ({ isOpen, action, onClose }) => {
  const { selectedChain } = useDomains()
  const { api, actingAccount, accounts, subspaceAccount } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const [signature, setSignature] = useState<SignerResult | undefined>(undefined)
  const [hash, setHash] = useState<Hash | undefined>(undefined)
  const [addressBookIsOpen, setAddressBookIsOpen] = useState<boolean>(false)
  const [networkSourceBookIsOpen, setNetworkSourceBookIsOpen] = useState<boolean>(false)
  const [networkDestinationBookIsOpen, setNetworkDestinationBookIsOpen] = useState<boolean>(false)
  const { addresses } = useAddressBookStates()
  const { enableDevMode } = usePreferencesStates()
  const { initialSendTokenValues, maxAmount, sendTokenFormValidationSchema, handleSendToken } =
    useSendToken()
  const { initialMessageValues, messageFormValidationSchema, handleSignMessage, handleSendRemark } =
    useSignOrSendMessage()
  const {
    extrinsicsList,
    selectedCategory,
    selectedMethod,
    initialCustomExtrinsicValues,
    customExtrinsicFormValidationSchema,
    loadData,
    handleCustomExtrinsic,
    setSelectedCategory,
    setSelectedMethod,
    resetMethod,
    resetCategory,
  } = useCustomExtrinsic()

  const handleClose = useCallback(() => {
    setFormError(null)
    setSignature(undefined)
    setHash(undefined)
    resetCategory()
    onClose()
  }, [onClose, resetCategory])

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

  const network = useMemo(() => networks[0], [])

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
                  className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
                  type='submit'
                >
                  Copy
                </button>
              </>
            ) : (
              <Formik
                initialValues={initialSendTokenValues}
                validationSchema={sendTokenFormValidationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSendToken(values, resetForm, setHash, setFormError)
                }
              >
                {({ values, errors, touched, handleSubmit, setFieldValue }) => (
                  <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                    <span className='text-base font-medium text-grayDarker dark:text-white'>
                      Send from
                    </span>
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='sourceNetwork'
                            type='text'
                            readOnly
                            placeholder='Source network'
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.sourceNetwork &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                            value={
                              values.sourceNetwork === NetworkSource.CONSENSUS
                                ? network.name
                                : network['domains'].find(
                                    (domain) => domain.id === values.sourceDomainId,
                                  )?.name || ' DomainId: ' + values.sourceDomainId
                            }
                          />
                          <NetworkSelector
                            isOpen={networkSourceBookIsOpen}
                            setOpen={setNetworkSourceBookIsOpen}
                            setNetwork={(e) => setFieldValue('sourceNetwork', e)}
                            setDomainId={(e) => setFieldValue('sourceDomainId', e)}
                          />
                        </div>
                      )}
                    />
                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='sender'
                            type='text'
                            readOnly
                            placeholder='Send from'
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.sender &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          />
                        </div>
                      )}
                    />
                    {errors.sender && touched.sender ? (
                      <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                        {errors.sender}
                      </div>
                    ) : (
                      <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                    )}
                    <span className='text-base font-medium text-grayDarker dark:text-white'>
                      Send to
                    </span>

                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='destinationNetwork'
                            type='text'
                            readOnly
                            placeholder='Destination network'
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.destinationNetwork &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                            value={
                              values.destinationNetwork === NetworkSource.CONSENSUS
                                ? network.name
                                : network['domains'].find(
                                    (domain) => domain.id === values.destinationDomainId,
                                  )?.name || ' DomainId: ' + values.destinationDomainId
                            }
                          />
                          <NetworkSelector
                            isOpen={networkDestinationBookIsOpen}
                            setOpen={setNetworkDestinationBookIsOpen}
                            setNetwork={(e) => setFieldValue('destinationNetwork', e)}
                            setDomainId={(e) => setFieldValue('destinationDomainId', e)}
                          />
                        </div>
                      )}
                    />

                    <FieldArray
                      name='dischargeNorms'
                      render={() => (
                        <div className='relative'>
                          <Field
                            name='receiver'
                            type='text'
                            placeholder='Send to'
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.amount &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          />

                          <Listbox value={actingAccount}>
                            <Listbox.Button
                              className={
                                'absolute flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
                                              <span className='my-0 ml-4 rounded-full bg-grayDarker text-xs font-medium text-white dark:bg-purpleAccent md:space-x-6 md:text-xs'>
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
                                              <span className='ml-4 rounded-full bg-grayDarker px-2 text-xs font-medium text-white dark:bg-purpleAccent md:space-x-6 md:text-xs'>
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
                      ({selectedChain.token.symbol})
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
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.amount &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          />
                          <button
                            className='absolute flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
                                placeholder={`Nonce'
                                }`}
                                className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.nonce &&
                                  'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
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
                        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium capitalize text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
                  className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
                    ? handleSendRemark(values, resetForm, setHash, setFormError)
                    : handleSignMessage(values, resetForm, setSignature, setFormError)
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
                            className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                              errors.message &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }`}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {({ field }: any) => (
                              <textarea
                                {...field}
                                placeholder='Message'
                                className={`mt-4 block h-[120px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
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
                                placeholder={`Nonce'
                                }`}
                                className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.nonce &&
                                  'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
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
                        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium capitalize text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
                    className='pr-2 hover:text-purpleAccent'
                    href={INTERNAL_ROUTES.accounts.id.page(
                      selectedChain.urls.page,
                      'consensus',
                      subspaceAccount,
                    )}
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
                  className='block w-full rounded-xl bg-white px-4 py-2 text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white dark:focus:bg-blueAccent'
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
                  className='mt-4 block h-[80px] w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white'
                />
                <button
                  onClick={() => handleCopy(result)}
                  className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
                  type='submit'
                >
                  Copy
                </button>
              </>
            ) : (
              <Formik
                initialValues={initialCustomExtrinsicValues}
                validationSchema={customExtrinsicFormValidationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleCustomExtrinsic(values, resetForm, setHash, setFormError)
                }
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
                                placeholder={`Nonce'
                                }`}
                                className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                                  errors.nonce &&
                                  'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
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
                        className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium capitalize text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
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
    selectedChain.urls.page,
    selectedChain.token.symbol,
    initialCustomExtrinsicValues,
    customExtrinsicFormValidationSchema,
    handleCopy,
    handleSendToken,
    maxAmount,
    enableDevMode,
    ErrorPlaceholder,
    network,
    networkSourceBookIsOpen,
    networkDestinationBookIsOpen,
    accounts,
    addresses,
    addressBookIsOpen,
    handleSendRemark,
    handleSignMessage,
    handleCustomExtrinsic,
    extrinsicsList,
    setSelectedCategory,
    selectedCategory,
    setSelectedMethod,
    selectedMethod,
    resetCategory,
    resetMethod,
  ])

  useEffect(() => {
    loadData()
  }, [api, loadData])

  return (
    <Modal title={action} onClose={handleClose} isOpen={isOpen}>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-1 gap-4'>{ActionBody}</div>
        </div>
        <button
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-blueAccent md:space-x-4 md:text-base'
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
