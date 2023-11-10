/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Big number integer */
  BigInt: { input: any; output: any; }
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any; }
  /** A scalar that can represent any JSON value */
  JSON: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  extrinsics: Array<Extrinsic>;
  free?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['String']['output'];
  reserved?: Maybe<Scalars['BigInt']['output']>;
  rewards: Array<RewardEvent>;
  total?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};


export type AccountExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
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
  FreeAsc = 'free_ASC',
  FreeDesc = 'free_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ReservedAsc = 'reserved_ASC',
  ReservedDesc = 'reserved_DESC',
  TotalAsc = 'total_ASC',
  TotalDesc = 'total_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  extrinsics_every?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_none?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_some?: InputMaybe<ExtrinsicWhereInput>;
  free_eq?: InputMaybe<Scalars['BigInt']['input']>;
  free_gt?: InputMaybe<Scalars['BigInt']['input']>;
  free_gte?: InputMaybe<Scalars['BigInt']['input']>;
  free_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  free_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  free_lt?: InputMaybe<Scalars['BigInt']['input']>;
  free_lte?: InputMaybe<Scalars['BigInt']['input']>;
  free_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  free_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  reserved_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserved_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserved_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserved_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewards_every?: InputMaybe<RewardEventWhereInput>;
  rewards_none?: InputMaybe<RewardEventWhereInput>;
  rewards_some?: InputMaybe<RewardEventWhereInput>;
  total_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_gt?: InputMaybe<Scalars['BigInt']['input']>;
  total_gte?: InputMaybe<Scalars['BigInt']['input']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  total_lt?: InputMaybe<Scalars['BigInt']['input']>;
  total_lte?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Block = {
  __typename?: 'Block';
  author?: Maybe<Account>;
  blockchainSize: Scalars['BigInt']['output'];
  calls: Array<Call>;
  events: Array<Event>;
  eventsCount: Scalars['Int']['output'];
  extrinsics: Array<Extrinsic>;
  extrinsicsCount: Scalars['Int']['output'];
  extrinsicsRoot: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  height: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  logs: Array<Log>;
  parentHash: Scalars['String']['output'];
  rewards: Array<RewardEvent>;
  spacePledged: Scalars['BigInt']['output'];
  specId: Scalars['String']['output'];
  stateRoot: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};


export type BlockCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type BlockEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type BlockExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type BlockLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LogOrderByInput>>;
  where?: InputMaybe<LogWhereInput>;
};


export type BlockRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RewardEventOrderByInput>>;
  where?: InputMaybe<RewardEventWhereInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String']['output'];
  node: Block;
};

