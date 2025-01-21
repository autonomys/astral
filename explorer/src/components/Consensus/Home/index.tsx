'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import { SearchBar } from 'components/common/SearchBar'
import { useHomeQuery } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { HomeBlockList } from './HomeBlockList'
import { HomeChainInfo } from './HomeChainInfo'
import { HomeChainInfoExtra } from './HomeChainInfoExtra'
import { HomeExtrinsicList } from './HomeExtrinsicList'

export const Home: FC = () => {
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
        <div className='mb-12 flex w-full flex-col items-center gap-5 xl:flex-row'>
          <HomeBlockList data={data} loading={loading} />
          <HomeExtrinsicList data={data} loading={loading} />
        </div>
        <HomeChainInfoExtra data={data} loading={loading} />
      </div>
    </div>
  )
}
