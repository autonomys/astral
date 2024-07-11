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

interface ExplorerQueryState {
  [Routes.consensus]: {
    home: QueryState<GqlT.HomeQueryQuery>

    accounts: QueryState<GqlT.AccountsConnectionQuery>
    blocks: QueryState<GqlT.BlocksConnectionQuery>
    extrinsics: QueryState<GqlT.ExtrinsicsConnectionQuery>
    events: QueryState<GqlT.EventsConnectionQuery>
    logs: QueryState<GqlT.LogsConnectionQuery>

    account: QueryState<GqlT.AccountByIdQuery>
    block: QueryState<GqlT.BlockByIdQuery>
    extrinsic: QueryState<GqlT.ExtrinsicsByIdQuery>
    event: QueryState<GqlT.EventByIdQuery>
    log: QueryState<GqlT.LogByIdQuery>
  }
  [Routes.nova]: {
    home: QueryState<GqlT.HomeQueryDomainQuery>

    accounts: QueryState<GqlT.AccountsConnectionQuery>
    blocks: QueryState<GqlT.BlocksConnectionDomainQuery>
    extrinsics: QueryState<GqlT.ExtrinsicsConnectionQuery>
    events: QueryState<GqlT.EventsConnectionQuery>
    logs: QueryState<GqlT.LogsConnectionQuery>

    account: QueryState<GqlT.AccountByIdEvmQuery>
    block: QueryState<GqlT.BlockByIdDomainQuery>
    extrinsic: QueryState<GqlT.ExtrinsicsByIdQuery>
    event: QueryState<GqlT.EventByIdQuery>
    log: QueryState<GqlT.LogByIdQuery>
  }
  [Routes.leaderboard]: {
    farmers: QueryState<GqlT.AccountsConnectionRewardsQuery>
    nominators: QueryState<GqlT.AccountsNominatorsConnectionRewardsQuery>
    operators: QueryState<GqlT.OperatorsConnectionRewardsQuery>
  }
  [Routes.staking]: {
    operators: QueryState<GqlT.OperatorByIdQuery>
    nominators: QueryState<GqlT.NominatorsConnectionQuery>
    manageOperators: QueryState<GqlT.OperatorsConnectionQuery>
    manageNominations: QueryState<GqlT.NominatorsConnectionQuery>

    operator: QueryState<GqlT.OperatorByIdQuery>
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
  | keyof ExplorerQueryState[Routes.nova]
  | keyof ExplorerQueryState[Routes.leaderboard]
  | keyof ExplorerQueryState[Routes.staking]
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
  },
  leaderboard: {
    farmers: initialized,
    nominators: initialized,
    operators: initialized,
  },
  staking: {
    operators: initialized,
    nominators: initialized,
    manageOperators: initialized,
    manageNominations: initialized,

    operator: initialized,
  },
  walletSidekick: {
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
