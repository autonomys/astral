import { isAddress } from '@polkadot/util-crypto'
import { Modal } from 'components/common/Modal'
import { AccountPreferenceSection, WalletType } from 'constants/wallet'
import { isAddress as isEvmAddress } from 'ethers'
import { Field, FieldArray, Form, Formik, FormikState } from 'formik'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useMemo, useState } from 'react'
import { useAddressBookStates } from 'states/addressBook'
import type { AddressBookEntry } from 'types/wallet'
import { camelToNormal, capitalizeFirstLetter, shortString } from 'utils/string'
import * as Yup from 'yup'

type ActionsModalProps = {
  isOpen: boolean
  preference: AccountPreferenceSection
  onClose: () => void
}

export const AccountPreferencesModal: FC<ActionsModalProps> = ({ isOpen, preference, onClose }) => {
  const { actingAccount } = useWallet()
  const [formError, setFormError] = useState<string | null>(null)
  const { addresses, addAddress, removeAddress } = useAddressBookStates()

  const initialAddAddressBookValues: AddressBookEntry = useMemo(
    () => ({
      address: '',
      label: '',
      type: WalletType.subspace,
    }),
    [],
  )

  const addAddressBookFormValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        address: Yup.string()
          .notOneOf(
            addresses.map((a) => a.address),
            'Address already exists in the address book',
          )
          .test(
            'is-valid-address',
            'Invalid address (must be a valid Polkadot or Ethereum address)',
            (value) => isAddress(value) || isEvmAddress(value),
          )
          .required('Address is required'),
        label: Yup.string()
          .notOneOf(
            addresses.map((a) => a.label),
            'Label already exists in the address book',
          )
          .required('Label is required'),
      }),
    [addresses],
  )

  const handleClose = useCallback(() => {
    setFormError(null)
    onClose()
  }, [onClose])

  const handleAddInAddressBook = useCallback(
    async (
      values: AddressBookEntry,
      resetForm: (nextState?: Partial<FormikState<AddressBookEntry>> | undefined) => void,
    ) => {
      console.log('Add address book', values)
      addAddress(values)
      resetForm()
    },
    [addAddress],
  )

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

  const handleDeleteClick = useCallback(
    (address: AddressBookEntry) => {
      removeAddress(address)
    },
    [removeAddress],
  )

  const ActionBody = useMemo(() => {
    switch (preference) {
      case AccountPreferenceSection.AddressBook:
        return (
          <div className='flex flex-col items-start gap-4'>
            {addresses.length > 0 ? (
              <div className='grid w-full grid-cols-1 gap-4 '>
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className='flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 shadow-lg dark:bg-blueAccent'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='text-sm font-medium text-grayDarker dark:text-white'>
                        {address.label}
                      </div>
                      <div className='text-sm text-grayDarker dark:text-white'>
                        {shortString(address.address)}
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <button
                        className='flex items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium capitalize text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
                        onClick={() => handleDeleteClick(address)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                No address found in the address book
              </div>
            )}
            <Formik
              initialValues={initialAddAddressBookValues}
              validationSchema={addAddressBookFormValidationSchema}
              onSubmit={(values, { resetForm }) => handleAddInAddressBook(values, resetForm)}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form className='w-full' onSubmit={handleSubmit} data-testid='testSendTokenForm'>
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    Save address
                  </span>
                  <FieldArray
                    name='dischargeNorms'
                    render={() => (
                      <div className='relative'>
                        <Field
                          name='address'
                          type='text'
                          placeholder='Enter address'
                          className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                            errors.address &&
                            'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                          }`}
                        />
                      </div>
                    )}
                  />
                  {errors.address && touched.address ? (
                    <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                      {errors.address}
                    </div>
                  ) : (
                    <div className='text-md mt-2 h-8' data-testid='placeHolder' />
                  )}
                  <span className='text-base font-medium text-grayDarker dark:text-white'>
                    Label
                  </span>
                  <FieldArray
                    name='dischargeNorms'
                    render={() => (
                      <div className='relative'>
                        <Field
                          name='label'
                          type='text'
                          placeholder='Enter label'
                          className={`mt-4 block w-[400px] rounded-xl bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-blueAccent dark:text-white ${
                            errors.address &&
                            'block w-full rounded-full bg-white px-4 py-[10px] text-sm text-gray-900 shadow-lg'
                          }`}
                        />
                      </div>
                    )}
                  />
                  {errors.label && touched.label ? (
                    <div className='text-md mt-2 h-8 text-red-500' data-testid='errorMessage'>
                      {errors.label}
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
                      className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium capitalize text-white dark:bg-purpleAccent md:space-x-4 md:text-base'
                      type='submit'
                    >
                      Add address
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        )
      default:
        return null
    }
  }, [
    preference,
    addresses,
    initialAddAddressBookValues,
    addAddressBookFormValidationSchema,
    handleDeleteClick,
    handleAddInAddressBook,
    ErrorPlaceholder,
    actingAccount,
  ])

  return (
    <Modal
      title={capitalizeFirstLetter(camelToNormal(preference))}
      onClose={handleClose}
      isOpen={isOpen}
    >
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