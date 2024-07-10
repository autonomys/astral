'use client'

import { useQuery } from '@apollo/client'
import { useEvmExplorerBanner } from 'components/common/EvmExplorerBanner'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { ACCOUNT_MIN_VAL } from 'constants/account'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import type { HomeQueryDomainQuery, HomeQueryQuery } from '../gql/graphql'
import { NotFound } from '../layout/NotFound'
import { HomeBlockList } from './HomeBlockList'
import { HomeChainInfo } from './HomeChainInfo'
import { HomeExtrinsicList } from './HomeExtrinsicList'
import { QUERY_HOME, QUERY_HOME_DOMAIN } from './query'

export const Home: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = isDesktop ? 10 : 3
  const { selectedChain } = useDomains()
  const novaExplorerBanner = useEvmExplorerBanner()
  const inFocus = useWindowFocus()

  const HomeQuery = useMemo(
    () => (selectedChain?.isDomain ? QUERY_HOME_DOMAIN : QUERY_HOME),
    [selectedChain],
  )

  const { data, loading, error } = useQuery<HomeQueryQuery | HomeQueryDomainQuery>(HomeQuery, {
    variables: { limit: PAGE_SIZE, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
    skip: !inFocus,
    pollInterval: 6000,
  })
  useErrorHandler(error)

  if (loading) return <Spinner />
  if (!data) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      {novaExplorerBanner}
      <SearchBar />
      <HomeChainInfo error={error} data={data} loading={loading} />
      <div className='flex w-full flex-col items-center gap-5 xl:flex-row'>
        <HomeBlockList error={error} data={data} loading={loading} />
        <HomeExtrinsicList error={error} data={data} loading={loading} />
      </div>
    </div>
  )
}

export default Home
