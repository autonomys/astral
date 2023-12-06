import { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MoonIcon, Bars3BottomRightIcon, SunIcon } from '@heroicons/react/24/outline'

// layout
import { HeaderChainDropdown, MobileHeader } from 'layout/components'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import { LogoIcon } from 'common/icons'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { useTheme } from 'common/providers/ThemeProvider'
import useDomains from 'common/hooks/useDomains'

const LeaderBoardHeader: FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const pathName = location.pathname
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)
  const { selectedChain, selectedDomain } = useDomains()

  const menuList = [
    {
      title: 'Farmers Leaderboard',
      link: `${INTERNAL_ROUTES.leaderboard.farmers}`,
    },
    {
      title: 'Operators Leaderboard',
      link: `${INTERNAL_ROUTES.leaderboard.operators}`,
    },
    {
      title: 'Nominators Leaderboard',
      link: `${INTERNAL_ROUTES.leaderboard.nominators}`,
    },
  ]

  return (
    <header className="text-gray-600 body-font font-['Montserrat'] py-[30px] z-10">
      {isDesktop ? (
        <div className='container mx-auto flex flex-wrap justify-between py-5 md:px-[25px] 2xl:px-0 flex-col md:flex-row items-center'>
          <Link
            to={`/${selectedChain.urls.page}/${selectedDomain}`}
            className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
          >
            <span className='text-xl text-[#282929] dark:text-white'>
              <LogoIcon fillColor='currentColor' />
            </span>
          </Link>
          <nav className='flex flex-wrap gap-10 items-center text-sm justify-center'>
            {menuList.map((item, index) => {
              const isCurrentPath = pathName === `/${item.link}`
              return (
                <Link
                  key={index}
                  className={
                    isCurrentPath
                      ? 'leading-4 text-[13px] font-semibold text-white rounded-full px-5 py-3 block bg-[#241235] dark:bg-[#DE67E4]'
                      : 'leading-4 text-[13px] font-semibold text-[#282929] dark:text-white bg-none'
                  }
                  to={item.link}
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
              className='ml-4 inline-flex items-center dark:bg-[#FFFFFF] bg-[#241235] py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full'
            >
              {isDark ? (
                <SunIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='black'
                  stroke='black'
                  className='w-6 h-6'
                />
              ) : (
                <MoonIcon
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  fill='white'
                  stroke='white'
                  className='w-6 h-6'
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-row justify-between px-5 items-center'>
          <Link
            to={INTERNAL_ROUTES.home}
            className='flex title-font font-medium items-center text-gray-900 dark:text-white'
          >
            <LogoIcon fillColor='currentColor' />
          </Link>
          <div className='flex gap-4 items-center'>
            <HeaderChainDropdown />
            <button
              className='bg-[#241235] text-white p-3 items-center rounded-full dark:bg-white dark:text-[#1E254E]'
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className='w-4 h-4' fill='currentColor' stroke='currentColor' />
            </button>
          </div>
          <MobileHeader menuList={menuList} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  )
}

export default LeaderBoardHeader
