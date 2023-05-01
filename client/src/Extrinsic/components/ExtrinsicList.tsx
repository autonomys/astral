import { useState, FC } from 'react'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'
import { ExtrinsicWhereInput } from 'gql/graphql'

// extrinsic
import { ExtrinsicTable } from 'Extrinsic/components'
import ExtrinsicListFilter from './ExtrinsicListFilter'
import { QUERY_EXTRINSIC_LIST_CONNECTION } from 'Extrinsic/query'

// common
import { Pagination, SearchBar, Spinner } from 'common/components'
import { numberWithCommas } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'
import ExportButton from 'common/components/ExportButton'

const ExtrinsicList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<ExtrinsicWhereInput>({})
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_LIST_CONNECTION, {
    variables: { first: PAGE_SIZE, after: lastCursor, where: filters },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  const extrinsicsConnection = data.extrinsicsConnection.edges.map((extrinsic) => extrinsic.node)
  const totalCount = data.extrinsicsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.extrinsicsConnection.pageInfo

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

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <ExtrinsicListFilter
          title={
            <div className=' font-medium text-[#282929] dark:text-white'>
              Extrinsics {totalLabel}
            </div>
          }
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className='w-full flex flex-col mt-8 sm:mt-0'>
        <ExtrinsicTable extrinsics={extrinsicsConnection} isDesktop={isDesktop} />
        <div className='w-full flex justify-between'>
          <ExportButton data={extrinsicsConnection} filename='extrinsic-list' />
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
    </div>
  )
}

export default ExtrinsicList
