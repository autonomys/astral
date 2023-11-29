/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Big number integer */
  BigInt: any;
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: any;
  /** A scalar that can represent any JSON value */
  JSON: any;
};

export type Account = {
  __typename?: 'Account';
  blockRewardsTotal?: Maybe<Scalars['BigInt']>;
  extrinsics: Array<Extrinsic>;
  free?: Maybe<Scalars['BigInt']>;
  id: Scalars['String'];
  nonce?: Maybe<Scalars['BigInt']>;
  reserved?: Maybe<Scalars['BigInt']>;
  rewards: Array<RewardEvent>;
  total?: Maybe<Scalars['BigInt']>;
  updatedAt?: Maybe<Scalars['BigInt']>;
  voteRewardsTotal?: Maybe<Scalars['BigInt']>;
};


export type AccountExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type AccountRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RewardEventOrderByInput>>;
  where?: InputMaybe<RewardEventWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String'];
  node: Account;
};

export enum AccountOrderByInput {
  BlockRewardsTotalAsc = 'blockRewardsTotal_ASC',
  BlockRewardsTotalDesc = 'blockRewardsTotal_DESC',
  FreeAsc = 'free_ASC',
  FreeDesc = 'free_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NonceAsc = 'nonce_ASC',
  NonceDesc = 'nonce_DESC',
  ReservedAsc = 'reserved_ASC',
  ReservedDesc = 'reserved_DESC',
  TotalAsc = 'total_ASC',
  TotalDesc = 'total_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VoteRewardsTotalAsc = 'voteRewardsTotal_ASC',
  VoteRewardsTotalDesc = 'voteRewardsTotal_DESC'
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  blockRewardsTotal_eq?: InputMaybe<Scalars['BigInt']>;
  blockRewardsTotal_gt?: InputMaybe<Scalars['BigInt']>;
  blockRewardsTotal_gte?: InputMaybe<Scalars['BigInt']>;
  blockRewardsTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockRewardsTotal_isNull?: InputMaybe<Scalars['Boolean']>;
  blockRewardsTotal_lt?: InputMaybe<Scalars['BigInt']>;
  blockRewardsTotal_lte?: InputMaybe<Scalars['BigInt']>;
  blockRewardsTotal_not_eq?: InputMaybe<Scalars['BigInt']>;
  blockRewardsTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  extrinsics_every?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_none?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_some?: InputMaybe<ExtrinsicWhereInput>;
  free_eq?: InputMaybe<Scalars['BigInt']>;
  free_gt?: InputMaybe<Scalars['BigInt']>;
  free_gte?: InputMaybe<Scalars['BigInt']>;
  free_in?: InputMaybe<Array<Scalars['BigInt']>>;
  free_isNull?: InputMaybe<Scalars['Boolean']>;
  free_lt?: InputMaybe<Scalars['BigInt']>;
  free_lte?: InputMaybe<Scalars['BigInt']>;
  free_not_eq?: InputMaybe<Scalars['BigInt']>;
  free_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  nonce_eq?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_isNull?: InputMaybe<Scalars['Boolean']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_not_eq?: InputMaybe<Scalars['BigInt']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserved_eq?: InputMaybe<Scalars['BigInt']>;
  reserved_gt?: InputMaybe<Scalars['BigInt']>;
  reserved_gte?: InputMaybe<Scalars['BigInt']>;
  reserved_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserved_isNull?: InputMaybe<Scalars['Boolean']>;
  reserved_lt?: InputMaybe<Scalars['BigInt']>;
  reserved_lte?: InputMaybe<Scalars['BigInt']>;
  reserved_not_eq?: InputMaybe<Scalars['BigInt']>;
  reserved_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewards_every?: InputMaybe<RewardEventWhereInput>;
  rewards_none?: InputMaybe<RewardEventWhereInput>;
  rewards_some?: InputMaybe<RewardEventWhereInput>;
  total_eq?: InputMaybe<Scalars['BigInt']>;
  total_gt?: InputMaybe<Scalars['BigInt']>;
  total_gte?: InputMaybe<Scalars['BigInt']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']>;
  total_lt?: InputMaybe<Scalars['BigInt']>;
  total_lte?: InputMaybe<Scalars['BigInt']>;
  total_not_eq?: InputMaybe<Scalars['BigInt']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_eq?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_eq?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteRewardsTotal_eq?: InputMaybe<Scalars['BigInt']>;
  voteRewardsTotal_gt?: InputMaybe<Scalars['BigInt']>;
  voteRewardsTotal_gte?: InputMaybe<Scalars['BigInt']>;
  voteRewardsTotal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteRewardsTotal_isNull?: InputMaybe<Scalars['Boolean']>;
  voteRewardsTotal_lt?: InputMaybe<Scalars['BigInt']>;
  voteRewardsTotal_lte?: InputMaybe<Scalars['BigInt']>;
  voteRewardsTotal_not_eq?: InputMaybe<Scalars['BigInt']>;
  voteRewardsTotal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Block = {
  __typename?: 'Block';
  author?: Maybe<Account>;
  blockchainSize: Scalars['BigInt'];
  calls: Array<Call>;
  events: Array<Event>;
  eventsCount: Scalars['Int'];
  extrinsics: Array<Extrinsic>;
  extrinsicsCount: Scalars['Int'];
  extrinsicsRoot: Scalars['String'];
  hash: Scalars['String'];
  height: Scalars['BigInt'];
  id: Scalars['String'];
  logs: Array<Log>;
  parentHash: Scalars['String'];
  rewards: Array<RewardEvent>;
  spacePledged: Scalars['BigInt'];
  specId: Scalars['String'];
  stateRoot: Scalars['String'];
  timestamp: Scalars['DateTime'];
};


export type BlockCallsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type BlockEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type BlockExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type BlockLogsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LogOrderByInput>>;
  where?: InputMaybe<LogWhereInput>;
};


export type BlockRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RewardEventOrderByInput>>;
  where?: InputMaybe<RewardEventWhereInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String'];
  node: Block;
};

export enum BlockOrderByInput {
  AuthorBlockRewardsTotalAsc = 'author_blockRewardsTotal_ASC',
  AuthorBlockRewardsTotalDesc = 'author_blockRewardsTotal_DESC',
  AuthorFreeAsc = 'author_free_ASC',
  AuthorFreeDesc = 'author_free_DESC',
  AuthorIdAsc = 'author_id_ASC',
  AuthorIdDesc = 'author_id_DESC',
  AuthorNonceAsc = 'author_nonce_ASC',
  AuthorNonceDesc = 'author_nonce_DESC',
  AuthorReservedAsc = 'author_reserved_ASC',
  AuthorReservedDesc = 'author_reserved_DESC',
  AuthorTotalAsc = 'author_total_ASC',
  AuthorTotalDesc = 'author_total_DESC',
  AuthorUpdatedAtAsc = 'author_updatedAt_ASC',
  AuthorUpdatedAtDesc = 'author_updatedAt_DESC',
  AuthorVoteRewardsTotalAsc = 'author_voteRewardsTotal_ASC',
  AuthorVoteRewardsTotalDesc = 'author_voteRewardsTotal_DESC',
  BlockchainSizeAsc = 'blockchainSize_ASC',
  BlockchainSizeDesc = 'blockchainSize_DESC',
  EventsCountAsc = 'eventsCount_ASC',
  EventsCountDesc = 'eventsCount_DESC',
  ExtrinsicsCountAsc = 'extrinsicsCount_ASC',
  ExtrinsicsCountDesc = 'extrinsicsCount_DESC',
  ExtrinsicsRootAsc = 'extrinsicsRoot_ASC',
  ExtrinsicsRootDesc = 'extrinsicsRoot_DESC',
  HashAsc = 'hash_ASC',
  HashDesc = 'hash_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ParentHashAsc = 'parentHash_ASC',
  ParentHashDesc = 'parentHash_DESC',
  SpacePledgedAsc = 'spacePledged_ASC',
  SpacePledgedDesc = 'spacePledged_DESC',
  SpecIdAsc = 'specId_ASC',
  SpecIdDesc = 'specId_DESC',
  StateRootAsc = 'stateRoot_ASC',
  StateRootDesc = 'stateRoot_DESC',
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC'
}

