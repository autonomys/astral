export enum DomainRuntime {
  EVM = "EVM",
  AUTO_ID = "AUTO_ID",
}

export enum OperatorStatus {
  PENDING = "PENDING",
  REGISTERED = "REGISTERED",
  DEREGISTERED = "DEREGISTERED",
  SLASHED = "SLASHED",
}

export enum OperatorPendingAction {
  NO_ACTION_REQUIRED = "NO_ACTION_REQUIRED",
  PENDING_REGISTRATION = "PENDING_REGISTRATION",
  WAITING_TO_UNLOCK_NOMINATOR = "WAITING_TO_UNLOCK_NOMINATOR",
  READY_FOR_UNLOCK_NOMINATOR = "READY_FOR_UNLOCK_NOMINATOR",
  READY_FOR_UNLOCK_FUNDS = "READY_FOR_UNLOCK_FUNDS",
}

export enum NominatorStatus {
  PENDING = "PENDING",
  STAKED = "STAKED",
  SLASHED = "SLASHED",
  WITHDRAW = "WITHDRAW",
}

export enum NominatorPendingAction {
  NO_ACTION_REQUIRED = "NO_ACTION_REQUIRED",
  PENDING_EPOCH_CHANGE = "PENDING_EPOCH_CHANGE",
  PENDING_LOCK_PERIOD = "PENDING_LOCK_PERIOD",
  READY_TO_UNLOCK_ALL_FUNDS = "READY_TO_UNLOCK_ALL_FUNDS",
}

export enum DepositStatus {
  PENDING = "PENDING",
  DEPOSITED = "DEPOSITED",
  PARTIALLY_WITHDRAWN = "PARTIALLY_WITHDRAWN",
  WITHDRAWN = "WITHDRAWN",
  SLASHED = "SLASHED",
}

export enum WithdrawalStatus {
  PENDING_LOCK = "PENDING_LOCK",
  PENDING_OPERATOR = "PENDING_OPERATOR",
  READY = "READY",
  WITHDRAW = "WITHDRAW",
  SLASHED = "SLASHED",
}