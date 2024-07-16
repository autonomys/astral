import { TransactionStatus } from '@/constants'
import { sendGAEvent } from '@next/third-parties/google'
import type { Signer, SubmittableExtrinsic } from '@polkadot/api/types'
import type { ISubmittableResult } from '@polkadot/types/types'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
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
  const { addPendingTransactions, getNextNonceForAccount } = useTransactionsStates()

  const handleTxSuccess = useCallback(
    (message: string, call: string, handleSuccess?: (message: string) => void) => {
      handleSuccess ? handleSuccess(message) : console.info('Success', message)
      sendGAEvent('event', 'tx_call', { value: call })
      toast.success(message, { position: 'bottom-center' })
    },
    [],
  )

  const handleTxError = useCallback(
    (message: string, call: string, handleError?: (message: string) => void) => {
      handleError ? handleError(message) : console.error('Error', message)
      sendGAEvent('event', 'error_message', { value: message })
      sendGAEvent('event', 'error', { value: call })
      toast.error(message, { position: 'bottom-center' })
    },
    [],
  )

  const sendAndSaveTx = useCallback(
    async (input: SendAndSaveTx) => {
      const { call, tx, signer, to, amount, fee, error } = input
      let { nonce } = input

      if (!api || !actingAccount || !injector)
        return handleTxError('We are not able to connect to the blockchain', call, error)
      if (!subspaceAccount) return handleTxError('Not a subspace account connected', call, error)

      try {
        const from = actingAccount.address
        const [block, account] = await Promise.all([
          api.rpc.chain.getBlock(),
          api.query.system.account(from),
        ])
        const txCount = (account.toJSON() as { nonce: number }).nonce
        const nextNonceFromPending = getNextNonceForAccount(from)
        if (!nonce || txCount > nonce) nonce = txCount
        if (nextNonceFromPending > nonce) nonce = nextNonceFromPending
        const hash = await tx.signAndSend(from, { nonce, signer })

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
          nonce,
        })
        handleTxSuccess('The transaction was sent successfully', call)

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
      getNextNonceForAccount,
      addPendingTransactions,
      selectedChain,
      handleTxSuccess,
    ],
  )

  return { handleTxSuccess, handleTxError, sendAndSaveTx }
}
