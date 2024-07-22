import { bigNumberToNumber, numberWithCommas } from '@/utils/number'
import { shortString } from '@/utils/string'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { Chains } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { OperatorByIdQuery } from 'gql/oldSquidTypes'
import useDomains from 'hooks/useDomains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC } from 'react'
import { operatorStatus } from 'utils/operator'
import { capitalizeFirstLetter } from 'utils/string'
import { AccountIcon } from '../common/AccountIcon'

dayjs.extend(relativeTime)

type Props = {
  operator: OperatorByIdQuery['operatorById']
  isDesktop?: boolean
}

export const OperatorDetailsCard: FC<Props> = ({ operator, isDesktop = false }) => {
  const { selectedChain } = useDomains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  if (!operator) return null

  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:p-6'>
        <div className='mb-10 flex items-center justify-between'>
          <h3 className='text-sm font-semibold leading-none text-gray-900 dark:text-white lg:text-2xl'>
            Operator #{operator.id}
          </h3>
        </div>
        <div className='flow-root'>
          <List>
            <StyledListItem title='Operator Owner'>
              <CopyButton value={operator.operatorOwner || ''} message='Operator owner key copied'>
                {isDesktop ? (
                  <>
                    <AccountIcon address={operator.operatorOwner} size={26} />
                    {operator.operatorOwner && (
                      <Link
                        data-testid={`nominator-link-${operator.operatorOwner}}`}
                        className='hover:text-purpleAccent'
                        href={INTERNAL_ROUTES.accounts.id.page(
                          selectedChain.urls.page,
                          Routes.consensus,
                          operator.operatorOwner,
                        )}
                      >
                        <div>
                          {isLargeLaptop
                            ? operator.operatorOwner
                            : shortString(operator.operatorOwner)}
                        </div>
                      </Link>
                    )}
                  </>
                ) : (
                  shortString(operator.operatorOwner || '')
                )}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Signing Key'>
              <CopyButton value={operator.signingKey || ''} message='Operator signing key copied'>
                {isDesktop ? operator.signingKey : shortString(operator.signingKey)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Minimum Stake'>
              {bigNumberToNumber(operator.minimumNominatorStake)} {selectedChain.token.symbol}
            </StyledListItem>
            <StyledListItem title='Nominator Tax'>{operator.nominationTax} %</StyledListItem>
            <StyledListItem title='Current Stake'>
              {bigNumberToNumber(operator.currentTotalStake)} {selectedChain.token.symbol}
            </StyledListItem>
            <StyledListItem title='Shares'>{numberWithCommas(operator.totalShares)}</StyledListItem>
            <StyledListItem title='Status'>
              {selectedChain.urls.page === Chains.gemini3g
                ? operator.status
                : capitalizeFirstLetter(operatorStatus(operator.status))}
            </StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
