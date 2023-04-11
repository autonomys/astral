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
  extrinsics: Array<Extrinsic>;
  free?: Maybe<Scalars['BigInt']>;
  id: Scalars['String'];
  reserved?: Maybe<Scalars['BigInt']>;
  total?: Maybe<Scalars['BigInt']>;
  updatedAt?: Maybe<Scalars['BigInt']>;
};


export type AccountExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String'];
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
  reserved_eq?: InputMaybe<Scalars['BigInt']>;
  reserved_gt?: InputMaybe<Scalars['BigInt']>;
  reserved_gte?: InputMaybe<Scalars['BigInt']>;
  reserved_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserved_isNull?: InputMaybe<Scalars['Boolean']>;
  reserved_lt?: InputMaybe<Scalars['BigInt']>;
  reserved_lte?: InputMaybe<Scalars['BigInt']>;
  reserved_not_eq?: InputMaybe<Scalars['BigInt']>;
  reserved_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  extrinsicRoot?: Maybe<Scalars['String']>;
  extrinsics: Array<Extrinsic>;
  extrinsicsCount: Scalars['Int'];
  hash: Scalars['String'];
  height: Scalars['BigInt'];
  id: Scalars['String'];
  logs: Array<Log>;
  parentHash: Scalars['String'];
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

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String'];
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
  ExtrinsicRootAsc = 'extrinsicRoot_ASC',
  ExtrinsicRootDesc = 'extrinsicRoot_DESC',
  ExtrinsicsCountAsc = 'extrinsicsCount_ASC',
  ExtrinsicsCountDesc = 'extrinsicsCount_DESC',
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
  extrinsicRoot_contains?: InputMaybe<Scalars['String']>;
  extrinsicRoot_containsInsensitive?: InputMaybe<Scalars['String']>;
  extrinsicRoot_endsWith?: InputMaybe<Scalars['String']>;
  extrinsicRoot_eq?: InputMaybe<Scalars['String']>;
  extrinsicRoot_gt?: InputMaybe<Scalars['String']>;
  extrinsicRoot_gte?: InputMaybe<Scalars['String']>;
  extrinsicRoot_in?: InputMaybe<Array<Scalars['String']>>;
  extrinsicRoot_isNull?: InputMaybe<Scalars['Boolean']>;
  extrinsicRoot_lt?: InputMaybe<Scalars['String']>;
  extrinsicRoot_lte?: InputMaybe<Scalars['String']>;
  extrinsicRoot_not_contains?: InputMaybe<Scalars['String']>;
  extrinsicRoot_not_containsInsensitive?: InputMaybe<Scalars['String']>;
  extrinsicRoot_not_endsWith?: InputMaybe<Scalars['String']>;
  extrinsicRoot_not_eq?: InputMaybe<Scalars['String']>;
  extrinsicRoot_not_in?: InputMaybe<Array<Scalars['String']>>;
  extrinsicRoot_not_startsWith?: InputMaybe<Scalars['String']>;
  extrinsicRoot_startsWith?: InputMaybe<Scalars['String']>;
  extrinsicsCount_eq?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_gt?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_gte?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  extrinsicsCount_isNull?: InputMaybe<Scalars['Boolean']>;
  extrinsicsCount_lt?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_lte?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_not_eq?: InputMaybe<Scalars['Int']>;
  extrinsicsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  BlockExtrinsicRootAsc = 'block_extrinsicRoot_ASC',
  BlockExtrinsicRootDesc = 'block_extrinsicRoot_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
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

export enum EventOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicRootAsc = 'block_extrinsicRoot_ASC',
  BlockExtrinsicRootDesc = 'block_extrinsicRoot_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
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

export enum ExtrinsicOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicRootAsc = 'block_extrinsicRoot_ASC',
  BlockExtrinsicRootDesc = 'block_extrinsicRoot_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
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

