import { decode, isAddress, Keyring, u8aToHex } from '@autonomys/auto-utils'
import { SUBSPACE_ACC_PREFIX } from 'constants/general'

export const formatAddress = (accountId?: string): string | undefined => {
  if (!accountId || !isAddress(accountId)) return undefined

  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 })
  let address
  try {
    address = keyring.encodeAddress(accountId, SUBSPACE_ACC_PREFIX)
  } catch (error) {
    return undefined
  }

  return address
}

export const accountIdToHex = (accountId: string): string => {
  const hex = u8aToHex(decode(accountId))

  return hex
}
