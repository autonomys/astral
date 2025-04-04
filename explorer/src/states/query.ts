import { ROUTE_EXTRA_FLAG_TYPE, Routes } from 'constants/routes'
import * as GqlT from 'gql/graphql'
import { create } from 'zustand'

type Init = {
  initialized: true
}

type Loading<T> = {
  loading: true
  value?: T | null
  lastValueTimestamp?: number
}

type LastValue<T> = {
  value: T
  lastValueTimestamp: number
}

type Error<T> = {
  error: true
  value?: T | null
  lastValueTimestamp?: number
}

type QueryState<T> = Init | Loading<T> | LastValue<T> | Error<T>

const initialized: Init = { initialized: true }

interface ExplorerQueryState {
  [Routes.consensus]: {
    accounts: QueryState<GqlT.AccountsQuery>
    blocks: QueryState<GqlT.BlocksQuery>
    extrinsics: QueryState<GqlT.ExtrinsicsQuery>
    events: QueryState<GqlT.EventsQuery>
    logs: QueryState<GqlT.LogsQuery>

    account: QueryState<GqlT.AccountByIdQuery>
    block: QueryState<GqlT.BlockByIdQuery>
    extrinsic: QueryState<GqlT.ExtrinsicsByIdQuery>
    event: QueryState<GqlT.EventByIdQuery>
    log: QueryState<GqlT.LogByIdQuery>

    accountExtrinsic: QueryState<GqlT.ExtrinsicsByAccountIdQuery>
    accountRewardGraph: QueryState<GqlT.LatestRewardsWeekQuery>
    accountReward: QueryState<GqlT.RewardsListQuery>
    accountTransfers: QueryState<GqlT.TransfersByAccountIdQuery>
    accountBalanceHistory: QueryState<GqlT.BalanceHistoryByAccountIdQuery>

    blockDetailsExtrinsic: QueryState<GqlT.ExtrinsicsByBlockIdQuery>
    blockDetailsEvent: QueryState<GqlT.EventsByBlockIdQuery>
    blockDetailsLog: QueryState<GqlT.LogsByBlockIdQuery>

    extrinsicDetailsEvent: QueryState<GqlT.EventsByExtrinsicIdQuery>
  }
  [Routes.storage]: {
    files: QueryState<GqlT.FilesQuery>
    folders: QueryState<GqlT.FoldersQuery>

    file: QueryState<GqlT.FileByIdQuery>
    folder: QueryState<GqlT.FolderByIdQuery>

    folderChildren: QueryState<GqlT.FolderChildrenByIdQuery>
  }
  [Routes.staking]: {
    operators: QueryState<GqlT.OperatorsListQuery>
    operator: QueryState<GqlT.OperatorByIdQuery>
    operatorNominators: QueryState<GqlT.OperatorNominatorsByIdQuery>
    operatorDeposits: QueryState<GqlT.OperatorDepositsByIdQuery>
    operatorWithdrawals: QueryState<GqlT.OperatorWithdrawalsByIdQuery>
    operatorFundsUnlock: QueryState<GqlT.OperatorFundsUnlockByIdQuery>
    operatorBundles: QueryState<GqlT.OperatorBundlesByIdQuery>
    operatorRewards: QueryState<GqlT.OperatorRewardsByIdQuery>
    operatorTaxCollected: QueryState<GqlT.OperatorTaxCollectedByIdQuery>
  }
  [Routes.leaderboard]: {
    leaderboard: QueryState<GqlT.AccountTransferSenderTotalCountQuery>
  }
  [Routes.domains]: {
    domains: QueryState<GqlT.DomainsListQuery>
    domain: QueryState<GqlT.DomainByIdQuery>
  }
  [Routes.transfer]: {
    transfer: QueryState<GqlT.TransferHistoryQuery>
    transferHistory: QueryState<GqlT.TransferHistoryQuery>
  }
  [ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK]: {
    stakingSummary: QueryState<GqlT.StakingSummaryQuery>
    lastExtrinsics: QueryState<GqlT.ExtrinsicsSummaryQuery>
    leaderboard: QueryState<GqlT.AccountsTopLeaderboardQuery>
  }
}

