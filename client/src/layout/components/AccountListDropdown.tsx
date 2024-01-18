import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

// common
import { WalletAccount } from '@subwallet/wallet-connect/types'
import { shortString } from 'common/helpers'
import { formatAddress } from 'common/helpers/formatAddress'
import useWallet from 'common/hooks/useWallet'
import PolkadotIcon from 'common/icons/PolkadotIcon'
import SubWalletIcon from 'common/icons/SubWalletIcon'

function AccountListDropdown() {
  const { actingAccount, subspaceAccount, accounts, changeAccount, disconnectWallet } = useWallet()

  const handleAccountChange = (account: WalletAccount) => {
    changeAccount(account)
  }

  const handleDisconnectWallet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    disconnectWallet()
  }

  const source = actingAccount?.source

  return (
    <Listbox value={actingAccount} onChange={handleAccountChange}>
      <div className='relative'>
        <Listbox.Button className='font-["Montserrat"] relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white'>
          <div className='flex items-center justify-center'>
            {source === 'polkadot-js' ? (
              <div className='h-5 w-5'>
                <PolkadotIcon />
              </div>
            ) : (
              <div className='h-6 w-6'>
                <SubWalletIcon />
              </div>
            )}
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full '>
              {subspaceAccount && shortString(subspaceAccount)}
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
            {accounts?.map((account, chainIdx) => (
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
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {formattedAccount}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#37D058]'>
                          <CheckIcon className='h-5 w-5 hidden md:block' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )
                }}
              </Listbox.Option>
            ))}
            <button
              onClick={(e) => handleDisconnectWallet(e)}
              className='relative cursor-default select-none py-2 text-gray-900 md:pl-5 pr-8 dark:text-white dark:bg-[#2A345E]'
            >
              <span className='block truncate font-normal'>Disconnect wallet</span>
            </button>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AccountListDropdown
