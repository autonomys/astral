import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// account
import { QUERY_ACCOUNT_BY_ID, QUERY_ACCOUNT_BY_ID_EVM } from 'Account/query'
import {
  AccountDetailsCard,
  AccountExtrinsicList,
  AccountGraphs,
  AccountRewardsHistory,
} from 'Account/components'

// layout
import { NotFound } from 'layout/components'

// common
import { Spinner } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { formatAddress } from 'common/helpers/formatAddress'
import useDomains from 'common/hooks/useDomains'

const Account: FC = () => {
  const { accountId } = useParams<{ accountId?: string }>()

  const { selectedChain } = useDomains()

  const convertedAddress = selectedChain.isDomain ? accountId : formatAddress(accountId)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const AccountQuery = selectedChain.isDomain ? QUERY_ACCOUNT_BY_ID_EVM : QUERY_ACCOUNT_BY_ID

  const { data, error, loading } = useQuery(AccountQuery, {
    variables: { accountId: convertedAddress },
  })

  useErrorHandler(error)

  if (!convertedAddress) {
    return <NotFound />
  }

  if (loading) {
    return <Spinner />
  }

  if (!data.accountById) {
    return <NotFound />
  }

  const account = data.accountById

  return (
    <div className='w-full flex flex-col space-y-4'>
      <AccountDetailsCard
        account={account}
        accountAddress={convertedAddress}
        isDesktop={isDesktop}
      />
      <div className='flex flex-col lg:flex-row lg:justify-between gap-8'>
        <AccountGraphs account={account} isDesktop={isDesktop} />
        <AccountRewardsHistory account={account} isDesktop={isDesktop} rewards={data.rewardEvents} />
      </div>
      <AccountExtrinsicList accountId={convertedAddress} />
    </div>
  )
}

export default Account
