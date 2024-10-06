import { ROUTE_EXTRA_FLAG_TYPE, Routes } from 'constants/routes'
import * as GqlT from 'gql/graphql'
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

export interface ExplorerQueryState {
  [Routes.consensus]: {
    home: QueryState<GqlT.HomeQueryQuery>

    accounts: QueryState<GqlT.AccountsQuery>
    blocks: QueryState<GqlT.BlocksQuery>
    extrinsics: QueryState<GqlT.ExtrinsicsQuery>
    events: QueryState<GqlT.EventsQuery>
    logs: QueryState<GqlT.LogsConnectionQuery>

    account: QueryState<GqlT.AccountByIdQuery>
    block: QueryState<GqlT.BlockByIdQuery>
    extrinsic: QueryState<GqlT.ExtrinsicsByIdQuery>
    event: QueryState<GqlT.EventByIdQuery>
    log: QueryState<GqlT.LogByIdQuery>

    accountExtrinsic: QueryState<GqlT.ExtrinsicsByAccountIdQuery>
    accountPreviousReward: QueryState<GqlT.AllRewardForAccountByIdQuery>
    accountRewardGraph: QueryState<GqlT.LatestRewardsWeekQuery>
    accountReward: QueryState<GqlT.RewardsListQuery>

    blockDetailsExtrinsic: QueryState<GqlT.ExtrinsicsByBlockIdQuery>
    blockDetailsEvent: QueryState<GqlT.EventsByBlockIdQuery>
  }
  [Routes.staking]: {
    // operators: QueryState<GqlT.OperatorsListQuery>
    //  operator: QueryState<GqlT.OperatorByIdQuery>
    //  operatorNominators: QueryState<GqlT.OperatorNominatorsByIdQuery>
  }
  [Routes.domains]: {
    //  domains: QueryState<GqlT.DomainsListQuery>
    //  domain: QueryState<GqlT.DomainByIdQuery>
  }
  [ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK]: {
    claim: QueryState<GqlT.ExtrinsicsByHashQuery>
    // stakingSummary: QueryState<GqlT.StakingSummaryQuery>
    lastExtrinsics: QueryState<GqlT.ExtrinsicsSummaryQuery>
    leaderboard: QueryState<GqlT.AccountsTopLeaderboardQuery>
  }
}

export type ExplorerSection = keyof ExplorerQueryState

export type Components =
  | keyof ExplorerQueryState[Routes.consensus]
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
  staking: {
    operators: initialized,

    operator: initialized,
    operatorNominators: initialized,
  },
  domains: {
    domains: initialized,

    domain: initialized,
  },
  walletSidekick: {
    claim: initialized,
    //  stakingSummary: initialized,
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
