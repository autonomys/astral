import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

// account
import AccountTable from 'Account/components/AccountTable'
import { QUERY_ACCOUNT_CONNECTION_LIST } from 'Account/query'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'
import SearchBar from 'common/components/SearchBar'
import Pagination from 'common/components/Pagination'
import { numberWithCommas } from 'common/helpers'

const AccountList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  const accountsConnection = data.accountsConnection.edges.map((extrinsic) => extrinsic.node)
  const totalCount = data.accountsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.accountsConnection.pageInfo

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
    const endCursor = PAGE_SIZE * Number(page)
    setLastCursor(endCursor.toString())
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base'>{`Holders (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <AccountTable accounts={accountsConnection} />
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

export default AccountList
