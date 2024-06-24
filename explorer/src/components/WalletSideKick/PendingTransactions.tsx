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
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useMemo } from 'react'
import { useTransactionsStates } from 'states/transactions'
import { shortString } from 'utils/string'

interface PendingTransactionsProps {
  selectedChain: Chain
}

export const PendingTransactions: FC<PendingTransactionsProps> = ({ selectedChain }) => {
  dayjs.extend(relativeTime)
  const { actingAccount } = useWallet()
  const { pendingTransactions, removePendingTransactions } = useTransactionsStates()
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
            {transactions.map((tx, index) => (
              <li key={index}>
                <StyledListItem
                  title={
                    <div className='flex flex-col'>
                      {tx.call.split('.')[1].toUpperCase()}
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
              </li>
            ))}
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
