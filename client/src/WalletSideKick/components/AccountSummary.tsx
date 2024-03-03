import Identicon from '@polkadot/react-identicon'
import { FC } from 'react'
import { Link } from 'react-router-dom'

// common
import { Accordion } from 'common/components'
import { limitNumberDecimals, shortString } from 'common/helpers'
import type { Chain } from 'common/providers/ChainProvider'
import { INTERNAL_ROUTES } from 'common/routes'

// layout
import { DOMAINS_NAMES } from 'layout/constants'

// wallet sidekick
import { AccountBadge } from './AccountBadge'
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
  const { topFarmers, topOperators, topNominators } = useLeaderboard(subspaceAccount)
  const theme = selectedChain.isDomain ? 'ethereum' : 'beachball'

  return (
    <div className='p-5 m-2 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
      <Accordion
        title={
          <Link
            data-testid='wallet-link'
            className='hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              DOMAINS_NAMES.consensus,
              subspaceAccount,
            )}
          >
            <div className='flex items-center m-2'>
              <Identicon value={subspaceAccount} size={48} theme={theme} />
              <div className='relative'>
                <span className='hidden sm:block ml-2 truncate w-5 text-lg underline md:w-full text-[#241235] font-medium dark:text-white'>
                  {actingAccountName}
                </span>
                <span className='hidden sm:block ml-2 truncate w-5 text-lg underline md:w-full text-[#241235] font-medium dark:text-white'>
                  {shortString(subspaceAccount)}
                </span>
              </div>
            </div>
          </Link>
        }
      >
        {topFarmers > 0 && (
          <AccountBadge
            to={`../${selectedChain.urls.page}/${DOMAINS_NAMES.leaderboard}/${INTERNAL_ROUTES.leaderboard.farmers}`}
            label={`Top ${Math.ceil(topFarmers / 10) * 10} Farmer`}
          />
        )}
        {topOperators > 0 && (
          <AccountBadge
            to={`../${selectedChain.urls.page}/${DOMAINS_NAMES.leaderboard}/${INTERNAL_ROUTES.leaderboard.operators}`}
            label={`Top ${Math.ceil(topOperators / 10) * 10} Operator`}
          />
        )}
        {topFarmers > 0 && (
          <AccountBadge
            to={`../${selectedChain.urls.page}/${DOMAINS_NAMES.leaderboard}/${INTERNAL_ROUTES.leaderboard.nominators}`}
            label={`Top ${Math.ceil(topNominators / 10) * 10} Nominator`}
          />
        )}
        <div className='flex items-center m-2 pt-4'>
          <span className='text-[#241235] text-base font-medium dark:text-white'>
            Your Subspace Wallet Address
          </span>
        </div>
        <div className='flex items-center m-2'>
          {subspaceAccount && (
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full text-[#241235] font-medium dark:text-white'>
              {subspaceAccount}
            </span>
          )}
        </div>
        <div className='flex items-center m-2 pt-4'>
          <span className='text-[#241235] text-base font-medium dark:text-white'>
            Your Subspace Wallet Balance
          </span>
        </div>
        <div className='flex items-center m-2'>
          {limitNumberDecimals(walletBalance)} {tokenSymbol}
        </div>
      </Accordion>
    </div>
  )
}
