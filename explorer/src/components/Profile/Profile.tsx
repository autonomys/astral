'use client'

import { useProfileStates } from '@/states/profile'
import { sendGAEvent } from '@next/third-parties/google'
import { Field, Form, Formik } from 'formik'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect } from 'react'
import * as Yup from 'yup'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import SmallProfileBox from './SmallProfileBox'

export const ProfilePage: FC = () => {
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const profile = useProfileStates((state) => state.profile)
  const setShouldUpdate = useProfileStates((state) => state.setShouldUpdate)

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  // Define a validation schema (basic example)
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

  // Form submission handler
  const handleProfileSubmit = useCallback(
    async (values: typeof profile) => {
      if (!injector || !actingAccount || !subspaceAccount) return

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

        if (!response.ok) throw new Error('Failed to save profile')
        setShouldUpdate(true)
      } catch (error) {
        console.error('Error saving profile:', error)
      }
    },
    [injector, actingAccount, subspaceAccount, setShouldUpdate],
  )

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
    <div className='flex min-h-screen w-full flex-col p-4 sm:flex-row sm:space-x-8'>
      <SmallProfileBox showPrivateDetails />

      {/* Right Side: Existing Form */}
      <div className='m-0 w-full flex-1 rounded-[20px] bg-white dark:border-none dark:bg-boxDark'>
        <div className='m-10'>
          <Formik
            enableReinitialize={true}
            initialValues={profile}
            validationSchema={profileValidationSchema}
            onSubmit={handleProfileSubmit}
          >
            {({ errors, touched }) => (
              <Form className='w-full space-y-4 text-grayDarker dark:text-white'>
                <div className='text-2xl font-bold'>Public Info</div>
                {/* Public Info Fields */}
                <div>
                  <label htmlFor='name'>Name</label>
                  <Field
                    name='name'
                    placeholder='Your name'
                    defaultValue={profile.name}
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.name && touched.name && <div className='text-red-500'>{errors.name}</div>}
                </div>

                <div>
                  <label htmlFor='description'>Description</label>
                  <Field
                    name='description'
                    as='textarea'
                    placeholder='A short bio or description'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.description && touched.description && (
                    <div className='text-red-500'>{errors.description}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='avatar'>Avatar URL</label>
                  <Field
                    name='avatar'
                    placeholder='https://...'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.avatar && touched.avatar && (
                    <div className='text-red-500'>{errors.avatar}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='banner'>Banner URL</label>
                  <Field
                    name='banner'
                    placeholder='https://...'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.banner && touched.banner && (
                    <div className='text-red-500'>{errors.banner}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='website'>Website</label>
                  <Field
                    name='website'
                    placeholder='https://...'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.website && touched.website && (
                    <div className='text-red-500'>{errors.website}</div>
                  )}
                </div>

                <div className='text-2xl font-bold'>Private Info</div>
                {/* Private Info Fields */}
                <div>
                  <label htmlFor='email'>Email</label>
                  <Field
                    name='email'
                    placeholder='you@example.com'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.email && touched.email && (
                    <div className='text-red-500'>{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='discord'>Discord</label>
                  <Field
                    name='discord'
                    placeholder='Your Discord handle'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.discord && touched.discord && (
                    <div className='text-red-500'>{errors.discord}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='github'>GitHub</label>
                  <Field
                    name='github'
                    placeholder='Your GitHub profile'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.github && touched.github && (
                    <div className='text-red-500'>{errors.github}</div>
                  )}
                </div>

                <div>
                  <label htmlFor='twitter'>Twitter</label>
                  <Field
                    name='twitter'
                    placeholder='@handle'
                    className='mt-4 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.twitter && touched.twitter && (
                    <div className='text-red-500'>{errors.twitter}</div>
                  )}
                </div>

                <button
                  type='submit'
                  className='block rounded-full bg-grayDarker px-5 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent'
                >
                  Save Profile
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
