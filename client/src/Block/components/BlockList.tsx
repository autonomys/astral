import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// block
import { BlockTable } from 'Block/components'
import { QUERY_BLOCK_LIST_CONNECTION } from 'Block/query'

// common
import { Pagination, Spinner, SearchBar } from 'common/components'
import { numberWithCommas } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'
import ExportButton from 'common/components/ExportButton'

const BlockList: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const PAGE_SIZE = isDesktop ? 10 : 5

  const { data, error, loading } = useQuery(QUERY_BLOCK_LIST_CONNECTION, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  const blocksConnection = data.blocksConnection.edges.map((block) => block.node)
  const totalCount = data.blocksConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.blocksConnection.pageInfo

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
        <div className='text-[#282929] text-base font-medium dark:text-white'>{`Blocks (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <BlockTable blocks={blocksConnection} isDesktop={isDesktop} />
        <div className='w-full flex justify-between'>
          <ExportButton data={blocksConnection} filename='block-list' />
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

export default BlockList
