export interface Domain {
  confirmationDepthK: string
  domainRuntimeUpgradeDelay: string
  blockTreePruningDepth: string
  consensusSlotProbability: string
  maxDomainBlockSize: string
  maxDomainBlockWeight: {
    refTime: number
    proofSize: number
  }
  maxBundlesPerBlock: string
  maxDomainNameLength: string
  domainInstantiationDeposit: string
  initialDomainTxRange: string
  domainTxRangeAdjustmentInterval: string
  minOperatorStake: string
  minNominatorStake: string
  stakeWithdrawalLockingPeriod: string
  stakeEpochDuration: string
  treasuryAccount: string
  maxPendingStakingOperation: number
  palletId: string
  bundleLongevity: string
}

export type DomainRegistry = {
  domainId: string
  ownerAccountId: string
  createdAt: number
  genesisReceiptHash: string
  domainConfig: {
    domainName: string
    runtimeId: number
    maxBlockSize: number
    maxBlockWeight: {
      refTime: number
      proofSize: string
    }
    bundleSlotProbability: number[]
    targetBundlesPerBlock: number
    operatorAllowList: {
      operators: string[]
    }
  }
}

export type DomainStakingSummary = {
  currentEpochIndex: number
  currentTotalStake: string
  currentOperators: {
    [key: string]: string
  }
  nextOperators: string[]
  currentEpochRewards: {
    [key: string]: string
  }
}

export type ConfirmedDomainBlock = {
  id: number
  blockNumber: number
  blockHash: string
  parentBlockReceiptHash: string
  stateRoot: string
  extrinsicsRoot: string
}

export type NominatorCount = {
  id: number
  count: number
}

export type OperatorIdOwner = {
  id: number
  owner: string
}

export type Operators = {
  id: string
  operatorOwner: string
  signingKey: string
  currentDomainId: number
  nextDomainId: number
  minimumNominatorStake: string
  nominationTax: number
  currentTotalStake: string
  currentEpochRewards: number
  currentTotalShares: string
  totalStorageFeeDeposit: string
  status: string
}

export type PendingStakingOperationCount = {
  id: number
  count: number
}

export type SuccessfulBundle = {
  id: number
  bundle: string[]
}

export type RawDeposit = {
  known: {
    shares: number
    storageFeeDeposit: number
  }
  pending: {
    effectiveDomainEpoch: number[]
    amount: string
    storageFeeDeposit: string
  }
}

export type Deposit = {
  operatorId: number
  account: string
  shares: string
  storageFeeDeposit: string
  pending: {
    amount: string
    storageFeeDeposit: string
  }
}

export type Withdrawal = {
  operatorId: number
  account: string
  totalWithdrawalAmount: number
  withdrawals: string[]
  withdrawalInShares: {
    domainEpoch: number[]
    unlockAtConfirmedDomainBlockNumber: number
    shares: string
    storageFeeRefund: string
  }
}