export type BlockWhereInput = {
  AND?: InputMaybe<Array<BlockWhereInput>>;
  OR?: InputMaybe<Array<BlockWhereInput>>;
  author?: InputMaybe<AccountWhereInput>;
  author_isNull?: InputMaybe<Scalars['Boolean']>;
  blockchainSize_eq?: InputMaybe<Scalars['BigInt']>;
  blockchainSize_gt?: InputMaybe<Scalars['BigInt']>;
  blockchainSize_gte?: InputMaybe<Scalars['BigInt']>;
  blockchainSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockchainSize_isNull?: InputMaybe<Scalars['Boolean']>;
  blockchainSize_lt?: InputMaybe<Scalars['BigInt']>;
  blockchainSize_lte?: InputMaybe<Scalars['BigInt']>;
  blockchainSize_not_eq?: InputMaybe<Scalars['BigInt']>;
  blockchainSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  eventsCount_eq?: InputMaybe<Scalars['Int']>;
  eventsCount_gt?: InputMaybe<Scalars['Int']>;
  eventsCount_gte?: InputMaybe<Scalars['Int']>;
  eventsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  eventsCount_isNull?: InputMaybe<Scalars['Boolean']>;
  eventsCount_lt?: InputMaybe<Scalars['Int']>;
  eventsCount_lte?: InputMaybe<Scalars['Int']>;
  eventsCount_not_eq?: InputMaybe<Scalars['Int']>;
  eventsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  extrinsicsCount_eq?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_gt?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_gte?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  extrinsicsCount_isNull?: InputMaybe<Scalars['Boolean']>;
  extrinsicsCount_lt?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_lte?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_not_eq?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  extrinsicsRoot_contains?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_containsInsensitive?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_endsWith?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_eq?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_gt?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_gte?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_in?: InputMaybe<Array<Scalars['String']>>;
  extrinsicsRoot_isNull?: InputMaybe<Scalars['Boolean']>;
  extrinsicsRoot_lt?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_lte?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_not_contains?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_not_endsWith?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_not_eq?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  extrinsicsRoot_not_startsWith?: InputMaybe<Scalars['String']>;
  extrinsicsRoot_startsWith?: InputMaybe<Scalars['String']>;
  extrinsics_every?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_none?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_some?: InputMaybe<ExtrinsicWhereInput>;
  hash_contains?: InputMaybe<Scalars['String']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']>;
  hash_endsWith?: InputMaybe<Scalars['String']>;
  hash_eq?: InputMaybe<Scalars['String']>;
  hash_gt?: InputMaybe<Scalars['String']>;
  hash_gte?: InputMaybe<Scalars['String']>;
  hash_in?: InputMaybe<Array<Scalars['String']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']>;
  hash_lt?: InputMaybe<Scalars['String']>;
  hash_lte?: InputMaybe<Scalars['String']>;
  hash_not_contains?: InputMaybe<Scalars['String']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']>;
  hash_not_eq?: InputMaybe<Scalars['String']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']>;
  hash_startsWith?: InputMaybe<Scalars['String']>;
  height_eq?: InputMaybe<Scalars['BigInt']>;
  height_gt?: InputMaybe<Scalars['BigInt']>;
  height_gte?: InputMaybe<Scalars['BigInt']>;
  height_in?: InputMaybe<Array<Scalars['BigInt']>>;
  height_isNull?: InputMaybe<Scalars['Boolean']>;
  height_lt?: InputMaybe<Scalars['BigInt']>;
  height_lte?: InputMaybe<Scalars['BigInt']>;
  height_not_eq?: InputMaybe<Scalars['BigInt']>;
  height_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  logs_every?: InputMaybe<LogWhereInput>;
  logs_none?: InputMaybe<LogWhereInput>;
  logs_some?: InputMaybe<LogWhereInput>;
  parentHash_contains?: InputMaybe<Scalars['String']>;
  parentHash_containsInsensitive?: InputMaybe<Scalars['String']>;
  parentHash_endsWith?: InputMaybe<Scalars['String']>;
  parentHash_eq?: InputMaybe<Scalars['String']>;
  parentHash_gt?: InputMaybe<Scalars['String']>;
  parentHash_gte?: InputMaybe<Scalars['String']>;
  parentHash_in?: InputMaybe<Array<Scalars['String']>>;
  parentHash_isNull?: InputMaybe<Scalars['Boolean']>;
  parentHash_lt?: InputMaybe<Scalars['String']>;
  parentHash_lte?: InputMaybe<Scalars['String']>;
  parentHash_not_contains?: InputMaybe<Scalars['String']>;
  parentHash_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  parentHash_not_endsWith?: InputMaybe<Scalars['String']>;
  parentHash_not_eq?: InputMaybe<Scalars['String']>;
  parentHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  parentHash_not_startsWith?: InputMaybe<Scalars['String']>;
  parentHash_startsWith?: InputMaybe<Scalars['String']>;
  rewards_every?: InputMaybe<RewardEventWhereInput>;
  rewards_none?: InputMaybe<RewardEventWhereInput>;
  rewards_some?: InputMaybe<RewardEventWhereInput>;
  spacePledged_eq?: InputMaybe<Scalars['BigInt']>;
  spacePledged_gt?: InputMaybe<Scalars['BigInt']>;
  spacePledged_gte?: InputMaybe<Scalars['BigInt']>;
  spacePledged_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spacePledged_isNull?: InputMaybe<Scalars['Boolean']>;
  spacePledged_lt?: InputMaybe<Scalars['BigInt']>;
  spacePledged_lte?: InputMaybe<Scalars['BigInt']>;
  spacePledged_not_eq?: InputMaybe<Scalars['BigInt']>;
  spacePledged_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  specId_contains?: InputMaybe<Scalars['String']>;
  specId_containsInsensitive?: InputMaybe<Scalars['String']>;
  specId_endsWith?: InputMaybe<Scalars['String']>;
  specId_eq?: InputMaybe<Scalars['String']>;
  specId_gt?: InputMaybe<Scalars['String']>;
  specId_gte?: InputMaybe<Scalars['String']>;
  specId_in?: InputMaybe<Array<Scalars['String']>>;
  specId_isNull?: InputMaybe<Scalars['Boolean']>;
  specId_lt?: InputMaybe<Scalars['String']>;
  specId_lte?: InputMaybe<Scalars['String']>;
  specId_not_contains?: InputMaybe<Scalars['String']>;
  specId_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  specId_not_endsWith?: InputMaybe<Scalars['String']>;
  specId_not_eq?: InputMaybe<Scalars['String']>;
  specId_not_in?: InputMaybe<Array<Scalars['String']>>;
  specId_not_startsWith?: InputMaybe<Scalars['String']>;
  specId_startsWith?: InputMaybe<Scalars['String']>;
  stateRoot_contains?: InputMaybe<Scalars['String']>;
  stateRoot_containsInsensitive?: InputMaybe<Scalars['String']>;
  stateRoot_endsWith?: InputMaybe<Scalars['String']>;
  stateRoot_eq?: InputMaybe<Scalars['String']>;
  stateRoot_gt?: InputMaybe<Scalars['String']>;
  stateRoot_gte?: InputMaybe<Scalars['String']>;
  stateRoot_in?: InputMaybe<Array<Scalars['String']>>;
  stateRoot_isNull?: InputMaybe<Scalars['Boolean']>;
  stateRoot_lt?: InputMaybe<Scalars['String']>;
  stateRoot_lte?: InputMaybe<Scalars['String']>;
  stateRoot_not_contains?: InputMaybe<Scalars['String']>;
  stateRoot_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  stateRoot_not_endsWith?: InputMaybe<Scalars['String']>;
  stateRoot_not_eq?: InputMaybe<Scalars['String']>;
  stateRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  stateRoot_not_startsWith?: InputMaybe<Scalars['String']>;
  stateRoot_startsWith?: InputMaybe<Scalars['String']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Call = {
  __typename?: 'Call';
  args?: Maybe<Scalars['JSON']>;
  block: Block;
  calls: Array<Call>;
  error?: Maybe<Scalars['JSON']>;
  extrinsic: Extrinsic;
  id: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Call>;
  pos?: Maybe<Scalars['Int']>;
  signer?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  timestamp: Scalars['DateTime'];
};


export type CallCallsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type CallEdge = {
  __typename?: 'CallEdge';
  cursor: Scalars['String'];
  node: Call;
};

export enum CallOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsRootAsc = 'block_extrinsicsRoot_ASC',
  BlockExtrinsicsRootDesc = 'block_extrinsicsRoot_DESC',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashDesc = 'block_hash_DESC',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightDesc = 'block_height_DESC',
  BlockIdAsc = 'block_id_ASC',
  BlockIdDesc = 'block_id_DESC',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockSpacePledgedAsc = 'block_spacePledged_ASC',
  BlockSpacePledgedDesc = 'block_spacePledged_DESC',
  BlockSpecIdAsc = 'block_specId_ASC',
  BlockSpecIdDesc = 'block_specId_DESC',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampDesc = 'block_timestamp_DESC',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIndexInBlockAsc = 'extrinsic_indexInBlock_ASC',
  ExtrinsicIndexInBlockDesc = 'extrinsic_indexInBlock_DESC',
  ExtrinsicNameAsc = 'extrinsic_name_ASC',
  ExtrinsicNameDesc = 'extrinsic_name_DESC',
  ExtrinsicNonceAsc = 'extrinsic_nonce_ASC',
  ExtrinsicNonceDesc = 'extrinsic_nonce_DESC',
  ExtrinsicPosAsc = 'extrinsic_pos_ASC',
  ExtrinsicPosDesc = 'extrinsic_pos_DESC',
  ExtrinsicSignatureAsc = 'extrinsic_signature_ASC',
  ExtrinsicSignatureDesc = 'extrinsic_signature_DESC',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicTimestampAsc = 'extrinsic_timestamp_ASC',
  ExtrinsicTimestampDesc = 'extrinsic_timestamp_DESC',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ParentIdAsc = 'parent_id_ASC',
  ParentIdDesc = 'parent_id_DESC',
  ParentNameAsc = 'parent_name_ASC',
  ParentNameDesc = 'parent_name_DESC',
  ParentPosAsc = 'parent_pos_ASC',
  ParentPosDesc = 'parent_pos_DESC',
  ParentSignerAsc = 'parent_signer_ASC',
  ParentSignerDesc = 'parent_signer_DESC',
  ParentSuccessAsc = 'parent_success_ASC',
  ParentSuccessDesc = 'parent_success_DESC',
  ParentTimestampAsc = 'parent_timestamp_ASC',
  ParentTimestampDesc = 'parent_timestamp_DESC',
  PosAsc = 'pos_ASC',
  PosDesc = 'pos_DESC',
  SignerAsc = 'signer_ASC',
  SignerDesc = 'signer_DESC',
  SuccessAsc = 'success_ASC',
  SuccessDesc = 'success_DESC',
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC'
}

