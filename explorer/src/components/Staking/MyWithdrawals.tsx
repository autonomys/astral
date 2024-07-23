import { bigNumberToNumber, bigNumberToString } from '@/utils/number'
import { BIGINT_ZERO, SHARES_CALCULATION_MULTIPLIER } from 'constants/general'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import { FC, useMemo } from 'react'
import { useConsensusStates } from 'states/consensus'
import { SortedTable } from '../common/SortedTable'
import { Tooltip } from '../common/Tooltip'
import { ActionsDropdown } from './ActionsDropdown'
import { OperatorAction, OperatorActionType } from './ActionsModal'

interface MyUnlockedWithdrawalsProps {
  action: OperatorAction
  handleAction: (action: OperatorAction) => void
}

export const MyUnlockedWithdrawals: FC<MyUnlockedWithdrawalsProps> = ({ action, handleAction }) => {
  const { subspaceAccount } = useWallet()
  const { selectedChain } = useDomains()
  const { withdrawals } = useConsensusStates()
  const myUnlockedWithdrawals = useMemo(
    () =>
      withdrawals.filter(
        (w) =>
          w.account === subspaceAccount &&
          w.totalWithdrawalAmount > BIGINT_ZERO &&
          w.withdrawals.length > 0,
      ),
    [withdrawals, subspaceAccount],
  )

  const myUnlockedWithdrawalsList = useMemo(
    () =>
      myUnlockedWithdrawals.length > 0 && (
        <div className='mt-5 flex flex-col gap-2'>
          <div className='text-base font-medium text-grayDark dark:text-white'>
            My Unlocked Withdrawals ({myUnlockedWithdrawals.length})
          </div>
          <div className='flex w-full flex-col sm:mt-0'>
            <div className='my-6 rounded'>
              <SortedTable
                data={myUnlockedWithdrawals}
                columns={[
                  {
                    accessorKey: 'operatorId',
                    header: 'Operator Id',
                    enableSorting: false,
                    cell: ({ row }) => <div>{row.original.operatorId}</div>,
                  },
                  {
                    accessorKey: 'totalWithdrawalAmount',
                    header: 'Withdrawal Amount',
                    enableSorting: false,
                    cell: ({ row }) => (
                      <div>
                        {bigNumberToString(row.original.totalWithdrawalAmount.toString())}{' '}
                        {selectedChain.token.symbol}
                      </div>
                    ),
                  },
                  {
                    accessorKey: 'totalStorageFeeRefund',
                    header: 'Storage Fee Refund',
                    enableSorting: false,
                    cell: ({ row }) => {
                      const totalStorageFeeRefund =
                        row.original.withdrawals &&
                        row.original.withdrawals.reduce(
                          (acc, w) => acc + w.storageFeeRefund,
                          BIGINT_ZERO,
                        )
                      return (
                        <div>
                          {bigNumberToString(totalStorageFeeRefund.toString())}{' '}
                          {selectedChain.token.symbol}
                        </div>
                      )
                    },
                  },
                  {
                    accessorKey: 'withdrawalInShares.unlockAtConfirmedDomainBlockNumber',
                    header: 'Withdrawal at Domain Block Number',
                    enableSorting: false,
                    cell: ({ row }) => {
                      return (
                        <div>
                          {row.original.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString()}
                        </div>
                      )
                    },
                  },
                  {
                    accessorKey: 'withdrawals',
                    header: 'Withdrawals',
                    enableSorting: false,
                    cell: ({ row }) => <div>{row.original.withdrawals.length}</div>,
                  },
                  {
                    accessorKey: 'total',
                    header: 'Total Withdrawal Amount',
                    enableSorting: false,
                    cell: ({ row }) => {
                      const totalStorageFeeRefund =
                        row.original.withdrawals &&
                        row.original.withdrawals.reduce(
                          (acc, w) => acc + w.storageFeeRefund,
                          BIGINT_ZERO,
                        )
                      const total = totalStorageFeeRefund
                        ? BigInt(row.original.totalWithdrawalAmount) + totalStorageFeeRefund
                        : BigInt(row.original.totalWithdrawalAmount)
                      return (
                        <div>
                          {bigNumberToString(total.toString())} {selectedChain.token.symbol}
                        </div>
                      )
                    },
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
                              totalShares: BIGINT_ZERO,
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
    [action, handleAction, myUnlockedWithdrawals, selectedChain.token.symbol],
  )

  return myUnlockedWithdrawalsList
}

export const MyPendingWithdrawals: FC = () => {
  const { subspaceAccount } = useWallet()
  const { selectedChain } = useDomains()
  const { operators, withdrawals } = useConsensusStates()
  const myPendingWithdrawals = useMemo(
    () =>
      withdrawals.filter(
        (w) => w.account === subspaceAccount && w.withdrawalInShares.shares > BIGINT_ZERO,
      ),
    [withdrawals, subspaceAccount],
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
                    accessorKey: 'operatorId',
                    header: 'Operator Id',
                    enableSorting: false,
                    cell: ({ row }) => <div>{row.original.operatorId}</div>,
                  },
                  {
                    accessorKey: 'shares',
                    header: 'Withdrawal Amount',
                    enableSorting: false,
                    cell: ({ row }) => {
                      const op = operators.find((o) => o.id === row.original.operatorId.toString())
                      const sharesValue =
                        op && BigInt(op.currentTotalShares) > BIGINT_ZERO
                          ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                            BigInt(op.currentTotalShares)
                          : BIGINT_ZERO
                      const withdrawAmount = bigNumberToNumber(
                        (row.original.withdrawalInShares.shares * sharesValue) /
                          SHARES_CALCULATION_MULTIPLIER,
                      )
                      return (
                        <div>
                          <Tooltip
                            text={`Shares: ${row.original.withdrawalInShares.shares.toString()} - Share value: ${sharesValue} - Total: ${withdrawAmount}`}
                          >
                            {withdrawAmount} {selectedChain.token.symbol}
                          </Tooltip>
                        </div>
                      )
                    },
                  },
                  {
                    accessorKey: 'storageFeeRefund',
                    header: 'Storage Fee Refund',
                    enableSorting: false,
                    cell: ({ row }) => {
                      const op = operators.find((o) => o.id === row.original.operatorId.toString())
                      const sharesValue =
                        op && BigInt(op.currentTotalShares) > BIGINT_ZERO
                          ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                            BigInt(op.currentTotalShares)
                          : BIGINT_ZERO
                      const withdrawAmount = bigNumberToNumber(
                        (row.original.withdrawalInShares.storageFeeRefund * sharesValue) /
                          SHARES_CALCULATION_MULTIPLIER,
                      )
                      return (
                        <div>
                          <Tooltip
                            text={`Shares: ${row.original.withdrawalInShares.storageFeeRefund.toString()} - Share value: ${sharesValue} - Total: ${withdrawAmount}`}
                          >
                            {withdrawAmount} {selectedChain.token.symbol}
                          </Tooltip>
                        </div>
                      )
                    },
                  },
                  {
                    accessorKey: 'total',
                    header: 'Total Withdrawal Amount',
                    enableSorting: false,
                    cell: ({ row }) => {
                      const op = operators.find((o) => o.id === row.original.operatorId.toString())
                      const sharesValue =
                        op && BigInt(op.currentTotalShares) > BIGINT_ZERO
                          ? (BigInt(op.currentTotalStake) * SHARES_CALCULATION_MULTIPLIER) /
                            BigInt(op.currentTotalShares)
                          : BIGINT_ZERO
                      const withdrawAmount = bigNumberToNumber(
                        ((row.original.withdrawalInShares.shares +
                          row.original.withdrawalInShares.storageFeeRefund) *
                          sharesValue) /
                          SHARES_CALCULATION_MULTIPLIER,
                      )
                      return (
                        <div>
                          {withdrawAmount} {selectedChain.token.symbol}
                        </div>
                      )
                    },
                  },
                  {
                    accessorKey: 'unlockAtConfirmedDomainBlockNumber',
                    header: 'Withdrawal at Domain Block Number',
                    enableSorting: false,
                    cell: ({ row }) => {
                      return (
                        <div>
                          {row.original.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString()}
                        </div>
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
    [myPendingWithdrawals, operators, selectedChain.token.symbol],
  )

  return myPendingWithdrawalsList
}
