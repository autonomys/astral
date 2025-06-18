export const verifySignature = async (message: string, signature: string, address: string) => {
  const { cryptoWaitReady, signatureVerify } = await import('@autonomys/auto-utils')
  await cryptoWaitReady()
  return signatureVerify(message, signature, address)
}

export const formatAddress = async (accountId?: string, ss58Format = 42) => {
  if (!accountId) return undefined
  const { isAddress, Keyring } = await import('@autonomys/auto-utils')
  if (!isAddress(accountId)) return undefined

  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 })
  let address
  try {
    address = keyring.encodeAddress(accountId, ss58Format)
  } catch (error) {
    return undefined
  }

  return address
}
