import { ROUTE_EXTRA_FLAG_TYPE, Routes } from 'constants/routes'
import * as GqlT from 'gql/graphql'
import * as OldGqlT from 'gql/oldSquidTypes'
import * as StakingQuery from 'gql/types/staking'
import { create } from 'zustand'

export type Init = {
  initialized: true
}

export type Loading<T> = {
  loading: true
  value?: T | null
  lastValueTimestamp?: number
}

export type LastValue<T> = {
  value: T
  lastValueTimestamp: number
}

export type Error<T> = {
  error: true
  value?: T | null
  lastValueTimestamp?: number
}

export type QueryState<T> = Init | Loading<T> | LastValue<T> | Error<T>

const initialized: Init = { initialized: true }

interface ExplorerQueryState {
  [Routes.consensus]: {
    home: QueryState<OldGqlT.HomeQueryQuery>

    accounts: QueryState<OldGqlT.AccountsConnectionQuery>
    blocks: QueryState<OldGqlT.BlocksConnectionQuery>
    extrinsics: QueryState<OldGqlT.ExtrinsicsConnectionQuery>
    events: QueryState<OldGqlT.EventsConnectionQuery>
    logs: QueryState<OldGqlT.LogsConnectionQuery>

    account: QueryState<OldGqlT.AccountByIdQuery>
    block: QueryState<OldGqlT.BlockByIdQuery>
    extrinsic: QueryState<OldGqlT.ExtrinsicsByIdQuery>
    event: QueryState<OldGqlT.EventByIdQuery>
    log: QueryState<OldGqlT.LogByIdQuery>

    accountExtrinsic: QueryState<OldGqlT.ExtrinsicsByAccountIdQuery>
    accountPreviousReward: QueryState<OldGqlT.AllRewardForAccountByIdQuery>
    accountRewardGraph: QueryState<OldGqlT.LatestRewardsWeekQuery>
    accountReward: QueryState<OldGqlT.RewardsListQuery>

    blockDetailsExtrinsic: QueryState<OldGqlT.ExtrinsicsByBlockIdQuery>
    blockDetailsEvent: QueryState<OldGqlT.EventsByBlockIdQuery>
  }
  [Routes.nova]: {
    home: QueryState<OldGqlT.HomeQueryDomainQuery>

    accounts: QueryState<OldGqlT.AccountsConnectionQuery>
    blocks: QueryState<OldGqlT.BlocksConnectionDomainQuery>
    extrinsics: QueryState<OldGqlT.ExtrinsicsConnectionQuery>
    events: QueryState<OldGqlT.EventsConnectionQuery>
    logs: QueryState<OldGqlT.LogsConnectionQuery>

    account: QueryState<OldGqlT.AccountByIdEvmQuery>
    block: QueryState<OldGqlT.BlockByIdDomainQuery>
    extrinsic: QueryState<OldGqlT.ExtrinsicsByIdQuery>
    event: QueryState<OldGqlT.EventByIdQuery>
    log: QueryState<OldGqlT.LogByIdQuery>

    accountExtrinsic: QueryState<OldGqlT.ExtrinsicsByAccountIdQuery>
    accountPreviousReward: QueryState<OldGqlT.AllRewardForAccountByIdQuery>
    accountRewardGraph: QueryState<OldGqlT.LatestRewardsWeekQuery>
    accountReward: QueryState<OldGqlT.RewardsListQuery>

    blockDetailsExtrinsic: QueryState<OldGqlT.ExtrinsicsByBlockIdQuery>
    blockDetailsEvent: QueryState<OldGqlT.EventsByBlockIdQuery>
  }
  [Routes.leaderboard]: {
    farmers: QueryState<GqlT.AccountsConnectionRewardsQuery>
    nominators: QueryState<GqlT.AccountsNominatorsConnectionRewardsQuery>
    operators: QueryState<GqlT.OperatorsConnectionRewardsQuery>
  }
  [Routes.staking]: {
    operators: QueryState<StakingQuery.OperatorsListQuery>

    operator: QueryState<StakingQuery.OperatorByIdQuery>
    operatorNominators: QueryState<StakingQuery.OperatorNominatorsByIdQuery>
  }
  [Routes.domains]: {
    domains: QueryState<StakingQuery.DomainsListQuery>
  }
  [ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK]: {
    claim: QueryState<OldGqlT.ExtrinsicsByHashQuery>
    stakingSummary: QueryState<OldGqlT.StakingSummaryQuery>
    lastExtrinsics: QueryState<OldGqlT.ExtrinsicsSummaryQuery>
    leaderboard: QueryState<OldGqlT.AccountsTopLeaderboardQuery>
  }
}

export type ExplorerSection = keyof ExplorerQueryState

export type Components =
  | keyof ExplorerQueryState[Routes.consensus]
  | keyof ExplorerQueryState[Routes.nova]
  | keyof ExplorerQueryState[Routes.leaderboard]
  | keyof ExplorerQueryState[Routes.staking]
  | keyof ExplorerQueryState[Routes.domains]
  | keyof ExplorerQueryState[ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK]

interface ExplorerQueryStateAndHelper extends ExplorerQueryState {
  setIsLoading: (section: ExplorerSection, component: Components) => void
  setValue: <T>(section: ExplorerSection, component: Components, value: T) => void
  setError: (section: ExplorerSection, component: Components) => void
  clear: () => void
}

const initialState: ExplorerQueryState = {
  consensus: {
    home: initialized,

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
    accountPreviousReward: initialized,
    accountRewardGraph: initialized,
    accountReward: initialized,

    blockDetailsExtrinsic: initialized,
    blockDetailsEvent: initialized,
  },
  nova: {
    home: initialized,

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
    accountPreviousReward: initialized,
    accountRewardGraph: initialized,
    accountReward: initialized,

    blockDetailsExtrinsic: initialized,
    blockDetailsEvent: initialized,
  },
  leaderboard: {
    farmers: initialized,
    nominators: initialized,
    operators: initialized,
  },
  staking: {
    operators: initialized,

    operator: initialized,
    operatorNominators: initialized,
  },
  domains: {
    domains: initialized,
  },
  walletSidekick: {
    claim: initialized,
    stakingSummary: initialized,
    lastExtrinsics: initialized,
    leaderboard: initialized,
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
