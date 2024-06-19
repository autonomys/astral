'use client'

import { WalletIcon } from '@/components/icons'
import { accountIdToHex } from '@/utils/formatAddress'
import { floatToStringWithDecimals } from '@/utils/number'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { sendGAEvent } from '@next/third-parties/google'
import { Keyring } from '@polkadot/api'
import { createType } from '@polkadot/types'
import { isHex, u8aToHex } from '@polkadot/util'
import { PreferredExtensionModal } from 'components/layout/PreferredExtensionModal'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { Field, Form, Formik, FormikErrors, FormikState } from 'formik'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'

interface FormValues {
  domainId: number
  signingKey: string
  signature: string | Uint8Array
  amountToStake: number
  nominatorTax: number
  minimumNominatorStake: number
  signingKeySeed: string
  signingKeystore: Blob | null
}

type OperatorAllowListRestricted = { operators: string[] }
type OperatorAllowListOpen = { anyone: null }
type OperatorAllowList = OperatorAllowListRestricted | OperatorAllowListOpen
type Domain = {
  domainId: number
  domainName: string
  operatorAllowList: OperatorAllowList
}

enum OwnershipProofMethod {
  seed = 'seed',
  keystore = 'keystore',
  wallet = 'wallet',
}

export const OperatorStake = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const [domainsList, setDomainsList] = useState<Domain[]>([])
  const [minOperatorStake, setMinOperatorStake] = useState<number>(0)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [activeProofMethodTab, setActiveProofMethodTab] = useState<OwnershipProofMethod>(
    OwnershipProofMethod.seed,
  )

  const initialValues: FormValues = {
    domainId: 0,
    signingKey: '',
    signature: '0x',
    amountToStake: 0,
    nominatorTax: 0,
    minimumNominatorStake: 0,
    signingKeySeed: '',
    signingKeystore: null,
  }

  const loadDomains = useCallback(async () => {
    if (!api) return

    const [domains, domainRegistry, properties] = await Promise.all([
      api.consts.domains,
      api.query.domains.domainRegistry.entries(),
      api.rpc.system.properties(),
    ])

    setDomainsList(
      domainRegistry.map((domain) => {
        return {
          domainId: (domain[0].toPrimitive() as number[])[0],
          domainName: (domain[1].toJSON() as { domainConfig: { domainName: string } }).domainConfig
            .domainName,
          operatorAllowList: (
            domain[1].toJSON() as { domainConfig: { operatorAllowList: OperatorAllowList } }
          ).domainConfig.operatorAllowList,
        } as Domain
      }),
    )
    const _tokenDecimals = (properties.tokenDecimals.toPrimitive() as number[])[0]
    setTokenDecimals(_tokenDecimals)
    setTokenSymbol((properties.tokenSymbol.toJSON() as string[])[0])
    setMinOperatorStake((domains.minOperatorStake.toPrimitive() as number) / 10 ** _tokenDecimals)
  }, [api])

  const filteredDomainsList = useMemo(
    () =>
      domainsList.filter((domain) => {
        if ((domain.operatorAllowList as OperatorAllowListOpen).anyone === null) return true
        else if (subspaceAccount)
          return (domain.operatorAllowList as OperatorAllowListRestricted).operators.includes(
            subspaceAccount,
          )
        return false
      }),
    [domainsList, subspaceAccount],
  )

  const currentDomainLabel = useCallback(
    (values: FormValues) => {
      const currentDomain = filteredDomainsList[values.domainId]
      if (!currentDomain) return 'Domain'
      return currentDomain.domainName.charAt(0).toUpperCase() + currentDomain.domainName.slice(1)
    },
    [filteredDomainsList],
  )

  const registerOperatorValidationSchema = Yup.object().shape({
    domainId: Yup.number()
      .oneOf(
        filteredDomainsList.map((d) => d.domainId),
        'Domain Id need to be a valid domains',
      )
      .required('Domain Id is required'),
    signingKey: Yup.string()
      .trim()
      .test('isHex', 'Signing key is not a valid hex value', (val) => isHex(val))
      .required('Signing key is required'),
    amountToStake: Yup.number()
      .min(
        minOperatorStake,
        `Amount to stake need to be greater than ${minOperatorStake} ${tokenSymbol}`,
      )
      .required('Amount to stake is required'),
    nominatorTax: Yup.number()
      .min(0, 'Nominator tax need to be greater than 0')
      .max(100, 'Nominator tax need to be smaller than 100')
      .required('Nominator tax is required'),
    minimumNominatorStake: Yup.number()
      .min(0, `Minimum nominator stake need to be greater than 0 ${tokenSymbol}`)
      .required('Minimum nominator stake is required'),
  })

  const handleRegister = useCallback(
    async (
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector)
        return setFormError('We are not able to connect to the blockchain')

      try {
        const block = await api.rpc.chain.getBlock()
        const hash = await api.tx.domains
          .registerOperator(
            values.domainId,
            floatToStringWithDecimals(values.amountToStake, tokenDecimals),
            {
              signingKey: values.signingKey,
              minimumNominatorStake: floatToStringWithDecimals(
                values.minimumNominatorStake,
                tokenDecimals,
              ),
              nominationTax: values.nominatorTax.toString(),
            },
            values.signature,
          )
          .signAndSend(actingAccount.address, { signer: injector.signer })

        console.log('block', block)
        console.log('hash', hash)
        sendGAEvent('event', 'registerOperator', { value: `domainID:${values.domainId}` })
      } catch (error) {
        setFormError('There was an error while registering the operator')
        console.error('Error', error)
        sendGAEvent('event', 'error', { value: 'registerOperator' })
      }
      resetForm()
    },
    [actingAccount, api, injector, tokenDecimals],
  )

  const handleConnectWallet = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }, [])

  const resetActiveProofMethodTab = useCallback(
    (
      method: string,
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      setActiveProofMethodTab(method)
      resetForm({
        values: {
          ...values,
          signingKey: initialValues.signingKey,
          signingKeySeed: initialValues.signingKeySeed,
          signature: initialValues.signature,
        },
      })
    },
    [initialValues.signature, initialValues.signingKey, initialValues.signingKeySeed],
  )

  const handleProofOfOwnershipWithSeed = useCallback(
    (
      values: FormValues,
      setFieldValue: (
        field: string,
        value: string | Uint8Array,
        shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<FormValues>>,
    ) => {
      if (!api || !actingAccount)
        return setFormError('We are not able to connect to the blockchain')

      const OperatorKeyring = new Keyring({ type: 'sr25519' })
      const Operator = OperatorKeyring.addFromUri(values.signingKeySeed)

      const signingKey = u8aToHex(Operator.publicKey)
      const signature = Operator.sign(
        createType(api.registry, 'AccountId', actingAccount.address).toU8a(),
      )
      setFieldValue('signingKey', signingKey)
      setFieldValue('signature', signature)
    },
    [actingAccount, api],
  )

  const handleProofOfOwnershipWithKeystore = useCallback(
    (
      events: React.ChangeEvent<HTMLInputElement>,
      setFieldValue: (
        field: string,
        value: string | Uint8Array,
        shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<FormValues>>,
    ) => {
      if (!api || !actingAccount)
        return setFormError('We are not able to connect to the blockchain')

      if (!events.target.files) return setFormError('No file')

      const fileReader = new FileReader()
      fileReader.onload = () => {
        const keystoreContent = fileReader.result as string
        if (fileReader.readyState === 2) {
          const parsedKeystoreSeed = keystoreContent.replace(/"|_/g, '')

          const OperatorKeyring = new Keyring({ type: 'sr25519' })
          const Operator = OperatorKeyring.addFromUri(parsedKeystoreSeed)

          const signingKey = u8aToHex(Operator.publicKey)
          const signature = Operator.sign(
            createType(api.registry, 'AccountId', actingAccount.address).toU8a(),
          )
          setFieldValue('signingKey', signingKey)
          setFieldValue('signature', signature)
        }
      }
      fileReader.readAsText(events.target.files[0])
    },
    [actingAccount, api],
  )

  const handleProofOfOwnershipWithWallet = useCallback(
    async (
      values: FormValues,
      setFieldValue: (
        field: string,
        value: string | Uint8Array,
        shouldValidate?: boolean | undefined,
      ) => Promise<void | FormikErrors<FormValues>>,
    ) => {
      if (!api || !actingAccount || !injector)
        return setFormError('We are not able to connect to the blockchain')

      const signature =
        injector.signer.signRaw &&
        (await injector.signer.signRaw({
          address: actingAccount.address,
          type: 'bytes',
          data: createType(api.registry, 'AccountId', actingAccount.address).toString(),
        }))
      setFieldValue('signingKey', accountIdToHex(actingAccount.address))
      if (signature) setFieldValue('signature', signature.signature)
    },
    [actingAccount, api, injector],
  )

  useEffect(() => {
    loadDomains()
  }, [api, loadDomains])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='mt-5 flex w-full flex-col pt-20 sm:mt-0'>
        <div className="w-full rounded-[20px] bg-white font-['Montserrat'] dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]">
          <div className='m-10'>
            <div className='flex items-center'>
              <WalletIcon width='44' height='48' />
              <div
                className={`text-[#241235] ${
                  isDesktop ? 'text-4xl' : 'text-xl'
                } font-bold leading-tight tracking-tight dark:text-white`}
              >
                Staking as a pool operator
              </div>
            </div>
            <div className='mt-6 w-full break-words text-base font-medium text-[#241235] dark:text-white'>
              tSSC holders (Gemini 3h testnet network only) can stake their tSSC to add more
              security to the protocol and earn Staking Incentives. Learn more about the risks
              involved.
            </div>
            <div className='mt-4 text-2xl font-bold leading-tight tracking-tight text-[#241235] dark:text-white'>
              Step 1: Setup a node
            </div>

            <div className='mt-4 text-xl'>
              <Link
                data-testid={'operator-link-documentation'}
                className='cursor-pointer text-[#4524C1] underline hover:text-[#DE67E4] dark:text-[#DDEFF1]'
                href={EXTERNAL_ROUTES.operatorDocs}
                target='_blank'
              >
                Please follow the docs to setup a node
              </Link>
            </div>

            <div className='mt-4 text-2xl font-bold leading-tight tracking-tight text-[#241235] dark:text-white'>
              Step 2: Register
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={registerOperatorValidationSchema}
              onSubmit={(values, { resetForm }) => handleRegister(values, resetForm)}
            >
              {({ errors, touched, values, handleSubmit, setFieldValue, resetForm }) => (
                <Form
                  className='my-8 w-full'
                  onSubmit={handleSubmit}
                  data-testid='testOperatorStakeForm'
                >
                  <div className='mt-8 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
                    <div className='ml-4 w-full'>
                      <div className='relative'>
                        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
                          <div className='p-4'>
                            <span className='text-base font-medium text-[#241235] dark:text-white'>
                              Domain
                            </span>
                            <Listbox
                              value={values.domainId}
                              onChange={(val) => setFieldValue('domainId', val)}
                            >
                              <div className='relative'>
                                <Listbox.Button className='relative mt-4 w-full cursor-default rounded-full bg-white from-[#EA71F9] to-[#4D397A] py-[10px] pl-3 pr-10 text-left font-["Montserrat"] shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gradient-to-r dark:text-white sm:text-sm'>
                                  <div className='flex items-center justify-center'>
                                    <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
                                      {currentDomainLabel(values)}
                                    </span>
                                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                      <ChevronDownIcon
                                        className='size-5 text-gray-400 ui-open:rotate-180 dark:text-[#DE67E4]'
                                        aria-hidden='true'
                                      />
                                    </span>
                                  </div>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave='transition ease-in duration-100'
                                  leaveFrom='opacity-100'
                                  leaveTo='opacity-0'
                                >
                                  <Listbox.Options className='absolute mt-1 max-h-60 w-auto overflow-auto rounded-xl bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#1E254E] dark:text-white sm:text-sm md:w-full'>
                                    {filteredDomainsList.map((domain, index) => (
                                      <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white md:pl-10 ${
                                            active && 'bg-gray-100 dark:bg-[#2A345E]'
                                          }`
                                        }
                                        value={domain.domainId}
                                      >
                                        {({ selected }) => {
                                          return (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                                }`}
                                              >
                                                {domain.domainName.charAt(0).toUpperCase() +
                                                  domain.domainName.slice(1)}
                                              </span>
                                              {selected ? (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                                                  <CheckIcon
                                                    className='hidden size-5 md:block'
                                                    aria-hidden='true'
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )
                                        }}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>

                          <div className={`p-4 ${isDesktop ? 'col-span-3' : 'col-span-1'}`}>
                            <span className='text-base font-medium text-[#241235] dark:text-white'>
                              Proof of Ownership
                            </span>
                            <div className='mt-4'>
                              <div className='flex justify-around'>
                                <button
                                  type='button'
                                  className={`${
                                    activeProofMethodTab === OwnershipProofMethod.keystore
                                      ? 'bg-[#EA71F9]'
                                      : 'bg-white dark:bg-[#4D397A]'
                                  } rounded-full px-4 py-2 shadow-md`}
                                  onClick={() =>
                                    resetActiveProofMethodTab(
                                      OwnershipProofMethod.keystore,
                                      values,
                                      resetForm,
                                    )
                                  }
                                >
                                  Proof with keystore
                                </button>
                                <button
                                  type='button'
                                  className={`${
                                    activeProofMethodTab === OwnershipProofMethod.seed
                                      ? 'bg-[#EA71F9]'
                                      : 'bg-white dark:bg-[#4D397A]'
                                  } rounded-full px-4 shadow-md`}
                                  onClick={() =>
                                    resetActiveProofMethodTab(
                                      OwnershipProofMethod.seed,
                                      values,
                                      resetForm,
                                    )
                                  }
                                >
                                  Proof with seed
                                </button>
                                <button
                                  type='button'
                                  className={`${
                                    activeProofMethodTab === OwnershipProofMethod.wallet
                                      ? 'bg-[#EA71F9]'
                                      : 'bg-white dark:bg-[#4D397A]'
                                  } rounded-full px-4 py-2 shadow-md`}
                                  onClick={() =>
                                    resetActiveProofMethodTab(
                                      OwnershipProofMethod.wallet,
                                      values,
                                      resetForm,
                                    )
                                  }
                                >
                                  Proof with connected wallet
                                </button>
                              </div>
                            </div>
                          </div>
                          {activeProofMethodTab === OwnershipProofMethod.seed && (
                            <>
                              <div className={`p-4 ${isDesktop ? 'col-span-2' : 'col-span-1'}`}>
                                <span className='text-base font-medium text-[#241235] dark:text-white'>
                                  Signing key seed
                                </span>
                                <Field
                                  name='signingKeySeed'
                                  type='password'
                                  className={`mt-4 block w-full rounded-full bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                            ${
                              errors.signingKeySeed &&
                              touched.signingKeySeed &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#2A345E]'
                            }
                          `}
                                />
                                {errors.signingKeySeed && touched.signingKeySeed ? (
                                  <div
                                    className='text-md mt-2 h-8 text-red-500'
                                    data-testid='errorMessage'
                                  >
                                    {errors.signingKeySeed}
                                  </div>
                                ) : (
                                  <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                                )}
                              </div>
                              <div className={`p-4 ${isDesktop ? 'col-span-1' : 'col-span-1'}`}>
                                <span className='text-base font-medium text-[#241235] dark:text-white'>
                                  &nbsp;
                                </span>
                                <div className='mt-4 flex justify-around'>
                                  <button
                                    type='button'
                                    className={'rounded-full bg-[#EA71F9] px-4 py-2 shadow-md'}
                                    onClick={() =>
                                      handleProofOfOwnershipWithSeed(values, setFieldValue)
                                    }
                                  >
                                    Generate proof
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                          {activeProofMethodTab === OwnershipProofMethod.keystore && (
                            <>
                              <div className={`p-4 ${isDesktop ? 'col-span-3' : 'col-span-1'}`}>
                                <span className='text-base font-medium text-[#241235] dark:text-white'>
                                  Signing key seed
                                </span>
                                <Field
                                  id='file'
                                  name='signingKeystore'
                                  type='file'
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleProofOfOwnershipWithKeystore(e, setFieldValue)
                                  }
                                  className={`mt-4 block w-full rounded-full bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                            ${
                              errors.signingKeystore &&
                              touched.signingKeystore &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#2A345E]'
                            }
                          `}
                                />
                                {errors.signingKeystore && touched.signingKeystore ? (
                                  <div
                                    className='text-md mt-2 h-8 text-red-500'
                                    data-testid='errorMessage'
                                  >
                                    {errors.signingKeystore}
                                  </div>
                                ) : (
                                  <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                                )}
                              </div>
                            </>
                          )}
                          {activeProofMethodTab === OwnershipProofMethod.wallet && (
                            <>
                              <div className={`p-4 ${isDesktop ? 'col-span-3' : 'col-span-1'}`}>
                                <span className='text-base font-medium text-[#241235] dark:text-white'>
                                  &nbsp;
                                </span>
                                <div className='mt-4 flex justify-around'>
                                  <button
                                    type='button'
                                    className={'rounded-full bg-[#EA71F9] px-4 py-2 shadow-md'}
                                    onClick={() =>
                                      handleProofOfOwnershipWithWallet(values, setFieldValue)
                                    }
                                  >
                                    Generate proof of ownership with connected wallet
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                          {values.signingKey && values.signature && (
                            <>
                              <div className={`p-4 ${isDesktop ? 'col-span-3' : 'col-span-1'}`}>
                                <span className='text-base font-medium text-[#241235] dark:text-white'>
                                  Signing key
                                </span>
                                <Field
                                  name='signingKey'
                                  placeholder='Signing Key'
                                  className={`mt-4 block w-full rounded-full bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                                ${
                                  errors.signingKey &&
                                  touched.signingKey &&
                                  'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#2A345E]'
                                }
                              `}
                                />
                                {errors.signingKey && touched.signingKey ? (
                                  <div
                                    className='text-md mt-2 h-8 text-red-500'
                                    data-testid='errorMessage'
                                  >
                                    {errors.signingKey}
                                  </div>
                                ) : (
                                  <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                                )}
                              </div>

                              <div className={`p-4 ${isDesktop ? 'col-span-3' : 'col-span-1'}`}>
                                <span className='text-base font-medium text-[#241235] dark:text-white'>
                                  Proof of signing key ownership signature
                                </span>
                                <Field
                                  name='signature'
                                  placeholder='Signature'
                                  className={`mt-4 block w-full rounded-full bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                            ${
                              errors.signature &&
                              touched.signature &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#2A345E]'
                            }
                          `}
                                />
                                {errors.signature && touched.signature ? (
                                  <div
                                    className='text-md mt-2 h-8 text-red-500'
                                    data-testid='errorMessage'
                                  >
                                    {errors.signature}
                                  </div>
                                ) : (
                                  <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                                )}
                              </div>
                            </>
                          )}

                          <div className='p-4'>
                            <span className='text-base font-medium text-[#241235] dark:text-white'>
                              Amount to Stake
                            </span>
                            <Field
                              name='amountToStake'
                              placeholder='Amount to Stake'
                              className={`mt-4 block w-full rounded-full bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                            ${
                              errors.amountToStake &&
                              touched.amountToStake &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-[#2A345E]'
                            }
                          `}
                            />
                            {errors.amountToStake && touched.amountToStake ? (
                              <div
                                className='text-md mt-2 h-8 text-red-500'
                                data-testid='errorMessage'
                              >
                                {errors.amountToStake}
                              </div>
                            ) : (
                              <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                            )}
                          </div>
                          <div className='p-4'>
                            <span className='text-base font-medium text-[#241235] dark:text-white'>
                              Nominator tax
                            </span>
                            <Field
                              name='nominatorTax'
                              placeholder='Nominator tax'
                              className={`mt-4 block w-full rounded-xl bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                            ${
                              errors.nominatorTax &&
                              touched.nominatorTax &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }
                          `}
                            />
                            {errors.nominatorTax && touched.nominatorTax ? (
                              <div
                                className='text-md mt-2 h-8 text-red-500'
                                data-testid='errorMessage'
                              >
                                {errors.nominatorTax}
                              </div>
                            ) : (
                              <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                            )}
                          </div>
                          <div className='p-4'>
                            <span className='text-base font-medium text-[#241235] dark:text-white'>
                              Minimum Nominator Stake
                            </span>
                            <Field
                              name='minimumNominatorStake'
                              placeholder='Minimum Nominator Stake'
                              className={`mt-4 block w-full rounded-xl bg-white from-[#EA71F9] to-[#4D397A] px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white
                            ${
                              errors.minimumNominatorStake &&
                              touched.minimumNominatorStake &&
                              'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                            }
                          `}
                            />
                            {errors.minimumNominatorStake && touched.minimumNominatorStake ? (
                              <div
                                className='text-md mt-2 h-8 text-red-500'
                                data-testid='errorMessage'
                              >
                                {errors.minimumNominatorStake}
                              </div>
                            ) : (
                              <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {formError && formError ? (
                    <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                      {formError}
                    </div>
                  ) : (
                    <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                  )}
                  <div className='container mx-auto flex flex-col flex-wrap items-center justify-between py-5 md:flex-row md:px-[25px] 2xl:px-0'>
                    {!actingAccount ? (
                      <button
                        onClick={(e) => handleConnectWallet(e)}
                        className='h-10 w-36 rounded-full bg-gradient-to-r from-[#EA71F9] to-[#4D397A] font-medium text-white'
                      >
                        Connect Wallet
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(values, resetForm)}
                        className='block rounded-full bg-[#241235] px-5 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-[#DE67E4]'
                        type='submit'
                      >
                        Register
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <PreferredExtensionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
