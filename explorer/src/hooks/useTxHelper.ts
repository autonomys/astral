import { TransactionStatus } from '@/constants'
import { sendGAEvent } from '@next/third-parties/google'
import type { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import type { ISubmittableResult } from '@polkadot/types/types'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import { useCallback } from 'react'
import { useTransactionsStates } from 'states/transactions'

export interface SendAndSaveTx {
  call: string
  tx: SubmittableExtrinsic<'promise', ISubmittableResult>
  signer: Signer
  to?: string
  amount?: string
  fee?: string
  nonce?: number
  error?: (error: string) => void
}

export const useTxHelper = () => {
  const { selectedChain } = useDomains()
  const { api, actingAccount, subspaceAccount, injector } = useWallet()
  const { addPendingTransactions } = useTransactionsStates()

  const handleTxError = useCallback(
    (errorMessage: string, call: string, handleErrorMessage?: (errorMessage: string) => void) => {
      handleErrorMessage ? handleErrorMessage(errorMessage) : console.error('Error', errorMessage)
      sendGAEvent('event', 'error_message', { value: errorMessage })
      sendGAEvent('event', 'error', { value: call })
    },
    [],
  )

  const sendAndSaveTx = useCallback(
    async (input: SendAndSaveTx) => {
      const { call, tx, signer, to, amount, fee, nonce, error } = input

      if (!api || !actingAccount || !injector)
        return handleTxError('We are not able to connect to the blockchain', call, error)
      if (!subspaceAccount) return handleTxError('Not a subspace account connected', call, error)

      try {
        const block = await api.rpc.chain.getBlock()
        const from = actingAccount.address
        const hash = await tx.signAndSend(from, { signer })

        addPendingTransactions({
          ownerAccount: actingAccount,
          chain: selectedChain,
          status: TransactionStatus.Pending,
          submittedAtBlockHash: block.block.header.hash.toHex(),
          submittedAtBlockNumber: block.block.header.number.toNumber(),
          call,
          txHash: hash.toString(),
          blockHash: '',
          from,
          to: to || from,
          amount: amount || '0',
          fee: fee || '0',
          nonce: nonce || 0,
        })
        sendGAEvent('event', 'tx_call', { value: call })

        return hash
      } catch (e) {
        handleTxError(`There was an error while sending the ${call} transaction`, call, error)
      }
    },
    [
      api,
      actingAccount,
      injector,
      handleTxError,
      subspaceAccount,
      addPendingTransactions,
      selectedChain,
    ],
  )

  return { handleTxError, sendAndSaveTx }
}
