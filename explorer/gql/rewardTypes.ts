export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  /** Account address */
  id: Scalars['String']['output'];
  nominations: Array<Nominator>;
  rewards: Array<RewardEvent>;
};


export type AccountNominationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NominatorOrderByInput>>;
  where?: InputMaybe<NominatorWhereInput>;
};


export type AccountRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RewardEventOrderByInput>>;
  where?: InputMaybe<RewardEventWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String']['output'];
  node: Account;
};

export enum AccountOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
}

export type AccountReward = {
  __typename?: 'AccountReward';
  account: Account;
  block?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['String']['output'];
  operator?: Maybe<Scalars['BigInt']['output']>;
  totalRewards?: Maybe<Scalars['BigInt']['output']>;
  updatedAt: Scalars['Int']['output'];
  vote?: Maybe<Scalars['BigInt']['output']>;
};

export type AccountRewardEdge = {
  __typename?: 'AccountRewardEdge';
  cursor: Scalars['String']['output'];
  node: AccountReward;
};

export enum AccountRewardOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockDesc = 'block_DESC',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorAsc = 'operator_ASC',
  OperatorAscNullsFirst = 'operator_ASC_NULLS_FIRST',
  OperatorDesc = 'operator_DESC',
  OperatorDescNullsLast = 'operator_DESC_NULLS_LAST',
  TotalRewardsAsc = 'totalRewards_ASC',
  TotalRewardsAscNullsFirst = 'totalRewards_ASC_NULLS_FIRST',
  TotalRewardsDesc = 'totalRewards_DESC',
  TotalRewardsDescNullsLast = 'totalRewards_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST',
  VoteAsc = 'vote_ASC',
  VoteAscNullsFirst = 'vote_ASC_NULLS_FIRST',
  VoteDesc = 'vote_DESC',
  VoteDescNullsLast = 'vote_DESC_NULLS_LAST'
}