export type CallWhereInput = {
  AND?: InputMaybe<Array<CallWhereInput>>;
  OR?: InputMaybe<Array<CallWhereInput>>;
  args_eq?: InputMaybe<Scalars['JSON']>;
  args_isNull?: InputMaybe<Scalars['Boolean']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']>;
  args_not_eq?: InputMaybe<Scalars['JSON']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  error_eq?: InputMaybe<Scalars['JSON']>;
  error_isNull?: InputMaybe<Scalars['Boolean']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']>;
  error_not_eq?: InputMaybe<Scalars['JSON']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_endsWith?: InputMaybe<Scalars['String']>;
  name_eq?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_not_endsWith?: InputMaybe<Scalars['String']>;
  name_not_eq?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']>;
  name_startsWith?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<CallWhereInput>;
  parent_isNull?: InputMaybe<Scalars['Boolean']>;
  pos_eq?: InputMaybe<Scalars['Int']>;
  pos_gt?: InputMaybe<Scalars['Int']>;
  pos_gte?: InputMaybe<Scalars['Int']>;
  pos_in?: InputMaybe<Array<Scalars['Int']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']>;
  pos_lt?: InputMaybe<Scalars['Int']>;
  pos_lte?: InputMaybe<Scalars['Int']>;
  pos_not_eq?: InputMaybe<Scalars['Int']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']>>;
  signer_contains?: InputMaybe<Scalars['String']>;
  signer_containsInsensitive?: InputMaybe<Scalars['String']>;
  signer_endsWith?: InputMaybe<Scalars['String']>;
  signer_eq?: InputMaybe<Scalars['String']>;
  signer_gt?: InputMaybe<Scalars['String']>;
  signer_gte?: InputMaybe<Scalars['String']>;
  signer_in?: InputMaybe<Array<Scalars['String']>>;
  signer_isNull?: InputMaybe<Scalars['Boolean']>;
  signer_lt?: InputMaybe<Scalars['String']>;
  signer_lte?: InputMaybe<Scalars['String']>;
  signer_not_contains?: InputMaybe<Scalars['String']>;
  signer_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  signer_not_endsWith?: InputMaybe<Scalars['String']>;
  signer_not_eq?: InputMaybe<Scalars['String']>;
  signer_not_in?: InputMaybe<Array<Scalars['String']>>;
  signer_not_startsWith?: InputMaybe<Scalars['String']>;
  signer_startsWith?: InputMaybe<Scalars['String']>;
  success_eq?: InputMaybe<Scalars['Boolean']>;
  success_isNull?: InputMaybe<Scalars['Boolean']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type CallsConnection = {
  __typename?: 'CallsConnection';
  edges: Array<CallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Event = {
  __typename?: 'Event';
  args?: Maybe<Scalars['JSON']>;
  block?: Maybe<Block>;
  call?: Maybe<Call>;
  extrinsic?: Maybe<Extrinsic>;
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  name: Scalars['String'];
  phase: Scalars['String'];
  pos?: Maybe<Scalars['Int']>;
  timestamp: Scalars['DateTime'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type EventModuleName = {
  __typename?: 'EventModuleName';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type EventModuleNameEdge = {
  __typename?: 'EventModuleNameEdge';
  cursor: Scalars['String'];
  node: EventModuleName;
};

export enum EventModuleNameOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export type EventModuleNameWhereInput = {
  AND?: InputMaybe<Array<EventModuleNameWhereInput>>;
  OR?: InputMaybe<Array<EventModuleNameWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_endsWith?: InputMaybe<Scalars['String']>;
  name_eq?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_not_endsWith?: InputMaybe<Scalars['String']>;
  name_not_eq?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']>;
  name_startsWith?: InputMaybe<Scalars['String']>;
};

export type EventModuleNamesConnection = {
  __typename?: 'EventModuleNamesConnection';
  edges: Array<EventModuleNameEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EventNamesResult = {
  __typename?: 'EventNamesResult';
  result: Array<Scalars['String']>;
};

export enum EventOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsRootAsc = 'block_extrinsicsRoot_ASC',
  BlockExtrinsicsRootDesc = 'block_extrinsicsRoot_DESC',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashDesc = 'block_hash_DESC',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightDesc = 'block_height_DESC',
  BlockIdAsc = 'block_id_ASC',
  BlockIdDesc = 'block_id_DESC',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockSpacePledgedAsc = 'block_spacePledged_ASC',
  BlockSpacePledgedDesc = 'block_spacePledged_DESC',
  BlockSpecIdAsc = 'block_specId_ASC',
  BlockSpecIdDesc = 'block_specId_DESC',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampDesc = 'block_timestamp_DESC',
  CallIdAsc = 'call_id_ASC',
  CallIdDesc = 'call_id_DESC',
  CallNameAsc = 'call_name_ASC',
  CallNameDesc = 'call_name_DESC',
  CallPosAsc = 'call_pos_ASC',
  CallPosDesc = 'call_pos_DESC',
  CallSignerAsc = 'call_signer_ASC',
  CallSignerDesc = 'call_signer_DESC',
  CallSuccessAsc = 'call_success_ASC',
  CallSuccessDesc = 'call_success_DESC',
  CallTimestampAsc = 'call_timestamp_ASC',
  CallTimestampDesc = 'call_timestamp_DESC',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIndexInBlockAsc = 'extrinsic_indexInBlock_ASC',
  ExtrinsicIndexInBlockDesc = 'extrinsic_indexInBlock_DESC',
  ExtrinsicNameAsc = 'extrinsic_name_ASC',
  ExtrinsicNameDesc = 'extrinsic_name_DESC',
  ExtrinsicNonceAsc = 'extrinsic_nonce_ASC',
  ExtrinsicNonceDesc = 'extrinsic_nonce_DESC',
  ExtrinsicPosAsc = 'extrinsic_pos_ASC',
  ExtrinsicPosDesc = 'extrinsic_pos_DESC',
  ExtrinsicSignatureAsc = 'extrinsic_signature_ASC',
  ExtrinsicSignatureDesc = 'extrinsic_signature_DESC',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicTimestampAsc = 'extrinsic_timestamp_ASC',
  ExtrinsicTimestampDesc = 'extrinsic_timestamp_DESC',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PhaseAsc = 'phase_ASC',
  PhaseDesc = 'phase_DESC',
  PosAsc = 'pos_ASC',
  PosDesc = 'pos_DESC',
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC'
}

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  args_eq?: InputMaybe<Scalars['JSON']>;
  args_isNull?: InputMaybe<Scalars['Boolean']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']>;
  args_not_eq?: InputMaybe<Scalars['JSON']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  indexInBlock_eq?: InputMaybe<Scalars['Int']>;
  indexInBlock_gt?: InputMaybe<Scalars['Int']>;
  indexInBlock_gte?: InputMaybe<Scalars['Int']>;
  indexInBlock_in?: InputMaybe<Array<Scalars['Int']>>;
  indexInBlock_isNull?: InputMaybe<Scalars['Boolean']>;
  indexInBlock_lt?: InputMaybe<Scalars['Int']>;
  indexInBlock_lte?: InputMaybe<Scalars['Int']>;
  indexInBlock_not_eq?: InputMaybe<Scalars['Int']>;
  indexInBlock_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_endsWith?: InputMaybe<Scalars['String']>;
  name_eq?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_not_endsWith?: InputMaybe<Scalars['String']>;
  name_not_eq?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']>;
  name_startsWith?: InputMaybe<Scalars['String']>;
  phase_contains?: InputMaybe<Scalars['String']>;
  phase_containsInsensitive?: InputMaybe<Scalars['String']>;
  phase_endsWith?: InputMaybe<Scalars['String']>;
  phase_eq?: InputMaybe<Scalars['String']>;
  phase_gt?: InputMaybe<Scalars['String']>;
  phase_gte?: InputMaybe<Scalars['String']>;
  phase_in?: InputMaybe<Array<Scalars['String']>>;
  phase_isNull?: InputMaybe<Scalars['Boolean']>;
  phase_lt?: InputMaybe<Scalars['String']>;
  phase_lte?: InputMaybe<Scalars['String']>;
  phase_not_contains?: InputMaybe<Scalars['String']>;
  phase_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  phase_not_endsWith?: InputMaybe<Scalars['String']>;
  phase_not_eq?: InputMaybe<Scalars['String']>;
  phase_not_in?: InputMaybe<Array<Scalars['String']>>;
  phase_not_startsWith?: InputMaybe<Scalars['String']>;
  phase_startsWith?: InputMaybe<Scalars['String']>;
  pos_eq?: InputMaybe<Scalars['Int']>;
  pos_gt?: InputMaybe<Scalars['Int']>;
  pos_gte?: InputMaybe<Scalars['Int']>;
  pos_in?: InputMaybe<Array<Scalars['Int']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']>;
  pos_lt?: InputMaybe<Scalars['Int']>;
  pos_lte?: InputMaybe<Scalars['Int']>;
  pos_not_eq?: InputMaybe<Scalars['Int']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Extrinsic = {
  __typename?: 'Extrinsic';
  args?: Maybe<Scalars['JSON']>;
  block: Block;
  calls: Array<Call>;
  error?: Maybe<Scalars['JSON']>;
  events: Array<Event>;
  fee?: Maybe<Scalars['BigInt']>;
  hash: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  name: Scalars['String'];
  nonce?: Maybe<Scalars['BigInt']>;
  pos?: Maybe<Scalars['Int']>;
  signature?: Maybe<Scalars['String']>;
  signer?: Maybe<Account>;
  success: Scalars['Boolean'];
  timestamp: Scalars['DateTime'];
  tip?: Maybe<Scalars['BigInt']>;
};


export type ExtrinsicCallsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type ExtrinsicEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type ExtrinsicEdge = {
  __typename?: 'ExtrinsicEdge';
  cursor: Scalars['String'];
  node: Extrinsic;
};

export type ExtrinsicModuleName = {
  __typename?: 'ExtrinsicModuleName';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ExtrinsicModuleNameEdge = {
  __typename?: 'ExtrinsicModuleNameEdge';
  cursor: Scalars['String'];
  node: ExtrinsicModuleName;
};

export enum ExtrinsicModuleNameOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export type ExtrinsicModuleNameWhereInput = {
  AND?: InputMaybe<Array<ExtrinsicModuleNameWhereInput>>;
  OR?: InputMaybe<Array<ExtrinsicModuleNameWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_endsWith?: InputMaybe<Scalars['String']>;
  name_eq?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_not_endsWith?: InputMaybe<Scalars['String']>;
  name_not_eq?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']>;
  name_startsWith?: InputMaybe<Scalars['String']>;
};

export type ExtrinsicModuleNamesConnection = {
  __typename?: 'ExtrinsicModuleNamesConnection';
  edges: Array<ExtrinsicModuleNameEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ExtrinsicNamesResult = {
  __typename?: 'ExtrinsicNamesResult';
  result: Array<Scalars['String']>;
};

export enum ExtrinsicOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsRootAsc = 'block_extrinsicsRoot_ASC',
  BlockExtrinsicsRootDesc = 'block_extrinsicsRoot_DESC',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashDesc = 'block_hash_DESC',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightDesc = 'block_height_DESC',
  BlockIdAsc = 'block_id_ASC',
  BlockIdDesc = 'block_id_DESC',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockSpacePledgedAsc = 'block_spacePledged_ASC',
  BlockSpacePledgedDesc = 'block_spacePledged_DESC',
  BlockSpecIdAsc = 'block_specId_ASC',
  BlockSpecIdDesc = 'block_specId_DESC',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampDesc = 'block_timestamp_DESC',
  FeeAsc = 'fee_ASC',
  FeeDesc = 'fee_DESC',
  HashAsc = 'hash_ASC',
  HashDesc = 'hash_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  NonceAsc = 'nonce_ASC',
  NonceDesc = 'nonce_DESC',
  PosAsc = 'pos_ASC',
  PosDesc = 'pos_DESC',
  SignatureAsc = 'signature_ASC',
  SignatureDesc = 'signature_DESC',
  SignerBlockRewardsTotalAsc = 'signer_blockRewardsTotal_ASC',
  SignerBlockRewardsTotalDesc = 'signer_blockRewardsTotal_DESC',
  SignerFreeAsc = 'signer_free_ASC',
  SignerFreeDesc = 'signer_free_DESC',
  SignerIdAsc = 'signer_id_ASC',
  SignerIdDesc = 'signer_id_DESC',
  SignerNonceAsc = 'signer_nonce_ASC',
  SignerNonceDesc = 'signer_nonce_DESC',
  SignerReservedAsc = 'signer_reserved_ASC',
  SignerReservedDesc = 'signer_reserved_DESC',
  SignerTotalAsc = 'signer_total_ASC',
  SignerTotalDesc = 'signer_total_DESC',
  SignerUpdatedAtAsc = 'signer_updatedAt_ASC',
  SignerUpdatedAtDesc = 'signer_updatedAt_DESC',
  SignerVoteRewardsTotalAsc = 'signer_voteRewardsTotal_ASC',
  SignerVoteRewardsTotalDesc = 'signer_voteRewardsTotal_DESC',
  SuccessAsc = 'success_ASC',
  SuccessDesc = 'success_DESC',
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC',
  TipAsc = 'tip_ASC',
  TipDesc = 'tip_DESC'
}

export type ExtrinsicWhereInput = {
  AND?: InputMaybe<Array<ExtrinsicWhereInput>>;
  OR?: InputMaybe<Array<ExtrinsicWhereInput>>;
  args_eq?: InputMaybe<Scalars['JSON']>;
  args_isNull?: InputMaybe<Scalars['Boolean']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']>;
  args_not_eq?: InputMaybe<Scalars['JSON']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  error_eq?: InputMaybe<Scalars['JSON']>;
  error_isNull?: InputMaybe<Scalars['Boolean']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']>;
  error_not_eq?: InputMaybe<Scalars['JSON']>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  fee_eq?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hash_contains?: InputMaybe<Scalars['String']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']>;
  hash_endsWith?: InputMaybe<Scalars['String']>;
  hash_eq?: InputMaybe<Scalars['String']>;
  hash_gt?: InputMaybe<Scalars['String']>;
  hash_gte?: InputMaybe<Scalars['String']>;
  hash_in?: InputMaybe<Array<Scalars['String']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']>;
  hash_lt?: InputMaybe<Scalars['String']>;
  hash_lte?: InputMaybe<Scalars['String']>;
  hash_not_contains?: InputMaybe<Scalars['String']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']>;
  hash_not_eq?: InputMaybe<Scalars['String']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']>;
  hash_startsWith?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  indexInBlock_eq?: InputMaybe<Scalars['Int']>;
  indexInBlock_gt?: InputMaybe<Scalars['Int']>;
  indexInBlock_gte?: InputMaybe<Scalars['Int']>;
  indexInBlock_in?: InputMaybe<Array<Scalars['Int']>>;
  indexInBlock_isNull?: InputMaybe<Scalars['Boolean']>;
  indexInBlock_lt?: InputMaybe<Scalars['Int']>;
  indexInBlock_lte?: InputMaybe<Scalars['Int']>;
  indexInBlock_not_eq?: InputMaybe<Scalars['Int']>;
  indexInBlock_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_endsWith?: InputMaybe<Scalars['String']>;
  name_eq?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_not_endsWith?: InputMaybe<Scalars['String']>;
  name_not_eq?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']>;
  name_startsWith?: InputMaybe<Scalars['String']>;
  nonce_eq?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_isNull?: InputMaybe<Scalars['Boolean']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_not_eq?: InputMaybe<Scalars['BigInt']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pos_eq?: InputMaybe<Scalars['Int']>;
  pos_gt?: InputMaybe<Scalars['Int']>;
  pos_gte?: InputMaybe<Scalars['Int']>;
  pos_in?: InputMaybe<Array<Scalars['Int']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']>;
  pos_lt?: InputMaybe<Scalars['Int']>;
  pos_lte?: InputMaybe<Scalars['Int']>;
  pos_not_eq?: InputMaybe<Scalars['Int']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']>>;
  signature_contains?: InputMaybe<Scalars['String']>;
  signature_containsInsensitive?: InputMaybe<Scalars['String']>;
  signature_endsWith?: InputMaybe<Scalars['String']>;
  signature_eq?: InputMaybe<Scalars['String']>;
  signature_gt?: InputMaybe<Scalars['String']>;
  signature_gte?: InputMaybe<Scalars['String']>;
  signature_in?: InputMaybe<Array<Scalars['String']>>;
  signature_isNull?: InputMaybe<Scalars['Boolean']>;
  signature_lt?: InputMaybe<Scalars['String']>;
  signature_lte?: InputMaybe<Scalars['String']>;
  signature_not_contains?: InputMaybe<Scalars['String']>;
  signature_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  signature_not_endsWith?: InputMaybe<Scalars['String']>;
  signature_not_eq?: InputMaybe<Scalars['String']>;
  signature_not_in?: InputMaybe<Array<Scalars['String']>>;
  signature_not_startsWith?: InputMaybe<Scalars['String']>;
  signature_startsWith?: InputMaybe<Scalars['String']>;
  signer?: InputMaybe<AccountWhereInput>;
  signer_isNull?: InputMaybe<Scalars['Boolean']>;
  success_eq?: InputMaybe<Scalars['Boolean']>;
  success_isNull?: InputMaybe<Scalars['Boolean']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  tip_eq?: InputMaybe<Scalars['BigInt']>;
  tip_gt?: InputMaybe<Scalars['BigInt']>;
  tip_gte?: InputMaybe<Scalars['BigInt']>;
  tip_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tip_isNull?: InputMaybe<Scalars['Boolean']>;
  tip_lt?: InputMaybe<Scalars['BigInt']>;
  tip_lte?: InputMaybe<Scalars['BigInt']>;
  tip_not_eq?: InputMaybe<Scalars['BigInt']>;
  tip_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type ExtrinsicsConnection = {
  __typename?: 'ExtrinsicsConnection';
  edges: Array<ExtrinsicEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Log = {
  __typename?: 'Log';
  block: Block;
  id: Scalars['String'];
  kind: Scalars['String'];
  value?: Maybe<Scalars['JSON']>;
};

export type LogEdge = {
  __typename?: 'LogEdge';
  cursor: Scalars['String'];
  node: Log;
};

export type LogNamesResult = {
  __typename?: 'LogNamesResult';
  result: Array<Scalars['String']>;
};

export enum LogOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsRootAsc = 'block_extrinsicsRoot_ASC',
  BlockExtrinsicsRootDesc = 'block_extrinsicsRoot_DESC',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashDesc = 'block_hash_DESC',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightDesc = 'block_height_DESC',
  BlockIdAsc = 'block_id_ASC',
  BlockIdDesc = 'block_id_DESC',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockSpacePledgedAsc = 'block_spacePledged_ASC',
  BlockSpacePledgedDesc = 'block_spacePledged_DESC',
  BlockSpecIdAsc = 'block_specId_ASC',
  BlockSpecIdDesc = 'block_specId_DESC',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampDesc = 'block_timestamp_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC'
}

export type LogWhereInput = {
  AND?: InputMaybe<Array<LogWhereInput>>;
  OR?: InputMaybe<Array<LogWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  kind_contains?: InputMaybe<Scalars['String']>;
  kind_containsInsensitive?: InputMaybe<Scalars['String']>;
  kind_endsWith?: InputMaybe<Scalars['String']>;
  kind_eq?: InputMaybe<Scalars['String']>;
  kind_gt?: InputMaybe<Scalars['String']>;
  kind_gte?: InputMaybe<Scalars['String']>;
  kind_in?: InputMaybe<Array<Scalars['String']>>;
  kind_isNull?: InputMaybe<Scalars['Boolean']>;
  kind_lt?: InputMaybe<Scalars['String']>;
  kind_lte?: InputMaybe<Scalars['String']>;
  kind_not_contains?: InputMaybe<Scalars['String']>;
  kind_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  kind_not_endsWith?: InputMaybe<Scalars['String']>;
  kind_not_eq?: InputMaybe<Scalars['String']>;
  kind_not_in?: InputMaybe<Array<Scalars['String']>>;
  kind_not_startsWith?: InputMaybe<Scalars['String']>;
  kind_startsWith?: InputMaybe<Scalars['String']>;
  value_eq?: InputMaybe<Scalars['JSON']>;
  value_isNull?: InputMaybe<Scalars['Boolean']>;
  value_jsonContains?: InputMaybe<Scalars['JSON']>;
  value_jsonHasKey?: InputMaybe<Scalars['JSON']>;
  value_not_eq?: InputMaybe<Scalars['JSON']>;
};

export type LogsConnection = {
  __typename?: 'LogsConnection';
  edges: Array<LogEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Nominator = {
  __typename?: 'Nominator';
  account: Account;
  id: Scalars['String'];
  operator: Operator;
  shares?: Maybe<Scalars['BigInt']>;
  updatedAt?: Maybe<Scalars['BigInt']>;
};

export type NominatorEdge = {
  __typename?: 'NominatorEdge';
  cursor: Scalars['String'];
  node: Nominator;
};

export enum NominatorOrderByInput {
  AccountBlockRewardsTotalAsc = 'account_blockRewardsTotal_ASC',
  AccountBlockRewardsTotalDesc = 'account_blockRewardsTotal_DESC',
  AccountFreeAsc = 'account_free_ASC',
  AccountFreeDesc = 'account_free_DESC',
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountNonceAsc = 'account_nonce_ASC',
  AccountNonceDesc = 'account_nonce_DESC',
  AccountReservedAsc = 'account_reserved_ASC',
  AccountReservedDesc = 'account_reserved_DESC',
  AccountTotalAsc = 'account_total_ASC',
  AccountTotalDesc = 'account_total_DESC',
  AccountUpdatedAtAsc = 'account_updatedAt_ASC',
  AccountUpdatedAtDesc = 'account_updatedAt_DESC',
  AccountVoteRewardsTotalAsc = 'account_voteRewardsTotal_ASC',
  AccountVoteRewardsTotalDesc = 'account_voteRewardsTotal_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  OperatorCurrentDomainIdAsc = 'operator_currentDomainId_ASC',
  OperatorCurrentDomainIdDesc = 'operator_currentDomainId_DESC',
  OperatorCurrentEpochRewardsAsc = 'operator_currentEpochRewards_ASC',
  OperatorCurrentEpochRewardsDesc = 'operator_currentEpochRewards_DESC',
  OperatorCurrentTotalStakeAsc = 'operator_currentTotalStake_ASC',
  OperatorCurrentTotalStakeDesc = 'operator_currentTotalStake_DESC',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorMinimumNominatorStakeAsc = 'operator_minimumNominatorStake_ASC',
  OperatorMinimumNominatorStakeDesc = 'operator_minimumNominatorStake_DESC',
  OperatorNextDomainIdAsc = 'operator_nextDomainId_ASC',
  OperatorNextDomainIdDesc = 'operator_nextDomainId_DESC',
  OperatorNominationTaxAsc = 'operator_nominationTax_ASC',
  OperatorNominationTaxDesc = 'operator_nominationTax_DESC',
  OperatorSigningKeyAsc = 'operator_signingKey_ASC',
  OperatorSigningKeyDesc = 'operator_signingKey_DESC',
  OperatorStatusAsc = 'operator_status_ASC',
  OperatorStatusDesc = 'operator_status_DESC',
  OperatorTotalSharesAsc = 'operator_totalShares_ASC',
  OperatorTotalSharesDesc = 'operator_totalShares_DESC',
  OperatorUpdatedAtAsc = 'operator_updatedAt_ASC',
  OperatorUpdatedAtDesc = 'operator_updatedAt_DESC',
  SharesAsc = 'shares_ASC',
  SharesDesc = 'shares_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type NominatorWhereInput = {
  AND?: InputMaybe<Array<NominatorWhereInput>>;
  OR?: InputMaybe<Array<NominatorWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<OperatorWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']>;
  shares_eq?: InputMaybe<Scalars['BigInt']>;
  shares_gt?: InputMaybe<Scalars['BigInt']>;
  shares_gte?: InputMaybe<Scalars['BigInt']>;
  shares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_isNull?: InputMaybe<Scalars['Boolean']>;
  shares_lt?: InputMaybe<Scalars['BigInt']>;
  shares_lte?: InputMaybe<Scalars['BigInt']>;
  shares_not_eq?: InputMaybe<Scalars['BigInt']>;
  shares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_eq?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_eq?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type NominatorsConnection = {
  __typename?: 'NominatorsConnection';
  edges: Array<NominatorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Operator = {
  __typename?: 'Operator';
  currentDomainId?: Maybe<Scalars['Int']>;
  currentEpochRewards?: Maybe<Scalars['BigInt']>;
  currentTotalStake?: Maybe<Scalars['BigInt']>;
  id: Scalars['String'];
  minimumNominatorStake?: Maybe<Scalars['BigInt']>;
  nextDomainId?: Maybe<Scalars['Int']>;
  nominationTax?: Maybe<Scalars['Int']>;
  nominators: Array<Nominator>;
  signingKey: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  totalShares?: Maybe<Scalars['BigInt']>;
  updatedAt?: Maybe<Scalars['BigInt']>;
};


export type OperatorNominatorsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NominatorOrderByInput>>;
  where?: InputMaybe<NominatorWhereInput>;
};

export type OperatorEdge = {
  __typename?: 'OperatorEdge';
  cursor: Scalars['String'];
  node: Operator;
};

export enum OperatorOrderByInput {
  CurrentDomainIdAsc = 'currentDomainId_ASC',
  CurrentDomainIdDesc = 'currentDomainId_DESC',
  CurrentEpochRewardsAsc = 'currentEpochRewards_ASC',
  CurrentEpochRewardsDesc = 'currentEpochRewards_DESC',
  CurrentTotalStakeAsc = 'currentTotalStake_ASC',
  CurrentTotalStakeDesc = 'currentTotalStake_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MinimumNominatorStakeAsc = 'minimumNominatorStake_ASC',
  MinimumNominatorStakeDesc = 'minimumNominatorStake_DESC',
  NextDomainIdAsc = 'nextDomainId_ASC',
  NextDomainIdDesc = 'nextDomainId_DESC',
  NominationTaxAsc = 'nominationTax_ASC',
  NominationTaxDesc = 'nominationTax_DESC',
  SigningKeyAsc = 'signingKey_ASC',
  SigningKeyDesc = 'signingKey_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TotalSharesAsc = 'totalShares_ASC',
  TotalSharesDesc = 'totalShares_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OperatorWhereInput = {
  AND?: InputMaybe<Array<OperatorWhereInput>>;
  OR?: InputMaybe<Array<OperatorWhereInput>>;
  currentDomainId_eq?: InputMaybe<Scalars['Int']>;
  currentDomainId_gt?: InputMaybe<Scalars['Int']>;
  currentDomainId_gte?: InputMaybe<Scalars['Int']>;
  currentDomainId_in?: InputMaybe<Array<Scalars['Int']>>;
  currentDomainId_isNull?: InputMaybe<Scalars['Boolean']>;
  currentDomainId_lt?: InputMaybe<Scalars['Int']>;
  currentDomainId_lte?: InputMaybe<Scalars['Int']>;
  currentDomainId_not_eq?: InputMaybe<Scalars['Int']>;
  currentDomainId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  currentEpochRewards_eq?: InputMaybe<Scalars['BigInt']>;
  currentEpochRewards_gt?: InputMaybe<Scalars['BigInt']>;
  currentEpochRewards_gte?: InputMaybe<Scalars['BigInt']>;
  currentEpochRewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentEpochRewards_isNull?: InputMaybe<Scalars['Boolean']>;
  currentEpochRewards_lt?: InputMaybe<Scalars['BigInt']>;
  currentEpochRewards_lte?: InputMaybe<Scalars['BigInt']>;
  currentEpochRewards_not_eq?: InputMaybe<Scalars['BigInt']>;
  currentEpochRewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentTotalStake_eq?: InputMaybe<Scalars['BigInt']>;
  currentTotalStake_gt?: InputMaybe<Scalars['BigInt']>;
  currentTotalStake_gte?: InputMaybe<Scalars['BigInt']>;
  currentTotalStake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentTotalStake_isNull?: InputMaybe<Scalars['Boolean']>;
  currentTotalStake_lt?: InputMaybe<Scalars['BigInt']>;
  currentTotalStake_lte?: InputMaybe<Scalars['BigInt']>;
  currentTotalStake_not_eq?: InputMaybe<Scalars['BigInt']>;
  currentTotalStake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  minimumNominatorStake_eq?: InputMaybe<Scalars['BigInt']>;
  minimumNominatorStake_gt?: InputMaybe<Scalars['BigInt']>;
  minimumNominatorStake_gte?: InputMaybe<Scalars['BigInt']>;
  minimumNominatorStake_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumNominatorStake_isNull?: InputMaybe<Scalars['Boolean']>;
  minimumNominatorStake_lt?: InputMaybe<Scalars['BigInt']>;
  minimumNominatorStake_lte?: InputMaybe<Scalars['BigInt']>;
  minimumNominatorStake_not_eq?: InputMaybe<Scalars['BigInt']>;
  minimumNominatorStake_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nextDomainId_eq?: InputMaybe<Scalars['Int']>;
  nextDomainId_gt?: InputMaybe<Scalars['Int']>;
  nextDomainId_gte?: InputMaybe<Scalars['Int']>;
  nextDomainId_in?: InputMaybe<Array<Scalars['Int']>>;
  nextDomainId_isNull?: InputMaybe<Scalars['Boolean']>;
  nextDomainId_lt?: InputMaybe<Scalars['Int']>;
  nextDomainId_lte?: InputMaybe<Scalars['Int']>;
  nextDomainId_not_eq?: InputMaybe<Scalars['Int']>;
  nextDomainId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  nominationTax_eq?: InputMaybe<Scalars['Int']>;
  nominationTax_gt?: InputMaybe<Scalars['Int']>;
  nominationTax_gte?: InputMaybe<Scalars['Int']>;
  nominationTax_in?: InputMaybe<Array<Scalars['Int']>>;
  nominationTax_isNull?: InputMaybe<Scalars['Boolean']>;
  nominationTax_lt?: InputMaybe<Scalars['Int']>;
  nominationTax_lte?: InputMaybe<Scalars['Int']>;
  nominationTax_not_eq?: InputMaybe<Scalars['Int']>;
  nominationTax_not_in?: InputMaybe<Array<Scalars['Int']>>;
  nominators_every?: InputMaybe<NominatorWhereInput>;
  nominators_none?: InputMaybe<NominatorWhereInput>;
  nominators_some?: InputMaybe<NominatorWhereInput>;
  signingKey_contains?: InputMaybe<Scalars['String']>;
  signingKey_containsInsensitive?: InputMaybe<Scalars['String']>;
  signingKey_endsWith?: InputMaybe<Scalars['String']>;
  signingKey_eq?: InputMaybe<Scalars['String']>;
  signingKey_gt?: InputMaybe<Scalars['String']>;
  signingKey_gte?: InputMaybe<Scalars['String']>;
  signingKey_in?: InputMaybe<Array<Scalars['String']>>;
  signingKey_isNull?: InputMaybe<Scalars['Boolean']>;
  signingKey_lt?: InputMaybe<Scalars['String']>;
  signingKey_lte?: InputMaybe<Scalars['String']>;
  signingKey_not_contains?: InputMaybe<Scalars['String']>;
  signingKey_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  signingKey_not_endsWith?: InputMaybe<Scalars['String']>;
  signingKey_not_eq?: InputMaybe<Scalars['String']>;
  signingKey_not_in?: InputMaybe<Array<Scalars['String']>>;
  signingKey_not_startsWith?: InputMaybe<Scalars['String']>;
  signingKey_startsWith?: InputMaybe<Scalars['String']>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_containsInsensitive?: InputMaybe<Scalars['String']>;
  status_endsWith?: InputMaybe<Scalars['String']>;
  status_eq?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_isNull?: InputMaybe<Scalars['Boolean']>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  status_not_endsWith?: InputMaybe<Scalars['String']>;
  status_not_eq?: InputMaybe<Scalars['String']>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_startsWith?: InputMaybe<Scalars['String']>;
  status_startsWith?: InputMaybe<Scalars['String']>;
  totalShares_eq?: InputMaybe<Scalars['BigInt']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares_isNull?: InputMaybe<Scalars['Boolean']>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']>;
  totalShares_not_eq?: InputMaybe<Scalars['BigInt']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_eq?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_eq?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type OperatorsConnection = {
  __typename?: 'OperatorsConnection';
  edges: Array<OperatorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  accountById?: Maybe<Account>;
  /** @deprecated Use accountById */
  accountByUniqueInput?: Maybe<Account>;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  blockById?: Maybe<Block>;
  /** @deprecated Use blockById */
  blockByUniqueInput?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  callById?: Maybe<Call>;
  /** @deprecated Use callById */
  callByUniqueInput?: Maybe<Call>;
  calls: Array<Call>;
  callsConnection: CallsConnection;
  eventById?: Maybe<Event>;
  /** @deprecated Use eventById */
  eventByUniqueInput?: Maybe<Event>;
  eventModuleNameById?: Maybe<EventModuleName>;
  /** @deprecated Use eventModuleNameById */
  eventModuleNameByUniqueInput?: Maybe<EventModuleName>;
  eventModuleNames: Array<EventModuleName>;
  eventModuleNamesConnection: EventModuleNamesConnection;
  events: Array<Event>;
  eventsConnection: EventsConnection;
  eventsNamesQuery: EventNamesResult;
  extrinsicById?: Maybe<Extrinsic>;
  /** @deprecated Use extrinsicById */
  extrinsicByUniqueInput?: Maybe<Extrinsic>;
  extrinsicModuleNameById?: Maybe<ExtrinsicModuleName>;
  /** @deprecated Use extrinsicModuleNameById */
  extrinsicModuleNameByUniqueInput?: Maybe<ExtrinsicModuleName>;
  extrinsicModuleNames: Array<ExtrinsicModuleName>;
  extrinsicModuleNamesConnection: ExtrinsicModuleNamesConnection;
  extrinsicNamesQuery: ExtrinsicNamesResult;
  extrinsics: Array<Extrinsic>;
  extrinsicsConnection: ExtrinsicsConnection;
  logById?: Maybe<Log>;
  /** @deprecated Use logById */
  logByUniqueInput?: Maybe<Log>;
  logTypesQuery: LogNamesResult;
  logs: Array<Log>;
  logsConnection: LogsConnection;
  nominatorById?: Maybe<Nominator>;
  /** @deprecated Use nominatorById */
  nominatorByUniqueInput?: Maybe<Nominator>;
  nominators: Array<Nominator>;
  nominatorsConnection: NominatorsConnection;
  operatorById?: Maybe<Operator>;
  /** @deprecated Use operatorById */
  operatorByUniqueInput?: Maybe<Operator>;
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
  id: Scalars['String'];
};


export type QueryAccountByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<AccountOrderByInput>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryBlockByIdArgs = {
  id: Scalars['String'];
};


export type QueryBlockByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<BlockOrderByInput>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryCallByIdArgs = {
  id: Scalars['String'];
};


export type QueryCallByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCallsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type QueryCallsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<CallOrderByInput>;
  where?: InputMaybe<CallWhereInput>;
};


export type QueryEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEventModuleNameByIdArgs = {
  id: Scalars['String'];
};


export type QueryEventModuleNameByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEventModuleNamesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventModuleNameOrderByInput>>;
  where?: InputMaybe<EventModuleNameWhereInput>;
};


export type QueryEventModuleNamesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<EventModuleNameOrderByInput>;
  where?: InputMaybe<EventModuleNameWhereInput>;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<EventOrderByInput>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryExtrinsicByIdArgs = {
  id: Scalars['String'];
};


export type QueryExtrinsicByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryExtrinsicModuleNameByIdArgs = {
  id: Scalars['String'];
};


export type QueryExtrinsicModuleNameByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryExtrinsicModuleNamesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExtrinsicModuleNameOrderByInput>>;
  where?: InputMaybe<ExtrinsicModuleNameWhereInput>;
};


export type QueryExtrinsicModuleNamesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<ExtrinsicModuleNameOrderByInput>;
  where?: InputMaybe<ExtrinsicModuleNameWhereInput>;
};


export type QueryExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type QueryExtrinsicsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<ExtrinsicOrderByInput>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type QueryLogByIdArgs = {
  id: Scalars['String'];
};


export type QueryLogByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLogsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LogOrderByInput>>;
  where?: InputMaybe<LogWhereInput>;
};


export type QueryLogsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<LogOrderByInput>;
  where?: InputMaybe<LogWhereInput>;
};


export type QueryNominatorByIdArgs = {
  id: Scalars['String'];
};


export type QueryNominatorByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryNominatorsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NominatorOrderByInput>>;
  where?: InputMaybe<NominatorWhereInput>;
};


export type QueryNominatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<NominatorOrderByInput>;
  where?: InputMaybe<NominatorWhereInput>;
};


export type QueryOperatorByIdArgs = {
  id: Scalars['String'];
};


export type QueryOperatorByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOperatorsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OperatorOrderByInput>>;
  where?: InputMaybe<OperatorWhereInput>;
};


export type QueryOperatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<OperatorOrderByInput>;
  where?: InputMaybe<OperatorWhereInput>;
};


