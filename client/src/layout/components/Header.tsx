import { FC } from 'react'
import { Link } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'

const Header: FC = () => {
  return (
    <header className="text-gray-600 body-font shadow-md shadow-slate-100">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 "
          to={INTERNAL_ROUTES.home}
        >
          <span className="ml-3 text-xl">SUBSPACE</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            className="mr-5 hover:text-gray-900"
            to={INTERNAL_ROUTES.blocks.list}
          >
            Blocks
          </Link>
          <Link
            className="mr-5 hover:text-gray-900"
            to={INTERNAL_ROUTES.extrinsics.list}
          >
            Extrinsic
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
