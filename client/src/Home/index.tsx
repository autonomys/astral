import { FC } from 'react'

// home
import HomeBlockList from 'Home/components/HomeBlockList'
import HomeExtrinsicList from 'Home/components/HomeExtrinsicList'
import HomeChainInfo from 'Home/components/HomeChainInfo'

// common
import SearchBar from 'common/components/SearchBar'

const Home: FC = () => {
  return (
    <div className='w-full flex flex-col align-middle'>
      <SearchBar />
      <HomeChainInfo />
      <div className='flex w-full'>
        <HomeBlockList />
        <HomeExtrinsicList />
      </div>
    </div>
  )
}

export default Home
