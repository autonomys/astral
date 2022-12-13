import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// account
import { QUERY_ACCOUNT_BY_ID } from 'Account/query'
import AccountDetailsCard from 'Account/components/AccountDetailsCard'
import AccountDetailsTabs from 'Account/components/AccountDetailsTabs'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'

// layout
import NotFound from 'layout/components/NotFound'

const Account: FC = () => {
  const { accountId } = useParams()

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_BY_ID, {
    variables: { accountId: accountId },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  if (!data.accountById) {
    return <NotFound />
  }

  const account = data.accountById

  return (
    <div className='w-full'>
      <AccountDetailsCard account={account} />
      <AccountDetailsTabs extrinsics={account.extrinsics} />
    </div>
  )
}

export default Account