export enum BlockOrderByInput {
  AuthorFreeAsc = 'author_free_ASC',
  AuthorFreeDesc = 'author_free_DESC',
  AuthorIdAsc = 'author_id_ASC',
  AuthorIdDesc = 'author_id_DESC',
  AuthorReservedAsc = 'author_reserved_ASC',
  AuthorReservedDesc = 'author_reserved_DESC',
  AuthorTotalAsc = 'author_total_ASC',
  AuthorTotalDesc = 'author_total_DESC',
  AuthorUpdatedAtAsc = 'author_updatedAt_ASC',
  AuthorUpdatedAtDesc = 'author_updatedAt_DESC',
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
  author_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockchainSize_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockchainSize_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockchainSize_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockchainSize_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockchainSize_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockchainSize_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockchainSize_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockchainSize_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockchainSize_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  eventsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  extrinsicsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicsRoot_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicsRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicsRoot_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicsRoot_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicsRoot_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsics_every?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_none?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_some?: InputMaybe<ExtrinsicWhereInput>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_eq?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_not_eq?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hash_startsWith?: InputMaybe<Scalars['String']['input']>;
  height_eq?: InputMaybe<Scalars['BigInt']['input']>;
  height_gt?: InputMaybe<Scalars['BigInt']['input']>;
  height_gte?: InputMaybe<Scalars['BigInt']['input']>;
  height_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  height_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  height_lt?: InputMaybe<Scalars['BigInt']['input']>;
  height_lte?: InputMaybe<Scalars['BigInt']['input']>;
  height_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  height_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  logs_every?: InputMaybe<LogWhereInput>;
  logs_none?: InputMaybe<LogWhereInput>;
  logs_some?: InputMaybe<LogWhereInput>;
  parentHash_contains?: InputMaybe<Scalars['String']['input']>;
  parentHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  parentHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  parentHash_eq?: InputMaybe<Scalars['String']['input']>;
  parentHash_gt?: InputMaybe<Scalars['String']['input']>;
  parentHash_gte?: InputMaybe<Scalars['String']['input']>;
  parentHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  parentHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  parentHash_lt?: InputMaybe<Scalars['String']['input']>;
  parentHash_lte?: InputMaybe<Scalars['String']['input']>;
  parentHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  parentHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  parentHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  parentHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  parentHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  parentHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  parentHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewards_every?: InputMaybe<RewardEventWhereInput>;
  rewards_none?: InputMaybe<RewardEventWhereInput>;
  rewards_some?: InputMaybe<RewardEventWhereInput>;
  spacePledged_eq?: InputMaybe<Scalars['BigInt']['input']>;
  spacePledged_gt?: InputMaybe<Scalars['BigInt']['input']>;
  spacePledged_gte?: InputMaybe<Scalars['BigInt']['input']>;
  spacePledged_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  spacePledged_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  spacePledged_lt?: InputMaybe<Scalars['BigInt']['input']>;
  spacePledged_lte?: InputMaybe<Scalars['BigInt']['input']>;
  spacePledged_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  spacePledged_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  specId_contains?: InputMaybe<Scalars['String']['input']>;
  specId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  specId_endsWith?: InputMaybe<Scalars['String']['input']>;
  specId_eq?: InputMaybe<Scalars['String']['input']>;
  specId_gt?: InputMaybe<Scalars['String']['input']>;
  specId_gte?: InputMaybe<Scalars['String']['input']>;
  specId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  specId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  specId_lt?: InputMaybe<Scalars['String']['input']>;
  specId_lte?: InputMaybe<Scalars['String']['input']>;
  specId_not_contains?: InputMaybe<Scalars['String']['input']>;
  specId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  specId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  specId_not_eq?: InputMaybe<Scalars['String']['input']>;
  specId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  specId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  specId_startsWith?: InputMaybe<Scalars['String']['input']>;
  stateRoot_contains?: InputMaybe<Scalars['String']['input']>;
  stateRoot_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stateRoot_endsWith?: InputMaybe<Scalars['String']['input']>;
  stateRoot_eq?: InputMaybe<Scalars['String']['input']>;
  stateRoot_gt?: InputMaybe<Scalars['String']['input']>;
  stateRoot_gte?: InputMaybe<Scalars['String']['input']>;
  stateRoot_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stateRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stateRoot_lt?: InputMaybe<Scalars['String']['input']>;
  stateRoot_lte?: InputMaybe<Scalars['String']['input']>;
  stateRoot_not_contains?: InputMaybe<Scalars['String']['input']>;
  stateRoot_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stateRoot_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  stateRoot_not_eq?: InputMaybe<Scalars['String']['input']>;
  stateRoot_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stateRoot_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  stateRoot_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Call = {
  __typename?: 'Call';
  args?: Maybe<Scalars['JSON']['output']>;
  block: Block;
  calls: Array<Call>;
  error?: Maybe<Scalars['JSON']['output']>;
  extrinsic: Extrinsic;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Call>;
  pos?: Maybe<Scalars['Int']['output']>;
  signer?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  timestamp: Scalars['DateTime']['output'];
};


export type CallCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type CallEdge = {
  __typename?: 'CallEdge';
  cursor: Scalars['String']['output'];
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
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  error_eq?: InputMaybe<Scalars['JSON']['input']>;
  error_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  error_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  parent?: InputMaybe<CallWhereInput>;
  parent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pos_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_gt?: InputMaybe<Scalars['Int']['input']>;
  pos_gte?: InputMaybe<Scalars['Int']['input']>;
  pos_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pos_lt?: InputMaybe<Scalars['Int']['input']>;
  pos_lte?: InputMaybe<Scalars['Int']['input']>;
  pos_not_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signer_contains?: InputMaybe<Scalars['String']['input']>;
  signer_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signer_endsWith?: InputMaybe<Scalars['String']['input']>;
  signer_eq?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_not_contains?: InputMaybe<Scalars['String']['input']>;
  signer_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signer_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  signer_not_eq?: InputMaybe<Scalars['String']['input']>;
  signer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signer_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  signer_startsWith?: InputMaybe<Scalars['String']['input']>;
  success_eq?: InputMaybe<Scalars['Boolean']['input']>;
  success_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
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

export type CallsConnection = {
  __typename?: 'CallsConnection';
  edges: Array<CallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Event = {
  __typename?: 'Event';
  args?: Maybe<Scalars['JSON']['output']>;
  block?: Maybe<Block>;
  call?: Maybe<Call>;
  extrinsic?: Maybe<Extrinsic>;
  id: Scalars['String']['output'];
  indexInBlock: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phase: Scalars['String']['output'];
  pos?: Maybe<Scalars['Int']['output']>;
  timestamp: Scalars['DateTime']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type EventModuleName = {
  __typename?: 'EventModuleName';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EventModuleNameEdge = {
  __typename?: 'EventModuleNameEdge';
  cursor: Scalars['String']['output'];
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
};

export type EventModuleNamesConnection = {
  __typename?: 'EventModuleNamesConnection';
  edges: Array<EventModuleNameEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventNamesResult = {
  __typename?: 'EventNamesResult';
  result: Array<Scalars['String']['output']>;
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
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  phase_contains?: InputMaybe<Scalars['String']['input']>;
  phase_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_eq?: InputMaybe<Scalars['String']['input']>;
  phase_gt?: InputMaybe<Scalars['String']['input']>;
  phase_gte?: InputMaybe<Scalars['String']['input']>;
  phase_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  phase_lt?: InputMaybe<Scalars['String']['input']>;
  phase_lte?: InputMaybe<Scalars['String']['input']>;
  phase_not_contains?: InputMaybe<Scalars['String']['input']>;
  phase_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_not_eq?: InputMaybe<Scalars['String']['input']>;
  phase_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  phase_startsWith?: InputMaybe<Scalars['String']['input']>;
  pos_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_gt?: InputMaybe<Scalars['Int']['input']>;
  pos_gte?: InputMaybe<Scalars['Int']['input']>;
  pos_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pos_lt?: InputMaybe<Scalars['Int']['input']>;
  pos_lte?: InputMaybe<Scalars['Int']['input']>;
  pos_not_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Extrinsic = {
  __typename?: 'Extrinsic';
  args?: Maybe<Scalars['JSON']['output']>;
  block: Block;
  calls: Array<Call>;
  error?: Maybe<Scalars['JSON']['output']>;
  events: Array<Event>;
  fee?: Maybe<Scalars['BigInt']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  indexInBlock: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nonce?: Maybe<Scalars['BigInt']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  signer?: Maybe<Account>;
  success: Scalars['Boolean']['output'];
  timestamp: Scalars['DateTime']['output'];
  tip?: Maybe<Scalars['BigInt']['output']>;
};


export type ExtrinsicCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type ExtrinsicEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type ExtrinsicEdge = {
  __typename?: 'ExtrinsicEdge';
  cursor: Scalars['String']['output'];
  node: Extrinsic;
};

export type ExtrinsicModuleName = {
  __typename?: 'ExtrinsicModuleName';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ExtrinsicModuleNameEdge = {
  __typename?: 'ExtrinsicModuleNameEdge';
  cursor: Scalars['String']['output'];
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
};

export type ExtrinsicModuleNamesConnection = {
  __typename?: 'ExtrinsicModuleNamesConnection';
  edges: Array<ExtrinsicModuleNameEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ExtrinsicNamesResult = {
  __typename?: 'ExtrinsicNamesResult';
  result: Array<Scalars['String']['output']>;
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
  SignerFreeAsc = 'signer_free_ASC',
  SignerFreeDesc = 'signer_free_DESC',
  SignerIdAsc = 'signer_id_ASC',
  SignerIdDesc = 'signer_id_DESC',
  SignerReservedAsc = 'signer_reserved_ASC',
  SignerReservedDesc = 'signer_reserved_DESC',
  SignerTotalAsc = 'signer_total_ASC',
  SignerTotalDesc = 'signer_total_DESC',
  SignerUpdatedAtAsc = 'signer_updatedAt_ASC',
  SignerUpdatedAtDesc = 'signer_updatedAt_DESC',
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
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  error_eq?: InputMaybe<Scalars['JSON']['input']>;
  error_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  error_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_eq?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_not_eq?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hash_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  nonce_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nonce_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pos_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_gt?: InputMaybe<Scalars['Int']['input']>;
  pos_gte?: InputMaybe<Scalars['Int']['input']>;
  pos_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pos_lt?: InputMaybe<Scalars['Int']['input']>;
  pos_lte?: InputMaybe<Scalars['Int']['input']>;
  pos_not_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signature_contains?: InputMaybe<Scalars['String']['input']>;
  signature_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signature_endsWith?: InputMaybe<Scalars['String']['input']>;
  signature_eq?: InputMaybe<Scalars['String']['input']>;
  signature_gt?: InputMaybe<Scalars['String']['input']>;
  signature_gte?: InputMaybe<Scalars['String']['input']>;
  signature_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signature_lt?: InputMaybe<Scalars['String']['input']>;
  signature_lte?: InputMaybe<Scalars['String']['input']>;
  signature_not_contains?: InputMaybe<Scalars['String']['input']>;
  signature_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signature_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  signature_not_eq?: InputMaybe<Scalars['String']['input']>;
  signature_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signature_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  signature_startsWith?: InputMaybe<Scalars['String']['input']>;
  signer?: InputMaybe<AccountWhereInput>;
  signer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_eq?: InputMaybe<Scalars['Boolean']['input']>;
  success_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  tip_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tip_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tip_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tip_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tip_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tip_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tip_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tip_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tip_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type ExtrinsicsConnection = {
  __typename?: 'ExtrinsicsConnection';
  edges: Array<ExtrinsicEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Log = {
  __typename?: 'Log';
  block: Block;
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  value?: Maybe<Scalars['JSON']['output']>;
};

export type LogEdge = {
  __typename?: 'LogEdge';
  cursor: Scalars['String']['output'];
  node: Log;
};

export type LogNamesResult = {
  __typename?: 'LogNamesResult';
  result: Array<Scalars['String']['output']>;
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
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  kind_contains?: InputMaybe<Scalars['String']['input']>;
  kind_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  kind_endsWith?: InputMaybe<Scalars['String']['input']>;
  kind_eq?: InputMaybe<Scalars['String']['input']>;
  kind_gt?: InputMaybe<Scalars['String']['input']>;
  kind_gte?: InputMaybe<Scalars['String']['input']>;
  kind_in?: InputMaybe<Array<Scalars['String']['input']>>;
  kind_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  kind_lt?: InputMaybe<Scalars['String']['input']>;
  kind_lte?: InputMaybe<Scalars['String']['input']>;
  kind_not_contains?: InputMaybe<Scalars['String']['input']>;
  kind_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  kind_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  kind_not_eq?: InputMaybe<Scalars['String']['input']>;
  kind_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  kind_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  kind_startsWith?: InputMaybe<Scalars['String']['input']>;
  value_eq?: InputMaybe<Scalars['JSON']['input']>;
  value_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  value_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  value_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  value_not_eq?: InputMaybe<Scalars['JSON']['input']>;
};

export type LogsConnection = {
  __typename?: 'LogsConnection';
  edges: Array<LogEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Nominator = {
  __typename?: 'Nominator';
  account: Account;
  id: Scalars['String']['output'];
  operator: Operator;
  shares?: Maybe<Scalars['BigInt']['output']>;
};

export type NominatorEdge = {
  __typename?: 'NominatorEdge';
  cursor: Scalars['String']['output'];
  node: Nominator;
};

export enum NominatorOrderByInput {
  AccountFreeAsc = 'account_free_ASC',
  AccountFreeDesc = 'account_free_DESC',
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountReservedAsc = 'account_reserved_ASC',
  AccountReservedDesc = 'account_reserved_DESC',
  AccountTotalAsc = 'account_total_ASC',
  AccountTotalDesc = 'account_total_DESC',
  AccountUpdatedAtAsc = 'account_updatedAt_ASC',
  AccountUpdatedAtDesc = 'account_updatedAt_DESC',
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
  SharesAsc = 'shares_ASC',
  SharesDesc = 'shares_DESC'
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
  id: Scalars['String']['output'];
  minimumNominatorStake?: Maybe<Scalars['BigInt']['output']>;
  nextDomainId?: Maybe<Scalars['Int']['output']>;
  nominationTax?: Maybe<Scalars['Int']['output']>;
  signingKey: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  totalShares?: Maybe<Scalars['BigInt']['output']>;
};

export type OperatorEdge = {
  __typename?: 'OperatorEdge';
  cursor: Scalars['String']['output'];
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
  TotalSharesDesc = 'totalShares_DESC'
}

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
  id: Scalars['String']['input'];
};


export type QueryAccountByUniqueInputArgs = {
  where: WhereIdInput;
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


export type QueryBlockByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBlockByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BlockOrderByInput>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryCallByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCallByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type QueryCallsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CallOrderByInput>;
  where?: InputMaybe<CallWhereInput>;
};


export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEventModuleNameByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventModuleNameByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEventModuleNamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventModuleNameOrderByInput>>;
  where?: InputMaybe<EventModuleNameWhereInput>;
};


export type QueryEventModuleNamesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventModuleNameOrderByInput>;
  where?: InputMaybe<EventModuleNameWhereInput>;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventOrderByInput>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryExtrinsicByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryExtrinsicByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryExtrinsicModuleNameByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryExtrinsicModuleNameByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryExtrinsicModuleNamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicModuleNameOrderByInput>>;
  where?: InputMaybe<ExtrinsicModuleNameWhereInput>;
};


export type QueryExtrinsicModuleNamesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ExtrinsicModuleNameOrderByInput>;
  where?: InputMaybe<ExtrinsicModuleNameWhereInput>;
};


export type QueryExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type QueryExtrinsicsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ExtrinsicOrderByInput>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type QueryLogByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLogByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LogOrderByInput>>;
  where?: InputMaybe<LogWhereInput>;
};


export type QueryLogsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LogOrderByInput>;
  where?: InputMaybe<LogWhereInput>;
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
  account?: Maybe<Account>;
  amount?: Maybe<Scalars['BigInt']['output']>;
  block?: Maybe<Block>;
  call?: Maybe<Call>;
  extrinsic?: Maybe<Extrinsic>;
  id: Scalars['String']['output'];
  indexInBlock: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phase: Scalars['String']['output'];
  pos?: Maybe<Scalars['Int']['output']>;
  timestamp: Scalars['DateTime']['output'];
};

export type RewardEventEdge = {
  __typename?: 'RewardEventEdge';
  cursor: Scalars['String']['output'];
  node: RewardEvent;
};

export enum RewardEventOrderByInput {
  AccountFreeAsc = 'account_free_ASC',
  AccountFreeDesc = 'account_free_DESC',
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountReservedAsc = 'account_reserved_ASC',
  AccountReservedDesc = 'account_reserved_DESC',
  AccountTotalAsc = 'account_total_ASC',
  AccountTotalDesc = 'account_total_DESC',
  AccountUpdatedAtAsc = 'account_updatedAt_ASC',
  AccountUpdatedAtDesc = 'account_updatedAt_DESC',
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
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  phase_contains?: InputMaybe<Scalars['String']['input']>;
  phase_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_eq?: InputMaybe<Scalars['String']['input']>;
  phase_gt?: InputMaybe<Scalars['String']['input']>;
  phase_gte?: InputMaybe<Scalars['String']['input']>;
  phase_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  phase_lt?: InputMaybe<Scalars['String']['input']>;
  phase_lte?: InputMaybe<Scalars['String']['input']>;
  phase_not_contains?: InputMaybe<Scalars['String']['input']>;
  phase_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_not_eq?: InputMaybe<Scalars['String']['input']>;
  phase_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  phase_startsWith?: InputMaybe<Scalars['String']['input']>;
  pos_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_gt?: InputMaybe<Scalars['Int']['input']>;
  pos_gte?: InputMaybe<Scalars['Int']['input']>;
  pos_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pos_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pos_lt?: InputMaybe<Scalars['Int']['input']>;
  pos_lte?: InputMaybe<Scalars['Int']['input']>;
  pos_not_eq?: InputMaybe<Scalars['Int']['input']>;
  pos_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type AccountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type AccountQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', free?: any | null, id: string, reserved?: any | null, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> }> };

export type AccountsConnectionQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type AccountsConnectionQuery = { __typename?: 'Query', accountsConnection: { __typename?: 'AccountsConnection', totalCount: number, edges: Array<{ __typename?: 'AccountEdge', cursor: string, node: { __typename?: 'Account', free?: any | null, id: string, reserved?: any | null, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', id: string, timestamp: any, block: { __typename?: 'Block', height: any, hash: string } }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type AccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  hexAddress: Scalars['String']['input'];
}>;


export type AccountByIdQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, indexInBlock: number, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null, rewardEvents: Array<{ __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any } | null }> };

export type AccountByIdEvmQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type AccountByIdEvmQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, indexInBlock: number, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null, rewardEvents: Array<{ __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any } | null }> };

export type OldAccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type OldAccountByIdQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, indexInBlock: number, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null };

export type LatestRewardsWeekQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  gte: Scalars['DateTime']['input'];
}>;


export type LatestRewardsWeekQuery = { __typename?: 'Query', rewardEvents: Array<{ __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any } | null }> };

export type RewardsListQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type RewardsListQuery = { __typename?: 'Query', rewardEventsConnection: { __typename?: 'RewardEventsConnection', totalCount: number, edges: Array<{ __typename?: 'RewardEventEdge', cursor: string, node: { __typename?: 'RewardEvent', amount?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', hash: string, id: string, height: any } | null, account?: { __typename?: 'Account', id: string, free?: any | null, reserved?: any | null, total?: any | null, updatedAt?: any | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type ExtrinsicsByAccountIdQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ExtrinsicWhereInput>;
}>;


export type ExtrinsicsByAccountIdQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', id: string, hash: string, name: string, success: boolean, indexInBlock: number, block: { __typename?: 'Block', height: any, timestamp: any } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksConnectionQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlocksConnectionQuery = { __typename?: 'Query', blocksConnection: { __typename?: 'BlocksConnection', totalCount: number, edges: Array<{ __typename?: 'BlockEdge', cursor: string, node: { __typename?: 'Block', blockchainSize: any, extrinsicsRoot: string, hash: string, height: any, id: string, parentHash: string, spacePledged: any, specId: string, stateRoot: string, timestamp: any, events: Array<{ __typename?: 'Event', id: string }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }>, author?: { __typename?: 'Account', id: string } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksConnectionDomainQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlocksConnectionDomainQuery = { __typename?: 'Query', blocksConnection: { __typename?: 'BlocksConnection', totalCount: number, edges: Array<{ __typename?: 'BlockEdge', cursor: string, node: { __typename?: 'Block', extrinsicsRoot: string, hash: string, height: any, id: string, parentHash: string, specId: string, stateRoot: string, timestamp: any, events: Array<{ __typename?: 'Event', id: string }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlockByIdQueryVariables = Exact<{
  blockId: Scalars['BigInt']['input'];
}>;


export type BlockByIdQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any, hash: string, stateRoot: string, timestamp: any, extrinsicsRoot: string, specId: string, parentHash: string, extrinsicsCount: number, eventsCount: number, logs: Array<{ __typename?: 'Log', kind: string, id: string, block: { __typename?: 'Block', height: any, timestamp: any } }>, author?: { __typename?: 'Account', id: string } | null }> };

export type BlockByIdDomainQueryVariables = Exact<{
  blockId: Scalars['BigInt']['input'];
}>;


export type BlockByIdDomainQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any, hash: string, stateRoot: string, timestamp: any, extrinsicsRoot: string, specId: string, parentHash: string, extrinsicsCount: number, eventsCount: number, logs: Array<{ __typename?: 'Log', kind: string, id: string, block: { __typename?: 'Block', height: any, timestamp: any } }> }> };

export type ExtrinsicsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['BigInt']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExtrinsicsByBlockIdQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', id: string, hash: string, name: string, success: boolean, indexInBlock: number, block: { __typename?: 'Block', height: any, timestamp: any } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } } };

export type EventsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['BigInt']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type EventsByBlockIdQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', node: { __typename?: 'Event', id: string, name: string, phase: string, indexInBlock: number, block?: { __typename?: 'Block', height: any, id: string } | null, extrinsic?: { __typename?: 'Extrinsic', indexInBlock: number, block: { __typename?: 'Block', height: any, id: string } } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type BlocksByHashQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any }> };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', name: string, phase: string, id: string, indexInBlock: number, block?: { __typename?: 'Block', height: any, timestamp: any } | null }> };

