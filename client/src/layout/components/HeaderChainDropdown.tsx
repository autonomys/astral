import { Fragment, useState, FC } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

// common/icons
import { SubspaceSymbol } from 'common/icons'

// TODO: implement switching between Gemini-II and Gemini-III
const chains = [
  { id: 1, name: 'Gemini II', unavailable: false },
  { id: 2, name: 'Gemini III', unavailable: false },
]

const HeaderChainDropdown: FC = () => {
  const [selected, setSelected] = useState(chains[0])
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative'>
        <Listbox.Button className='font-["Montserrat"] relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-[#1E254E] dark:text-white'>
          <div className='flex items-center justify-center'>
            <SubspaceSymbol />
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full '>
              {selected.name}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform dark:text-[#DE67E4]'
                aria-hidden='true'
              />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-auto md:w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white'>
            {chains.map((chain, chainIdx) => (
              <Listbox.Option
                key={chainIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 text-gray-900 md:pl-10 pr-4 dark:text-white ${
                    active && 'bg-gray-100'
                  }`
                }
                value={chain}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {chain.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                        <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default HeaderChainDropdown
