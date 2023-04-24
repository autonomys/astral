import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { useQuery } from '@apollo/client'

// account
import { QUERY_REWARDS_LIST } from 'Account/query'
import { AccountDetailsCard, AccountRewardTable } from 'Account/components'

// common
import { Pagination, Spinner } from 'common/components'
import { numberWithCommas } from 'common/helpers'
import { PAGE_SIZE } from 'common/constants'
import { accountIdToHex, formatAddress } from 'common/helpers/formatAddress'

const AccountRewardList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)

  const { accountId } = useParams<{ accountId?: string }>()
  const hexAccount = accountIdToHex(accountId || '')

  const { data, error, loading } = useQuery(QUERY_REWARDS_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor, accountId: hexAccount },
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  const rewards = data.rewardEventsConnection.edges.map((reward) => reward.node)
  const totalCount = data.rewardEventsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.rewardEventsConnection.pageInfo

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handleGetPage = (page: string | number) => {
    setCurrentPage(Number(page))
    const newCount = PAGE_SIZE * Number(page)
    const endCursor = newCount - PAGE_SIZE
    if (endCursor === 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }

  const account = rewards[0].account
  const convertedAddress = formatAddress(account.id) || ''

  return (
    <div className='w-full flex flex-col align-middle'>
      <AccountDetailsCard account={account} accountAddress={convertedAddress} />

      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base font-medium dark:text-white'>{`Rewards (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <AccountRewardTable rewards={rewards} />
        <Pagination
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          handleGetPage={handleGetPage}
        />
      </div>
    </div>
  )
}

export default AccountRewardList
