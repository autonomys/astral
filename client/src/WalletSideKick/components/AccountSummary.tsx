import Identicon from '@polkadot/react-identicon'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Accordion } from 'common/components'
import { limitNumberDecimals, shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'
import { useLeaderboard } from './Leaderboard'

interface AccountSummaryProps {
  subspaceAccount: string | undefined
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
  const { selectedChain } = useDomains()
  const { topFarmers, topOperators, topNominators } = useLeaderboard(subspaceAccount)
  const theme = selectedChain.isDomain ? 'ethereum' : 'beachball'

  return (
    <div className='p-5 m-2 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
      {subspaceAccount && (
        <Accordion
          title={
            <Link
              data-testid='wallet-link'
              className='hover:text-[#DE67E4]'
              to={INTERNAL_ROUTES.accounts.id.page(
                selectedChain.urls.page,
                'consensus',
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
            <Link
              data-testid='topFarmers-link'
              className='hover:text-[#DE67E4]'
              to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.farmers}`}
            >
              <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
                Top {Math.ceil(topFarmers / 10) * 10} Farmer
              </span>
            </Link>
          )}
          {topOperators > 0 && (
            <Link
              data-testid='topOperators-link'
              className='hover:text-[#DE67E4]'
              to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.operators}`}
            >
              <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
                Top {Math.ceil(topOperators / 10) * 10} Operator
              </span>
            </Link>
          )}
          {topNominators > 0 && (
            <Link
              data-testid='topNominators-link'
              className='hover:text-[#DE67E4]'
              to={`../${selectedChain.urls.page}/leaderboard/${INTERNAL_ROUTES.leaderboard.nominators}`}
            >
              <span className='bg-[#DE67E4] rounded-full p-2 text-[#241235] text-base font-medium dark:text-white'>
                Top {Math.ceil(topNominators / 10) * 10} Nominator
              </span>
            </Link>
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
      )}
    </div>
  )
}
