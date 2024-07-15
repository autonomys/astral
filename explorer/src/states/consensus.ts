import {
  ConfirmedDomainBlock,
  Domain,
  DomainRegistry,
  DomainStakingSummary,
  NominatorCount,
  OperatorIdOwner,
  Operators,
  PendingStakingOperationCount,
  SuccessfulBundle,
  Withdrawal,
} from 'types/consensus'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ConsensusDefaultState {
  // properties
  ss58Format: number
  tokenDecimals: number
  tokenSymbol: string
  // domainsBootstrapNodes: any

  domain: Domain | null
  // system
  chain: string
  name: string
  // domains
  domainRegistry: DomainRegistry[]
  domainStakingSummary: DomainStakingSummary[]
  latestConfirmedDomainBlock: ConfirmedDomainBlock[]
  // latestSubmittedER: LatestSubmittedER[]
  nominatorCount: NominatorCount[]
  operatorIdOwner: OperatorIdOwner[]
  operators: Operators[]
  // pendingSlashes: PendingSlashes[]
  pendingStakingOperationCount: PendingStakingOperationCount[]
  successfulBundles: SuccessfulBundle[]
  withdrawals: Withdrawal[]
}

interface ConsensusState extends ConsensusDefaultState {
  setProperties: (params: {
    ss58Format: number
    tokenDecimals: number
    tokenSymbol: string
    // domainsBootstrapNodes: any
  }) => void
  setDomain: (domain: Domain) => void
  setSystem: (params: { chain: string; name: string }) => void
  setDomainRegistry: (domainRegistry: DomainRegistry[]) => void
  setDomainStakingSummary: (domainStakingSummary: DomainStakingSummary[]) => void
  setLatestConfirmedDomainBlock: (latestConfirmedDomainBlock: ConfirmedDomainBlock[]) => void
  setNominatorCount: (nominatorCount: NominatorCount[]) => void
  setOperatorIdOwner: (operatorIdOwner: OperatorIdOwner[]) => void
  setOperators: (operators: Operators[]) => void
  setPendingStakingOperationCount: (
    pendingStakingOperationCount: PendingStakingOperationCount[],
  ) => void
  setSuccessfulBundles: (successfulBundles: SuccessfulBundle[]) => void
  setWithdrawals: (withdrawals: Withdrawal[]) => void
  clear: () => void
}

const initialState: ConsensusDefaultState = {
  ss58Format: 0,
  tokenDecimals: 0,
  tokenSymbol: '',
  // domainsBootstrapNodes: null,

  domain: null,
  // system
  chain: '',
  name: '',
  // domains
  domainRegistry: [],
  domainStakingSummary: [],
  latestConfirmedDomainBlock: [],
  // latestSubmittedER: [],
  nominatorCount: [],
  operatorIdOwner: [],
  operators: [],
  // pendingSlashes: [],
  pendingStakingOperationCount: [],
  successfulBundles: [],
  withdrawals: [],
}

export const useConsensusStates = create<ConsensusState>()(
  persist(
    (set) => ({
      ...initialState,
      setProperties: (params) =>
        set(() => ({
          ss58Format: params.ss58Format,
          tokenSymbol: params.tokenSymbol,
          tokenDecimals: params.tokenDecimals,
          // domainsBootstrapNodes: params.domainsBootstrapNodes,
        })),
      setDomain: (domain) => set(() => ({ domain })),
      setSystem: (params) => set(() => ({ chain: params.chain, name: params.name })),
      setDomainRegistry: (domainRegistry) => set(() => ({ domainRegistry })),
      setDomainStakingSummary: (domainStakingSummary) => set(() => ({ domainStakingSummary })),
      setLatestConfirmedDomainBlock: (latestConfirmedDomainBlock) =>
        set(() => ({ latestConfirmedDomainBlock })),
      setNominatorCount: (nominatorCount) => set(() => ({ nominatorCount })),
      setOperatorIdOwner: (operatorIdOwner) => set(() => ({ operatorIdOwner })),
      setOperators: (operators) => set(() => ({ operators })),
      setPendingStakingOperationCount: (pendingStakingOperationCount) =>
        set(() => ({ pendingStakingOperationCount })),
      setSuccessfulBundles: (successfulBundles) => set(() => ({ successfulBundles })),
      setWithdrawals: (withdrawals) => set(() => ({ withdrawals })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'consensus-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
