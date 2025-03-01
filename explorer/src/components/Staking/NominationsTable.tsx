'use client'

import { operatorStatus } from '@/utils/operator'
import { allCapsToNormal } from '@/utils/string'
import { capitalizeFirstLetter } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { SortingState, createColumnHelper } from '@tanstack/react-table'
import { Accordion } from 'components/common/Accordion'
import { SortedTable } from 'components/common/SortedTable'
import { Spinner } from 'components/common/Spinner'
import { BIGINT_ZERO } from 'constants/general'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import { OperatorStatus } from 'constants/staking'
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
import { bigNumberToFormattedString, numberWithCommas } from 'utils/number'
import { utcToLocalRelativeTime } from 'utils/time'
import { WalletButton } from '../WalletButton'
import { ActionsDropdown, ActionsDropdownRow } from './ActionsDropdown'
import { ActionsModal, OperatorAction, OperatorActionType } from './ActionsModal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnHelper = createColumnHelper<any>()

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
            // eslint-disable-next-line camelcase
            withdrawal_histories: n.withdrawal_histories.map((w) => ({
              ...w,
              operatorCurrentSharePrice: n.operator?.current_share_price,
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
    columnHelper.accessor('amount_pending', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Pending Amount',
    }),
    columnHelper.accessor('storage_fee_deposit_pending', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Pending Storage Fee',
    }),
    columnHelper.accessor('storage_fee_deposit', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Storage Fee',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => utcToLocalRelativeTime(info.getValue()),
      header: 'Time',
    }),
    // columnHelper.accessor('shares', {
    //   cell: (info) => info.getValue(),
    //   header: 'Shares',
    // }),
    columnHelper.accessor('block_height', {
      cell: (info) => (
        <Link
          key={`block_height-${info.getValue()}`}
          data-testid={`block_height-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-primaryAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Block Height',
    }),
  ]

  const withdrawalColumns = [
    columnHelper.accessor('shares', {
      cell: (info) =>
        `${bigNumberToFormattedString(
          (BigInt(info.row.original.shares) * BigInt(info.row.original.operatorCurrentSharePrice)) /
            BigInt(10 ** 18),
        )} ${tokenSymbol}`,
      header: 'Estimated Amount',
    }),
    columnHelper.accessor('storage_fee_refund', {
      cell: (info) => `${bigNumberToFormattedString(info.getValue())} ${tokenSymbol}`,
      header: 'Storage Fee Refund',
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => utcToLocalRelativeTime(info.getValue()),
      header: 'Time',
    }),
    columnHelper.accessor('block_height', {
      cell: (info) => (
        <Link
          key={`block_height-${info.getValue()}`}
          data-testid={`block_height-${info.getValue()}`}
          href={INTERNAL_ROUTES.blocks.id.page(network, Routes.consensus, info.getValue())}
          className='hover:text-primaryAccent'
        >
          <div>{info.getValue()}</div>
        </Link>
      ),
      header: 'Block Height',
    }),
  ]

  return (
    <div className='flex w-full flex-col gap-5 px-4 align-middle'>
      {!subspaceAccount ? (
        <div className='flex flex-col items-center justify-center gap-4'>
          <span className='py-4'>
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
                          Operator Status:{' '}
                          <span className='text-grayDark dark:text-blueLight'>
                            {allCapsToNormal(
                              operatorStatus(JSON.parse(nominator.operator?.status ?? '{}')),
                            )}
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
                              />
                            )
                          })()}
                        </div>
                      </div>
                      <div className='flex flex-col justify-between sm:flex-row'>
                        <div className='w-full sm:w-1/2 sm:pr-4'>
                          <h4 className='text-md mb-2 font-medium text-grayDark dark:text-blueLight'>
                            Deposits
                          </h4>
                          <SortedTable
                            data={nominator.deposit_histories}
                            columns={depositColumns}
                            showNavigation={false}
                            pageCount={1}
                            emptyMessage='No deposits to show'
                          />
                        </div>
                        <div className='w-full sm:mt-0 sm:w-1/2 sm:pl-4'>
                          <h4 className='text-md mb-2 font-medium text-grayDark dark:text-blueLight'>
                            Withdrawals
                          </h4>
                          <SortedTable
                            data={nominator.withdrawal_histories}
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
                          <div className='flex flex-col sm:flex-row'>
                            <div className='w-full sm:w-1/2 sm:pr-2'>
                              <h5 className='mb-2 font-medium'>Deposits</h5>
                              <div>
                                <strong>Total Deposits:</strong>{' '}
                                {bigNumberToFormattedString(nominator.total_deposits)} {tokenSymbol}
                              </div>
                              <div>
                                <strong>Known Storage Fee Deposit:</strong>{' '}
                                {bigNumberToFormattedString(nominator.known_storage_fee_deposit)}{' '}
                                {tokenSymbol}
                              </div>
                              <div>
                                <strong>Pending Amount:</strong>{' '}
                                {bigNumberToFormattedString(nominator.pending_amount)} {tokenSymbol}
                              </div>
                              <div>
                                <strong>Pending Storage Fee Deposit:</strong>{' '}
                                {bigNumberToFormattedString(nominator.pending_storage_fee_deposit)}{' '}
                                {tokenSymbol}
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
                                {tokenSymbol}
                              </div>
                              <div>
                                <strong>Total Storage Fee Refund:</strong>{' '}
                                {bigNumberToFormattedString(nominator.total_storage_fee_refund)}{' '}
                                {tokenSymbol}
                              </div>
                              <div>
                                <strong>Estimated Withdrawal:</strong>{' '}
                                {bigNumberToFormattedString(nominator.pending_shares)} {tokenSymbol}
                              </div>
                              <div>
                                <strong>Pending Storage Fee Refund:</strong>{' '}
                                {bigNumberToFormattedString(nominator.pending_storage_fee_refund)}{' '}
                                {tokenSymbol}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <span className='py-4'>You have no nominations.</span>
                    <Link href={`/${network}/${Routes.staking}`}>
                      <button className='relative w-full cursor-default rounded-full bg-primaryAccent from-primaryAccent to-blueUndertone py-[10px] pl-3 pr-16 text-left font-["Montserrat"] text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gradient-to-r dark:text-white sm:text-sm md:pr-10'>
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