export type EventsConnectionQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<EventWhereInput>;
}>;


export type EventsConnectionQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', cursor: string, node: { __typename?: 'Event', args?: any | null, id: string, indexInBlock: number, name: string, phase: string, timestamp: any, block?: { __typename?: 'Block', id: string, timestamp: any, height: any } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } }, eventModuleNames: Array<{ __typename?: 'EventModuleName', name: string }> };

export type EventByIdQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type EventByIdQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', args?: any | null, id: string, indexInBlock: number, name: string, phase: string, timestamp: any, call?: { __typename?: 'Call', args?: any | null, name: string, success: boolean, timestamp: any, id: string } | null, extrinsic?: { __typename?: 'Extrinsic', args?: any | null, success: boolean, tip?: any | null, fee?: any | null, id: string, signer?: { __typename?: 'Account', id: string } | null } | null, block?: { __typename?: 'Block', height: any, id: string, timestamp: any, specId: string, hash: string } | null } | null };

export type ExtrinsicsConnectionQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ExtrinsicWhereInput>;
}>;


export type ExtrinsicsConnectionQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', hash: string, indexInBlock: number, id: string, success: boolean, name: string, nonce?: any | null, block: { __typename?: 'Block', id: string, timestamp: any, height: any } } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasPreviousPage: boolean, hasNextPage: boolean, startCursor: string } }, extrinsicModuleNames: Array<{ __typename?: 'ExtrinsicModuleName', name: string }> };