export enum LogOrderByInput {
  BlockBlockchainSizeAsc = 'block_blockchainSize_ASC',
  BlockBlockchainSizeDesc = 'block_blockchainSize_DESC',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockExtrinsicRootAsc = 'block_extrinsicRoot_ASC',
  BlockExtrinsicRootDesc = 'block_extrinsicRoot_DESC',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
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
  events: Array<Event>;
  eventsConnection: EventsConnection;
  extrinsicById?: Maybe<Extrinsic>;
  /** @deprecated Use extrinsicById */
  extrinsicByUniqueInput?: Maybe<Extrinsic>;
  extrinsics: Array<Extrinsic>;
  extrinsicsConnection: ExtrinsicsConnection;
  logById?: Maybe<Log>;
  /** @deprecated Use logById */
  logByUniqueInput?: Maybe<Log>;
  logs: Array<Log>;
  logsConnection: LogsConnection;
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


export type AccountsConnectionQuery = { __typename?: 'Query', accountsConnection: { __typename?: 'AccountsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string }, edges: Array<{ __typename?: 'AccountEdge', cursor: string, node: { __typename?: 'Account', free?: any | null, id: string, reserved?: any | null, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> } }> } };

export type AccountByIdQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type AccountByIdQuery = { __typename?: 'Query', accountById?: { __typename?: 'Account', free?: any | null, reserved?: any | null, id: string, total?: any | null, updatedAt?: any | null, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, pos?: number | null, name: string, success: boolean, timestamp: any, tip?: any | null, block: { __typename?: 'Block', id: string, height: any } }> } | null };

export type BlocksConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type BlocksConnectionQuery = { __typename?: 'Query', blocksConnection: { __typename?: 'BlocksConnection', totalCount: number, edges: Array<{ __typename?: 'BlockEdge', cursor: string, node: { __typename?: 'Block', blockchainSize: any, extrinsicRoot?: string | null, hash: string, height: any, id: string, parentHash: string, spacePledged: any, specId: string, stateRoot: string, timestamp: any, events: Array<{ __typename?: 'Event', id: string }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }>, author?: { __typename?: 'Account', id: string } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlockByIdQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
}>;


export type BlockByIdQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any, hash: string, stateRoot: string, timestamp: any, extrinsicRoot?: string | null, specId: string, parentHash: string, extrinsicsCount: number, eventsCount: number, logs: Array<{ __typename?: 'Log', kind: string, id: string, block: { __typename?: 'Block', height: any, timestamp: any } }>, author?: { __typename?: 'Account', id: string } | null }> };

export type ExtrinsicsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type ExtrinsicsByBlockIdQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', id: string, hash: string, name: string, success: boolean, pos?: number | null, block: { __typename?: 'Block', height: any, timestamp: any } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } } };

export type EventsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['BigInt'];
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type EventsByBlockIdQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', node: { __typename?: 'Event', id: string, name: string, phase: string, pos?: number | null, block?: { __typename?: 'Block', height: any, id: string } | null, extrinsic?: { __typename?: 'Extrinsic', pos?: number | null, block: { __typename?: 'Block', height: any, id: string } } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string } } };

export type BlocksByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type BlocksByHashQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any }> };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', name: string, phase: string, pos?: number | null, id: string, indexInBlock: number, block?: { __typename?: 'Block', height: any, timestamp: any } | null }> };

export type EventsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type EventsConnectionQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', cursor: string, node: { __typename?: 'Event', args?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', id: string, timestamp: any, height: any } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string, hasPreviousPage: boolean, startCursor: string } } };

export type EventByIdQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventByIdQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', args?: any | null, id: string, indexInBlock: number, name: string, phase: string, pos?: number | null, timestamp: any, call?: { __typename?: 'Call', args?: any | null, name: string, success: boolean, timestamp: any, id: string } | null, extrinsic?: { __typename?: 'Extrinsic', args?: any | null, success: boolean, tip?: any | null, fee?: any | null, id: string, signer?: { __typename?: 'Account', id: string } | null } | null, block?: { __typename?: 'Block', height: any, id: string, timestamp: any, specId: string, hash: string } | null } | null };

export type ExtrinsicsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type ExtrinsicsConnectionQuery = { __typename?: 'Query', extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number, edges: Array<{ __typename?: 'ExtrinsicEdge', cursor: string, node: { __typename?: 'Extrinsic', hash: string, pos?: number | null, id: string, success: boolean, name: string, nonce?: any | null, block: { __typename?: 'Block', id: string, timestamp: any, height: any } } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasPreviousPage: boolean, hasNextPage: boolean, startCursor: string } } };

export type ExtrinsicsByIdQueryVariables = Exact<{
  extrinsicId: Scalars['String'];
}>;


export type ExtrinsicsByIdQuery = { __typename?: 'Query', extrinsicById?: { __typename?: 'Extrinsic', pos?: number | null, id: string, hash: string, signature?: string | null, success: boolean, tip?: any | null, args?: any | null, name: string, block: { __typename?: 'Block', height: any, id: string, timestamp: any }, signer?: { __typename?: 'Account', id: string } | null, events: Array<{ __typename?: 'Event', id: string, indexInBlock: number, phase: string, pos?: number | null, timestamp: any, name: string, args?: any | null, block?: { __typename?: 'Block', height: any } | null, extrinsic?: { __typename?: 'Extrinsic', id: string, pos?: number | null, block: { __typename?: 'Block', height: any } } | null }> } | null };

