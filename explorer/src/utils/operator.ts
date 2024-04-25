type OperatorDeregisteredStatus = { deregistered: { unlockAtConfirmedDomainBlockNumber: number } }

// To-Do: After we end support for Gemini 3g on Astral: Properly type the operator status

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const operatorStatus = (status: any, lastBlock?: number) => {
  if (!status) return 'Unknown'
  if (typeof status === 'string') {
    const statusParsed = JSON.parse(status)
    const statusKey = Object.keys(statusParsed)[0]

    if (lastBlock && statusKey === 'deregistered') {
      const unlockBlock = (statusParsed as OperatorDeregisteredStatus).deregistered
        .unlockAtConfirmedDomainBlockNumber

      if (unlockBlock > lastBlock)
        return statusKey + ', unlock in ' + (unlockBlock - lastBlock) + ' blocks'

      return statusKey + ', funds ready to unlock'
    }
    return statusKey
  }
  return Object.keys(status)[0]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const operatorReadyToUnlock = (status: any, lastBlock?: number) => {
  if (typeof status === 'string') {
    const statusParsed = JSON.parse(status)
    if (
      lastBlock &&
      Object.keys(statusParsed)[0] === 'deregistered' &&
      (statusParsed as OperatorDeregisteredStatus).deregistered
        .unlockAtConfirmedDomainBlockNumber <= lastBlock
    )
      return true
  }
  return false
}