export type ExtrinsicsByIdQueryVariables = Exact<{
  extrinsicId: Scalars['String']['input'];
}>;


export type ExtrinsicsByIdQuery = { __typename?: 'Query', extrinsicById?: { __typename?: 'Extrinsic', indexInBlock: number, id: string, hash: string, signature?: string | null, success: boolean, tip?: any | null, args?: any | null, name: string, block: { __typename?: 'Block', height: any, id: string, timestamp: any }, signer?: { __typename?: 'Account', id: string } | null, events: Array<{ __typename?: 'Event', id: string, indexInBlock: number, phase: string, timestamp: any, name: string, args?: any | null, block?: { __typename?: 'Block', height: any } | null, extrinsic?: { __typename?: 'Extrinsic', id: string, indexInBlock: number, block: { __typename?: 'Block', height: any } } | null }> } | null };

export type ExtrinsicsByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type ExtrinsicsByHashQuery = { __typename?: 'Query', extrinsics: Array<{ __typename?: 'Extrinsic', id: string, hash: string, indexInBlock: number, success: boolean, name: string, nonce?: any | null, block: { __typename?: 'Block', id: string, timestamp: any, height: any } }> };

export type HomeQueryQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  accountTotal: Scalars['BigInt']['input'];
}>;


export type HomeQueryQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, hash: string, height: any, timestamp: any, stateRoot: string, blockchainSize: any, spacePledged: any, extrinsicsCount: number, eventsCount: number }>, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, success: boolean, indexInBlock: number, timestamp: any, name: string, block: { __typename?: 'Block', id: string, height: any } }>, accountsConnection: { __typename?: 'AccountsConnection', totalCount: number }, extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number } };

