/* eslint-disable camelcase */
import { useState, FC } from 'react'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'
import { ExtrinsicWhereInput } from 'gql/graphql'

// account
import { AccountExtrinsicTable } from 'Account/components'

// common
import { Pagination } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { QUERY_ACCOUNT_EXTRINSICS } from 'Account/query'
import SimpleSpinner from 'common/components/SimpleSpinner'

type Props = {
  accountId: string
}

const ExtrinsicList: FC<Props> = ({ accountId }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [filters, setFilters] = useState<ExtrinsicWhereInput>({})

  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery(QUERY_ACCOUNT_EXTRINSICS, {
    variables: {
      first: PAGE_SIZE,
      after: lastCursor,
      where: {
        ...filters,
        signer: {
          id_eq: accountId,
        },
      },
    },
  })

  useErrorHandler(error)

  if (loading) {
    return <SimpleSpinner />
  }

  const extrinsicsConnection = data.extrinsicsConnection.edges.map((extrinsic) => extrinsic.node)
  const totalCount = data.extrinsicsConnection.totalCount

  const pageInfo = data.extrinsicsConnection.pageInfo
  const hasExtrinsics = extrinsicsConnection.length > 0

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
    <div className='w-full flex flex-col align-middle mt-5'>
      <div className='w-full flex flex-col mt-5 sm:mt-0 bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] rounded-[20px] p-5'>
        <AccountExtrinsicTable
          filters={filters}
          setFilters={setFilters}
          extrinsics={extrinsicsConnection}
          isDesktop={isDesktop}
        />
        {hasExtrinsics && (
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
        )}
      </div>
    </div>
  )
}

export default ExtrinsicList
