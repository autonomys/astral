'use client'

import { Transaction } from '@/types/transaction'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import type { Chain } from 'constants/chains'
import { TransactionStatus } from 'constants/transaction'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ExtrinsicsSummaryQuery } from 'gql/oldSquidTypes'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { hasValue, useQueryStates } from 'states/query'
import { useTransactionsStates } from 'states/transactions'
import { shortString } from 'utils/string'

interface PendingTransactionsProps {
  selectedChain: Chain
}

dayjs.extend(relativeTime)

export const PendingTransactions: FC<PendingTransactionsProps> = ({ selectedChain }) => {
  const { actingAccount } = useWallet()
  const {
    pendingTransactions,
    removePendingTransactions,
    markAsFinalized,
    moveToFinalizedTransactions,
  } = useTransactionsStates()
  const {
    walletSidekick: { lastExtrinsics },
  } = useQueryStates()

  const handleRemove = useCallback(
    (tx: Transaction) => removePendingTransactions(tx),
    [removePendingTransactions],
  )

  const transactions = useMemo(
    () =>
      actingAccount
        ? pendingTransactions
            .filter(
              (tx) =>
                tx.chain &&
                actingAccount.address === tx.from &&
                selectedChain.urls.page == tx.chain.urls.page,
            )
            .sort((a, b) => b.submittedAtBlockNumber - a.submittedAtBlockNumber)
        : [],
    [actingAccount, pendingTransactions, selectedChain.urls.page],
  )

  const timeNowPlus2min = new Date(new Date().getTime() + 2 * 60000).getTime() // 2 minutes from now
  const moveIfPending = useCallback(
    (edges: ExtrinsicsSummaryQuery['extrinsics']['edges']) => {
      const extrinsics = edges.map((edge) => edge.node.hash)
      if (!transactions || transactions.length === 0) return edges
      try {
        const pendingExtrinsics = transactions.filter((tx) => extrinsics.includes(tx.txHash))
        for (const pending of pendingExtrinsics) {
          const toMove =
            pending &&
            pending.finalizedAtLocalTimestamp &&
            pending.finalizedAtLocalTimestamp.getTime() > timeNowPlus2min
          if (pending) {
            markAsFinalized(
              pending,
              edges[0].node.success ? TransactionStatus.Success : TransactionStatus.Failed,
            )
            if (toMove) moveToFinalizedTransactions(pending)
          }
        }
      } catch (error) {
        console.error('Error in moveIfPending', error)
      }
      return edges
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions],
  )

  useEffect(() => {
    if (hasValue(lastExtrinsics)) {
      const intervalId = setInterval(
        () => moveIfPending(lastExtrinsics.value.extrinsics.edges),
        60000,
      ) // 1 minute

      return () => clearInterval(intervalId)
    }
  }, [lastExtrinsics, moveIfPending])

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <div className='m-2 mb-0 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              Pending transactions {transactions.length > 0 ? `( ${transactions.length} )` : ''}{' '}
            </span>
          </div>
        }
      >
        {transactions && transactions.length > 0 ? (
          <List>
            {transactions.map((tx, index) => {
              const txs = tx.call.split('.')
              const txName = txs.length > 1 ? txs[1].toUpperCase() : tx.call.toUpperCase()
              return (
                <StyledListItem
                  key={index}
                  title={
                    <div className='flex flex-col'>
                      {txName}
                      <Tooltip text={dayjs(tx.submittedAtLocalTimestamp).toString()}>
                        <span className='mr-2 text-sm font-medium text-grayDarker dark:text-gray-400'>
                          {dayjs(tx.submittedAtLocalTimestamp).fromNow(true)}
                        </span>
                      </Tooltip>
                    </div>
                  }
                >
                  <div className='flex flex-col'>
                    <span className='mr-2 text-sm font-medium text-grayDarker dark:text-gray-400'>
                      {shortString(tx.txHash)}
                    </span>
                    <span className='mr-2 text-sm font-medium text-grayDarker dark:text-gray-400'>
                      #{tx.submittedAtBlockNumber}
                    </span>
                  </div>
                  <div className='m-2 p-2'>
                    <StatusIcon status={tx.status !== TransactionStatus.Pending} />
                  </div>
                  <div className='m-2 p-2'>
                    <TrashIcon className='size-5' stroke='red' onClick={() => handleRemove(tx)} />
                  </div>
                </StyledListItem>
              )
            })}
          </List>
        ) : (
          <div className='m-2 flex items-center pt-4'>
            <span className='text-sm font-medium text-grayDarker dark:text-white'>
              You have no pending transactions
            </span>
          </div>
        )}
      </Accordion>
    </div>
  )
}
