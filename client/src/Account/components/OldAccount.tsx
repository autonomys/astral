import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// account
import { OLD_QUERY_ACCOUNT_BY_ID } from 'Account/query'
import { OldAccountDetailsCard, OldAccountDetailsTabs } from 'Account/components'

// common
import { Spinner } from 'common/components'

// layout
import { NotFound } from 'layout/components'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { formatAddress } from 'common/helpers/formatAddress'

const OldAccount: FC = () => {
  const { accountId } = useParams<{ accountId?: string }>()

  const convertedAddress = formatAddress(accountId)

  const isDesktop = useMediaQuery('(min-width: 1440px)')

  const { data, error, loading } = useQuery(OLD_QUERY_ACCOUNT_BY_ID, {
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
    <div className='w-full'>
      <OldAccountDetailsCard account={account} accountAddress={convertedAddress} />
      <OldAccountDetailsTabs extrinsics={account.extrinsics} isDesktop={isDesktop} />
    </div>
  )
}

export default OldAccount
