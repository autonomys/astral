import type {
  ApiPromise,
  ISubmittableResult,
  Signer,
  SubmittableExtrinsic,
} from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { TransactionStatus } from 'constants/transaction'
import useIndexers from 'hooks/useIndexers'
import useWallet from 'hooks/useWallet'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useTransactionsStates } from 'states/transactions'
import { logError, logTx } from 'utils/log'

interface SendAndSaveTx {
  call: string
  tx: SubmittableExtrinsic<'promise', ISubmittableResult>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: Signer | any
  to?: string
  amount?: string
  fee?: string
  nonce?: number
  api?: ApiPromise
  error?: (error: string) => void
}

export const useTxHelper = () => {
  const { network } = useIndexers()
  const { api, actingAccount, injector } = useWallet()
  const addPendingTransactions = useTransactionsStates((state) => state.addPendingTransactions)
  const getNextNonceForAccount = useTransactionsStates((state) => state.getNextNonceForAccount)
  const pathname = usePathname()

  const handleTxSuccess = useCallback(
    (txHash: string, message: string, call: string, handleSuccess?: (message: string) => void) => {
      handleSuccess ? handleSuccess(message) : console.info('Success', message)
      sendGAEvent('event', 'tx_call', { value: call })
      toast.success(message, { position: 'bottom-center' })
      logTx(pathname, txHash, call)
    },
    [pathname],
  )

  const handleTxError = useCallback(
    (message: string, call: string, handleError?: (message: string) => void) => {
      handleError ? handleError(message) : console.error('Error', message)
      sendGAEvent('event', 'error_message', { value: message })
      sendGAEvent('event', 'error', { value: call })
      toast.error(message, { position: 'bottom-center' })
      logError(pathname, 'call: ' + call)
    },
    [pathname],
  )

  const sendAndSaveTx = useCallback(
    async (input: SendAndSaveTx) => {
      const { call, tx, signer, to, amount, fee, error } = input
      let { nonce } = input

      let currentApi = api
      if (input.api) {
        currentApi = input.api
      }

      if (!currentApi || !actingAccount || !injector)
        return handleTxError('We are not able to connect to the blockchain', call, error)

      try {
        const from = actingAccount.address
        const [block, account] = await Promise.all([
          currentApi.rpc.chain.getBlock(),
          currentApi.query.system.account(from),
        ])
        const txCount = (account.toJSON() as { nonce: number }).nonce
        const nextNonceFromPending = getNextNonceForAccount(from)
        if (!nonce || txCount > nonce) nonce = txCount
        if (nextNonceFromPending > nonce) nonce = nextNonceFromPending
        const hash = await tx.signAndSend(from, { nonce, signer })
        const txHash = hash.toString()

        addPendingTransactions({
          ownerAccount: actingAccount,
          chain: network,
          status: TransactionStatus.Pending,
          submittedAtBlockHash: block.block.header.hash.toHex(),
          submittedAtBlockNumber: block.block.header.number.toNumber(),
          call,
          txHash,
          blockHash: '',
          from,
          to: to || from,
          amount: amount || '0',
          fee: fee || '0',
          nonce,
        })
        handleTxSuccess(txHash, 'The transaction was sent successfully', call)

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
      getNextNonceForAccount,
      addPendingTransactions,
      network,
      handleTxSuccess,
    ],
  )

  return { handleTxSuccess, handleTxError, sendAndSaveTx }
}
