'use client'

import { Routes } from '@/constants'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { ACCOUNT_MIN_VAL } from 'constants/account'
import type {
  HomeQueryDomainQuery,
  HomeQueryDomainQueryVariables,
  HomeQueryQuery,
  HomeQueryQueryVariables,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isLoading, useQueryStates } from 'states/query'
import { NotFound } from '../layout/NotFound'
import { HomeBlockList } from './HomeBlockList'
import { HomeChainInfo } from './HomeChainInfo'
import { HomeExtrinsicList } from './HomeExtrinsicList'
import { QUERY_HOME, QUERY_HOME_DOMAIN } from './query'

export const Home: FC = () => {
  const { ref, inView } = useInView()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = isDesktop ? 10 : 3
  const { isEvm } = useChains()
  const novaExplorerBanner = useEvmExplorerBanner()

  const HomeQuery = useMemo(() => (isEvm ? QUERY_HOME_DOMAIN : QUERY_HOME), [isEvm])

  const { setIsVisible } = useSquidQuery<
    HomeQueryQuery | HomeQueryDomainQuery,
    HomeQueryQueryVariables | HomeQueryDomainQueryVariables
  >(
    HomeQuery,
    {
      variables: { limit: PAGE_SIZE, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
      pollInterval: 6000,
    },
    Routes.consensus,
    'home',
  )

  const {
    consensus: { home: consensusEntry },
    nova: { home: evmEntry },
  } = useQueryStates()

  const loading = useMemo(() => {
    if (isEvm) return isLoading(evmEntry)
    return isLoading(consensusEntry)
  }, [evmEntry, consensusEntry, isEvm])

  const data = useMemo(() => {
    if (isEvm && hasValue(evmEntry)) return evmEntry.value
    if (hasValue(consensusEntry)) return consensusEntry.value
  }, [consensusEntry, evmEntry, isEvm])

  const noData = useMemo(() => {
    if (loading) return <Spinner isSmall />
    if (!data) return <NotFound />
    return null
  }, [data, loading])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
      <SearchBar />
      <div ref={ref}>
        {data ? (
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
