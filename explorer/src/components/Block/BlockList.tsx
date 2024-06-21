'use client'

import { searchTypes } from '@/constants'
import { numberWithCommas } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { ExportButton } from 'components/common/ExportButton'
import { Pagination } from 'components/common/Pagination'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { Block, BlocksConnectionDomainQuery, BlocksConnectionQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { BlockTable } from './BlockTable'
import { QUERY_BLOCK_LIST_CONNECTION, QUERY_BLOCK_LIST_CONNECTION_DOMAIN } from './query'

export const BlockList: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const { selectedChain } = useDomains()

  const first = useMemo(() => (isDesktop ? 10 : 5), [isDesktop])
  const BlockListQuery = useMemo(
    () =>
      selectedChain.isDomain ? QUERY_BLOCK_LIST_CONNECTION_DOMAIN : QUERY_BLOCK_LIST_CONNECTION,
    [selectedChain.isDomain],
  )

  const { data, error, loading } = useQuery<BlocksConnectionQuery | BlocksConnectionDomainQuery>(
    BlockListQuery,
    {
      variables: { first, after: lastCursor },
      pollInterval: 6000,
    },
  )

  useErrorHandler(error)

  const blocksConnection = useMemo(() => data && data.blocksConnection, [data])
  const blocks = useMemo(
    () => blocksConnection && blocksConnection.edges.map((block) => block.node as Block),
    [blocksConnection],
  )
  const totalCount = useMemo(
    () => blocksConnection && blocksConnection.totalCount,
    [blocksConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageInfo = useMemo(() => blocksConnection && blocksConnection.pageInfo, [blocksConnection])

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

  const onChange = useCallback(
    (page: number) => {
      setCurrentPage(Number(page))

      const newCount = page > 0 ? first * Number(page + 1) : first
      const endCursor = newCount - first

      if (endCursor === 0 || endCursor < 0) return setLastCursor(undefined)
      setLastCursor(endCursor.toString())
    },
    [first],
  )

  if (loading) return <Spinner />
  if (!data || !blocks)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[1]} />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>{`Blocks (${totalLabel})`}</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <BlockTable blocks={blocks} isDesktop={isDesktop} />
        <div className='flex w-full justify-between gap-2'>
          <ExportButton data={blocks} filename='block-list' />
          {totalCount && pageInfo && (
            <Pagination
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
              currentPage={currentPage}
              pageSize={first}
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
