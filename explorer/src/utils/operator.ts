// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const operatorStatus = (status: any) => {
  if (!status) return 'Unknown'
  return typeof status === 'string' ? Object.keys(JSON.parse(status))[0] : Object.keys(status)[0]
}
