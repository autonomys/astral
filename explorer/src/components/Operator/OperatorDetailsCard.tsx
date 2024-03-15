import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Operator } from 'gql/graphql'
import { FC } from 'react'

dayjs.extend(relativeTime)

type Props = {
  operator: Operator
  isDesktop?: boolean
}

export const OperatorDetailsCard: FC<Props> = ({ operator, isDesktop = false }) => {
  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] sm:p-6'>
        <div className='mb-10 flex items-center justify-between'>
          <h3 className='text-sm font-semibold leading-none text-gray-900 dark:text-white lg:text-2xl'>
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
            <StyledListItem title='Operator Owner'>
              <CopyButton value={operator.operatorOwner || ''} message='Operator owner key copied'>
                {isDesktop ? operator.operatorOwner : shortString(operator.operatorOwner || '')}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Minimun Stake'>
              {bigNumberToNumber(operator.minimumNominatorStake)} tSSC
            </StyledListItem>
            <StyledListItem title='Nominator Tax'>{operator.nominationTax} %</StyledListItem>
            <StyledListItem title='Current Stake'>
              {bigNumberToNumber(operator.currentTotalStake)} tSSC
            </StyledListItem>
            <StyledListItem title='Shares'>{numberWithCommas(operator.totalShares)}</StyledListItem>
            <StyledListItem title='Status'>{operator.status}</StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
