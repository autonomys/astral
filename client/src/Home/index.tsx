import { FC } from 'react'
import { useQuery } from '@apollo/client'
import BN from 'bn.js'

// home
import HomeBlockList from 'Home/components/HomeBlockList'
import HomeExtrinsicList from 'Home/components/HomeExtrinsicList'
import HomeChainInfo from 'Home/components/HomeChainInfo'
import { QUERY_HOME } from 'Home/query'

// common
import SearchBar from 'common/components/SearchBar'
import useMediaQuery from 'common/hooks/useMediaQuery'

const ACCOUNT_MIN_VAL = new BN(0.3)

const Home: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = isDesktop ? 10 : 3
  const homeQueryResult = useQuery(QUERY_HOME, {
    variables: { limit: PAGE_SIZE, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
    pollInterval: 6000,
  })

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