export type HomeQueryDomainQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  accountTotal: Scalars['BigInt']['input'];
}>;


export type HomeQueryDomainQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, hash: string, height: any, timestamp: any, stateRoot: string, extrinsicsCount: number, eventsCount: number }>, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, success: boolean, indexInBlock: number, timestamp: any, name: string, block: { __typename?: 'Block', id: string, height: any } }>, accountsConnection: { __typename?: 'AccountsConnection', totalCount: number }, extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number } };

export type LogsConnectionQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LogWhereInput>;
}>;


export type LogsConnectionQuery = { __typename?: 'Query', logsConnection: { __typename?: 'LogsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string }, edges: Array<{ __typename?: 'LogEdge', cursor: string, node: { __typename?: 'Log', id: string, kind: string, value?: any | null, block: { __typename?: 'Block', id: string, height: any, timestamp: any } } }> }, logTypesQuery: { __typename?: 'LogNamesResult', result: Array<string> } };

export type LogByIdQueryVariables = Exact<{
  logId: Scalars['String']['input'];
}>;


export type LogByIdQuery = { __typename?: 'Query', logById?: { __typename?: 'Log', id: string, kind: string, value?: any | null, block: { __typename?: 'Block', id: string, height: any, timestamp: any, events: Array<{ __typename?: 'Event', id: string, args?: any | null, name: string, phase: string, indexInBlock: number, timestamp: any, block?: { __typename?: 'Block', height: any, hash: string } | null }> } } | null };

export type BlocksAndExtrinsicByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type BlocksAndExtrinsicByHashQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> };

export type GetResultsQueryVariables = Exact<{
  term: Scalars['String']['input'];
  blockId: Scalars['BigInt']['input'];
  isAccount: Scalars['Boolean']['input'];
  isBlock: Scalars['Boolean']['input'];
  isExtrinsic: Scalars['Boolean']['input'];
  isExtrinsicHash: Scalars['Boolean']['input'];
  isEvent: Scalars['Boolean']['input'];
}>;


export type GetResultsQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', id: string } | null, blocks?: Array<{ __typename?: 'Block', height: any }>, extrinsicById?: { __typename?: 'Extrinsic', id: string, name: string, indexInBlock: number, timestamp: any, block: { __typename?: 'Block', height: any } } | null, extrinsics?: Array<{ __typename?: 'Extrinsic', id: string }>, eventById?: { __typename?: 'Event', id: string, name: string, indexInBlock: number, timestamp: any, block?: { __typename?: 'Block', height: any } | null } | null };


export const AccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Account"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"StringValue","value":"0","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
export const AccountsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"StringValue","value":"0","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"300"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<AccountsConnectionQuery, AccountsConnectionQueryVariables>;
export const AccountByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hexAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"account"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hexAddress"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]} as unknown as DocumentNode<AccountByIdQuery, AccountByIdQueryVariables>;
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
export const BlocksAndExtrinsicByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksAndExtrinsicByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BlocksAndExtrinsicByHashQuery, BlocksAndExtrinsicByHashQueryVariables>;
export const GetResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAccount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsicHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEvent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAccount"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isBlock"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsic"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}]}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isExtrinsicHash"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEvent"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<GetResultsQuery, GetResultsQueryVariables>;