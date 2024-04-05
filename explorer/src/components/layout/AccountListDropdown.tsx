'use client'

import { PolkadotIcon } from '@/components/icons/PolkadotIcon'
import { SubWalletIcon } from '@/components/icons/SubWalletIcon'
import { shortString } from '@/utils/string'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { SupportedWalletExtension } from 'constants/wallet'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import { Fragment, useCallback, useMemo } from 'react'
import { formatAddress } from 'utils//formatAddress'

function AccountListDropdown() {
  const { actingAccount, subspaceAccount, accounts, changeAccount, disconnectWallet } = useWallet()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const extensionIcon = useMemo(() => {
    if (!actingAccount) return null
    switch (actingAccount.source as SupportedWalletExtension) {
      case SupportedWalletExtension.PolkadotJs:
        return (
          <div className='size-5'>
            <PolkadotIcon />
          </div>
        )
      default:
        return (
          <div className='size-6'>
            <SubWalletIcon />
          </div>
        )
    }
  }, [actingAccount])

  const walletList = useMemo(
    () =>
      accounts
        ? accounts.map((account, chainIdx) => (
            <Listbox.Option
              key={chainIdx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pr-4 text-gray-900 dark:text-white md:pl-10 ${
                  active && 'bg-gray-100 dark:bg-[#2A345E]'
                }`
              }
              value={account}
            >
              {({ selected }) => {
                const subAccount = formatAddress(account.address)
                const formattedAccount = subAccount && shortString(subAccount)
                return (
                  <div className='px-2'>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {account.name}
                    </span>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {formattedAccount}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                        <CheckIcon className='hidden size-5 md:block' aria-hidden='true' />
                      </span>
                    ) : null}
                  </div>
                )
              }}
            </Listbox.Option>
          ))
        : null,
    [accounts],
  )

  const handleDisconnectWallet = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      disconnectWallet()
    },
    [disconnectWallet],
  )

  return (
    <Listbox value={actingAccount} onChange={changeAccount}>
      <div className='relative'>
        <Listbox.Button
          className={`relative w-full cursor-default font-["Montserrat"] ${
            isDesktop
              ? 'rounded-full from-[#EA71F9] to-[#4D397A] pr-10 dark:bg-gradient-to-r'
              : 'rounded-l-full pr-6 dark:bg-[#EA71F9]'
          } bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:text-white sm:text-sm`}
        >
          <div className='flex items-center justify-center'>
            {extensionIcon}
            <span className='ml-2 hidden w-5 truncate text-sm sm:block md:w-full '>
              {subspaceAccount && shortString(subspaceAccount)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className={`size-5 text-gray-400 ui-open:rotate-180${
                  isDesktop ? 'dark:text-[#DE67E4]' : 'dark:text-white'
                }`}
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
          <Listbox.Options className='absolute right-0 mt-1 max-h-80 w-auto overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#1E254E] dark:text-white sm:text-sm md:w-full'>
            {walletList}
            <button
              onClick={(e) => handleDisconnectWallet(e)}
              className='relative cursor-default select-none py-2 pr-8 text-gray-900 dark:bg-[#2A345E] dark:text-white md:pl-5'
            >
              <span className='block truncate px-2 font-normal'>Disconnect wallet</span>
            </button>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AccountListDropdown
