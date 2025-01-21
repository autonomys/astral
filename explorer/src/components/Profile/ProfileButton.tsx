import { INTERNAL_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { AvatarIcon } from '../icons/AvatarIcon'

export const ProfileButton: FC = () => {
  const { push } = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <button
      onClick={() => push(INTERNAL_ROUTES.profile.page)}
      className={`inline-flex items-center bg-white p-2 text-base hover:bg-gray-200 focus:outline-none ${
        isDesktop ? 'ml-4 rounded-full' : 'rounded-r-full'
      } shadow-md dark:bg-buttonLightTo md:mt-3`}
    >
      <AvatarIcon width='24' height='24' />
    </button>
  )
}
