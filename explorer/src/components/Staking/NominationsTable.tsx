'use client'

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

const CountdownTimer: FC<{ initialTime: bigint }> = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState<bigint>(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - BigInt(1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className='text-sm text-grayDark dark:text-blueLight'>
      Remaining Time: {remainingTime > BigInt(0) ? formatSeconds(remainingTime) : '0'}
    </span>
  )
}

export const NominationsTable: FC = () => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { network, tokenSymbol } = useIndexers()
  const [sorting] = useState<SortingState>([{ id: 'operator_id', desc: false }])

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
  })

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
        ? data.staking_nominators.map((n) => ({
            ...n,
            withdrawals: n.withdrawals.map((w) => ({
              ...w,
              operatorCurrentSharePrice: n.operator?.current_share_price,
              lastDomainBlockNumber: n.domain?.last_domain_block_number,
              unlockedEvents: n.unlocked_events.filter(
                (u) => u.block_height >= w.created_at + 14400,
              ),
            })),
          }))
        : [],
    [data],
  )
  const totalCount = useMemo(
    () => (data && data.staking_nominators_aggregate.aggregate?.count) || 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const depositColumns = [
    columnHelper.accessor('total_amount', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Total Amount',
    }),
    columnHelper.accessor('status', {
      cell: (info) => {
        const status = info.getValue()
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
      },
      header: 'Status',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => (
        <Tooltip text={utcToLocalTime(info.getValue())}>
          <div>{utcToLocalRelativeTime(info.getValue())}</div>
        </Tooltip>
      ),
      header: 'Deposit date',
    }),
    columnHelper.accessor('created_at', {
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
      header: 'Deposited on',
    }),
  ]

  const withdrawalColumns = [
    columnHelper.accessor('shares', {
      cell: (info) =>
        `${
          info.row.original.shares > 0
            ? bigNumberToFormattedString(
                (BigInt(info.row.original.shares) *
                  BigInt(info.row.original.operatorCurrentSharePrice)) /
                  BigInt(10 ** 18) +
                  BigInt(info.row.original.storage_fee_refund),
              )
            : '0'
        } ${tokenSymbol}`,
      header: 'Estimated Amount',
    }),
    columnHelper.accessor('status', {
      cell: (info) => {
        const status = info.getValue()
        if (status === WithdrawalStatus.PENDING_NEXT_EPOCH)
          return (
            <Tooltip text='Withdrawal is pending for the next epoch'>
              <ClockIcon className='h-4 w-4 text-yellow-500' />
            </Tooltip>
          )
        if (
          status === WithdrawalStatus.PENDING_UNLOCK_FUNDS ||
          info.row.original.lastDomainBlockNumber >= info.row.original.domain_block_number_ready_at
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
      },
      header: 'Status',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => (
        <Tooltip text={utcToLocalTime(info.getValue())}>
          <div>{utcToLocalRelativeTime(info.getValue())}</div>
        </Tooltip>
      ),
      header: 'Request date',
    }),
    columnHelper.accessor('created_at', {
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
      header: 'Requested on',
    }),
    columnHelper.accessor('unlocked_at', {
      cell: (info) => {
        const unlockedAt = info.getValue()
        const lastDomainBlockNumber = BigInt(info.row.original.lastDomainBlockNumber)
        const domainBlockNumberReadyAt = BigInt(info.row.original.domain_block_number_ready_at)
        const estimatedRemainingTime =
          (domainBlockNumberReadyAt - lastDomainBlockNumber) * BigInt(6)
        if (info.row.original.unlockedEvents.length > 0) return <>Unlocked</>
        if (estimatedRemainingTime <= BigInt(0)) return <>Ready to unlock</>
        if (unlockedAt === '0')
          return (
            <>
              Not unlocked <CountdownTimer initialTime={estimatedRemainingTime} />
            </>
          )
        return (
          <Link
            key={`unlocked_at-${info.getValue()}`}
            data-testid={`unlocked_at-${info.getValue()}`}
            href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
            className='hover:text-primaryAccent'
          >
            <div>{info.getValue()}</div>
          </Link>
        )
      },
      header: 'Unlocked on',
    }),
  ]

  const unlockedEventColumns = [
    columnHelper.accessor('amount', {
      cell: (info) =>
        `${bigNumberToFormattedString(
          BigInt(info.getValue()) + BigInt(info.row.original.storage_fee),
        )} ${tokenSymbol}`,
      header: 'Total',
    }),
    columnHelper.accessor('amount', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Staked',
    }),
    columnHelper.accessor('storage_fee', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Storage Fee',
    }),
    columnHelper.accessor('block_height', {
      cell: (info) => (
        <Link href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}>
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Block height',
    }),
    columnHelper.accessor('extrinsic_id', {
      cell: (info) => (
        <Link href={INTERNAL_ROUTES.extrinsics.id.page(network, Routes.consensus, info.getValue())}>
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Extrinsic',
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
                        <div className='mb-2 sm:mb-0'>
                          <span className='mr-2'>Operator # {nominator.operator_id}</span>
                          {nominator.domain && (
                            <span className='text-blueLighterAccent ml-2 text-sm dark:text-blueShade'>
                              on {capitalizeFirstLetter(nominator.domain.name)}
                            </span>
                          )}
                        </div>
                        <div className='text-sm font-normal'>
                          Total stake:{' '}
                          <span className='text-grayDark dark:text-blueLight'>
                            {bigNumberToFormattedString(nominator.operator?.current_total_stake)}{' '}
                            {tokenSymbol}
                          </span>
                        </div>
                        <div className='text-sm font-normal'>
                          1 day APY:{' '}
                          <span className='text-grayDark dark:text-blueLight'>
                            {numberFormattedString(nominator.operator?.apy1d * 100)}%
                          </span>
                        </div>
                        <div className='text-sm font-normal'>
                          7 day APY:{' '}
                          <span className='text-grayDark dark:text-blueLight'>
                            {numberFormattedString(nominator.operator?.apy7d * 100)}%
                          </span>
                        </div>
                        <div className='text-sm font-normal'>
                          30 day APY:{' '}
                          <span className='text-grayDark dark:text-blueLight'>
                            {numberFormattedString(nominator.operator?.apy30d * 100)}%
                          </span>
                        </div>
                        <div className='text-sm font-normal'>
                          Status:{' '}
                          <span className='text-grayDark dark:text-blueLight'>
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
                      <div className='flex flex-col justify-between sm:flex-row'>
                        <div className='w-full sm:w-1/2 sm:pr-4'>
                          <div className='mb-2 flex items-center justify-between'>
                            <h4 className='text-md font-medium text-grayDark dark:text-blueLight'>
                              Deposits
                            </h4>
                            {nominator.operator?.status === OperatorStatus.ACTIVE && (
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
                            )}
                          </div>
                          <SortedTable
                            data={nominator.deposits}
                            columns={depositColumns}
                            showNavigation={false}
                            pageCount={1}
                            emptyMessage='No deposits to show'
                          />
                        </div>
                        <div className='w-full sm:mt-0 sm:w-1/2 sm:pl-4'>
                          <div className='mb-2 flex items-center justify-between'>
                            <h4 className='text-md font-medium text-grayDark dark:text-blueLight'>
                              Withdrawals Requested
                            </h4>
                            <div className='flex gap-2'>
                              {nominator.operator?.status === OperatorStatus.ACTIVE && (
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
                              )}
                              {nominator.withdrawals.find(
                                (w) =>
                                  (w.status === WithdrawalStatus.PENDING_UNLOCK_FUNDS ||
                                    w.lastDomainBlockNumber >= w.domain_block_number_ready_at) &&
                                  w.unlockedEvents.length === 0,
                              ) && (
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
                              )}
                            </div>
                          </div>
                          <SortedTable
                            data={nominator.withdrawals}
                            columns={withdrawalColumns}
                            showNavigation={false}
                            pageCount={1}
                            emptyMessage='No withdrawals to show'
                          />
                        </div>
                      </div>
                      {nominator.unlocked_events.length > 0 && (
                        <div className='flex flex-col gap-2'>
                          <h4 className='text-md font-medium text-grayDark dark:text-blueLight'>
                            Unlocked Funds
                          </h4>
                          <SortedTable
                            data={nominator.unlocked_events}
                            columns={unlockedEventColumns}
                            showNavigation={false}
                            pageCount={1}
                            emptyMessage='No unlocked events to show'
                          />
                        </div>
                      )}
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
