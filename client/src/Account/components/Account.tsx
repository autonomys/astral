import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// account
import { QUERY_ACCOUNT_BY_ID } from 'Account/query'
import { AccountDetailsCard, AccountDetailsTabs } from 'Account/components'

// common
import { Spinner, ErrorFallback } from 'common/components'

// layout
import { NotFound } from 'layout/components'

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
