import Keyring from '@polkadot/keyring'
import { SUBSPACE_ACC_PREFIX } from 'common/constants'

export const accountConverter = (accountId: string): string => {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 })
  let address
  try {
    address = keyring.encodeAddress(accountId, SUBSPACE_ACC_PREFIX)
  } catch (error) {
    address = ''
  }

  return address
}
