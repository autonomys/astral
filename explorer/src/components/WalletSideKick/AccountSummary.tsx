import { shortString } from '@autonomys/auto-utils'
import { BookOpenIcon, WrenchIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { Tooltip } from 'components/common/Tooltip'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { AccountPreferenceSection } from 'constants/wallet'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC, useCallback, useState } from 'react'
import { usePreferencesStates } from 'states/preferences'
import { limitNumberDecimals } from 'utils/number'
import { AccountIcon } from '../common/AccountIcon'
import { AccountPreferencesModal } from './AccountPreferencesModal'

interface AccountSummaryProps {
  subspaceAccount: string
  actingAccountName: string | undefined
  walletBalance: number
  tokenSymbol: string
}

export const AccountSummary: FC<AccountSummaryProps> = ({
  subspaceAccount,
  actingAccountName = '',
  walletBalance,
  tokenSymbol,
}) => {
  const { network } = useIndexers()
  const { enableDevMode } = usePreferencesStates()
  const [preference, setPreference] = useState<AccountPreferenceSection>(
    AccountPreferenceSection.None,
  )
  const [preferenceIsOpen, setPreferenceIsOpen] = useState(false)

  const onClose = useCallback(() => setPreferenceIsOpen(false), [])

  const onClick = useCallback((section: AccountPreferenceSection) => {
    setPreference(section)
    setPreferenceIsOpen(true)
  }, [])

  return (
    <div className='m-2 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <Link
            data-testid='wallet-link'
            className='hover:text-primaryAccent'
            href={INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, subspaceAccount)}
          >
            <div className='m-2 flex items-center'>
              <AccountIcon address={subspaceAccount} theme={'beachball'} />
              <div className='relative'>
                <span className='ml-2 hidden w-5 truncate text-lg font-medium text-grayDarker underline dark:text-white sm:block md:w-full'>
                  {actingAccountName}{' '}
                  {enableDevMode && (
                    <span className='bg-blueLighterAccent ml-2 rounded-full p-2 text-white'>
                      <code>[Dev Mode]</code>
                    </span>
                  )}
                </span>
                <span className='ml-2 hidden w-5 truncate text-lg font-medium text-grayDarker underline dark:text-white sm:block md:w-full'>
                  {shortString(subspaceAccount)}
                </span>
              </div>
            </div>
          </Link>
        }
      >
        <div className='m-2 flex items-center pt-4'>
          <span className='text-base font-medium text-grayDarker dark:text-white'>
            Your Subspace Wallet Address
          </span>
        </div>
        <div className='m-2 flex items-center'>
          {subspaceAccount && (
            <span className='ml-2 hidden w-5 truncate text-sm font-medium text-grayDarker dark:text-white sm:block md:w-full'>
              {subspaceAccount}
            </span>
          )}
        </div>
        <div className='m-2 flex items-center pt-4'>
          <span className='text-base font-medium text-grayDarker dark:text-white'>
            Your Subspace Wallet Balance
          </span>
        </div>
        <div className='m-2 flex items-center'>
          {limitNumberDecimals(walletBalance)} {tokenSymbol}
        </div>
        <div className='flex items-center justify-center gap-3'>
          <Tooltip text='Address book'>
            <button
              onClick={() => onClick(AccountPreferenceSection.AddressBook)}
              className='m-2 flex cursor-default items-center justify-center rounded-full bg-primaryAccent p-2'
            >
              <BookOpenIcon className='w-8 text-white' />
            </button>
          </Tooltip>
          <Tooltip text='Account settings'>
            <button
              onClick={() => onClick(AccountPreferenceSection.Settings)}
              className='m-2 flex cursor-default items-center justify-center rounded-full bg-primaryAccent p-2'
            >
              <WrenchIcon className='w-8 text-white' />
            </button>
          </Tooltip>
        </div>
        <AccountPreferencesModal
          isOpen={preferenceIsOpen}
          preference={preference}
          onClose={onClose}
        />
      </Accordion>
    </div>
  )
}
