export enum WalletType {
  subspace = 'subspace',
  ethereum = 'ethereum',
}

export enum WalletAction {
  None = 'None',
  SendToken = 'SendToken',
  ReceiveToken = 'ReceiveToken',
  SignMessage = 'SignMessage',
  SendRemark = 'SendRemark',
  ExtrinsicsLab = 'ExtrinsicsLab',
}

export const AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT = 0.0001
export const AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT_FOR_XDM = 2

export enum ExtrinsicsSupportedModule {
  Balances = 'balances',
  Domains = 'domains',
  Messenger = 'messenger',
  RuntimeConfigs = 'runtimeConfigs',
  Subspace = 'subspace',
  Sudo = 'sudo',
  System = 'system',
  Timestamp = 'timestamp',
  Transporter = 'transporter',
  Utility = 'utility',
  Vesting = 'vesting',
}

export enum SupportedWalletExtension {
  PolkadotJs = 'polkadot-js',
  SubwalletJs = 'subwallet-js',
  Talisman = 'talisman',
  Nova = 'nova',
}

export enum AccountPreferenceSection {
  None = 'None',
  AddressBook = 'addressBook',
  Settings = 'settings',
}
