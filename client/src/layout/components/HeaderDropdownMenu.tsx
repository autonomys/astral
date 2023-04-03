import { Fragment, FC } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

// common
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

const HeaderDropdownMenu: FC = () => {
  const { selectedChain } = useDomains()

  const navigate = useNavigate()

  const menuList = [
    {
      title: 'Accounts',
      link: `${selectedChain.urls.page}/${INTERNAL_ROUTES.accounts.list}`,
    },
    {
      title: 'Blocks',
      link: `${selectedChain.urls.page}/${INTERNAL_ROUTES.blocks.list}`,
    },
    {
      title: 'Extrinsics',
      link: `${selectedChain.urls.page}/${INTERNAL_ROUTES.extrinsics.list}`,
    },
    {
      title: 'Events',
      link: `${selectedChain.urls.page}/${INTERNAL_ROUTES.events.list}`,
    },
    {
      title: 'Logs',
      link: `${selectedChain.urls.page}/${INTERNAL_ROUTES.logs.list}`,
    },
  ]

  const handleNavigate = (link: string) => {
    navigate(link)
  }

  return (
    <Listbox>
      <div className='relative'>
        <Listbox.Button className='font-["Montserrat"] relative w-full cursor-default py-2 pl-3 pr-8 text-left sm:text-sm dark:text-white'>
          <div className='flex items-center justify-center font-semibold'>
            <span className='hidden sm:block truncate w-5 md:w-full text-[#282929] text-sm font-semibold dark:text-white '>
              Blockchain
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon className='ui-open:rotate-180 ui-open:transform w-5 h-5' />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute rounded-md mt-1 max-h-60 md:w-44 divide-y px-4  bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white'>
            {menuList.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 text-gray-900 justify-items-start dark:text-white ${
                    active && 'bg-gray-100 dark:bg-[#2A345E]'
                  }`
                }
                value={item}
              >
                <button
                  className='w-full flex justify-start'
                  onClick={() => handleNavigate(item.link)}
                >
                  {item.title}
                </button>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default HeaderDropdownMenu
