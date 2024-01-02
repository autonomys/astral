import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useQuery } from '@apollo/client'
import { OperatorOrderByInput } from 'gql/graphql'

// common
import { Pagination, SearchBar, Spinner } from 'common/components'
import { PAGE_SIZE } from 'common/constants'
import { numberWithCommas } from 'common/helpers'
import ExportButton from 'common/components/ExportButton'

// operator
import { QUERY_OPERATOR_CONNECTION_LIST } from 'Operator/query'
import OperatorsTable from 'Operator/components/OperatorsTable'
import OperatorsOrderByDropdown from './OperatorsOrderByDropdown'

const OperatorsList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const [orderBy, setOrderBy] = useState<OperatorOrderByInput[]>([OperatorOrderByInput.IdAsc])

  const { data, error, loading } = useQuery(QUERY_OPERATOR_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor, orderBy: orderBy },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  const operatorsConnection = data.operatorsConnection.edges.map((operator) => operator.node)
  const totalCount = data.operatorsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.operatorsConnection.pageInfo

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
        <div className='text-[#282929] text-base font-medium dark:text-white'>{`Operators (${totalLabel})`}</div>
        <div className='flex gap-4 items-center'>
          <div className='text-[#282929] text-base font-medium dark:text-white'>Order By</div>
          <OperatorsOrderByDropdown setOrderBy={setOrderBy} orderBy={orderBy} />
        </div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <OperatorsTable operators={operatorsConnection} />
        <div className='w-full flex justify-between gap-2'>
          <ExportButton data={operatorsConnection} filename='operator-list' />
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

export default OperatorsList
