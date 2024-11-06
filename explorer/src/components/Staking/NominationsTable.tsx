'use client'

import { utcToLocalRelativeTime } from '@/utils/time'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState, createColumnHelper } from '@tanstack/react-table'
import { Accordion } from 'components/common/Accordion'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { BIGINT_ZERO, TOKEN } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { OperatorPendingAction, OperatorStatus } from 'constants/staking'
import {
  NominationsListQuery,
  NominationsListQueryVariables,
  Order_By as OrderBy,
} from 'gql/graphql'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useViewStates } from 'states/view'
import { bigNumberToFormattedString, numberWithCommas } from 'utils/number'
import { capitalizeFirstLetter } from 'utils/string'
import { MyPositionSwitch } from '../common/MyPositionSwitch'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_NOMINATIONS_LIST } from './query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnHelper = createColumnHelper<any>()

export const NominationsTable: FC = () => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { network } = useChains()
  const [sorting] = useState<SortingState>([{ id: 'operator_id', desc: false }])
  const { myPositionOnly } = useViewStates()

  const [action, setAction] = useState<OperatorAction>({
    type: OperatorActionType.None,
    operatorId: null,
    maxShares: null,
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
    setAction({ type: OperatorActionType.None, operatorId: null, maxShares: null })
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
      where: myPositionOnly && subspaceAccount ? { account_id: { _eq: subspaceAccount } } : {},
    }),
    [myPositionOnly, orderBy, subspaceAccount],
  )

  const { loading, data, setIsVisible } = useSquidQuery<
    NominationsListQuery,
    NominationsListQueryVariables
  >(QUERY_NOMINATIONS_LIST, {
    variables,
    skip: !inView,
    pollInterval: 6000,
    context: { clientName: 'staking' },
  })

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  const nominatorsList = useMemo(() => data?.staking_nominators || [], [data])
  const totalCount = useMemo(
    () => (data && data.staking_nominators_aggregate.aggregate?.count) || 0,
    [data],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])

  const depositColumns = [
    columnHelper.accessor('amount', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${TOKEN.symbol}`,
      header: 'Amount',
    }),
    columnHelper.accessor('storage_fee_deposit', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${TOKEN.symbol}`,
      header: 'Storage Fee',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => utcToLocalRelativeTime(info.getValue()),
      header: 'Time',
    }),
    columnHelper.accessor('created_at', {
      cell: (info) => (
        <Link
          key={`created_at-${info.getValue()}`}
          data-testid={`created-at-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-primaryAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Created At',
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: 'Status',
    }),
  ]

  const withdrawalColumns = [
    columnHelper.accessor('shares', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${TOKEN.symbol}`,
      header: 'Shares',
    }),

    columnHelper.accessor('estimated_amount', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${TOKEN.symbol}`,
      header: 'Estimated Amount',
    }),
    columnHelper.accessor('unlocked_amount', {
      cell: (info) => (
        <div>{`${bigNumberToFormattedString(info.getValue() + info.row.original.unlocked_storage_fee)} ${TOKEN.symbol}`}</div>
      ),
      header: 'Unlocked Total Amount',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => utcToLocalRelativeTime(info.getValue()),
      header: 'Time',
    }),
    columnHelper.accessor('created_at', {
      cell: (info) => (
        <Link
          key={`created_at-${info.getValue()}`}
          data-testid={`created-at-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-primaryAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Created At',
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: 'Status',
    }),
  ]

  return (
    <div className='flex w-full flex-col gap-5 px-4 align-middle'>
      <div className='flex items-center justify-between'>
        <h2 id='accordion-open-heading-1'>
          <div className='flex w-full items-center justify-between truncate pb-5 text-left font-light text-gray-900 dark:text-white/75'>
            <span className='flex items-center'>Nominations ({totalLabel})</span>
          </div>
        </h2>
        {subspaceAccount && (
          <div className='flex w-48 items-center'>
            <MyPositionSwitch labels={['My nominations', 'All nominations']} />
          </div>
        )}
      </div>
      <div className='my-2' ref={ref}>
        {!loading ? (
          <div className='w-full space-y-4'>
            {nominatorsList.map((nominator, index) => (
              <div
                key={index}
                className='w-full rounded-[20px] bg-grayLight p-4 shadow-lg dark:border dark:border-white dark:bg-transparent'
              >
                <div className='mb-4 flex flex-col items-start justify-between text-lg font-semibold dark:text-white sm:flex-row sm:items-center'>
                  <div className='mb-2 sm:mb-0'>
                    <span className='mr-2'>Operator # {nominator.operator_id}</span>
                    {nominator.domain && (
                      <span className='ml-2 text-sm text-purpleLighterAccent dark:text-purpleShade'>
                        on {capitalizeFirstLetter(nominator.domain.name)}
                      </span>
                    )}
                  </div>
                  <div className='text-sm font-normal'>
                    Operator Status:{' '}
                    <span className='text-grayDark dark:text-purpleLight'>
                      {nominator.operator?.status || 'N/A'}
                    </span>
                  </div>
                  <div className='mt-2 sm:mt-0'>
                    {(() => {
                      const excludeActions = [
                        OperatorActionType.Deregister,
                        OperatorActionType.UnlockNominator,
                      ]

                      if (nominator.operator?.status === OperatorStatus.DEREGISTERED)
                        excludeActions.push(
                          OperatorActionType.Nominating,
                          OperatorActionType.Deregister,
                        )
                      if (
                        nominator.operator?.pending_action !==
                        OperatorPendingAction.READY_FOR_UNLOCK_NOMINATOR
                      )
                        excludeActions.push(OperatorActionType.UnlockNominator)

                      if (!nominator)
                        excludeActions.push(
                          OperatorActionType.Withdraw,
                          OperatorActionType.UnlockFunds,
                        )
                      if (
                        !nominator ||
                        nominator.unlock_at_confirmed_domain_block_number.length === 0
                      )
                        excludeActions.push(OperatorActionType.UnlockFunds)
                      if (nominator.operator?.status === OperatorStatus.SLASHED) return <></>
                      return (
                        <ActionsDropdown
                          action={action}
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
                          nominatorMaxShares={
                            nominator ? BigInt(nominator.known_shares) : BIGINT_ZERO
                          }
                        />
                      )
                    })()}
                  </div>
                </div>
                <div className='flex flex-col justify-between sm:flex-row'>
                  <div className='w-full sm:w-1/2 sm:pr-4'>
                    <h4 className='text-md mb-2 font-medium text-grayDark dark:text-purpleLight'>
                      Deposits
                    </h4>
                    <SortedTable
                      data={nominator.deposits}
                      columns={depositColumns}
                      showNavigation={false}
                      pageCount={1}
                      emptyMessage='No deposits to show'
                    />
                  </div>
                  <div className='w-full sm:mt-0 sm:w-1/2 sm:pl-4'>
                    <h4 className='text-md mb-2 font-medium text-grayDark dark:text-purpleLight'>
                      Withdrawals
                    </h4>
                    <SortedTable
                      data={nominator.withdrawals}
                      columns={withdrawalColumns}
                      showNavigation={false}
                      pageCount={1}
                      emptyMessage='No withdrawals to show'
                    />
                  </div>
                </div>
                <hr className='my-2' />
                <Accordion title='Additional Info' defaultOpen={false}>
                  <div className='text-sm text-grayDarker dark:text-white'>
                    <div className='mb-4'>
                      <strong>Status:</strong> {nominator.status}
                    </div>
                    <div className='mb-4'>
                      <strong>Pending Action:</strong> {nominator.pending_action}
                    </div>
                    <div className='flex flex-col sm:flex-row'>
                      <div className='w-full sm:w-1/2 sm:pr-2'>
                        <h5 className='mb-2 font-medium'>Deposits</h5>
                        <div>
                          <strong>Total Deposits:</strong>{' '}
                          {bigNumberToFormattedString(nominator.total_deposits)} {TOKEN.symbol}
                        </div>
                        <div>
                          <strong>Known Storage Fee Deposit:</strong>{' '}
                          {bigNumberToFormattedString(nominator.known_storage_fee_deposit)}{' '}
                          {TOKEN.symbol}
                        </div>
                        <div>
                          <strong>Pending Amount:</strong>{' '}
                          {bigNumberToFormattedString(nominator.pending_amount)} {TOKEN.symbol}
                        </div>
                        <div>
                          <strong>Pending Storage Fee Deposit:</strong>{' '}
                          {bigNumberToFormattedString(nominator.pending_storage_fee_deposit)}{' '}
                          {TOKEN.symbol}
                        </div>
                      </div>
                      <div className='mt-4 w-full sm:mt-0 sm:w-1/2 sm:pl-2'>
                        <h5 className='mb-2 font-medium'>Withdrawals</h5>
                        <div>
                          <strong>Known Shares:</strong>{' '}
                          {bigNumberToFormattedString(nominator.known_shares)}
                        </div>
                        <div>
                          <strong>Total Withdrawal Amounts:</strong>{' '}
                          {bigNumberToFormattedString(nominator.total_withdrawal_amounts)}{' '}
                          {TOKEN.symbol}
                        </div>
                        <div>
                          <strong>Total Storage Fee Refund:</strong>{' '}
                          {bigNumberToFormattedString(nominator.total_storage_fee_refund)}{' '}
                          {TOKEN.symbol}
                        </div>
                        <div>
                          <strong>Estimated Withdrawal:</strong>{' '}
                          {bigNumberToFormattedString(nominator.pending_shares)} {TOKEN.symbol}
                        </div>
                        <div>
                          <strong>Pending Storage Fee Refund:</strong>{' '}
                          {bigNumberToFormattedString(nominator.pending_storage_fee_refund)}{' '}
                          {TOKEN.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          <Spinner isSmall />
        )}
      </div>
      <ActionsModal isOpen={isOpen} action={action} onClose={handleActionClose} />
    </div>
  )
}
