import type { WalletAccount } from '@talismn/connect-wallets'
import type { WalletType } from 'constants/wallet'

export interface WalletAccountWithType extends WalletAccount {
  type: WalletType
}

export type AddressBookEntry = {
  address: string
  label: string
  type: WalletType
}
