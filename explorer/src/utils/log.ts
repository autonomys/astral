import { stringify } from '@autonomys/auto-utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = async (type: string, pathname: string, error: Error | string, data?: any) =>
  await fetch(`/api/log/${type}/${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify({
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? null : error.stack,
      data,
    }),
  })

export const logError = async (pathname: string, error: Error | string) =>
  await log('error', pathname, error)

export const logTx = async (pathname: string, txHash: string, call: string) =>
  await log('tx', pathname, 'tx: ' + txHash + ' call: ' + call)
