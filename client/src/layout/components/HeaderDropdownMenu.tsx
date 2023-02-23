import { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// common
import { INTERNAL_ROUTES } from 'common/routes'

const HeaderDropdownMenu: FC = () => {
  return (
    <Popover className='relative'>
      <Popover.Button className='flex font-["Montserrat"] justify-center items-center text-[#282929] text-sm font-semibold dark:text-white'>
        Blockchain
        <ChevronDownIcon className='ml-1 ui-open:rotate-180 ui-open:transform w-5 h-5' />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute'>
          <div className='flex flex-col bg-white dark:bg-[#1E254E] w-44 rounded-md p-6 z-50 shadow-md'>
            <Link
              to={INTERNAL_ROUTES.accounts.list}
              className='text-[#282929] dark:text-white font-medium border-b py-1 border-b-[#E4ECF3]'
            >
              Accounts
            </Link>
            <Link
              to={INTERNAL_ROUTES.blocks.list}
              className='text-[#282929] dark:text-white font-medium border-b py-1 border-b-[#E4ECF3]'
            >
              Blocks
            </Link>
            <Link
              to={INTERNAL_ROUTES.extrinsics.list}
              className='text-[#282929] dark:text-white font-medium border-b py-1 border-b-[#E4ECF3]'
            >
              Extrinsics
            </Link>
            <Link
              to={INTERNAL_ROUTES.events.list}
              className='text-[#282929] font-medium border-b py-1 border-b-[#E4ECF3] dark:text-white'
            >
              Events
            </Link>
            <Link to={INTERNAL_ROUTES.logs.list} className='text-[#282929] dark:text-white font-medium py-1'>
              Logs
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default HeaderDropdownMenu
