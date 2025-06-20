'use client'

import { getSupportedHeaderLinks } from '@/utils/route'
import {
  Bars3BottomRightIcon,
  ExclamationTriangleIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { LogoIcon } from 'components/icons/LogoIcon'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import useIndexers from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'providers/ThemeProvider'
import { useMemo, useState } from 'react'
import { useProfileStates } from 'states/profile'
import { HeaderChainDropdown } from './HeaderChainDropdown'
import { MobileHeader } from './MobileHeader'

export const ProfileHeader = () => {
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)
  const { network } = useIndexers()
  const { profile } = useProfileStates((state) => state)

  const menuList = useMemo(() => {
    if (!profile) return []
    return getSupportedHeaderLinks(network, Routes.profile)
  }, [network, profile])

  const isProfilePublic = useMemo(() => {
    return profile && !profile.id
  }, [profile])

  return (
    <header className={`body-font z-9 text-gray-600 ${isDesktop ? 'py-5' : 'py-2'}`}>
      {isDesktop ? (
        <div className='container mx-auto flex flex-col flex-wrap items-center justify-between py-5 md:flex-row md:px-[25px] 2xl:px-0'>
          <Link
            href={`/${network}/${Routes.profile}`}
            className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
          >
            <span className='text-xl text-grayDark dark:text-white'>
              <LogoIcon fillColor='currentColor' />
            </span>
          </Link>
          <nav className='flex flex-wrap items-center justify-center gap-10 text-sm'>
            {!menuList.length && (
              <div className='flex items-start gap-2 rounded-md bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'>
                <ExclamationTriangleIcon className='my-auto mt-0.5 h-5 w-5 flex-shrink-0' />
                <p className='my-auto text-sm'>
                  Info: Please complete your profile information to access all features.
                </p>
              </div>
            )}
            {!isProfilePublic &&
              menuList.map((item, index) => {
                const isCurrentPath = pathname.includes(item.link) && index !== 0
                const isInitialPath = pathname === `/${network}/operators` && index === 0

                return (
                  <Link
                    key={index}
                    className={
                      isCurrentPath || isInitialPath
                        ? 'block rounded-full bg-buttonLightFrom px-5 py-3 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent'
                        : 'bg-none text-[13px] font-semibold leading-4 text-grayDark dark:text-white'
                    }
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                )
              })}
          </nav>
          <div className='flex justify-center'>
            <HeaderChainDropdown />
            <button
              onClick={toggleTheme}
              className='ml-4 inline-flex items-center rounded-full bg-buttonLightFrom p-2 text-base hover:bg-gray-200 focus:outline-none dark:bg-white'
            >
              {isDark ? (
                <SunIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='black'
                  stroke='black'
                  className='size-6'
                />
              ) : (
                <MoonIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='white'
                  stroke='white'
                  className='size-6'
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-row items-center justify-between px-5'>
          <Link
            href={INTERNAL_ROUTES.home}
            className='title-font flex items-center font-medium text-gray-900 dark:text-white'
          >
            <LogoIcon fillColor='currentColor' />
          </Link>
          <div className='flex items-center gap-4'>
            <HeaderChainDropdown />
            <button
              className='items-center rounded-full bg-grayDarker p-3 text-white dark:bg-white dark:text-blueAccent'
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className='size-4' fill='currentColor' stroke='currentColor' />
            </button>
          </div>
          <MobileHeader menuList={menuList} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  )
}
