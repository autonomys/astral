import { useSession } from 'next-auth/react'
import { FC, useCallback, useEffect } from 'react'
import { useProfileStates } from 'states/profile'

interface SmallProfileBoxProps {
  showPrivateDetails?: boolean
}

export const SmallProfileBox: FC<SmallProfileBoxProps> = ({ showPrivateDetails }) => {
  const { data: session } = useSession()

  const profile = useProfileStates((state) => state.profile)
  const shouldUpdate = useProfileStates((state) => state.shouldUpdate)
  const setUser = useProfileStates((state) => state.setUser)

  const defaultAvatar = '/images/avatar.svg'
  const defaultBanner = '/images/autonomys-banner.webp'

  const handleLoadProfile = useCallback(async () => {
    if (!session || !session.user?.subspace) return

    try {
      const { account, message, signature } = session.user.subspace
      const response = await fetch('/api/profile/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, message, signature }),
      })
      if (!response.ok) throw new Error('Failed to load profile')

      const responseData = await response.json()
      if (responseData.message === 'Profile not found') return
      setUser(responseData.profile, responseData.wallets, responseData.apiKeys)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }, [session, setUser])

  useEffect(() => {
    if (session && session.user?.subspace) handleLoadProfile()
  }, [handleLoadProfile, session])

  useEffect(() => {
    if (shouldUpdate) handleLoadProfile()
  }, [shouldUpdate, handleLoadProfile])

  return (
    <div className='flex flex-col space-y-4 text-grayDarker dark:text-white sm:w-1/3'>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile?.banner || defaultBanner}
          alt='Profile Banner'
          className='h-32 w-full rounded-2xl object-cover'
        />
      </div>
      <div className='rounded-[20px] bg-white p-4 dark:border-none dark:bg-boxDark'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile?.avatar || defaultAvatar}
          alt='Profile Icon'
          className='mb-4 h-24 w-24 rounded-full object-cover'
        />
        <h2 className='text-xl font-bold'>{profile?.name}</h2>
        <p className='text-sm text-gray-600 dark:text-gray-300'>{profile?.description}</p>
        <div className='mt-2'>
          <span className='font-semibold'>Website: </span>
          <a
            href={profile?.website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline'
          >
            {profile?.website}
          </a>
        </div>
      </div>

      {showPrivateDetails && (
        <div className='rounded-[20px] bg-white p-4 dark:border-none dark:bg-boxDark'>
          <h3 className='text-lg font-bold'>Private Details</h3>
          <p>
            <span className='font-semibold'>Email: </span>
            {profile?.email}
          </p>
          <p>
            <span className='font-semibold'>Discord: </span>
            {profile?.discord}
          </p>
          <p>
            <span className='font-semibold'>GitHub: </span>
            {profile?.github}
          </p>
          <p>
            <span className='font-semibold'>Twitter: </span>
            {profile?.twitter}
          </p>
        </div>
      )}
    </div>
  )
}
