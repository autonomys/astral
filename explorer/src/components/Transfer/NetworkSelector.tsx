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
      <div className='relative'>
        <Listbox.Button className='flex w-full items-center rounded-md border border-blueShade bg-blueLight px-3 py-2 pr-8 text-sm font-medium text-grayDarker dark:border-blueLight dark:bg-transparent'>
          <div className='flex w-full items-center overflow-hidden'>
            {selectedNetwork ? (
              <>
                <span className='flex-shrink-0 text-grayDark dark:text-white'>
                  <AutonomysSymbol />
                </span>
                <span className='ml-2 truncate text-sm dark:text-white'>
                  {selectedNetwork?.name}
                </span>
              </>
            ) : (
              <span className='text-grayDark dark:text-white'>Select Network</span>
            )}
          </div>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon
              className='size-5 text-gray-800 ui-open:rotate-180 dark:text-white'
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
          <Listbox.Options className='absolute right-0 z-50 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-2 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-blueAccent dark:text-white'>
            {networkList.map((network) => (
              <Listbox.Option
                key={`network-${network.id}`}
                className={({ active }) =>
                  `cursor-default select-none px-3 py-2 text-gray-900 dark:text-white ${
                    active ? 'bg-gray-100 dark:bg-blueDarkAccent' : ''
                  }`
                }
                value={network.name}
                onClick={() => setChainId(network.id)}
              >
                {({ selected }) => (
                  <div className={`flex items-center ${selected ? 'bg-grayLighter' : ''}`}>
                    <AutonomysSymbol />
                    <span className='ml-2 truncate text-sm'>{network.name}</span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
