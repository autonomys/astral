import type { WalletAccount } from '@subwallet/wallet-connect/types'
import type { WalletType } from 'constants/wallet'

export interface WalletAccountWithType extends WalletAccount {
  type: WalletType
}
