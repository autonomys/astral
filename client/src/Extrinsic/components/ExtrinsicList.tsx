import { useState, FC } from 'react'
import { useQuery } from '@apollo/client'

// ExtrinsicList
import ExtrinsicTable from 'Extrinsic/components/ExtrinsicTable'
import { QUERY_EXTRINSIC_LIST } from 'Extrinsic/query'

// common
import TableLoadingSkeleton from 'common/components/TableLoadingSkeleton'
import ErrorFallback from 'common/components/ErrorFallback'

const ExtrinsicList: FC = () => {
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 10
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_LIST, {
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
  })

  if (loading) {
    return <TableLoadingSkeleton withPagination />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  const nextPage = () => setPage((prev) => prev + 1)
  const previousPage = () => setPage((prev) => prev - 1)

  return (
    <ExtrinsicTable
      extrinsics={data.extrinsics}
      nextPage={nextPage}
      page={page}
      previousPage={previousPage}
    />
  )
}

export default ExtrinsicList
