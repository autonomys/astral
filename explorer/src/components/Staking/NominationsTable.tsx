'use client'

import useChains from '@/hooks/useChains'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState, createColumnHelper } from '@tanstack/react-table'
import { Accordion } from 'components/common/Accordion'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { BIGINT_ZERO, INTERNAL_ROUTES, Routes, TOKEN } from 'constants/'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Order_By as OrderBy,
  UserNominationsPendingActionsQuery,
  UserNominationsPendingActionsQueryVariables,
} from 'gql/types/staking'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { bigNumberToFormattedString } from 'utils/number'
import { capitalizeFirstLetter } from 'utils/string'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'
import { QUERY_USER_NOMINATIONS_PENDING_ACTIONS } from './staking.query'

dayjs.extend(relativeTime)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnHelper = createColumnHelper<any>()

export const NominationsTable: FC = () => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { network } = useChains()
  const [sorting] = useState<SortingState>([{ id: 'operator_id', desc: false }])

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

  const variables: UserNominationsPendingActionsQueryVariables = useMemo(
    () => ({
      limit: 100,
      offset: undefined,
      orderBy,
      // eslint-disable-next-line camelcase
      where: { account_id: { _eq: subspaceAccount } },
    }),
    [orderBy, subspaceAccount],
  )

  const { loading, data, setIsVisible } = useSquidQuery<
    UserNominationsPendingActionsQuery,
    UserNominationsPendingActionsQueryVariables
  >(QUERY_USER_NOMINATIONS_PENDING_ACTIONS, {
    variables,
    skip: !inView,
    pollInterval: 6000,
    context: { clientName: 'staking' },
  })

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  const nominatorsList = useMemo(() => data?.nominator || [], [data])

  const depositColumns = [
    columnHelper.accessor('amount', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${TOKEN.symbol}`,
      header: 'Amount',
    }),
    columnHelper.accessor('storage_fee_deposit', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${TOKEN.symbol}`,
      header: 'Storage Fee Deposit',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => dayjs(info.getValue()).fromNow(),
      header: 'Timestamp',
    }),
    columnHelper.accessor('block_number', {
      cell: (info) => (
        <Link
          key={`created_at-${info.getValue()}`}
          data-testid={`created-at-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-purpleAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Block Number',
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
    columnHelper.accessor('timestamp', {
      cell: (info) => new Date(info.getValue()).toLocaleString(),
      header: 'Timestamp',
    }),
    columnHelper.accessor('block_number', {
      cell: (info) => (
        <Link
          key={`created_at-${info.getValue()}`}
          data-testid={`created-at-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-purpleAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Block Number',
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: 'Status',
    }),
  ]

  return (
    <div className='flex w-full flex-col gap-5 px-4 align-middle'>
      <div className='my-2' ref={ref}>
        {!loading ? (
          <div className='w-full space-y-4'>
            {nominatorsList.map((nominator, index) => (
              <div
                key={index}
                className='w-full rounded-[20px] bg-transparent p-4 shadow-lg dark:border dark:border-white dark:bg-transparent'
              >
                <div className='mb-4 flex items-center justify-between text-lg font-semibold text-white'>
                  <div>
                    <span className='mr-2'>Operator # {nominator.operator_id}</span>
                    {nominator.domain && (
                      <span className='ml-2 text-sm text-gray-400'>
                        on {capitalizeFirstLetter(nominator.domain.name)}
                      </span>
                    )}
                  </div>
                  <div className='text-sm font-normal'>Operator Status: {nominator.status}</div>
                  <div>
                    {(() => {
                      const excludeActions = [
                        OperatorActionType.Deregister,
                        OperatorActionType.UnlockNominator,
                      ]

                      if (nominator.operator?.status === 'REGISTERED')
                        excludeActions.push(
                          OperatorActionType.Deregister,
                          OperatorActionType.Nominating,
                        )
                      else if (nominator.operator?.status === 'DEREGISTERED')
                        excludeActions.push(OperatorActionType.Nominating)
                      else if (nominator.operator?.status === 'READY_TO_UNLOCK')
                        excludeActions.push(
                          OperatorActionType.Nominating,
                          OperatorActionType.Deregister,
                        )
                      else excludeActions.push(OperatorActionType.UnlockNominator)

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
                      if (nominator.operator?.status === 'SLASHED') return <></>
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
                <div className='flex justify-between'>
                  <div className='w-1/2 pr-4'>
                    <h4 className='text-md mb-2 font-medium text-purpleLight'>Deposits</h4>
                    <SortedTable
                      data={nominator.deposits}
                      columns={depositColumns}
                      showNavigation={false}
                      pageCount={1}
                    />
                  </div>
                  <div className='w-1/2 pl-4'>
                    <h4 className='text-md mb-2 font-medium text-purpleLight'>Withdrawals</h4>
                    <SortedTable
                      data={nominator.withdrawals}
                      columns={withdrawalColumns}
                      showNavigation={false}
                      pageCount={1}
                    />
                  </div>
                </div>
                <hr className='my-2' />
                <Accordion title='Additional Info' defaultOpen={false}>
                  <div className='text-sm text-white'>
                    <div className='mb-4'>
                      <strong>Status:</strong> {nominator.status}
                    </div>
                    <div className='flex'>
                      <div className='w-1/2 pr-2'>
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
                      <div className='w-1/2 pl-2'>
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
