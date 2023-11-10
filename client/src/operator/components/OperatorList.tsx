import { FC } from 'react'

// common
import { SearchBar } from 'common/components'
import OperatorTable from './OperatorTable'

const OperatorList: FC = () => {
  const operators = [
    {
      id: '1',
      signingKey: 'operator1',
      currentDomainId: 1,
      nextDomainId: 2,
      minimumNominatorStake: '1000000000',
      nominationTax: 5,
      currentTotalStake: '2000000000',
      currentEpochRewards: '500000000',
      totalShares: '5000000000',
      status: 'Active',
    },
    {
      id: '2',
      signingKey: 'operator2',
      currentDomainId: 3,
      nextDomainId: 4,
      minimumNominatorStake: '800000000',
      nominationTax: 3,
      currentTotalStake: '1500000000',
      currentEpochRewards: '400000000',
      totalShares: '4000000000',
      status: 'Active',
    },
    {
      id: '3',
      signingKey: 'operator3',
      currentDomainId: 2,
      nextDomainId: 1,
      minimumNominatorStake: '1200000000',
      nominationTax: 4,
      currentTotalStake: '1800000000',
      currentEpochRewards: '450000000',
      totalShares: '4500000000',
      status: 'Active',
    },
    {
      id: '4',
      signingKey: 'operator4',
      currentDomainId: 5,
      nextDomainId: 6,
      minimumNominatorStake: '900000000',
      nominationTax: 3,
      currentTotalStake: '1400000000',
      currentEpochRewards: '350000000',
      totalShares: '3500000000',
      status: 'Active',
    },
    {
      id: '5',
      signingKey: 'operator5',
      currentDomainId: 4,
      nextDomainId: 5,
      minimumNominatorStake: '1100000000',
      nominationTax: 5,
      currentTotalStake: '1700000000',
      currentEpochRewards: '480000000',
      totalShares: '4800000000',
      status: 'Active',
    },
    {
      id: '6',
      signingKey: 'operator6',
      currentDomainId: 7,
      nextDomainId: 8,
      minimumNominatorStake: '950000000',
      nominationTax: 4,
      currentTotalStake: '1600000000',
      currentEpochRewards: '420000000',
      totalShares: '4200000000',
      status: 'Active',
    },
    {
      id: '7',
      signingKey: 'operator7',
      currentDomainId: 6,
      nextDomainId: 7,
      minimumNominatorStake: '1300000000',
      nominationTax: 3,
      currentTotalStake: '1900000000',
      currentEpochRewards: '460000000',
      totalShares: '4600000000',
      status: 'Active',
    },
    {
      id: '8',
      signingKey: 'operator8',
      currentDomainId: 9,
      nextDomainId: 10,
      minimumNominatorStake: '850000000',
      nominationTax: 5,
      currentTotalStake: '1500000000',
      currentEpochRewards: '380000000',
      totalShares: '3800000000',
      status: 'Active',
    },
    {
      id: '9',
      signingKey: 'operator9',
      currentDomainId: 8,
      nextDomainId: 9,
      minimumNominatorStake: '1150000000',
      nominationTax: 4,
      currentTotalStake: '1700000000',
      currentEpochRewards: '430000000',
      totalShares: '4300000000',
      status: 'Active',
    },
    {
      id: '10',
      signingKey: 'operator10',
      currentDomainId: 11,
      nextDomainId: 12,
      minimumNominatorStake: '980000000',
      nominationTax: 3,
      currentTotalStake: '1600000000',
      currentEpochRewards: '370000000',
      totalShares: '3700000000',
      status: 'Active',
    },
  ]

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>

      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <OperatorTable operators={operators} />
      </div>
    </div>
  )
}

export default OperatorList
