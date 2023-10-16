// common
import { SearchBar } from 'common/components'

// reward
import RewardTable from './RewardTable'

const RewardList = () => {
  const sampleData = [
    {
      rank: 1,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 2,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 3,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 4,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 5,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 6,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 7,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 8,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
    {
      rank: 9,
      account: '0x1234567890',
      blockReward: 100,
      voteReward: 100,
      totalReward: '10.4%',
    },
  ]
  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base font-medium dark:text-white'>{`Holders (${sampleData.length})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <RewardTable rewards={sampleData} />
      </div>
    </div>
  )
}

export default RewardList
