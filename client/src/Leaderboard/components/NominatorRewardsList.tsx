import { useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

// common
import { Spinner } from 'common/components'
import ExportButton from 'common/components/ExportButton'
import NotAllowed from 'common/components/NotAllowed'
import { MAX_DOWNLOADER_BATCH_SIZE, PAGE_SIZE } from 'common/constants'
import useDomains from 'common/hooks/useDomains'

// leaderboard
import { SortingState } from '@tanstack/react-table'
import { QUERY_NOMINATORS_REWARDS_LIST } from 'Leaderboard/querys'
import LazyExportButton from '../../common/components/LazyExportButton'
import NominatorRewardsListTable from './NominatorRewardsListTable'

const NominatorRewardsList = () => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'operator', desc: true }])
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  })

  const { selectedChain } = useDomains()
  const apolloClient = useApolloClient()

  const { data, error, loading } = useQuery(QUERY_NOMINATORS_REWARDS_LIST, {
    variables: {
      first: pagination.pageSize,
      after:
        pagination.pageIndex > 0
          ? (pagination.pageIndex * pagination.pageSize).toString()
          : undefined,
      orderBy: sorting.length
        ? sorting.map((s) => `${s.id}_${s.desc ? 'DESC' : 'ASC'}`).join(',')
        : 'operator_DESC',
    },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const extractAccountRewardsConnection = (data) =>
    data.accountRewardsConnection.edges.map((accountRewards) => accountRewards.node)

  const fullDataDownloader = useCallback(async () => {
    const entries: unknown[] = []

    let hasNextPage = true
    while (hasNextPage) {
      const { data } = await apolloClient.query({
        query: QUERY_NOMINATORS_REWARDS_LIST,
        variables: {
          first: MAX_DOWNLOADER_BATCH_SIZE,
          after: entries.length ? entries.length.toString() : undefined,
        },
      })

      const accounts = extractAccountRewardsConnection(data)

      entries.push(...accounts)

      hasNextPage = entries.length < data.accountRewardsConnection.totalCount
    }

    return entries
  }, [apolloClient])

  if (loading) {
    return <Spinner />
  }

  if (selectedChain.title !== 'Gemini 3g' || selectedChain.isDomain) {
    return <NotAllowed />
  }

  const accountRewardsConnection = data.accountRewardsConnection.edges.map(
    (accountRewards) => accountRewards.node,
  )
  const totalCount = data.accountRewardsConnection.totalCount

  const pageCount = Math.floor(totalCount / pagination.pageSize)

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full flex flex-col sm:mt-0'>
        <NominatorRewardsListTable
          accounts={accountRewardsConnection}
          sorting={sorting}
          pageCount={pageCount}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
        />
        <div className='w-full flex justify-between gap-2'>
          <ExportButton data={accountRewardsConnection} filename='account-list' />
          <div className='hidden md:flex w-full'>
            <LazyExportButton query={fullDataDownloader} filename='account-list' />
          </div>
        </div>
        <div className='w-full flex md:hidden mt-2 justify-center md:justify-end'>
          <LazyExportButton query={fullDataDownloader} filename='account-list' />
        </div>
      </div>
    </div>
  )
}

export default NominatorRewardsList
