'use client'

import { useProfileStates } from '@/states/profile'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentDuplicateIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
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

interface TagFormValues {
  walletAddress: string
  tags: string[]
}

export const TagsPage: FC = () => {
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const { profile, tags, setShouldUpdate, isLoading } = useProfileStates((state) => state)
  const [isCreating, setIsCreating] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentTags, setCurrentTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<string | null>(null)

  const initialValues: TagFormValues = {
    walletAddress: '',
    tags: [],
  }

  const tagValidationSchema = Yup.object().shape({
    walletAddress: Yup.string().required('Wallet address is required'),
    tags: Yup.array().min(1, 'At least one tag is required'),
  })

  const handleAddTag = (setFieldValue: (field: string, value: string[]) => void) => {
    if (tagInput.trim()) {
      const newTags = [...currentTags, tagInput.trim()]
      setCurrentTags(newTags)
      setFieldValue('tags', newTags)
      setTagInput('')
    }
  }

  const handleRemoveTag = (
    tagToRemove: string,
    setFieldValue: (field: string, value: string[]) => void,
  ) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove)
    setCurrentTags(newTags)
    setFieldValue('tags', newTags)
  }

  const createTag = useCallback(
    async (values: TagFormValues, { resetForm }: { resetForm: () => void }) => {
      if (!injector || !actingAccount || !subspaceAccount) return

      setIsCreating(true)
      const tagValues = {
        ...values,
        subspaceAccount,
        profileId: profile.id,
      }

      try {
        const message = JSON.stringify(tagValues)
        const signature =
          injector.signer.signRaw &&
          (await injector.signer.signRaw({
            address: actingAccount.address,
            type: 'bytes',
            data: message,
          }))

        if (!signature) throw new Error('No signature')

        const response = await fetch('/api/profile/save-tag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: tagValues, message, signature: signature.signature }),
        })

        if (!response.ok) throw new Error('Failed to create tag')

        resetForm()
        setCurrentTags([])
        setShowCreateModal(false)
        setShouldUpdate(true)
        toast.success('Tags created successfully')
      } catch (error) {
        console.error('Error creating tags:', error)
        toast.error('Failed to create tags')
      } finally {
        setIsCreating(false)
      }
    },
    [injector, actingAccount, subspaceAccount, profile?.id, setShouldUpdate],
  )

  const deleteTag = async (tagId: string) => {
    if (!injector || !actingAccount || !subspaceAccount) return

    const values = {
      tagId,
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
      const response = await fetch('/api/profile/delete-tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values, message, signature: signature.signature }),
      })
      if (!response.ok) throw new Error('Failed to delete tag')
      toast.success('Tag deleted successfully')
      setShouldUpdate(true)
    } catch (error) {
      console.error('Error deleting tag:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Address copied to clipboard', {
      duration: 2000,
      position: 'top-center',
    })
  }

  const confirmDeleteTag = (tagId: string) => {
    setTagToDelete(tagId)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!tagToDelete) {
      setShowDeleteModal(false)
      return
    }

    setIsDeleting(tagToDelete)
    setShowDeleteModal(false)
    await deleteTag(tagToDelete)
    setIsDeleting(null)
  }

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  if (actingAccount && !subspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center p-4'>
        Please connect to a Substrate compatible wallet to view your profile.{' '}
        <AccountListDropdown />
      </div>
    )

  if (!subspaceAccount)
    return (
      <div className='flex w-full flex-col items-center justify-center p-4'>
        Please connect your Autonomys wallet to view your profile. <WalletButton />
      </div>
    )

  return (
    <div className='flex min-h-screen w-full flex-col gap-6 p-6 sm:flex-row sm:gap-8'>
      <SmallProfileBox />

      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center rounded-2xl bg-white shadow-sm dark:border-none dark:bg-boxDark'>
          <Spinner />
        </div>
      ) : (
        <div className='w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-sm dark:border-none dark:bg-boxDark'>
          <div className='p-6 sm:p-8'>
            <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Tags</h1>
            <p className='mb-6 text-sm text-gray-600 dark:text-gray-300'>
              Create and manage tags for wallets.
            </p>

            <div className='mb-8'>
              <button
                onClick={() => setShowCreateModal(true)}
                className='inline-flex items-center rounded-full border border-transparent bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none dark:bg-primaryAccent'
              >
                <PlusIcon className='mr-2 h-4 w-4' />
                Create New Tags
              </button>
            </div>

            <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                <thead className='bg-gray-50 dark:bg-gray-800'>
                  <tr>
                    <th className='w-1/4 px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Wallet Address
                    </th>
                    <th className='w-1/2 px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Tags
                    </th>
                    <th className='w-24 px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {!tags?.length ? (
                    <tr>
                      <td
                        colSpan={3}
                        className='px-4 py-8 text-center text-gray-500 dark:text-gray-400'
                      >
                        No tags. Create new tags to get started.
                      </td>
                    </tr>
                  ) : (
                    tags?.map((tag) => (
                      <tr key={tag.id} className='bg-white dark:bg-boxDark'>
                        <td className='px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                          <div className='flex max-w-[300px] items-center gap-2 truncate'>
                            <span className='truncate'>{tag.walletAddress}</span>
                            <button
                              onClick={() => copyToClipboard(tag.walletAddress)}
                              className='flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
                              aria-label='Copy address'
                            >
                              <DocumentDuplicateIcon className='h-5 w-5' />
                            </button>
                          </div>
                        </td>
                        <td className='max-w-[400px] px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                          <div className='flex flex-wrap gap-2'>
                            {tag?.tags?.map((t, index) => (
                              <span
                                key={index}
                                className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className='w-24 px-4 py-3 text-center'>
                          <button
                            onClick={() => confirmDeleteTag(tag.id)}
                            disabled={isDeleting === tag.id}
                            className='inline-flex items-center rounded-lg bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 disabled:opacity-70 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
                          >
                            {isDeleting === tag.id ? (
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
      )}

      <Transition appear show={showCreateModal} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => setShowCreateModal(false)}>
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
                    Create New Tags
                  </Dialog.Title>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={tagValidationSchema}
                    onSubmit={createTag}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form className='mt-4 space-y-4'>
                        <div>
                          <label
                            htmlFor='walletAddress'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Wallet Address
                          </label>
                          <Field
                            name='walletAddress'
                            className='mt-1 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
                            placeholder='Enter wallet address'
                          />
                          {errors.walletAddress && touched.walletAddress && (
                            <div className='mt-1 text-sm text-red-500'>{errors.walletAddress}</div>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor='tags'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Tags
                          </label>
                          <div className='mt-1 space-y-2'>
                            <div className='flex flex-wrap gap-2'>
                              {currentTags.map((tag, index) => (
                                <span
                                  key={index}
                                  className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                >
                                  {tag}
                                  <button
                                    type='button'
                                    onClick={() => handleRemoveTag(tag, setFieldValue)}
                                    className='ml-1 inline-flex items-center rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800'
                                  >
                                    <XMarkIcon className='h-3 w-3' />
                                  </button>
                                </span>
                              ))}
                            </div>
                            <div className='flex gap-2'>
                              <input
                                type='text'
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleAddTag(setFieldValue)
                                  }
                                }}
                                className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
                                placeholder='Type a tag and press Enter'
                              />
                              <button
                                type='button'
                                onClick={() => handleAddTag(setFieldValue)}
                                className='inline-flex items-center rounded-full bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-70 dark:bg-primaryAccent'
                              >
                                Add
                              </button>
                            </div>
                            {errors.tags && touched.tags && (
                              <div className='mt-1 text-sm text-red-500'>{errors.tags}</div>
                            )}
                          </div>
                        </div>

                        <div className='mt-6 flex justify-end space-x-3'>
                          <button
                            type='button'
                            onClick={() => setShowCreateModal(false)}
                            className='rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                          >
                            Cancel
                          </button>
                          <button
                            type='submit'
                            disabled={isCreating}
                            className='inline-flex items-center rounded-full bg-buttonLightFrom px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-70 dark:bg-primaryAccent'
                          >
                            {isCreating ? (
                              <>
                                <SpinnerSvg className='mr-2' />
                                Creating...
                              </>
                            ) : (
                              'Create Tags'
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
                    Delete Tags
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500 dark:text-gray-300'>
                      Are you sure you want to delete these tags? This action cannot be undone.
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
    </div>
  )
}
