// file: explorer/src/components/Swap/NetworkSelector.tsx

import { networks } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NetworkSource } from 'constants/transaction'
import { FC, Fragment, useMemo } from 'react'
import { AutonomysSymbol } from '../icons'

interface NetworkSelectorProps {
  options: string[]
  selectedOption: string
  onChange: (value: string) => void
}

export const NetworkSelector2: FC<{
  isOpen: boolean
  setOpen: (value: boolean) => void
  setNetwork: (value: NetworkSource) => void
  setDomainId: (value: string) => void
}> = ({ isOpen, setOpen, setNetwork, setDomainId }) => {
  const network = useMemo(() => networks[0], [])

  if (!network) return null

  return (
    <Listbox value={network['domains']}>
      <div className='relative'>
        <Listbox.Button
          className={
            'relative mt-6 flex items-center rounded-full border-2 border-grayDark px-2 text-sm font-medium text-grayDarker dark:border-purpleDeepAccent dark:bg-purplePastel'
          }
          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => setOpen(!isOpen)}
        >
          <AutonomysSymbol />
          <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
            {network.name}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon
              className='size-5 text-gray-400 ui-open:rotate-180 dark:text-purpleAccent'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-40 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
            <Listbox.Option
              key={`domain-book-saved-${network.id}-label-${network.name}`}
              className={({ active }) =>
                `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                  active && 'bg-gray-100 dark:bg-blueDarkAccent'
                }`
              }
              value={network.id}
              onClick={() => {
                setNetwork(NetworkSource.CONSENSUS)
                setDomainId('')
              }}
            >
              {({ selected }) => {
                return (
                  <div className={`px-2 ${selected ? 'bg-grayLighter' : 'bg-transparent'}`}>
                    <div className='flex items-center'>
                      <AutonomysSymbol width='18' height='18' />
                      <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
                        {network.name}
                      </span>
                    </div>
                  </div>
                )
              }}
            </Listbox.Option>
            {network['domains'] &&
              network['domains'].map((domain, index) => (
                <Listbox.Option
                  key={`network-source-${index}`}
                  className={({ active }) =>
                    `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                      active && 'bg-gray-100 dark:bg-blueDarkAccent'
                    }`
                  }
                  value={domain.id}
                  onClick={() => {
                    setNetwork(NetworkSource.DOMAIN)
                    setDomainId(domain.id)
                  }}
                >
                  {({ selected }) => {
                    return (
                      <div className={`px-2 ${selected ? 'bg-grayLighter' : 'bg-transparent'}`}>
                        <div className='flex items-center'>
                          <AutonomysSymbol width='18' height='18' />
                          <span className='ml-1 rounded-full bg-grayDarker px-1 text-xs font-medium text-white dark:bg-purpleAccent md:space-x-6 md:text-xs'>
                            Domain
                          </span>
                          <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
                            {domain.name}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div className='flex items-center space-x-2 rounded-xl border border-grayLight p-4'>
      {/* <img src='/path-to-network-icon.png' alt='Network Icon' className='h-6 w-6' /> */}
      <select
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        className='w-full bg-transparent text-grayDark focus:outline-none'
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      {/* <img src='/path-to-dropdown-icon.png' alt='Dropdown Icon' className='h-4 w-4' /> */}
    </div>
  )
}
