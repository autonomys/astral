const log = async (type: string, pathname: string, error: Error) =>
  await fetch(`/api/log/${type}/${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
    }),
  })

export const logError = async (pathname: string, error: Error) =>
  await log('error', pathname, error)
