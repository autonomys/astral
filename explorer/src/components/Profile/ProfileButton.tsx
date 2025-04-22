import { INTERNAL_ROUTES } from 'constants/routes'
import { useIndexers } from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { useProfileStates } from 'states/profile'
import { cn } from 'utils/cn'
import { AvatarIcon } from '../icons/AvatarIcon'

export const ProfileButton: FC = () => {
  const { network } = useIndexers()
  const { push } = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const profile = useProfileStates((state) => state.profile)
  const shouldUpdate = useProfileStates((state) => state.shouldUpdate)
  const getUserProfile = useProfileStates((state) => state.getUserProfile)
  const { data: session } = useSession()

  useEffect(() => {
    if (session && session?.user?.subspace) {
      const { account, message, signature } = session.user.subspace
      getUserProfile(account, message, signature)
    }
  }, [getUserProfile, session, shouldUpdate])

  return (
    <button
      onClick={() => push(INTERNAL_ROUTES.profile.page(network))}
      className={cn(
        'inline-flex items-center bg-white p-0 text-base shadow-md hover:bg-gray-200 focus:outline-none dark:bg-buttonLightTo md:mt-3',
        isDesktop ? 'ml-4 rounded-full' : 'rounded-r-full',
      )}
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
