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
  id: number
  operatorOwner: string
  signingKey: string
  currentDomainId: number
  nextDomainId: number
  minimumNominatorStake: string
  nominationTax: number
  currentTotalStake: string
  currentEpochRewards: number
  currentTotalShares: string
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

export type Withdrawal = {
  id: number
  totalWithdrawalAmount: number
  withdrawals: string[]
  withdrawalInShares: {
    domainEpoch: number[]
    unlockAtConfirmedDomainBlockNumber: number
    shares: string
    storageFeeRefund: string
  }
}