export type QueryRewardEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryRewardEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryRewardEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RewardEventOrderByInput>>;
  where?: InputMaybe<RewardEventWhereInput>;
};


export type QueryRewardEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<RewardEventOrderByInput>;
  where?: InputMaybe<RewardEventWhereInput>;
};

export type RewardEvent = {
  __typename?: 'RewardEvent';
  account?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']>;
  block?: Maybe<Block>;
  call?: Maybe<Call>;
  extrinsic?: Maybe<Extrinsic>;
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  name: Scalars['String'];
  phase: Scalars['String'];
  pos?: Maybe<Scalars['Int']>;
  timestamp: Scalars['DateTime'];
};

export type RewardEventEdge = {
  __typename?: 'RewardEventEdge';
  cursor: Scalars['String'];
  node: RewardEvent;
};

export enum RewardEventOrderByInput {
  AccountBlockRewardsTotalAsc = 'account_blockRewardsTotal_ASC',
  AccountBlockRewardsTotalDesc = 'account_blockRewardsTotal_DESC',
  AccountFreeAsc = 'account_free_ASC',
  AccountFreeDesc = 'account_free_DESC',
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountNonceAsc = 'account_nonce_ASC',
  AccountNonceDesc = 'account_nonce_DESC',
  AccountReservedAsc = 'account_reserved_ASC',
  AccountReservedDesc = 'account_reserved_DESC',
  AccountTotalAsc = 'account_total_ASC',
  AccountTotalDesc = 'account_total_DESC',
  AccountUpdatedAtAsc = 'account_updatedAt_ASC',
  AccountUpdatedAtDesc = 'account_updatedAt_DESC',
  AccountVoteRewardsTotalAsc = 'account_voteRewardsTotal_ASC',
  AccountVoteRewardsTotalDesc = 'account_voteRewardsTotal_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsRootAsc = 'block_extrinsicsRoot_ASC',
  BlockExtrinsicsRootDesc = 'block_extrinsicsRoot_DESC',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashDesc = 'block_hash_DESC',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightDesc = 'block_height_DESC',
  BlockIdAsc = 'block_id_ASC',
  BlockIdDesc = 'block_id_DESC',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockSpacePledgedAsc = 'block_spacePledged_ASC',
  BlockSpacePledgedDesc = 'block_spacePledged_DESC',
  BlockSpecIdAsc = 'block_specId_ASC',
  BlockSpecIdDesc = 'block_specId_DESC',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampDesc = 'block_timestamp_DESC',
  CallIdAsc = 'call_id_ASC',
  CallIdDesc = 'call_id_DESC',
  CallNameAsc = 'call_name_ASC',
  CallNameDesc = 'call_name_DESC',
  CallPosAsc = 'call_pos_ASC',
  CallPosDesc = 'call_pos_DESC',
  CallSignerAsc = 'call_signer_ASC',
  CallSignerDesc = 'call_signer_DESC',
  CallSuccessAsc = 'call_success_ASC',
  CallSuccessDesc = 'call_success_DESC',
  CallTimestampAsc = 'call_timestamp_ASC',
  CallTimestampDesc = 'call_timestamp_DESC',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIndexInBlockAsc = 'extrinsic_indexInBlock_ASC',
  ExtrinsicIndexInBlockDesc = 'extrinsic_indexInBlock_DESC',
  ExtrinsicNameAsc = 'extrinsic_name_ASC',
  ExtrinsicNameDesc = 'extrinsic_name_DESC',
  ExtrinsicNonceAsc = 'extrinsic_nonce_ASC',
  ExtrinsicNonceDesc = 'extrinsic_nonce_DESC',
  ExtrinsicPosAsc = 'extrinsic_pos_ASC',
  ExtrinsicPosDesc = 'extrinsic_pos_DESC',
  ExtrinsicSignatureAsc = 'extrinsic_signature_ASC',
  ExtrinsicSignatureDesc = 'extrinsic_signature_DESC',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicTimestampAsc = 'extrinsic_timestamp_ASC',
  ExtrinsicTimestampDesc = 'extrinsic_timestamp_DESC',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PhaseAsc = 'phase_ASC',
  PhaseDesc = 'phase_DESC',
  PosAsc = 'pos_ASC',
  PosDesc = 'pos_DESC',
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC'
}