export type AccountRewardWhereInput = {
  AND?: InputMaybe<Array<AccountRewardWhereInput>>;
  OR?: InputMaybe<Array<AccountRewardWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_eq?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator_eq?: InputMaybe<Scalars['BigInt']['input']>;
  operator_gt?: InputMaybe<Scalars['BigInt']['input']>;
  operator_gte?: InputMaybe<Scalars['BigInt']['input']>;
  operator_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operator_lt?: InputMaybe<Scalars['BigInt']['input']>;
  operator_lte?: InputMaybe<Scalars['BigInt']['input']>;
  operator_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  operator_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRewards_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  vote_eq?: InputMaybe<Scalars['BigInt']['input']>;
  vote_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vote_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vote_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vote_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  vote_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vote_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vote_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  vote_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type AccountRewardsConnection = {
  __typename?: 'AccountRewardsConnection';
  edges: Array<AccountRewardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominations_every?: InputMaybe<NominatorWhereInput>;
  nominations_none?: InputMaybe<NominatorWhereInput>;
  nominations_some?: InputMaybe<NominatorWhereInput>;
  rewards_every?: InputMaybe<RewardEventWhereInput>;
  rewards_none?: InputMaybe<RewardEventWhereInput>;
  rewards_some?: InputMaybe<RewardEventWhereInput>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Deposit = {
  __typename?: 'Deposit';
  amount?: Maybe<Scalars['BigInt']['output']>;
  blockNumber: Scalars['Int']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  nominator: Nominator;
  nominatorAccount: Scalars['String']['output'];
  operator: Operator;
  timestamp: Scalars['DateTime']['output'];
};

export type DepositEdge = {
  __typename?: 'DepositEdge';
  cursor: Scalars['String']['output'];
  node: Deposit;
};

export enum DepositOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NominatorAccountAsc = 'nominatorAccount_ASC',
  NominatorAccountAscNullsFirst = 'nominatorAccount_ASC_NULLS_FIRST',
  NominatorAccountDesc = 'nominatorAccount_DESC',
  NominatorAccountDescNullsLast = 'nominatorAccount_DESC_NULLS_LAST',
  NominatorIdAsc = 'nominator_id_ASC',
  NominatorIdAscNullsFirst = 'nominator_id_ASC_NULLS_FIRST',
  NominatorIdDesc = 'nominator_id_DESC',
  NominatorIdDescNullsLast = 'nominator_id_DESC_NULLS_LAST',
  NominatorSharesAsc = 'nominator_shares_ASC',
  NominatorSharesAscNullsFirst = 'nominator_shares_ASC_NULLS_FIRST',
  NominatorSharesDesc = 'nominator_shares_DESC',
  NominatorSharesDescNullsLast = 'nominator_shares_DESC_NULLS_LAST',
  NominatorStatusAsc = 'nominator_status_ASC',
  NominatorStatusAscNullsFirst = 'nominator_status_ASC_NULLS_FIRST',
  NominatorStatusDesc = 'nominator_status_DESC',
  NominatorStatusDescNullsLast = 'nominator_status_DESC_NULLS_LAST',
  NominatorUpdatedAtAsc = 'nominator_updatedAt_ASC',
  NominatorUpdatedAtAscNullsFirst = 'nominator_updatedAt_ASC_NULLS_FIRST',
  NominatorUpdatedAtDesc = 'nominator_updatedAt_DESC',
  NominatorUpdatedAtDescNullsLast = 'nominator_updatedAt_DESC_NULLS_LAST',
  OperatorCurrentDomainIdAsc = 'operator_currentDomainId_ASC',
  OperatorCurrentDomainIdAscNullsFirst = 'operator_currentDomainId_ASC_NULLS_FIRST',
  OperatorCurrentDomainIdDesc = 'operator_currentDomainId_DESC',
  OperatorCurrentDomainIdDescNullsLast = 'operator_currentDomainId_DESC_NULLS_LAST',
  OperatorCurrentEpochRewardsAsc = 'operator_currentEpochRewards_ASC',
  OperatorCurrentEpochRewardsAscNullsFirst = 'operator_currentEpochRewards_ASC_NULLS_FIRST',
  OperatorCurrentEpochRewardsDesc = 'operator_currentEpochRewards_DESC',
  OperatorCurrentEpochRewardsDescNullsLast = 'operator_currentEpochRewards_DESC_NULLS_LAST',
  OperatorCurrentTotalStakeAsc = 'operator_currentTotalStake_ASC',
  OperatorCurrentTotalStakeAscNullsFirst = 'operator_currentTotalStake_ASC_NULLS_FIRST',
  OperatorCurrentTotalStakeDesc = 'operator_currentTotalStake_DESC',
  OperatorCurrentTotalStakeDescNullsLast = 'operator_currentTotalStake_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorMinimumNominatorStakeAsc = 'operator_minimumNominatorStake_ASC',
  OperatorMinimumNominatorStakeAscNullsFirst = 'operator_minimumNominatorStake_ASC_NULLS_FIRST',
  OperatorMinimumNominatorStakeDesc = 'operator_minimumNominatorStake_DESC',
  OperatorMinimumNominatorStakeDescNullsLast = 'operator_minimumNominatorStake_DESC_NULLS_LAST',
  OperatorNextDomainIdAsc = 'operator_nextDomainId_ASC',
  OperatorNextDomainIdAscNullsFirst = 'operator_nextDomainId_ASC_NULLS_FIRST',
  OperatorNextDomainIdDesc = 'operator_nextDomainId_DESC',
  OperatorNextDomainIdDescNullsLast = 'operator_nextDomainId_DESC_NULLS_LAST',
  OperatorNominationTaxAsc = 'operator_nominationTax_ASC',
  OperatorNominationTaxAscNullsFirst = 'operator_nominationTax_ASC_NULLS_FIRST',
  OperatorNominationTaxDesc = 'operator_nominationTax_DESC',
  OperatorNominationTaxDescNullsLast = 'operator_nominationTax_DESC_NULLS_LAST',
  OperatorNominatorAmountAsc = 'operator_nominatorAmount_ASC',
  OperatorNominatorAmountAscNullsFirst = 'operator_nominatorAmount_ASC_NULLS_FIRST',
  OperatorNominatorAmountDesc = 'operator_nominatorAmount_DESC',
  OperatorNominatorAmountDescNullsLast = 'operator_nominatorAmount_DESC_NULLS_LAST',
  OperatorOperatorOwnerAsc = 'operator_operatorOwner_ASC',
  OperatorOperatorOwnerAscNullsFirst = 'operator_operatorOwner_ASC_NULLS_FIRST',
  OperatorOperatorOwnerDesc = 'operator_operatorOwner_DESC',
  OperatorOperatorOwnerDescNullsLast = 'operator_operatorOwner_DESC_NULLS_LAST',
  OperatorOrderingIdAsc = 'operator_orderingId_ASC',
  OperatorOrderingIdAscNullsFirst = 'operator_orderingId_ASC_NULLS_FIRST',
  OperatorOrderingIdDesc = 'operator_orderingId_DESC',
  OperatorOrderingIdDescNullsLast = 'operator_orderingId_DESC_NULLS_LAST',
  OperatorSigningKeyAsc = 'operator_signingKey_ASC',
  OperatorSigningKeyAscNullsFirst = 'operator_signingKey_ASC_NULLS_FIRST',
  OperatorSigningKeyDesc = 'operator_signingKey_DESC',
  OperatorSigningKeyDescNullsLast = 'operator_signingKey_DESC_NULLS_LAST',
  OperatorStatusAsc = 'operator_status_ASC',
  OperatorStatusAscNullsFirst = 'operator_status_ASC_NULLS_FIRST',
  OperatorStatusDesc = 'operator_status_DESC',
  OperatorStatusDescNullsLast = 'operator_status_DESC_NULLS_LAST',
  OperatorTotalSharesAsc = 'operator_totalShares_ASC',
  OperatorTotalSharesAscNullsFirst = 'operator_totalShares_ASC_NULLS_FIRST',
  OperatorTotalSharesDesc = 'operator_totalShares_DESC',
  OperatorTotalSharesDescNullsLast = 'operator_totalShares_DESC_NULLS_LAST',
  OperatorUpdatedAtAsc = 'operator_updatedAt_ASC',
  OperatorUpdatedAtAscNullsFirst = 'operator_updatedAt_ASC_NULLS_FIRST',
  OperatorUpdatedAtDesc = 'operator_updatedAt_DESC',
  OperatorUpdatedAtDescNullsLast = 'operator_updatedAt_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type DepositWhereInput = {
  AND?: InputMaybe<Array<DepositWhereInput>>;
  OR?: InputMaybe<Array<DepositWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominator?: InputMaybe<NominatorWhereInput>;
  nominatorAccount_contains?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_eq?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_gt?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_gte?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nominatorAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nominatorAccount_lt?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_lte?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nominatorAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operator?: InputMaybe<OperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DepositsConnection = {
  __typename?: 'DepositsConnection';
  edges: Array<DepositEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DomainEpoch = {
  __typename?: 'DomainEpoch';
  domainId: Scalars['Int']['output'];
  epoch: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type DomainEpochEdge = {
  __typename?: 'DomainEpochEdge';
  cursor: Scalars['String']['output'];
  node: DomainEpoch;
};

export enum DomainEpochOrderByInput {
  DomainIdAsc = 'domainId_ASC',
  DomainIdAscNullsFirst = 'domainId_ASC_NULLS_FIRST',
  DomainIdDesc = 'domainId_DESC',
  DomainIdDescNullsLast = 'domainId_DESC_NULLS_LAST',
  EpochAsc = 'epoch_ASC',
  EpochAscNullsFirst = 'epoch_ASC_NULLS_FIRST',
  EpochDesc = 'epoch_DESC',
  EpochDescNullsLast = 'epoch_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST'
}

export type DomainEpochWhereInput = {
  AND?: InputMaybe<Array<DomainEpochWhereInput>>;
  OR?: InputMaybe<Array<DomainEpochWhereInput>>;
  domainId_eq?: InputMaybe<Scalars['Int']['input']>;
  domainId_gt?: InputMaybe<Scalars['Int']['input']>;
  domainId_gte?: InputMaybe<Scalars['Int']['input']>;
  domainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  domainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  domainId_lt?: InputMaybe<Scalars['Int']['input']>;
  domainId_lte?: InputMaybe<Scalars['Int']['input']>;
  domainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  domainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  epoch_eq?: InputMaybe<Scalars['Int']['input']>;
  epoch_gt?: InputMaybe<Scalars['Int']['input']>;
  epoch_gte?: InputMaybe<Scalars['Int']['input']>;
  epoch_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  epoch_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  epoch_lt?: InputMaybe<Scalars['Int']['input']>;
  epoch_lte?: InputMaybe<Scalars['Int']['input']>;
  epoch_not_eq?: InputMaybe<Scalars['Int']['input']>;
  epoch_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  updatedAt_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type DomainEpochesConnection = {
  __typename?: 'DomainEpochesConnection';
  edges: Array<DomainEpochEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Nominator = {
  __typename?: 'Nominator';
  account: Account;
  id: Scalars['String']['output'];
  operator: Operator;
  shares?: Maybe<Scalars['BigInt']['output']>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type NominatorEdge = {
  __typename?: 'NominatorEdge';
  cursor: Scalars['String']['output'];
  node: Nominator;
};

export enum NominatorOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorCurrentDomainIdAsc = 'operator_currentDomainId_ASC',
  OperatorCurrentDomainIdAscNullsFirst = 'operator_currentDomainId_ASC_NULLS_FIRST',
  OperatorCurrentDomainIdDesc = 'operator_currentDomainId_DESC',
  OperatorCurrentDomainIdDescNullsLast = 'operator_currentDomainId_DESC_NULLS_LAST',
  OperatorCurrentEpochRewardsAsc = 'operator_currentEpochRewards_ASC',
  OperatorCurrentEpochRewardsAscNullsFirst = 'operator_currentEpochRewards_ASC_NULLS_FIRST',
  OperatorCurrentEpochRewardsDesc = 'operator_currentEpochRewards_DESC',
  OperatorCurrentEpochRewardsDescNullsLast = 'operator_currentEpochRewards_DESC_NULLS_LAST',
  OperatorCurrentTotalStakeAsc = 'operator_currentTotalStake_ASC',
  OperatorCurrentTotalStakeAscNullsFirst = 'operator_currentTotalStake_ASC_NULLS_FIRST',
  OperatorCurrentTotalStakeDesc = 'operator_currentTotalStake_DESC',
  OperatorCurrentTotalStakeDescNullsLast = 'operator_currentTotalStake_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorMinimumNominatorStakeAsc = 'operator_minimumNominatorStake_ASC',
  OperatorMinimumNominatorStakeAscNullsFirst = 'operator_minimumNominatorStake_ASC_NULLS_FIRST',
  OperatorMinimumNominatorStakeDesc = 'operator_minimumNominatorStake_DESC',
  OperatorMinimumNominatorStakeDescNullsLast = 'operator_minimumNominatorStake_DESC_NULLS_LAST',
  OperatorNextDomainIdAsc = 'operator_nextDomainId_ASC',
  OperatorNextDomainIdAscNullsFirst = 'operator_nextDomainId_ASC_NULLS_FIRST',
  OperatorNextDomainIdDesc = 'operator_nextDomainId_DESC',
  OperatorNextDomainIdDescNullsLast = 'operator_nextDomainId_DESC_NULLS_LAST',
  OperatorNominationTaxAsc = 'operator_nominationTax_ASC',
  OperatorNominationTaxAscNullsFirst = 'operator_nominationTax_ASC_NULLS_FIRST',
  OperatorNominationTaxDesc = 'operator_nominationTax_DESC',
  OperatorNominationTaxDescNullsLast = 'operator_nominationTax_DESC_NULLS_LAST',
  OperatorNominatorAmountAsc = 'operator_nominatorAmount_ASC',
  OperatorNominatorAmountAscNullsFirst = 'operator_nominatorAmount_ASC_NULLS_FIRST',
  OperatorNominatorAmountDesc = 'operator_nominatorAmount_DESC',
  OperatorNominatorAmountDescNullsLast = 'operator_nominatorAmount_DESC_NULLS_LAST',
  OperatorOperatorOwnerAsc = 'operator_operatorOwner_ASC',
  OperatorOperatorOwnerAscNullsFirst = 'operator_operatorOwner_ASC_NULLS_FIRST',
  OperatorOperatorOwnerDesc = 'operator_operatorOwner_DESC',
  OperatorOperatorOwnerDescNullsLast = 'operator_operatorOwner_DESC_NULLS_LAST',
  OperatorOrderingIdAsc = 'operator_orderingId_ASC',
  OperatorOrderingIdAscNullsFirst = 'operator_orderingId_ASC_NULLS_FIRST',
  OperatorOrderingIdDesc = 'operator_orderingId_DESC',
  OperatorOrderingIdDescNullsLast = 'operator_orderingId_DESC_NULLS_LAST',
  OperatorSigningKeyAsc = 'operator_signingKey_ASC',
  OperatorSigningKeyAscNullsFirst = 'operator_signingKey_ASC_NULLS_FIRST',
  OperatorSigningKeyDesc = 'operator_signingKey_DESC',
  OperatorSigningKeyDescNullsLast = 'operator_signingKey_DESC_NULLS_LAST',
  OperatorStatusAsc = 'operator_status_ASC',
  OperatorStatusAscNullsFirst = 'operator_status_ASC_NULLS_FIRST',
  OperatorStatusDesc = 'operator_status_DESC',
  OperatorStatusDescNullsLast = 'operator_status_DESC_NULLS_LAST',
  OperatorTotalSharesAsc = 'operator_totalShares_ASC',
  OperatorTotalSharesAscNullsFirst = 'operator_totalShares_ASC_NULLS_FIRST',
  OperatorTotalSharesDesc = 'operator_totalShares_DESC',
  OperatorTotalSharesDescNullsLast = 'operator_totalShares_DESC_NULLS_LAST',
  OperatorUpdatedAtAsc = 'operator_updatedAt_ASC',
  OperatorUpdatedAtAscNullsFirst = 'operator_updatedAt_ASC_NULLS_FIRST',
  OperatorUpdatedAtDesc = 'operator_updatedAt_DESC',
  OperatorUpdatedAtDescNullsLast = 'operator_updatedAt_DESC_NULLS_LAST',
  SharesAsc = 'shares_ASC',
  SharesAscNullsFirst = 'shares_ASC_NULLS_FIRST',
  SharesDesc = 'shares_DESC',
  SharesDescNullsLast = 'shares_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST'
}

export type NominatorWhereInput = {
  AND?: InputMaybe<Array<NominatorWhereInput>>;
  OR?: InputMaybe<Array<NominatorWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  shares_eq?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  shares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  shares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  status_endsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  status_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  status_not_eq?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_startsWith?: InputMaybe<Scalars['String']['input']>;
  updatedAt_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NominatorsConnection = {
  __typename?: 'NominatorsConnection';
  edges: Array<NominatorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Operator = {
  __typename?: 'Operator';
  currentDomainId?: Maybe<Scalars['Int']['output']>;
  currentEpochRewards?: Maybe<Scalars['BigInt']['output']>;
  currentTotalStake?: Maybe<Scalars['BigInt']['output']>;
  deposits: Array<Deposit>;
  id: Scalars['String']['output'];
  minimumNominatorStake?: Maybe<Scalars['BigInt']['output']>;
  nextDomainId?: Maybe<Scalars['Int']['output']>;
  nominationTax?: Maybe<Scalars['Int']['output']>;
  nominatorAmount: Scalars['Int']['output'];
  nominators: Array<Nominator>;
  operatorOwner?: Maybe<Scalars['String']['output']>;
  operatorRewards: Array<OperatorRewardEvent>;
  orderingId: Scalars['Int']['output'];
  signingKey: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  totalShares?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


export type OperatorDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DepositOrderByInput>>;
  where?: InputMaybe<DepositWhereInput>;
};


export type OperatorNominatorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NominatorOrderByInput>>;
  where?: InputMaybe<NominatorWhereInput>;
};


export type OperatorOperatorRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OperatorRewardEventOrderByInput>>;
  where?: InputMaybe<OperatorRewardEventWhereInput>;
};

export type OperatorEdge = {
  __typename?: 'OperatorEdge';
  cursor: Scalars['String']['output'];
  node: Operator;
};

export enum OperatorOrderByInput {
  CurrentDomainIdAsc = 'currentDomainId_ASC',
  CurrentDomainIdAscNullsFirst = 'currentDomainId_ASC_NULLS_FIRST',
  CurrentDomainIdDesc = 'currentDomainId_DESC',
  CurrentDomainIdDescNullsLast = 'currentDomainId_DESC_NULLS_LAST',
  CurrentEpochRewardsAsc = 'currentEpochRewards_ASC',
  CurrentEpochRewardsAscNullsFirst = 'currentEpochRewards_ASC_NULLS_FIRST',
  CurrentEpochRewardsDesc = 'currentEpochRewards_DESC',
  CurrentEpochRewardsDescNullsLast = 'currentEpochRewards_DESC_NULLS_LAST',
  CurrentTotalStakeAsc = 'currentTotalStake_ASC',
  CurrentTotalStakeAscNullsFirst = 'currentTotalStake_ASC_NULLS_FIRST',
  CurrentTotalStakeDesc = 'currentTotalStake_DESC',
  CurrentTotalStakeDescNullsLast = 'currentTotalStake_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MinimumNominatorStakeAsc = 'minimumNominatorStake_ASC',
  MinimumNominatorStakeAscNullsFirst = 'minimumNominatorStake_ASC_NULLS_FIRST',
  MinimumNominatorStakeDesc = 'minimumNominatorStake_DESC',
  MinimumNominatorStakeDescNullsLast = 'minimumNominatorStake_DESC_NULLS_LAST',
  NextDomainIdAsc = 'nextDomainId_ASC',
  NextDomainIdAscNullsFirst = 'nextDomainId_ASC_NULLS_FIRST',
  NextDomainIdDesc = 'nextDomainId_DESC',
  NextDomainIdDescNullsLast = 'nextDomainId_DESC_NULLS_LAST',
  NominationTaxAsc = 'nominationTax_ASC',
  NominationTaxAscNullsFirst = 'nominationTax_ASC_NULLS_FIRST',
  NominationTaxDesc = 'nominationTax_DESC',
  NominationTaxDescNullsLast = 'nominationTax_DESC_NULLS_LAST',
  NominatorAmountAsc = 'nominatorAmount_ASC',
  NominatorAmountAscNullsFirst = 'nominatorAmount_ASC_NULLS_FIRST',
  NominatorAmountDesc = 'nominatorAmount_DESC',
  NominatorAmountDescNullsLast = 'nominatorAmount_DESC_NULLS_LAST',
  OperatorOwnerAsc = 'operatorOwner_ASC',
  OperatorOwnerAscNullsFirst = 'operatorOwner_ASC_NULLS_FIRST',
  OperatorOwnerDesc = 'operatorOwner_DESC',
  OperatorOwnerDescNullsLast = 'operatorOwner_DESC_NULLS_LAST',
  OrderingIdAsc = 'orderingId_ASC',
  OrderingIdAscNullsFirst = 'orderingId_ASC_NULLS_FIRST',
  OrderingIdDesc = 'orderingId_DESC',
  OrderingIdDescNullsLast = 'orderingId_DESC_NULLS_LAST',
  SigningKeyAsc = 'signingKey_ASC',
  SigningKeyAscNullsFirst = 'signingKey_ASC_NULLS_FIRST',
  SigningKeyDesc = 'signingKey_DESC',
  SigningKeyDescNullsLast = 'signingKey_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TotalSharesAsc = 'totalShares_ASC',
  TotalSharesAscNullsFirst = 'totalShares_ASC_NULLS_FIRST',
  TotalSharesDesc = 'totalShares_DESC',
  TotalSharesDescNullsLast = 'totalShares_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST'
}

export type OperatorReward = {
  __typename?: 'OperatorReward';
  amount?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['String']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type OperatorRewardEdge = {
  __typename?: 'OperatorRewardEdge';
  cursor: Scalars['String']['output'];
  node: OperatorReward;
};

export type OperatorRewardEvent = {
  __typename?: 'OperatorRewardEvent';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  indexInBlock: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  operator: Operator;
  timestamp: Scalars['DateTime']['output'];
};

export type OperatorRewardEventEdge = {
  __typename?: 'OperatorRewardEventEdge';
  cursor: Scalars['String']['output'];
  node: OperatorRewardEvent;
};

export enum OperatorRewardEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockAscNullsFirst = 'indexInBlock_ASC_NULLS_FIRST',
  IndexInBlockDesc = 'indexInBlock_DESC',
  IndexInBlockDescNullsLast = 'indexInBlock_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  OperatorCurrentDomainIdAsc = 'operator_currentDomainId_ASC',
  OperatorCurrentDomainIdAscNullsFirst = 'operator_currentDomainId_ASC_NULLS_FIRST',
  OperatorCurrentDomainIdDesc = 'operator_currentDomainId_DESC',
  OperatorCurrentDomainIdDescNullsLast = 'operator_currentDomainId_DESC_NULLS_LAST',
  OperatorCurrentEpochRewardsAsc = 'operator_currentEpochRewards_ASC',
  OperatorCurrentEpochRewardsAscNullsFirst = 'operator_currentEpochRewards_ASC_NULLS_FIRST',
  OperatorCurrentEpochRewardsDesc = 'operator_currentEpochRewards_DESC',
  OperatorCurrentEpochRewardsDescNullsLast = 'operator_currentEpochRewards_DESC_NULLS_LAST',
  OperatorCurrentTotalStakeAsc = 'operator_currentTotalStake_ASC',
  OperatorCurrentTotalStakeAscNullsFirst = 'operator_currentTotalStake_ASC_NULLS_FIRST',
  OperatorCurrentTotalStakeDesc = 'operator_currentTotalStake_DESC',
  OperatorCurrentTotalStakeDescNullsLast = 'operator_currentTotalStake_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorMinimumNominatorStakeAsc = 'operator_minimumNominatorStake_ASC',
  OperatorMinimumNominatorStakeAscNullsFirst = 'operator_minimumNominatorStake_ASC_NULLS_FIRST',
  OperatorMinimumNominatorStakeDesc = 'operator_minimumNominatorStake_DESC',
  OperatorMinimumNominatorStakeDescNullsLast = 'operator_minimumNominatorStake_DESC_NULLS_LAST',
  OperatorNextDomainIdAsc = 'operator_nextDomainId_ASC',
  OperatorNextDomainIdAscNullsFirst = 'operator_nextDomainId_ASC_NULLS_FIRST',
  OperatorNextDomainIdDesc = 'operator_nextDomainId_DESC',
  OperatorNextDomainIdDescNullsLast = 'operator_nextDomainId_DESC_NULLS_LAST',
  OperatorNominationTaxAsc = 'operator_nominationTax_ASC',
  OperatorNominationTaxAscNullsFirst = 'operator_nominationTax_ASC_NULLS_FIRST',
  OperatorNominationTaxDesc = 'operator_nominationTax_DESC',
  OperatorNominationTaxDescNullsLast = 'operator_nominationTax_DESC_NULLS_LAST',
  OperatorNominatorAmountAsc = 'operator_nominatorAmount_ASC',
  OperatorNominatorAmountAscNullsFirst = 'operator_nominatorAmount_ASC_NULLS_FIRST',
  OperatorNominatorAmountDesc = 'operator_nominatorAmount_DESC',
  OperatorNominatorAmountDescNullsLast = 'operator_nominatorAmount_DESC_NULLS_LAST',
  OperatorOperatorOwnerAsc = 'operator_operatorOwner_ASC',
  OperatorOperatorOwnerAscNullsFirst = 'operator_operatorOwner_ASC_NULLS_FIRST',
  OperatorOperatorOwnerDesc = 'operator_operatorOwner_DESC',
  OperatorOperatorOwnerDescNullsLast = 'operator_operatorOwner_DESC_NULLS_LAST',
  OperatorOrderingIdAsc = 'operator_orderingId_ASC',
  OperatorOrderingIdAscNullsFirst = 'operator_orderingId_ASC_NULLS_FIRST',
  OperatorOrderingIdDesc = 'operator_orderingId_DESC',
  OperatorOrderingIdDescNullsLast = 'operator_orderingId_DESC_NULLS_LAST',
  OperatorSigningKeyAsc = 'operator_signingKey_ASC',
  OperatorSigningKeyAscNullsFirst = 'operator_signingKey_ASC_NULLS_FIRST',
  OperatorSigningKeyDesc = 'operator_signingKey_DESC',
  OperatorSigningKeyDescNullsLast = 'operator_signingKey_DESC_NULLS_LAST',
  OperatorStatusAsc = 'operator_status_ASC',
  OperatorStatusAscNullsFirst = 'operator_status_ASC_NULLS_FIRST',
  OperatorStatusDesc = 'operator_status_DESC',
  OperatorStatusDescNullsLast = 'operator_status_DESC_NULLS_LAST',
  OperatorTotalSharesAsc = 'operator_totalShares_ASC',
  OperatorTotalSharesAscNullsFirst = 'operator_totalShares_ASC_NULLS_FIRST',
  OperatorTotalSharesDesc = 'operator_totalShares_DESC',
  OperatorTotalSharesDescNullsLast = 'operator_totalShares_DESC_NULLS_LAST',
  OperatorUpdatedAtAsc = 'operator_updatedAt_ASC',
  OperatorUpdatedAtAscNullsFirst = 'operator_updatedAt_ASC_NULLS_FIRST',
  OperatorUpdatedAtDesc = 'operator_updatedAt_DESC',
  OperatorUpdatedAtDescNullsLast = 'operator_updatedAt_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OperatorRewardEventWhereInput = {
  AND?: InputMaybe<Array<OperatorRewardEventWhereInput>>;
  OR?: InputMaybe<Array<OperatorRewardEventWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  indexInBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexInBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  indexInBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type OperatorRewardEventsConnection = {
  __typename?: 'OperatorRewardEventsConnection';
  edges: Array<OperatorRewardEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OperatorRewardOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST'
}

export type OperatorRewardWhereInput = {
  AND?: InputMaybe<Array<OperatorRewardWhereInput>>;
  OR?: InputMaybe<Array<OperatorRewardWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  updatedAt_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type OperatorRewardsConnection = {
  __typename?: 'OperatorRewardsConnection';
  edges: Array<OperatorRewardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OperatorUnlockedFunds = {
  __typename?: 'OperatorUnlockedFunds';
  amount?: Maybe<Scalars['BigInt']['output']>;
  blockNumber: Scalars['Int']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  nominator: Nominator;
  nominatorAccount: Scalars['String']['output'];
  operator: Operator;
  timestamp: Scalars['DateTime']['output'];
};

export type OperatorUnlockedFundsConnection = {
  __typename?: 'OperatorUnlockedFundsConnection';
  edges: Array<OperatorUnlockedFundsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OperatorUnlockedFundsEdge = {
  __typename?: 'OperatorUnlockedFundsEdge';
  cursor: Scalars['String']['output'];
  node: OperatorUnlockedFunds;
};

export enum OperatorUnlockedFundsOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NominatorAccountAsc = 'nominatorAccount_ASC',
  NominatorAccountAscNullsFirst = 'nominatorAccount_ASC_NULLS_FIRST',
  NominatorAccountDesc = 'nominatorAccount_DESC',
  NominatorAccountDescNullsLast = 'nominatorAccount_DESC_NULLS_LAST',
  NominatorIdAsc = 'nominator_id_ASC',
  NominatorIdAscNullsFirst = 'nominator_id_ASC_NULLS_FIRST',
  NominatorIdDesc = 'nominator_id_DESC',
  NominatorIdDescNullsLast = 'nominator_id_DESC_NULLS_LAST',
  NominatorSharesAsc = 'nominator_shares_ASC',
  NominatorSharesAscNullsFirst = 'nominator_shares_ASC_NULLS_FIRST',
  NominatorSharesDesc = 'nominator_shares_DESC',
  NominatorSharesDescNullsLast = 'nominator_shares_DESC_NULLS_LAST',
  NominatorStatusAsc = 'nominator_status_ASC',
  NominatorStatusAscNullsFirst = 'nominator_status_ASC_NULLS_FIRST',
  NominatorStatusDesc = 'nominator_status_DESC',
  NominatorStatusDescNullsLast = 'nominator_status_DESC_NULLS_LAST',
  NominatorUpdatedAtAsc = 'nominator_updatedAt_ASC',
  NominatorUpdatedAtAscNullsFirst = 'nominator_updatedAt_ASC_NULLS_FIRST',
  NominatorUpdatedAtDesc = 'nominator_updatedAt_DESC',
  NominatorUpdatedAtDescNullsLast = 'nominator_updatedAt_DESC_NULLS_LAST',
  OperatorCurrentDomainIdAsc = 'operator_currentDomainId_ASC',
  OperatorCurrentDomainIdAscNullsFirst = 'operator_currentDomainId_ASC_NULLS_FIRST',
  OperatorCurrentDomainIdDesc = 'operator_currentDomainId_DESC',
  OperatorCurrentDomainIdDescNullsLast = 'operator_currentDomainId_DESC_NULLS_LAST',
  OperatorCurrentEpochRewardsAsc = 'operator_currentEpochRewards_ASC',
  OperatorCurrentEpochRewardsAscNullsFirst = 'operator_currentEpochRewards_ASC_NULLS_FIRST',
  OperatorCurrentEpochRewardsDesc = 'operator_currentEpochRewards_DESC',
  OperatorCurrentEpochRewardsDescNullsLast = 'operator_currentEpochRewards_DESC_NULLS_LAST',
  OperatorCurrentTotalStakeAsc = 'operator_currentTotalStake_ASC',
  OperatorCurrentTotalStakeAscNullsFirst = 'operator_currentTotalStake_ASC_NULLS_FIRST',
  OperatorCurrentTotalStakeDesc = 'operator_currentTotalStake_DESC',
  OperatorCurrentTotalStakeDescNullsLast = 'operator_currentTotalStake_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorMinimumNominatorStakeAsc = 'operator_minimumNominatorStake_ASC',
  OperatorMinimumNominatorStakeAscNullsFirst = 'operator_minimumNominatorStake_ASC_NULLS_FIRST',
  OperatorMinimumNominatorStakeDesc = 'operator_minimumNominatorStake_DESC',
  OperatorMinimumNominatorStakeDescNullsLast = 'operator_minimumNominatorStake_DESC_NULLS_LAST',
  OperatorNextDomainIdAsc = 'operator_nextDomainId_ASC',
  OperatorNextDomainIdAscNullsFirst = 'operator_nextDomainId_ASC_NULLS_FIRST',
  OperatorNextDomainIdDesc = 'operator_nextDomainId_DESC',
  OperatorNextDomainIdDescNullsLast = 'operator_nextDomainId_DESC_NULLS_LAST',
  OperatorNominationTaxAsc = 'operator_nominationTax_ASC',
  OperatorNominationTaxAscNullsFirst = 'operator_nominationTax_ASC_NULLS_FIRST',
  OperatorNominationTaxDesc = 'operator_nominationTax_DESC',
  OperatorNominationTaxDescNullsLast = 'operator_nominationTax_DESC_NULLS_LAST',
  OperatorNominatorAmountAsc = 'operator_nominatorAmount_ASC',
  OperatorNominatorAmountAscNullsFirst = 'operator_nominatorAmount_ASC_NULLS_FIRST',
  OperatorNominatorAmountDesc = 'operator_nominatorAmount_DESC',
  OperatorNominatorAmountDescNullsLast = 'operator_nominatorAmount_DESC_NULLS_LAST',
  OperatorOperatorOwnerAsc = 'operator_operatorOwner_ASC',
  OperatorOperatorOwnerAscNullsFirst = 'operator_operatorOwner_ASC_NULLS_FIRST',
  OperatorOperatorOwnerDesc = 'operator_operatorOwner_DESC',
  OperatorOperatorOwnerDescNullsLast = 'operator_operatorOwner_DESC_NULLS_LAST',
  OperatorOrderingIdAsc = 'operator_orderingId_ASC',
  OperatorOrderingIdAscNullsFirst = 'operator_orderingId_ASC_NULLS_FIRST',
  OperatorOrderingIdDesc = 'operator_orderingId_DESC',
  OperatorOrderingIdDescNullsLast = 'operator_orderingId_DESC_NULLS_LAST',
  OperatorSigningKeyAsc = 'operator_signingKey_ASC',
  OperatorSigningKeyAscNullsFirst = 'operator_signingKey_ASC_NULLS_FIRST',
  OperatorSigningKeyDesc = 'operator_signingKey_DESC',
  OperatorSigningKeyDescNullsLast = 'operator_signingKey_DESC_NULLS_LAST',
  OperatorStatusAsc = 'operator_status_ASC',
  OperatorStatusAscNullsFirst = 'operator_status_ASC_NULLS_FIRST',
  OperatorStatusDesc = 'operator_status_DESC',
  OperatorStatusDescNullsLast = 'operator_status_DESC_NULLS_LAST',
  OperatorTotalSharesAsc = 'operator_totalShares_ASC',
  OperatorTotalSharesAscNullsFirst = 'operator_totalShares_ASC_NULLS_FIRST',
  OperatorTotalSharesDesc = 'operator_totalShares_DESC',
  OperatorTotalSharesDescNullsLast = 'operator_totalShares_DESC_NULLS_LAST',
  OperatorUpdatedAtAsc = 'operator_updatedAt_ASC',
  OperatorUpdatedAtAscNullsFirst = 'operator_updatedAt_ASC_NULLS_FIRST',
  OperatorUpdatedAtDesc = 'operator_updatedAt_DESC',
  OperatorUpdatedAtDescNullsLast = 'operator_updatedAt_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OperatorUnlockedFundsWhereInput = {
  AND?: InputMaybe<Array<OperatorUnlockedFundsWhereInput>>;
  OR?: InputMaybe<Array<OperatorUnlockedFundsWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominator?: InputMaybe<NominatorWhereInput>;
  nominatorAccount_contains?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_endsWith?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_eq?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_gt?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_gte?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nominatorAccount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nominatorAccount_lt?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_lte?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_contains?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_eq?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nominatorAccount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominatorAccount_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operator?: InputMaybe<OperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type OperatorWhereInput = {
  AND?: InputMaybe<Array<OperatorWhereInput>>;
  OR?: InputMaybe<Array<OperatorWhereInput>>;
  currentDomainId_eq?: InputMaybe<Scalars['Int']['input']>;
  currentDomainId_gt?: InputMaybe<Scalars['Int']['input']>;
  currentDomainId_gte?: InputMaybe<Scalars['Int']['input']>;
  currentDomainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentDomainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentDomainId_lt?: InputMaybe<Scalars['Int']['input']>;
  currentDomainId_lte?: InputMaybe<Scalars['Int']['input']>;
  currentDomainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  currentDomainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentEpochRewards_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentEpochRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentEpochRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentEpochRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentEpochRewards_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentEpochRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentEpochRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentEpochRewards_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentEpochRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentTotalStake_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentTotalStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentTotalStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentTotalStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentTotalStake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentTotalStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentTotalStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentTotalStake_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentTotalStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deposits_every?: InputMaybe<DepositWhereInput>;
  deposits_none?: InputMaybe<DepositWhereInput>;
  deposits_some?: InputMaybe<DepositWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  minimumNominatorStake_eq?: InputMaybe<Scalars['BigInt']['input']>;
  minimumNominatorStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumNominatorStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumNominatorStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minimumNominatorStake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  minimumNominatorStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumNominatorStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumNominatorStake_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  minimumNominatorStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nextDomainId_eq?: InputMaybe<Scalars['Int']['input']>;
  nextDomainId_gt?: InputMaybe<Scalars['Int']['input']>;
  nextDomainId_gte?: InputMaybe<Scalars['Int']['input']>;
  nextDomainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nextDomainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nextDomainId_lt?: InputMaybe<Scalars['Int']['input']>;
  nextDomainId_lte?: InputMaybe<Scalars['Int']['input']>;
  nextDomainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  nextDomainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nominationTax_eq?: InputMaybe<Scalars['Int']['input']>;
  nominationTax_gt?: InputMaybe<Scalars['Int']['input']>;
  nominationTax_gte?: InputMaybe<Scalars['Int']['input']>;
  nominationTax_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nominationTax_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nominationTax_lt?: InputMaybe<Scalars['Int']['input']>;
  nominationTax_lte?: InputMaybe<Scalars['Int']['input']>;
  nominationTax_not_eq?: InputMaybe<Scalars['Int']['input']>;
  nominationTax_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nominatorAmount_eq?: InputMaybe<Scalars['Int']['input']>;
  nominatorAmount_gt?: InputMaybe<Scalars['Int']['input']>;
  nominatorAmount_gte?: InputMaybe<Scalars['Int']['input']>;
  nominatorAmount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nominatorAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nominatorAmount_lt?: InputMaybe<Scalars['Int']['input']>;
  nominatorAmount_lte?: InputMaybe<Scalars['Int']['input']>;
  nominatorAmount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  nominatorAmount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  nominators_every?: InputMaybe<NominatorWhereInput>;
  nominators_none?: InputMaybe<NominatorWhereInput>;
  nominators_some?: InputMaybe<NominatorWhereInput>;
  operatorOwner_contains?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_endsWith?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_eq?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_gt?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_gte?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operatorOwner_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operatorOwner_lt?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_lte?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_not_contains?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_not_eq?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  operatorOwner_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  operatorOwner_startsWith?: InputMaybe<Scalars['String']['input']>;
  operatorRewards_every?: InputMaybe<OperatorRewardEventWhereInput>;
  operatorRewards_none?: InputMaybe<OperatorRewardEventWhereInput>;
  operatorRewards_some?: InputMaybe<OperatorRewardEventWhereInput>;
  orderingId_eq?: InputMaybe<Scalars['Int']['input']>;
  orderingId_gt?: InputMaybe<Scalars['Int']['input']>;
  orderingId_gte?: InputMaybe<Scalars['Int']['input']>;
  orderingId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  orderingId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  orderingId_lt?: InputMaybe<Scalars['Int']['input']>;
  orderingId_lte?: InputMaybe<Scalars['Int']['input']>;
  orderingId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  orderingId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signingKey_contains?: InputMaybe<Scalars['String']['input']>;
  signingKey_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signingKey_endsWith?: InputMaybe<Scalars['String']['input']>;
  signingKey_eq?: InputMaybe<Scalars['String']['input']>;
  signingKey_gt?: InputMaybe<Scalars['String']['input']>;
  signingKey_gte?: InputMaybe<Scalars['String']['input']>;
  signingKey_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signingKey_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signingKey_lt?: InputMaybe<Scalars['String']['input']>;
  signingKey_lte?: InputMaybe<Scalars['String']['input']>;
  signingKey_not_contains?: InputMaybe<Scalars['String']['input']>;
  signingKey_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signingKey_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  signingKey_not_eq?: InputMaybe<Scalars['String']['input']>;
  signingKey_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signingKey_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  signingKey_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  status_endsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  status_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  status_not_eq?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalShares_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalShares_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type OperatorsConnection = {
  __typename?: 'OperatorsConnection';
  edges: Array<OperatorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  accountById?: Maybe<Account>;
  /** @deprecated Use accountById */
  accountByUniqueInput?: Maybe<Account>;
  accountRewardById?: Maybe<AccountReward>;
  /** @deprecated Use accountRewardById */
  accountRewardByUniqueInput?: Maybe<AccountReward>;
  accountRewards: Array<AccountReward>;
  accountRewardsConnection: AccountRewardsConnection;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  depositById?: Maybe<Deposit>;
  /** @deprecated Use depositById */
  depositByUniqueInput?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  depositsConnection: DepositsConnection;
  domainEpochById?: Maybe<DomainEpoch>;
  /** @deprecated Use domainEpochById */
  domainEpochByUniqueInput?: Maybe<DomainEpoch>;
  domainEpoches: Array<DomainEpoch>;
  domainEpochesConnection: DomainEpochesConnection;
  nominatorById?: Maybe<Nominator>;
  /** @deprecated Use nominatorById */
  nominatorByUniqueInput?: Maybe<Nominator>;
  nominators: Array<Nominator>;
  nominatorsConnection: NominatorsConnection;
  operatorById?: Maybe<Operator>;
  /** @deprecated Use operatorById */
  operatorByUniqueInput?: Maybe<Operator>;
  operatorRewardById?: Maybe<OperatorReward>;
  /** @deprecated Use operatorRewardById */
  operatorRewardByUniqueInput?: Maybe<OperatorReward>;
  operatorRewardEventById?: Maybe<OperatorRewardEvent>;
  /** @deprecated Use operatorRewardEventById */
  operatorRewardEventByUniqueInput?: Maybe<OperatorRewardEvent>;
  operatorRewardEvents: Array<OperatorRewardEvent>;
  operatorRewardEventsConnection: OperatorRewardEventsConnection;
  operatorRewards: Array<OperatorReward>;
  operatorRewardsConnection: OperatorRewardsConnection;
  operatorUnlockedFunds: Array<OperatorUnlockedFunds>;
  operatorUnlockedFundsById?: Maybe<OperatorUnlockedFunds>;
  /** @deprecated Use operatorUnlockedFundsById */
  operatorUnlockedFundsByUniqueInput?: Maybe<OperatorUnlockedFunds>;
  operatorUnlockedFundsConnection: OperatorUnlockedFundsConnection;
  operators: Array<Operator>;
  operatorsConnection: OperatorsConnection;
  rewardEventById?: Maybe<RewardEvent>;
  /** @deprecated Use rewardEventById */
  rewardEventByUniqueInput?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  rewardEventsConnection: RewardEventsConnection;
  squidStatus?: Maybe<SquidStatus>;
};


export type QueryAccountByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryAccountByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryAccountRewardByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryAccountRewardByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryAccountRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountRewardOrderByInput>>;
  where?: InputMaybe<AccountRewardWhereInput>;
};


export type QueryAccountRewardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountRewardOrderByInput>;
  where?: InputMaybe<AccountRewardWhereInput>;
};


export type QueryAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountOrderByInput>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryDepositByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryDepositByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DepositOrderByInput>>;
  where?: InputMaybe<DepositWhereInput>;
};


export type QueryDepositsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<DepositOrderByInput>;
  where?: InputMaybe<DepositWhereInput>;
};


export type QueryDomainEpochByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryDomainEpochByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryDomainEpochesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DomainEpochOrderByInput>>;
  where?: InputMaybe<DomainEpochWhereInput>;
};


export type QueryDomainEpochesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<DomainEpochOrderByInput>;
  where?: InputMaybe<DomainEpochWhereInput>;
};


export type QueryNominatorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryNominatorByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryNominatorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NominatorOrderByInput>>;
  where?: InputMaybe<NominatorWhereInput>;
};


export type QueryNominatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<NominatorOrderByInput>;
  where?: InputMaybe<NominatorWhereInput>;
};


export type QueryOperatorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOperatorByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOperatorRewardByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOperatorRewardByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOperatorRewardEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOperatorRewardEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOperatorRewardEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OperatorRewardEventOrderByInput>>;
  where?: InputMaybe<OperatorRewardEventWhereInput>;
};


export type QueryOperatorRewardEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OperatorRewardEventOrderByInput>;
  where?: InputMaybe<OperatorRewardEventWhereInput>;
};


export type QueryOperatorRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OperatorRewardOrderByInput>>;
  where?: InputMaybe<OperatorRewardWhereInput>;
};


