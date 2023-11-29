import { FC } from 'react'
import { Nominator } from 'gql/graphql'

// operator
import OperatorNominatorTable from 'Operator/components/OperatorNominatorTable'

type Props = {
  nominators: Nominator[]
  isDesktop: boolean
}

const OperatorNominatorList: FC<Props> = ({ nominators, isDesktop }) => {
  return (
    <div className='w-full flex flex-col align-middle mt-5'>
      <div className='w-full flex flex-col mt-5 sm:mt-0 bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] rounded-[20px] p-5'>
        <OperatorNominatorTable nominators={nominators} isDesktop={isDesktop} />
      </div>
    </div>
  )
}

export default OperatorNominatorList
