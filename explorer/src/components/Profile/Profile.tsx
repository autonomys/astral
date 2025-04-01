'use client'

import { useProfileStates } from '@/states/profile'
import { Tab } from '@headlessui/react'
import { sendGAEvent } from '@next/third-parties/google'
import { Field, FieldProps, Form, Formik } from 'formik'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { Button } from '../common/Button'
import { Spinner } from '../common/Spinner'
import { Toggle } from '../common/Toggle'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import { SmallProfileBox } from './SmallProfileBox'

export const ProfilePage: FC = () => {
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const { profile, setShouldUpdate, isLoading } = useProfileStates((state) => state)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  const profileValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    website: Yup.string().url('Invalid URL'),
    email: Yup.string().email('Invalid email'),
    discord: Yup.string(),
    github: Yup.string(),
    twitter: Yup.string(),
    emailIsPublic: Yup.boolean().default(false),
    discordIsPublic: Yup.boolean().default(false),
    githubIsPublic: Yup.boolean().default(false),
    twitterIsPublic: Yup.boolean().default(false),
    websiteIsPublic: Yup.boolean().default(false),
    walletsArePublic: Yup.boolean().default(false),
    tagsArePublic: Yup.boolean().default(false),
  })

  console.log({ profile })

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
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='p-6 sm:p-8'>
            <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Edit Profile</h1>

            <Formik
              enableReinitialize={true}
              initialValues={{
                ...profile,
                emailIsPublic: profile.emailIsPublic ?? false,
                discordIsPublic: profile.discordIsPublic ?? false,
                githubIsPublic: profile.githubIsPublic ?? false,
                twitterIsPublic: profile.twitterIsPublic ?? false,
                websiteIsPublic: profile.websiteIsPublic ?? false,
                walletsArePublic: profile.walletsArePublic ?? false,
                tagsArePublic: profile.tagsArePublic ?? false,
              }}
              validationSchema={profileValidationSchema}
              onSubmit={handleProfileSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className='w-full space-y-6'>
                  <Tab.Group>
                    <Tab.List className='mb-8 flex w-full space-x-1 rounded-full bg-gray-100 p-1 dark:bg-gray-800'>
                      <Tab
                        className={({ selected }) =>
                          `w-full rounded-full py-3 text-sm font-medium leading-5 transition-all ${
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
                          `w-full rounded-full py-3 text-sm font-medium leading-5 transition-all ${
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
                              className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
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
                              className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
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
                            className='block w-full rounded-2xl bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
                          />
                          {errors.description && touched.description && (
                            <p className='text-sm text-red-500'>{errors.description}</p>
                          )}
                        </div>

                        {/* New Privacy Settings Section */}
                        <div className='mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700'>
                          <h3 className='mb-4 text-lg font-medium text-gray-900 dark:text-white'>
                            Privacy Settings
                          </h3>

                          <div className='space-y-4'>
                            <div className='grid gap-4 sm:grid-cols-2'>
                              {/* Contact Information Privacy */}
                              <div className='space-y-3'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                  Contact Information
                                </h4>
                                <div className='space-y-2'>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='emailIsPublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      Email
                                    </label>
                                    <Field name='emailIsPublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name='emailIsPublic'
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='discordIsPublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      Discord
                                    </label>
                                    <Field name='discordIsPublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name={field.name}
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='githubIsPublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      GitHub
                                    </label>
                                    <Field name='githubIsPublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name={field.name}
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='twitterIsPublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      Twitter
                                    </label>
                                    <Field name='twitterIsPublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name={field.name}
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                </div>
                              </div>

                              {/* Other Information Privacy */}
                              <div className='space-y-3'>
                                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                  Other Information
                                </h4>
                                <div className='space-y-2'>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='websiteIsPublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      Website
                                    </label>
                                    <Field name='websiteIsPublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name={field.name}
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='walletsArePublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      Connected Wallets
                                    </label>
                                    <Field name='walletsArePublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name={field.name}
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                  <div className='flex items-center justify-between py-2'>
                                    <label
                                      htmlFor='tagsArePublic'
                                      className='text-sm text-gray-600 dark:text-gray-400'
                                    >
                                      Tags
                                    </label>
                                    <Field name='tagsArePublic'>
                                      {({ field, form }: FieldProps) => (
                                        <Toggle
                                          checked={field.value === true}
                                          onChange={(checked) =>
                                            form.setFieldValue(field.name, checked)
                                          }
                                          name={field.name}
                                          className='flex-shrink-0'
                                        />
                                      )}
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
                              className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
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
                              className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
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
                              className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
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
                              className='block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white dark:placeholder:text-gray-200'
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
                    <Button
                      isLoading={isSubmitting || isSaving}
                      isDisabled={isSubmitting || isSaving}
                      loadingLabel='Saving Profile...'
                      label='Save Profile'
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  )
}
