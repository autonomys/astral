'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { LogoIcon } from 'components/icons/LogoIcon'
import useIndexers from 'hooks/useIndexers'
import { useRouter } from 'next/navigation'
import { useTheme } from 'providers/ThemeProvider'
import { FC, ReactNode } from 'react'
import { currentYear } from 'utils/time'
import { HeaderBackground } from './HeaderBackground'

type MenuItem = {
  title: string
  link: string
}

type Props = {
  children?: ReactNode
  isOpen: boolean
  setIsOpen: (update: boolean | ((prevState: boolean) => boolean)) => void
  menuList: MenuItem[]
}

export const MobileHeader: FC<Props> = ({ isOpen, setIsOpen, menuList }) => (
  <Drawer menuList={menuList} isOpen={isOpen} setIsOpen={setIsOpen} />
)

const Drawer: FC<Props> = ({ children, menuList, isOpen, setIsOpen }) => {
  const { push } = useRouter()
  const { isDark, toggleTheme } = useTheme()
  const { network, section } = useIndexers()

  const handleNavigate = (url: string) => {
    setIsOpen(false)
    push(url)
  }

  return (
    <nav
      className={
        ' fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out ' +
        (isOpen
          ? ' translate-x-0 opacity-100 transition-opacity duration-500  '
          : ' translate-x-full opacity-0 transition-all delay-500  ')
      }
    >
      <section
        className={
          'delay-400 absolute right-0 -z-10 h-full w-screen max-w-lg transform bg-light shadow-xl transition-all duration-500 ease-in-out dark:bg-dark' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <HeaderBackground />
        <article className='relative flex h-full w-screen max-w-lg flex-col gap-10 space-y-6 overflow-y-scroll pb-10'>
          <div className='flex items-center justify-between p-5 align-middle'>
            <button
              onClick={() => handleNavigate(`/${network}/${section}`)}
              className='title-font flex items-center font-medium  text-gray-900 dark:text-white'
            >
              <LogoIcon fillColor='currentColor' />
            </button>
            <div className='flex items-center gap-3'>
              <button
                onClick={toggleTheme}
                className='items-center rounded-full bg-buttonLightFrom p-2 hover:bg-gray-200 focus:outline-none dark:bg-white'
              >
                {isDark ? (
                  <SunIcon
                    viewBox='0 0 20 20'
                    strokeWidth={1}
                    fill='black'
                    stroke='black'
                    className='size-6'
                  />
                ) : (
                  <MoonIcon
                    viewBox='0 0 20 20'
                    strokeWidth={1}
                    fill='white'
                    stroke='white'
                    className='size-6'
                  />
                )}
              </button>
              <button
                className='items-center rounded-full bg-white px-4 py-2 dark:bg-blueAccent dark:text-white'
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-12'>
            {menuList.map((item, index) => {
              return (
                <button
                  onClick={() => handleNavigate(item.link)}
                  className='title-font flex items-center text-xl font-medium text-grayDark dark:text-white'
                  key={`${item.title}-${index}`}
                >
                  {item.title}
                </button>
              )
            })}
          </div>
          {children}
          <div className='flex'>
            <div className='flex flex-col flex-wrap justify-items-end pb-1 pl-5 pt-10 sm:hidden sm:flex-row'>
              <p className='text-gray text-center text-sm sm:text-left'>
                © {currentYear()} Autonomys Network, Inc. All Rights Reserved
              </p>
            </div>
          </div>
        </article>
      </section>
    </nav>
  )
}
