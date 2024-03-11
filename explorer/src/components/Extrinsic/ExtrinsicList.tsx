'use client'

import { useQuery } from '@apollo/client'
import { Extrinsic, ExtrinsicWhereInput, ExtrinsicsConnectionQuery } from 'gql/graphql'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

// extrinsic
import { ExtrinsicListFilter } from './ExtrinsicListFilter'
import { ExtrinsicTable } from './ExtrinsicTable'
import { QUERY_EXTRINSIC_LIST_CONNECTION } from './query'

// common
import { numberWithCommas } from '@/utils/number'
import { ExportButton } from 'components/common/ExportButton'
import { Pagination } from 'components/common/Pagination'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import useMediaQuery from 'hooks/useMediaQuery'
import { NotFound } from '../layout/NotFound'

export const ExtrinsicList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<ExtrinsicWhereInput>({})
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery<ExtrinsicsConnectionQuery>(
    QUERY_EXTRINSIC_LIST_CONNECTION,
    {
      variables: { first: PAGE_SIZE, after: lastCursor, where: filters },
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const extrinsicsConnection = useMemo(() => data && data.extrinsicsConnection, [data])
  const extrinsics = useMemo(
    () =>
      extrinsicsConnection &&
      extrinsicsConnection.edges.map((extrinsic) => extrinsic.node as Extrinsic),
    [extrinsicsConnection],
  )
  const totalCount = useMemo(
    () => extrinsicsConnection && extrinsicsConnection.totalCount,
    [extrinsicsConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageInfo = useMemo(
    () => extrinsicsConnection && extrinsicsConnection.pageInfo,
    [extrinsicsConnection],
  )
  const modules = useMemo(
    () => data && data.extrinsicModuleNames.map((module) => module.name.split('.')[0]),
    [data],
  )

  const handleNextPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const handlePreviousPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const onChange = useCallback((page: number) => {
    setCurrentPage(Number(page))

    const newCount = page > 0 ? PAGE_SIZE * Number(page + 1) : PAGE_SIZE
    const endCursor = newCount - PAGE_SIZE

    if (endCursor === 0 || endCursor < 0) return setLastCursor(undefined)
    setLastCursor(endCursor.toString())
  }, [])

  if (loading) return <Spinner />
  if (!data || !modules || !extrinsics) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <ExtrinsicListFilter
          title={
            <div className=' font-medium text-[#282929] dark:text-white'>
              Extrinsics {totalLabel}
            </div>
          }
          filters={filters}
          modules={modules}
          setFilters={setFilters}
        />
      </div>
      <div className='mt-8 flex w-full flex-col sm:mt-0'>
        <ExtrinsicTable extrinsics={extrinsics} isDesktop={isDesktop} />
        <div className='flex w-full justify-between gap-2'>
          <ExportButton data={extrinsics} filename='extrinsic-list' />
          {totalCount && pageInfo && (
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
          )}
        </div>
      </div>
    </div>
  )
}
