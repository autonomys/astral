import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { TOKEN } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { DomainByIdQuery } from 'gql/graphql'
import useChains from 'hooks/useChains'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC } from 'react'
import { bigNumberToFormattedString } from 'utils/number'
import { capitalizeFirstLetter, shortString } from 'utils/string'
import { AccountIcon } from '../common/AccountIcon'

dayjs.extend(relativeTime)

type Props = {
  domain: DomainByIdQuery['domain_by_pk']
  isDesktop?: boolean
}

export const DomainDetailsCard: FC<Props> = ({ domain, isDesktop = false }) => {
  const { network } = useChains()
  const isLargeLaptop = useMediaQuery('(min-width: 1440px)')

  if (!domain) return null

  return (
    <div className='w-full'>
      <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo sm:p-6'>
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
              <CopyButton value={domain.account_id || ''} message='Operator owner key copied'>
                {isDesktop ? (
                  <>
                    <AccountIcon address={domain.account_id} size={26} />
                    {domain.account_id && (
                      <Link
                        data-testid={`nominator-link-${domain.account_id}}`}
                        className='hover:text-primaryAccent'
                        href={INTERNAL_ROUTES.accounts.id.page(
                          network,
                          Routes.consensus,
                          domain.account_id,
                        )}
                      >
                        <div>
                          {isLargeLaptop ? domain.account_id : shortString(domain.account_id)}
                        </div>
                      </Link>
                    )}
                  </>
                ) : (
                  shortString(domain.account_id || '')
                )}
              </CopyButton>
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
              {bigNumberToFormattedString(domain.current_total_stake)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Current storage fee deposits'>
              {bigNumberToFormattedString(domain.current_storage_fee_deposit)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Total deposits'>
              {bigNumberToFormattedString(domain.total_deposits)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Total rewards collected'>
              {bigNumberToFormattedString(domain.total_rewards_collected)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Total consensus storage fee'>
              {bigNumberToFormattedString(domain.total_consensus_storage_fee)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Total domain execution fee'>
              {bigNumberToFormattedString(domain.total_domain_execution_fee)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Total burned balance'>
              {bigNumberToFormattedString(domain.total_burned_balance)} {TOKEN.symbol}
            </StyledListItem>
            <StyledListItem title='Total tax collected'>
              {bigNumberToFormattedString(domain.total_tax_collected)} {TOKEN.symbol}
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
