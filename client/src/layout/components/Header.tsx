import { FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MoonIcon, Bars3BottomRightIcon } from '@heroicons/react/24/outline'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import { LogoIcon } from 'common/icons'
import useMediaQuery from 'common/hooks/useMediaQuery'

// layout
import { HeaderDropdownMenu, HeaderChainDropdown, MobileHeader } from 'layout/components'

const Header: FC = () => {
  const location = useLocation()
  const pathName = location.pathname
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)

  const isHomeActive = pathName === '/'
  return (
    <header className="text-gray-600 body-font font-['Montserrat'] py-[30px] mx-5 md:mx-[50px] z-10">
      {isDesktop ? (
        <div className='container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center'>
          <Link
            to={INTERNAL_ROUTES.home}
            className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
          >
            <span className='text-xl'>
              <LogoIcon fillColor='#282929' />
            </span>
          </Link>
          <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'>
            <Link
              to={INTERNAL_ROUTES.home}
              className={
                isHomeActive
                  ? 'text-white font-semibold mr-5 text-xs px-5 py-3 rounded-full block bg-[#241235] '
                  : 'text-[#282929] font-semibold mr-5 hover:text-gray-900'
              }
            >
              Home
            </Link>
            <HeaderDropdownMenu />
          </nav>
          <div className='flex justify-center'>
            <HeaderChainDropdown />
            <button className='ml-4 inline-flex items-center bg-[#241235] py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full'>
              <MoonIcon
                viewBox='0 0 24 24'
                strokeWidth={1}
                fill='white'
                stroke='white'
                className='w-6 h-6'
              />
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-row justify-between items-center'>
          <Link
            to={INTERNAL_ROUTES.home}
            className='flex title-font font-medium items-center text-gray-900'
          >
            <LogoIcon fillColor='#282929' />
          </Link>
          <div className='flex gap-4 items-center'>
            <HeaderChainDropdown />
            <button
              className='bg-[#241235] text-white p-3 items-center rounded-full'
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className='w-4 h-4' fill='white' stroke='white' />
            </button>
          </div>
          <MobileHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  )
}

export default Header
