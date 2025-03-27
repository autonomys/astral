import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import type { DomainByIdQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import Link from 'next/link'
import { FC } from 'react'
import { bigNumberToFormattedString } from 'utils/number'
import { AccountIconWithLink } from '../common/AccountIcon'

type Props = {
  domain: DomainByIdQuery['staking_domains_by_pk']
}

export const DomainDetailsCard: FC<Props> = ({ domain }) => {
  const { network, tokenSymbol } = useIndexers()

  if (!domain) return null

  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white bg-white p-6 px-3 py-4 shadow shadow dark:border-none dark:bg-boxDark sm:p-6'>
        <div className='mb-10 flex items-center justify-between'>
          <h3 className='text-sm font-semibold leading-none text-gray-900 dark:text-white lg:text-2xl'>
            Domain #{domain.id} - {capitalizeFirstLetter(domain.name)}
          </h3>
        </div>
        <div className='flow-root'>
          <List>
            <StyledListItem title='Domain Name'>
              <CopyButton value={domain.name || ''} message='Domain name copied'>
                {capitalizeFirstLetter(domain.name)}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Domain Owner'>
              <AccountIconWithLink
                address={domain.account_id}
                network={network}
                section={Routes.consensus}
              />
            </StyledListItem>
            <StyledListItem title='Completed epoch'>
              <CopyButton
                value={domain.completed_epoch.toString()}
                message='Completed epoch count copied'
              >
                {domain.completed_epoch}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Last domain block number '>
              <CopyButton
                value={domain.last_domain_block_number.toString()}
                message='Last domain block number copied'
              >
                {domain.last_domain_block_number}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Bundle count'>{domain.bundle_count}</StyledListItem>
            <StyledListItem title='Last bundle'>
              <Link
                className='flex gap-2 hover:text-primaryAccent'
                href={INTERNAL_ROUTES.blocks.id.page(
                  network,
                  Routes.consensus,
                  domain.last_bundle_at,
                )}
              >
                <div>#{domain.last_bundle_at}</div>
              </Link>
            </StyledListItem>
            <StyledListItem title='Current total stake'>
              {bigNumberToFormattedString(domain.current_total_stake)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Current storage fee deposits'>
              {bigNumberToFormattedString(domain.current_storage_fee_deposit)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total deposits'>
              {bigNumberToFormattedString(domain.total_deposits)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total rewards collected'>
              {bigNumberToFormattedString(domain.total_rewards_collected)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total consensus storage fee'>
              {bigNumberToFormattedString(domain.total_consensus_storage_fee)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total domain execution fee'>
              {bigNumberToFormattedString(domain.total_domain_execution_fee)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total burned balance'>
              {bigNumberToFormattedString(domain.total_burned_balance)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Total tax collected'>
              {bigNumberToFormattedString(domain.total_tax_collected)} {tokenSymbol}
            </StyledListItem>
            <StyledListItem title='Operators count'>
              {bigNumberToFormattedString(domain.operators_aggregate.aggregate?.count ?? '0')}
            </StyledListItem>
            <StyledListItem title='Nominators count'>
              {bigNumberToFormattedString(domain.nominators_aggregate.aggregate?.count ?? '0')}
            </StyledListItem>
            <StyledListItem title='Deposits count'>
              {bigNumberToFormattedString(domain.deposits_aggregate.aggregate?.count ?? '0')}
            </StyledListItem>
            <StyledListItem title='Withdrawals count'>
              {bigNumberToFormattedString(domain.withdrawals_aggregate.aggregate?.count ?? '0')}
            </StyledListItem>
          </List>
        </div>
      </div>
    </div>
  )
}
