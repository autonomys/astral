'use client'

import { registerOperator } from '@autonomys/auto-consensus'
import { isHex, shortString } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'
import { sendGAEvent } from '@next/third-parties/google'
import { Tooltip } from 'components/common/Tooltip'
import { WalletIcon } from 'components/icons/WalletIcon'
import { PreferredExtensionModal } from 'components/layout/PreferredExtensionModal'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { Field, Form, Formik, FormikState } from 'formik'
import { useConsensusData } from 'hooks/useConsensusData'
import { useDomainsData } from 'hooks/useDomainsData'
import useMediaQuery from 'hooks/useMediaQuery'
import { useTxHelper } from 'hooks/useTxHelper'
import useWallet from 'hooks/useWallet'

import { cn } from '@/utils/cn'
import Link from 'next/link'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useConsensusStates } from 'states/consensus'
import { floatToStringWithDecimals } from 'utils/number'
import * as Yup from 'yup'
import { WalletButton } from '../WalletButton'

interface FormValues {
  domainId: number
  publicKey: string
  amountToStake: number
  nominatorTax: number
  minimumNominatorStake: number
}

export const RegisterOperators = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const tokenDecimals = useConsensusStates((state) => state.tokenDecimals)
  const tokenSymbol = useConsensusStates((state) => state.tokenSymbol)
  const domain = useConsensusStates((state) => state.domain)
  const domainRegistry = useConsensusStates((state) => state.domainRegistry)
  useDomainsData()
  useConsensusData()
  const { handleTxError, sendAndSaveTx } = useTxHelper()

  const minOperatorStake = useMemo(() => {
    if (domain) return parseFloat(domain.minOperatorStake)
    return 0
  }, [domain])

  const initialValues: FormValues = {
    domainId: 0,
    publicKey: '',
    amountToStake: 0,
    nominatorTax: 0,
    minimumNominatorStake: 0,
  }

  const filteredDomainsList = useMemo(
    () =>
      domainRegistry.filter((domain) => {
        if (domain.domainConfig.operatorAllowList.anyone === null) return true
        else if (subspaceAccount && domain.domainConfig.operatorAllowList.operators)
          return domain.domainConfig.operatorAllowList.operators.includes(subspaceAccount)
        return false
      }),
    [domainRegistry, subspaceAccount],
  )

  const currentDomainLabel = useCallback(
    (values: FormValues) => {
      const currentDomain = filteredDomainsList[values.domainId]
      if (!currentDomain) return 'Domain'
      return (
        currentDomain.domainConfig.domainName.charAt(0).toUpperCase() +
        currentDomain.domainConfig.domainName.slice(1)
      )
    },
    [filteredDomainsList],
  )

  const registerOperatorValidationSchema = Yup.object().shape({
    domainId: Yup.number()
      .oneOf(
        filteredDomainsList.map((d) => parseInt(d.domainId)),
        'Domain Id need to be a valid domains',
      )
      .required('Domain Id is required'),
    publicKey: Yup.string()
      .trim()
      .test('isHex', 'Public key is not a valid hex value', (val) => isHex(val))
      .required('Public key is required'),
    amountToStake: Yup.number()
      .positive('Amount must be a positive number')
      .min(
        minOperatorStake,
        `Amount to stake need to be greater than ${minOperatorStake} ${tokenSymbol}`,
      )
      .required('Amount to stake is required'),
    nominatorTax: Yup.number()
      .integer('Tax must be a whole number')
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
      if (!actingAccount || !injector || !api)
        return setFormError('We are not able to connect to the blockchain')

      try {
        const tx = await registerOperator({
          api,
          domainId: values.domainId,
          amountToStake: floatToStringWithDecimals(values.amountToStake, tokenDecimals),
          minimumNominatorStake: floatToStringWithDecimals(
            values.minimumNominatorStake,
            tokenDecimals,
          ),
          nominationTax: values.nominatorTax.toString(),
          signingKey: values.publicKey,
        })
        await sendAndSaveTx({
          call: 'registerOperator',
          tx,
          signer: injector.signer,
          error: setFormError,
        })
        sendGAEvent('event', 'registerOperator', { value: `domainID:${values.domainId}` })
      } catch (error) {
        handleTxError(
          'There was an error while registering the operator',
          'registerOperator',
          setFormError,
        )
      }
      resetForm()
    },
    [actingAccount, api, handleTxError, injector, sendAndSaveTx, tokenDecimals],
  )

  const handleConnectWallet = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }, [])

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='mt-5 flex w-full flex-col pt-20 sm:mt-0'>
        <div className='w-full overflow-hidden rounded-[20px] bg-white shadow-lg dark:border-none dark:bg-boxDark'>
          <div className='p-10'>
            <div className='flex items-center'>
              <WalletIcon width='44' height='44' />
              <div
                className={cn(
                  'ml-2 text-grayDarker',
                  isDesktop ? 'text-4xl' : 'text-xl',
                  'font-bold leading-tight tracking-tight dark:text-white',
                )}
              >
                Staking as a pool operator
              </div>
            </div>

            <div className='mt-6 w-full text-base font-medium leading-relaxed text-grayDarker dark:text-white'>
              holders can stake their {tokenSymbol} to add more security to the protocol and earn
              Staking Incentives. Learn more about the risks involved.
            </div>

            <div className='mt-10 space-y-10'>
              {/* Step 1 */}
              <div>
                <div className='mb-4 inline-flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primaryAccent text-lg font-semibold text-white'>
                    1
                  </div>
                  <div className='text-2xl font-bold leading-tight tracking-tight text-grayDarker dark:text-white'>
                    Step 1: Setup a node
                  </div>
                </div>

                <div className='ml-11'>
                  <Link
                    data-testid={'operator-link-documentation'}
                    className='inline-flex items-center gap-2 text-primaryAccent transition-colors hover:text-blueUndertone hover:underline dark:text-grayLight dark:hover:text-white'
                    href={EXTERNAL_ROUTES.operatorDocs}
                    target='_blank'
                  >
                    Please follow the docs to setup a node
                    <svg className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <div className='mb-4 inline-flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primaryAccent text-lg font-semibold text-white'>
                    2
                  </div>
                  <div className='text-2xl font-bold leading-tight tracking-tight text-grayDarker dark:text-white'>
                    Step 2: Connect your wallet
                  </div>
                </div>

                <div className='ml-11'>
                  {!actingAccount ? (
                    <WalletButton />
                  ) : (
                    <div
                      className={
                        'flex w-full items-center rounded-xl bg-grayLight/50 p-4 text-base font-medium text-grayDarker dark:bg-blueAccent/50 dark:text-white'
                      }
                    >
                      {subspaceAccount ? (
                        <>
                          {isDesktop ? subspaceAccount : shortString(subspaceAccount)}{' '}
                          <CheckIcon className='ml-2 h-5 w-5 text-greenBright' />
                        </>
                      ) : (
                        <>
                          {isDesktop ? actingAccount.address : shortString(actingAccount.address)}{' '}
                          <ExclamationTriangleIcon className='ml-2 h-5 w-5 text-pastelPink' />
                        </>
                      )}
                    </div>
                  )}
                  {actingAccount &&
                    (actingAccount as unknown as { type: string }).type === 'ethereum' && (
                      <div className='ml-2 mt-2 text-pastelPink'>
                        EVM account not supported for this action
                      </div>
                    )}
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className='mb-4 inline-flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primaryAccent text-lg font-semibold text-white'>
                    3
                  </div>
                  <div className='text-xl font-bold leading-tight tracking-tight text-grayDarker dark:text-white'>
                    Step 3: Register
                  </div>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={registerOperatorValidationSchema}
                  onSubmit={(values, { resetForm }) => handleRegister(values, resetForm)}
                >
                  {({ errors, touched, values, handleSubmit, setFieldValue, isValid, dirty }) => (
                    <Form
                      className='my-8 w-full'
                      onSubmit={handleSubmit}
                      data-testid='testOperatorStakeForm'
                    >
                      <div className='mt-8 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
                        <div className='ml-4 w-full'>
                          <div className='relative'>
                            <div
                              className={cn(
                                'grid',
                                isDesktop ? 'grid-cols-3' : 'grid-cols-1',
                                'gap-4',
                              )}
                            >
                              <div className='p-4'>
                                <div className='flex items-center gap-1'>
                                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                                    Domain
                                  </span>
                                  <Tooltip
                                    className='max-w-xs'
                                    text='Domains are customizable execution environments within the network, enabling developers to deploy application-specific blockchains (app-chains) that operate independently while leveraging the shared consensus and storage layers.'
                                  >
                                    <InformationCircleIcon className='h-5 w-5 text-primaryAccent' />
                                  </Tooltip>
                                </div>
                                <Listbox
                                  value={values.domainId}
                                  onChange={(val) => setFieldValue('domainId', val)}
                                >
                                  <div className='relative'>
                                    <Listbox.Button className='relative mt-4 w-full cursor-default rounded-full bg-white from-primaryAccent to-blueUndertone py-[10px] pl-3 pr-10 text-left font-sans shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gradient-to-r dark:text-white sm:text-sm'>
                                      <div className='flex items-center justify-center'>
                                        <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full'>
                                          {currentDomainLabel(values)}
                                        </span>
                                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                          <ChevronDownIcon
                                            className='size-5 text-gray-400 ui-open:rotate-180 dark:text-primaryAccent'
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
                                      <Listbox.Options className='absolute mt-1 max-h-60 w-auto overflow-auto rounded-xl bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
                                        {filteredDomainsList.map((domain, index) => (
                                          <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white md:pl-10 ${
                                                active && 'bg-gray-100 dark:bg-blueDarkAccent'
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
                                                    {domain.domainConfig.domainName
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      domain.domainConfig.domainName.slice(1)}
                                                  </span>
                                                  {selected ? (
                                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-greenBright'>
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
                                <div className='flex items-center gap-1'>
                                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                                    Public key
                                  </span>
                                  <Tooltip
                                    className='max-w-xs'
                                    text='This is the public key of your operator. The operator is a node that validates transactions and submits them to the Consensus chain. You will generate this key by running a keystore script as described in the setup documentation.'
                                  >
                                    <InformationCircleIcon className='h-5 w-5 text-primaryAccent' />
                                  </Tooltip>
                                </div>
                                <Field
                                  name='publicKey'
                                  placeholder='Public Key'
                                  className={`mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white ${
                                    errors.publicKey &&
                                    touched.publicKey &&
                                    'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueDarkAccent'
                                  } `}
                                />
                                {errors.publicKey && touched.publicKey && (
                                  <div
                                    className='text-md mt-2 h-8 text-red-500'
                                    data-testid='errorMessage'
                                  >
                                    {errors.publicKey}
                                  </div>
                                )}
                              </div>
                              <div className='p-4'>
                                <div className='flex items-center gap-1'>
                                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                                    Amount to Stake ({tokenSymbol})
                                  </span>
                                  <Tooltip
                                    className='max-w-xs'
                                    text={`The amount you want to stake when registering your operator. Minimum requirement is 100 ${tokenSymbol}. The more you stake, the higher chance you have to produce bundles and earn rewards.`}
                                  >
                                    <InformationCircleIcon className='h-5 w-5 text-primaryAccent' />
                                  </Tooltip>
                                </div>
                                <Field
                                  name='amountToStake'
                                  placeholder='Amount to Stake'
                                  type='number'
                                  min='0'
                                  className={`mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white ${
                                    errors.amountToStake &&
                                    touched.amountToStake &&
                                    'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueDarkAccent'
                                  } `}
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
                                <div className='flex items-center gap-1'>
                                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                                    Nominator tax (%)
                                  </span>
                                  <Tooltip
                                    className='max-w-xs'
                                    text={`The percentage of rewards you want to collect from each reward distribution. For example, if your operator earns 1000 ${tokenSymbol} in rewards and your tax is 10%, you'll receive 100 ${tokenSymbol} as tax before the remaining rewards are distributed based on stake proportions.`}
                                  >
                                    <InformationCircleIcon className='h-5 w-5 text-primaryAccent' />
                                  </Tooltip>
                                </div>
                                <Field
                                  name='nominatorTax'
                                  placeholder='Nominator tax'
                                  type='number'
                                  min='0'
                                  max='100'
                                  step='1'
                                  className={`mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white ${
                                    errors.nominatorTax &&
                                    touched.nominatorTax &&
                                    'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                                  } `}
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
                                <div className='flex items-center gap-1'>
                                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                                    Minimum Nominator Stake ({tokenSymbol})
                                  </span>
                                  <Tooltip
                                    className='max-w-xs'
                                    text={
                                      'The minimum amount that nominators must stake when delegating their tokens to your operator. After registering, others can stake on your operator to earn a portion of rewards. Rewards are distributed proportionally based on stake after your tax is deducted.'
                                    }
                                  >
                                    <InformationCircleIcon className='h-5 w-5 text-primaryAccent' />
                                  </Tooltip>
                                </div>
                                <Field
                                  name='minimumNominatorStake'
                                  placeholder='Minimum Nominator Stake'
                                  type='number'
                                  min='1'
                                  className={`mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white ${
                                    errors.minimumNominatorStake &&
                                    touched.minimumNominatorStake &&
                                    'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                                  } `}
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
                      <div className='mt-6 flex justify-end gap-4'>
                        {!actingAccount ? (
                          <button
                            onClick={(e) => handleConnectWallet(e)}
                            className='h-10 w-36 rounded-full bg-gradient-to-r from-primaryAccent to-blueUndertone font-medium text-white'
                          >
                            Connect Wallet
                          </button>
                        ) : (
                          <button
                            className={cn(
                              'h-10 w-48 rounded-full bg-gradient-to-r from-primaryAccent to-blueUndertone font-medium text-white disabled:opacity-70',
                              (!isValid || !dirty) && 'cursor-not-allowed',
                            )}
                            type='submit'
                            disabled={!isValid || !dirty}
                          >
                            Register Operator
                          </button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PreferredExtensionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
