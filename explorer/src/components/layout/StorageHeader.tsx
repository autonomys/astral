'use client'

import { getSupportedHeaderLinks } from '@/utils/route'
import { Bars3BottomRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { LogoIcon } from 'components/icons/LogoIcon'
import { Routes } from 'constants/routes'
import useIndexers from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'providers/ThemeProvider'
import { FC, useMemo, useState } from 'react'
import { HeaderChainDropdown } from './HeaderChainDropdown'
import { MobileHeader } from './MobileHeader'
import StorageBanner from './StorageBanner'

export const StorageHeader: FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)
  const { network, section } = useIndexers()

  const menuList = useMemo(() => getSupportedHeaderLinks(network, Routes.storage), [network])

  const showBanner = useMemo(() => {
    const regex = /^\/(taurus|mainnet)\/permanent-storage(\/(files|folders)?)?$/
    return regex.test(pathname)
  }, [pathname])

  return (
    <header className={`body-font z-9 text-gray-600 ${isDesktop ? 'py-5' : 'py-2'}`}>
      {isDesktop ? (
        <div>
          <div className='container mx-auto flex flex-col flex-wrap items-center justify-between py-2 md:flex-row md:px-[25px] 2xl:px-0'>
            <Link
              href={`/${network}/${section}`}
              className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
            >
              <span className='text-xl text-grayDark dark:text-white'>
                <LogoIcon fillColor='currentColor' />
              </span>
            </Link>
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
          {showBanner && <StorageBanner />}
          <nav className='flex flex-wrap items-center justify-center gap-10 py-5 text-sm'>
            {menuList.map((item, index) => {
              const isCurrentPath = pathname.includes(item.link)
              const isInitialPath = pathname === `/${network}/permanent-storage` && index === 0

              return (
                <Link
                  key={index}
                  className={
                    isCurrentPath || isInitialPath
                      ? 'block rounded-lg bg-buttonLightFrom px-5 py-2 text-[13px] font-semibold leading-4 text-white dark:bg-primaryAccent'
                      : 'bg-none text-[13px] font-semibold leading-4 text-grayDark dark:text-white'
                  }
                  href={item.link}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      ) : (
        <>
          <div className='flex flex-row items-center justify-between px-5 py-2'>
            <Link
              href={`/${network}/${section}`}
              className='title-font flex items-center font-medium text-gray-900 dark:text-white'
            >
              <LogoIcon fillColor='currentColor' />
            </Link>
            <div className='flex items-center gap-4'>
              <HeaderChainDropdown />
              <button
                className='items-center rounded-lg bg-buttonLightFrom p-3 text-white dark:bg-white dark:text-blueAccent'
                onClick={() => setIsOpen(true)}
              >
                <Bars3BottomRightIcon
                  className='size-4'
                  fill='currentColor'
                  stroke='currentColor'
                />
              </button>
            </div>
            <MobileHeader menuList={menuList} isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          {showBanner && <StorageBanner />}
        </>
      )}
    </header>
  )
}