export type RewardEventWhereInput = {
  AND?: InputMaybe<Array<RewardEventWhereInput>>;
  OR?: InputMaybe<Array<RewardEventWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']>;
  amount_eq?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_endsWith?: InputMaybe<Scalars['String']>;
  id_eq?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  id_not_endsWith?: InputMaybe<Scalars['String']>;
  id_not_eq?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']>;
  id_startsWith?: InputMaybe<Scalars['String']>;
  indexInBlock_eq?: InputMaybe<Scalars['Int']>;
  indexInBlock_gt?: InputMaybe<Scalars['Int']>;
  indexInBlock_gte?: InputMaybe<Scalars['Int']>;
  indexInBlock_in?: InputMaybe<Array<Scalars['Int']>>;
  indexInBlock_isNull?: InputMaybe<Scalars['Boolean']>;
  indexInBlock_lt?: InputMaybe<Scalars['Int']>;
  indexInBlock_lte?: InputMaybe<Scalars['Int']>;
  indexInBlock_not_eq?: InputMaybe<Scalars['Int']>;
  indexInBlock_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_endsWith?: InputMaybe<Scalars['String']>;
  name_eq?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  name_not_endsWith?: InputMaybe<Scalars['String']>;
  name_not_eq?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']>;
  name_startsWith?: InputMaybe<Scalars['String']>;
  phase_contains?: InputMaybe<Scalars['String']>;
  phase_containsInsensitive?: InputMaybe<Scalars['String']>;
  phase_endsWith?: InputMaybe<Scalars['String']>;
  phase_eq?: InputMaybe<Scalars['String']>;
  phase_gt?: InputMaybe<Scalars['String']>;
  phase_gte?: InputMaybe<Scalars['String']>;
  phase_in?: InputMaybe<Array<Scalars['String']>>;
  phase_isNull?: InputMaybe<Scalars['Boolean']>;
  phase_lt?: InputMaybe<Scalars['String']>;
  phase_lte?: InputMaybe<Scalars['String']>;
  phase_not_contains?: InputMaybe<Scalars['String']>;
  phase_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  phase_not_endsWith?: InputMaybe<Scalars['String']>;
  phase_not_eq?: InputMaybe<Scalars['String']>;
  phase_not_in?: InputMaybe<Array<Scalars['String']>>;
  phase_not_startsWith?: InputMaybe<Scalars['String']>;
  phase_startsWith?: InputMaybe<Scalars['String']>;
  pos_eq?: InputMaybe<Scalars['Int']>;
  pos_gt?: InputMaybe<Scalars['Int']>;
  pos_gte?: InputMaybe<Scalars['Int']>;
  pos_in?: InputMaybe<Array<Scalars['Int']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']>;
  pos_lt?: InputMaybe<Scalars['Int']>;
  pos_lte?: InputMaybe<Scalars['Int']>;
  pos_not_eq?: InputMaybe<Scalars['Int']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type RewardEventsConnection = {
  __typename?: 'RewardEventsConnection';
  edges: Array<RewardEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']>;
};

export type WhereIdInput = {
  id: Scalars['String'];
};

export type AccountQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type AccountQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', free?: any | null, id: string, reserved?: any | null, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> }> };

export type AccountsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type AccountsConnectionQuery = { __typename?: 'Query', accountsConnection: { __typename?: 'AccountsConnection', totalCount: number, edges: Array<{ __typename?: 'AccountEdge', cursor: string, node: { __typename?: 'Account', free?: any | null, id: string, reserved?: any | null, total?: any | null, nonce?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', id: string, timestamp: any, block: { __typename?: 'Block', height: any, hash: string } }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type AccountByIdQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type AccountByIdQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, nonce?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, indexInBlock: number, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null, rewardEvents: Array<{ __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any } | null }> };

export type AccountByIdEvmQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type AccountByIdEvmQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, indexInBlock: number, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null, rewardEvents: Array<{ __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any } | null }> };

export type OldAccountByIdQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type OldAccountByIdQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, indexInBlock: number, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null };

export type LatestRewardsWeekQueryVariables = Exact<{
  accountId: Scalars['String'];
  gte: Scalars['DateTime'];
}>;


export type LatestRewardsWeekQuery = { __typename?: 'Query', rewardEvents: Array<{ __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any } | null }> };

export type RewardsListQueryVariables = Exact<{
  accountId: Scalars['String'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type RewardsListQuery = { __typename?: 'Query', rewardEventsConnection: { __typename?: 'RewardEventsConnection', totalCount: number, edges: Array<{ __typename?: 'RewardEventEdge', cursor: string, node: { __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', hash: string, id: string, height: any } | null, account?: { __typename?: 'Account', id: string, free?: any | null, reserved?: any | null, total?: any | null, updatedAt?: any | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type ExtrinsicsByAccountIdQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<ExtrinsicWhereInput>;
}>;


export type ExtrinsicsByAccountIdQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', id: string, hash: string, name: string, success: boolean, indexInBlock: number, block: { __typename?: 'Block', height: any, timestamp: any } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type BlocksConnectionQuery = { __typename?: 'Query', blocksConnection: { __typename?: 'BlocksConnection', totalCount: number, edges: Array<{ __typename?: 'BlockEdge', cursor: string, node: { __typename?: 'Block', blockchainSize: any, extrinsicsRoot: string, hash: string, height: any, id: string, parentHash: string, spacePledged: any, specId: string, stateRoot: string, timestamp: any, events: Array<{ __typename?: 'Event', id: string }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }>, author?: { __typename?: 'Account', id: string } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksConnectionDomainQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type BlocksConnectionDomainQuery = { __typename?: 'Query', blocksConnection: { __typename?: 'BlocksConnection', totalCount: number, edges: Array<{ __typename?: 'BlockEdge', cursor: string, node: { __typename?: 'Block', extrinsicsRoot: string, hash: string, height: any, id: string, parentHash: string, specId: string, stateRoot: string, timestamp: any, events: Array<{ __typename?: 'Event', id: string }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlockByIdQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
}>;


export type BlockByIdQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any, hash: string, stateRoot: string, timestamp: any, extrinsicsRoot: string, specId: string, parentHash: string, extrinsicsCount: number, eventsCount: number, logs: Array<{ __typename?: 'Log', kind: string, id: string, block: { __typename?: 'Block', height: any, timestamp: any } }>, author?: { __typename?: 'Account', id: string } | null }> };

export type BlockByIdDomainQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
}>;


export type BlockByIdDomainQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any, hash: string, stateRoot: string, timestamp: any, extrinsicsRoot: string, specId: string, parentHash: string, extrinsicsCount: number, eventsCount: number, logs: Array<{ __typename?: 'Log', kind: string, id: string, block: { __typename?: 'Block', height: any, timestamp: any } }> }> };

