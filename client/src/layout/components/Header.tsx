import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MoonIcon } from '@heroicons/react/24/outline'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import LogoIcon from 'common/icons/LogoIcon'
import HeaderDropdownMenu from './HeaderDropdownMenu'
import HeaderChainDropdown from './HeaderChainDropdown'

const Header: FC = () => {
  const location = useLocation()
  const pathName = location.pathname

  const isHomeActive = pathName === '/'
  return (
    <header className="text-gray-600 body-font font-['Montserrat'] py-[30px] mx-[50px] z-10">
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
        <div className='flex'>
          <HeaderChainDropdown />
          <button className='ml-4 inline-flex items-center bg-[#241235] py-2 px-2 focus:outline-none hover:bg-gray-200 text-base rounded-full'>
            <MoonIcon
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              fill='white'
              stroke='white'
              className='w-6 h-6'
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
