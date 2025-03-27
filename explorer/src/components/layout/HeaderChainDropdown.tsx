import { NetworkId } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { Indexer, indexers } from 'constants/indexers'
import useIndexers from 'hooks/useIndexers'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useCallback, useMemo } from 'react'

export const HeaderChainDropdown: FC = () => {
  const { indexerSet, section } = useIndexers()
  const { push } = useRouter()

  const handleChainChange = useCallback(
    (chain: Indexer) => {
      push(`/${chain.network}/${section}`)
    },
    [push, section],
  )

  const filteredChains = useMemo(() => {
    if (
      process.env.NEXT_PUBLIC_SHOW_LOCALHOST &&
      process.env.NEXT_PUBLIC_SHOW_LOCALHOST === 'true'
    ) {
      return indexers
    }
    return indexers.filter((indexer) => indexer.network !== NetworkId.LOCALHOST)
  }, [])

  return (
    <Listbox value={indexerSet} onChange={handleChainChange}>
      <div className='relative'>
        <Listbox.Button className='relative cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left font-["Montserrat"] shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-blueAccent dark:text-white sm:w-full sm:text-sm md:w-48 lg:w-48'>
          <div className='flex items-center justify-center'>
            <AutonomysSymbol />
            <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
              {indexerSet.title}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='size-5 text-gray-400 ui-open:rotate-180 dark:text-primaryAccent'
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
          <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
            {filteredChains.map((chain, chainIdx) => (
              <Listbox.Option
                key={chainIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 pr-4 text-gray-900 dark:text-white md:pl-10 ${
                    active && 'bg-gray-100 dark:bg-blueDarkAccent'
                  }`
                }
                value={chain}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {chain.title}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-greenBright'>
                        <CheckIcon className='hidden size-5 md:block' aria-hidden='true' />
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
