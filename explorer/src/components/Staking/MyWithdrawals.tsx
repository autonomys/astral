import { BIGINT_ZERO, SHARES_CALCULATION_MULTIPLIER } from 'constants/general'
import { INTERNAL_ROUTES } from 'constants/routes'
import useIndexers from 'hooks/useIndexers'
import useWallet from 'hooks/useWallet'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useConsensusStates } from 'states/consensus'
import { bigNumberToFormattedString } from 'utils/number'
import { SortedTable } from '../common/SortedTable'
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

interface MyUnlockedWithdrawalsProps {
  action: OperatorAction
  handleAction: (action: OperatorAction) => void
}

type MyUnlockedWithdrawal = {
  operatorId: {
    value: string
    sortValue: number | bigint
  }
  totalWithdrawalAmount: {
    value: string
    sortValue: number | bigint
  }
  totalStorageFeeRefund: {
    value: string
    sortValue: number | bigint
  }
  unlockAtConfirmedDomainBlockNumber: {
    value: string
    sortValue: number | bigint
  }
  total: {
    value: string
    sortValue: number | bigint
  }
}

export const MyUnlockedWithdrawals: FC<MyUnlockedWithdrawalsProps> = ({ action, handleAction }) => {
  const { subspaceAccount } = useWallet()
  const { section, network, tokenSymbol } = useIndexers()
  const { withdrawals } = useConsensusStates()

  const myUnlockedWithdrawals = useMemo(() => {
    const myUnlockedWithdrawals: MyUnlockedWithdrawal[] = []
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
        w.withdrawals.map((ww) => {
          myUnlockedWithdrawals.push({
            operatorId: {
              value: w.operatorId.toString(),
              sortValue: w.operatorId,
            },
            totalWithdrawalAmount: {
              value: `${bigNumberToFormattedString(w.totalWithdrawalAmount.toString())} ${tokenSymbol}`,
              sortValue: w.totalWithdrawalAmount,
            },
            totalStorageFeeRefund: {
              value: `${bigNumberToFormattedString(totalStorageFeeRefund.toString())} ${tokenSymbol}`,
              sortValue: totalStorageFeeRefund,
            },
            unlockAtConfirmedDomainBlockNumber: {
              value: ww.unlockAtConfirmedDomainBlockNumber.toString(),
              sortValue: ww.unlockAtConfirmedDomainBlockNumber,
            },
            total: {
              value: `${bigNumberToFormattedString(
                (w.totalWithdrawalAmount + totalStorageFeeRefund).toString(),
              )} ${tokenSymbol}`,
              sortValue: w.totalWithdrawalAmount + totalStorageFeeRefund,
            },
          })
        })
      })
    return myUnlockedWithdrawals
  }, [withdrawals, subspaceAccount, tokenSymbol])

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
                        className='hover:text-primaryAccent'
                        href={INTERNAL_ROUTES.operators.id.page(
                          network,
                          section,
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
                    accessorKey: 'total.sortValue',
                    header: 'Total Withdrawal Amount',
                    enableSorting: true,
                    cell: ({ row }) => <div>{row.original.total.value}</div>,
                  },
                  {
                    accessorKey: 'actions',
                    header: 'Actions',
                    enableSorting: false,
                    cell: ({ row }) => (
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
    [myUnlockedWithdrawals, network, section, action, handleAction],
  )

  return myUnlockedWithdrawalsList
}

export const MyPendingWithdrawals: FC = () => {
  const { subspaceAccount } = useWallet()
  const { section, network, tokenSymbol } = useIndexers()
  const { operators, withdrawals } = useConsensusStates()

  const myPendingWithdrawals = useMemo(
    () =>
      withdrawals
        .filter(
          (w) =>
            w.account === subspaceAccount &&
            w.withdrawalInShares &&
            w.withdrawalInShares.shares > BIGINT_ZERO,
        )
        .map((w) => {
          const op = operators.find((o) => o.id === w.operatorId.toString())
          const sharesValue =
            op && BigInt(op.currentTotalShares) > BIGINT_ZERO
              ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                BigInt(op.currentTotalShares)
              : BIGINT_ZERO
          const sharesWithdrawAmount = bigNumberToFormattedString(
            w.withdrawalInShares
              ? (w.withdrawalInShares.shares * sharesValue) / SHARES_CALCULATION_MULTIPLIER
              : BIGINT_ZERO,
          )
          const storageFeeWithdrawAmount = bigNumberToFormattedString(
            w.withdrawalInShares
              ? (w.withdrawalInShares.storageFeeRefund * sharesValue) /
                  SHARES_CALCULATION_MULTIPLIER
              : BIGINT_ZERO,
          )
          const total = w.withdrawalInShares
            ? ((w.withdrawalInShares.shares + w.withdrawalInShares.storageFeeRefund) *
                sharesValue) /
              SHARES_CALCULATION_MULTIPLIER
            : BIGINT_ZERO

          return {
            operatorId: {
              value: w.operatorId.toString(),
              sortValue: w.operatorId,
            },
            shares: {
              value: `${sharesWithdrawAmount} ${tokenSymbol}`,
              tooltip: w.withdrawalInShares
                ? `Shares: ${w.withdrawalInShares.shares.toString()} - Share value: ${sharesValue} - Total: ${sharesWithdrawAmount}`
                : '',
              sortValue: w.withdrawalInShares ? w.withdrawalInShares.shares : BIGINT_ZERO,
            },
            storageFeeRefund: {
              value: `${storageFeeWithdrawAmount} ${tokenSymbol}`,
              tooltip: w.withdrawalInShares
                ? `Storage Fee Refund: ${w.withdrawalInShares.storageFeeRefund.toString()} - Share value: ${sharesValue} - Total: ${storageFeeWithdrawAmount}`
                : '',
              sortValue: w.withdrawalInShares ? w.withdrawalInShares.storageFeeRefund : BIGINT_ZERO,
            },
            total: {
              value: `${bigNumberToFormattedString(total.toString())} ${tokenSymbol}`,
              sortValue: total,
            },
            unlockAtConfirmedDomainBlockNumber: {
              value: w.withdrawalInShares
                ? w.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString()
                : '',
              sortValue: w.withdrawalInShares
                ? w.withdrawalInShares.unlockAtConfirmedDomainBlockNumber
                : BIGINT_ZERO,
            },
          }
        }),
    [withdrawals, subspaceAccount, operators, tokenSymbol],
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
                        className='hover:text-primaryAccent'
                        href={INTERNAL_ROUTES.operators.id.page(
                          network,
                          section,
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
    [myPendingWithdrawals, network, section],
  )

  return myPendingWithdrawalsList
}
