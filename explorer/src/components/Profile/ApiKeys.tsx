'use client'

import { useProfileStates } from '@/states/profile'
import { sendGAEvent } from '@next/third-parties/google'
import { Field, Form, Formik } from 'formik'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { CopyButton } from '../common/CopyButton'
import { WalletButton } from '../WalletButton'
import AccountListDropdown from '../WalletButton/AccountListDropdown'
import SmallProfileBox from './SmallProfileBox'

export const ApiKeysPage: FC = () => {
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const profile = useProfileStates((state) => state.profile)
  const apiKeys = useProfileStates((state) => state.apiKeys)
  const setShouldUpdate = useProfileStates((state) => state.setShouldUpdate)

  // State to manage API keys
  const [newKeyDescription, setNewKeyDescription] = useState('')
  const [newApiKey, setNewApiKey] = useState('')
  // Function to create a new API key with error handling
  const createApiKey = useCallback(
    async (_values: typeof initialValues) => {
      console.log('values', _values)
      if (!injector || !actingAccount || !subspaceAccount) return

      const values = {
        ..._values,
        subspaceAccount,
        profileId: profile.id,
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

        const response = await fetch('/api/profile/save-api-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values, message, signature: signature.signature }),
        })

        if (!response.ok) throw new Error('Failed to create API key')

        const responseData = await response.json()
        setNewApiKey(responseData.key)
        setNewKeyDescription(responseData.description)
        setShouldUpdate(true)
      } catch (error) {
        console.error('Error creating API key:', error)
      }
    },
    [injector, actingAccount, subspaceAccount, profile.id, setShouldUpdate],
  )

  // Function to delete an API key
  const deleteApiKey = async (apiKeyId: string) => {
    if (!injector || !actingAccount || !subspaceAccount) return

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
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  useEffect(() => {
    sendGAEvent('event', 'visit_profile_page', { value: 'index' })
  }, [])

  // Define the initial form values
  const initialValues = {
    description: '',
  }

  // Define a validation schema (basic example)
  const profileValidationSchema = Yup.object().shape({
    description: Yup.string().required('Api key description is required'),
  })

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
      <SmallProfileBox />
      <div className='m-0 w-full flex-1 rounded-[20px] bg-white dark:border-none dark:bg-boxDark'>
        <div className='m-10'>
          <Formik
            initialValues={initialValues}
            validationSchema={profileValidationSchema}
            onSubmit={createApiKey}
          >
            {({ errors, touched }) => (
              <Form className='w-full space-y-4 text-grayDarker dark:text-white'>
                <div className='text-2xl font-bold'>API Keys</div>

                <div className='mb-4'>
                  <label htmlFor='new-key-description'>Create a API Key</label>
                  <Field
                    type='text'
                    name='description'
                    placeholder='Enter description for new API key'
                    className='mt-2 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                  />
                  {errors.description && touched.description && (
                    <div className='text-red-500'>{errors.description}</div>
                  )}
                </div>

                <button
                  type='submit'
                  className='mb-4 block rounded-full bg-primaryAccent px-5 py-3 text-[13px] font-semibold leading-4 text-white'
                >
                  Create Key
                </button>

                {newApiKey && (
                  <div className='mb-4 mt-4'>
                    <CopyButton value={newApiKey} message='API Key Copied'>
                      <label htmlFor='new-key-description'>New API Key</label>
                    </CopyButton>
                    <input
                      type='text'
                      id='new-key-description'
                      value={newApiKey}
                      readOnly
                      className='mt-2 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                    />
                    <input
                      type='text'
                      id='new-key-description'
                      value={newKeyDescription}
                      readOnly
                      className='mt-2 block w-full rounded-full bg-white from-primaryAccent to-blueUndertone px-4 py-[10px] text-sm text-gray-900 shadow-lg dark:bg-gradient-to-r dark:text-white'
                    />
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <table className='mb-4 w-full'>
            <thead>
              <tr className='font-bold'>
                <th className='text-left'>Description</th>
                <th className='text-left'>Key</th>
                <th className='text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.length === 0 ? (
                <tr>
                  <td colSpan={3} className='text-center text-gray-500'>
                    No API keys. Create a new key to get started.
                  </td>
                </tr>
              ) : (
                apiKeys.map((key) => (
                  <tr key={key.id} className='mb-4'>
                    <td className='flex-1'>{key.description}</td>
                    <td className='flex-1'>{key.key}</td>
                    <td className='flex-1'>
                      <button
                        type='button'
                        onClick={() => deleteApiKey(key.id)}
                        className='mt-2 block rounded-full bg-red-500 px-5 py-2 text-[13px] font-semibold leading-4 text-white'
                      >
                        Delete API Key
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
  )
}
