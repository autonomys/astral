import { FC } from 'react'
import { useSubscription } from '@apollo/client'
// import BN from 'bn.js'

// home
import HomeBlockList from 'Home/components/HomeBlockList'
import HomeExtrinsicList from 'Home/components/HomeExtrinsicList'
import HomeChainInfo from 'Home/components/HomeChainInfo'

// common
import ErrorFallback from 'common/components/ErrorFallback'
import SearchBar from 'common/components/SearchBar'
import Spinner from 'common/components/Spinner'
import { QUERY_HOME_LISTS } from './query'

// subscription

const Home: FC = () => {
  const PAGE_SIZE = 10
  // const ACCOUNT_MIN_VAL = new BN(0.3)

  const { data, error, loading } = useSubscription(QUERY_HOME_LISTS, {
    variables: { limit: PAGE_SIZE, offset: 0 },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    console.log('🚀 ~ file: index.tsx ~ line 31 ~ data', data)
    console.log('🚀 ~ file: index.tsx ~ line 31 ~ error', error)
    return <ErrorFallback error={error} />
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <SearchBar />
      <HomeChainInfo blocks={data.blocks} />
      <div className='flex w-full'>
        <HomeBlockList blocks={data.blocks} />
        <HomeExtrinsicList extrinsics={data.extrinsics} />
      </div>
    </div>
  )
}

export default Home
