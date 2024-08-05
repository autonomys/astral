import { INTERNAL_ROUTES } from '@/constants'
import { bigNumberToNumber, bigNumberToString } from '@/utils/number'
import { BIGINT_ZERO, SHARES_CALCULATION_MULTIPLIER } from 'constants/general'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useConsensusStates } from 'states/consensus'
import { SortedTable } from '../common/SortedTable'
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

interface MyUnlockedWithdrawalsProps {
  action: OperatorAction
  handleAction: (action: OperatorAction) => void
}

export const MyUnlockedWithdrawals: FC<MyUnlockedWithdrawalsProps> = ({ action, handleAction }) => {
  const { subspaceAccount } = useWallet()
  const { selectedChain, selectedDomain } = useDomains()
  const { withdrawals } = useConsensusStates()
  const myUnlockedWithdrawals = useMemo(
    () =>
      withdrawals
        .filter(
          (w) =>
            w.account === subspaceAccount &&
            w.totalWithdrawalAmount > BIGINT_ZERO &&
            w.withdrawals.length > 0,
        )
        .map((w) => {
          const totalStorageFeeRefund = w.withdrawals.reduce(
            (acc, w) => acc + w.storageFeeRefund,
            BIGINT_ZERO,
          )
          return {
            operatorId: {
              value: w.operatorId.toString(),
              sortValue: w.operatorId,
            },
            totalWithdrawalAmount: {
              value: `${bigNumberToString(w.totalWithdrawalAmount.toString())} ${selectedChain.token.symbol}`,
              sortValue: w.totalWithdrawalAmount,
            },
            totalStorageFeeRefund: {
              value: `${bigNumberToString(
                totalStorageFeeRefund.toString(),
              )} ${selectedChain.token.symbol}`,
              sortValue: totalStorageFeeRefund,
            },
            unlockAtConfirmedDomainBlockNumber: {
              value: w.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString(),
              sortValue: w.withdrawalInShares.unlockAtConfirmedDomainBlockNumber,
            },
            withdrawalsCount: {
              value: w.withdrawals.length.toString(),
              sortValue: w.withdrawals.length,
            },
            total: {
              value: `${bigNumberToString(
                (w.totalWithdrawalAmount + totalStorageFeeRefund).toString(),
              )} ${selectedChain.token.symbol}`,
              sortValue: w.totalWithdrawalAmount + totalStorageFeeRefund,
            },
          }
        }),
    [withdrawals, subspaceAccount, selectedChain.token.symbol],
  )

  const myUnlockedWithdrawalsList = useMemo(
    () =>
      myUnlockedWithdrawals.length > 0 && (
        <div className='mt-5 flex flex-col gap-2'>
          <div className='text-base font-medium text-grayDark dark:text-white'>
            My Withdrawals ready to be Unlocked ({myUnlockedWithdrawals.length})
          </div>
          <div className='flex w-full flex-col sm:mt-0'>
            <div className='my-6 rounded'>
              <SortedTable
                data={myUnlockedWithdrawals}
                columns={[
                  {
                    accessorKey: 'operatorId.sortValue',
                    header: 'Operator Id',
                    enableSorting: true,
                    cell: ({ row }) => (
                      <Link
                        className='hover:text-purpleAccent'
                        href={INTERNAL_ROUTES.operators.id.page(
                          selectedChain.urls.page,
                          selectedDomain,
                          row.original.operatorId.value,
                        )}
                      >
                        <div>{row.original.operatorId.value}</div>
                      </Link>
                    ),
                  },
                  {
                    accessorKey: 'totalWithdrawalAmount.sortValue',
                    header: 'Withdrawal Amount',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.totalWithdrawalAmount.value}</div>,
                  },
                  {
                    accessorKey: 'totalStorageFeeRefund.sortValue',
                    header: 'Storage Fee Refund',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.totalStorageFeeRefund.value}</div>,
                  },
                  {
                    accessorKey: 'unlockAtConfirmedDomainBlockNumber.sortValue',
                    header: 'Withdrawal at Domain Block Number',
                    enableSorting: true,
                    cell: ({ row }) => (
                      <div>{row.original.unlockAtConfirmedDomainBlockNumber.value}</div>
                    ),
                  },
                  {
                    accessorKey: 'withdrawalsCount.sortValue',
                    header: 'Withdrawals Count',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.withdrawalsCount.value}</div>,
                  },
                  {
                    accessorKey: 'total.sortValue',
                    header: 'Total Withdrawal Amount',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.total.value}</div>,
                  },
                  {
                    accessorKey: 'actions',
                    header: 'Actions',
                    enableSorting: false,
                    cell: ({ row }) => {
                      return (
                        <ActionsDropdown
                          action={action}
                          handleAction={handleAction}
                          row={{
                            original: {
                              id: row.original.operatorId.toString(),
                              // eslint-disable-next-line camelcase
                              current_total_shares: BIGINT_ZERO,
                            },
                          }}
                          excludeActions={[
                            OperatorActionType.Nominating,
                            OperatorActionType.Withdraw,
                            OperatorActionType.Deregister,
                          ]}
                        />
                      )
                    },
                  },
                ]}
                showNavigation={false}
                pageCount={1}
                filename='staking-my-pending-withdrawals-list'
              />
            </div>
          </div>
        </div>
      ),
    [myUnlockedWithdrawals, selectedChain.urls.page, selectedDomain, action, handleAction],
  )

  return myUnlockedWithdrawalsList
}

