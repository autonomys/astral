import { useQuery } from '@apollo/client'
import { FC, useMemo } from 'react'
import { useErrorHandler } from 'react-error-boundary'

// home
import { HomeBlockList, HomeChainInfo, HomeExtrinsicList } from 'Home/components'
import { ACCOUNT_MIN_VAL } from 'Home/constants'
import { QUERY_HOME, QUERY_HOME_DOMAIN } from 'Home/query'

// common
import { SearchBar, Spinner } from 'common/components'
import useDomains from 'common/hooks/useDomains'
import useMediaQuery from 'common/hooks/useMediaQuery'

const Home: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = isDesktop ? 10 : 3

  const { selectedChain } = useDomains()

  const HomeQuery = useMemo(
    () => (selectedChain.isDomain ? QUERY_HOME_DOMAIN : QUERY_HOME),
    [selectedChain],
  )

  const homeQueryResult = useQuery(HomeQuery, {
    variables: { limit: PAGE_SIZE, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
    pollInterval: 6000,
  })
  useErrorHandler(homeQueryResult.error)

  if (homeQueryResult.loading) {
    return <Spinner />
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <SearchBar />
      <HomeChainInfo {...homeQueryResult} />
      <div className='flex flex-col xl:flex-row w-full items-center gap-5'>
        <HomeBlockList {...homeQueryResult} isDesktop={isDesktop} />
        <HomeExtrinsicList {...homeQueryResult} isDesktop={isDesktop} />
      </div>
    </div>
  )
}

export default Home