export type ExplorerSection = keyof ExplorerQueryState

export type Components =
  | keyof ExplorerQueryState[Routes.consensus]
  | keyof ExplorerQueryState[Routes.storage]
  | keyof ExplorerQueryState[Routes.staking]
  | keyof ExplorerQueryState[Routes.domains]
  | keyof ExplorerQueryState[ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK]
  | keyof ExplorerQueryState[Routes.transfer]
interface ExplorerQueryStateAndHelper extends ExplorerQueryState {
  setIsLoading: (section: ExplorerSection, component: Components) => void
  setValue: <T>(section: ExplorerSection, component: Components, value: T) => void
  setError: (section: ExplorerSection, component: Components) => void
  clear: () => void
}

const initialState: ExplorerQueryState = {
  consensus: {
    accounts: initialized,
    blocks: initialized,
    extrinsics: initialized,
    events: initialized,
    logs: initialized,

    account: initialized,
    block: initialized,
    extrinsic: initialized,
    event: initialized,
    log: initialized,

    accountExtrinsic: initialized,
    accountRewardGraph: initialized,
    accountReward: initialized,
    accountTransfers: initialized,
    accountBalanceHistory: initialized,

    blockDetailsExtrinsic: initialized,
    blockDetailsEvent: initialized,
    blockDetailsLog: initialized,

    extrinsicDetailsEvent: initialized,
  },
  [Routes.storage]: {
    files: initialized,
    folders: initialized,

    file: initialized,
    folder: initialized,

    folderChildren: initialized,
  },
  staking: {
    operators: initialized,

    operator: initialized,
    operatorNominators: initialized,
    operatorDeposits: initialized,
    operatorWithdrawals: initialized,
    operatorFundsUnlock: initialized,
    operatorBundles: initialized,
    operatorRewards: initialized,
    operatorTaxCollected: initialized,
  },
  leaderboard: {
    leaderboard: initialized,
  },
  domains: {
    domains: initialized,

    domain: initialized,
  },
  walletSidekick: {
    stakingSummary: initialized,
    lastExtrinsics: initialized,
    leaderboard: initialized,
  },
  transfer: {
    transfer: initialized,
    transfers: initialized,
  },
}

export const isLoading = <T>(state: QueryState<T>): state is Loading<T> => 'loading' in state
export const hasValue = <T>(state: QueryState<T>): state is LastValue<T> => 'value' in state
export const isError = <T>(state: QueryState<T>): state is Error<T> => 'error' in state

export const useQueryStates = create<ExplorerQueryStateAndHelper>((set) => ({
  ...initialState,
  setIsLoading: (section, query) => {
    set((state) => {
      const sectionState = state[section] as Record<Components, QueryState<unknown>>
      if (sectionState[query])
        sectionState[query] = (sectionState[query] as LastValue<unknown>).value
          ? { loading: true, value: (sectionState[query] as LastValue<unknown>).value }
          : { loading: true }
      return { ...state, [section]: sectionState }
    })
  },
  setValue: (section, query, value) => {
    set((state) => {
      const sectionState = state[section] as Record<Components, QueryState<unknown>>
      if (sectionState[query]) sectionState[query] = { value, lastValueTimestamp: Date.now() }
      return { ...state, [section]: sectionState }
    })
  },
  setError: (section, query) => {
    set((state) => {
      const sectionState = state[section] as Record<Components, QueryState<unknown>>
      if (sectionState[query])
        sectionState[query] = (sectionState[query] as LastValue<unknown>).value
          ? { error: true, value: (sectionState[query] as LastValue<unknown>).value }
          : { error: true }
      return { ...state, [section]: sectionState }
    })
  },
  clear: () => set(() => ({ ...initialState })),
}))
