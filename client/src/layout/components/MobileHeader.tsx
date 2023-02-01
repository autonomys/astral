import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'

// common
import { LogoIcon } from 'common/icons'
import { INTERNAL_ROUTES } from 'common/routes'

// layout
import { HeaderBackground } from 'layout/components'

// hooks
import useTheme from 'common/hooks/useTheme'

type Props = {
  children?: ReactNode
  isOpen: boolean
  setIsOpen: (update: boolean | ((prevState: boolean) => boolean)) => void
}

const MobileHeader: FC<Props> = ({ isOpen, setIsOpen }) => {
  return <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
}

export default MobileHeader

const Drawer: FC<Props> = ({ children, isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const [isDark, toggleTheme] = useTheme()

  const handleNavigate = (url: string) => {
    setIsOpen(false)
    navigate(url)
  }
  return (
    <nav
      className={
        ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          ' w-screen max-w-lg right-0 absolute bg-light dark:bg-dark h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <HeaderBackground />
        <article className='relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full gap-10'>
          <div className='flex items-center align-middle justify-between p-5'>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.home)}
              className='flex title-font font-medium items-center text-gray-900 text-[#282929] dark:text-white'
            >
              <LogoIcon fillColor='currentColor' />
            </button>
            <div className='flex gap-3 items-center'>
              <button
                onClick={toggleTheme}
                className='items-center bg-[#241235] p-2 focus:outline-none hover:bg-gray-200 rounded-full dark:bg-[#FFFFFF]'
              >
                {isDark ? (
                  <SunIcon
                    viewBox='0 0 20 20'
                    strokeWidth={1}
                    fill='black'
                    stroke='black'
                    className='w-6 h-6'
                  />
                ) : (
                  <MoonIcon
                    viewBox='0 0 20 20'
                    strokeWidth={1}
                    fill='white'
                    stroke='white'
                    className='w-6 h-6'
                  />
                )}
              </button>
              <button
                className='bg-white px-4 py-2 items-center rounded-full dark:bg-[#1E254E] dark:text-white'
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-12'>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.home)}
              className='flex title-font font-medium items-center text-[#282929] dark:text-white text-xl'
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.blocks.list)}
              className='flex title-font font-medium items-center text-[#282929] dark:text-white text-xl'
            >
              Blocks
            </button>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.extrinsics.list)}
              className='flex title-font font-medium items-center text-[#282929] dark:text-white text-xl'
            >
              Extrinsics
            </button>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.accounts.list)}
              className='flex title-font font-medium items-center text-[#282929] dark:text-white text-xl'
            >
              Accounts
            </button>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.events.list)}
              className='flex title-font font-medium items-center text-[#282929] dark:text-white text-xl'
            >
              Events
            </button>
            <button
              onClick={() => handleNavigate(INTERNAL_ROUTES.logs.list)}
              className='flex title-font font-medium items-center text-[#282929] dark:text-white text-xl'
            >
              Logs
            </button>
          </div>
          {children}
          <div className='flex'>
            <div className='justify-items-end pt-10 pb-1 pl-5 flex flex-wrap sm:hidden flex-col sm:flex-row'>
              <p className='text-gray text-sm text-center sm:text-left'>
                © {dayjs().year()} Subspace Labs, Inc. All Rights Reserved
              </p>
            </div>
          </div>
        </article>
      </section>
    </nav>
  )
}
