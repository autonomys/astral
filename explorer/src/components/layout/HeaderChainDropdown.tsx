import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { FC, Fragment, useEffect, useMemo } from 'react'

// common
import { SubspaceSymbol } from '@/components/icons'
import { Chain, Chains } from 'constants/chains'
import { domains } from 'constants/domains'
import { Routes } from 'constants/routes'
import useDomains from 'hooks/useDomains'

export const HeaderChainDropdown: FC = () => {
  const { setSelectedChain, chains, selectedChain, selectedDomain } = useDomains()
  const { push } = useRouter()

  const handleChainChange = (chain: Chain) => {
    setSelectedChain(chain)
    push(`/${chain.urls.page}/${selectedDomain}`)
  }

  const filteredChains = useMemo(() => {
    if (
      process.env.NEXT_PUBLIC_SHOW_LOCALHOST &&
      process.env.NEXT_PUBLIC_SHOW_LOCALHOST === 'true'
    ) {
      return chains
    }
    return chains.filter((chain) => chain.urls.page !== Chains.localhost)
  }, [chains])

  useEffect(() => {
    if (selectedDomain === Routes.nova) {
      const novaChain = domains.find(
        (domain) => domain.urls.page === selectedChain.urls.page,
      ) as Chain

      setSelectedChain(novaChain)
    }

    if (selectedDomain === 'consensus') {
      setSelectedChain(selectedChain)
    }
  }, [setSelectedChain, selectedDomain, selectedChain])

  return (
    <Listbox value={selectedChain} onChange={handleChainChange}>
      <div className='relative'>
        <Listbox.Button className='relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left font-["Montserrat"] shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-[#1E254E] dark:text-white sm:text-sm'>
          <div className='flex items-center justify-center'>
            <SubspaceSymbol />
            <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
              {selectedChain.title}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='size-5 text-gray-400 ui-open:rotate-180 dark:text-[#DE67E4]'
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
          <Listbox.Options className='absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#1E254E] dark:text-white sm:text-sm md:w-full'>
            {filteredChains.map((chain, chainIdx) => (
              <Listbox.Option
                key={chainIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 pr-4 text-gray-900 dark:text-white md:pl-10 ${
                    active && 'bg-gray-100 dark:bg-[#2A345E]'
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
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
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
