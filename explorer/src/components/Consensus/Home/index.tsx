'use client'

import { Routes } from '@/constants'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { ACCOUNT_MIN_VAL } from 'constants/account'
import type { HomeQueryQuery, HomeQueryQueryVariables } from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
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

  const { loading, setIsVisible } = useSquidQuery<HomeQueryQuery, HomeQueryQueryVariables>(
    QUERY_HOME,
    {
      variables: { limit: PAGE_SIZE, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
      pollInterval: 6000,
    },
    Routes.consensus,
    'home',
  )

  const {
    consensus: { home: consensusEntry },
  } = useQueryStates()

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

export default Home
