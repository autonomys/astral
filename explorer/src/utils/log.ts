const log = async (type: string, pathname: string, error: Error | string) =>
  await fetch(`/api/log/${type}/${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? null : error.stack,
    }),
  })

export const logError = async (pathname: string, error: Error | string) =>
  await log('error', pathname, error)

export const logTx = async (pathname: string, txHash: string, call: string) =>
  await log('tx', pathname, 'tx: ' + txHash + ' call: ' + call)
