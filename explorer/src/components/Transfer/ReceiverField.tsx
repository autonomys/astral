import { cn } from '@/utils/cn'
import { DomainRuntime, isAddress, shortString } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { LuBook } from 'components/icons'
import { WalletType } from 'constants/wallet'
import { isAddress as isEvmAddress } from 'ethers'
import { Field, FieldArray, Form, Formik } from 'formik'
import useWallet from 'hooks/useWallet'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, Fragment, useCallback, useMemo, useState } from 'react'
import { useAddressBookStates } from 'states/addressBook'
import { formatAddress } from 'utils/formatAddress'
import * as Yup from 'yup'

interface FormValues {
  address: string
}

export const ReceiverField: FC = () => {
  const { actingAccount, accounts, domainsApis } = useWallet()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [addressBookIsOpen, setAddressBookIsOpen] = useState<boolean>(false)
  const { addresses } = useAddressBookStates()

  const receiver = searchParams.get('receiver')
  const to = searchParams.get('to')

  const initialValues: FormValues = useMemo(
    () => ({
      address: receiver || '',
    }),
    [receiver],
  )

  const formValidationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
  })

  const warningReceiverFormatInvalidForDestination = useMemo(() => {
    if (to && to === 'consensus' && receiver && !isAddress(receiver)) {
      return 'Receiver must be a consensus address'
    } else if (to && to.startsWith('domain') && receiver) {
      const destinationChain = to.replace('domainId', '')
      const domainApi = domainsApis[destinationChain]
      if (!domainApi) return null
      if (domainApi.runtime === DomainRuntime.AUTO_EVM && !isEvmAddress(receiver)) {
        return 'Receiver must be a valid EVM address'
      }
    }
    return null
  }, [to, receiver, domainsApis])

  const setReceiver = useCallback(
    (address: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('receiver', address)
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const handleSetReceiver = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setReceiver(e.target.value),
    [setReceiver],
  )

  return (
    <div className='bg-grayLighter dark:border-purpleDeepAccent dark:bg-purpleUndertone flex flex-col space-y-1 rounded-lg border-grayDarker'>
      <div className='text-grayText flex items-center justify-between text-sm dark:text-white'>
        <Formik
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          enableReinitialize
          onSubmit={() => {}}
        >
          {({ errors, touched, handleSubmit, setFieldValue, values }) => (
            <Form className='w-full' onSubmit={handleSubmit} data-testid='testOperatorStakeForm'>
              <div className='flex items-center'>
                <FieldArray
                  name='dischargeNorms'
                  render={() => (
                    <div className='relative w-full'>
                      <Field
                        name='address'
                        placeholder='Enter recipient address'
                        type='text'
                        onChange={handleSetReceiver}
                        value={values.address}
                        className={cn(
                          'mt-4 block w-full overflow-ellipsis rounded-md border-blueShade bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] pr-[120px] text-base text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder-gray-200',
                          errors.address && touched.address && 'border-red-500',
                        )}
                      />

                      <Listbox value={actingAccount}>
                        <Listbox.Button
                          className={
                            'absolute mt-2 flex items-center space-x-1 rounded-md px-2 text-xs font-medium text-primaryAccent dark:text-gray-100'
                          }
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                          onClick={() => setAddressBookIsOpen(!addressBookIsOpen)}
                        >
                          <LuBook className='h-4 w-4' />
                          <span className='text-xs'>Address book</span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-40 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
                            {accounts &&
                              accounts.map((account, chainIdx) => {
                                const subAccount =
                                  account.type === WalletType.subspace ||
                                  (account as { type: string }).type === 'sr25519'
                                    ? formatAddress(account.address)
                                    : account.address
                                const formattedAccount = subAccount && shortString(subAccount)
                                return (
                                  <Listbox.Option
                                    key={chainIdx}
                                    className={({ active }) =>
                                      `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                                        active && 'bg-gray-100 dark:bg-blueDarkAccent'
                                      }`
                                    }
                                    value={account}
                                    onClick={() => {
                                      if (subAccount) {
                                        setReceiver(subAccount)
                                        setFieldValue('address', subAccount)
                                      }
                                    }}
                                  >
                                    {({ selected }) => {
                                      return (
                                        <div className='px-2'>
                                          <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                          >
                                            {account.name} {formattedAccount}{' '}
                                            <span className='my-0 ml-4 rounded-lg bg-grayDarker px-2 text-xs font-medium text-white dark:bg-primaryAccent md:space-x-6 md:text-xs'>
                                              Wallet
                                            </span>
                                          </span>
                                        </div>
                                      )
                                    }}
                                  </Listbox.Option>
                                )
                              })}
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
                                  onClick={() => {
                                    setFieldValue('address', address.address)
                                    setReceiver(address.address)
                                  }}
                                >
                                  {({ selected }) => {
                                    const subAccount = !address.address.startsWith('st')
                                      ? formatAddress(address.address)
                                      : address.address
                                    const formattedAccount = subAccount && shortString(subAccount)
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
              </div>
              {warningReceiverFormatInvalidForDestination && (
                <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                  {warningReceiverFormatInvalidForDestination}
                </div>
              )}
              {errors.address && touched.address ? (
                <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                  {errors.address}
                </div>
              ) : (
                <div className='text-md mt-2 h-8' data-testid='placeHolder' />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
