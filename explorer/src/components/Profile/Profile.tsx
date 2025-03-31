'use client'

import { useProfileStates } from '@/states/profile'
import { Tab } from '@headlessui/react'
import { sendGAEvent } from '@next/third-parties/google'
import { Field, Form, Formik } from 'formik'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import { SmallProfileBox } from './SmallProfileBox'

export const ProfilePage: FC = () => {
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const profile = useProfileStates((state) => state.profile)
  const setShouldUpdate = useProfileStates((state) => state.setShouldUpdate)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  const profileValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    avatar: Yup.string(),
    banner: Yup.string(),
    website: Yup.string().url('Invalid URL'),
    email: Yup.string().email('Invalid email'),
    discord: Yup.string(),
    github: Yup.string(),
    twitter: Yup.string(),
  })

  const handleProfileSubmit = useCallback(
    async (values: typeof profile) => {
      if (!injector || !actingAccount || !subspaceAccount) return

      const loadingToastId = toast.loading('Saving profile...')

      try {
        setIsSaving(true)
        const message = JSON.stringify(values)
        const signature =
          injector.signer.signRaw &&
          (await injector.signer.signRaw({
            address: actingAccount.address,
            type: 'bytes',
            data: message,
          }))

        if (!signature) {
          toast.error('Signature creation failed', { id: loadingToastId })
          throw new Error('No signature')
        }

        const response = await fetch('/api/profile/save-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subspaceAccount,
            values,
            message,
            signature: signature.signature,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          const errorMessage = errorData?.message || 'Failed to save profile'
          toast.error(errorMessage, { id: loadingToastId })
          throw new Error(errorMessage)
        }

        toast.success('Profile saved successfully!', { id: loadingToastId })
        setShouldUpdate(true)
      } catch (error) {
        console.error('Error saving profile:', error)
        toast.error('Failed to save profile. Please try again.', { id: loadingToastId })
      } finally {
        setIsSaving(false)
      }
    },
    [injector, actingAccount, subspaceAccount, setShouldUpdate],
  )

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
    <div className='flex min-h-screen w-full flex-col gap-6 p-6 sm:flex-row sm:gap-8'>
      <SmallProfileBox showPrivateDetails />

      {/* Right Side: Modern Tabbed Form */}
      <div className='w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-sm transition-all dark:border-gray-800 dark:bg-boxDark'>
        <div className='p-6 sm:p-8'>
          <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Edit Profile</h1>

          <Formik
            enableReinitialize={true}
            initialValues={profile}
            validationSchema={profileValidationSchema}
            onSubmit={handleProfileSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className='w-full space-y-6'>
                <Tab.Group>
                  <Tab.List className='mb-8 flex w-full space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800'>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all ${
                          selected
                            ? 'bg-white text-gray-900 shadow dark:bg-primaryAccent dark:text-white'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`
                      }
                    >
                      Public Information
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all ${
                          selected
                            ? 'bg-white text-gray-900 shadow dark:bg-primaryAccent dark:text-white'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`
                      }
                    >
                      Contact Information
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className='space-y-5'>
                      {/* Public Info Fields */}
                      <div className='grid gap-5 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <label
                            htmlFor='name'
                            className='text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Name
                          </label>
                          <Field
                            name='name'
                            placeholder='Your name'
                            className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                          />
                          {errors.name && touched.name && (
                            <p className='text-sm text-red-500'>{errors.name}</p>
                          )}
                        </div>

                        <div className='space-y-2'>
                          <label
                            htmlFor='website'
                            className='text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Website
                          </label>
                          <Field
                            name='website'
                            placeholder='https://...'
                            className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                          />
                          {errors.website && touched.website && (
                            <p className='text-sm text-red-500'>{errors.website}</p>
                          )}
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='description'
                          className='text-sm font-medium text-gray-700 dark:text-gray-300'
                        >
                          Bio
                        </label>
                        <Field
                          as='textarea'
                          name='description'
                          rows={4}
                          placeholder='Tell us about yourself'
                          className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        />
                        {errors.description && touched.description && (
                          <p className='text-sm text-red-500'>{errors.description}</p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='avatar'
                          className='text-sm font-medium text-gray-700 dark:text-gray-300'
                        >
                          Avatar URL
                        </label>
                        <Field
                          name='avatar'
                          placeholder='https://...'
                          className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        />
                        {errors.avatar && touched.avatar && (
                          <p className='text-sm text-red-500'>{errors.avatar}</p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='banner'
                          className='text-sm font-medium text-gray-700 dark:text-gray-300'
                        >
                          Banner URL
                        </label>
                        <Field
                          name='banner'
                          placeholder='https://...'
                          className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        />
                        {errors.banner && touched.banner && (
                          <p className='text-sm text-red-500'>{errors.banner}</p>
                        )}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel className='space-y-5'>
                      {/* Private Info Fields */}
                      <div className='grid gap-5 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <label
                            htmlFor='email'
                            className='text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Email
                          </label>
                          <Field
                            name='email'
                            type='email'
                            placeholder='you@example.com'
                            className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                          />
                          {errors.email && touched.email && (
                            <p className='text-sm text-red-500'>{errors.email}</p>
                          )}
                        </div>

                        <div className='space-y-2'>
                          <label
                            htmlFor='discord'
                            className='text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Discord
                          </label>
                          <Field
                            name='discord'
                            placeholder='Your Discord handle'
                            className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                          />
                          {errors.discord && touched.discord && (
                            <p className='text-sm text-red-500'>{errors.discord}</p>
                          )}
                        </div>
                      </div>

                      <div className='grid gap-5 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <label
                            htmlFor='github'
                            className='text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            GitHub
                          </label>
                          <Field
                            name='github'
                            placeholder='Your GitHub profile'
                            className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                          />
                          {errors.github && touched.github && (
                            <p className='text-sm text-red-500'>{errors.github}</p>
                          )}
                        </div>

                        <div className='space-y-2'>
                          <label
                            htmlFor='twitter'
                            className='text-sm font-medium text-gray-700 dark:text-gray-300'
                          >
                            Twitter
                          </label>
                          <Field
                            name='twitter'
                            placeholder='@handle'
                            className='block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-primaryAccent focus:outline-none focus:ring-2 focus:ring-primaryAccent/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                          />
                          {errors.twitter && touched.twitter && (
                            <p className='text-sm text-red-500'>{errors.twitter}</p>
                          )}
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={isSubmitting || isSaving}
                    className='inline-flex w-full items-center justify-center rounded-lg bg-primaryAccent px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-primaryAccent/90 focus:outline-none focus:ring-2 focus:ring-primaryAccent/50 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto'
                  >
                    {isSubmitting || isSaving ? (
                      <div className='flex items-center'>
                        <svg
                          className='-ml-1 mr-2 h-4 w-4 animate-spin text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Saving Profile...
                      </div>
                    ) : (
                      'Save Profile'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
