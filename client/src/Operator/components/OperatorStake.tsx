import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { isHex } from '@polkadot/util'
import { formatAddress } from 'common/helpers/formatAddress'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import { WalletIcon } from 'common/icons'
import { EXTERNAL_ROUTES } from 'common/routes'
import { Field, Form, Formik, FormikState } from 'formik'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import PreferredExtensionModal from '../../layout/components/PreferredExtensionModal'

interface FormValues {
  domainId: number
  signingKey: string
  amountToStake: number
  nominatorTax: number
  minimumNominatorStake: number
}

type OperatorAllowListRestricted = { operators: string[] }
type OperatorAllowListOpen = { anyone: null }
type OperatorAllowList = OperatorAllowListRestricted | OperatorAllowListOpen
type Domain = {
  domainId: number
  domainName: string
  operatorAllowList: OperatorAllowList
}

const OperatorStake = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { api, actingAccount, injector } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const [domainsList, setDomainsList] = useState<Domain[]>([])
  const [minOperatorStake, setMinOperatorStake] = useState<number>(0)
  const [tokenDecimals, setTokenDecimals] = useState<number>(0)
  const [tokenSymbol, setTokenSymbol] = useState<string>('')

  const initialValues: FormValues = {
    domainId: 0,
    signingKey: '',
    amountToStake: 0,
    nominatorTax: 0,
    minimumNominatorStake: 0,
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
        return (domain.operatorAllowList as OperatorAllowListRestricted).operators.includes(
          formatAddress(actingAccount?.address) as string,
        )
      }),
    [domainsList, actingAccount],
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

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      resetForm: (nextState?: Partial<FormikState<FormValues>> | undefined) => void,
    ) => {
      if (!api || !actingAccount || !injector)
        return setFormError('We are not able to connect to the blockchain')

      try {
        const block = await api.rpc.chain.getBlock()
        const hash = await api.tx.domains
          .registerOperator(values.domainId, values.amountToStake * 10 ** tokenDecimals, {
            signingKey: values.signingKey,
            minimumNominatorStake: values.minimumNominatorStake * 10 ** tokenDecimals,
            nominationTax: values.nominatorTax,
          })
          .signAndSend(actingAccount.address, { signer: injector.signer })

        console.log('block', block)
        console.log('hash', hash)
      } catch (error) {
        setFormError('There was an error while registering the operator')
        console.error('Error', error)
      }
      resetForm()
    },
    [actingAccount, api, injector, tokenDecimals],
  )

  const handleConnectWallet = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsOpen(true)
  }, [])

  useEffect(() => {
    loadDomains()
  }, [api, loadDomains])

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full flex flex-col mt-5 pt-20 sm:mt-0'>
        <div className="w-full font-['Montserrat'] bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none">
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
            <div className='w-full text-[#241235] text-base mt-6 font-medium break-words dark:text-white'>
              tSSC holders (Gemini 3h testnet network only) can stake their tSSC to add more
              security to the protocol and earn Staking Incentives. Learn more about the risks
              involved.
            </div>
            <div className='text-[#241235] text-2xl mt-4 font-bold leading-tight tracking-tight dark:text-white'>
              Step 1: Setup a node
            </div>

            <div className='mt-4 text-xl'>
              <Link
                data-testid={'operator-link-documentation'}
                className='text-[#4524C1] hover:text-[#DE67E4] dark:text-[#DDEFF1] underline cursor-pointer'
                to={EXTERNAL_ROUTES.operatorDocs}
                target='_blank'
              >
                Please follow the docs to setup a node
              </Link>
            </div>

            <div className='text-[#241235] text-2xl mt-4 font-bold leading-tight tracking-tight dark:text-white'>
              Step 2: Register
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={registerOperatorValidationSchema}
              onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
            >
              {({ errors, touched, values, handleSubmit, setFieldValue }) => (
                <Form
                  className='w-full my-8'
                  onSubmit={handleSubmit}
                  data-testid='testOperatorStakeForm'
                >
                  <div className='p-5 mt-8 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
                    <div className='ml-4 w-full'>
                      <div className='relative'>
                        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
                          <div className='p-4'>
                            <span className='text-[#241235] text-base font-medium dark:text-white'>
                              Domain
                            </span>
                            <Listbox
                              value={values.domainId}
                              onChange={(val) => setFieldValue('domainId', val)}
                            >
                              <div className='relative'>
                                <Listbox.Button className='font-["Montserrat"] relative w-full cursor-default mt-4 rounded-full bg-white py-[10px] pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white'>
                                  <div className='flex items-center justify-center'>
                                    <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full '>
                                      {currentDomainLabel(values)}
                                    </span>
                                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                      <ChevronDownIcon
                                        className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform dark:text-[#DE67E4]'
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
                                  <Listbox.Options className='absolute mt-1 max-h-60 w-auto md:w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white'>
                                    {filteredDomainsList.map((domain, index) => (
                                      <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 text-gray-900 md:pl-10 pr-4 dark:text-white ${
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
                                                    className='h-5 w-5 hidden md:block'
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
                          <div className={`p-4 ${isDesktop ? 'col-span-2' : 'col-span-1'}`}>
                            <span className='text-[#241235] text-base font-medium dark:text-white'>
                              Signing key
                            </span>
                            <Field
                              name='signingKey'
                              placeholder='Signing Key'
                              className={`block px-4 py-[10px] mt-4 w-full text-sm text-gray-900 rounded-full bg-white shadow-lg dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white
                            ${
                              errors.signingKey &&
                              touched.signingKey &&
                              'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg dark:bg-[#2A345E]'
                            }
                          `}
                            />
                            {errors.signingKey && touched.signingKey ? (
                              <div
                                className='text-red-500 text-md mt-2 h-8'
                                data-testid='errorMessage'
                              >
                                {errors.signingKey}
                              </div>
                            ) : (
                              <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                            )}
                          </div>

                          <div className='p-4'>
                            <span className='text-[#241235] text-base font-medium dark:text-white'>
                              Amount to Stake
                            </span>
                            <Field
                              name='amountToStake'
                              placeholder='Amount to Stake'
                              className={`block px-4 py-[10px] mt-4 w-full text-sm text-gray-900 rounded-full bg-white shadow-lg dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white
                            ${
                              errors.amountToStake &&
                              touched.amountToStake &&
                              'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg dark:bg-[#2A345E]'
                            }
                          `}
                            />
                            {errors.amountToStake && touched.amountToStake ? (
                              <div
                                className='text-red-500 text-md mt-2 h-8'
                                data-testid='errorMessage'
                              >
                                {errors.amountToStake}
                              </div>
                            ) : (
                              <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                            )}
                          </div>
                          <div className='p-4'>
                            <span className='text-[#241235] text-base font-medium dark:text-white'>
                              Nominator tax
                            </span>
                            <Field
                              name='nominatorTax'
                              placeholder='Nominator tax'
                              className={`block px-4 py-[10px] mt-4 w-full text-sm text-gray-900 rounded-xl bg-white shadow-lg dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white
                            ${
                              errors.nominatorTax &&
                              touched.nominatorTax &&
                              'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg'
                            }
                          `}
                            />
                            {errors.nominatorTax && touched.nominatorTax ? (
                              <div
                                className='text-red-500 text-md mt-2 h-8'
                                data-testid='errorMessage'
                              >
                                {errors.nominatorTax}
                              </div>
                            ) : (
                              <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                            )}
                          </div>
                          <div className='p-4'>
                            <span className='text-[#241235] text-base font-medium dark:text-white'>
                              Minimum Nominator Stake
                            </span>
                            <Field
                              name='minimumNominatorStake'
                              placeholder='Minimum Nominator Stake'
                              className={`block px-4 py-[10px] mt-4 w-full text-sm text-gray-900 rounded-xl bg-white shadow-lg dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white
                            ${
                              errors.minimumNominatorStake &&
                              touched.minimumNominatorStake &&
                              'block px-4 py-[10px] w-full text-sm text-gray-900 rounded-full bg-white shadow-lg'
                            }
                          `}
                            />
                            {errors.minimumNominatorStake && touched.minimumNominatorStake ? (
                              <div
                                className='text-red-500 text-md mt-2 h-8'
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
                    <div className='text-red-500 text-md mt-2 h-8' data-testid='errorMessage'>
                      {formError}
                    </div>
                  ) : (
                    <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                  )}
                  <div className='container mx-auto flex flex-wrap justify-between py-5 md:px-[25px] 2xl:px-0 flex-col md:flex-row items-center'>
                    {!actingAccount ? (
                      <button
                        onClick={(e) => handleConnectWallet(e)}
                        className='h-10 w-36 text-white font-medium bg-gradient-to-r from-[#EA71F9] to-[#4D397A] rounded-full'
                      >
                        Connect Wallet
                      </button>
                    ) : (
                      <button
                        className='leading-4 text-[13px] font-semibold text-white rounded-full px-5 py-3 block bg-[#241235] dark:bg-[#DE67E4]'
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

export default OperatorStake
