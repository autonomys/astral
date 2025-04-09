'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/outline'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState, createColumnHelper } from '@tanstack/react-table'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { BIGINT_ZERO } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { DepositStatus, OperatorStatus, WithdrawalStatus } from 'constants/staking'
import {
  NominationsListDocument,
  NominationsListQuery,
  NominationsListQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useIndexersQuery } from 'hooks/useIndexersQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { bigNumberToFormattedString, numberFormattedString, numberWithCommas } from 'utils/number'
import { allCapsToNormal } from 'utils/string'
import { formatSeconds, utcToLocalRelativeTime, utcToLocalTime } from 'utils/time'
import { PageTabs } from '../common/PageTabs'
import { Tab } from '../common/Tabs'
import { Tooltip } from '../common/Tooltip'
import { WalletButton } from '../WalletButton'
import { ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { NominationButton } from './NominationButton'
import { OperatorActions } from './OperatorActions'
import { UnlockFundsButton } from './UnlockFundsButton'
import { WithdrawButton } from './WithdrawButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnHelper = createColumnHelper<any>()

export const NominationsTable: FC = () => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { network, tokenSymbol } = useIndexers()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [sorting] = useState<SortingState>([{ id: 'operator_id', desc: false }])

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
  })

  const OPERATOR_STATUS_CLASSNAME = {
    [OperatorStatus.PENDING_NEXT_EPOCH]:
      'bg-yellow-300 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300',
    [OperatorStatus.ACTIVE]:
      'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-500',
    [OperatorStatus.DEREGISTERED]:
      'bg-red-300 dark:bg-red-300 text-red-700 dark:text-red-700',
    [OperatorStatus.NOMINATORS_UNLOCKED]:
      'bg-pink-200 dark:bg-pink-300 text-pink-700 dark:text-pink-700',
    [OperatorStatus.SLASHED]:
      'bg-red-300 dark:bg-red-300 text-red-700 dark:text-red-700',
  }

  const handleAction = useCallback((value: OperatorAction) => {
    setAction(value)
    if (value.type !== OperatorActionType.None) setIsOpen(true)
    sendGAEvent({
      event: 'initialize_staking_action',
      value: `action:${value.toString()}`,
    })
  }, [])

  const handleActionClose = useCallback(() => {
    setIsOpen(false)
    setAction({ type: OperatorActionType.None, operatorId: null })
  }, [])

  const orderBy = useMemo(
    () => ({ [sorting[0].id]: sorting[0].desc ? OrderBy.Desc : OrderBy.Asc }),
    [sorting],
  )

  const variables: NominationsListQueryVariables = useMemo(
    () => ({
      limit: 100,
      offset: undefined,
      orderBy,
      // eslint-disable-next-line camelcase
      where: subspaceAccount ? { account_id: { _eq: subspaceAccount } } : {},
    }),
    [orderBy, subspaceAccount],
  )

  const { loading, data, setIsVisible } = useIndexersQuery<
    NominationsListQuery,
    NominationsListQueryVariables
  >(NominationsListDocument, {
    variables,
    skip: !inView,
    pollInterval: 6000,
    context: { clientName: 'staking' },
  })

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  const nominatorsList = useMemo(
    () =>
      data
        ? data.staking_nominators.map((n) => {
            const depositHistory = n.deposits.map((d) => {
              const isPending = d.status === DepositStatus.PENDING_NEXT_EPOCH
              return {
                type: 'deposit',
                isPending,
                amount: d.total_amount,
                status: d.status,
                timestamp: d.timestamp,
                createdAt: d.created_at,
                extrinsicId: d.extrinsic_id,
                completionDate: isPending
                  ? 'At the next epoch (approx. 10 minutes)'
                  : utcToLocalRelativeTime(d.timestamp),
              }
            })
            const withdrawalHistory = n.withdrawals.map((w) => {
              const isPending = w.status !== WithdrawalStatus.FUNDS_UNLOCKED
              let completionDate: string | JSX.Element = isPending
                ? 'At the next epoch (approx. 10 minutes)'
                : utcToLocalRelativeTime(w.timestamp)
              if (w.status === WithdrawalStatus.PENDING_CHALLENGE_PERIOD) {
                const lastDomainBlockNumber = BigInt(n.domain?.last_domain_block_number)
                const domainBlockNumberReadyAt = BigInt(w.domain_block_number_ready_at)
                const estimatedRemainingTime =
                  (domainBlockNumberReadyAt - lastDomainBlockNumber) * BigInt(6)
                if (estimatedRemainingTime > 0)
                  completionDate = `In ${formatSeconds(estimatedRemainingTime)}`
                else completionDate = 'Ready to unlock'
              }
              if (w.status === WithdrawalStatus.PENDING_UNLOCK_FUNDS) {
                completionDate = 'After you unlock your funds'
              }
              if (w.status === WithdrawalStatus.FUNDS_UNLOCKED) {
                completionDate = (
                  <Link
                    key={`unlocked_at-${w.unlock_extrinsic_id}`}
                    data-testid={`unlocked_at-${w.unlock_extrinsic_id}`}
                    href={INTERNAL_ROUTES.extrinsics.id.page(
                      network,
                      Routes.consensus,
                      w.unlock_extrinsic_id,
                    )}
                    className='hover:text-primaryAccent'
                  >
                    <div>Unlocked on extrinsic {w.unlock_extrinsic_id}</div>
                  </Link>
                )
              }
              return {
                type: 'withdrawal',
                isPending,
                amount: w.total_amount > 0 ? w.total_amount : w.estimated_amount,
                status: w.status,
                timestamp: w.timestamp,
                createdAt: w.created_at,
                extrinsicId: w.withdraw_extrinsic_id,
                completionDate,
              }
            })
            const unlockedHistory = n.unlocked_events.map((u) => ({
              type: 'unlocked',
              isPending: false,
              amount: BigInt(u.amount) + BigInt(u.storage_fee),
              status: 'unlocked',
              timestamp: 'N/A (Coming soon)',
              createdAt: u.block_height,
              extrinsicId: u.extrinsic_id,
              completionDate: 'Effective immediately',
            }))
            const history = [...depositHistory, ...withdrawalHistory, ...unlockedHistory].sort(
              (a, b) => a.createdAt - b.createdAt,
            )
            return {
              ...n,
              history,
            }
          })
        : [],
    [data, network],
  )
  const totalCount = useMemo(
    () => (data && data.staking_nominators_aggregate.aggregate?.count) || 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const historyColumns = [
    columnHelper.accessor('type', {
      cell: (info) => {
        const type = info.getValue()
        const label = capitalizeFirstLetter(type)
        if (type === 'deposit')
          return (
            <span className='rounded-full text-sm bg-blue-200 px-2.5 py-1 text-blue-500 dark:bg-blue-800 dark:text-blue-300'>
              {label}
            </span>
          )
        if (type === 'withdrawal')
          return (
            <span className='rounded-full text-sm bg-red-200 px-2.5 py-1 text-red-500 dark:bg-red-800 dark:text-red-300'>
              {label}
            </span>
          )
        if (type === 'unlocked')
          return (
            <span className='rounded-full text-sm bg-green-200 px-2.5 py-1 text-green-700 dark:bg-green-800 dark:text-green-300'>
              {label}
            </span>
          )
        return label
      },
      header: 'Type',
    }),
    columnHelper.accessor('amount', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Amount',
    }),
    columnHelper.accessor('status', {
      cell: (info) => {
        const status = info.getValue()
        if (info.row.original.type === 'deposit') {
          if (status === DepositStatus.PENDING_NEXT_EPOCH)
            return (
              <Tooltip text='Deposit is pending for the next epoch'>
                <ClockIcon className='h-4 w-4 text-yellow-500' />
              </Tooltip>
            )
          if (status === DepositStatus.ACTIVE)
            return (
              <Tooltip text='Deposit is active'>
                <CheckBadgeIcon className='h-4 w-4 text-green-500' />
              </Tooltip>
            )
          return capitalizeFirstLetter(status)
        } else if (info.row.original.type === 'withdrawal') {
          if (status === WithdrawalStatus.PENDING_NEXT_EPOCH)
            return (
              <Tooltip text='Withdrawal is pending for the next epoch'>
                <ClockIcon className='h-4 w-4 text-yellow-500' />
              </Tooltip>
            )
          if (
            status === WithdrawalStatus.PENDING_UNLOCK_FUNDS ||
            info.row.original.lastDomainBlockNumber >=
              info.row.original.domain_block_number_ready_at
          )
            return (
              <Tooltip text='Withdrawal is pending that you unlock your funds'>
                <ClockIcon className='h-4 w-4 text-green-500' />
              </Tooltip>
            )
          if (status === WithdrawalStatus.PENDING_CHALLENGE_PERIOD)
            return (
              <Tooltip text='Withdrawal is pending for the challenge period'>
                <ClockIcon className='h-4 w-4 text-yellow-500' />
              </Tooltip>
            )
          if (status === WithdrawalStatus.FUNDS_UNLOCKED)
            return (
              <Tooltip text='Withdrawal is unlocked'>
                <CheckBadgeIcon className='h-4 w-4 text-green-500' />
              </Tooltip>
            )
          return capitalizeFirstLetter(status)
        } else if (info.row.original.type === 'unlocked') {
          return (
            <Tooltip text='Withdrawal is unlocked'>
              <CheckBadgeIcon className='h-4 w-4 text-green-500' />
            </Tooltip>
          )
        }
        return capitalizeFirstLetter(status)
      },
      header: 'Status',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => (
        <Tooltip text={utcToLocalTime(info.getValue())}>
          <div>{utcToLocalRelativeTime(info.getValue())}</div>
        </Tooltip>
      ),
      header: 'Date',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => (
        <Link
          key={`created_at-${info.getValue()}`}
          data-testid={`created_at-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-primaryAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Block height',
    }),
    columnHelper.accessor('extrinsicId', {
      cell: (info) => (
        <Link
          key={`extrinsic_id-${info.getValue()}`}
          data-testid={`extrinsic_id-${info.getValue()}`}
          href={INTERNAL_ROUTES.extrinsics.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-primaryAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Extrinsic',
    }),
  ]

  const pendingActionsColumns = [
    ...historyColumns,
    columnHelper.accessor('completionDate', {
      cell: (info) => <div>{info.getValue()}</div>,
      header: 'Expected Completion',
    }),
  ]

  return (
    <div className='flex w-full flex-col gap-5 px-4 align-middle'>
      {!subspaceAccount ? (
        <div className='flex flex-col items-center justify-center gap-4'>
          <span className='py-4 dark:text-white'>
            Please connect a substrate-compatible wallet to view your nominations.
          </span>
          <WalletButton />
        </div>
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <h2 id='accordion-open-heading-1'>
              <div className='flex w-full items-center justify-between truncate pb-5 text-left font-light text-gray-900 dark:text-white/75'>
                <span className='flex items-center'>Nominations ({totalLabel})</span>
              </div>
            </h2>
          </div>
          <div className='my-2' ref={ref}>
            {!loading ? (
              <div className='w-full space-y-4'>
                {nominatorsList.length > 0 ? (
                  nominatorsList.map((nominator, index) => (
                    <div
                      key={index}
                      className='w-full rounded-[20px] bg-grayLight p-4 shadow-lg dark:border dark:border-white dark:bg-transparent'
                    >
                      <div className='mb-4 flex flex-col items-start justify-between text-lg font-semibold dark:text-white sm:flex-row sm:items-center'>
                        <div className='mb-2 flex flex-col sm:mb-0'>
                          <span className='mr-2'>Operator # {nominator.operator_id}</span>
                          {nominator.domain && (
                            <span className='text-blueLighterAccent text-sm dark:text-buttonLightTo'>
                              on {capitalizeFirstLetter(nominator.domain.name)}
                            </span>
                          )}
                        </div>
                        <div className='w-1/3' />
                        <div className='flex flex-col text-sm font-normal'>
                          <span className='text-grayDark dark:text-buttonLightTo'>Total stake</span>
                          <span className='text-md font-semibold text-grayDark dark:text-blueLight'>
                            {bigNumberToFormattedString(nominator.operator?.current_total_stake)}{' '}
                            {tokenSymbol}
                          </span>
                        </div>
                        <div className='flex flex-col text-sm font-normal'>
                          <span className='text-grayDark dark:text-buttonLightTo'>1 day APY</span>
                          <span className='text-md font-semibold text-grayDark dark:text-blueLight'>
                            {numberFormattedString(nominator.operator?.apy1d * 100)}%
                          </span>
                        </div>
                        <div className='flex flex-col text-sm font-normal'>
                          <span className='text-grayDark dark:text-buttonLightTo'>7 day APY</span>
                          <span className='text-md font-semibold text-grayDark dark:text-blueLight'>
                            {numberFormattedString(nominator.operator?.apy7d * 100)}%
                          </span>
                        </div>
                        <div className='flex flex-col text-sm font-normal'>
                          <span className='text-grayDark dark:text-buttonLightTo'>30 day APY</span>
                          <span className='text-md font-semibold text-grayDark dark:text-blueLight'>
                            {numberFormattedString(nominator.operator?.apy30d * 100)}%
                          </span>
                        </div>
                        <div className='flex flex-col text-sm font-normal'>
                          <span
                            className={`text-sm rounded-full px-2.5 py-1 font-normal ${OPERATOR_STATUS_CLASSNAME[nominator.operator?.status as OperatorStatus]}`}
                          >
                            {allCapsToNormal(nominator.operator?.status ?? '')}
                          </span>
                        </div>
                        <div className='mt-2 sm:mt-0'>
                          {(() => {
                            const excludeActions = []
                            if (nominator.operator?.account_id !== subspaceAccount)
                              excludeActions.push(
                                OperatorActionType.Deregister,
                                OperatorActionType.UnlockNominator,
                              )
                            if (nominator.operator?.status === OperatorStatus.PENDING_NEXT_EPOCH)
                              excludeActions.push(OperatorActionType.Nominating)
                            if (nominator.operator?.status === OperatorStatus.ACTIVE)
                              excludeActions.push(OperatorActionType.UnlockNominator)
                            if (nominator.operator?.status === OperatorStatus.DEREGISTERED)
                              excludeActions.push(
                                OperatorActionType.Nominating,
                                OperatorActionType.Deregister,
                              )
                            if (
                              nominator.operator?.status === OperatorStatus.SLASHED ||
                              nominator.operator?.status === OperatorStatus.NOMINATORS_UNLOCKED
                            )
                              return <></>
                            return (
                              <OperatorActions
                                handleAction={handleAction}
                                row={
                                  {
                                    original: {
                                      id: nominator.operator_id,
                                      // eslint-disable-next-line camelcase
                                      current_total_shares: nominator.operator
                                        ? nominator.operator.current_total_shares
                                        : BIGINT_ZERO,
                                    },
                                  } as ActionsDropdownRow
                                }
                                excludeActions={excludeActions}
                              />
                            )
                          })()}
                        </div>
                      </div>
                      <div className='mb-4 w-full items-start justify-between text-lg font-semibold dark:text-white sm:flex-row sm:items-center'>
                        <PageTabs isDesktop={isDesktop}>
                          <Tab title='Overview'>
                            <div className='flex w-full flex-col items-start'>
                              <div className='w-full'>
                                <div className='mb-2 flex w-full items-center justify-between'>
                                  <div className='w-1/4'>
                                    <h4 className='text-md font-medium text-grayDark dark:text-blueLight'>
                                      Pending Actions
                                    </h4>
                                  </div>
                                  <div className='flex w-full items-end justify-end'>
                                    {nominator.operator?.status === OperatorStatus.ACTIVE && (
                                      <div className='ml-2 w-[200px]'>
                                        <NominationButton
                                          handleAction={handleAction}
                                          row={
                                            {
                                              original: {
                                                id: nominator.operator_id,
                                                // eslint-disable-next-line camelcase
                                                current_total_shares: nominator.operator
                                                  ? nominator.operator.current_total_shares
                                                  : BIGINT_ZERO,
                                              },
                                            } as ActionsDropdownRow
                                          }
                                        />
                                      </div>
                                    )}
                                    {nominator.operator?.status === OperatorStatus.ACTIVE && (
                                      <div className='ml-2 w-[200px]'>
                                        <WithdrawButton
                                          handleAction={handleAction}
                                          row={
                                            {
                                              original: {
                                                id: nominator.operator_id,
                                                // eslint-disable-next-line camelcase
                                                current_total_shares: nominator.operator
                                                  ? nominator.operator.current_total_shares
                                                  : BIGINT_ZERO,
                                              },
                                            } as ActionsDropdownRow
                                          }
                                        />
                                      </div>
                                    )}
                                    {nominator.withdrawals.find(
                                      (w) => w.status === WithdrawalStatus.PENDING_UNLOCK_FUNDS,
                                    ) && (
                                      <div className='ml-2 w-[200px]'>
                                        <UnlockFundsButton
                                          handleAction={handleAction}
                                          row={
                                            {
                                              original: {
                                                id: nominator.operator_id,
                                                // eslint-disable-next-line camelcase
                                                current_total_shares: nominator.operator
                                                  ? nominator.operator.current_total_shares
                                                  : BIGINT_ZERO,
                                              },
                                            } as ActionsDropdownRow
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <SortedTable
                                  data={nominator.history.filter((h) => h.isPending)}
                                  columns={pendingActionsColumns}
                                  showNavigation={false}
                                  pageCount={1}
                                  emptyMessage='No pending actions to show'
                                />
                              </div>
                            </div>
                          </Tab>
                          <Tab title='Transaction History'>
                            <div className='flex w-full flex-col items-start'>
                              <div className='w-full'>
                                <div className='mb-2 flex items-center justify-between'>
                                  <h4 className='text-md font-medium text-grayDark dark:text-blueLight'>
                                    Transaction History
                                  </h4>
                                </div>
                                <SortedTable
                                  data={nominator.history}
                                  columns={historyColumns}
                                  showNavigation={false}
                                  pageCount={1}
                                  emptyMessage='No staking transactions to show'
                                />
                              </div>
                            </div>
                          </Tab>
                        </PageTabs>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <span className='py-4 dark:text-white'>You have no nominations.</span>
                    <Link href={`/${network}/${Routes.staking}`}>
                      <button className='relative w-full cursor-pointer rounded-full bg-primaryAccent from-primaryAccent to-blueUndertone py-[10px] pl-3 pr-16 text-left font-["Montserrat"] text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gradient-to-r dark:text-white sm:text-sm md:pr-10'>
                        <div className='flex items-center justify-center'>
                          <span className='ml-2 w-28 text-center text-sm'>Operator list</span>
                        </div>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Spinner isSmall />
            )}
          </div>
          <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
        </>
      )}
    </div>
  )
}