export type ExtrinsicsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type ExtrinsicsByBlockIdQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', id: string, hash: string, name: string, success: boolean, indexInBlock: number, block: { __typename?: 'Block', height: any, timestamp: any } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } } };

export type EventsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type EventsByBlockIdQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', node: { __typename?: 'Event', id: string, name: string, phase: string, indexInBlock: number, block?: { __typename?: 'Block', height: any, id: string } | null, extrinsic?: { __typename?: 'Extrinsic', indexInBlock: number, block: { __typename?: 'Block', height: any, id: string } } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type BlocksByHashQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any }> };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', name: string, phase: string, id: string, indexInBlock: number, block?: { __typename?: 'Block', height: any, timestamp: any } | null }> };

export type EventsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<EventWhereInput>;
}>;


export type EventsConnectionQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', cursor: string, node: { __typename?: 'Event', args?: any | null, id: string, indexInBlock: number, name: string, phase: string, timestamp: any, block?: { __typename?: 'Block', id: string, timestamp: any, height: any } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } }, eventModuleNames: Array<{ __typename?: 'EventModuleName', name: string }> };

export type EventByIdQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventByIdQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', args?: any | null, id: string, indexInBlock: number, name: string, phase: string, timestamp: any, call?: { __typename?: 'Call', args?: any | null, name: string, success: boolean, timestamp: any, id: string } | null, extrinsic?: { __typename?: 'Extrinsic', args?: any | null, success: boolean, tip?: any | null, fee?: any | null, id: string, signer?: { __typename?: 'Account', id: string } | null } | null, block?: { __typename?: 'Block', height: any, id: string, timestamp: any, specId: string, hash: string } | null } | null };

