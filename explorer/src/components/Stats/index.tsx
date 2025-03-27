'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import { SearchBar } from 'components/common/SearchBar'
import { useHomeQuery } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { HomeChainInfo } from '../Consensus/Home/HomeChainInfo'
import { HomeChainInfoExtra } from '../Consensus/Home/HomeChainInfoExtra'
import { HomeCharts } from '../Consensus/Home/HomeCharts'

export const Stats: FC = () => {
  const { ref, inView } = useInView()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = useMemo(() => (isDesktop ? 10 : 3), [isDesktop])
  const { loading, data } = useHomeQuery({
    variables: { limit: PAGE_SIZE, offset: 0 },
    skip: !inView,
    pollInterval: 6000,
  })

  return (
    <div className='flex w-full flex-col align-middle'>
      <SearchBar />
      <div ref={ref}>
        <HomeChainInfo data={data} loading={loading} />
        <HomeCharts />
        <HomeChainInfoExtra data={data} loading={loading} />
      </div>
    </div>
  )
}
