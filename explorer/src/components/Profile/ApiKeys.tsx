'use client'

import { useProfileStates } from '@/states/profile'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentDuplicateIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { sendGAEvent } from '@next/third-parties/google'
import { SpinnerSvg } from 'components/common/SpinnerSvg'
import { Field, Form, Formik } from 'formik'
import useWallet from 'hooks/useWallet'
import { FC, Fragment, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { Spinner } from '../common/Spinner'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import { SmallProfileBox } from './SmallProfileBox'

export const ApiKeysPage: FC = () => {
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const profile = useProfileStates((state) => state.profile)
  const apiKeys = useProfileStates((state) => state.apiKeys)
  const isLoading = useProfileStates((state) => state.isLoading)
  const setShouldUpdate = useProfileStates((state) => state.setShouldUpdate)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const initialValues = {
    description: '',
  }

  const apiKeyValidationSchema = Yup.object().shape({
    description: Yup.string().required('API key description is required'),
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('API key copied to clipboard', {
      duration: 2000,
      position: 'top-center',
    })
  }

  const createApiKey = useCallback(
    async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
      if (!injector || !actingAccount || !subspaceAccount) return

      setIsCreating(true)
      const apiKeyValues = {
        ...values,
        subspaceAccount,
        profileId: profile.id,
      }

      try {
        const message = JSON.stringify(apiKeyValues)
        const signature =
          injector.signer.signRaw &&
          (await injector.signer.signRaw({
            address: actingAccount.address,
            type: 'bytes',
            data: message,
          }))

        if (!signature) throw new Error('No signature')

        const response = await fetch('/api/profile/save-api-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: apiKeyValues, message, signature: signature.signature }),
        })

        if (!response.ok) throw new Error('Failed to create API key')

        resetForm()
        setShouldUpdate(true)
        toast.success('API key created successfully')
      } catch (error) {
        console.error('Error creating API key:', error)
        toast.error('Failed to create API key')
      } finally {
        setIsCreating(false)
      }
    },
    [injector, actingAccount, subspaceAccount, profile?.id, setShouldUpdate],
  )

  const confirmDeleteApiKey = (apiKeyId: string) => {
    setKeyToDelete(apiKeyId)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!keyToDelete) {
      setShowDeleteModal(false)
      return
    }

    setShowDeleteModal(false)
    await deleteApiKey(keyToDelete)
  }

  const deleteApiKey = async (apiKeyId: string) => {
    if (!injector || !actingAccount || !subspaceAccount) return

    setIsDeleting(apiKeyId)
    const values = {
      apiKeyId,
      subspaceAccount,
    }

    try {
      const message = JSON.stringify(values)
      const signature =
        injector.signer.signRaw &&
        (await injector.signer.signRaw({
          address: actingAccount.address,
          type: 'bytes',
          data: message,
        }))

      if (!signature) throw new Error('No signature')
      const response = await fetch('/api/profile/delete-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values, message, signature: signature.signature }),
      })
      if (!response.ok) throw new Error('Failed to delete API key')
      setShouldUpdate(true)
      toast.success('API key deleted successfully')
    } catch (error) {
      console.error('Error deleting API key:', error)
      toast.error('Failed to delete API key')
    } finally {
      setIsDeleting(null)
    }
  }

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  if (actingAccount && !subspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4 p-8 text-center'>
        <p className='text-lg font-medium'>
          Please connect to a Substrate compatible wallet to view your profile.
        </p>
        <AccountListDropdown />
      </div>
    )

  if (!subspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4 p-8 text-center'>
        <p className='text-lg font-medium'>
          Please connect your Autonomys wallet to view your profile.
        </p>
        <WalletButton />
      </div>
    )

  return (
    <>
      <div className='flex min-h-screen w-full flex-col gap-6 p-6 sm:flex-row sm:gap-8'>
        <SmallProfileBox />

        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center rounded-2xl bg-white shadow-sm dark:border-none dark:bg-boxDark'>
            <Spinner />
          </div>
        ) : (
          <div className='w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-sm dark:border-none dark:bg-boxDark'>
            <div className='p-6 sm:p-8'>
              <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>API Keys</h1>
              <p className='mb-6 text-sm text-gray-600 dark:text-gray-300'>
                Create and manage API keys for accessing your application.
              </p>

              <div className='mb-8 space-y-4'>
                <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                  Create a new API Key
                </h2>

                <Formik
                  initialValues={initialValues}
                  validationSchema={apiKeyValidationSchema}
                  onSubmit={createApiKey}
                >
                  {({ errors, touched }) => (
                    <Form className='flex items-start gap-3'>
                      <div className='flex-grow'>
                        <Field
                          type='text'
                          name='description'
                          placeholder='Enter description for new API key'
                          className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
                        />
                        {errors.description && touched.description && (
                          <div className='mt-1 text-sm text-red-500'>{errors.description}</div>
                        )}
                      </div>
                      <button
                        type='submit'
                        disabled={isCreating}
                        className='inline-flex justify-center rounded-full border border-transparent bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none disabled:opacity-70 dark:bg-primaryAccent'
                      >
                        {isCreating ? (
                          <div className='flex items-center'>
                            <SpinnerSvg />
                            Creating...
                          </div>
                        ) : (
                          <>
                            <PlusIcon className='my-auto mr-1.5 h-4 w-4' />
                            Create Key
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>

              <div className='space-y-4'>
                <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                  Your API Keys
                </h2>

                <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                    <thead className='bg-gray-50 dark:bg-gray-800'>
                      <tr>
                        <th className='w-1/4 max-w-[200px] px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                          Description
                        </th>
                        <th className='w-1/3 max-w-[300px] px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                          Key
                        </th>
                        <th className='w-1/6 max-w-[150px] px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                          Created
                        </th>
                        <th className='w-24 px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                      {!apiKeys?.length ? (
                        <tr>
                          <td
                            colSpan={4}
                            className='px-4 py-8 text-center text-gray-500 dark:text-gray-400'
                          >
                            No API keys. Create a new key to get started.
                          </td>
                        </tr>
                      ) : (
                        apiKeys?.map((key) => (
                          <tr key={key.id} className='bg-white dark:bg-boxDark'>
                            <td className='max-w-[200px] truncate px-4 py-3 text-sm font-medium text-gray-900 dark:text-white'>
                              {key.description}
                            </td>
                            <td className='px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                              <div className='flex max-w-[300px] items-center gap-2 truncate'>
                                <span className='truncate'>{key.shortKey}</span>
                                <button
                                  onClick={() => copyToClipboard(key.key)}
                                  className='flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
                                  aria-label='Copy key'
                                >
                                  <DocumentDuplicateIcon className='h-5 w-5' />
                                </button>
                              </div>
                            </td>
                            <td className='max-w-[150px] truncate px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                              {new Date(key.createdAt).toLocaleDateString()}
                            </td>
                            <td className='px-4 py-3 text-center text-sm'>
                              <button
                                onClick={() => confirmDeleteApiKey(key.id)}
                                disabled={isDeleting === key.id}
                                className='inline-flex items-center rounded-lg bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 disabled:opacity-70 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
                              >
                                {isDeleting === key.id ? (
                                  <div className='flex items-center'>
                                    <SpinnerSvg className='text-red-600' />
                                    <span className='ml-1.5'>Deleting...</span>
                                  </div>
                                ) : (
                                  <>
                                    <TrashIcon className='mr-1.5 h-4 w-4' />
                                    Delete
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Transition appear show={showDeleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => setShowDeleteModal(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-boxDark'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-gray-900 dark:text-white'
                  >
                    Delete API Key
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 dark:text-gray-300'>
                      Are you sure you want to delete this API key? This action cannot be undone.
                    </p>
                  </div>

                  <div className='mt-6 flex justify-end space-x-3'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-full border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2'
                      onClick={handleConfirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
