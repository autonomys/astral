import { Operator } from 'gql/graphql'
import { FC } from 'react'
import { OperatorNominatorTable } from './OperatorNominatorTable'

type Props = {
  operator: Operator
  isDesktop: boolean
}

export const OperatorNominatorList: FC<Props> = ({ operator, isDesktop }) => {
  return (
    <div className='mt-5 flex w-full flex-col align-middle'>
      <div className='mt-5 flex w-full flex-col rounded-[20px] bg-white p-5 dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:mt-0'>
        <OperatorNominatorTable operator={operator} isDesktop={isDesktop} />
      </div>
    </div>
  )
}