export type QueryOperatorRewardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OperatorRewardOrderByInput>;
  where?: InputMaybe<OperatorRewardWhereInput>;
};


export type QueryOperatorUnlockedFundsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OperatorUnlockedFundsOrderByInput>>;
  where?: InputMaybe<OperatorUnlockedFundsWhereInput>;
};


export type QueryOperatorUnlockedFundsByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOperatorUnlockedFundsByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOperatorUnlockedFundsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OperatorUnlockedFundsOrderByInput>;
  where?: InputMaybe<OperatorUnlockedFundsWhereInput>;
};


export type QueryOperatorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OperatorOrderByInput>>;
  where?: InputMaybe<OperatorWhereInput>;
};


export type QueryOperatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OperatorOrderByInput>;
  where?: InputMaybe<OperatorWhereInput>;
};


export type QueryRewardEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryRewardEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryRewardEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RewardEventOrderByInput>>;
  where?: InputMaybe<RewardEventWhereInput>;
};


export type QueryRewardEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<RewardEventOrderByInput>;
  where?: InputMaybe<RewardEventWhereInput>;
};

export type RewardEvent = {
  __typename?: 'RewardEvent';
  account: Account;
  amount?: Maybe<Scalars['BigInt']['output']>;
  blockNumber: Scalars['Int']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  indexInBlock: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type RewardEventEdge = {
  __typename?: 'RewardEventEdge';
  cursor: Scalars['String']['output'];
  node: RewardEvent;
};

export enum RewardEventOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockAscNullsFirst = 'indexInBlock_ASC_NULLS_FIRST',
  IndexInBlockDesc = 'indexInBlock_DESC',
  IndexInBlockDescNullsLast = 'indexInBlock_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type RewardEventWhereInput = {
  AND?: InputMaybe<Array<RewardEventWhereInput>>;
  OR?: InputMaybe<Array<RewardEventWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  indexInBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  indexInBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  indexInBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  indexInBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type RewardEventsConnection = {
  __typename?: 'RewardEventsConnection';
  edges: Array<RewardEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type GetCurrentBlockNumberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentBlockNumberQuery = { __typename?: 'Query', squidStatus?: { __typename?: 'SquidStatus', height?: number | null } | null };

export type GetAllOperatorsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy: Array<OperatorOrderByInput> | OperatorOrderByInput;
}>;


export type GetAllOperatorsQuery = { __typename?: 'Query', operatorsConnection: { __typename?: 'OperatorsConnection', totalCount: number, edges: Array<{ __typename?: 'OperatorEdge', node: { __typename?: 'Operator', updatedAt?: number | null, signingKey: string, orderingId: number, status?: string | null, totalShares?: any | null, operatorOwner?: string | null, nominatorAmount: number, nominationTax?: number | null, nextDomainId?: number | null, minimumNominatorStake?: any | null, id: string, currentTotalStake?: any | null, currentEpochRewards?: any | null, currentDomainId?: number | null, operatorRewards: Array<{ __typename?: 'OperatorRewardEvent', amount: any }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type GetAllNominatorsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<NominatorOrderByInput> | NominatorOrderByInput;
}>;


export type GetAllNominatorsQuery = { __typename?: 'Query', operatorsConnection: { __typename?: 'OperatorsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string }, edges: Array<{ __typename?: 'OperatorEdge', cursor: string, node: { __typename?: 'Operator', updatedAt?: number | null, signingKey: string, orderingId: number, status?: string | null, totalShares?: any | null, operatorOwner?: string | null, nominatorAmount: number, nominationTax?: number | null, nextDomainId?: number | null, minimumNominatorStake?: any | null, id: string, currentTotalStake?: any | null, currentEpochRewards?: any | null, currentDomainId?: number | null, operatorRewards: Array<{ __typename?: 'OperatorRewardEvent', amount: any }> } }> }, nominatorsConnection: { __typename?: 'NominatorsConnection', totalCount: number, edges: Array<{ __typename?: 'NominatorEdge', cursor: string, node: { __typename?: 'Nominator', shares?: any | null, status: string, updatedAt?: number | null, id: string, operator: { __typename?: 'Operator', id: string, currentDomainId?: number | null, currentTotalStake?: any | null, totalShares?: any | null }, account: { __typename?: 'Account', id: string } } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };
