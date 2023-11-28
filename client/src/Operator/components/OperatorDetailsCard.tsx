import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Operator } from 'gql/graphql'

// common
import { CopyButton, List, StyledListItem } from 'common/components'
import { bigNumberToNumber, numberWithCommas, shortString } from 'common/helpers'

dayjs.extend(relativeTime)

type Props = {
  operator: Operator
  isDesktop?: boolean
}

const OperatorDetailsCard: FC<Props> = ({ operator, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <div className='border border-slate-100 bg-white shadow rounded-[20px] mb-4 py-4 px-3 sm:p-6 w-full dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
        <div className='flex items-center justify-between mb-10'>
          <h3 className='font-semibold leading-none text-gray-900 text-sm lg:text-2xl dark:text-white'>
            Operator #{operator.id}
          </h3>
        </div>

        <div className='flow-root'>
          <List>
            <StyledListItem title='Signing Key'>
              <CopyButton value={operator.signingKey || ''} message='Operator signing key copied'>
                {isDesktop ? operator.signingKey : shortString(operator.signingKey)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Minimun Stake'>
              {bigNumberToNumber(operator.minimumNominatorStake, 18)} tSSC
            </StyledListItem>
            <StyledListItem title='Nominator Tax'>{operator.nominationTax} %</StyledListItem>
            <StyledListItem title='Current Stake'>
              {bigNumberToNumber(operator.currentTotalStake, 18)} tSSC
            </StyledListItem>
            <StyledListItem title='Shares'>{numberWithCommas(operator.totalShares)}</StyledListItem>
            <StyledListItem title='Status'>{operator.status}</StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}

export default OperatorDetailsCard
