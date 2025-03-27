import { capitalizeFirstLetter, shortString } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import type { OperatorByIdQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC } from 'react'
import { bigNumberToFormattedString, numberFormattedString } from 'utils/number'
import { operatorStatus } from 'utils/operator'
import { AccountIconWithLink } from '../common/AccountIcon'

type Props = {
  operator: OperatorByIdQuery['staking_operators_by_pk']
  isDesktop?: boolean
}

export const OperatorDetailsCard: FC<Props> = ({ operator, isDesktop = false }) => {
  const { network, tokenSymbol } = useIndexers()

  if (!operator) return null

  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-boxDark sm:p-6'>
        <div className='mb-10 flex items-center justify-between'>
          <h3 className='text-sm font-semibold leading-none text-gray-900 dark:text-white lg:text-2xl'>
            Operator #{operator.id}
          </h3>
        </div>
        <div className='flow-root'>
          <List>
            <StyledListItem title='Operator Owner'>
              <AccountIconWithLink
                address={operator.account_id}
                network={network}
                section={Routes.consensus}
              />
            </StyledListItem>
            <StyledListItem title='Signing Key'>
              <CopyButton value={operator.signing_key || ''} message='Operator signing key copied'>
                {isDesktop ? operator.signing_key : shortString(operator.signing_key)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Minimum Stake'>
              {bigNumberToFormattedString(operator.minimum_nominator_stake)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Nominator Tax'>{operator.nomination_tax} %</StyledListItem>
            <StyledListItem title='Bundle count'>{operator.bundle_count}</StyledListItem>
            <StyledListItem title='Last bundle'>
              <Link
                className='flex gap-2 hover:text-primaryAccent'
                href={INTERNAL_ROUTES.blocks.id.page(
                  network,
                  Routes.consensus,
                  operator.last_bundle_at,
                )}
              >
                <div>#{operator.last_bundle_at}</div>
              </Link>
            </StyledListItem>
            <StyledListItem title='Current total stake'>
              {bigNumberToFormattedString(operator.current_total_stake)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Current storage fee deposits'>
              {bigNumberToFormattedString(operator.current_storage_fee_deposit)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total staked'>
              {bigNumberToFormattedString(
                BigInt(operator.current_total_stake) + BigInt(operator.current_storage_fee_deposit),
              )}{' '}
              {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total rewards collected'>
              {bigNumberToFormattedString(operator.total_rewards_collected)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total tax collected'>
              {bigNumberToFormattedString(operator.total_tax_collected)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Nominators count'>
              {numberFormattedString(operator.nominators_aggregate.aggregate?.count ?? 0)}
            </StyledListItem>
            <StyledListItem title='Deposits count'>
              {numberFormattedString(operator.total_deposits_count)}
            </StyledListItem>
            <StyledListItem title='Withdrawals count'>
              {numberFormattedString(operator.total_withdrawals_count)}
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
