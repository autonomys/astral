'use client'

import { cn } from '@/utils/cn'
import {
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { SocialLink } from 'components/common/SocialLink'
import { FaDiscord, FaGithub, FaXTwitter, MdEmail } from 'components/icons'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Profile } from 'states/profile'
import { Spinner } from '../common/Spinner'

const ComponentLoader = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex h-[200px] items-center justify-center rounded-lg bg-white shadow-sm dark:bg-boxDark',
      className,
    )}
  >
    <div className='flex flex-col items-center justify-center gap-2'>
      <Spinner />
    </div>
  </div>
)

export const PublicProfile: FC = () => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/public-profile?id=${profileId}`)
        const data = await response.json()

        if (data.profile) {
          setProfile(data.profile)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (profileId) {
      fetchProfile()
    }
  }, [profileId])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Address copied to clipboard', {
      duration: 2000,
      position: 'top-center',
    })
  }

  if (isLoading) {
    return (
      <div className='w-full space-y-6 p-6'>
        <ComponentLoader className='h-[400px]' />
        <div className='grid gap-6 sm:grid-cols-2'>
          <ComponentLoader />
          <ComponentLoader />
        </div>
        <ComponentLoader className='h-[300px]' />
        <ComponentLoader className='h-[300px]' />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center gap-2 rounded-lg bg-white shadow-sm dark:bg-boxDark'>
        <ExclamationTriangleIcon className='h-10 w-10 text-gray-500 dark:text-gray-400' />
        <p className='text-lg text-gray-500 dark:text-gray-400'>Profile not found</p>
      </div>
    )
  }

  return (
    <div className='w-full p-6'>
      <div className='overflow-hidden rounded-lg bg-white shadow-sm dark:bg-boxDark'>
        <div className='relative h-48'>
          <div className='relative h-full w-full overflow-hidden'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile?.banner || '/images/autonomys-banner.webp'}
              alt='Profile Banner'
              className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
            />
          </div>

          <div className='absolute -bottom-12 left-6 h-24 w-24 overflow-hidden rounded-lg border-4 border-white shadow-lg transition-transform duration-500 hover:scale-105 dark:border-boxDark'>
            <div className='relative h-full w-full'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile?.avatar || '/images/avatar.svg'}
                alt='Profile Avatar'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>

        <div className='px-6 pb-6 pt-14'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>{profile.name}</h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>{profile.bio}</p>
          </div>

          {profile.website && (
            <SocialLink
              icon={<GlobeAltIcon className='h-4 w-4 text-gray-700 dark:text-gray-300' />}
              value={profile.website}
              url={profile.website}
              iconBgClass='bg-emerald-50 dark:bg-emerald-900/30'
            />
          )}
        </div>
      </div>

      <div className='mt-6 grid gap-6 sm:grid-cols-2'>
        <div className='rounded-lg bg-white p-6 shadow-sm dark:bg-boxDark'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>Social Links</h2>
          <div className='space-y-4'>
            {!profile.github && !profile.twitter && !profile.discord && (
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                No social links
              </p>
            )}

            {profile.github && (
              <SocialLink
                icon={<FaGithub className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                value={profile.github}
                url={`https://github.com/${profile.github}`}
              />
            )}

            {profile.twitter && (
              <SocialLink
                icon={<FaXTwitter className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                value={profile.twitter}
                url={`https://twitter.com/${profile.twitter.replace('@', '')}`}
              />
            )}

            {profile.discord && (
              <SocialLink
                icon={<FaDiscord className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                value={profile.discord}
                url={`https://discord.com/users/${profile.discord}`}
              />
            )}
          </div>
        </div>

        <div className='rounded-lg bg-white p-6 shadow-sm dark:bg-boxDark'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
            Contact Information
          </h2>
          <div className='space-y-4'>
            {!profile.email && (
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                No contact information
              </p>
            )}

            {profile.email && (
              <SocialLink
                icon={<MdEmail className='h-5 w-5 text-gray-700 dark:text-gray-300' />}
                value={profile.email}
                url={`mailto:${profile.email}`}
                isExternal={false}
              />
            )}
          </div>
        </div>
      </div>

      {profile.wallets && profile.wallets.length > 0 && (
        <div className='mt-6 rounded-lg bg-white p-6 shadow-sm dark:bg-boxDark'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
            Connected Wallets
          </h2>
          <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
            <table className='w-full table-auto'>
              <thead className='bg-gray-50 dark:bg-gray-800'>
                <tr>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Type
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {profile.wallets.map((wallet) => (
                  <tr key={wallet.id} className='bg-white dark:bg-boxDark'>
                    <td className='whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white'>
                      <span className='inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200'>
                        {wallet.type}
                      </span>
                    </td>
                    <td className='whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                      {wallet.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {profile.tags && profile.tags.length > 0 && (
        <div className='mt-6 rounded-lg bg-white p-6 shadow-sm dark:bg-boxDark'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>Tags</h2>
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
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {profile.tags.map((tag) => (
                  <tr key={tag.id} className='bg-white dark:bg-boxDark'>
                    <td className='px-4 py-3 text-sm text-gray-700 dark:text-gray-300'>
                      <div className='flex max-w-[300px] items-center gap-2 truncate'>
                        <span className='truncate'>{tag.value}</span>
                        <button
                          onClick={() => copyToClipboard(tag.value)}
                          className='flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
                          aria-label='Copy address'
                        >
                          <DocumentDuplicateIcon className='h-5 w-5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
