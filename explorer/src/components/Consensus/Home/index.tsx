'use client'

import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { Routes } from 'constants/routes'
import type { HomeQueryQuery, HomeQueryQueryVariables } from 'gql/graphql'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useMediaQuery from 'hooks/useMediaQuery'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { NotFound } from '../../layout/NotFound'
import { HomeBlockList } from './HomeBlockList'
import { HomeChainInfo } from './HomeChainInfo'
import { HomeExtrinsicList } from './HomeExtrinsicList'
import { QUERY_HOME } from './query'

export const Home: FC = () => {
  const { ref, inView } = useInView()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = useMemo(() => (isDesktop ? 10 : 3), [isDesktop])

  const { loading, setIsVisible } = useIndexersQuery<HomeQueryQuery, HomeQueryQueryVariables>(
    QUERY_HOME,
    {
      variables: { limit: PAGE_SIZE, offset: 0 },
      pollInterval: 6000,
    },
    Routes.consensus,
    'home',
  )

  const consensusEntry = useQueryStates((state) => state.consensus.home)

  const data = useMemo(() => {
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry])

  const noData = useMemo(() => {
    if (loading || isLoading(consensusEntry)) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, consensusEntry, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      <SearchBar />
      <div ref={ref}>
        {!loading && data ? (
          <>
            <HomeChainInfo data={data} />
            <div className='flex w-full flex-col items-center gap-5 xl:flex-row'>
              <HomeBlockList data={data} />
              <HomeExtrinsicList data={data} />
            </div>
          </>
        ) : (
          noData
        )}
      </div>
    </div>
  )
}
