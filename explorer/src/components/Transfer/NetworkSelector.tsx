import { networks } from '@autonomys/auto-utils'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { SwapDirection } from 'constants/transaction'
import useIndexers from 'hooks/useIndexers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, Fragment, useCallback, useMemo } from 'react'

interface NetworkSelectorProps {
  direction: SwapDirection
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({ direction }) => {
  const { network } = useIndexers()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const consensusNetwork = useMemo(() => networks.find((n) => n.id === network), [network])
  const domains = useMemo(() => consensusNetwork?.domains, [consensusNetwork])
  const chainId = searchParams.get(direction.toLowerCase())

  const networkList = useMemo(() => {
    if (!consensusNetwork) return []
    const list = [{ id: 'consensus', name: 'Consensus' }]
    if (domains) domains.forEach((d) => list.push({ id: 'domainId' + d.domainId, name: d.name }))
    return list
  }, [consensusNetwork, domains])

  const selectedNetwork = useMemo(
    () => networkList.find((n) => n.id === chainId),
    [networkList, chainId],
  )

  const setChainId = useCallback(
    (chainId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(direction.toLowerCase(), chainId)
      router.push(`${pathname}?${params.toString()}`)
    },
    [direction, pathname, router, searchParams],
  )

  if (!networkList) return null

  return (
    <Listbox value={selectedNetwork}>
      <div className='relative mt-2'>
        <Listbox.Button
          className={
            'relative mt-4 flex items-center rounded-full border-2 border-grayDark px-2 py-2 text-sm font-medium text-grayDarker dark:border-blueLight'
          }
          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <>
            {selectedNetwork ? (
              <>
                <span className='text-grayDark dark:text-white'>
                  <AutonomysSymbol />
                </span>
                <span className='ml-2 hidden w-5 truncate pr-6 text-sm dark:text-white sm:block md:w-full'>
                  {selectedNetwork?.name}
                </span>
              </>
            ) : (
              <span className='pr-6 text-grayDark dark:text-white'>Select Network</span>
            )}
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 dark:text-white'>
              <ChevronDownIcon
                className='size-5 text-gray-400 ui-open:rotate-180'
                aria-hidden='true'
              />
            </span>
          </>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute right-0 top-9 z-50 mt-1 max-h-40 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white sm:text-sm md:w-full'>
            {networkList.map((network) => (
              <Listbox.Option
                key={`domain-book-saved-${network.id}-label-${network.name}`}
                className={({ active }) =>
                  `relative z-50 cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white ${
                    active && 'bg-gray-100 dark:bg-blueDarkAccent'
                  }`
                }
                value={network.name}
                onClick={() => setChainId(network.id)}
              >
                {({ selected }) => {
                  return (
                    <div className={`px-2 ${selected ? 'bg-grayLighter' : 'bg-transparent'}`}>
                      <div className='flex items-center'>
                        <AutonomysSymbol />
                        <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full'>
                          {network.name}
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
