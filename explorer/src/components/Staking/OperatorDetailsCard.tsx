import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { TOKEN } from 'constants/'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { OperatorByIdQuery } from 'gql/types/staking'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC } from 'react'
import { bigNumberToNumber } from 'utils/number'
import { operatorStatus } from 'utils/operator'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { AccountIcon } from '../common/AccountIcon'

dayjs.extend(relativeTime)

type Props = {
  operator: OperatorByIdQuery['operator_by_pk']
  isDesktop?: boolean
}

export const OperatorDetailsCard: FC<Props> = ({ operator, isDesktop = false }) => {
  const { network } = useChains()
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
              <CopyButton value={operator.account_id || ''} message='Operator owner key copied'>
                {isDesktop ? (
                  <>
                    <AccountIcon address={operator.account_id} size={26} />
                    {operator.account_id && (
                      <Link
                        data-testid={`nominator-link-${operator.account_id}}`}
                        className='hover:text-purpleAccent'
                        href={INTERNAL_ROUTES.accounts.id.page(
                          network,
                          Routes.consensus,
                          operator.account_id,
                        )}
                      >
                        <div>
                          {isLargeLaptop ? operator.account_id : shortString(operator.account_id)}
                        </div>
                      </Link>
                    )}
                  </>
                ) : (
                  shortString(operator.account_id || '')
                )}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Signing Key'>
              <CopyButton value={operator.signing_key || ''} message='Operator signing key copied'>
                {isDesktop ? operator.signing_key : shortString(operator.signing_key)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Minimum Stake'>
              {bigNumberToNumber(operator.minimum_nominator_stake)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Nominator Tax'>{operator.nomination_tax} %</StyledListItem>
            <StyledListItem title='Current Stake'>
              {bigNumberToNumber(operator.current_total_stake)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Status'>
              {capitalizeFirstLetter(operatorStatus(operator.raw_status))}
            </StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
