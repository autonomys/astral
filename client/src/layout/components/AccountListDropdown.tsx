import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useCallback, useMemo } from 'react'

// common
import { shortString } from 'common/helpers'
import { formatAddress } from 'common/helpers/formatAddress'
import useMediaQuery from 'common/hooks/useMediaQuery'
import useWallet from 'common/hooks/useWallet'
import PolkadotIcon from 'common/icons/PolkadotIcon'
import SubWalletIcon from 'common/icons/SubWalletIcon'

function AccountListDropdown() {
  const { actingAccount, subspaceAccount, accounts, changeAccount, disconnectWallet } = useWallet()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const extensionIcon = useMemo(() => {
    if (!actingAccount) return null
    switch (actingAccount.source) {
      case 'polkadot-js':
        return (
          <div className='h-5 w-5'>
            <PolkadotIcon />
          </div>
        )
      default:
        return (
          <div className='h-6 w-6'>
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
                `relative cursor-default select-none py-2 text-gray-900 md:pl-10 pr-4 dark:text-white ${
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
                        <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
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
          className={`font-["Montserrat"] relative w-full cursor-default ${
            isDesktop
              ? 'pr-10 rounded-full dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A]'
              : 'pr-6 rounded-l-full dark:bg-[#EA71F9]'
          } bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-white`}
        >
          <div className='flex items-center justify-center'>
            {extensionIcon}
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full '>
              {subspaceAccount && shortString(subspaceAccount)}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform ${
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
          <Listbox.Options className='absolute mt-1 max-h-80 w-auto md:w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white right-0'>
            {walletList}
            <button
              onClick={(e) => handleDisconnectWallet(e)}
              className='relative cursor-default select-none py-2 text-gray-900 md:pl-5 pr-8 dark:text-white dark:bg-[#2A345E]'
            >
              <span className='block truncate font-normal px-2'>Disconnect wallet</span>
            </button>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AccountListDropdown
