// Interfaces for staking worker

export interface StakingProcessingTask {
  type: 'deposit' | 'withdrawal';
  id: string;
  operatorId: string;
  domainId: string;
  address: string;
  timestamp: Date;
}

export interface DepositTask extends StakingProcessingTask {
  type: 'deposit';
  knownShares: string;
  knownStorageFeeDeposit: string;
  pendingAmount: string;
  pendingStorageFeeDeposit: string;
  pendingEffectiveDomainEpoch: string;
}

export interface WithdrawalTask extends StakingProcessingTask {
  type: 'withdrawal';
  withdrawalInSharesAmount: string;
  withdrawalInSharesStorageFeeRefund: string;
  withdrawalInSharesDomainEpoch: string;
  withdrawalInSharesUnlockBlock: string;
  totalWithdrawalAmount: string;
  totalStorageFeeWithdrawal: string;
  withdrawalsJson: string;
}

export interface OperatorSharePrice {
  operatorId: string;
  domainId: string;
  epochIndex: number;
  sharePrice: string;
}

export interface OperatorState {
  operatorId: string;
  currentTotalStake: string;
  currentTotalShares: string;
  totalStorageFeeDeposit: string;
  sharePrice: string;
}

export interface StorageFundAccount {
  operatorId: string;
  balance: string;
}

export interface ProcessingResult {
  success: boolean;
  recordsProcessed: number;
  errors?: string[];
}

export interface NominatorState {
  id: string; // address-domainId-operatorId
  address: string;
  domainId: string;
  operatorId: string;
  knownShares: string;
  knownStorageFeeDeposit: string;
  pendingAmount: string;
  pendingStorageFeeDeposit: string;
  totalDeposits: string;
  totalWithdrawals: string;
  totalWithdrawalAmounts: string;
  totalStorageFeeRefund: string;
  status: 'active' | 'inactive' | 'pending_withdrawal';
  unlockAtConfirmedDomainBlockNumber: any; // jsonb
  createdAt: number;
  updatedAt: number;
}

export interface ConversionResult {
  hasConverted: boolean;
  newShares?: string;
  newAmount?: string;
  updatedValues?: any;
}

export interface StakingUpdate {
  // TODO: Define the structure of a staking update
}

export interface OperatorUpdate {
  // TODO: Define the structure of an operator update
}

export interface NominatorUpdate {
  // TODO: Define the structure of a nominator update
}

export interface DomainUpdate {
  // TODO: Define the structure of a domain update
}

export interface WithdrawalUpdate {
  // TODO: Define the structure of a withdrawal update
}

export interface DepositUpdate {
  // TODO: Define the structure of a deposit update
}

export interface SharePriceUpdate {
  // TODO: Define the structure of a share price update
}

export interface RewardUpdate {
  // TODO: Define the structure of a reward update
}

export interface StakingError {
  // TODO: Define the structure of staking errors
} 