import { useApolloClient, useQuery } from '@apollo/client'
import React, { useCallback, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

// common
import { Pagination, Spinner } from 'common/components'
import ExportButton from 'common/components/ExportButton'
import NotAllowed from 'common/components/NotAllowed'
import { MAX_DOWNLOADER_BATCH_SIZE, PAGE_SIZE } from 'common/constants'
import useDomains from 'common/hooks/useDomains'

// leaderboard
import { QUERY_OPERATORS_REWARDS_LIST } from 'Leaderboard/querys'
import LazyExportButton from '../../common/components/LazyExportButton'
import OperatorRewardsListTable from './OperatorRewardsListTable'

const OperatorRewardsList = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const { selectedChain } = useDomains()
  const apolloClient = useApolloClient()

  const { data, error, loading } = useQuery(QUERY_OPERATORS_REWARDS_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const extractOperatorRewardsConnection = data => data.operatorRewardsConnection.edges.map(
    ( accountRewards ) => accountRewards.node,
  )

  const fullDataDownloader = useCallback( async () => {
    const entries: unknown[] = []

    let hasNextPage = true
    while ( hasNextPage ) {
      const { data } = await apolloClient.query( {
        query: QUERY_OPERATORS_REWARDS_LIST,
        variables: { first: MAX_DOWNLOADER_BATCH_SIZE, after: entries.length ? entries.length.toString() : undefined },
      } )

      const accounts = extractOperatorRewardsConnection( data )

      entries.push( ...accounts )

      hasNextPage = entries.length < data.operatorRewardsConnection.totalCount
    }



    return entries
  }, [apolloClient] )


  if ( loading ) {
    return <Spinner />
  }

  if (selectedChain.title !== 'Gemini 3g' || selectedChain.isDomain) {
    return <NotAllowed />
  }

  const operatorRewardsConnection = extractOperatorRewardsConnection( data )
  const totalCount = data.operatorRewardsConnection.totalCount

  const pageInfo = data.operatorRewardsConnection.pageInfo

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
      <div className='w-full flex flex-col sm:mt-0'>
        <OperatorRewardsListTable operators={operatorRewardsConnection} page={currentPage} />
        <div className='w-full flex justify-between gap-2'>
          <ExportButton data={operatorRewardsConnection} filename='account-list' />
          <div className='hidden md:flex w-full'>
            <LazyExportButton query={fullDataDownloader} filename='account-list' />
          </div>
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
        <div className='w-full flex md:hidden mt-2 justify-center md:justify-end'>
          <LazyExportButton query={fullDataDownloader} filename='account-list' />
        </div>
      </div>
    </div>
  )
}
export default OperatorRewardsList
