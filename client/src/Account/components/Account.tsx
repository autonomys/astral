import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// account
import { QUERY_ACCOUNT_BY_ID, QUERY_LATEST_REWARDS } from 'Account/query'
import {
  AccountDetailsCard,
  AccountExtrinsicList,
  AccountGraphs,
  AccountLatestRewards,
} from 'Account/components'

// layout
import { NotFound } from 'layout/components'

// common
import { Spinner } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { accountIdToHex, formatAddress } from 'common/helpers/formatAddress'

const Account: FC = () => {
  const { accountId } = useParams<{ accountId?: string }>()

  const convertedAddress = formatAddress(accountId)
  const hexAddress = accountIdToHex(accountId || '')

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_BY_ID, {
    variables: { accountId: convertedAddress },
  })

  const {
    data: dataRewards,
    error: errorRewards,
    loading: loadingRewards,
  } = useQuery(QUERY_LATEST_REWARDS, {
    variables: { accountId: hexAddress },
  })

  useErrorHandler(error)
  useErrorHandler(errorRewards)

  if (!convertedAddress) {
    return <NotFound />
  }

  if (loading || loadingRewards) {
    return <Spinner />
  }

  if (!data.accountById || !dataRewards.rewardEvents) {
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
        <AccountGraphs hexAddress={hexAddress} account={account} isDesktop={isDesktop} />
        <AccountLatestRewards rewards={dataRewards.rewardEvents} isDesktop={isDesktop} />
      </div>
      <AccountExtrinsicList accountId={convertedAddress} />
    </div>
  )
}

export default Account
