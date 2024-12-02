'use client'

import { SearchBar } from 'components/common/SearchBar'
import { FC } from 'react'
import { HomeBlockList } from './HomeBlockList'
import { HomeChainInfo } from './HomeChainInfo'
import { HomeExtrinsicList } from './HomeExtrinsicList'

export const Home: FC = () => {
  return (
    <div className='flex w-full flex-col align-middle'>
      <SearchBar />
      <HomeChainInfo />
      <div className='flex w-full flex-col items-center gap-5 xl:flex-row'>
        <HomeBlockList />
        <HomeExtrinsicList />
      </div>
    </div>
  )
}
