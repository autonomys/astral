import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// account
import { AccountTable } from 'Account/components'
import { QUERY_ACCOUNT_CONNECTION_LIST } from 'Account/query'

// common
import { SearchBar, Pagination, Spinner } from 'common/components'
import { numberWithCommas } from 'common/helpers'
import { PAGE_SIZE } from 'common/constants'
import ExportButton from 'common/components/ExportButton'

const AccountList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  const accountsConnection = data.accountsConnection.edges.map((account) => account.node)
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

  const onChange = (page: number) => {
    setCurrentPage(Number(page))

    const newCount = page > 0 ? PAGE_SIZE * Number(page + 1) : PAGE_SIZE
    const endCursor = newCount - PAGE_SIZE

    if (endCursor === 0 || endCursor < 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base font-medium dark:text-white'>{`Holders (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <AccountTable accounts={accountsConnection} page={currentPage} />
        <div className='w-full flex justify-between gap-2'>
          <ExportButton data={accountsConnection} filename='account-list' />
          <Pagination
            nextPage={handleNextPage}
            previousPage={handlePreviousPage}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            totalCount={totalCount}
            hasNextPage={pageInfo.hasNextPage}
            hasPreviousPage={pageInfo.hasPreviousPage}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountList
