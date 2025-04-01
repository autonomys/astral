import { INTERNAL_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useProfileStates } from '@/states/profile'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { AvatarIcon } from '../icons/AvatarIcon'
export const ProfileButton: FC = () => {
  const { push } = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { profile, getUserProfile } = useProfileStates((state) => state)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.subspace) {
      const { account, message, signature } = session.user.subspace
      getUserProfile(account, message, signature)
    }
  }, [getUserProfile, session])

  return (
    <button
      onClick={() => push(INTERNAL_ROUTES.profile.page)}
      className={`inline-flex items-center bg-white p-0 text-base hover:bg-gray-200 focus:outline-none ${
        isDesktop ? 'ml-4 rounded-full' : 'rounded-r-full'
      } shadow-md dark:bg-buttonLightTo md:mt-3`}
    >
      {profile?.avatar ? (
        <Image src={profile.avatar} alt='Profile' width={40} height={40} className='rounded-full' />
      ) : (
        <div className='flex h-10 w-10 items-center justify-center rounded-full'>
          <AvatarIcon width='24' height='24' />
        </div>
      )}
    </button>
  )
}
