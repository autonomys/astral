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

export enum ActionType {
  None = 'none',
  SendToken = 'SendToken',
  ReceiveToken = 'ReceiveToken',
  SignMessage = 'SignMessage',
  SendRemark = 'SendRemark',
  ExtrinsicsLab = 'ExtrinsicsLab',
}

export const AMOUNT_TO_SUBTRACT_FROM_MAX_AMOUNT = 0.0001