export type ExtrinsicsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<ExtrinsicWhereInput>;
}>;


export type ExtrinsicsConnectionQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', hash: string, indexInBlock: number, id: string, success: boolean, name: string, nonce?: any | null, block: { __typename?: 'Block', id: string, timestamp: any, height: any } } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasPreviousPage: boolean, hasNextPage: boolean, startCursor: string } }, extrinsicModuleNames: Array<{ __typename?: 'ExtrinsicModuleName', name: string }> };

export type ExtrinsicsByIdQueryVariables = Exact<{
  extrinsicId: Scalars['String'];
}>;


export type ExtrinsicsByIdQuery = { __typename?: 'Query', extrinsicById?: { __typename?: 'Extrinsic', indexInBlock: number, id: string, hash: string, signature?: string | null, success: boolean, tip?: any | null, args?: any | null, name: string, block: { __typename?: 'Block', height: any, id: string, timestamp: any }, signer?: { __typename?: 'Account', id: string } | null, events: Array<{ __typename?: 'Event', id: string, indexInBlock: number, phase: string, timestamp: any, name: string, args?: any | null, block?: { __typename?: 'Block', height: any } | null, extrinsic?: { __typename?: 'Extrinsic', id: string, indexInBlock: number, block: { __typename?: 'Block', height: any } } | null }> } | null };