export const MyPendingWithdrawals: FC = () => {
  const { subspaceAccount } = useWallet()
  const { selectedChain, selectedDomain } = useDomains()
  const { operators, withdrawals } = useConsensusStates()
  const myPendingWithdrawals = useMemo(
    () =>
      withdrawals
        .filter((w) => w.account === subspaceAccount && w.withdrawalInShares.shares > BIGINT_ZERO)
        .map((w) => {
          const op = operators.find((o) => o.id === w.operatorId.toString())
          const sharesValue =
            op && BigInt(op.currentTotalShares) > BIGINT_ZERO
              ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                BigInt(op.currentTotalShares)
              : BIGINT_ZERO
          const sharesWithdrawAmount = bigNumberToNumber(
            (w.withdrawalInShares.shares * sharesValue) / SHARES_CALCULATION_MULTIPLIER,
          )
          const storageFeeWithdrawAmount = bigNumberToNumber(
            (w.withdrawalInShares.storageFeeRefund * sharesValue) / SHARES_CALCULATION_MULTIPLIER,
          )
          const total =
            ((w.withdrawalInShares.shares + w.withdrawalInShares.storageFeeRefund) * sharesValue) /
            SHARES_CALCULATION_MULTIPLIER

          return {
            operatorId: {
              value: w.operatorId.toString(),
              sortValue: w.operatorId,
            },
            shares: {
              value: `${sharesWithdrawAmount} ${selectedChain.token.symbol}`,
              tooltip: `Shares: ${w.withdrawalInShares.shares.toString()} - Share value: ${sharesValue} - Total: ${sharesWithdrawAmount}`,
              sortValue: w.withdrawalInShares.shares,
            },
            storageFeeRefund: {
              value: `${storageFeeWithdrawAmount} ${selectedChain.token.symbol}`,
              tooltip: `Storage Fee Refund: ${w.withdrawalInShares.storageFeeRefund.toString()} - Share value: ${sharesValue} - Total: ${storageFeeWithdrawAmount}`,
              sortValue: w.withdrawalInShares.storageFeeRefund,
            },
            total: {
              value: `${bigNumberToString(total.toString())} ${selectedChain.token.symbol}`,
              sortValue: total,
            },
            unlockAtConfirmedDomainBlockNumber: {
              value: w.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString(),
              sortValue: w.withdrawalInShares.unlockAtConfirmedDomainBlockNumber,
            },
          }
        }),
    [withdrawals, subspaceAccount, operators, selectedChain.token.symbol],
  )

  const myPendingWithdrawalsList = useMemo(
    () =>
      myPendingWithdrawals.length > 0 && (
        <div className='mt-2 flex flex-col gap-2'>
          <div className='text-base font-medium text-grayDark dark:text-white'>
            My Pending Withdrawals ({myPendingWithdrawals.length})
          </div>
          <div className='flex w-full flex-col sm:mt-0'>
            <div className='my-6 rounded'>
              <SortedTable
                data={myPendingWithdrawals}
                columns={[
                  {
                    accessorKey: 'operatorId.sortValue',
                    header: 'Operator Id',
                    enableSorting: true,
                    cell: ({ row }) => (
                      <Link
                        className='hover:text-purpleAccent'
                        href={INTERNAL_ROUTES.operators.id.page(
                          selectedChain.urls.page,
                          selectedDomain,
                          row.original.operatorId.value,
                        )}
                      >
                        <div>{row.original.operatorId.value}</div>
                      </Link>
                    ),
                  },
                  {
                    accessorKey: 'shares.sortValue',
                    header: 'Withdrawal Amount',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.shares.value}</div>,
                  },
                  {
                    accessorKey: 'storageFeeRefund.sortValue',
                    header: 'Storage Fee Refund',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.storageFeeRefund.value}</div>,
                  },
                  {
                    accessorKey: 'total.sortValue',
                    header: 'Total Withdrawal Amount',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.total.value}</div>,
                  },
                  {
                    accessorKey: 'unlockAtConfirmedDomainBlockNumber.sortValue',
                    header: 'Withdrawal at Domain Block Number',
                    enableSorting: true,
                    cell: ({ row }) => (
                      <div>{row.original.unlockAtConfirmedDomainBlockNumber.value}</div>
                    ),
                  },
                ]}
                showNavigation={false}
                pageCount={1}
                filename='staking-my-pending-withdrawals-list'
              />
            </div>
          </div>
        </div>
      ),
    [myPendingWithdrawals, selectedChain.urls.page, selectedDomain],
  )

  return myPendingWithdrawalsList
}