export type ExtrinsicsByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type ExtrinsicsByHashQuery = { __typename?: 'Query', extrinsics: Array<{ __typename?: 'Extrinsic', id: string, hash: string, pos?: number | null, success: boolean, name: string, nonce?: any | null, block: { __typename?: 'Block', id: string, timestamp: any, height: any } }> };

export type HomeQueryQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  accountTotal: Scalars['BigInt'];
}>;


export type HomeQueryQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, hash: string, height: any, timestamp: any, stateRoot: string, blockchainSize: any, spacePledged: any, extrinsicsCount: number, eventsCount: number }>, extrinsics: Array<{ __typename?: 'Extrinsic', hash: string, id: string, success: boolean, pos?: number | null, name: string, block: { __typename?: 'Block', id: string, height: any } }>, accountsConnection: { __typename?: 'AccountsConnection', totalCount: number }, extrinsicsConnection: { __typename?: 'ExtrinsicsConnection', totalCount: number } };

export type LogsConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type LogsConnectionQuery = { __typename?: 'Query', logsConnection: { __typename?: 'LogsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string }, edges: Array<{ __typename?: 'LogEdge', cursor: string, node: { __typename?: 'Log', id: string, kind: string, value?: any | null, block: { __typename?: 'Block', id: string, height: any, timestamp: any } } }> } };

export type LogByIdQueryVariables = Exact<{
  logId: Scalars['String'];
}>;


export type LogByIdQuery = { __typename?: 'Query', logById?: { __typename?: 'Log', id: string, kind: string, value?: any | null, block: { __typename?: 'Block', id: string, height: any, timestamp: any, events: Array<{ __typename?: 'Event', id: string, args?: any | null, name: string, phase: string, pos?: number | null, timestamp: any, block?: { __typename?: 'Block', height: any, hash: string } | null }> } } | null };

export type BlocksAndExtrinsicByHashQueryVariables = Exact<{
  hash: Scalars['String'];
}>;


export type BlocksAndExtrinsicByHashQuery = { __typename?: 'Query', blocks: Array<{ __typename?: 'Block', id: string, height: any }>, extrinsics: Array<{ __typename?: 'Extrinsic', id: string }> };


export const AccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Account"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
export const AccountsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"total_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_isNull"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"300"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccountsConnectionQuery, AccountsConnectionQueryVariables>;
export const AccountByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"free"}},{"kind":"Field","name":{"kind":"Name","value":"reserved"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccountByIdQuery, AccountByIdQueryVariables>;
export const BlocksConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocksConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"height_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockchainSize"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicRoot"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"spacePledged"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<BlocksConnectionQuery, BlocksConnectionQueryVariables>;
export const BlockByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlockById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicRoot"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"parentHash"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BlockByIdQuery, BlockByIdQueryVariables>;
export const ExtrinsicsByBlockIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsByBlockId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"pos_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pos"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByBlockIdQuery, ExtrinsicsByBlockIdQueryVariables>;
export const EventsByBlockIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsByBlockId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"pos_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"height_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<EventsByBlockIdQuery, EventsByBlockIdQueryVariables>;
export const BlocksByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]} as unknown as DocumentNode<BlocksByHashQuery, BlocksByHashQueryVariables>;
export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const EventsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<EventsConnectionQuery, EventsConnectionQueryVariables>;
export const EventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"call"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"specId"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}}]}}]}}]} as unknown as DocumentNode<EventByIdQuery, EventByIdQueryVariables>;
export const ExtrinsicsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsConnectionQuery, ExtrinsicsConnectionQueryVariables>;
export const ExtrinsicsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"extrinsicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsicById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"extrinsicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"tip"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"signer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByIdQuery, ExtrinsicsByIdQueryVariables>;
export const ExtrinsicsByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExtrinsicsByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nonce"}}]}}]}}]} as unknown as DocumentNode<ExtrinsicsByHashQuery, ExtrinsicsByHashQueryVariables>;
export const HomeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountTotal"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"height_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"stateRoot"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainSize"}},{"kind":"Field","name":{"kind":"Name","value":"spacePledged"}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"total_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountTotal"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsicsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"signature_isNull"},"value":{"kind":"BooleanValue","value":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<HomeQueryQuery, HomeQueryQueryVariables>;
export const LogsConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LogsConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"block_height_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]}}]} as unknown as DocumentNode<LogsConnectionQuery, LogsConnectionQueryVariables>;
export const LogByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LogById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"pos"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LogByIdQuery, LogByIdQueryVariables>;
export const BlocksAndExtrinsicByHashDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlocksAndExtrinsicByHash"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extrinsics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hash_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BlocksAndExtrinsicByHashQuery, BlocksAndExtrinsicByHashQueryVariables>;