export type ExtrinsicsByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type ExtrinsicsByHashQuery = { __typename?: 'Query', extrinsics: Array<{ __typename?: 'Extrinsic', id: string, hash: string, indexInBlock: number, success: boolean, name: string, nonce?: any | null, block: { __typename?: 'Block', id: string, timestamp: any, height: any } }> };

export type HomeQueryQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  accountTotal: Scalars['BigInt'];
}>;


export type HomeQueryQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, hash: string, height: any, timestamp: any, stateRoot: string, blockchainSize: any, spacePledged: any, extrinsicsCount: number, eventsCount: number }>, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, success: boolean, indexInBlock: number, timestamp: any, name: string, block: { __typename?: 'Block', id: string, height: any } }>, accountsConnection: { __typename?: 'AccountsConnection', totalCount: number }, extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number } };

export type HomeQueryDomainQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  accountTotal: Scalars['BigInt'];
}>;


export type HomeQueryDomainQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, hash: string, height: any, timestamp: any, stateRoot: string, extrinsicsCount: number, eventsCount: number }>, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, success: boolean, indexInBlock: number, timestamp: any, name: string, block: { __typename?: 'Block', id: string, height: any } }>, accountsConnection: { __typename?: 'AccountsConnection', totalCount: number }, extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number } };

export type LogsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<LogWhereInput>;
}>;


export type LogsConnectionQuery = { __typename?: 'Query', logsConnection: { __typename?: 'LogsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string }, edges: Array<{ __typename?: 'LogEdge', cursor: string, node: { __typename?: 'Log', id: string, kind: string, value?: any | null, block: { __typename?: 'Block', id: string, height: any, timestamp: any } } }> }, logTypesQuery: { __typename?: 'LogNamesResult', result: Array<string> } };

export type LogByIdQueryVariables = Exact<{
  logId: Scalars['String'];
}>;


export type LogByIdQuery = { __typename?: 'Query', logById?: { __typename?: 'Log', id: string, kind: string, value?: any | null, block: { __typename?: 'Block', id: string, height: any, timestamp: any, events: Array<{ __typename?: 'Event', id: string, args?: any | null, name: string, phase: string, indexInBlock: number, timestamp: any, block?: { __typename?: 'Block', height: any, hash: string } | null }> } } | null };

export type OperatorsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type OperatorsConnectionQuery = { __typename?: 'Query', operatorsConnection: { __typename?: 'OperatorsConnection', totalCount: number, edges: Array<{ __typename?: 'OperatorEdge', node: { __typename?: 'Operator', id: string, currentDomainId?: number | null, currentEpochRewards?: any | null, currentTotalStake?: any | null, minimumNominatorStake?: any | null, nextDomainId?: number | null, nominationTax?: number | null, signingKey: string, status?: string | null, totalShares?: any | null, updatedAt?: any | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type OperatorByIdQueryVariables = Exact<{
  operatorId: Scalars['String'];
}>;


export type OperatorByIdQuery = { __typename?: 'Query', operatorById?: { __typename?: 'Operator', id: string, currentDomainId?: number | null, currentEpochRewards?: any | null, currentTotalStake?: any | null, minimumNominatorStake?: any | null, nextDomainId?: number | null, nominationTax?: number | null, signingKey: string, status?: string | null, totalShares?: any | null, updatedAt?: any | null, nominators: Array<{ __typename?: 'Nominator', id: string, shares?: any | null, account: { __typename?: 'Account', id: string } }> } | null };

export type AccountsConnectionRewardsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type AccountsConnectionRewardsQuery = { __typename?: 'Query', accountsConnection: { __typename?: 'AccountsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string }, edges: Array<{ __typename?: 'AccountEdge', cursor: string, node: { __typename?: 'Account', blockRewardsTotal?: any | null, free?: any | null, id: string, reserved?: any | null, total?: any | null, updatedAt?: any | null, voteRewardsTotal?: any | null } }> } };

export type BlocksAndExtrinsicByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type BlocksAndExtrinsicByHashQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> };

export type GetResultsQueryVariables = Exact<{
  term: Scalars['String'];
  blockId: Scalars['BigInt'];
  isAccount: Scalars['Boolean'];
  isBlock: Scalars['Boolean'];
  isExtrinsic: Scalars['Boolean'];
  isExtrinsicHash: Scalars['Boolean'];
  isEvent: Scalars['Boolean'];
}>;


export type GetResultsQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', id: string } | null, blocks?: Array<{ __typename?: 'Block', height: any }>, extrinsicById?: { __typename?: 'Extrinsic', id: string, name: string, indexInBlock: number, timestamp: any, block: { __typename?: 'Block', height: any } } | null, extrinsics?: Array<{ __typename?: 'Extrinsic', id: string }>, eventById?: { __typename?: 'Event', id: string, name: string, indexInBlock: number, timestamp: any, block?: { __typename?: 'Block', height: any } | null } | null };


export const AccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Account"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"StringValue","value":"0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
export const AccountsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"StringValue","value":"0","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"300"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<AccountsConnectionQuery, AccountsConnectionQueryVariables>;
export const AccountByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]} as unknown as DocumentNode<AccountByIdQuery, AccountByIdQueryVariables>;
export const AccountByIdEvmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountByIdEVM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]} as unknown as DocumentNode<AccountByIdEvmQuery, AccountByIdEvmQueryVariables>;
export const OldAccountByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OldAccountById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OldAccountByIdQuery, OldAccountByIdQueryVariables>;
export const LatestRewardsWeekDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestRewardsWeek"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gte"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rewardEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"500"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gte"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]} as unknown as DocumentNode<LatestRewardsWeekQuery, LatestRewardsWeekQueryVariables>;
export const RewardsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RewardsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rewardEventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<RewardsListQuery, RewardsListQueryVariables>;
export const ExtrinsicsByAccountIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsByAccountId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExtrinsicWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"indexInBlock_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByAccountIdQuery, ExtrinsicsByAccountIdQueryVariables>;
export const BlocksConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocksConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"height_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockchainSize"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsRoot"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"spacePledged"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<BlocksConnectionQuery, BlocksConnectionQueryVariables>;
export const BlocksConnectionDomainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksConnectionDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocksConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"height_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicsRoot"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<BlocksConnectionDomainQuery, BlocksConnectionDomainQueryVariables>;
export const BlockByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlockById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsRoot"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BlockByIdQuery, BlockByIdQueryVariables>;
export const BlockByIdDomainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlockByIdDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsRoot"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BlockByIdDomainQuery, BlockByIdDomainQueryVariables>;
export const ExtrinsicsByBlockIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsByBlockId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"indexInBlock_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByBlockIdQuery, ExtrinsicsByBlockIdQueryVariables>;
export const EventsByBlockIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsByBlockId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"indexInBlock_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<EventsByBlockIdQuery, EventsByBlockIdQueryVariables>;
export const BlocksByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]} as unknown as DocumentNode<BlocksByHashQuery, BlocksByHashQueryVariables>;
export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const EventsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventModuleNames"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"300"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EventsConnectionQuery, EventsConnectionQueryVariables>;
export const EventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"call"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}}]}}]}}]} as unknown as DocumentNode<EventByIdQuery, EventByIdQueryVariables>;
export const ExtrinsicsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExtrinsicWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicModuleNames"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"300"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsConnectionQuery, ExtrinsicsConnectionQueryVariables>;
export const ExtrinsicsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"extrinsicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"extrinsicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"signer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByIdQuery, ExtrinsicsByIdQueryVariables>;
export const ExtrinsicsByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByHashQuery, ExtrinsicsByHashQueryVariables>;
export const HomeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountTotal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainSize"}},{"kind":"Field","name":{"kind":"Name","value":"spacePledged"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountTotal"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signature_isNull"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<HomeQueryQuery, HomeQueryQueryVariables>;
export const HomeQueryDomainDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeQueryDomain"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountTotal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountTotal"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signature_isNull"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<HomeQueryDomainQuery, HomeQueryDomainQueryVariables>;
export const LogsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LogsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LogWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"logTypesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<LogsConnectionQuery, LogsConnectionQueryVariables>;
export const LogByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LogById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LogByIdQuery, LogByIdQueryVariables>;
export const OperatorsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OperatorsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"operatorsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentDomainId"}},{"kind":"Field","name":{"kind":"Name","value":"currentEpochRewards"}},{"kind":"Field","name":{"kind":"Name","value":"currentTotalStake"}},{"kind":"Field","name":{"kind":"Name","value":"minimumNominatorStake"}},{"kind":"Field","name":{"kind":"Name","value":"nextDomainId"}},{"kind":"Field","name":{"kind":"Name","value":"nominationTax"}},{"kind":"Field","name":{"kind":"Name","value":"signingKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalShares"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<OperatorsConnectionQuery, OperatorsConnectionQueryVariables>;
export const OperatorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OperatorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"operatorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"operatorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"operatorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentDomainId"}},{"kind":"Field","name":{"kind":"Name","value":"currentEpochRewards"}},{"kind":"Field","name":{"kind":"Name","value":"currentTotalStake"}},{"kind":"Field","name":{"kind":"Name","value":"minimumNominatorStake"}},{"kind":"Field","name":{"kind":"Name","value":"nextDomainId"}},{"kind":"Field","name":{"kind":"Name","value":"nominationTax"}},{"kind":"Field","name":{"kind":"Name","value":"signingKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalShares"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nominators"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OperatorByIdQuery, OperatorByIdQueryVariables>;
export const AccountsConnectionRewardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountsConnectionRewards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"StringValue","value":"0","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockRewardsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"voteRewardsTotal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}}]} as unknown as DocumentNode<AccountsConnectionRewardsQuery, AccountsConnectionRewardsQueryVariables>;
export const BlocksAndExtrinsicByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksAndExtrinsicByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BlocksAndExtrinsicByHashQuery, BlocksAndExtrinsicByHashQueryVariables>;
export const GetResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAccount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsicHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEvent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAccount"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isBlock"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsic"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}]}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsicHash"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEvent"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetResultsQuery, GetResultsQueryVariables>;