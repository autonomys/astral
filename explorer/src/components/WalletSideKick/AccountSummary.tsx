import { shortString } from '@/utils/string'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { Tooltip } from 'components/common/Tooltip'
import type { Chain } from 'constants/chains'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { AccountPreferenceSection } from 'constants/wallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { limitNumberDecimals } from 'utils/number'
import { AccountIcon } from '../common/AccountIcon'
import { AccountBadge } from './AccountBadge'
import { AccountPreferencesModal } from './AccountPreferencesModal'
import { useLeaderboard } from './Leaderboard'

interface AccountSummaryProps {
  subspaceAccount: string
  selectedChain: Chain
  actingAccountName: string | undefined
  walletBalance: number
  tokenSymbol: string
}

export const AccountSummary: FC<AccountSummaryProps> = ({
  subspaceAccount,
  selectedChain,
  actingAccountName = '',
  walletBalance,
  tokenSymbol,
}) => {
  const { ref, inView } = useInView()
  const { topFarmers, topOperators, topNominators, setIsVisible } = useLeaderboard(subspaceAccount)
  const theme = useMemo(() => (selectedChain.isDomain ? 'ethereum' : 'beachball'), [selectedChain])
  const [preference, setPreference] = useState<AccountPreferenceSection>(
    AccountPreferenceSection.None,
  )
  const [preferenceIsOpen, setPreferenceIsOpen] = useState(false)

  const onClose = useCallback(() => setPreferenceIsOpen(false), [])

  const onClick = useCallback((section: AccountPreferenceSection) => {
    setPreference(section)
    setPreferenceIsOpen(true)
  }, [])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='m-2 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <Link
            data-testid='wallet-link'
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              Routes.consensus,
              subspaceAccount,
            )}
          >
            <div className='m-2 flex items-center'>
              <AccountIcon address={subspaceAccount} theme={theme} />
              <div className='relative'>
                <span className='ml-2 hidden w-5 truncate text-lg font-medium text-grayDarker underline dark:text-white sm:block md:w-full'>
                  {actingAccountName}
                </span>
                <span className='ml-2 hidden w-5 truncate text-lg font-medium text-grayDarker underline dark:text-white sm:block md:w-full'>
                  {shortString(subspaceAccount)}
                </span>
              </div>
            </div>
          </Link>
        }
      >
        <div ref={ref}>
          {topFarmers > 0 && (
            <AccountBadge
              to={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.farmers}`}
              label={`Top ${Math.ceil(topFarmers / 10) * 10} Farmer`}
            />
          )}
          {topOperators > 0 && (
            <AccountBadge
              to={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.operators}`}
              label={`Top ${Math.ceil(topOperators / 10) * 10} Operator`}
            />
          )}
          {topFarmers > 0 && (
            <AccountBadge
              to={`/${selectedChain.urls.page}/${Routes.leaderboard}/${INTERNAL_ROUTES.leaderboard.nominators}`}
              label={`Top ${Math.ceil(topNominators / 10) * 10} Nominator`}
            />
          )}
        </div>
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
              className='m-2 flex cursor-default items-center justify-center rounded-full bg-purpleAccent p-2'
            >
              <BookOpenIcon className='w-8 text-white' />
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
