'use client'

import { LogoIcon } from '@/components/icons'
import { Bars3BottomRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { useTheme } from 'providers/ThemeProvider'
import { FC, useState } from 'react'
import { HeaderChainDropdown } from './HeaderChainDropdown'
import { MobileHeader } from './MobileHeader'

export const StakeHeader: FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)
  const { selectedChain } = useDomains()

  return (
    <header className="body-font z-9 py-[30px] font-['Montserrat'] text-gray-600">
      {isDesktop ? (
        <div className='container mx-auto flex flex-col flex-wrap items-center justify-between py-5 md:flex-row md:px-[25px] 2xl:px-0'>
          <Link
            href={`/${selectedChain.urls.page}/${Routes.leaderboard}`}
            className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
          >
            <span className='text-xl text-[#282929] dark:text-white'>
              <LogoIcon fillColor='currentColor' />
            </span>
          </Link>
          <nav className='flex flex-wrap items-center justify-center gap-10 text-sm'></nav>
          <div className='flex justify-center'>
            <HeaderChainDropdown />
            <button
              onClick={toggleTheme}
              className='ml-4 inline-flex items-center rounded-full bg-[#241235] p-2 text-base hover:bg-gray-200 focus:outline-none dark:bg-[#FFFFFF]'
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
              className='items-center rounded-full bg-[#241235] p-3 text-white dark:bg-white dark:text-[#1E254E]'
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className='size-4' fill='currentColor' stroke='currentColor' />
            </button>
          </div>
          <MobileHeader menuList={[]} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  )
}
