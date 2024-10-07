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
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "accounts.accounts" */
export type Accounts_Accounts = {
  __typename?: 'accounts_accounts';
  created_at: Scalars['numeric']['output'];
  /** An array relationship */
  extrinsics: Array<Consensus_Extrinsics>;
  /** An aggregate relationship */
  extrinsics_aggregate: Consensus_Extrinsics_Aggregate;
  free: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  nonce: Scalars['numeric']['output'];
  reserved: Scalars['numeric']['output'];
  /** An array relationship */
  rewards: Array<Accounts_Rewards>;
  /** An aggregate relationship */
  rewards_aggregate: Accounts_Rewards_Aggregate;
  total?: Maybe<Scalars['numeric']['output']>;
  updated_at: Scalars['numeric']['output'];
};


/** columns and relationships of "accounts.accounts" */
export type Accounts_AccountsExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


/** columns and relationships of "accounts.accounts" */
export type Accounts_AccountsExtrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


/** columns and relationships of "accounts.accounts" */
export type Accounts_AccountsRewardsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Rewards_Order_By>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};


/** columns and relationships of "accounts.accounts" */
export type Accounts_AccountsRewards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Rewards_Order_By>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};

/** aggregated selection of "accounts.accounts" */
export type Accounts_Accounts_Aggregate = {
  __typename?: 'accounts_accounts_aggregate';
  aggregate?: Maybe<Accounts_Accounts_Aggregate_Fields>;
  nodes: Array<Accounts_Accounts>;
};

/** aggregate fields of "accounts.accounts" */
export type Accounts_Accounts_Aggregate_Fields = {
  __typename?: 'accounts_accounts_aggregate_fields';
  avg?: Maybe<Accounts_Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Accounts_Max_Fields>;
  min?: Maybe<Accounts_Accounts_Min_Fields>;
  stddev?: Maybe<Accounts_Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Accounts_Sum_Fields>;
  var_pop?: Maybe<Accounts_Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Accounts_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Accounts_Variance_Fields>;
};


/** aggregate fields of "accounts.accounts" */
export type Accounts_Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Accounts_Accounts_Avg_Fields = {
  __typename?: 'accounts_accounts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "accounts.accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Accounts_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Accounts_Bool_Exp>>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  extrinsics?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  extrinsics_aggregate?: InputMaybe<Consensus_Extrinsics_Aggregate_Bool_Exp>;
  free?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nonce?: InputMaybe<Numeric_Comparison_Exp>;
  reserved?: InputMaybe<Numeric_Comparison_Exp>;
  rewards?: InputMaybe<Accounts_Rewards_Bool_Exp>;
  rewards_aggregate?: InputMaybe<Accounts_Rewards_Aggregate_Bool_Exp>;
  total?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Accounts_Accounts_Max_Fields = {
  __typename?: 'accounts_accounts_max_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  free?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
  total?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Accounts_Accounts_Min_Fields = {
  __typename?: 'accounts_accounts_min_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  free?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
  total?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "accounts.accounts". */
export type Accounts_Accounts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extrinsics_aggregate?: InputMaybe<Consensus_Extrinsics_Aggregate_Order_By>;
  free?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  reserved?: InputMaybe<Order_By>;
  rewards_aggregate?: InputMaybe<Accounts_Rewards_Aggregate_Order_By>;
  total?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "accounts.accounts" */
export enum Accounts_Accounts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Free = 'free',
  /** column name */
  Id = 'id',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Reserved = 'reserved',
  /** column name */
  Total = 'total',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Accounts_Accounts_Stddev_Fields = {
  __typename?: 'accounts_accounts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Accounts_Stddev_Pop_Fields = {
  __typename?: 'accounts_accounts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Accounts_Stddev_Samp_Fields = {
  __typename?: 'accounts_accounts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "accounts_accounts" */
export type Accounts_Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Accounts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  free?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['numeric']['input']>;
  reserved?: InputMaybe<Scalars['numeric']['input']>;
  total?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Accounts_Sum_Fields = {
  __typename?: 'accounts_accounts_sum_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  free?: Maybe<Scalars['numeric']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
  total?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Accounts_Accounts_Var_Pop_Fields = {
  __typename?: 'accounts_accounts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Accounts_Accounts_Var_Samp_Fields = {
  __typename?: 'accounts_accounts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Accounts_Accounts_Variance_Fields = {
  __typename?: 'accounts_accounts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "accounts.balance_histories" */
export type Accounts_Balance_Histories = {
  __typename?: 'accounts_balance_histories';
  account_id: Scalars['String']['output'];
  created_at: Scalars['numeric']['output'];
  free: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  reserved: Scalars['numeric']['output'];
  total?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "accounts.balance_histories" */
export type Accounts_Balance_Histories_Aggregate = {
  __typename?: 'accounts_balance_histories_aggregate';
  aggregate?: Maybe<Accounts_Balance_Histories_Aggregate_Fields>;
  nodes: Array<Accounts_Balance_Histories>;
};

/** aggregate fields of "accounts.balance_histories" */
export type Accounts_Balance_Histories_Aggregate_Fields = {
  __typename?: 'accounts_balance_histories_aggregate_fields';
  avg?: Maybe<Accounts_Balance_Histories_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Balance_Histories_Max_Fields>;
  min?: Maybe<Accounts_Balance_Histories_Min_Fields>;
  stddev?: Maybe<Accounts_Balance_Histories_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Balance_Histories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Balance_Histories_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Balance_Histories_Sum_Fields>;
  var_pop?: Maybe<Accounts_Balance_Histories_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Balance_Histories_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Balance_Histories_Variance_Fields>;
};


/** aggregate fields of "accounts.balance_histories" */
export type Accounts_Balance_Histories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Balance_Histories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Accounts_Balance_Histories_Avg_Fields = {
  __typename?: 'accounts_balance_histories_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "accounts.balance_histories". All fields are combined with a logical 'AND'. */
export type Accounts_Balance_Histories_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Balance_Histories_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Balance_Histories_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Balance_Histories_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  free?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  reserved?: InputMaybe<Numeric_Comparison_Exp>;
  total?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Accounts_Balance_Histories_Max_Fields = {
  __typename?: 'accounts_balance_histories_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  free?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
  total?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Accounts_Balance_Histories_Min_Fields = {
  __typename?: 'accounts_balance_histories_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  free?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
  total?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "accounts.balance_histories". */
export type Accounts_Balance_Histories_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  free?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reserved?: InputMaybe<Order_By>;
  total?: InputMaybe<Order_By>;
};

/** select columns of table "accounts.balance_histories" */
export enum Accounts_Balance_Histories_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Free = 'free',
  /** column name */
  Id = 'id',
  /** column name */
  Reserved = 'reserved',
  /** column name */
  Total = 'total'
}

/** aggregate stddev on columns */
export type Accounts_Balance_Histories_Stddev_Fields = {
  __typename?: 'accounts_balance_histories_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Balance_Histories_Stddev_Pop_Fields = {
  __typename?: 'accounts_balance_histories_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Balance_Histories_Stddev_Samp_Fields = {
  __typename?: 'accounts_balance_histories_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "accounts_balance_histories" */
export type Accounts_Balance_Histories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Balance_Histories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Balance_Histories_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  free?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  reserved?: InputMaybe<Scalars['numeric']['input']>;
  total?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Balance_Histories_Sum_Fields = {
  __typename?: 'accounts_balance_histories_sum_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  free?: Maybe<Scalars['numeric']['output']>;
  reserved?: Maybe<Scalars['numeric']['output']>;
  total?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Accounts_Balance_Histories_Var_Pop_Fields = {
  __typename?: 'accounts_balance_histories_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Accounts_Balance_Histories_Var_Samp_Fields = {
  __typename?: 'accounts_balance_histories_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Accounts_Balance_Histories_Variance_Fields = {
  __typename?: 'accounts_balance_histories_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  free?: Maybe<Scalars['Float']['output']>;
  reserved?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "accounts.rewards" */
export type Accounts_Rewards = {
  __typename?: 'accounts_rewards';
  /** An object relationship */
  account?: Maybe<Accounts_Accounts>;
  account_id: Scalars['String']['output'];
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  block?: Maybe<Consensus_Blocks>;
  block_hash: Scalars['String']['output'];
  block_height: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  index_in_block: Scalars['numeric']['output'];
  reward_type: Scalars['String']['output'];
  timestamp: Scalars['timestamp']['output'];
};

/** aggregated selection of "accounts.rewards" */
export type Accounts_Rewards_Aggregate = {
  __typename?: 'accounts_rewards_aggregate';
  aggregate?: Maybe<Accounts_Rewards_Aggregate_Fields>;
  nodes: Array<Accounts_Rewards>;
};

export type Accounts_Rewards_Aggregate_Bool_Exp = {
  count?: InputMaybe<Accounts_Rewards_Aggregate_Bool_Exp_Count>;
};

export type Accounts_Rewards_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Accounts_Rewards_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "accounts.rewards" */
export type Accounts_Rewards_Aggregate_Fields = {
  __typename?: 'accounts_rewards_aggregate_fields';
  avg?: Maybe<Accounts_Rewards_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Rewards_Max_Fields>;
  min?: Maybe<Accounts_Rewards_Min_Fields>;
  stddev?: Maybe<Accounts_Rewards_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Rewards_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Rewards_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Rewards_Sum_Fields>;
  var_pop?: Maybe<Accounts_Rewards_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Rewards_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Rewards_Variance_Fields>;
};


/** aggregate fields of "accounts.rewards" */
export type Accounts_Rewards_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "accounts.rewards" */
export type Accounts_Rewards_Aggregate_Order_By = {
  avg?: InputMaybe<Accounts_Rewards_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Accounts_Rewards_Max_Order_By>;
  min?: InputMaybe<Accounts_Rewards_Min_Order_By>;
  stddev?: InputMaybe<Accounts_Rewards_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Accounts_Rewards_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Accounts_Rewards_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Accounts_Rewards_Sum_Order_By>;
  var_pop?: InputMaybe<Accounts_Rewards_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Accounts_Rewards_Var_Samp_Order_By>;
  variance?: InputMaybe<Accounts_Rewards_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Accounts_Rewards_Avg_Fields = {
  __typename?: 'accounts_rewards_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "accounts.rewards". All fields are combined with a logical 'AND'. */
export type Accounts_Rewards_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Rewards_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Rewards_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Rewards_Bool_Exp>>;
  account?: InputMaybe<Accounts_Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  block?: InputMaybe<Consensus_Blocks_Bool_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  index_in_block?: InputMaybe<Numeric_Comparison_Exp>;
  reward_type?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Accounts_Rewards_Max_Fields = {
  __typename?: 'accounts_rewards_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['numeric']['output']>;
  reward_type?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  reward_type?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Accounts_Rewards_Min_Fields = {
  __typename?: 'accounts_rewards_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['numeric']['output']>;
  reward_type?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  reward_type?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "accounts.rewards". */
export type Accounts_Rewards_Order_By = {
  account?: InputMaybe<Accounts_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block?: InputMaybe<Consensus_Blocks_Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  reward_type?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "accounts.rewards" */
export enum Accounts_Rewards_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Id = 'id',
  /** column name */
  IndexInBlock = 'index_in_block',
  /** column name */
  RewardType = 'reward_type',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Accounts_Rewards_Stddev_Fields = {
  __typename?: 'accounts_rewards_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Rewards_Stddev_Pop_Fields = {
  __typename?: 'accounts_rewards_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Rewards_Stddev_Samp_Fields = {
  __typename?: 'accounts_rewards_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "accounts_rewards" */
export type Accounts_Rewards_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Rewards_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Rewards_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  index_in_block?: InputMaybe<Scalars['numeric']['input']>;
  reward_type?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Rewards_Sum_Fields = {
  __typename?: 'accounts_rewards_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  index_in_block?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Accounts_Rewards_Var_Pop_Fields = {
  __typename?: 'accounts_rewards_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Accounts_Rewards_Var_Samp_Fields = {
  __typename?: 'accounts_rewards_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Accounts_Rewards_Variance_Fields = {
  __typename?: 'accounts_rewards_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "accounts.rewards" */
export type Accounts_Rewards_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** columns and relationships of "accounts.transfers" */
export type Accounts_Transfers = {
  __typename?: 'accounts_transfers';
  created_at: Scalars['numeric']['output'];
  date: Scalars['timestamp']['output'];
  event_id: Scalars['String']['output'];
  extrinsic_id: Scalars['String']['output'];
  fee: Scalars['numeric']['output'];
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  timestamp: Scalars['numeric']['output'];
  to: Scalars['String']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "accounts.transfers" */
export type Accounts_Transfers_Aggregate = {
  __typename?: 'accounts_transfers_aggregate';
  aggregate?: Maybe<Accounts_Transfers_Aggregate_Fields>;
  nodes: Array<Accounts_Transfers>;
};

/** aggregate fields of "accounts.transfers" */
export type Accounts_Transfers_Aggregate_Fields = {
  __typename?: 'accounts_transfers_aggregate_fields';
  avg?: Maybe<Accounts_Transfers_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Accounts_Transfers_Max_Fields>;
  min?: Maybe<Accounts_Transfers_Min_Fields>;
  stddev?: Maybe<Accounts_Transfers_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Transfers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Transfers_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Transfers_Sum_Fields>;
  var_pop?: Maybe<Accounts_Transfers_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Transfers_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Transfers_Variance_Fields>;
};


/** aggregate fields of "accounts.transfers" */
export type Accounts_Transfers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Accounts_Transfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Accounts_Transfers_Avg_Fields = {
  __typename?: 'accounts_transfers_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "accounts.transfers". All fields are combined with a logical 'AND'. */
export type Accounts_Transfers_Bool_Exp = {
  _and?: InputMaybe<Array<Accounts_Transfers_Bool_Exp>>;
  _not?: InputMaybe<Accounts_Transfers_Bool_Exp>;
  _or?: InputMaybe<Array<Accounts_Transfers_Bool_Exp>>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  date?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<String_Comparison_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  success?: InputMaybe<Boolean_Comparison_Exp>;
  timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Accounts_Transfers_Max_Fields = {
  __typename?: 'accounts_transfers_max_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  date?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Accounts_Transfers_Min_Fields = {
  __typename?: 'accounts_transfers_min_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  date?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "accounts.transfers". */
export type Accounts_Transfers_Order_By = {
  created_at?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  success?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "accounts.transfers" */
export enum Accounts_Transfers_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  EventId = 'event_id',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Fee = 'fee',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  Success = 'success',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  To = 'to',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Accounts_Transfers_Stddev_Fields = {
  __typename?: 'accounts_transfers_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Transfers_Stddev_Pop_Fields = {
  __typename?: 'accounts_transfers_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Transfers_Stddev_Samp_Fields = {
  __typename?: 'accounts_transfers_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "accounts_transfers" */
export type Accounts_Transfers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Accounts_Transfers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Accounts_Transfers_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  date?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp?: InputMaybe<Scalars['numeric']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Accounts_Transfers_Sum_Fields = {
  __typename?: 'accounts_transfers_sum_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['numeric']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Accounts_Transfers_Var_Pop_Fields = {
  __typename?: 'accounts_transfers_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Accounts_Transfers_Var_Samp_Fields = {
  __typename?: 'accounts_transfers_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Accounts_Transfers_Variance_Fields = {
  __typename?: 'accounts_transfers_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "consensus.blocks" */
export type Consensus_Blocks = {
  __typename?: 'consensus_blocks';
  author_id: Scalars['String']['output'];
  blockchain_size: Scalars['numeric']['output'];
  /** An array relationship */
  events: Array<Consensus_Events>;
  /** An aggregate relationship */
  events_aggregate: Consensus_Events_Aggregate;
  events_count: Scalars['Int']['output'];
  /** An array relationship */
  extrinsics: Array<Consensus_Extrinsics>;
  /** An aggregate relationship */
  extrinsics_aggregate: Consensus_Extrinsics_Aggregate;
  extrinsics_count: Scalars['Int']['output'];
  extrinsics_root: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  height: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  /** An array relationship */
  logs: Array<Consensus_Logs>;
  /** An aggregate relationship */
  logs_aggregate: Consensus_Logs_Aggregate;
  parent_hash: Scalars['String']['output'];
  space_pledged: Scalars['numeric']['output'];
  spec_id: Scalars['String']['output'];
  state_root: Scalars['String']['output'];
  timestamp: Scalars['timestamp']['output'];
};


/** columns and relationships of "consensus.blocks" */
export type Consensus_BlocksEventsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


/** columns and relationships of "consensus.blocks" */
export type Consensus_BlocksEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


/** columns and relationships of "consensus.blocks" */
export type Consensus_BlocksExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


/** columns and relationships of "consensus.blocks" */
export type Consensus_BlocksExtrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


/** columns and relationships of "consensus.blocks" */
export type Consensus_BlocksLogsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


/** columns and relationships of "consensus.blocks" */
export type Consensus_BlocksLogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};

/** aggregated selection of "consensus.blocks" */
export type Consensus_Blocks_Aggregate = {
  __typename?: 'consensus_blocks_aggregate';
  aggregate?: Maybe<Consensus_Blocks_Aggregate_Fields>;
  nodes: Array<Consensus_Blocks>;
};

/** aggregate fields of "consensus.blocks" */
export type Consensus_Blocks_Aggregate_Fields = {
  __typename?: 'consensus_blocks_aggregate_fields';
  avg?: Maybe<Consensus_Blocks_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Blocks_Max_Fields>;
  min?: Maybe<Consensus_Blocks_Min_Fields>;
  stddev?: Maybe<Consensus_Blocks_Stddev_Fields>;
  stddev_pop?: Maybe<Consensus_Blocks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Consensus_Blocks_Stddev_Samp_Fields>;
  sum?: Maybe<Consensus_Blocks_Sum_Fields>;
  var_pop?: Maybe<Consensus_Blocks_Var_Pop_Fields>;
  var_samp?: Maybe<Consensus_Blocks_Var_Samp_Fields>;
  variance?: Maybe<Consensus_Blocks_Variance_Fields>;
};


/** aggregate fields of "consensus.blocks" */
export type Consensus_Blocks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Blocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Consensus_Blocks_Avg_Fields = {
  __typename?: 'consensus_blocks_avg_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "consensus.blocks". All fields are combined with a logical 'AND'. */
export type Consensus_Blocks_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Blocks_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Blocks_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Blocks_Bool_Exp>>;
  author_id?: InputMaybe<String_Comparison_Exp>;
  blockchain_size?: InputMaybe<Numeric_Comparison_Exp>;
  events?: InputMaybe<Consensus_Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Consensus_Events_Aggregate_Bool_Exp>;
  events_count?: InputMaybe<Int_Comparison_Exp>;
  extrinsics?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  extrinsics_aggregate?: InputMaybe<Consensus_Extrinsics_Aggregate_Bool_Exp>;
  extrinsics_count?: InputMaybe<Int_Comparison_Exp>;
  extrinsics_root?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  height?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  logs?: InputMaybe<Consensus_Logs_Bool_Exp>;
  logs_aggregate?: InputMaybe<Consensus_Logs_Aggregate_Bool_Exp>;
  parent_hash?: InputMaybe<String_Comparison_Exp>;
  space_pledged?: InputMaybe<Numeric_Comparison_Exp>;
  spec_id?: InputMaybe<String_Comparison_Exp>;
  state_root?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Blocks_Max_Fields = {
  __typename?: 'consensus_blocks_max_fields';
  author_id?: Maybe<Scalars['String']['output']>;
  blockchain_size?: Maybe<Scalars['numeric']['output']>;
  events_count?: Maybe<Scalars['Int']['output']>;
  extrinsics_count?: Maybe<Scalars['Int']['output']>;
  extrinsics_root?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  parent_hash?: Maybe<Scalars['String']['output']>;
  space_pledged?: Maybe<Scalars['numeric']['output']>;
  spec_id?: Maybe<Scalars['String']['output']>;
  state_root?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Consensus_Blocks_Min_Fields = {
  __typename?: 'consensus_blocks_min_fields';
  author_id?: Maybe<Scalars['String']['output']>;
  blockchain_size?: Maybe<Scalars['numeric']['output']>;
  events_count?: Maybe<Scalars['Int']['output']>;
  extrinsics_count?: Maybe<Scalars['Int']['output']>;
  extrinsics_root?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  parent_hash?: Maybe<Scalars['String']['output']>;
  space_pledged?: Maybe<Scalars['numeric']['output']>;
  spec_id?: Maybe<Scalars['String']['output']>;
  state_root?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** Ordering options when selecting data from "consensus.blocks". */
export type Consensus_Blocks_Order_By = {
  author_id?: InputMaybe<Order_By>;
  blockchain_size?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Consensus_Events_Aggregate_Order_By>;
  events_count?: InputMaybe<Order_By>;
  extrinsics_aggregate?: InputMaybe<Consensus_Extrinsics_Aggregate_Order_By>;
  extrinsics_count?: InputMaybe<Order_By>;
  extrinsics_root?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logs_aggregate?: InputMaybe<Consensus_Logs_Aggregate_Order_By>;
  parent_hash?: InputMaybe<Order_By>;
  space_pledged?: InputMaybe<Order_By>;
  spec_id?: InputMaybe<Order_By>;
  state_root?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.blocks" */
export enum Consensus_Blocks_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  BlockchainSize = 'blockchain_size',
  /** column name */
  EventsCount = 'events_count',
  /** column name */
  ExtrinsicsCount = 'extrinsics_count',
  /** column name */
  ExtrinsicsRoot = 'extrinsics_root',
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  ParentHash = 'parent_hash',
  /** column name */
  SpacePledged = 'space_pledged',
  /** column name */
  SpecId = 'spec_id',
  /** column name */
  StateRoot = 'state_root',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Consensus_Blocks_Stddev_Fields = {
  __typename?: 'consensus_blocks_stddev_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Consensus_Blocks_Stddev_Pop_Fields = {
  __typename?: 'consensus_blocks_stddev_pop_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Consensus_Blocks_Stddev_Samp_Fields = {
  __typename?: 'consensus_blocks_stddev_samp_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "consensus_blocks" */
export type Consensus_Blocks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Blocks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Blocks_Stream_Cursor_Value_Input = {
  author_id?: InputMaybe<Scalars['String']['input']>;
  blockchain_size?: InputMaybe<Scalars['numeric']['input']>;
  events_count?: InputMaybe<Scalars['Int']['input']>;
  extrinsics_count?: InputMaybe<Scalars['Int']['input']>;
  extrinsics_root?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parent_hash?: InputMaybe<Scalars['String']['input']>;
  space_pledged?: InputMaybe<Scalars['numeric']['input']>;
  spec_id?: InputMaybe<Scalars['String']['input']>;
  state_root?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Consensus_Blocks_Sum_Fields = {
  __typename?: 'consensus_blocks_sum_fields';
  blockchain_size?: Maybe<Scalars['numeric']['output']>;
  events_count?: Maybe<Scalars['Int']['output']>;
  extrinsics_count?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['numeric']['output']>;
  space_pledged?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Consensus_Blocks_Var_Pop_Fields = {
  __typename?: 'consensus_blocks_var_pop_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Consensus_Blocks_Var_Samp_Fields = {
  __typename?: 'consensus_blocks_var_samp_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Consensus_Blocks_Variance_Fields = {
  __typename?: 'consensus_blocks_variance_fields';
  blockchain_size?: Maybe<Scalars['Float']['output']>;
  events_count?: Maybe<Scalars['Float']['output']>;
  extrinsics_count?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  space_pledged?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "consensus.event_modules" */
export type Consensus_Event_Modules = {
  __typename?: 'consensus_event_modules';
  /** An array relationship */
  events: Array<Consensus_Events>;
  /** An aggregate relationship */
  events_aggregate: Consensus_Events_Aggregate;
  id: Scalars['String']['output'];
  method: Scalars['String']['output'];
  /** An object relationship */
  module_section?: Maybe<Consensus_Sections>;
  section: Scalars['String']['output'];
};


/** columns and relationships of "consensus.event_modules" */
export type Consensus_Event_ModulesEventsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


/** columns and relationships of "consensus.event_modules" */
export type Consensus_Event_ModulesEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};

/** aggregated selection of "consensus.event_modules" */
export type Consensus_Event_Modules_Aggregate = {
  __typename?: 'consensus_event_modules_aggregate';
  aggregate?: Maybe<Consensus_Event_Modules_Aggregate_Fields>;
  nodes: Array<Consensus_Event_Modules>;
};

export type Consensus_Event_Modules_Aggregate_Bool_Exp = {
  count?: InputMaybe<Consensus_Event_Modules_Aggregate_Bool_Exp_Count>;
};

export type Consensus_Event_Modules_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "consensus.event_modules" */
export type Consensus_Event_Modules_Aggregate_Fields = {
  __typename?: 'consensus_event_modules_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Event_Modules_Max_Fields>;
  min?: Maybe<Consensus_Event_Modules_Min_Fields>;
};


/** aggregate fields of "consensus.event_modules" */
export type Consensus_Event_Modules_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "consensus.event_modules" */
export type Consensus_Event_Modules_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Consensus_Event_Modules_Max_Order_By>;
  min?: InputMaybe<Consensus_Event_Modules_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "consensus.event_modules". All fields are combined with a logical 'AND'. */
export type Consensus_Event_Modules_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Event_Modules_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Event_Modules_Bool_Exp>>;
  events?: InputMaybe<Consensus_Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Consensus_Events_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  method?: InputMaybe<String_Comparison_Exp>;
  module_section?: InputMaybe<Consensus_Sections_Bool_Exp>;
  section?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Event_Modules_Max_Fields = {
  __typename?: 'consensus_event_modules_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "consensus.event_modules" */
export type Consensus_Event_Modules_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Consensus_Event_Modules_Min_Fields = {
  __typename?: 'consensus_event_modules_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "consensus.event_modules" */
export type Consensus_Event_Modules_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "consensus.event_modules". */
export type Consensus_Event_Modules_Order_By = {
  events_aggregate?: InputMaybe<Consensus_Events_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  module_section?: InputMaybe<Consensus_Sections_Order_By>;
  section?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.event_modules" */
export enum Consensus_Event_Modules_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Method = 'method',
  /** column name */
  Section = 'section'
}

/** Streaming cursor of the table "consensus_event_modules" */
export type Consensus_Event_Modules_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Event_Modules_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Event_Modules_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "consensus.events" */
export type Consensus_Events = {
  __typename?: 'consensus_events';
  args: Scalars['String']['output'];
  /** An object relationship */
  block?: Maybe<Consensus_Blocks>;
  block_hash: Scalars['String']['output'];
  block_height: Scalars['numeric']['output'];
  event_module_id: Scalars['String']['output'];
  /** An object relationship */
  extrinsic?: Maybe<Consensus_Extrinsics>;
  extrinsic_hash: Scalars['String']['output'];
  extrinsic_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index_in_block: Scalars['numeric']['output'];
  /** An object relationship */
  module?: Maybe<Consensus_Event_Modules>;
  name: Scalars['String']['output'];
  phase: Scalars['String']['output'];
  pos: Scalars['Int']['output'];
  timestamp: Scalars['timestamp']['output'];
};

/** aggregated selection of "consensus.events" */
export type Consensus_Events_Aggregate = {
  __typename?: 'consensus_events_aggregate';
  aggregate?: Maybe<Consensus_Events_Aggregate_Fields>;
  nodes: Array<Consensus_Events>;
};

export type Consensus_Events_Aggregate_Bool_Exp = {
  count?: InputMaybe<Consensus_Events_Aggregate_Bool_Exp_Count>;
};

export type Consensus_Events_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Events_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "consensus.events" */
export type Consensus_Events_Aggregate_Fields = {
  __typename?: 'consensus_events_aggregate_fields';
  avg?: Maybe<Consensus_Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Events_Max_Fields>;
  min?: Maybe<Consensus_Events_Min_Fields>;
  stddev?: Maybe<Consensus_Events_Stddev_Fields>;
  stddev_pop?: Maybe<Consensus_Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Consensus_Events_Stddev_Samp_Fields>;
  sum?: Maybe<Consensus_Events_Sum_Fields>;
  var_pop?: Maybe<Consensus_Events_Var_Pop_Fields>;
  var_samp?: Maybe<Consensus_Events_Var_Samp_Fields>;
  variance?: Maybe<Consensus_Events_Variance_Fields>;
};


/** aggregate fields of "consensus.events" */
export type Consensus_Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "consensus.events" */
export type Consensus_Events_Aggregate_Order_By = {
  avg?: InputMaybe<Consensus_Events_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Consensus_Events_Max_Order_By>;
  min?: InputMaybe<Consensus_Events_Min_Order_By>;
  stddev?: InputMaybe<Consensus_Events_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Consensus_Events_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Consensus_Events_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Consensus_Events_Sum_Order_By>;
  var_pop?: InputMaybe<Consensus_Events_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Consensus_Events_Var_Samp_Order_By>;
  variance?: InputMaybe<Consensus_Events_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Consensus_Events_Avg_Fields = {
  __typename?: 'consensus_events_avg_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "consensus.events" */
export type Consensus_Events_Avg_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "consensus.events". All fields are combined with a logical 'AND'. */
export type Consensus_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Events_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Events_Bool_Exp>>;
  args?: InputMaybe<String_Comparison_Exp>;
  block?: InputMaybe<Consensus_Blocks_Bool_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  event_module_id?: InputMaybe<String_Comparison_Exp>;
  extrinsic?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  extrinsic_hash?: InputMaybe<String_Comparison_Exp>;
  extrinsic_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  index_in_block?: InputMaybe<Numeric_Comparison_Exp>;
  module?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phase?: InputMaybe<String_Comparison_Exp>;
  pos?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Events_Max_Fields = {
  __typename?: 'consensus_events_max_fields';
  args?: Maybe<Scalars['String']['output']>;
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  event_module_id?: Maybe<Scalars['String']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phase?: Maybe<Scalars['String']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "consensus.events" */
export type Consensus_Events_Max_Order_By = {
  args?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_module_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phase?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Consensus_Events_Min_Fields = {
  __typename?: 'consensus_events_min_fields';
  args?: Maybe<Scalars['String']['output']>;
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  event_module_id?: Maybe<Scalars['String']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  extrinsic_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phase?: Maybe<Scalars['String']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "consensus.events" */
export type Consensus_Events_Min_Order_By = {
  args?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_module_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phase?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "consensus.events". */
export type Consensus_Events_Order_By = {
  args?: InputMaybe<Order_By>;
  block?: InputMaybe<Consensus_Blocks_Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_module_id?: InputMaybe<Order_By>;
  extrinsic?: InputMaybe<Consensus_Extrinsics_Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  extrinsic_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  module?: InputMaybe<Consensus_Event_Modules_Order_By>;
  name?: InputMaybe<Order_By>;
  phase?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.events" */
export enum Consensus_Events_Select_Column {
  /** column name */
  Args = 'args',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  EventModuleId = 'event_module_id',
  /** column name */
  ExtrinsicHash = 'extrinsic_hash',
  /** column name */
  ExtrinsicId = 'extrinsic_id',
  /** column name */
  Id = 'id',
  /** column name */
  IndexInBlock = 'index_in_block',
  /** column name */
  Name = 'name',
  /** column name */
  Phase = 'phase',
  /** column name */
  Pos = 'pos',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Consensus_Events_Stddev_Fields = {
  __typename?: 'consensus_events_stddev_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "consensus.events" */
export type Consensus_Events_Stddev_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Consensus_Events_Stddev_Pop_Fields = {
  __typename?: 'consensus_events_stddev_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "consensus.events" */
export type Consensus_Events_Stddev_Pop_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Consensus_Events_Stddev_Samp_Fields = {
  __typename?: 'consensus_events_stddev_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "consensus.events" */
export type Consensus_Events_Stddev_Samp_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "consensus_events" */
export type Consensus_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Events_Stream_Cursor_Value_Input = {
  args?: InputMaybe<Scalars['String']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  event_module_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_hash?: InputMaybe<Scalars['String']['input']>;
  extrinsic_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  index_in_block?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phase?: InputMaybe<Scalars['String']['input']>;
  pos?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Consensus_Events_Sum_Fields = {
  __typename?: 'consensus_events_sum_fields';
  block_height?: Maybe<Scalars['numeric']['output']>;
  index_in_block?: Maybe<Scalars['numeric']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "consensus.events" */
export type Consensus_Events_Sum_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Consensus_Events_Var_Pop_Fields = {
  __typename?: 'consensus_events_var_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "consensus.events" */
export type Consensus_Events_Var_Pop_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Consensus_Events_Var_Samp_Fields = {
  __typename?: 'consensus_events_var_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "consensus.events" */
export type Consensus_Events_Var_Samp_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Consensus_Events_Variance_Fields = {
  __typename?: 'consensus_events_variance_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "consensus.events" */
export type Consensus_Events_Variance_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
};

/** columns and relationships of "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules = {
  __typename?: 'consensus_extrinsic_modules';
  /** An array relationship */
  extrinsics: Array<Consensus_Extrinsics>;
  /** An aggregate relationship */
  extrinsics_aggregate: Consensus_Extrinsics_Aggregate;
  id: Scalars['String']['output'];
  method: Scalars['String']['output'];
  /** An object relationship */
  module_section?: Maybe<Consensus_Sections>;
  section: Scalars['String']['output'];
};


/** columns and relationships of "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_ModulesExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


/** columns and relationships of "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_ModulesExtrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};

/** aggregated selection of "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Aggregate = {
  __typename?: 'consensus_extrinsic_modules_aggregate';
  aggregate?: Maybe<Consensus_Extrinsic_Modules_Aggregate_Fields>;
  nodes: Array<Consensus_Extrinsic_Modules>;
};

export type Consensus_Extrinsic_Modules_Aggregate_Bool_Exp = {
  count?: InputMaybe<Consensus_Extrinsic_Modules_Aggregate_Bool_Exp_Count>;
};

export type Consensus_Extrinsic_Modules_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Aggregate_Fields = {
  __typename?: 'consensus_extrinsic_modules_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Extrinsic_Modules_Max_Fields>;
  min?: Maybe<Consensus_Extrinsic_Modules_Min_Fields>;
};


/** aggregate fields of "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Consensus_Extrinsic_Modules_Max_Order_By>;
  min?: InputMaybe<Consensus_Extrinsic_Modules_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "consensus.extrinsic_modules". All fields are combined with a logical 'AND'. */
export type Consensus_Extrinsic_Modules_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Extrinsic_Modules_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Extrinsic_Modules_Bool_Exp>>;
  extrinsics?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  extrinsics_aggregate?: InputMaybe<Consensus_Extrinsics_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  method?: InputMaybe<String_Comparison_Exp>;
  module_section?: InputMaybe<Consensus_Sections_Bool_Exp>;
  section?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Extrinsic_Modules_Max_Fields = {
  __typename?: 'consensus_extrinsic_modules_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Consensus_Extrinsic_Modules_Min_Fields = {
  __typename?: 'consensus_extrinsic_modules_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "consensus.extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "consensus.extrinsic_modules". */
export type Consensus_Extrinsic_Modules_Order_By = {
  extrinsics_aggregate?: InputMaybe<Consensus_Extrinsics_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  method?: InputMaybe<Order_By>;
  module_section?: InputMaybe<Consensus_Sections_Order_By>;
  section?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.extrinsic_modules" */
export enum Consensus_Extrinsic_Modules_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Method = 'method',
  /** column name */
  Section = 'section'
}

/** Streaming cursor of the table "consensus_extrinsic_modules" */
export type Consensus_Extrinsic_Modules_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Extrinsic_Modules_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Extrinsic_Modules_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "consensus.extrinsics" */
export type Consensus_Extrinsics = {
  __typename?: 'consensus_extrinsics';
  args: Scalars['String']['output'];
  /** An object relationship */
  block?: Maybe<Consensus_Blocks>;
  block_hash: Scalars['String']['output'];
  block_height: Scalars['numeric']['output'];
  error: Scalars['String']['output'];
  /** An array relationship */
  events: Array<Consensus_Events>;
  /** An aggregate relationship */
  events_aggregate: Consensus_Events_Aggregate;
  extrinsic_module_id: Scalars['String']['output'];
  fee: Scalars['numeric']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index_in_block: Scalars['Int']['output'];
  /** An object relationship */
  module?: Maybe<Consensus_Extrinsic_Modules>;
  name: Scalars['String']['output'];
  nonce: Scalars['numeric']['output'];
  pos: Scalars['Int']['output'];
  signature: Scalars['String']['output'];
  signer: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  timestamp: Scalars['timestamp']['output'];
  tip: Scalars['numeric']['output'];
};


/** columns and relationships of "consensus.extrinsics" */
export type Consensus_ExtrinsicsEventsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


/** columns and relationships of "consensus.extrinsics" */
export type Consensus_ExtrinsicsEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};

/** aggregated selection of "consensus.extrinsics" */
export type Consensus_Extrinsics_Aggregate = {
  __typename?: 'consensus_extrinsics_aggregate';
  aggregate?: Maybe<Consensus_Extrinsics_Aggregate_Fields>;
  nodes: Array<Consensus_Extrinsics>;
};

export type Consensus_Extrinsics_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Consensus_Extrinsics_Aggregate_Bool_Exp_Count>;
};

export type Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_And = {
  arguments: Consensus_Extrinsics_Select_Column_Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Consensus_Extrinsics_Select_Column_Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Consensus_Extrinsics_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "consensus.extrinsics" */
export type Consensus_Extrinsics_Aggregate_Fields = {
  __typename?: 'consensus_extrinsics_aggregate_fields';
  avg?: Maybe<Consensus_Extrinsics_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Extrinsics_Max_Fields>;
  min?: Maybe<Consensus_Extrinsics_Min_Fields>;
  stddev?: Maybe<Consensus_Extrinsics_Stddev_Fields>;
  stddev_pop?: Maybe<Consensus_Extrinsics_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Consensus_Extrinsics_Stddev_Samp_Fields>;
  sum?: Maybe<Consensus_Extrinsics_Sum_Fields>;
  var_pop?: Maybe<Consensus_Extrinsics_Var_Pop_Fields>;
  var_samp?: Maybe<Consensus_Extrinsics_Var_Samp_Fields>;
  variance?: Maybe<Consensus_Extrinsics_Variance_Fields>;
};


/** aggregate fields of "consensus.extrinsics" */
export type Consensus_Extrinsics_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Aggregate_Order_By = {
  avg?: InputMaybe<Consensus_Extrinsics_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Consensus_Extrinsics_Max_Order_By>;
  min?: InputMaybe<Consensus_Extrinsics_Min_Order_By>;
  stddev?: InputMaybe<Consensus_Extrinsics_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Consensus_Extrinsics_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Consensus_Extrinsics_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Consensus_Extrinsics_Sum_Order_By>;
  var_pop?: InputMaybe<Consensus_Extrinsics_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Consensus_Extrinsics_Var_Samp_Order_By>;
  variance?: InputMaybe<Consensus_Extrinsics_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Consensus_Extrinsics_Avg_Fields = {
  __typename?: 'consensus_extrinsics_avg_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Avg_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "consensus.extrinsics". All fields are combined with a logical 'AND'. */
export type Consensus_Extrinsics_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Extrinsics_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Extrinsics_Bool_Exp>>;
  args?: InputMaybe<String_Comparison_Exp>;
  block?: InputMaybe<Consensus_Blocks_Bool_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  error?: InputMaybe<String_Comparison_Exp>;
  events?: InputMaybe<Consensus_Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Consensus_Events_Aggregate_Bool_Exp>;
  extrinsic_module_id?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  index_in_block?: InputMaybe<Int_Comparison_Exp>;
  module?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nonce?: InputMaybe<Numeric_Comparison_Exp>;
  pos?: InputMaybe<Int_Comparison_Exp>;
  signature?: InputMaybe<String_Comparison_Exp>;
  signer?: InputMaybe<String_Comparison_Exp>;
  success?: InputMaybe<Boolean_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  tip?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Extrinsics_Max_Fields = {
  __typename?: 'consensus_extrinsics_max_fields';
  args?: Maybe<Scalars['String']['output']>;
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  extrinsic_module_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  signer?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Max_Order_By = {
  args?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  extrinsic_module_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  signer?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Consensus_Extrinsics_Min_Fields = {
  __typename?: 'consensus_extrinsics_min_fields';
  args?: Maybe<Scalars['String']['output']>;
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  extrinsic_module_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  signer?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Min_Order_By = {
  args?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  extrinsic_module_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  signer?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "consensus.extrinsics". */
export type Consensus_Extrinsics_Order_By = {
  args?: InputMaybe<Order_By>;
  block?: InputMaybe<Consensus_Blocks_Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  error?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Consensus_Events_Aggregate_Order_By>;
  extrinsic_module_id?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  module?: InputMaybe<Consensus_Extrinsic_Modules_Order_By>;
  name?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  signer?: InputMaybe<Order_By>;
  success?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.extrinsics" */
export enum Consensus_Extrinsics_Select_Column {
  /** column name */
  Args = 'args',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Error = 'error',
  /** column name */
  ExtrinsicModuleId = 'extrinsic_module_id',
  /** column name */
  Fee = 'fee',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  IndexInBlock = 'index_in_block',
  /** column name */
  Name = 'name',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Pos = 'pos',
  /** column name */
  Signature = 'signature',
  /** column name */
  Signer = 'signer',
  /** column name */
  Success = 'success',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Tip = 'tip'
}

/** select "consensus_extrinsics_aggregate_bool_exp_bool_and_arguments_columns" columns of table "consensus.extrinsics" */
export enum Consensus_Extrinsics_Select_Column_Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Success = 'success'
}

/** select "consensus_extrinsics_aggregate_bool_exp_bool_or_arguments_columns" columns of table "consensus.extrinsics" */
export enum Consensus_Extrinsics_Select_Column_Consensus_Extrinsics_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Success = 'success'
}

/** aggregate stddev on columns */
export type Consensus_Extrinsics_Stddev_Fields = {
  __typename?: 'consensus_extrinsics_stddev_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Stddev_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Consensus_Extrinsics_Stddev_Pop_Fields = {
  __typename?: 'consensus_extrinsics_stddev_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Stddev_Pop_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Consensus_Extrinsics_Stddev_Samp_Fields = {
  __typename?: 'consensus_extrinsics_stddev_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Stddev_Samp_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "consensus_extrinsics" */
export type Consensus_Extrinsics_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Extrinsics_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Extrinsics_Stream_Cursor_Value_Input = {
  args?: InputMaybe<Scalars['String']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  extrinsic_module_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  index_in_block?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nonce?: InputMaybe<Scalars['numeric']['input']>;
  pos?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  signer?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  tip?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Consensus_Extrinsics_Sum_Fields = {
  __typename?: 'consensus_extrinsics_sum_fields';
  block_height?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  nonce?: Maybe<Scalars['numeric']['output']>;
  pos?: Maybe<Scalars['Int']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Sum_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Consensus_Extrinsics_Var_Pop_Fields = {
  __typename?: 'consensus_extrinsics_var_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Var_Pop_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Consensus_Extrinsics_Var_Samp_Fields = {
  __typename?: 'consensus_extrinsics_var_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Var_Samp_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Consensus_Extrinsics_Variance_Fields = {
  __typename?: 'consensus_extrinsics_variance_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
  nonce?: Maybe<Scalars['Float']['output']>;
  pos?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "consensus.extrinsics" */
export type Consensus_Extrinsics_Variance_Order_By = {
  block_height?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pos?: InputMaybe<Order_By>;
  tip?: InputMaybe<Order_By>;
};

/** columns and relationships of "consensus.log_kinds" */
export type Consensus_Log_Kinds = {
  __typename?: 'consensus_log_kinds';
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  /** An array relationship */
  logs: Array<Consensus_Logs>;
  /** An aggregate relationship */
  logs_aggregate: Consensus_Logs_Aggregate;
};


/** columns and relationships of "consensus.log_kinds" */
export type Consensus_Log_KindsLogsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


/** columns and relationships of "consensus.log_kinds" */
export type Consensus_Log_KindsLogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};

/** aggregated selection of "consensus.log_kinds" */
export type Consensus_Log_Kinds_Aggregate = {
  __typename?: 'consensus_log_kinds_aggregate';
  aggregate?: Maybe<Consensus_Log_Kinds_Aggregate_Fields>;
  nodes: Array<Consensus_Log_Kinds>;
};

/** aggregate fields of "consensus.log_kinds" */
export type Consensus_Log_Kinds_Aggregate_Fields = {
  __typename?: 'consensus_log_kinds_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Log_Kinds_Max_Fields>;
  min?: Maybe<Consensus_Log_Kinds_Min_Fields>;
};


/** aggregate fields of "consensus.log_kinds" */
export type Consensus_Log_Kinds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Log_Kinds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "consensus.log_kinds". All fields are combined with a logical 'AND'. */
export type Consensus_Log_Kinds_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Log_Kinds_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Log_Kinds_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  logs?: InputMaybe<Consensus_Logs_Bool_Exp>;
  logs_aggregate?: InputMaybe<Consensus_Logs_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Consensus_Log_Kinds_Max_Fields = {
  __typename?: 'consensus_log_kinds_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Consensus_Log_Kinds_Min_Fields = {
  __typename?: 'consensus_log_kinds_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "consensus.log_kinds". */
export type Consensus_Log_Kinds_Order_By = {
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  logs_aggregate?: InputMaybe<Consensus_Logs_Aggregate_Order_By>;
};

/** select columns of table "consensus.log_kinds" */
export enum Consensus_Log_Kinds_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind'
}

/** Streaming cursor of the table "consensus_log_kinds" */
export type Consensus_Log_Kinds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Log_Kinds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Log_Kinds_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "consensus.logs" */
export type Consensus_Logs = {
  __typename?: 'consensus_logs';
  /** An object relationship */
  block?: Maybe<Consensus_Blocks>;
  block_hash: Scalars['String']['output'];
  block_height: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  index_in_block: Scalars['Int']['output'];
  kind: Scalars['String']['output'];
  /** An object relationship */
  log_kind?: Maybe<Consensus_Log_Kinds>;
  log_kind_id: Scalars['String']['output'];
  timestamp: Scalars['timestamp']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "consensus.logs" */
export type Consensus_Logs_Aggregate = {
  __typename?: 'consensus_logs_aggregate';
  aggregate?: Maybe<Consensus_Logs_Aggregate_Fields>;
  nodes: Array<Consensus_Logs>;
};

export type Consensus_Logs_Aggregate_Bool_Exp = {
  count?: InputMaybe<Consensus_Logs_Aggregate_Bool_Exp_Count>;
};

export type Consensus_Logs_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Consensus_Logs_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "consensus.logs" */
export type Consensus_Logs_Aggregate_Fields = {
  __typename?: 'consensus_logs_aggregate_fields';
  avg?: Maybe<Consensus_Logs_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Logs_Max_Fields>;
  min?: Maybe<Consensus_Logs_Min_Fields>;
  stddev?: Maybe<Consensus_Logs_Stddev_Fields>;
  stddev_pop?: Maybe<Consensus_Logs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Consensus_Logs_Stddev_Samp_Fields>;
  sum?: Maybe<Consensus_Logs_Sum_Fields>;
  var_pop?: Maybe<Consensus_Logs_Var_Pop_Fields>;
  var_samp?: Maybe<Consensus_Logs_Var_Samp_Fields>;
  variance?: Maybe<Consensus_Logs_Variance_Fields>;
};


/** aggregate fields of "consensus.logs" */
export type Consensus_Logs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "consensus.logs" */
export type Consensus_Logs_Aggregate_Order_By = {
  avg?: InputMaybe<Consensus_Logs_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Consensus_Logs_Max_Order_By>;
  min?: InputMaybe<Consensus_Logs_Min_Order_By>;
  stddev?: InputMaybe<Consensus_Logs_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Consensus_Logs_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Consensus_Logs_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Consensus_Logs_Sum_Order_By>;
  var_pop?: InputMaybe<Consensus_Logs_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Consensus_Logs_Var_Samp_Order_By>;
  variance?: InputMaybe<Consensus_Logs_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Consensus_Logs_Avg_Fields = {
  __typename?: 'consensus_logs_avg_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "consensus.logs" */
export type Consensus_Logs_Avg_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "consensus.logs". All fields are combined with a logical 'AND'. */
export type Consensus_Logs_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Logs_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Logs_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Logs_Bool_Exp>>;
  block?: InputMaybe<Consensus_Blocks_Bool_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  index_in_block?: InputMaybe<Int_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  log_kind?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
  log_kind_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Logs_Max_Fields = {
  __typename?: 'consensus_logs_max_fields';
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  log_kind_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "consensus.logs" */
export type Consensus_Logs_Max_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  log_kind_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Consensus_Logs_Min_Fields = {
  __typename?: 'consensus_logs_min_fields';
  block_hash?: Maybe<Scalars['String']['output']>;
  block_height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  log_kind_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "consensus.logs" */
export type Consensus_Logs_Min_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  log_kind_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "consensus.logs". */
export type Consensus_Logs_Order_By = {
  block?: InputMaybe<Consensus_Blocks_Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  log_kind?: InputMaybe<Consensus_Log_Kinds_Order_By>;
  log_kind_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.logs" */
export enum Consensus_Logs_Select_Column {
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Id = 'id',
  /** column name */
  IndexInBlock = 'index_in_block',
  /** column name */
  Kind = 'kind',
  /** column name */
  LogKindId = 'log_kind_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Consensus_Logs_Stddev_Fields = {
  __typename?: 'consensus_logs_stddev_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "consensus.logs" */
export type Consensus_Logs_Stddev_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Consensus_Logs_Stddev_Pop_Fields = {
  __typename?: 'consensus_logs_stddev_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "consensus.logs" */
export type Consensus_Logs_Stddev_Pop_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Consensus_Logs_Stddev_Samp_Fields = {
  __typename?: 'consensus_logs_stddev_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "consensus.logs" */
export type Consensus_Logs_Stddev_Samp_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "consensus_logs" */
export type Consensus_Logs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Logs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Logs_Stream_Cursor_Value_Input = {
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  index_in_block?: InputMaybe<Scalars['Int']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  log_kind_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Consensus_Logs_Sum_Fields = {
  __typename?: 'consensus_logs_sum_fields';
  block_height?: Maybe<Scalars['numeric']['output']>;
  index_in_block?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "consensus.logs" */
export type Consensus_Logs_Sum_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Consensus_Logs_Var_Pop_Fields = {
  __typename?: 'consensus_logs_var_pop_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "consensus.logs" */
export type Consensus_Logs_Var_Pop_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Consensus_Logs_Var_Samp_Fields = {
  __typename?: 'consensus_logs_var_samp_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "consensus.logs" */
export type Consensus_Logs_Var_Samp_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Consensus_Logs_Variance_Fields = {
  __typename?: 'consensus_logs_variance_fields';
  block_height?: Maybe<Scalars['Float']['output']>;
  index_in_block?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "consensus.logs" */
export type Consensus_Logs_Variance_Order_By = {
  block_height?: InputMaybe<Order_By>;
  index_in_block?: InputMaybe<Order_By>;
};

/** columns and relationships of "consensus.sections" */
export type Consensus_Sections = {
  __typename?: 'consensus_sections';
  /** An array relationship */
  event_modules: Array<Consensus_Event_Modules>;
  /** An aggregate relationship */
  event_modules_aggregate: Consensus_Event_Modules_Aggregate;
  /** An array relationship */
  extrinsic_modules: Array<Consensus_Extrinsic_Modules>;
  /** An aggregate relationship */
  extrinsic_modules_aggregate: Consensus_Extrinsic_Modules_Aggregate;
  id: Scalars['String']['output'];
  section: Scalars['String']['output'];
};


/** columns and relationships of "consensus.sections" */
export type Consensus_SectionsEvent_ModulesArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Event_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


/** columns and relationships of "consensus.sections" */
export type Consensus_SectionsEvent_Modules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Event_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


/** columns and relationships of "consensus.sections" */
export type Consensus_SectionsExtrinsic_ModulesArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsic_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};


/** columns and relationships of "consensus.sections" */
export type Consensus_SectionsExtrinsic_Modules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsic_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};

/** aggregated selection of "consensus.sections" */
export type Consensus_Sections_Aggregate = {
  __typename?: 'consensus_sections_aggregate';
  aggregate?: Maybe<Consensus_Sections_Aggregate_Fields>;
  nodes: Array<Consensus_Sections>;
};

/** aggregate fields of "consensus.sections" */
export type Consensus_Sections_Aggregate_Fields = {
  __typename?: 'consensus_sections_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Consensus_Sections_Max_Fields>;
  min?: Maybe<Consensus_Sections_Min_Fields>;
};


/** aggregate fields of "consensus.sections" */
export type Consensus_Sections_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Consensus_Sections_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "consensus.sections". All fields are combined with a logical 'AND'. */
export type Consensus_Sections_Bool_Exp = {
  _and?: InputMaybe<Array<Consensus_Sections_Bool_Exp>>;
  _not?: InputMaybe<Consensus_Sections_Bool_Exp>;
  _or?: InputMaybe<Array<Consensus_Sections_Bool_Exp>>;
  event_modules?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
  event_modules_aggregate?: InputMaybe<Consensus_Event_Modules_Aggregate_Bool_Exp>;
  extrinsic_modules?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
  extrinsic_modules_aggregate?: InputMaybe<Consensus_Extrinsic_Modules_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  section?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Consensus_Sections_Max_Fields = {
  __typename?: 'consensus_sections_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Consensus_Sections_Min_Fields = {
  __typename?: 'consensus_sections_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "consensus.sections". */
export type Consensus_Sections_Order_By = {
  event_modules_aggregate?: InputMaybe<Consensus_Event_Modules_Aggregate_Order_By>;
  extrinsic_modules_aggregate?: InputMaybe<Consensus_Extrinsic_Modules_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  section?: InputMaybe<Order_By>;
};

/** select columns of table "consensus.sections" */
export enum Consensus_Sections_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Section = 'section'
}

/** Streaming cursor of the table "consensus_sections" */
export type Consensus_Sections_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Consensus_Sections_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Consensus_Sections_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dictionary.events" */
export type Dictionary_Events = {
  __typename?: 'dictionary_events';
  block_height: Scalars['numeric']['output'];
  event: Scalars['String']['output'];
  id: Scalars['String']['output'];
  module: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dictionary.events". All fields are combined with a logical 'AND'. */
export type Dictionary_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Dictionary_Events_Bool_Exp>>;
  _not?: InputMaybe<Dictionary_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Dictionary_Events_Bool_Exp>>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  event?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  module?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dictionary.events". */
export type Dictionary_Events_Order_By = {
  block_height?: InputMaybe<Order_By>;
  event?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  module?: InputMaybe<Order_By>;
};

/** select columns of table "dictionary.events" */
export enum Dictionary_Events_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Event = 'event',
  /** column name */
  Id = 'id',
  /** column name */
  Module = 'module'
}

/** Streaming cursor of the table "dictionary_events" */
export type Dictionary_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dictionary_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dictionary_Events_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  event?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  module?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "dictionary.extrinsics" */
export type Dictionary_Extrinsics = {
  __typename?: 'dictionary_extrinsics';
  block_height: Scalars['numeric']['output'];
  call: Scalars['String']['output'];
  id: Scalars['String']['output'];
  is_signed: Scalars['Boolean']['output'];
  module: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  tx_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dictionary.extrinsics". All fields are combined with a logical 'AND'. */
export type Dictionary_Extrinsics_Bool_Exp = {
  _and?: InputMaybe<Array<Dictionary_Extrinsics_Bool_Exp>>;
  _not?: InputMaybe<Dictionary_Extrinsics_Bool_Exp>;
  _or?: InputMaybe<Array<Dictionary_Extrinsics_Bool_Exp>>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  call?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_signed?: InputMaybe<Boolean_Comparison_Exp>;
  module?: InputMaybe<String_Comparison_Exp>;
  success?: InputMaybe<Boolean_Comparison_Exp>;
  tx_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dictionary.extrinsics". */
export type Dictionary_Extrinsics_Order_By = {
  block_height?: InputMaybe<Order_By>;
  call?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_signed?: InputMaybe<Order_By>;
  module?: InputMaybe<Order_By>;
  success?: InputMaybe<Order_By>;
  tx_hash?: InputMaybe<Order_By>;
};

/** select columns of table "dictionary.extrinsics" */
export enum Dictionary_Extrinsics_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Call = 'call',
  /** column name */
  Id = 'id',
  /** column name */
  IsSigned = 'is_signed',
  /** column name */
  Module = 'module',
  /** column name */
  Success = 'success',
  /** column name */
  TxHash = 'tx_hash'
}

/** Streaming cursor of the table "dictionary_extrinsics" */
export type Dictionary_Extrinsics_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dictionary_Extrinsics_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dictionary_Extrinsics_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  call?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_signed?: InputMaybe<Scalars['Boolean']['input']>;
  module?: InputMaybe<Scalars['String']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  tx_hash?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "dictionary.spec_versions" */
export type Dictionary_Spec_Versions = {
  __typename?: 'dictionary_spec_versions';
  block_height: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dictionary.spec_versions". All fields are combined with a logical 'AND'. */
export type Dictionary_Spec_Versions_Bool_Exp = {
  _and?: InputMaybe<Array<Dictionary_Spec_Versions_Bool_Exp>>;
  _not?: InputMaybe<Dictionary_Spec_Versions_Bool_Exp>;
  _or?: InputMaybe<Array<Dictionary_Spec_Versions_Bool_Exp>>;
  block_height?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dictionary.spec_versions". */
export type Dictionary_Spec_Versions_Order_By = {
  block_height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "dictionary.spec_versions" */
export enum Dictionary_Spec_Versions_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "dictionary_spec_versions" */
export type Dictionary_Spec_Versions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dictionary_Spec_Versions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dictionary_Spec_Versions_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "leaderboard.account_extrinsic_failed_total_counts" */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_extrinsic_failed_total_counts" */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts>;
};

/** aggregate fields of "leaderboard.account_extrinsic_failed_total_counts" */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_extrinsic_failed_total_counts" */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_extrinsic_failed_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_extrinsic_failed_total_counts". */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_extrinsic_failed_total_counts" */
export enum Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_extrinsic_failed_total_counts" */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Extrinsic_Failed_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_account_extrinsic_failed_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_extrinsic_success_total_counts" */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_extrinsic_success_total_counts" */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Extrinsic_Success_Total_Counts>;
};

/** aggregate fields of "leaderboard.account_extrinsic_success_total_counts" */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_extrinsic_success_total_counts" */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_extrinsic_success_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_extrinsic_success_total_counts". */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_extrinsic_success_total_counts" */
export enum Leaderboard_Account_Extrinsic_Success_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_extrinsic_success_total_counts" */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Extrinsic_Success_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Extrinsic_Success_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_account_extrinsic_success_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_extrinsic_total_counts" */
export type Leaderboard_Account_Extrinsic_Total_Counts = {
  __typename?: 'leaderboard_account_extrinsic_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_extrinsic_total_counts" */
export type Leaderboard_Account_Extrinsic_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Extrinsic_Total_Counts>;
};

/** aggregate fields of "leaderboard.account_extrinsic_total_counts" */
export type Leaderboard_Account_Extrinsic_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_extrinsic_total_counts" */
export type Leaderboard_Account_Extrinsic_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_extrinsic_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_extrinsic_total_counts". */
export type Leaderboard_Account_Extrinsic_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_extrinsic_total_counts" */
export enum Leaderboard_Account_Extrinsic_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_extrinsic_total_counts" */
export type Leaderboard_Account_Extrinsic_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Extrinsic_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Extrinsic_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Extrinsic_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_account_extrinsic_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_remark_counts" */
export type Leaderboard_Account_Remark_Counts = {
  __typename?: 'leaderboard_account_remark_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_remark_counts" */
export type Leaderboard_Account_Remark_Counts_Aggregate = {
  __typename?: 'leaderboard_account_remark_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Remark_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Remark_Counts>;
};

/** aggregate fields of "leaderboard.account_remark_counts" */
export type Leaderboard_Account_Remark_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_account_remark_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Remark_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Remark_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Remark_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Remark_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Remark_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Remark_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Remark_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Remark_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Remark_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Remark_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_remark_counts" */
export type Leaderboard_Account_Remark_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Remark_Counts_Avg_Fields = {
  __typename?: 'leaderboard_account_remark_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_remark_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Remark_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Remark_Counts_Max_Fields = {
  __typename?: 'leaderboard_account_remark_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Remark_Counts_Min_Fields = {
  __typename?: 'leaderboard_account_remark_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_remark_counts". */
export type Leaderboard_Account_Remark_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_remark_counts" */
export enum Leaderboard_Account_Remark_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Remark_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_account_remark_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Remark_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_remark_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Remark_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_remark_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_remark_counts" */
export type Leaderboard_Account_Remark_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Remark_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Remark_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Remark_Counts_Sum_Fields = {
  __typename?: 'leaderboard_account_remark_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Remark_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_remark_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Remark_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_remark_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Remark_Counts_Variance_Fields = {
  __typename?: 'leaderboard_account_remark_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_transaction_fee_paid_total_values" */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_transaction_fee_paid_total_values" */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Aggregate = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values>;
};

/** aggregate fields of "leaderboard.account_transaction_fee_paid_total_values" */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_transaction_fee_paid_total_values" */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_transaction_fee_paid_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_transaction_fee_paid_total_values". */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_transaction_fee_paid_total_values" */
export enum Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_transaction_fee_paid_total_values" */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_account_transaction_fee_paid_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_transfer_receiver_total_counts" */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_transfer_receiver_total_counts" */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Transfer_Receiver_Total_Counts>;
};

/** aggregate fields of "leaderboard.account_transfer_receiver_total_counts" */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_transfer_receiver_total_counts" */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_transfer_receiver_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_transfer_receiver_total_counts". */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_transfer_receiver_total_counts" */
export enum Leaderboard_Account_Transfer_Receiver_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_transfer_receiver_total_counts" */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Transfer_Receiver_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_transfer_receiver_total_values" */
export type Leaderboard_Account_Transfer_Receiver_Total_Values = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_transfer_receiver_total_values" */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Aggregate = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Transfer_Receiver_Total_Values>;
};

/** aggregate fields of "leaderboard.account_transfer_receiver_total_values" */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_transfer_receiver_total_values" */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_transfer_receiver_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_transfer_receiver_total_values". */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_transfer_receiver_total_values" */
export enum Leaderboard_Account_Transfer_Receiver_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_transfer_receiver_total_values" */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Transfer_Receiver_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Transfer_Receiver_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_account_transfer_receiver_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_transfer_sender_total_counts" */
export type Leaderboard_Account_Transfer_Sender_Total_Counts = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_transfer_sender_total_counts" */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Transfer_Sender_Total_Counts>;
};

/** aggregate fields of "leaderboard.account_transfer_sender_total_counts" */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_transfer_sender_total_counts" */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_transfer_sender_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_transfer_sender_total_counts". */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_transfer_sender_total_counts" */
export enum Leaderboard_Account_Transfer_Sender_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_transfer_sender_total_counts" */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Transfer_Sender_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.account_transfer_sender_total_values" */
export type Leaderboard_Account_Transfer_Sender_Total_Values = {
  __typename?: 'leaderboard_account_transfer_sender_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.account_transfer_sender_total_values" */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Aggregate = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Account_Transfer_Sender_Total_Values>;
};

/** aggregate fields of "leaderboard.account_transfer_sender_total_values" */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.account_transfer_sender_total_values" */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.account_transfer_sender_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.account_transfer_sender_total_values". */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.account_transfer_sender_total_values" */
export enum Leaderboard_Account_Transfer_Sender_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_account_transfer_sender_total_values" */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Account_Transfer_Sender_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Account_Transfer_Sender_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_account_transfer_sender_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.farmer_block_total_counts" */
export type Leaderboard_Farmer_Block_Total_Counts = {
  __typename?: 'leaderboard_farmer_block_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.farmer_block_total_counts" */
export type Leaderboard_Farmer_Block_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_farmer_block_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Farmer_Block_Total_Counts>;
};

/** aggregate fields of "leaderboard.farmer_block_total_counts" */
export type Leaderboard_Farmer_Block_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Farmer_Block_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.farmer_block_total_counts" */
export type Leaderboard_Farmer_Block_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.farmer_block_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Farmer_Block_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.farmer_block_total_counts". */
export type Leaderboard_Farmer_Block_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.farmer_block_total_counts" */
export enum Leaderboard_Farmer_Block_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_farmer_block_total_counts" */
export type Leaderboard_Farmer_Block_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Farmer_Block_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Farmer_Block_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Farmer_Block_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_farmer_block_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.farmer_block_total_values" */
export type Leaderboard_Farmer_Block_Total_Values = {
  __typename?: 'leaderboard_farmer_block_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.farmer_block_total_values" */
export type Leaderboard_Farmer_Block_Total_Values_Aggregate = {
  __typename?: 'leaderboard_farmer_block_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Farmer_Block_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Farmer_Block_Total_Values>;
};

/** aggregate fields of "leaderboard.farmer_block_total_values" */
export type Leaderboard_Farmer_Block_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Farmer_Block_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Farmer_Block_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Farmer_Block_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Farmer_Block_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Farmer_Block_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Farmer_Block_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Farmer_Block_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Farmer_Block_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Farmer_Block_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Farmer_Block_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.farmer_block_total_values" */
export type Leaderboard_Farmer_Block_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Farmer_Block_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.farmer_block_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Farmer_Block_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Farmer_Block_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Farmer_Block_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.farmer_block_total_values". */
export type Leaderboard_Farmer_Block_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.farmer_block_total_values" */
export enum Leaderboard_Farmer_Block_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Farmer_Block_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Farmer_Block_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Farmer_Block_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_farmer_block_total_values" */
export type Leaderboard_Farmer_Block_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Farmer_Block_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Farmer_Block_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Farmer_Block_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Farmer_Block_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Farmer_Block_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Farmer_Block_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_farmer_block_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.farmer_vote_and_block_total_counts" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.farmer_vote_and_block_total_counts" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts>;
};

/** aggregate fields of "leaderboard.farmer_vote_and_block_total_counts" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.farmer_vote_and_block_total_counts" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.farmer_vote_and_block_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.farmer_vote_and_block_total_counts". */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.farmer_vote_and_block_total_counts" */
export enum Leaderboard_Farmer_Vote_And_Block_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_farmer_vote_and_block_total_counts" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.farmer_vote_and_block_total_values" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.farmer_vote_and_block_total_values" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Aggregate = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Farmer_Vote_And_Block_Total_Values>;
};

/** aggregate fields of "leaderboard.farmer_vote_and_block_total_values" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.farmer_vote_and_block_total_values" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.farmer_vote_and_block_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.farmer_vote_and_block_total_values". */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.farmer_vote_and_block_total_values" */
export enum Leaderboard_Farmer_Vote_And_Block_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_farmer_vote_and_block_total_values" */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Farmer_Vote_And_Block_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Farmer_Vote_And_Block_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_farmer_vote_and_block_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.farmer_vote_total_counts" */
export type Leaderboard_Farmer_Vote_Total_Counts = {
  __typename?: 'leaderboard_farmer_vote_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.farmer_vote_total_counts" */
export type Leaderboard_Farmer_Vote_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_farmer_vote_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Farmer_Vote_Total_Counts>;
};

/** aggregate fields of "leaderboard.farmer_vote_total_counts" */
export type Leaderboard_Farmer_Vote_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Farmer_Vote_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.farmer_vote_total_counts" */
export type Leaderboard_Farmer_Vote_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.farmer_vote_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.farmer_vote_total_counts". */
export type Leaderboard_Farmer_Vote_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.farmer_vote_total_counts" */
export enum Leaderboard_Farmer_Vote_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_farmer_vote_total_counts" */
export type Leaderboard_Farmer_Vote_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Farmer_Vote_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Farmer_Vote_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Farmer_Vote_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.farmer_vote_total_values" */
export type Leaderboard_Farmer_Vote_Total_Values = {
  __typename?: 'leaderboard_farmer_vote_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.farmer_vote_total_values" */
export type Leaderboard_Farmer_Vote_Total_Values_Aggregate = {
  __typename?: 'leaderboard_farmer_vote_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Farmer_Vote_Total_Values>;
};

/** aggregate fields of "leaderboard.farmer_vote_total_values" */
export type Leaderboard_Farmer_Vote_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Farmer_Vote_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.farmer_vote_total_values" */
export type Leaderboard_Farmer_Vote_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.farmer_vote_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Farmer_Vote_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.farmer_vote_total_values". */
export type Leaderboard_Farmer_Vote_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.farmer_vote_total_values" */
export enum Leaderboard_Farmer_Vote_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_farmer_vote_total_values" */
export type Leaderboard_Farmer_Vote_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Farmer_Vote_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Farmer_Vote_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Farmer_Vote_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_farmer_vote_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.nominator_deposits_total_counts" */
export type Leaderboard_Nominator_Deposits_Total_Counts = {
  __typename?: 'leaderboard_nominator_deposits_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.nominator_deposits_total_counts" */
export type Leaderboard_Nominator_Deposits_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Nominator_Deposits_Total_Counts>;
};

/** aggregate fields of "leaderboard.nominator_deposits_total_counts" */
export type Leaderboard_Nominator_Deposits_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.nominator_deposits_total_counts" */
export type Leaderboard_Nominator_Deposits_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.nominator_deposits_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.nominator_deposits_total_counts". */
export type Leaderboard_Nominator_Deposits_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.nominator_deposits_total_counts" */
export enum Leaderboard_Nominator_Deposits_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_nominator_deposits_total_counts" */
export type Leaderboard_Nominator_Deposits_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Nominator_Deposits_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Nominator_Deposits_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Nominator_Deposits_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.nominator_deposits_total_values" */
export type Leaderboard_Nominator_Deposits_Total_Values = {
  __typename?: 'leaderboard_nominator_deposits_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.nominator_deposits_total_values" */
export type Leaderboard_Nominator_Deposits_Total_Values_Aggregate = {
  __typename?: 'leaderboard_nominator_deposits_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Nominator_Deposits_Total_Values>;
};

/** aggregate fields of "leaderboard.nominator_deposits_total_values" */
export type Leaderboard_Nominator_Deposits_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Nominator_Deposits_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.nominator_deposits_total_values" */
export type Leaderboard_Nominator_Deposits_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.nominator_deposits_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.nominator_deposits_total_values". */
export type Leaderboard_Nominator_Deposits_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.nominator_deposits_total_values" */
export enum Leaderboard_Nominator_Deposits_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_nominator_deposits_total_values" */
export type Leaderboard_Nominator_Deposits_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Nominator_Deposits_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Nominator_Deposits_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Nominator_Deposits_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_nominator_deposits_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.nominator_withdrawals_total_counts" */
export type Leaderboard_Nominator_Withdrawals_Total_Counts = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.nominator_withdrawals_total_counts" */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Nominator_Withdrawals_Total_Counts>;
};

/** aggregate fields of "leaderboard.nominator_withdrawals_total_counts" */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.nominator_withdrawals_total_counts" */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.nominator_withdrawals_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.nominator_withdrawals_total_counts". */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.nominator_withdrawals_total_counts" */
export enum Leaderboard_Nominator_Withdrawals_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_nominator_withdrawals_total_counts" */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Nominator_Withdrawals_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Nominator_Withdrawals_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_nominator_withdrawals_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.operator_bundle_total_counts" */
export type Leaderboard_Operator_Bundle_Total_Counts = {
  __typename?: 'leaderboard_operator_bundle_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.operator_bundle_total_counts" */
export type Leaderboard_Operator_Bundle_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_operator_bundle_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Operator_Bundle_Total_Counts>;
};

/** aggregate fields of "leaderboard.operator_bundle_total_counts" */
export type Leaderboard_Operator_Bundle_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Operator_Bundle_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.operator_bundle_total_counts" */
export type Leaderboard_Operator_Bundle_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.operator_bundle_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.operator_bundle_total_counts". */
export type Leaderboard_Operator_Bundle_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.operator_bundle_total_counts" */
export enum Leaderboard_Operator_Bundle_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_operator_bundle_total_counts" */
export type Leaderboard_Operator_Bundle_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Operator_Bundle_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Operator_Bundle_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Operator_Bundle_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_operator_bundle_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.operator_deposits_total_counts" */
export type Leaderboard_Operator_Deposits_Total_Counts = {
  __typename?: 'leaderboard_operator_deposits_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.operator_deposits_total_counts" */
export type Leaderboard_Operator_Deposits_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_operator_deposits_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Operator_Deposits_Total_Counts>;
};

/** aggregate fields of "leaderboard.operator_deposits_total_counts" */
export type Leaderboard_Operator_Deposits_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Operator_Deposits_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.operator_deposits_total_counts" */
export type Leaderboard_Operator_Deposits_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.operator_deposits_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.operator_deposits_total_counts". */
export type Leaderboard_Operator_Deposits_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.operator_deposits_total_counts" */
export enum Leaderboard_Operator_Deposits_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_operator_deposits_total_counts" */
export type Leaderboard_Operator_Deposits_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Operator_Deposits_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Operator_Deposits_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Operator_Deposits_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.operator_deposits_total_values" */
export type Leaderboard_Operator_Deposits_Total_Values = {
  __typename?: 'leaderboard_operator_deposits_total_values';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.operator_deposits_total_values" */
export type Leaderboard_Operator_Deposits_Total_Values_Aggregate = {
  __typename?: 'leaderboard_operator_deposits_total_values_aggregate';
  aggregate?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Aggregate_Fields>;
  nodes: Array<Leaderboard_Operator_Deposits_Total_Values>;
};

/** aggregate fields of "leaderboard.operator_deposits_total_values" */
export type Leaderboard_Operator_Deposits_Total_Values_Aggregate_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_aggregate_fields';
  avg?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Max_Fields>;
  min?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Min_Fields>;
  stddev?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Operator_Deposits_Total_Values_Variance_Fields>;
};


/** aggregate fields of "leaderboard.operator_deposits_total_values" */
export type Leaderboard_Operator_Deposits_Total_Values_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Avg_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.operator_deposits_total_values". All fields are combined with a logical 'AND'. */
export type Leaderboard_Operator_Deposits_Total_Values_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Max_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Min_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.operator_deposits_total_values". */
export type Leaderboard_Operator_Deposits_Total_Values_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.operator_deposits_total_values" */
export enum Leaderboard_Operator_Deposits_Total_Values_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Stddev_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_operator_deposits_total_values" */
export type Leaderboard_Operator_Deposits_Total_Values_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Operator_Deposits_Total_Values_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Operator_Deposits_Total_Values_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Sum_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Var_Pop_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Var_Samp_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Operator_Deposits_Total_Values_Variance_Fields = {
  __typename?: 'leaderboard_operator_deposits_total_values_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.operator_total_rewards_collecteds" */
export type Leaderboard_Operator_Total_Rewards_Collecteds = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.operator_total_rewards_collecteds" */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Aggregate = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_aggregate';
  aggregate?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Aggregate_Fields>;
  nodes: Array<Leaderboard_Operator_Total_Rewards_Collecteds>;
};

/** aggregate fields of "leaderboard.operator_total_rewards_collecteds" */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Aggregate_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_aggregate_fields';
  avg?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Max_Fields>;
  min?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Min_Fields>;
  stddev?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds_Variance_Fields>;
};


/** aggregate fields of "leaderboard.operator_total_rewards_collecteds" */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Avg_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.operator_total_rewards_collecteds". All fields are combined with a logical 'AND'. */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Max_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Min_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.operator_total_rewards_collecteds". */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.operator_total_rewards_collecteds" */
export enum Leaderboard_Operator_Total_Rewards_Collecteds_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Stddev_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_operator_total_rewards_collecteds" */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Operator_Total_Rewards_Collecteds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Sum_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Var_Pop_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Var_Samp_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Operator_Total_Rewards_Collecteds_Variance_Fields = {
  __typename?: 'leaderboard_operator_total_rewards_collecteds_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.operator_total_tax_collecteds" */
export type Leaderboard_Operator_Total_Tax_Collecteds = {
  __typename?: 'leaderboard_operator_total_tax_collecteds';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.operator_total_tax_collecteds" */
export type Leaderboard_Operator_Total_Tax_Collecteds_Aggregate = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_aggregate';
  aggregate?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Aggregate_Fields>;
  nodes: Array<Leaderboard_Operator_Total_Tax_Collecteds>;
};

/** aggregate fields of "leaderboard.operator_total_tax_collecteds" */
export type Leaderboard_Operator_Total_Tax_Collecteds_Aggregate_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_aggregate_fields';
  avg?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Max_Fields>;
  min?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Min_Fields>;
  stddev?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds_Variance_Fields>;
};


/** aggregate fields of "leaderboard.operator_total_tax_collecteds" */
export type Leaderboard_Operator_Total_Tax_Collecteds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Avg_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.operator_total_tax_collecteds". All fields are combined with a logical 'AND'. */
export type Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Max_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Min_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.operator_total_tax_collecteds". */
export type Leaderboard_Operator_Total_Tax_Collecteds_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.operator_total_tax_collecteds" */
export enum Leaderboard_Operator_Total_Tax_Collecteds_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Stddev_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_operator_total_tax_collecteds" */
export type Leaderboard_Operator_Total_Tax_Collecteds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Operator_Total_Tax_Collecteds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Operator_Total_Tax_Collecteds_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Sum_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Var_Pop_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Var_Samp_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Operator_Total_Tax_Collecteds_Variance_Fields = {
  __typename?: 'leaderboard_operator_total_tax_collecteds_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "leaderboard.operator_withdrawals_total_counts" */
export type Leaderboard_Operator_Withdrawals_Total_Counts = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamp']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "leaderboard.operator_withdrawals_total_counts" */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Aggregate = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_aggregate';
  aggregate?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Aggregate_Fields>;
  nodes: Array<Leaderboard_Operator_Withdrawals_Total_Counts>;
};

/** aggregate fields of "leaderboard.operator_withdrawals_total_counts" */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Aggregate_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_aggregate_fields';
  avg?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Max_Fields>;
  min?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Min_Fields>;
  stddev?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Stddev_Fields>;
  stddev_pop?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Stddev_Samp_Fields>;
  sum?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Sum_Fields>;
  var_pop?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Var_Pop_Fields>;
  var_samp?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Var_Samp_Fields>;
  variance?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts_Variance_Fields>;
};


/** aggregate fields of "leaderboard.operator_withdrawals_total_counts" */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Avg_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "leaderboard.operator_withdrawals_total_counts". All fields are combined with a logical 'AND'. */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp = {
  _and?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>>;
  _not?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
  _or?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamp_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Max_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Min_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamp']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "leaderboard.operator_withdrawals_total_counts". */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "leaderboard.operator_withdrawals_total_counts" */
export enum Leaderboard_Operator_Withdrawals_Total_Counts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastContributionAt = 'last_contribution_at',
  /** column name */
  Rank = 'rank',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate stddev on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Stddev_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Stddev_Pop_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Stddev_Samp_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "leaderboard_operator_withdrawals_total_counts" */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Leaderboard_Operator_Withdrawals_Total_Counts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamp']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Sum_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Var_Pop_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Var_Samp_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Leaderboard_Operator_Withdrawals_Total_Counts_Variance_Fields = {
  __typename?: 'leaderboard_operator_withdrawals_total_counts_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "accounts.accounts" */
  accounts_accounts: Array<Accounts_Accounts>;
  /** fetch aggregated fields from the table: "accounts.accounts" */
  accounts_accounts_aggregate: Accounts_Accounts_Aggregate;
  /** fetch data from the table: "accounts.accounts" using primary key columns */
  accounts_accounts_by_pk?: Maybe<Accounts_Accounts>;
  /** fetch data from the table: "accounts.balance_histories" */
  accounts_balance_histories: Array<Accounts_Balance_Histories>;
  /** fetch aggregated fields from the table: "accounts.balance_histories" */
  accounts_balance_histories_aggregate: Accounts_Balance_Histories_Aggregate;
  /** fetch data from the table: "accounts.balance_histories" using primary key columns */
  accounts_balance_histories_by_pk?: Maybe<Accounts_Balance_Histories>;
  /** fetch data from the table: "accounts.rewards" */
  accounts_rewards: Array<Accounts_Rewards>;
  /** fetch aggregated fields from the table: "accounts.rewards" */
  accounts_rewards_aggregate: Accounts_Rewards_Aggregate;
  /** fetch data from the table: "accounts.rewards" using primary key columns */
  accounts_rewards_by_pk?: Maybe<Accounts_Rewards>;
  /** fetch data from the table: "accounts.transfers" */
  accounts_transfers: Array<Accounts_Transfers>;
  /** fetch aggregated fields from the table: "accounts.transfers" */
  accounts_transfers_aggregate: Accounts_Transfers_Aggregate;
  /** fetch data from the table: "accounts.transfers" using primary key columns */
  accounts_transfers_by_pk?: Maybe<Accounts_Transfers>;
  /** fetch data from the table: "consensus.blocks" */
  consensus_blocks: Array<Consensus_Blocks>;
  /** fetch aggregated fields from the table: "consensus.blocks" */
  consensus_blocks_aggregate: Consensus_Blocks_Aggregate;
  /** fetch data from the table: "consensus.blocks" using primary key columns */
  consensus_blocks_by_pk?: Maybe<Consensus_Blocks>;
  /** fetch data from the table: "consensus.event_modules" */
  consensus_event_modules: Array<Consensus_Event_Modules>;
  /** fetch aggregated fields from the table: "consensus.event_modules" */
  consensus_event_modules_aggregate: Consensus_Event_Modules_Aggregate;
  /** fetch data from the table: "consensus.event_modules" using primary key columns */
  consensus_event_modules_by_pk?: Maybe<Consensus_Event_Modules>;
  /** fetch data from the table: "consensus.events" */
  consensus_events: Array<Consensus_Events>;
  /** fetch aggregated fields from the table: "consensus.events" */
  consensus_events_aggregate: Consensus_Events_Aggregate;
  /** fetch data from the table: "consensus.events" using primary key columns */
  consensus_events_by_pk?: Maybe<Consensus_Events>;
  /** fetch data from the table: "consensus.extrinsic_modules" */
  consensus_extrinsic_modules: Array<Consensus_Extrinsic_Modules>;
  /** fetch aggregated fields from the table: "consensus.extrinsic_modules" */
  consensus_extrinsic_modules_aggregate: Consensus_Extrinsic_Modules_Aggregate;
  /** fetch data from the table: "consensus.extrinsic_modules" using primary key columns */
  consensus_extrinsic_modules_by_pk?: Maybe<Consensus_Extrinsic_Modules>;
  /** fetch data from the table: "consensus.extrinsics" */
  consensus_extrinsics: Array<Consensus_Extrinsics>;
  /** fetch aggregated fields from the table: "consensus.extrinsics" */
  consensus_extrinsics_aggregate: Consensus_Extrinsics_Aggregate;
  /** fetch data from the table: "consensus.extrinsics" using primary key columns */
  consensus_extrinsics_by_pk?: Maybe<Consensus_Extrinsics>;
  /** fetch data from the table: "consensus.log_kinds" */
  consensus_log_kinds: Array<Consensus_Log_Kinds>;
  /** fetch aggregated fields from the table: "consensus.log_kinds" */
  consensus_log_kinds_aggregate: Consensus_Log_Kinds_Aggregate;
  /** fetch data from the table: "consensus.log_kinds" using primary key columns */
  consensus_log_kinds_by_pk?: Maybe<Consensus_Log_Kinds>;
  /** fetch data from the table: "consensus.logs" */
  consensus_logs: Array<Consensus_Logs>;
  /** fetch aggregated fields from the table: "consensus.logs" */
  consensus_logs_aggregate: Consensus_Logs_Aggregate;
  /** fetch data from the table: "consensus.logs" using primary key columns */
  consensus_logs_by_pk?: Maybe<Consensus_Logs>;
  /** fetch data from the table: "consensus.sections" */
  consensus_sections: Array<Consensus_Sections>;
  /** fetch aggregated fields from the table: "consensus.sections" */
  consensus_sections_aggregate: Consensus_Sections_Aggregate;
  /** fetch data from the table: "consensus.sections" using primary key columns */
  consensus_sections_by_pk?: Maybe<Consensus_Sections>;
  /** fetch data from the table: "dictionary.events" */
  dictionary_events: Array<Dictionary_Events>;
  /** fetch data from the table: "dictionary.events" using primary key columns */
  dictionary_events_by_pk?: Maybe<Dictionary_Events>;
  /** fetch data from the table: "dictionary.extrinsics" */
  dictionary_extrinsics: Array<Dictionary_Extrinsics>;
  /** fetch data from the table: "dictionary.extrinsics" using primary key columns */
  dictionary_extrinsics_by_pk?: Maybe<Dictionary_Extrinsics>;
  /** fetch data from the table: "dictionary.spec_versions" */
  dictionary_spec_versions: Array<Dictionary_Spec_Versions>;
  /** fetch data from the table: "dictionary.spec_versions" using primary key columns */
  dictionary_spec_versions_by_pk?: Maybe<Dictionary_Spec_Versions>;
  /** fetch data from the table: "leaderboard.account_extrinsic_failed_total_counts" */
  leaderboard_account_extrinsic_failed_total_counts: Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_extrinsic_failed_total_counts" */
  leaderboard_account_extrinsic_failed_total_counts_aggregate: Leaderboard_Account_Extrinsic_Failed_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_extrinsic_failed_total_counts" using primary key columns */
  leaderboard_account_extrinsic_failed_total_counts_by_pk?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_extrinsic_success_total_counts" */
  leaderboard_account_extrinsic_success_total_counts: Array<Leaderboard_Account_Extrinsic_Success_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_extrinsic_success_total_counts" */
  leaderboard_account_extrinsic_success_total_counts_aggregate: Leaderboard_Account_Extrinsic_Success_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_extrinsic_success_total_counts" using primary key columns */
  leaderboard_account_extrinsic_success_total_counts_by_pk?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_extrinsic_total_counts" */
  leaderboard_account_extrinsic_total_counts: Array<Leaderboard_Account_Extrinsic_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_extrinsic_total_counts" */
  leaderboard_account_extrinsic_total_counts_aggregate: Leaderboard_Account_Extrinsic_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_extrinsic_total_counts" using primary key columns */
  leaderboard_account_extrinsic_total_counts_by_pk?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_remark_counts" */
  leaderboard_account_remark_counts: Array<Leaderboard_Account_Remark_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_remark_counts" */
  leaderboard_account_remark_counts_aggregate: Leaderboard_Account_Remark_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_remark_counts" using primary key columns */
  leaderboard_account_remark_counts_by_pk?: Maybe<Leaderboard_Account_Remark_Counts>;
  /** fetch data from the table: "leaderboard.account_transaction_fee_paid_total_values" */
  leaderboard_account_transaction_fee_paid_total_values: Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.account_transaction_fee_paid_total_values" */
  leaderboard_account_transaction_fee_paid_total_values_aggregate: Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.account_transaction_fee_paid_total_values" using primary key columns */
  leaderboard_account_transaction_fee_paid_total_values_by_pk?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values>;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_counts" */
  leaderboard_account_transfer_receiver_total_counts: Array<Leaderboard_Account_Transfer_Receiver_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_receiver_total_counts" */
  leaderboard_account_transfer_receiver_total_counts_aggregate: Leaderboard_Account_Transfer_Receiver_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_counts" using primary key columns */
  leaderboard_account_transfer_receiver_total_counts_by_pk?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_values" */
  leaderboard_account_transfer_receiver_total_values: Array<Leaderboard_Account_Transfer_Receiver_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_receiver_total_values" */
  leaderboard_account_transfer_receiver_total_values_aggregate: Leaderboard_Account_Transfer_Receiver_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_values" using primary key columns */
  leaderboard_account_transfer_receiver_total_values_by_pk?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values>;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_counts" */
  leaderboard_account_transfer_sender_total_counts: Array<Leaderboard_Account_Transfer_Sender_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_sender_total_counts" */
  leaderboard_account_transfer_sender_total_counts_aggregate: Leaderboard_Account_Transfer_Sender_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_counts" using primary key columns */
  leaderboard_account_transfer_sender_total_counts_by_pk?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_values" */
  leaderboard_account_transfer_sender_total_values: Array<Leaderboard_Account_Transfer_Sender_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_sender_total_values" */
  leaderboard_account_transfer_sender_total_values_aggregate: Leaderboard_Account_Transfer_Sender_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_values" using primary key columns */
  leaderboard_account_transfer_sender_total_values_by_pk?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values>;
  /** fetch data from the table: "leaderboard.farmer_block_total_counts" */
  leaderboard_farmer_block_total_counts: Array<Leaderboard_Farmer_Block_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_block_total_counts" */
  leaderboard_farmer_block_total_counts_aggregate: Leaderboard_Farmer_Block_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_block_total_counts" using primary key columns */
  leaderboard_farmer_block_total_counts_by_pk?: Maybe<Leaderboard_Farmer_Block_Total_Counts>;
  /** fetch data from the table: "leaderboard.farmer_block_total_values" */
  leaderboard_farmer_block_total_values: Array<Leaderboard_Farmer_Block_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_block_total_values" */
  leaderboard_farmer_block_total_values_aggregate: Leaderboard_Farmer_Block_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_block_total_values" using primary key columns */
  leaderboard_farmer_block_total_values_by_pk?: Maybe<Leaderboard_Farmer_Block_Total_Values>;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_counts" */
  leaderboard_farmer_vote_and_block_total_counts: Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_and_block_total_counts" */
  leaderboard_farmer_vote_and_block_total_counts_aggregate: Leaderboard_Farmer_Vote_And_Block_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_counts" using primary key columns */
  leaderboard_farmer_vote_and_block_total_counts_by_pk?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts>;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_values" */
  leaderboard_farmer_vote_and_block_total_values: Array<Leaderboard_Farmer_Vote_And_Block_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_and_block_total_values" */
  leaderboard_farmer_vote_and_block_total_values_aggregate: Leaderboard_Farmer_Vote_And_Block_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_values" using primary key columns */
  leaderboard_farmer_vote_and_block_total_values_by_pk?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values>;
  /** fetch data from the table: "leaderboard.farmer_vote_total_counts" */
  leaderboard_farmer_vote_total_counts: Array<Leaderboard_Farmer_Vote_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_total_counts" */
  leaderboard_farmer_vote_total_counts_aggregate: Leaderboard_Farmer_Vote_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_total_counts" using primary key columns */
  leaderboard_farmer_vote_total_counts_by_pk?: Maybe<Leaderboard_Farmer_Vote_Total_Counts>;
  /** fetch data from the table: "leaderboard.farmer_vote_total_values" */
  leaderboard_farmer_vote_total_values: Array<Leaderboard_Farmer_Vote_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_total_values" */
  leaderboard_farmer_vote_total_values_aggregate: Leaderboard_Farmer_Vote_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_total_values" using primary key columns */
  leaderboard_farmer_vote_total_values_by_pk?: Maybe<Leaderboard_Farmer_Vote_Total_Values>;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_counts" */
  leaderboard_nominator_deposits_total_counts: Array<Leaderboard_Nominator_Deposits_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.nominator_deposits_total_counts" */
  leaderboard_nominator_deposits_total_counts_aggregate: Leaderboard_Nominator_Deposits_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_counts" using primary key columns */
  leaderboard_nominator_deposits_total_counts_by_pk?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts>;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_values" */
  leaderboard_nominator_deposits_total_values: Array<Leaderboard_Nominator_Deposits_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.nominator_deposits_total_values" */
  leaderboard_nominator_deposits_total_values_aggregate: Leaderboard_Nominator_Deposits_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_values" using primary key columns */
  leaderboard_nominator_deposits_total_values_by_pk?: Maybe<Leaderboard_Nominator_Deposits_Total_Values>;
  /** fetch data from the table: "leaderboard.nominator_withdrawals_total_counts" */
  leaderboard_nominator_withdrawals_total_counts: Array<Leaderboard_Nominator_Withdrawals_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.nominator_withdrawals_total_counts" */
  leaderboard_nominator_withdrawals_total_counts_aggregate: Leaderboard_Nominator_Withdrawals_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.nominator_withdrawals_total_counts" using primary key columns */
  leaderboard_nominator_withdrawals_total_counts_by_pk?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts>;
  /** fetch data from the table: "leaderboard.operator_bundle_total_counts" */
  leaderboard_operator_bundle_total_counts: Array<Leaderboard_Operator_Bundle_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.operator_bundle_total_counts" */
  leaderboard_operator_bundle_total_counts_aggregate: Leaderboard_Operator_Bundle_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.operator_bundle_total_counts" using primary key columns */
  leaderboard_operator_bundle_total_counts_by_pk?: Maybe<Leaderboard_Operator_Bundle_Total_Counts>;
  /** fetch data from the table: "leaderboard.operator_deposits_total_counts" */
  leaderboard_operator_deposits_total_counts: Array<Leaderboard_Operator_Deposits_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.operator_deposits_total_counts" */
  leaderboard_operator_deposits_total_counts_aggregate: Leaderboard_Operator_Deposits_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.operator_deposits_total_counts" using primary key columns */
  leaderboard_operator_deposits_total_counts_by_pk?: Maybe<Leaderboard_Operator_Deposits_Total_Counts>;
  /** fetch data from the table: "leaderboard.operator_deposits_total_values" */
  leaderboard_operator_deposits_total_values: Array<Leaderboard_Operator_Deposits_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.operator_deposits_total_values" */
  leaderboard_operator_deposits_total_values_aggregate: Leaderboard_Operator_Deposits_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.operator_deposits_total_values" using primary key columns */
  leaderboard_operator_deposits_total_values_by_pk?: Maybe<Leaderboard_Operator_Deposits_Total_Values>;
  /** fetch data from the table: "leaderboard.operator_total_rewards_collecteds" */
  leaderboard_operator_total_rewards_collecteds: Array<Leaderboard_Operator_Total_Rewards_Collecteds>;
  /** fetch aggregated fields from the table: "leaderboard.operator_total_rewards_collecteds" */
  leaderboard_operator_total_rewards_collecteds_aggregate: Leaderboard_Operator_Total_Rewards_Collecteds_Aggregate;
  /** fetch data from the table: "leaderboard.operator_total_rewards_collecteds" using primary key columns */
  leaderboard_operator_total_rewards_collecteds_by_pk?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds>;
  /** fetch data from the table: "leaderboard.operator_total_tax_collecteds" */
  leaderboard_operator_total_tax_collecteds: Array<Leaderboard_Operator_Total_Tax_Collecteds>;
  /** fetch aggregated fields from the table: "leaderboard.operator_total_tax_collecteds" */
  leaderboard_operator_total_tax_collecteds_aggregate: Leaderboard_Operator_Total_Tax_Collecteds_Aggregate;
  /** fetch data from the table: "leaderboard.operator_total_tax_collecteds" using primary key columns */
  leaderboard_operator_total_tax_collecteds_by_pk?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds>;
  /** fetch data from the table: "leaderboard.operator_withdrawals_total_counts" */
  leaderboard_operator_withdrawals_total_counts: Array<Leaderboard_Operator_Withdrawals_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.operator_withdrawals_total_counts" */
  leaderboard_operator_withdrawals_total_counts_aggregate: Leaderboard_Operator_Withdrawals_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.operator_withdrawals_total_counts" using primary key columns */
  leaderboard_operator_withdrawals_total_counts_by_pk?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts>;
  /** fetch data from the table: "staking.accounts" */
  staking_accounts: Array<Staking_Accounts>;
  /** fetch aggregated fields from the table: "staking.accounts" */
  staking_accounts_aggregate: Staking_Accounts_Aggregate;
  /** fetch data from the table: "staking.accounts" using primary key columns */
  staking_accounts_by_pk?: Maybe<Staking_Accounts>;
  /** fetch data from the table: "staking.deposits" */
  staking_deposits: Array<Staking_Deposits>;
  /** fetch aggregated fields from the table: "staking.deposits" */
  staking_deposits_aggregate: Staking_Deposits_Aggregate;
  /** fetch data from the table: "staking.deposits" using primary key columns */
  staking_deposits_by_pk?: Maybe<Staking_Deposits>;
  /** fetch data from the table: "staking.domains" */
  staking_domains: Array<Staking_Domains>;
  /** fetch aggregated fields from the table: "staking.domains" */
  staking_domains_aggregate: Staking_Domains_Aggregate;
  /** fetch data from the table: "staking.domains" using primary key columns */
  staking_domains_by_pk?: Maybe<Staking_Domains>;
  /** fetch data from the table: "staking.nominators" */
  staking_nominators: Array<Staking_Nominators>;
  /** fetch aggregated fields from the table: "staking.nominators" */
  staking_nominators_aggregate: Staking_Nominators_Aggregate;
  /** fetch data from the table: "staking.nominators" using primary key columns */
  staking_nominators_by_pk?: Maybe<Staking_Nominators>;
  /** fetch data from the table: "staking.operators" */
  staking_operators: Array<Staking_Operators>;
  /** fetch aggregated fields from the table: "staking.operators" */
  staking_operators_aggregate: Staking_Operators_Aggregate;
  /** fetch data from the table: "staking.operators" using primary key columns */
  staking_operators_by_pk?: Maybe<Staking_Operators>;
  /** fetch data from the table: "staking.withdrawals" */
  staking_withdrawals: Array<Staking_Withdrawals>;
  /** fetch aggregated fields from the table: "staking.withdrawals" */
  staking_withdrawals_aggregate: Staking_Withdrawals_Aggregate;
  /** fetch data from the table: "staking.withdrawals" using primary key columns */
  staking_withdrawals_by_pk?: Maybe<Staking_Withdrawals>;
};


export type Query_RootAccounts_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Accounts_Bool_Exp>;
};


export type Query_RootAccounts_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Accounts_Bool_Exp>;
};


export type Query_RootAccounts_Accounts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccounts_Balance_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Balance_Histories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Balance_Histories_Order_By>>;
  where?: InputMaybe<Accounts_Balance_Histories_Bool_Exp>;
};


export type Query_RootAccounts_Balance_Histories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Balance_Histories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Balance_Histories_Order_By>>;
  where?: InputMaybe<Accounts_Balance_Histories_Bool_Exp>;
};


export type Query_RootAccounts_Balance_Histories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccounts_RewardsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Rewards_Order_By>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};


export type Query_RootAccounts_Rewards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Rewards_Order_By>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};


export type Query_RootAccounts_Rewards_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccounts_TransfersArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Transfers_Order_By>>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
};


export type Query_RootAccounts_Transfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Transfers_Order_By>>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
};


export type Query_RootAccounts_Transfers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_BlocksArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Blocks_Order_By>>;
  where?: InputMaybe<Consensus_Blocks_Bool_Exp>;
};


export type Query_RootConsensus_Blocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Blocks_Order_By>>;
  where?: InputMaybe<Consensus_Blocks_Bool_Exp>;
};


export type Query_RootConsensus_Blocks_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_Event_ModulesArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Event_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


export type Query_RootConsensus_Event_Modules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Event_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


export type Query_RootConsensus_Event_Modules_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_EventsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


export type Query_RootConsensus_Events_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


export type Query_RootConsensus_Events_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_Extrinsic_ModulesArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsic_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};


export type Query_RootConsensus_Extrinsic_Modules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsic_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};


export type Query_RootConsensus_Extrinsic_Modules_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_ExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


export type Query_RootConsensus_Extrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


export type Query_RootConsensus_Extrinsics_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_Log_KindsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Log_Kinds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Log_Kinds_Order_By>>;
  where?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
};


export type Query_RootConsensus_Log_Kinds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Log_Kinds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Log_Kinds_Order_By>>;
  where?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
};


export type Query_RootConsensus_Log_Kinds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_LogsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


export type Query_RootConsensus_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


export type Query_RootConsensus_Logs_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootConsensus_SectionsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Sections_Order_By>>;
  where?: InputMaybe<Consensus_Sections_Bool_Exp>;
};


export type Query_RootConsensus_Sections_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Sections_Order_By>>;
  where?: InputMaybe<Consensus_Sections_Bool_Exp>;
};


export type Query_RootConsensus_Sections_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDictionary_EventsArgs = {
  distinct_on?: InputMaybe<Array<Dictionary_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dictionary_Events_Order_By>>;
  where?: InputMaybe<Dictionary_Events_Bool_Exp>;
};


export type Query_RootDictionary_Events_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDictionary_ExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Dictionary_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dictionary_Extrinsics_Order_By>>;
  where?: InputMaybe<Dictionary_Extrinsics_Bool_Exp>;
};


export type Query_RootDictionary_Extrinsics_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDictionary_Spec_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Dictionary_Spec_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dictionary_Spec_Versions_Order_By>>;
  where?: InputMaybe<Dictionary_Spec_Versions_Bool_Exp>;
};


export type Query_RootDictionary_Spec_Versions_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Extrinsic_Failed_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Extrinsic_Failed_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Extrinsic_Failed_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Extrinsic_Success_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Extrinsic_Success_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Extrinsic_Success_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Extrinsic_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Extrinsic_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Extrinsic_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Remark_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Remark_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Remark_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Transaction_Fee_Paid_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transaction_Fee_Paid_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transaction_Fee_Paid_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Transfer_Receiver_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Receiver_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Receiver_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Transfer_Receiver_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Receiver_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Receiver_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Transfer_Sender_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Sender_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Sender_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Account_Transfer_Sender_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Sender_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Account_Transfer_Sender_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Farmer_Block_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Block_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Block_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Farmer_Block_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Block_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Block_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Farmer_Vote_And_Block_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_And_Block_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_And_Block_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Farmer_Vote_And_Block_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_And_Block_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_And_Block_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Farmer_Vote_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Farmer_Vote_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Farmer_Vote_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Nominator_Deposits_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Nominator_Deposits_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Nominator_Deposits_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Nominator_Deposits_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Nominator_Deposits_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Nominator_Deposits_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Nominator_Withdrawals_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Nominator_Withdrawals_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Nominator_Withdrawals_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Operator_Bundle_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Bundle_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Bundle_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Operator_Deposits_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Deposits_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Deposits_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Operator_Deposits_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Deposits_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Deposits_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Operator_Total_Rewards_CollectedsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Total_Rewards_Collecteds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Total_Rewards_Collecteds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Operator_Total_Tax_CollectedsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Total_Tax_Collecteds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Total_Tax_Collecteds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootLeaderboard_Operator_Withdrawals_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Withdrawals_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Query_RootLeaderboard_Operator_Withdrawals_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStaking_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Accounts_Order_By>>;
  where?: InputMaybe<Staking_Accounts_Bool_Exp>;
};


export type Query_RootStaking_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Accounts_Order_By>>;
  where?: InputMaybe<Staking_Accounts_Bool_Exp>;
};


export type Query_RootStaking_Accounts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStaking_DepositsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


export type Query_RootStaking_Deposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


export type Query_RootStaking_Deposits_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStaking_DomainsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Domains_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Domains_Order_By>>;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
};


export type Query_RootStaking_Domains_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Domains_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Domains_Order_By>>;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
};


export type Query_RootStaking_Domains_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStaking_NominatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


export type Query_RootStaking_Nominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


export type Query_RootStaking_Nominators_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStaking_OperatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Operators_Order_By>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


export type Query_RootStaking_Operators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Operators_Order_By>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


export type Query_RootStaking_Operators_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootStaking_WithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


export type Query_RootStaking_Withdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


export type Query_RootStaking_Withdrawals_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "staking.accounts" */
export type Staking_Accounts = {
  __typename?: 'staking_accounts';
  accumulated_epoch_shares: Scalars['numeric']['output'];
  accumulated_epoch_stake: Scalars['numeric']['output'];
  accumulated_epoch_storage_fee_deposit: Scalars['numeric']['output'];
  created_at: Scalars['numeric']['output'];
  current_share_price: Scalars['numeric']['output'];
  current_storage_fee_deposit: Scalars['numeric']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_estimated_withdrawals: Scalars['numeric']['output'];
  total_tax_collected: Scalars['numeric']['output'];
  total_withdrawals: Scalars['numeric']['output'];
  updated_at: Scalars['numeric']['output'];
};

/** aggregated selection of "staking.accounts" */
export type Staking_Accounts_Aggregate = {
  __typename?: 'staking_accounts_aggregate';
  aggregate?: Maybe<Staking_Accounts_Aggregate_Fields>;
  nodes: Array<Staking_Accounts>;
};

/** aggregate fields of "staking.accounts" */
export type Staking_Accounts_Aggregate_Fields = {
  __typename?: 'staking_accounts_aggregate_fields';
  avg?: Maybe<Staking_Accounts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Staking_Accounts_Max_Fields>;
  min?: Maybe<Staking_Accounts_Min_Fields>;
  stddev?: Maybe<Staking_Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Staking_Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Staking_Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Staking_Accounts_Sum_Fields>;
  var_pop?: Maybe<Staking_Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Staking_Accounts_Var_Samp_Fields>;
  variance?: Maybe<Staking_Accounts_Variance_Fields>;
};


/** aggregate fields of "staking.accounts" */
export type Staking_Accounts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Staking_Accounts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Staking_Accounts_Avg_Fields = {
  __typename?: 'staking_accounts_avg_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "staking.accounts". All fields are combined with a logical 'AND'. */
export type Staking_Accounts_Bool_Exp = {
  _and?: InputMaybe<Array<Staking_Accounts_Bool_Exp>>;
  _not?: InputMaybe<Staking_Accounts_Bool_Exp>;
  _or?: InputMaybe<Array<Staking_Accounts_Bool_Exp>>;
  accumulated_epoch_shares?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_stake?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  current_share_price?: InputMaybe<Numeric_Comparison_Exp>;
  current_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_estimated_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  total_tax_collected?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Staking_Accounts_Max_Fields = {
  __typename?: 'staking_accounts_max_fields';
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Staking_Accounts_Min_Fields = {
  __typename?: 'staking_accounts_min_fields';
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "staking.accounts". */
export type Staking_Accounts_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "staking.accounts" */
export enum Staking_Accounts_Select_Column {
  /** column name */
  AccumulatedEpochShares = 'accumulated_epoch_shares',
  /** column name */
  AccumulatedEpochStake = 'accumulated_epoch_stake',
  /** column name */
  AccumulatedEpochStorageFeeDeposit = 'accumulated_epoch_storage_fee_deposit',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentSharePrice = 'current_share_price',
  /** column name */
  CurrentStorageFeeDeposit = 'current_storage_fee_deposit',
  /** column name */
  CurrentTotalShares = 'current_total_shares',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  Id = 'id',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalEstimatedWithdrawals = 'total_estimated_withdrawals',
  /** column name */
  TotalTaxCollected = 'total_tax_collected',
  /** column name */
  TotalWithdrawals = 'total_withdrawals',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Staking_Accounts_Stddev_Fields = {
  __typename?: 'staking_accounts_stddev_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Staking_Accounts_Stddev_Pop_Fields = {
  __typename?: 'staking_accounts_stddev_pop_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Staking_Accounts_Stddev_Samp_Fields = {
  __typename?: 'staking_accounts_stddev_samp_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "staking_accounts" */
export type Staking_Accounts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Staking_Accounts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Staking_Accounts_Stream_Cursor_Value_Input = {
  accumulated_epoch_shares?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_stake?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  current_share_price?: InputMaybe<Scalars['numeric']['input']>;
  current_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_estimated_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  total_tax_collected?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Staking_Accounts_Sum_Fields = {
  __typename?: 'staking_accounts_sum_fields';
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Staking_Accounts_Var_Pop_Fields = {
  __typename?: 'staking_accounts_var_pop_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Staking_Accounts_Var_Samp_Fields = {
  __typename?: 'staking_accounts_var_samp_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Staking_Accounts_Variance_Fields = {
  __typename?: 'staking_accounts_variance_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "staking.deposits" */
export type Staking_Deposits = {
  __typename?: 'staking_deposits';
  /** An object relationship */
  account?: Maybe<Staking_Accounts>;
  account_id: Scalars['String']['output'];
  amount: Scalars['numeric']['output'];
  created_at: Scalars['numeric']['output'];
  /** An object relationship */
  domain?: Maybe<Staking_Domains>;
  domain_block_number_deposited_at: Scalars['numeric']['output'];
  domain_id: Scalars['String']['output'];
  epoch_deposited_at: Scalars['numeric']['output'];
  extrinsic_hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  nominator_id: Scalars['String']['output'];
  /** An object relationship */
  operator?: Maybe<Staking_Operators>;
  operator_id: Scalars['String']['output'];
  staked_at: Scalars['numeric']['output'];
  status: Scalars['String']['output'];
  storage_fee_deposit: Scalars['numeric']['output'];
  timestamp: Scalars['timestamp']['output'];
  total_amount: Scalars['numeric']['output'];
  total_withdrawn: Scalars['numeric']['output'];
  updated_at: Scalars['numeric']['output'];
};

/** aggregated selection of "staking.deposits" */
export type Staking_Deposits_Aggregate = {
  __typename?: 'staking_deposits_aggregate';
  aggregate?: Maybe<Staking_Deposits_Aggregate_Fields>;
  nodes: Array<Staking_Deposits>;
};

export type Staking_Deposits_Aggregate_Bool_Exp = {
  count?: InputMaybe<Staking_Deposits_Aggregate_Bool_Exp_Count>;
};

export type Staking_Deposits_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Staking_Deposits_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "staking.deposits" */
export type Staking_Deposits_Aggregate_Fields = {
  __typename?: 'staking_deposits_aggregate_fields';
  avg?: Maybe<Staking_Deposits_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Staking_Deposits_Max_Fields>;
  min?: Maybe<Staking_Deposits_Min_Fields>;
  stddev?: Maybe<Staking_Deposits_Stddev_Fields>;
  stddev_pop?: Maybe<Staking_Deposits_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Staking_Deposits_Stddev_Samp_Fields>;
  sum?: Maybe<Staking_Deposits_Sum_Fields>;
  var_pop?: Maybe<Staking_Deposits_Var_Pop_Fields>;
  var_samp?: Maybe<Staking_Deposits_Var_Samp_Fields>;
  variance?: Maybe<Staking_Deposits_Variance_Fields>;
};


/** aggregate fields of "staking.deposits" */
export type Staking_Deposits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "staking.deposits" */
export type Staking_Deposits_Aggregate_Order_By = {
  avg?: InputMaybe<Staking_Deposits_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Staking_Deposits_Max_Order_By>;
  min?: InputMaybe<Staking_Deposits_Min_Order_By>;
  stddev?: InputMaybe<Staking_Deposits_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Staking_Deposits_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Staking_Deposits_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Staking_Deposits_Sum_Order_By>;
  var_pop?: InputMaybe<Staking_Deposits_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Staking_Deposits_Var_Samp_Order_By>;
  variance?: InputMaybe<Staking_Deposits_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Staking_Deposits_Avg_Fields = {
  __typename?: 'staking_deposits_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "staking.deposits" */
export type Staking_Deposits_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "staking.deposits". All fields are combined with a logical 'AND'. */
export type Staking_Deposits_Bool_Exp = {
  _and?: InputMaybe<Array<Staking_Deposits_Bool_Exp>>;
  _not?: InputMaybe<Staking_Deposits_Bool_Exp>;
  _or?: InputMaybe<Array<Staking_Deposits_Bool_Exp>>;
  account?: InputMaybe<Staking_Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  domain?: InputMaybe<Staking_Domains_Bool_Exp>;
  domain_block_number_deposited_at?: InputMaybe<Numeric_Comparison_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  epoch_deposited_at?: InputMaybe<Numeric_Comparison_Exp>;
  extrinsic_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nominator_id?: InputMaybe<String_Comparison_Exp>;
  operator?: InputMaybe<Staking_Operators_Bool_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  staked_at?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  total_amount?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawn?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Staking_Deposits_Max_Fields = {
  __typename?: 'staking_deposits_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  epoch_deposited_at?: Maybe<Scalars['numeric']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  staked_at?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "staking.deposits" */
export type Staking_Deposits_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Staking_Deposits_Min_Fields = {
  __typename?: 'staking_deposits_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  epoch_deposited_at?: Maybe<Scalars['numeric']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  staked_at?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "staking.deposits" */
export type Staking_Deposits_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "staking.deposits". */
export type Staking_Deposits_Order_By = {
  account?: InputMaybe<Staking_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain?: InputMaybe<Staking_Domains_Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator?: InputMaybe<Staking_Operators_Order_By>;
  operator_id?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "staking.deposits" */
export enum Staking_Deposits_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DomainBlockNumberDepositedAt = 'domain_block_number_deposited_at',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  EpochDepositedAt = 'epoch_deposited_at',
  /** column name */
  ExtrinsicHash = 'extrinsic_hash',
  /** column name */
  Id = 'id',
  /** column name */
  NominatorId = 'nominator_id',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  StakedAt = 'staked_at',
  /** column name */
  Status = 'status',
  /** column name */
  StorageFeeDeposit = 'storage_fee_deposit',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TotalAmount = 'total_amount',
  /** column name */
  TotalWithdrawn = 'total_withdrawn',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Staking_Deposits_Stddev_Fields = {
  __typename?: 'staking_deposits_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "staking.deposits" */
export type Staking_Deposits_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Staking_Deposits_Stddev_Pop_Fields = {
  __typename?: 'staking_deposits_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "staking.deposits" */
export type Staking_Deposits_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Staking_Deposits_Stddev_Samp_Fields = {
  __typename?: 'staking_deposits_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "staking.deposits" */
export type Staking_Deposits_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "staking_deposits" */
export type Staking_Deposits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Staking_Deposits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Staking_Deposits_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  domain_block_number_deposited_at?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  epoch_deposited_at?: InputMaybe<Scalars['numeric']['input']>;
  extrinsic_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nominator_id?: InputMaybe<Scalars['String']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  staked_at?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawn?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Staking_Deposits_Sum_Fields = {
  __typename?: 'staking_deposits_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['numeric']['output']>;
  epoch_deposited_at?: Maybe<Scalars['numeric']['output']>;
  staked_at?: Maybe<Scalars['numeric']['output']>;
  storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "staking.deposits" */
export type Staking_Deposits_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Staking_Deposits_Var_Pop_Fields = {
  __typename?: 'staking_deposits_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "staking.deposits" */
export type Staking_Deposits_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Staking_Deposits_Var_Samp_Fields = {
  __typename?: 'staking_deposits_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "staking.deposits" */
export type Staking_Deposits_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Staking_Deposits_Variance_Fields = {
  __typename?: 'staking_deposits_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_deposited_at?: Maybe<Scalars['Float']['output']>;
  epoch_deposited_at?: Maybe<Scalars['Float']['output']>;
  staked_at?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "staking.deposits" */
export type Staking_Deposits_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_deposited_at?: InputMaybe<Order_By>;
  epoch_deposited_at?: InputMaybe<Order_By>;
  staked_at?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** columns and relationships of "staking.domains" */
export type Staking_Domains = {
  __typename?: 'staking_domains';
  /** An object relationship */
  account?: Maybe<Staking_Accounts>;
  account_id: Scalars['String']['output'];
  accumulated_epoch_rewards: Scalars['numeric']['output'];
  accumulated_epoch_shares: Scalars['numeric']['output'];
  accumulated_epoch_stake: Scalars['numeric']['output'];
  accumulated_epoch_storage_fee_deposit: Scalars['numeric']['output'];
  bundle_count: Scalars['numeric']['output'];
  completed_epoch: Scalars['numeric']['output'];
  created_at: Scalars['numeric']['output'];
  current_epoch_duration: Scalars['numeric']['output'];
  current_share_price: Scalars['numeric']['output'];
  current_storage_fee_deposit: Scalars['numeric']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  /** An array relationship */
  deposits: Array<Staking_Deposits>;
  /** An aggregate relationship */
  deposits_aggregate: Staking_Deposits_Aggregate;
  id: Scalars['String']['output'];
  last1k_epoch_duration: Scalars['numeric']['output'];
  last6_epochs_duration: Scalars['numeric']['output'];
  last144_epoch_duration: Scalars['numeric']['output'];
  last_bundle_at: Scalars['numeric']['output'];
  last_domain_block_number: Scalars['numeric']['output'];
  last_epoch_duration: Scalars['numeric']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  nominators: Array<Staking_Nominators>;
  /** An aggregate relationship */
  nominators_aggregate: Staking_Nominators_Aggregate;
  /** An array relationship */
  operators: Array<Staking_Operators>;
  /** An aggregate relationship */
  operators_aggregate: Staking_Operators_Aggregate;
  rejected_transfers_claimed_count: Scalars['numeric']['output'];
  runtime: Scalars['String']['output'];
  runtime_id: Scalars['Int']['output'];
  runtime_info: Scalars['String']['output'];
  sort_id: Scalars['numeric']['output'];
  total_burned_balance: Scalars['numeric']['output'];
  total_consensus_storage_fee: Scalars['numeric']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_domain_execution_fee: Scalars['numeric']['output'];
  total_estimated_withdrawals: Scalars['numeric']['output'];
  total_rejected_transfers_claimed: Scalars['numeric']['output'];
  total_rewards_collected: Scalars['numeric']['output'];
  total_tax_collected: Scalars['numeric']['output'];
  total_transfers_in: Scalars['numeric']['output'];
  total_transfers_out: Scalars['numeric']['output'];
  total_transfers_rejected: Scalars['numeric']['output'];
  total_volume: Scalars['numeric']['output'];
  total_withdrawals: Scalars['numeric']['output'];
  transfers_in_count: Scalars['numeric']['output'];
  transfers_out_count: Scalars['numeric']['output'];
  transfers_rejected_count: Scalars['numeric']['output'];
  updated_at: Scalars['numeric']['output'];
  /** An array relationship */
  withdrawals: Array<Staking_Withdrawals>;
  /** An aggregate relationship */
  withdrawals_aggregate: Staking_Withdrawals_Aggregate;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsDepositsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsNominatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsNominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsOperatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Operators_Order_By>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsOperators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Operators_Order_By>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


/** columns and relationships of "staking.domains" */
export type Staking_DomainsWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};

/** aggregated selection of "staking.domains" */
export type Staking_Domains_Aggregate = {
  __typename?: 'staking_domains_aggregate';
  aggregate?: Maybe<Staking_Domains_Aggregate_Fields>;
  nodes: Array<Staking_Domains>;
};

/** aggregate fields of "staking.domains" */
export type Staking_Domains_Aggregate_Fields = {
  __typename?: 'staking_domains_aggregate_fields';
  avg?: Maybe<Staking_Domains_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Staking_Domains_Max_Fields>;
  min?: Maybe<Staking_Domains_Min_Fields>;
  stddev?: Maybe<Staking_Domains_Stddev_Fields>;
  stddev_pop?: Maybe<Staking_Domains_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Staking_Domains_Stddev_Samp_Fields>;
  sum?: Maybe<Staking_Domains_Sum_Fields>;
  var_pop?: Maybe<Staking_Domains_Var_Pop_Fields>;
  var_samp?: Maybe<Staking_Domains_Var_Samp_Fields>;
  variance?: Maybe<Staking_Domains_Variance_Fields>;
};


/** aggregate fields of "staking.domains" */
export type Staking_Domains_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Staking_Domains_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Staking_Domains_Avg_Fields = {
  __typename?: 'staking_domains_avg_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "staking.domains". All fields are combined with a logical 'AND'. */
export type Staking_Domains_Bool_Exp = {
  _and?: InputMaybe<Array<Staking_Domains_Bool_Exp>>;
  _not?: InputMaybe<Staking_Domains_Bool_Exp>;
  _or?: InputMaybe<Array<Staking_Domains_Bool_Exp>>;
  account?: InputMaybe<Staking_Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  accumulated_epoch_rewards?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_shares?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_stake?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  bundle_count?: InputMaybe<Numeric_Comparison_Exp>;
  completed_epoch?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  current_epoch_duration?: InputMaybe<Numeric_Comparison_Exp>;
  current_share_price?: InputMaybe<Numeric_Comparison_Exp>;
  current_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  deposits?: InputMaybe<Staking_Deposits_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Staking_Deposits_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last1k_epoch_duration?: InputMaybe<Numeric_Comparison_Exp>;
  last6_epochs_duration?: InputMaybe<Numeric_Comparison_Exp>;
  last144_epoch_duration?: InputMaybe<Numeric_Comparison_Exp>;
  last_bundle_at?: InputMaybe<Numeric_Comparison_Exp>;
  last_domain_block_number?: InputMaybe<Numeric_Comparison_Exp>;
  last_epoch_duration?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nominators?: InputMaybe<Staking_Nominators_Bool_Exp>;
  nominators_aggregate?: InputMaybe<Staking_Nominators_Aggregate_Bool_Exp>;
  operators?: InputMaybe<Staking_Operators_Bool_Exp>;
  operators_aggregate?: InputMaybe<Staking_Operators_Aggregate_Bool_Exp>;
  rejected_transfers_claimed_count?: InputMaybe<Numeric_Comparison_Exp>;
  runtime?: InputMaybe<String_Comparison_Exp>;
  runtime_id?: InputMaybe<Int_Comparison_Exp>;
  runtime_info?: InputMaybe<String_Comparison_Exp>;
  sort_id?: InputMaybe<Numeric_Comparison_Exp>;
  total_burned_balance?: InputMaybe<Numeric_Comparison_Exp>;
  total_consensus_storage_fee?: InputMaybe<Numeric_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_domain_execution_fee?: InputMaybe<Numeric_Comparison_Exp>;
  total_estimated_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  total_rejected_transfers_claimed?: InputMaybe<Numeric_Comparison_Exp>;
  total_rewards_collected?: InputMaybe<Numeric_Comparison_Exp>;
  total_tax_collected?: InputMaybe<Numeric_Comparison_Exp>;
  total_transfers_in?: InputMaybe<Numeric_Comparison_Exp>;
  total_transfers_out?: InputMaybe<Numeric_Comparison_Exp>;
  total_transfers_rejected?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  transfers_in_count?: InputMaybe<Numeric_Comparison_Exp>;
  transfers_out_count?: InputMaybe<Numeric_Comparison_Exp>;
  transfers_rejected_count?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
  withdrawals?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Staking_Withdrawals_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Staking_Domains_Max_Fields = {
  __typename?: 'staking_domains_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  accumulated_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  bundle_count?: Maybe<Scalars['numeric']['output']>;
  completed_epoch?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  last6_epochs_duration?: Maybe<Scalars['numeric']['output']>;
  last144_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  last_bundle_at?: Maybe<Scalars['numeric']['output']>;
  last_domain_block_number?: Maybe<Scalars['numeric']['output']>;
  last_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['numeric']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  runtime_id?: Maybe<Scalars['Int']['output']>;
  runtime_info?: Maybe<Scalars['String']['output']>;
  sort_id?: Maybe<Scalars['numeric']['output']>;
  total_burned_balance?: Maybe<Scalars['numeric']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['numeric']['output']>;
  total_rewards_collected?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_transfers_in?: Maybe<Scalars['numeric']['output']>;
  total_transfers_out?: Maybe<Scalars['numeric']['output']>;
  total_transfers_rejected?: Maybe<Scalars['numeric']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  transfers_in_count?: Maybe<Scalars['numeric']['output']>;
  transfers_out_count?: Maybe<Scalars['numeric']['output']>;
  transfers_rejected_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Staking_Domains_Min_Fields = {
  __typename?: 'staking_domains_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  accumulated_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  bundle_count?: Maybe<Scalars['numeric']['output']>;
  completed_epoch?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  last6_epochs_duration?: Maybe<Scalars['numeric']['output']>;
  last144_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  last_bundle_at?: Maybe<Scalars['numeric']['output']>;
  last_domain_block_number?: Maybe<Scalars['numeric']['output']>;
  last_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['numeric']['output']>;
  runtime?: Maybe<Scalars['String']['output']>;
  runtime_id?: Maybe<Scalars['Int']['output']>;
  runtime_info?: Maybe<Scalars['String']['output']>;
  sort_id?: Maybe<Scalars['numeric']['output']>;
  total_burned_balance?: Maybe<Scalars['numeric']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['numeric']['output']>;
  total_rewards_collected?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_transfers_in?: Maybe<Scalars['numeric']['output']>;
  total_transfers_out?: Maybe<Scalars['numeric']['output']>;
  total_transfers_rejected?: Maybe<Scalars['numeric']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  transfers_in_count?: Maybe<Scalars['numeric']['output']>;
  transfers_out_count?: Maybe<Scalars['numeric']['output']>;
  transfers_rejected_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "staking.domains". */
export type Staking_Domains_Order_By = {
  account?: InputMaybe<Staking_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  completed_epoch?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_duration?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Staking_Deposits_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  last1k_epoch_duration?: InputMaybe<Order_By>;
  last6_epochs_duration?: InputMaybe<Order_By>;
  last144_epoch_duration?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  last_domain_block_number?: InputMaybe<Order_By>;
  last_epoch_duration?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nominators_aggregate?: InputMaybe<Staking_Nominators_Aggregate_Order_By>;
  operators_aggregate?: InputMaybe<Staking_Operators_Aggregate_Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  runtime?: InputMaybe<Order_By>;
  runtime_id?: InputMaybe<Order_By>;
  runtime_info?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Staking_Withdrawals_Aggregate_Order_By>;
};

/** select columns of table "staking.domains" */
export enum Staking_Domains_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  AccumulatedEpochRewards = 'accumulated_epoch_rewards',
  /** column name */
  AccumulatedEpochShares = 'accumulated_epoch_shares',
  /** column name */
  AccumulatedEpochStake = 'accumulated_epoch_stake',
  /** column name */
  AccumulatedEpochStorageFeeDeposit = 'accumulated_epoch_storage_fee_deposit',
  /** column name */
  BundleCount = 'bundle_count',
  /** column name */
  CompletedEpoch = 'completed_epoch',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentEpochDuration = 'current_epoch_duration',
  /** column name */
  CurrentSharePrice = 'current_share_price',
  /** column name */
  CurrentStorageFeeDeposit = 'current_storage_fee_deposit',
  /** column name */
  CurrentTotalShares = 'current_total_shares',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  Id = 'id',
  /** column name */
  Last1kEpochDuration = 'last1k_epoch_duration',
  /** column name */
  Last6EpochsDuration = 'last6_epochs_duration',
  /** column name */
  Last144EpochDuration = 'last144_epoch_duration',
  /** column name */
  LastBundleAt = 'last_bundle_at',
  /** column name */
  LastDomainBlockNumber = 'last_domain_block_number',
  /** column name */
  LastEpochDuration = 'last_epoch_duration',
  /** column name */
  Name = 'name',
  /** column name */
  RejectedTransfersClaimedCount = 'rejected_transfers_claimed_count',
  /** column name */
  Runtime = 'runtime',
  /** column name */
  RuntimeId = 'runtime_id',
  /** column name */
  RuntimeInfo = 'runtime_info',
  /** column name */
  SortId = 'sort_id',
  /** column name */
  TotalBurnedBalance = 'total_burned_balance',
  /** column name */
  TotalConsensusStorageFee = 'total_consensus_storage_fee',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalDomainExecutionFee = 'total_domain_execution_fee',
  /** column name */
  TotalEstimatedWithdrawals = 'total_estimated_withdrawals',
  /** column name */
  TotalRejectedTransfersClaimed = 'total_rejected_transfers_claimed',
  /** column name */
  TotalRewardsCollected = 'total_rewards_collected',
  /** column name */
  TotalTaxCollected = 'total_tax_collected',
  /** column name */
  TotalTransfersIn = 'total_transfers_in',
  /** column name */
  TotalTransfersOut = 'total_transfers_out',
  /** column name */
  TotalTransfersRejected = 'total_transfers_rejected',
  /** column name */
  TotalVolume = 'total_volume',
  /** column name */
  TotalWithdrawals = 'total_withdrawals',
  /** column name */
  TransfersInCount = 'transfers_in_count',
  /** column name */
  TransfersOutCount = 'transfers_out_count',
  /** column name */
  TransfersRejectedCount = 'transfers_rejected_count',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Staking_Domains_Stddev_Fields = {
  __typename?: 'staking_domains_stddev_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Staking_Domains_Stddev_Pop_Fields = {
  __typename?: 'staking_domains_stddev_pop_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Staking_Domains_Stddev_Samp_Fields = {
  __typename?: 'staking_domains_stddev_samp_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "staking_domains" */
export type Staking_Domains_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Staking_Domains_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Staking_Domains_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  accumulated_epoch_rewards?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_shares?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_stake?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  bundle_count?: InputMaybe<Scalars['numeric']['input']>;
  completed_epoch?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  current_epoch_duration?: InputMaybe<Scalars['numeric']['input']>;
  current_share_price?: InputMaybe<Scalars['numeric']['input']>;
  current_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last1k_epoch_duration?: InputMaybe<Scalars['numeric']['input']>;
  last6_epochs_duration?: InputMaybe<Scalars['numeric']['input']>;
  last144_epoch_duration?: InputMaybe<Scalars['numeric']['input']>;
  last_bundle_at?: InputMaybe<Scalars['numeric']['input']>;
  last_domain_block_number?: InputMaybe<Scalars['numeric']['input']>;
  last_epoch_duration?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rejected_transfers_claimed_count?: InputMaybe<Scalars['numeric']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
  runtime_id?: InputMaybe<Scalars['Int']['input']>;
  runtime_info?: InputMaybe<Scalars['String']['input']>;
  sort_id?: InputMaybe<Scalars['numeric']['input']>;
  total_burned_balance?: InputMaybe<Scalars['numeric']['input']>;
  total_consensus_storage_fee?: InputMaybe<Scalars['numeric']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_domain_execution_fee?: InputMaybe<Scalars['numeric']['input']>;
  total_estimated_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  total_rejected_transfers_claimed?: InputMaybe<Scalars['numeric']['input']>;
  total_rewards_collected?: InputMaybe<Scalars['numeric']['input']>;
  total_tax_collected?: InputMaybe<Scalars['numeric']['input']>;
  total_transfers_in?: InputMaybe<Scalars['numeric']['input']>;
  total_transfers_out?: InputMaybe<Scalars['numeric']['input']>;
  total_transfers_rejected?: InputMaybe<Scalars['numeric']['input']>;
  total_volume?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  transfers_in_count?: InputMaybe<Scalars['numeric']['input']>;
  transfers_out_count?: InputMaybe<Scalars['numeric']['input']>;
  transfers_rejected_count?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Staking_Domains_Sum_Fields = {
  __typename?: 'staking_domains_sum_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  bundle_count?: Maybe<Scalars['numeric']['output']>;
  completed_epoch?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  last6_epochs_duration?: Maybe<Scalars['numeric']['output']>;
  last144_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  last_bundle_at?: Maybe<Scalars['numeric']['output']>;
  last_domain_block_number?: Maybe<Scalars['numeric']['output']>;
  last_epoch_duration?: Maybe<Scalars['numeric']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['numeric']['output']>;
  runtime_id?: Maybe<Scalars['Int']['output']>;
  sort_id?: Maybe<Scalars['numeric']['output']>;
  total_burned_balance?: Maybe<Scalars['numeric']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['numeric']['output']>;
  total_rewards_collected?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_transfers_in?: Maybe<Scalars['numeric']['output']>;
  total_transfers_out?: Maybe<Scalars['numeric']['output']>;
  total_transfers_rejected?: Maybe<Scalars['numeric']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  transfers_in_count?: Maybe<Scalars['numeric']['output']>;
  transfers_out_count?: Maybe<Scalars['numeric']['output']>;
  transfers_rejected_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Staking_Domains_Var_Pop_Fields = {
  __typename?: 'staking_domains_var_pop_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Staking_Domains_Var_Samp_Fields = {
  __typename?: 'staking_domains_var_samp_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Staking_Domains_Variance_Fields = {
  __typename?: 'staking_domains_variance_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_duration?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last1k_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last6_epochs_duration?: Maybe<Scalars['Float']['output']>;
  last144_epoch_duration?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  last_epoch_duration?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  runtime_id?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "staking.nominators" */
export type Staking_Nominators = {
  __typename?: 'staking_nominators';
  /** An object relationship */
  account?: Maybe<Staking_Accounts>;
  account_id: Scalars['String']['output'];
  accumulated_epoch_shares: Scalars['numeric']['output'];
  accumulated_epoch_stake: Scalars['numeric']['output'];
  accumulated_epoch_storage_fee_deposit: Scalars['numeric']['output'];
  active_epoch_count: Scalars['numeric']['output'];
  created_at: Scalars['numeric']['output'];
  current_share_price: Scalars['numeric']['output'];
  current_storage_fee_deposit: Scalars['numeric']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  /** An array relationship */
  deposits: Array<Staking_Deposits>;
  /** An aggregate relationship */
  deposits_aggregate: Staking_Deposits_Aggregate;
  /** An object relationship */
  domain?: Maybe<Staking_Domains>;
  domain_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  known_shares: Scalars['numeric']['output'];
  known_storage_fee_deposit: Scalars['numeric']['output'];
  /** An object relationship */
  operator?: Maybe<Staking_Operators>;
  operator_id: Scalars['String']['output'];
  pending_action: Scalars['String']['output'];
  pending_amount: Scalars['numeric']['output'];
  pending_effective_domain_epoch: Scalars['numeric']['output'];
  pending_shares: Scalars['numeric']['output'];
  pending_storage_fee_deposit: Scalars['numeric']['output'];
  pending_storage_fee_refund: Scalars['numeric']['output'];
  status: Scalars['String']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_deposits_count: Scalars['numeric']['output'];
  total_estimated_withdrawals: Scalars['numeric']['output'];
  total_storage_fee_refund: Scalars['numeric']['output'];
  total_withdrawal_amounts: Scalars['numeric']['output'];
  total_withdrawals: Scalars['numeric']['output'];
  total_withdrawals_count: Scalars['numeric']['output'];
  unlock_at_confirmed_domain_block_number: Scalars['jsonb']['output'];
  updated_at: Scalars['numeric']['output'];
  /** An array relationship */
  withdrawals: Array<Staking_Withdrawals>;
  /** An aggregate relationship */
  withdrawals_aggregate: Staking_Withdrawals_Aggregate;
};


/** columns and relationships of "staking.nominators" */
export type Staking_NominatorsDepositsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


/** columns and relationships of "staking.nominators" */
export type Staking_NominatorsDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


/** columns and relationships of "staking.nominators" */
export type Staking_NominatorsUnlock_At_Confirmed_Domain_Block_NumberArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "staking.nominators" */
export type Staking_NominatorsWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


/** columns and relationships of "staking.nominators" */
export type Staking_NominatorsWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};

/** aggregated selection of "staking.nominators" */
export type Staking_Nominators_Aggregate = {
  __typename?: 'staking_nominators_aggregate';
  aggregate?: Maybe<Staking_Nominators_Aggregate_Fields>;
  nodes: Array<Staking_Nominators>;
};

export type Staking_Nominators_Aggregate_Bool_Exp = {
  count?: InputMaybe<Staking_Nominators_Aggregate_Bool_Exp_Count>;
};

export type Staking_Nominators_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Staking_Nominators_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "staking.nominators" */
export type Staking_Nominators_Aggregate_Fields = {
  __typename?: 'staking_nominators_aggregate_fields';
  avg?: Maybe<Staking_Nominators_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Staking_Nominators_Max_Fields>;
  min?: Maybe<Staking_Nominators_Min_Fields>;
  stddev?: Maybe<Staking_Nominators_Stddev_Fields>;
  stddev_pop?: Maybe<Staking_Nominators_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Staking_Nominators_Stddev_Samp_Fields>;
  sum?: Maybe<Staking_Nominators_Sum_Fields>;
  var_pop?: Maybe<Staking_Nominators_Var_Pop_Fields>;
  var_samp?: Maybe<Staking_Nominators_Var_Samp_Fields>;
  variance?: Maybe<Staking_Nominators_Variance_Fields>;
};


/** aggregate fields of "staking.nominators" */
export type Staking_Nominators_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "staking.nominators" */
export type Staking_Nominators_Aggregate_Order_By = {
  avg?: InputMaybe<Staking_Nominators_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Staking_Nominators_Max_Order_By>;
  min?: InputMaybe<Staking_Nominators_Min_Order_By>;
  stddev?: InputMaybe<Staking_Nominators_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Staking_Nominators_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Staking_Nominators_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Staking_Nominators_Sum_Order_By>;
  var_pop?: InputMaybe<Staking_Nominators_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Staking_Nominators_Var_Samp_Order_By>;
  variance?: InputMaybe<Staking_Nominators_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Staking_Nominators_Avg_Fields = {
  __typename?: 'staking_nominators_avg_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "staking.nominators" */
export type Staking_Nominators_Avg_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "staking.nominators". All fields are combined with a logical 'AND'. */
export type Staking_Nominators_Bool_Exp = {
  _and?: InputMaybe<Array<Staking_Nominators_Bool_Exp>>;
  _not?: InputMaybe<Staking_Nominators_Bool_Exp>;
  _or?: InputMaybe<Array<Staking_Nominators_Bool_Exp>>;
  account?: InputMaybe<Staking_Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  accumulated_epoch_shares?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_stake?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  active_epoch_count?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  current_share_price?: InputMaybe<Numeric_Comparison_Exp>;
  current_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  deposits?: InputMaybe<Staking_Deposits_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Staking_Deposits_Aggregate_Bool_Exp>;
  domain?: InputMaybe<Staking_Domains_Bool_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  known_shares?: InputMaybe<Numeric_Comparison_Exp>;
  known_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  operator?: InputMaybe<Staking_Operators_Bool_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  pending_action?: InputMaybe<String_Comparison_Exp>;
  pending_amount?: InputMaybe<Numeric_Comparison_Exp>;
  pending_effective_domain_epoch?: InputMaybe<Numeric_Comparison_Exp>;
  pending_shares?: InputMaybe<Numeric_Comparison_Exp>;
  pending_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  pending_storage_fee_refund?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_deposits_count?: InputMaybe<Numeric_Comparison_Exp>;
  total_estimated_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  total_storage_fee_refund?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawal_amounts?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawals_count?: InputMaybe<Numeric_Comparison_Exp>;
  unlock_at_confirmed_domain_block_number?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
  withdrawals?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Staking_Withdrawals_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Staking_Nominators_Max_Fields = {
  __typename?: 'staking_nominators_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  active_epoch_count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  known_shares?: Maybe<Scalars['numeric']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  pending_action?: Maybe<Scalars['String']['output']>;
  pending_amount?: Maybe<Scalars['numeric']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['numeric']['output']>;
  pending_shares?: Maybe<Scalars['numeric']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_deposits_count?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['numeric']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "staking.nominators" */
export type Staking_Nominators_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  pending_action?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Staking_Nominators_Min_Fields = {
  __typename?: 'staking_nominators_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  active_epoch_count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  known_shares?: Maybe<Scalars['numeric']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  pending_action?: Maybe<Scalars['String']['output']>;
  pending_amount?: Maybe<Scalars['numeric']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['numeric']['output']>;
  pending_shares?: Maybe<Scalars['numeric']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_deposits_count?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['numeric']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "staking.nominators" */
export type Staking_Nominators_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  pending_action?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "staking.nominators". */
export type Staking_Nominators_Order_By = {
  account?: InputMaybe<Staking_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Staking_Deposits_Aggregate_Order_By>;
  domain?: InputMaybe<Staking_Domains_Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  operator?: InputMaybe<Staking_Operators_Order_By>;
  operator_id?: InputMaybe<Order_By>;
  pending_action?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  unlock_at_confirmed_domain_block_number?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Staking_Withdrawals_Aggregate_Order_By>;
};

/** select columns of table "staking.nominators" */
export enum Staking_Nominators_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  AccumulatedEpochShares = 'accumulated_epoch_shares',
  /** column name */
  AccumulatedEpochStake = 'accumulated_epoch_stake',
  /** column name */
  AccumulatedEpochStorageFeeDeposit = 'accumulated_epoch_storage_fee_deposit',
  /** column name */
  ActiveEpochCount = 'active_epoch_count',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentSharePrice = 'current_share_price',
  /** column name */
  CurrentStorageFeeDeposit = 'current_storage_fee_deposit',
  /** column name */
  CurrentTotalShares = 'current_total_shares',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  Id = 'id',
  /** column name */
  KnownShares = 'known_shares',
  /** column name */
  KnownStorageFeeDeposit = 'known_storage_fee_deposit',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  PendingAction = 'pending_action',
  /** column name */
  PendingAmount = 'pending_amount',
  /** column name */
  PendingEffectiveDomainEpoch = 'pending_effective_domain_epoch',
  /** column name */
  PendingShares = 'pending_shares',
  /** column name */
  PendingStorageFeeDeposit = 'pending_storage_fee_deposit',
  /** column name */
  PendingStorageFeeRefund = 'pending_storage_fee_refund',
  /** column name */
  Status = 'status',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalDepositsCount = 'total_deposits_count',
  /** column name */
  TotalEstimatedWithdrawals = 'total_estimated_withdrawals',
  /** column name */
  TotalStorageFeeRefund = 'total_storage_fee_refund',
  /** column name */
  TotalWithdrawalAmounts = 'total_withdrawal_amounts',
  /** column name */
  TotalWithdrawals = 'total_withdrawals',
  /** column name */
  TotalWithdrawalsCount = 'total_withdrawals_count',
  /** column name */
  UnlockAtConfirmedDomainBlockNumber = 'unlock_at_confirmed_domain_block_number',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Staking_Nominators_Stddev_Fields = {
  __typename?: 'staking_nominators_stddev_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "staking.nominators" */
export type Staking_Nominators_Stddev_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Staking_Nominators_Stddev_Pop_Fields = {
  __typename?: 'staking_nominators_stddev_pop_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "staking.nominators" */
export type Staking_Nominators_Stddev_Pop_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Staking_Nominators_Stddev_Samp_Fields = {
  __typename?: 'staking_nominators_stddev_samp_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "staking.nominators" */
export type Staking_Nominators_Stddev_Samp_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "staking_nominators" */
export type Staking_Nominators_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Staking_Nominators_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Staking_Nominators_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  accumulated_epoch_shares?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_stake?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  active_epoch_count?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  current_share_price?: InputMaybe<Scalars['numeric']['input']>;
  current_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  known_shares?: InputMaybe<Scalars['numeric']['input']>;
  known_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  pending_action?: InputMaybe<Scalars['String']['input']>;
  pending_amount?: InputMaybe<Scalars['numeric']['input']>;
  pending_effective_domain_epoch?: InputMaybe<Scalars['numeric']['input']>;
  pending_shares?: InputMaybe<Scalars['numeric']['input']>;
  pending_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  pending_storage_fee_refund?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_deposits_count?: InputMaybe<Scalars['numeric']['input']>;
  total_estimated_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  total_storage_fee_refund?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawal_amounts?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawals_count?: InputMaybe<Scalars['numeric']['input']>;
  unlock_at_confirmed_domain_block_number?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Staking_Nominators_Sum_Fields = {
  __typename?: 'staking_nominators_sum_fields';
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  active_epoch_count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  known_shares?: Maybe<Scalars['numeric']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  pending_amount?: Maybe<Scalars['numeric']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['numeric']['output']>;
  pending_shares?: Maybe<Scalars['numeric']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_deposits_count?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['numeric']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "staking.nominators" */
export type Staking_Nominators_Sum_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Staking_Nominators_Var_Pop_Fields = {
  __typename?: 'staking_nominators_var_pop_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "staking.nominators" */
export type Staking_Nominators_Var_Pop_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Staking_Nominators_Var_Samp_Fields = {
  __typename?: 'staking_nominators_var_samp_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "staking.nominators" */
export type Staking_Nominators_Var_Samp_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Staking_Nominators_Variance_Fields = {
  __typename?: 'staking_nominators_variance_fields';
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  known_shares?: Maybe<Scalars['Float']['output']>;
  known_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_amount?: Maybe<Scalars['Float']['output']>;
  pending_effective_domain_epoch?: Maybe<Scalars['Float']['output']>;
  pending_shares?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  pending_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_deposits_count?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_storage_fee_refund?: Maybe<Scalars['Float']['output']>;
  total_withdrawal_amounts?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_withdrawals_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "staking.nominators" */
export type Staking_Nominators_Variance_Order_By = {
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  known_shares?: InputMaybe<Order_By>;
  known_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_amount?: InputMaybe<Order_By>;
  pending_effective_domain_epoch?: InputMaybe<Order_By>;
  pending_shares?: InputMaybe<Order_By>;
  pending_storage_fee_deposit?: InputMaybe<Order_By>;
  pending_storage_fee_refund?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_deposits_count?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_storage_fee_refund?: InputMaybe<Order_By>;
  total_withdrawal_amounts?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  total_withdrawals_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** columns and relationships of "staking.operators" */
export type Staking_Operators = {
  __typename?: 'staking_operators';
  /** An object relationship */
  account?: Maybe<Staking_Accounts>;
  account_id: Scalars['String']['output'];
  accumulated_epoch_rewards: Scalars['numeric']['output'];
  accumulated_epoch_shares: Scalars['numeric']['output'];
  accumulated_epoch_stake: Scalars['numeric']['output'];
  accumulated_epoch_storage_fee_deposit: Scalars['numeric']['output'];
  active_epoch_count: Scalars['numeric']['output'];
  bundle_count: Scalars['numeric']['output'];
  created_at: Scalars['numeric']['output'];
  current_epoch_rewards: Scalars['numeric']['output'];
  current_share_price: Scalars['numeric']['output'];
  current_storage_fee_deposit: Scalars['numeric']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  /** An array relationship */
  deposits: Array<Staking_Deposits>;
  /** An aggregate relationship */
  deposits_aggregate: Staking_Deposits_Aggregate;
  /** An object relationship */
  domain?: Maybe<Staking_Domains>;
  domain_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_bundle_at: Scalars['numeric']['output'];
  minimum_nominator_stake: Scalars['numeric']['output'];
  nomination_tax: Scalars['Int']['output'];
  /** An array relationship */
  nominators: Array<Staking_Nominators>;
  /** An aggregate relationship */
  nominators_aggregate: Staking_Nominators_Aggregate;
  pending_action: Scalars['String']['output'];
  raw_status: Scalars['String']['output'];
  rejected_transfers_claimed_count: Scalars['numeric']['output'];
  signing_key: Scalars['String']['output'];
  sort_id: Scalars['numeric']['output'];
  status: Scalars['String']['output'];
  total_burned_balance: Scalars['numeric']['output'];
  total_consensus_storage_fee: Scalars['numeric']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_domain_execution_fee: Scalars['numeric']['output'];
  total_estimated_withdrawals: Scalars['numeric']['output'];
  total_rejected_transfers_claimed: Scalars['numeric']['output'];
  total_rewards_collected: Scalars['numeric']['output'];
  total_tax_collected: Scalars['numeric']['output'];
  total_transfers_in: Scalars['numeric']['output'];
  total_transfers_out: Scalars['numeric']['output'];
  total_transfers_rejected: Scalars['numeric']['output'];
  total_volume: Scalars['numeric']['output'];
  total_withdrawals: Scalars['numeric']['output'];
  transfers_in_count: Scalars['numeric']['output'];
  transfers_out_count: Scalars['numeric']['output'];
  transfers_rejected_count: Scalars['numeric']['output'];
  updated_at: Scalars['numeric']['output'];
  /** An array relationship */
  withdrawals: Array<Staking_Withdrawals>;
  /** An aggregate relationship */
  withdrawals_aggregate: Staking_Withdrawals_Aggregate;
};


/** columns and relationships of "staking.operators" */
export type Staking_OperatorsDepositsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


/** columns and relationships of "staking.operators" */
export type Staking_OperatorsDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


/** columns and relationships of "staking.operators" */
export type Staking_OperatorsNominatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


/** columns and relationships of "staking.operators" */
export type Staking_OperatorsNominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


/** columns and relationships of "staking.operators" */
export type Staking_OperatorsWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


/** columns and relationships of "staking.operators" */
export type Staking_OperatorsWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};

/** aggregated selection of "staking.operators" */
export type Staking_Operators_Aggregate = {
  __typename?: 'staking_operators_aggregate';
  aggregate?: Maybe<Staking_Operators_Aggregate_Fields>;
  nodes: Array<Staking_Operators>;
};

export type Staking_Operators_Aggregate_Bool_Exp = {
  count?: InputMaybe<Staking_Operators_Aggregate_Bool_Exp_Count>;
};

export type Staking_Operators_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Staking_Operators_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "staking.operators" */
export type Staking_Operators_Aggregate_Fields = {
  __typename?: 'staking_operators_aggregate_fields';
  avg?: Maybe<Staking_Operators_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Staking_Operators_Max_Fields>;
  min?: Maybe<Staking_Operators_Min_Fields>;
  stddev?: Maybe<Staking_Operators_Stddev_Fields>;
  stddev_pop?: Maybe<Staking_Operators_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Staking_Operators_Stddev_Samp_Fields>;
  sum?: Maybe<Staking_Operators_Sum_Fields>;
  var_pop?: Maybe<Staking_Operators_Var_Pop_Fields>;
  var_samp?: Maybe<Staking_Operators_Var_Samp_Fields>;
  variance?: Maybe<Staking_Operators_Variance_Fields>;
};


/** aggregate fields of "staking.operators" */
export type Staking_Operators_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "staking.operators" */
export type Staking_Operators_Aggregate_Order_By = {
  avg?: InputMaybe<Staking_Operators_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Staking_Operators_Max_Order_By>;
  min?: InputMaybe<Staking_Operators_Min_Order_By>;
  stddev?: InputMaybe<Staking_Operators_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Staking_Operators_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Staking_Operators_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Staking_Operators_Sum_Order_By>;
  var_pop?: InputMaybe<Staking_Operators_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Staking_Operators_Var_Samp_Order_By>;
  variance?: InputMaybe<Staking_Operators_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Staking_Operators_Avg_Fields = {
  __typename?: 'staking_operators_avg_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "staking.operators" */
export type Staking_Operators_Avg_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "staking.operators". All fields are combined with a logical 'AND'. */
export type Staking_Operators_Bool_Exp = {
  _and?: InputMaybe<Array<Staking_Operators_Bool_Exp>>;
  _not?: InputMaybe<Staking_Operators_Bool_Exp>;
  _or?: InputMaybe<Array<Staking_Operators_Bool_Exp>>;
  account?: InputMaybe<Staking_Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  accumulated_epoch_rewards?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_shares?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_stake?: InputMaybe<Numeric_Comparison_Exp>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  active_epoch_count?: InputMaybe<Numeric_Comparison_Exp>;
  bundle_count?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  current_epoch_rewards?: InputMaybe<Numeric_Comparison_Exp>;
  current_share_price?: InputMaybe<Numeric_Comparison_Exp>;
  current_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  deposits?: InputMaybe<Staking_Deposits_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Staking_Deposits_Aggregate_Bool_Exp>;
  domain?: InputMaybe<Staking_Domains_Bool_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_bundle_at?: InputMaybe<Numeric_Comparison_Exp>;
  minimum_nominator_stake?: InputMaybe<Numeric_Comparison_Exp>;
  nomination_tax?: InputMaybe<Int_Comparison_Exp>;
  nominators?: InputMaybe<Staking_Nominators_Bool_Exp>;
  nominators_aggregate?: InputMaybe<Staking_Nominators_Aggregate_Bool_Exp>;
  pending_action?: InputMaybe<String_Comparison_Exp>;
  raw_status?: InputMaybe<String_Comparison_Exp>;
  rejected_transfers_claimed_count?: InputMaybe<Numeric_Comparison_Exp>;
  signing_key?: InputMaybe<String_Comparison_Exp>;
  sort_id?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_burned_balance?: InputMaybe<Numeric_Comparison_Exp>;
  total_consensus_storage_fee?: InputMaybe<Numeric_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_domain_execution_fee?: InputMaybe<Numeric_Comparison_Exp>;
  total_estimated_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  total_rejected_transfers_claimed?: InputMaybe<Numeric_Comparison_Exp>;
  total_rewards_collected?: InputMaybe<Numeric_Comparison_Exp>;
  total_tax_collected?: InputMaybe<Numeric_Comparison_Exp>;
  total_transfers_in?: InputMaybe<Numeric_Comparison_Exp>;
  total_transfers_out?: InputMaybe<Numeric_Comparison_Exp>;
  total_transfers_rejected?: InputMaybe<Numeric_Comparison_Exp>;
  total_volume?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawals?: InputMaybe<Numeric_Comparison_Exp>;
  transfers_in_count?: InputMaybe<Numeric_Comparison_Exp>;
  transfers_out_count?: InputMaybe<Numeric_Comparison_Exp>;
  transfers_rejected_count?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
  withdrawals?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Staking_Withdrawals_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Staking_Operators_Max_Fields = {
  __typename?: 'staking_operators_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  accumulated_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  active_epoch_count?: Maybe<Scalars['numeric']['output']>;
  bundle_count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_bundle_at?: Maybe<Scalars['numeric']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['numeric']['output']>;
  nomination_tax?: Maybe<Scalars['Int']['output']>;
  pending_action?: Maybe<Scalars['String']['output']>;
  raw_status?: Maybe<Scalars['String']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['numeric']['output']>;
  signing_key?: Maybe<Scalars['String']['output']>;
  sort_id?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_burned_balance?: Maybe<Scalars['numeric']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['numeric']['output']>;
  total_rewards_collected?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_transfers_in?: Maybe<Scalars['numeric']['output']>;
  total_transfers_out?: Maybe<Scalars['numeric']['output']>;
  total_transfers_rejected?: Maybe<Scalars['numeric']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  transfers_in_count?: Maybe<Scalars['numeric']['output']>;
  transfers_out_count?: Maybe<Scalars['numeric']['output']>;
  transfers_rejected_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "staking.operators" */
export type Staking_Operators_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  pending_action?: InputMaybe<Order_By>;
  raw_status?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  signing_key?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Staking_Operators_Min_Fields = {
  __typename?: 'staking_operators_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  accumulated_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  active_epoch_count?: Maybe<Scalars['numeric']['output']>;
  bundle_count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_bundle_at?: Maybe<Scalars['numeric']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['numeric']['output']>;
  nomination_tax?: Maybe<Scalars['Int']['output']>;
  pending_action?: Maybe<Scalars['String']['output']>;
  raw_status?: Maybe<Scalars['String']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['numeric']['output']>;
  signing_key?: Maybe<Scalars['String']['output']>;
  sort_id?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_burned_balance?: Maybe<Scalars['numeric']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['numeric']['output']>;
  total_rewards_collected?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_transfers_in?: Maybe<Scalars['numeric']['output']>;
  total_transfers_out?: Maybe<Scalars['numeric']['output']>;
  total_transfers_rejected?: Maybe<Scalars['numeric']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  transfers_in_count?: Maybe<Scalars['numeric']['output']>;
  transfers_out_count?: Maybe<Scalars['numeric']['output']>;
  transfers_rejected_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "staking.operators" */
export type Staking_Operators_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  pending_action?: InputMaybe<Order_By>;
  raw_status?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  signing_key?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "staking.operators". */
export type Staking_Operators_Order_By = {
  account?: InputMaybe<Staking_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Staking_Deposits_Aggregate_Order_By>;
  domain?: InputMaybe<Staking_Domains_Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  nominators_aggregate?: InputMaybe<Staking_Nominators_Aggregate_Order_By>;
  pending_action?: InputMaybe<Order_By>;
  raw_status?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  signing_key?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Staking_Withdrawals_Aggregate_Order_By>;
};

/** select columns of table "staking.operators" */
export enum Staking_Operators_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  AccumulatedEpochRewards = 'accumulated_epoch_rewards',
  /** column name */
  AccumulatedEpochShares = 'accumulated_epoch_shares',
  /** column name */
  AccumulatedEpochStake = 'accumulated_epoch_stake',
  /** column name */
  AccumulatedEpochStorageFeeDeposit = 'accumulated_epoch_storage_fee_deposit',
  /** column name */
  ActiveEpochCount = 'active_epoch_count',
  /** column name */
  BundleCount = 'bundle_count',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentEpochRewards = 'current_epoch_rewards',
  /** column name */
  CurrentSharePrice = 'current_share_price',
  /** column name */
  CurrentStorageFeeDeposit = 'current_storage_fee_deposit',
  /** column name */
  CurrentTotalShares = 'current_total_shares',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastBundleAt = 'last_bundle_at',
  /** column name */
  MinimumNominatorStake = 'minimum_nominator_stake',
  /** column name */
  NominationTax = 'nomination_tax',
  /** column name */
  PendingAction = 'pending_action',
  /** column name */
  RawStatus = 'raw_status',
  /** column name */
  RejectedTransfersClaimedCount = 'rejected_transfers_claimed_count',
  /** column name */
  SigningKey = 'signing_key',
  /** column name */
  SortId = 'sort_id',
  /** column name */
  Status = 'status',
  /** column name */
  TotalBurnedBalance = 'total_burned_balance',
  /** column name */
  TotalConsensusStorageFee = 'total_consensus_storage_fee',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalDomainExecutionFee = 'total_domain_execution_fee',
  /** column name */
  TotalEstimatedWithdrawals = 'total_estimated_withdrawals',
  /** column name */
  TotalRejectedTransfersClaimed = 'total_rejected_transfers_claimed',
  /** column name */
  TotalRewardsCollected = 'total_rewards_collected',
  /** column name */
  TotalTaxCollected = 'total_tax_collected',
  /** column name */
  TotalTransfersIn = 'total_transfers_in',
  /** column name */
  TotalTransfersOut = 'total_transfers_out',
  /** column name */
  TotalTransfersRejected = 'total_transfers_rejected',
  /** column name */
  TotalVolume = 'total_volume',
  /** column name */
  TotalWithdrawals = 'total_withdrawals',
  /** column name */
  TransfersInCount = 'transfers_in_count',
  /** column name */
  TransfersOutCount = 'transfers_out_count',
  /** column name */
  TransfersRejectedCount = 'transfers_rejected_count',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Staking_Operators_Stddev_Fields = {
  __typename?: 'staking_operators_stddev_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "staking.operators" */
export type Staking_Operators_Stddev_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Staking_Operators_Stddev_Pop_Fields = {
  __typename?: 'staking_operators_stddev_pop_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "staking.operators" */
export type Staking_Operators_Stddev_Pop_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Staking_Operators_Stddev_Samp_Fields = {
  __typename?: 'staking_operators_stddev_samp_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "staking.operators" */
export type Staking_Operators_Stddev_Samp_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "staking_operators" */
export type Staking_Operators_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Staking_Operators_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Staking_Operators_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  accumulated_epoch_rewards?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_shares?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_stake?: InputMaybe<Scalars['numeric']['input']>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  active_epoch_count?: InputMaybe<Scalars['numeric']['input']>;
  bundle_count?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  current_epoch_rewards?: InputMaybe<Scalars['numeric']['input']>;
  current_share_price?: InputMaybe<Scalars['numeric']['input']>;
  current_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_bundle_at?: InputMaybe<Scalars['numeric']['input']>;
  minimum_nominator_stake?: InputMaybe<Scalars['numeric']['input']>;
  nomination_tax?: InputMaybe<Scalars['Int']['input']>;
  pending_action?: InputMaybe<Scalars['String']['input']>;
  raw_status?: InputMaybe<Scalars['String']['input']>;
  rejected_transfers_claimed_count?: InputMaybe<Scalars['numeric']['input']>;
  signing_key?: InputMaybe<Scalars['String']['input']>;
  sort_id?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_burned_balance?: InputMaybe<Scalars['numeric']['input']>;
  total_consensus_storage_fee?: InputMaybe<Scalars['numeric']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_domain_execution_fee?: InputMaybe<Scalars['numeric']['input']>;
  total_estimated_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  total_rejected_transfers_claimed?: InputMaybe<Scalars['numeric']['input']>;
  total_rewards_collected?: InputMaybe<Scalars['numeric']['input']>;
  total_tax_collected?: InputMaybe<Scalars['numeric']['input']>;
  total_transfers_in?: InputMaybe<Scalars['numeric']['input']>;
  total_transfers_out?: InputMaybe<Scalars['numeric']['input']>;
  total_transfers_rejected?: InputMaybe<Scalars['numeric']['input']>;
  total_volume?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawals?: InputMaybe<Scalars['numeric']['input']>;
  transfers_in_count?: InputMaybe<Scalars['numeric']['input']>;
  transfers_out_count?: InputMaybe<Scalars['numeric']['input']>;
  transfers_rejected_count?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Staking_Operators_Sum_Fields = {
  __typename?: 'staking_operators_sum_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['numeric']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  active_epoch_count?: Maybe<Scalars['numeric']['output']>;
  bundle_count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  current_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  current_share_price?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  last_bundle_at?: Maybe<Scalars['numeric']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['numeric']['output']>;
  nomination_tax?: Maybe<Scalars['Int']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['numeric']['output']>;
  sort_id?: Maybe<Scalars['numeric']['output']>;
  total_burned_balance?: Maybe<Scalars['numeric']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['numeric']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['numeric']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['numeric']['output']>;
  total_rewards_collected?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  total_transfers_in?: Maybe<Scalars['numeric']['output']>;
  total_transfers_out?: Maybe<Scalars['numeric']['output']>;
  total_transfers_rejected?: Maybe<Scalars['numeric']['output']>;
  total_volume?: Maybe<Scalars['numeric']['output']>;
  total_withdrawals?: Maybe<Scalars['numeric']['output']>;
  transfers_in_count?: Maybe<Scalars['numeric']['output']>;
  transfers_out_count?: Maybe<Scalars['numeric']['output']>;
  transfers_rejected_count?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "staking.operators" */
export type Staking_Operators_Sum_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Staking_Operators_Var_Pop_Fields = {
  __typename?: 'staking_operators_var_pop_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "staking.operators" */
export type Staking_Operators_Var_Pop_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Staking_Operators_Var_Samp_Fields = {
  __typename?: 'staking_operators_var_samp_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "staking.operators" */
export type Staking_Operators_Var_Samp_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Staking_Operators_Variance_Fields = {
  __typename?: 'staking_operators_variance_fields';
  accumulated_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_shares?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_stake?: Maybe<Scalars['Float']['output']>;
  accumulated_epoch_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  active_epoch_count?: Maybe<Scalars['Float']['output']>;
  bundle_count?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_share_price?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  rejected_transfers_claimed_count?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_burned_balance?: Maybe<Scalars['Float']['output']>;
  total_consensus_storage_fee?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_domain_execution_fee?: Maybe<Scalars['Float']['output']>;
  total_estimated_withdrawals?: Maybe<Scalars['Float']['output']>;
  total_rejected_transfers_claimed?: Maybe<Scalars['Float']['output']>;
  total_rewards_collected?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  total_transfers_in?: Maybe<Scalars['Float']['output']>;
  total_transfers_out?: Maybe<Scalars['Float']['output']>;
  total_transfers_rejected?: Maybe<Scalars['Float']['output']>;
  total_volume?: Maybe<Scalars['Float']['output']>;
  total_withdrawals?: Maybe<Scalars['Float']['output']>;
  transfers_in_count?: Maybe<Scalars['Float']['output']>;
  transfers_out_count?: Maybe<Scalars['Float']['output']>;
  transfers_rejected_count?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "staking.operators" */
export type Staking_Operators_Variance_Order_By = {
  accumulated_epoch_rewards?: InputMaybe<Order_By>;
  accumulated_epoch_shares?: InputMaybe<Order_By>;
  accumulated_epoch_stake?: InputMaybe<Order_By>;
  accumulated_epoch_storage_fee_deposit?: InputMaybe<Order_By>;
  active_epoch_count?: InputMaybe<Order_By>;
  bundle_count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_share_price?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  rejected_transfers_claimed_count?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_burned_balance?: InputMaybe<Order_By>;
  total_consensus_storage_fee?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_domain_execution_fee?: InputMaybe<Order_By>;
  total_estimated_withdrawals?: InputMaybe<Order_By>;
  total_rejected_transfers_claimed?: InputMaybe<Order_By>;
  total_rewards_collected?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  total_transfers_in?: InputMaybe<Order_By>;
  total_transfers_out?: InputMaybe<Order_By>;
  total_transfers_rejected?: InputMaybe<Order_By>;
  total_volume?: InputMaybe<Order_By>;
  total_withdrawals?: InputMaybe<Order_By>;
  transfers_in_count?: InputMaybe<Order_By>;
  transfers_out_count?: InputMaybe<Order_By>;
  transfers_rejected_count?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** columns and relationships of "staking.withdrawals" */
export type Staking_Withdrawals = {
  __typename?: 'staking_withdrawals';
  /** An object relationship */
  account?: Maybe<Staking_Accounts>;
  account_id: Scalars['String']['output'];
  created_at: Scalars['numeric']['output'];
  /** An object relationship */
  domain?: Maybe<Staking_Domains>;
  domain_block_number_withdrawal_requested_at: Scalars['numeric']['output'];
  domain_id: Scalars['String']['output'];
  epoch_withdrawal_requested_at: Scalars['numeric']['output'];
  estimated_amount: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  nominator_id: Scalars['String']['output'];
  /** An object relationship */
  operator?: Maybe<Staking_Operators>;
  operator_id: Scalars['String']['output'];
  ready_at: Scalars['numeric']['output'];
  shares: Scalars['numeric']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['timestamp']['output'];
  total_amount: Scalars['numeric']['output'];
  unlock_extrinsic_hash: Scalars['String']['output'];
  unlocked_amount: Scalars['numeric']['output'];
  unlocked_at: Scalars['numeric']['output'];
  unlocked_storage_fee: Scalars['numeric']['output'];
  updated_at: Scalars['numeric']['output'];
  withdraw_extrinsic_hash: Scalars['String']['output'];
};

/** aggregated selection of "staking.withdrawals" */
export type Staking_Withdrawals_Aggregate = {
  __typename?: 'staking_withdrawals_aggregate';
  aggregate?: Maybe<Staking_Withdrawals_Aggregate_Fields>;
  nodes: Array<Staking_Withdrawals>;
};

export type Staking_Withdrawals_Aggregate_Bool_Exp = {
  count?: InputMaybe<Staking_Withdrawals_Aggregate_Bool_Exp_Count>;
};

export type Staking_Withdrawals_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "staking.withdrawals" */
export type Staking_Withdrawals_Aggregate_Fields = {
  __typename?: 'staking_withdrawals_aggregate_fields';
  avg?: Maybe<Staking_Withdrawals_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Staking_Withdrawals_Max_Fields>;
  min?: Maybe<Staking_Withdrawals_Min_Fields>;
  stddev?: Maybe<Staking_Withdrawals_Stddev_Fields>;
  stddev_pop?: Maybe<Staking_Withdrawals_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Staking_Withdrawals_Stddev_Samp_Fields>;
  sum?: Maybe<Staking_Withdrawals_Sum_Fields>;
  var_pop?: Maybe<Staking_Withdrawals_Var_Pop_Fields>;
  var_samp?: Maybe<Staking_Withdrawals_Var_Samp_Fields>;
  variance?: Maybe<Staking_Withdrawals_Variance_Fields>;
};


/** aggregate fields of "staking.withdrawals" */
export type Staking_Withdrawals_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "staking.withdrawals" */
export type Staking_Withdrawals_Aggregate_Order_By = {
  avg?: InputMaybe<Staking_Withdrawals_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Staking_Withdrawals_Max_Order_By>;
  min?: InputMaybe<Staking_Withdrawals_Min_Order_By>;
  stddev?: InputMaybe<Staking_Withdrawals_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Staking_Withdrawals_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Staking_Withdrawals_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Staking_Withdrawals_Sum_Order_By>;
  var_pop?: InputMaybe<Staking_Withdrawals_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Staking_Withdrawals_Var_Samp_Order_By>;
  variance?: InputMaybe<Staking_Withdrawals_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Staking_Withdrawals_Avg_Fields = {
  __typename?: 'staking_withdrawals_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Avg_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "staking.withdrawals". All fields are combined with a logical 'AND'. */
export type Staking_Withdrawals_Bool_Exp = {
  _and?: InputMaybe<Array<Staking_Withdrawals_Bool_Exp>>;
  _not?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
  _or?: InputMaybe<Array<Staking_Withdrawals_Bool_Exp>>;
  account?: InputMaybe<Staking_Accounts_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Numeric_Comparison_Exp>;
  domain?: InputMaybe<Staking_Domains_Bool_Exp>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Numeric_Comparison_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  epoch_withdrawal_requested_at?: InputMaybe<Numeric_Comparison_Exp>;
  estimated_amount?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nominator_id?: InputMaybe<String_Comparison_Exp>;
  operator?: InputMaybe<Staking_Operators_Bool_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  ready_at?: InputMaybe<Numeric_Comparison_Exp>;
  shares?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  total_amount?: InputMaybe<Numeric_Comparison_Exp>;
  unlock_extrinsic_hash?: InputMaybe<String_Comparison_Exp>;
  unlocked_amount?: InputMaybe<Numeric_Comparison_Exp>;
  unlocked_at?: InputMaybe<Numeric_Comparison_Exp>;
  unlocked_storage_fee?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Numeric_Comparison_Exp>;
  withdraw_extrinsic_hash?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Staking_Withdrawals_Max_Fields = {
  __typename?: 'staking_withdrawals_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['numeric']['output']>;
  estimated_amount?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  ready_at?: Maybe<Scalars['numeric']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  unlock_extrinsic_hash?: Maybe<Scalars['String']['output']>;
  unlocked_amount?: Maybe<Scalars['numeric']['output']>;
  unlocked_at?: Maybe<Scalars['numeric']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
  withdraw_extrinsic_hash?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlock_extrinsic_hash?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdraw_extrinsic_hash?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Staking_Withdrawals_Min_Fields = {
  __typename?: 'staking_withdrawals_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['numeric']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['numeric']['output']>;
  estimated_amount?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  ready_at?: Maybe<Scalars['numeric']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  unlock_extrinsic_hash?: Maybe<Scalars['String']['output']>;
  unlocked_amount?: Maybe<Scalars['numeric']['output']>;
  unlocked_at?: Maybe<Scalars['numeric']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
  withdraw_extrinsic_hash?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlock_extrinsic_hash?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdraw_extrinsic_hash?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "staking.withdrawals". */
export type Staking_Withdrawals_Order_By = {
  account?: InputMaybe<Staking_Accounts_Order_By>;
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain?: InputMaybe<Staking_Domains_Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator?: InputMaybe<Staking_Operators_Order_By>;
  operator_id?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlock_extrinsic_hash?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdraw_extrinsic_hash?: InputMaybe<Order_By>;
};

/** select columns of table "staking.withdrawals" */
export enum Staking_Withdrawals_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DomainBlockNumberWithdrawalRequestedAt = 'domain_block_number_withdrawal_requested_at',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  EpochWithdrawalRequestedAt = 'epoch_withdrawal_requested_at',
  /** column name */
  EstimatedAmount = 'estimated_amount',
  /** column name */
  Id = 'id',
  /** column name */
  NominatorId = 'nominator_id',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  ReadyAt = 'ready_at',
  /** column name */
  Shares = 'shares',
  /** column name */
  Status = 'status',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TotalAmount = 'total_amount',
  /** column name */
  UnlockExtrinsicHash = 'unlock_extrinsic_hash',
  /** column name */
  UnlockedAmount = 'unlocked_amount',
  /** column name */
  UnlockedAt = 'unlocked_at',
  /** column name */
  UnlockedStorageFee = 'unlocked_storage_fee',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WithdrawExtrinsicHash = 'withdraw_extrinsic_hash'
}

/** aggregate stddev on columns */
export type Staking_Withdrawals_Stddev_Fields = {
  __typename?: 'staking_withdrawals_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Stddev_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Staking_Withdrawals_Stddev_Pop_Fields = {
  __typename?: 'staking_withdrawals_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Stddev_Pop_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Staking_Withdrawals_Stddev_Samp_Fields = {
  __typename?: 'staking_withdrawals_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Stddev_Samp_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "staking_withdrawals" */
export type Staking_Withdrawals_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Staking_Withdrawals_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Staking_Withdrawals_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['numeric']['input']>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  epoch_withdrawal_requested_at?: InputMaybe<Scalars['numeric']['input']>;
  estimated_amount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nominator_id?: InputMaybe<Scalars['String']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  ready_at?: InputMaybe<Scalars['numeric']['input']>;
  shares?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
  unlock_extrinsic_hash?: InputMaybe<Scalars['String']['input']>;
  unlocked_amount?: InputMaybe<Scalars['numeric']['input']>;
  unlocked_at?: InputMaybe<Scalars['numeric']['input']>;
  unlocked_storage_fee?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['numeric']['input']>;
  withdraw_extrinsic_hash?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Staking_Withdrawals_Sum_Fields = {
  __typename?: 'staking_withdrawals_sum_fields';
  created_at?: Maybe<Scalars['numeric']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['numeric']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['numeric']['output']>;
  estimated_amount?: Maybe<Scalars['numeric']['output']>;
  ready_at?: Maybe<Scalars['numeric']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  unlocked_amount?: Maybe<Scalars['numeric']['output']>;
  unlocked_at?: Maybe<Scalars['numeric']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Sum_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Staking_Withdrawals_Var_Pop_Fields = {
  __typename?: 'staking_withdrawals_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Var_Pop_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Staking_Withdrawals_Var_Samp_Fields = {
  __typename?: 'staking_withdrawals_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Var_Samp_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Staking_Withdrawals_Variance_Fields = {
  __typename?: 'staking_withdrawals_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  domain_block_number_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  epoch_withdrawal_requested_at?: Maybe<Scalars['Float']['output']>;
  estimated_amount?: Maybe<Scalars['Float']['output']>;
  ready_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_amount?: Maybe<Scalars['Float']['output']>;
  unlocked_at?: Maybe<Scalars['Float']['output']>;
  unlocked_storage_fee?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "staking.withdrawals" */
export type Staking_Withdrawals_Variance_Order_By = {
  created_at?: InputMaybe<Order_By>;
  domain_block_number_withdrawal_requested_at?: InputMaybe<Order_By>;
  epoch_withdrawal_requested_at?: InputMaybe<Order_By>;
  estimated_amount?: InputMaybe<Order_By>;
  ready_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  unlocked_amount?: InputMaybe<Order_By>;
  unlocked_at?: InputMaybe<Order_By>;
  unlocked_storage_fee?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "accounts.accounts" */
  accounts_accounts: Array<Accounts_Accounts>;
  /** fetch aggregated fields from the table: "accounts.accounts" */
  accounts_accounts_aggregate: Accounts_Accounts_Aggregate;
  /** fetch data from the table: "accounts.accounts" using primary key columns */
  accounts_accounts_by_pk?: Maybe<Accounts_Accounts>;
  /** fetch data from the table in a streaming manner: "accounts.accounts" */
  accounts_accounts_stream: Array<Accounts_Accounts>;
  /** fetch data from the table: "accounts.balance_histories" */
  accounts_balance_histories: Array<Accounts_Balance_Histories>;
  /** fetch aggregated fields from the table: "accounts.balance_histories" */
  accounts_balance_histories_aggregate: Accounts_Balance_Histories_Aggregate;
  /** fetch data from the table: "accounts.balance_histories" using primary key columns */
  accounts_balance_histories_by_pk?: Maybe<Accounts_Balance_Histories>;
  /** fetch data from the table in a streaming manner: "accounts.balance_histories" */
  accounts_balance_histories_stream: Array<Accounts_Balance_Histories>;
  /** fetch data from the table: "accounts.rewards" */
  accounts_rewards: Array<Accounts_Rewards>;
  /** fetch aggregated fields from the table: "accounts.rewards" */
  accounts_rewards_aggregate: Accounts_Rewards_Aggregate;
  /** fetch data from the table: "accounts.rewards" using primary key columns */
  accounts_rewards_by_pk?: Maybe<Accounts_Rewards>;
  /** fetch data from the table in a streaming manner: "accounts.rewards" */
  accounts_rewards_stream: Array<Accounts_Rewards>;
  /** fetch data from the table: "accounts.transfers" */
  accounts_transfers: Array<Accounts_Transfers>;
  /** fetch aggregated fields from the table: "accounts.transfers" */
  accounts_transfers_aggregate: Accounts_Transfers_Aggregate;
  /** fetch data from the table: "accounts.transfers" using primary key columns */
  accounts_transfers_by_pk?: Maybe<Accounts_Transfers>;
  /** fetch data from the table in a streaming manner: "accounts.transfers" */
  accounts_transfers_stream: Array<Accounts_Transfers>;
  /** fetch data from the table: "consensus.blocks" */
  consensus_blocks: Array<Consensus_Blocks>;
  /** fetch aggregated fields from the table: "consensus.blocks" */
  consensus_blocks_aggregate: Consensus_Blocks_Aggregate;
  /** fetch data from the table: "consensus.blocks" using primary key columns */
  consensus_blocks_by_pk?: Maybe<Consensus_Blocks>;
  /** fetch data from the table in a streaming manner: "consensus.blocks" */
  consensus_blocks_stream: Array<Consensus_Blocks>;
  /** fetch data from the table: "consensus.event_modules" */
  consensus_event_modules: Array<Consensus_Event_Modules>;
  /** fetch aggregated fields from the table: "consensus.event_modules" */
  consensus_event_modules_aggregate: Consensus_Event_Modules_Aggregate;
  /** fetch data from the table: "consensus.event_modules" using primary key columns */
  consensus_event_modules_by_pk?: Maybe<Consensus_Event_Modules>;
  /** fetch data from the table in a streaming manner: "consensus.event_modules" */
  consensus_event_modules_stream: Array<Consensus_Event_Modules>;
  /** fetch data from the table: "consensus.events" */
  consensus_events: Array<Consensus_Events>;
  /** fetch aggregated fields from the table: "consensus.events" */
  consensus_events_aggregate: Consensus_Events_Aggregate;
  /** fetch data from the table: "consensus.events" using primary key columns */
  consensus_events_by_pk?: Maybe<Consensus_Events>;
  /** fetch data from the table in a streaming manner: "consensus.events" */
  consensus_events_stream: Array<Consensus_Events>;
  /** fetch data from the table: "consensus.extrinsic_modules" */
  consensus_extrinsic_modules: Array<Consensus_Extrinsic_Modules>;
  /** fetch aggregated fields from the table: "consensus.extrinsic_modules" */
  consensus_extrinsic_modules_aggregate: Consensus_Extrinsic_Modules_Aggregate;
  /** fetch data from the table: "consensus.extrinsic_modules" using primary key columns */
  consensus_extrinsic_modules_by_pk?: Maybe<Consensus_Extrinsic_Modules>;
  /** fetch data from the table in a streaming manner: "consensus.extrinsic_modules" */
  consensus_extrinsic_modules_stream: Array<Consensus_Extrinsic_Modules>;
  /** fetch data from the table: "consensus.extrinsics" */
  consensus_extrinsics: Array<Consensus_Extrinsics>;
  /** fetch aggregated fields from the table: "consensus.extrinsics" */
  consensus_extrinsics_aggregate: Consensus_Extrinsics_Aggregate;
  /** fetch data from the table: "consensus.extrinsics" using primary key columns */
  consensus_extrinsics_by_pk?: Maybe<Consensus_Extrinsics>;
  /** fetch data from the table in a streaming manner: "consensus.extrinsics" */
  consensus_extrinsics_stream: Array<Consensus_Extrinsics>;
  /** fetch data from the table: "consensus.log_kinds" */
  consensus_log_kinds: Array<Consensus_Log_Kinds>;
  /** fetch aggregated fields from the table: "consensus.log_kinds" */
  consensus_log_kinds_aggregate: Consensus_Log_Kinds_Aggregate;
  /** fetch data from the table: "consensus.log_kinds" using primary key columns */
  consensus_log_kinds_by_pk?: Maybe<Consensus_Log_Kinds>;
  /** fetch data from the table in a streaming manner: "consensus.log_kinds" */
  consensus_log_kinds_stream: Array<Consensus_Log_Kinds>;
  /** fetch data from the table: "consensus.logs" */
  consensus_logs: Array<Consensus_Logs>;
  /** fetch aggregated fields from the table: "consensus.logs" */
  consensus_logs_aggregate: Consensus_Logs_Aggregate;
  /** fetch data from the table: "consensus.logs" using primary key columns */
  consensus_logs_by_pk?: Maybe<Consensus_Logs>;
  /** fetch data from the table in a streaming manner: "consensus.logs" */
  consensus_logs_stream: Array<Consensus_Logs>;
  /** fetch data from the table: "consensus.sections" */
  consensus_sections: Array<Consensus_Sections>;
  /** fetch aggregated fields from the table: "consensus.sections" */
  consensus_sections_aggregate: Consensus_Sections_Aggregate;
  /** fetch data from the table: "consensus.sections" using primary key columns */
  consensus_sections_by_pk?: Maybe<Consensus_Sections>;
  /** fetch data from the table in a streaming manner: "consensus.sections" */
  consensus_sections_stream: Array<Consensus_Sections>;
  /** fetch data from the table: "dictionary.events" */
  dictionary_events: Array<Dictionary_Events>;
  /** fetch data from the table: "dictionary.events" using primary key columns */
  dictionary_events_by_pk?: Maybe<Dictionary_Events>;
  /** fetch data from the table in a streaming manner: "dictionary.events" */
  dictionary_events_stream: Array<Dictionary_Events>;
  /** fetch data from the table: "dictionary.extrinsics" */
  dictionary_extrinsics: Array<Dictionary_Extrinsics>;
  /** fetch data from the table: "dictionary.extrinsics" using primary key columns */
  dictionary_extrinsics_by_pk?: Maybe<Dictionary_Extrinsics>;
  /** fetch data from the table in a streaming manner: "dictionary.extrinsics" */
  dictionary_extrinsics_stream: Array<Dictionary_Extrinsics>;
  /** fetch data from the table: "dictionary.spec_versions" */
  dictionary_spec_versions: Array<Dictionary_Spec_Versions>;
  /** fetch data from the table: "dictionary.spec_versions" using primary key columns */
  dictionary_spec_versions_by_pk?: Maybe<Dictionary_Spec_Versions>;
  /** fetch data from the table in a streaming manner: "dictionary.spec_versions" */
  dictionary_spec_versions_stream: Array<Dictionary_Spec_Versions>;
  /** fetch data from the table: "leaderboard.account_extrinsic_failed_total_counts" */
  leaderboard_account_extrinsic_failed_total_counts: Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_extrinsic_failed_total_counts" */
  leaderboard_account_extrinsic_failed_total_counts_aggregate: Leaderboard_Account_Extrinsic_Failed_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_extrinsic_failed_total_counts" using primary key columns */
  leaderboard_account_extrinsic_failed_total_counts_by_pk?: Maybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_extrinsic_failed_total_counts" */
  leaderboard_account_extrinsic_failed_total_counts_stream: Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_extrinsic_success_total_counts" */
  leaderboard_account_extrinsic_success_total_counts: Array<Leaderboard_Account_Extrinsic_Success_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_extrinsic_success_total_counts" */
  leaderboard_account_extrinsic_success_total_counts_aggregate: Leaderboard_Account_Extrinsic_Success_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_extrinsic_success_total_counts" using primary key columns */
  leaderboard_account_extrinsic_success_total_counts_by_pk?: Maybe<Leaderboard_Account_Extrinsic_Success_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_extrinsic_success_total_counts" */
  leaderboard_account_extrinsic_success_total_counts_stream: Array<Leaderboard_Account_Extrinsic_Success_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_extrinsic_total_counts" */
  leaderboard_account_extrinsic_total_counts: Array<Leaderboard_Account_Extrinsic_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_extrinsic_total_counts" */
  leaderboard_account_extrinsic_total_counts_aggregate: Leaderboard_Account_Extrinsic_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_extrinsic_total_counts" using primary key columns */
  leaderboard_account_extrinsic_total_counts_by_pk?: Maybe<Leaderboard_Account_Extrinsic_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_extrinsic_total_counts" */
  leaderboard_account_extrinsic_total_counts_stream: Array<Leaderboard_Account_Extrinsic_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_remark_counts" */
  leaderboard_account_remark_counts: Array<Leaderboard_Account_Remark_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_remark_counts" */
  leaderboard_account_remark_counts_aggregate: Leaderboard_Account_Remark_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_remark_counts" using primary key columns */
  leaderboard_account_remark_counts_by_pk?: Maybe<Leaderboard_Account_Remark_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_remark_counts" */
  leaderboard_account_remark_counts_stream: Array<Leaderboard_Account_Remark_Counts>;
  /** fetch data from the table: "leaderboard.account_transaction_fee_paid_total_values" */
  leaderboard_account_transaction_fee_paid_total_values: Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.account_transaction_fee_paid_total_values" */
  leaderboard_account_transaction_fee_paid_total_values_aggregate: Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.account_transaction_fee_paid_total_values" using primary key columns */
  leaderboard_account_transaction_fee_paid_total_values_by_pk?: Maybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_transaction_fee_paid_total_values" */
  leaderboard_account_transaction_fee_paid_total_values_stream: Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values>;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_counts" */
  leaderboard_account_transfer_receiver_total_counts: Array<Leaderboard_Account_Transfer_Receiver_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_receiver_total_counts" */
  leaderboard_account_transfer_receiver_total_counts_aggregate: Leaderboard_Account_Transfer_Receiver_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_counts" using primary key columns */
  leaderboard_account_transfer_receiver_total_counts_by_pk?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_transfer_receiver_total_counts" */
  leaderboard_account_transfer_receiver_total_counts_stream: Array<Leaderboard_Account_Transfer_Receiver_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_values" */
  leaderboard_account_transfer_receiver_total_values: Array<Leaderboard_Account_Transfer_Receiver_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_receiver_total_values" */
  leaderboard_account_transfer_receiver_total_values_aggregate: Leaderboard_Account_Transfer_Receiver_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_receiver_total_values" using primary key columns */
  leaderboard_account_transfer_receiver_total_values_by_pk?: Maybe<Leaderboard_Account_Transfer_Receiver_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_transfer_receiver_total_values" */
  leaderboard_account_transfer_receiver_total_values_stream: Array<Leaderboard_Account_Transfer_Receiver_Total_Values>;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_counts" */
  leaderboard_account_transfer_sender_total_counts: Array<Leaderboard_Account_Transfer_Sender_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_sender_total_counts" */
  leaderboard_account_transfer_sender_total_counts_aggregate: Leaderboard_Account_Transfer_Sender_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_counts" using primary key columns */
  leaderboard_account_transfer_sender_total_counts_by_pk?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_transfer_sender_total_counts" */
  leaderboard_account_transfer_sender_total_counts_stream: Array<Leaderboard_Account_Transfer_Sender_Total_Counts>;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_values" */
  leaderboard_account_transfer_sender_total_values: Array<Leaderboard_Account_Transfer_Sender_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.account_transfer_sender_total_values" */
  leaderboard_account_transfer_sender_total_values_aggregate: Leaderboard_Account_Transfer_Sender_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.account_transfer_sender_total_values" using primary key columns */
  leaderboard_account_transfer_sender_total_values_by_pk?: Maybe<Leaderboard_Account_Transfer_Sender_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.account_transfer_sender_total_values" */
  leaderboard_account_transfer_sender_total_values_stream: Array<Leaderboard_Account_Transfer_Sender_Total_Values>;
  /** fetch data from the table: "leaderboard.farmer_block_total_counts" */
  leaderboard_farmer_block_total_counts: Array<Leaderboard_Farmer_Block_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_block_total_counts" */
  leaderboard_farmer_block_total_counts_aggregate: Leaderboard_Farmer_Block_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_block_total_counts" using primary key columns */
  leaderboard_farmer_block_total_counts_by_pk?: Maybe<Leaderboard_Farmer_Block_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.farmer_block_total_counts" */
  leaderboard_farmer_block_total_counts_stream: Array<Leaderboard_Farmer_Block_Total_Counts>;
  /** fetch data from the table: "leaderboard.farmer_block_total_values" */
  leaderboard_farmer_block_total_values: Array<Leaderboard_Farmer_Block_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_block_total_values" */
  leaderboard_farmer_block_total_values_aggregate: Leaderboard_Farmer_Block_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_block_total_values" using primary key columns */
  leaderboard_farmer_block_total_values_by_pk?: Maybe<Leaderboard_Farmer_Block_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.farmer_block_total_values" */
  leaderboard_farmer_block_total_values_stream: Array<Leaderboard_Farmer_Block_Total_Values>;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_counts" */
  leaderboard_farmer_vote_and_block_total_counts: Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_and_block_total_counts" */
  leaderboard_farmer_vote_and_block_total_counts_aggregate: Leaderboard_Farmer_Vote_And_Block_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_counts" using primary key columns */
  leaderboard_farmer_vote_and_block_total_counts_by_pk?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.farmer_vote_and_block_total_counts" */
  leaderboard_farmer_vote_and_block_total_counts_stream: Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts>;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_values" */
  leaderboard_farmer_vote_and_block_total_values: Array<Leaderboard_Farmer_Vote_And_Block_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_and_block_total_values" */
  leaderboard_farmer_vote_and_block_total_values_aggregate: Leaderboard_Farmer_Vote_And_Block_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_and_block_total_values" using primary key columns */
  leaderboard_farmer_vote_and_block_total_values_by_pk?: Maybe<Leaderboard_Farmer_Vote_And_Block_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.farmer_vote_and_block_total_values" */
  leaderboard_farmer_vote_and_block_total_values_stream: Array<Leaderboard_Farmer_Vote_And_Block_Total_Values>;
  /** fetch data from the table: "leaderboard.farmer_vote_total_counts" */
  leaderboard_farmer_vote_total_counts: Array<Leaderboard_Farmer_Vote_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_total_counts" */
  leaderboard_farmer_vote_total_counts_aggregate: Leaderboard_Farmer_Vote_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_total_counts" using primary key columns */
  leaderboard_farmer_vote_total_counts_by_pk?: Maybe<Leaderboard_Farmer_Vote_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.farmer_vote_total_counts" */
  leaderboard_farmer_vote_total_counts_stream: Array<Leaderboard_Farmer_Vote_Total_Counts>;
  /** fetch data from the table: "leaderboard.farmer_vote_total_values" */
  leaderboard_farmer_vote_total_values: Array<Leaderboard_Farmer_Vote_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.farmer_vote_total_values" */
  leaderboard_farmer_vote_total_values_aggregate: Leaderboard_Farmer_Vote_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.farmer_vote_total_values" using primary key columns */
  leaderboard_farmer_vote_total_values_by_pk?: Maybe<Leaderboard_Farmer_Vote_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.farmer_vote_total_values" */
  leaderboard_farmer_vote_total_values_stream: Array<Leaderboard_Farmer_Vote_Total_Values>;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_counts" */
  leaderboard_nominator_deposits_total_counts: Array<Leaderboard_Nominator_Deposits_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.nominator_deposits_total_counts" */
  leaderboard_nominator_deposits_total_counts_aggregate: Leaderboard_Nominator_Deposits_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_counts" using primary key columns */
  leaderboard_nominator_deposits_total_counts_by_pk?: Maybe<Leaderboard_Nominator_Deposits_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.nominator_deposits_total_counts" */
  leaderboard_nominator_deposits_total_counts_stream: Array<Leaderboard_Nominator_Deposits_Total_Counts>;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_values" */
  leaderboard_nominator_deposits_total_values: Array<Leaderboard_Nominator_Deposits_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.nominator_deposits_total_values" */
  leaderboard_nominator_deposits_total_values_aggregate: Leaderboard_Nominator_Deposits_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.nominator_deposits_total_values" using primary key columns */
  leaderboard_nominator_deposits_total_values_by_pk?: Maybe<Leaderboard_Nominator_Deposits_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.nominator_deposits_total_values" */
  leaderboard_nominator_deposits_total_values_stream: Array<Leaderboard_Nominator_Deposits_Total_Values>;
  /** fetch data from the table: "leaderboard.nominator_withdrawals_total_counts" */
  leaderboard_nominator_withdrawals_total_counts: Array<Leaderboard_Nominator_Withdrawals_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.nominator_withdrawals_total_counts" */
  leaderboard_nominator_withdrawals_total_counts_aggregate: Leaderboard_Nominator_Withdrawals_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.nominator_withdrawals_total_counts" using primary key columns */
  leaderboard_nominator_withdrawals_total_counts_by_pk?: Maybe<Leaderboard_Nominator_Withdrawals_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.nominator_withdrawals_total_counts" */
  leaderboard_nominator_withdrawals_total_counts_stream: Array<Leaderboard_Nominator_Withdrawals_Total_Counts>;
  /** fetch data from the table: "leaderboard.operator_bundle_total_counts" */
  leaderboard_operator_bundle_total_counts: Array<Leaderboard_Operator_Bundle_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.operator_bundle_total_counts" */
  leaderboard_operator_bundle_total_counts_aggregate: Leaderboard_Operator_Bundle_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.operator_bundle_total_counts" using primary key columns */
  leaderboard_operator_bundle_total_counts_by_pk?: Maybe<Leaderboard_Operator_Bundle_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.operator_bundle_total_counts" */
  leaderboard_operator_bundle_total_counts_stream: Array<Leaderboard_Operator_Bundle_Total_Counts>;
  /** fetch data from the table: "leaderboard.operator_deposits_total_counts" */
  leaderboard_operator_deposits_total_counts: Array<Leaderboard_Operator_Deposits_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.operator_deposits_total_counts" */
  leaderboard_operator_deposits_total_counts_aggregate: Leaderboard_Operator_Deposits_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.operator_deposits_total_counts" using primary key columns */
  leaderboard_operator_deposits_total_counts_by_pk?: Maybe<Leaderboard_Operator_Deposits_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.operator_deposits_total_counts" */
  leaderboard_operator_deposits_total_counts_stream: Array<Leaderboard_Operator_Deposits_Total_Counts>;
  /** fetch data from the table: "leaderboard.operator_deposits_total_values" */
  leaderboard_operator_deposits_total_values: Array<Leaderboard_Operator_Deposits_Total_Values>;
  /** fetch aggregated fields from the table: "leaderboard.operator_deposits_total_values" */
  leaderboard_operator_deposits_total_values_aggregate: Leaderboard_Operator_Deposits_Total_Values_Aggregate;
  /** fetch data from the table: "leaderboard.operator_deposits_total_values" using primary key columns */
  leaderboard_operator_deposits_total_values_by_pk?: Maybe<Leaderboard_Operator_Deposits_Total_Values>;
  /** fetch data from the table in a streaming manner: "leaderboard.operator_deposits_total_values" */
  leaderboard_operator_deposits_total_values_stream: Array<Leaderboard_Operator_Deposits_Total_Values>;
  /** fetch data from the table: "leaderboard.operator_total_rewards_collecteds" */
  leaderboard_operator_total_rewards_collecteds: Array<Leaderboard_Operator_Total_Rewards_Collecteds>;
  /** fetch aggregated fields from the table: "leaderboard.operator_total_rewards_collecteds" */
  leaderboard_operator_total_rewards_collecteds_aggregate: Leaderboard_Operator_Total_Rewards_Collecteds_Aggregate;
  /** fetch data from the table: "leaderboard.operator_total_rewards_collecteds" using primary key columns */
  leaderboard_operator_total_rewards_collecteds_by_pk?: Maybe<Leaderboard_Operator_Total_Rewards_Collecteds>;
  /** fetch data from the table in a streaming manner: "leaderboard.operator_total_rewards_collecteds" */
  leaderboard_operator_total_rewards_collecteds_stream: Array<Leaderboard_Operator_Total_Rewards_Collecteds>;
  /** fetch data from the table: "leaderboard.operator_total_tax_collecteds" */
  leaderboard_operator_total_tax_collecteds: Array<Leaderboard_Operator_Total_Tax_Collecteds>;
  /** fetch aggregated fields from the table: "leaderboard.operator_total_tax_collecteds" */
  leaderboard_operator_total_tax_collecteds_aggregate: Leaderboard_Operator_Total_Tax_Collecteds_Aggregate;
  /** fetch data from the table: "leaderboard.operator_total_tax_collecteds" using primary key columns */
  leaderboard_operator_total_tax_collecteds_by_pk?: Maybe<Leaderboard_Operator_Total_Tax_Collecteds>;
  /** fetch data from the table in a streaming manner: "leaderboard.operator_total_tax_collecteds" */
  leaderboard_operator_total_tax_collecteds_stream: Array<Leaderboard_Operator_Total_Tax_Collecteds>;
  /** fetch data from the table: "leaderboard.operator_withdrawals_total_counts" */
  leaderboard_operator_withdrawals_total_counts: Array<Leaderboard_Operator_Withdrawals_Total_Counts>;
  /** fetch aggregated fields from the table: "leaderboard.operator_withdrawals_total_counts" */
  leaderboard_operator_withdrawals_total_counts_aggregate: Leaderboard_Operator_Withdrawals_Total_Counts_Aggregate;
  /** fetch data from the table: "leaderboard.operator_withdrawals_total_counts" using primary key columns */
  leaderboard_operator_withdrawals_total_counts_by_pk?: Maybe<Leaderboard_Operator_Withdrawals_Total_Counts>;
  /** fetch data from the table in a streaming manner: "leaderboard.operator_withdrawals_total_counts" */
  leaderboard_operator_withdrawals_total_counts_stream: Array<Leaderboard_Operator_Withdrawals_Total_Counts>;
  /** fetch data from the table: "staking.accounts" */
  staking_accounts: Array<Staking_Accounts>;
  /** fetch aggregated fields from the table: "staking.accounts" */
  staking_accounts_aggregate: Staking_Accounts_Aggregate;
  /** fetch data from the table: "staking.accounts" using primary key columns */
  staking_accounts_by_pk?: Maybe<Staking_Accounts>;
  /** fetch data from the table in a streaming manner: "staking.accounts" */
  staking_accounts_stream: Array<Staking_Accounts>;
  /** fetch data from the table: "staking.deposits" */
  staking_deposits: Array<Staking_Deposits>;
  /** fetch aggregated fields from the table: "staking.deposits" */
  staking_deposits_aggregate: Staking_Deposits_Aggregate;
  /** fetch data from the table: "staking.deposits" using primary key columns */
  staking_deposits_by_pk?: Maybe<Staking_Deposits>;
  /** fetch data from the table in a streaming manner: "staking.deposits" */
  staking_deposits_stream: Array<Staking_Deposits>;
  /** fetch data from the table: "staking.domains" */
  staking_domains: Array<Staking_Domains>;
  /** fetch aggregated fields from the table: "staking.domains" */
  staking_domains_aggregate: Staking_Domains_Aggregate;
  /** fetch data from the table: "staking.domains" using primary key columns */
  staking_domains_by_pk?: Maybe<Staking_Domains>;
  /** fetch data from the table in a streaming manner: "staking.domains" */
  staking_domains_stream: Array<Staking_Domains>;
  /** fetch data from the table: "staking.nominators" */
  staking_nominators: Array<Staking_Nominators>;
  /** fetch aggregated fields from the table: "staking.nominators" */
  staking_nominators_aggregate: Staking_Nominators_Aggregate;
  /** fetch data from the table: "staking.nominators" using primary key columns */
  staking_nominators_by_pk?: Maybe<Staking_Nominators>;
  /** fetch data from the table in a streaming manner: "staking.nominators" */
  staking_nominators_stream: Array<Staking_Nominators>;
  /** fetch data from the table: "staking.operators" */
  staking_operators: Array<Staking_Operators>;
  /** fetch aggregated fields from the table: "staking.operators" */
  staking_operators_aggregate: Staking_Operators_Aggregate;
  /** fetch data from the table: "staking.operators" using primary key columns */
  staking_operators_by_pk?: Maybe<Staking_Operators>;
  /** fetch data from the table in a streaming manner: "staking.operators" */
  staking_operators_stream: Array<Staking_Operators>;
  /** fetch data from the table: "staking.withdrawals" */
  staking_withdrawals: Array<Staking_Withdrawals>;
  /** fetch aggregated fields from the table: "staking.withdrawals" */
  staking_withdrawals_aggregate: Staking_Withdrawals_Aggregate;
  /** fetch data from the table: "staking.withdrawals" using primary key columns */
  staking_withdrawals_by_pk?: Maybe<Staking_Withdrawals>;
  /** fetch data from the table in a streaming manner: "staking.withdrawals" */
  staking_withdrawals_stream: Array<Staking_Withdrawals>;
};


export type Subscription_RootAccounts_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Accounts_Order_By>>;
  where?: InputMaybe<Accounts_Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_Accounts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccounts_Accounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_Balance_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Balance_Histories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Balance_Histories_Order_By>>;
  where?: InputMaybe<Accounts_Balance_Histories_Bool_Exp>;
};


export type Subscription_RootAccounts_Balance_Histories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Balance_Histories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Balance_Histories_Order_By>>;
  where?: InputMaybe<Accounts_Balance_Histories_Bool_Exp>;
};


export type Subscription_RootAccounts_Balance_Histories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccounts_Balance_Histories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Balance_Histories_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Balance_Histories_Bool_Exp>;
};


export type Subscription_RootAccounts_RewardsArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Rewards_Order_By>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};


export type Subscription_RootAccounts_Rewards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Rewards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Rewards_Order_By>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};


export type Subscription_RootAccounts_Rewards_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccounts_Rewards_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Rewards_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Rewards_Bool_Exp>;
};


export type Subscription_RootAccounts_TransfersArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Transfers_Order_By>>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
};


export type Subscription_RootAccounts_Transfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Accounts_Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Accounts_Transfers_Order_By>>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
};


export type Subscription_RootAccounts_Transfers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccounts_Transfers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Accounts_Transfers_Stream_Cursor_Input>>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
};


export type Subscription_RootConsensus_BlocksArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Blocks_Order_By>>;
  where?: InputMaybe<Consensus_Blocks_Bool_Exp>;
};


export type Subscription_RootConsensus_Blocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Blocks_Order_By>>;
  where?: InputMaybe<Consensus_Blocks_Bool_Exp>;
};


export type Subscription_RootConsensus_Blocks_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Blocks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Blocks_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Blocks_Bool_Exp>;
};


export type Subscription_RootConsensus_Event_ModulesArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Event_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


export type Subscription_RootConsensus_Event_Modules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Event_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Event_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


export type Subscription_RootConsensus_Event_Modules_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Event_Modules_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Event_Modules_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Event_Modules_Bool_Exp>;
};


export type Subscription_RootConsensus_EventsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


export type Subscription_RootConsensus_Events_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Events_Order_By>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


export type Subscription_RootConsensus_Events_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
};


export type Subscription_RootConsensus_Extrinsic_ModulesArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsic_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};


export type Subscription_RootConsensus_Extrinsic_Modules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsic_Modules_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsic_Modules_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};


export type Subscription_RootConsensus_Extrinsic_Modules_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Extrinsic_Modules_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Extrinsic_Modules_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Extrinsic_Modules_Bool_Exp>;
};


export type Subscription_RootConsensus_ExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


export type Subscription_RootConsensus_Extrinsics_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Extrinsics_Order_By>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


export type Subscription_RootConsensus_Extrinsics_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Extrinsics_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Extrinsics_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
};


export type Subscription_RootConsensus_Log_KindsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Log_Kinds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Log_Kinds_Order_By>>;
  where?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
};


export type Subscription_RootConsensus_Log_Kinds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Log_Kinds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Log_Kinds_Order_By>>;
  where?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
};


export type Subscription_RootConsensus_Log_Kinds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Log_Kinds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Log_Kinds_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Log_Kinds_Bool_Exp>;
};


export type Subscription_RootConsensus_LogsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


export type Subscription_RootConsensus_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Logs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Logs_Order_By>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


export type Subscription_RootConsensus_Logs_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Logs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Logs_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
};


export type Subscription_RootConsensus_SectionsArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Sections_Order_By>>;
  where?: InputMaybe<Consensus_Sections_Bool_Exp>;
};


export type Subscription_RootConsensus_Sections_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Consensus_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Consensus_Sections_Order_By>>;
  where?: InputMaybe<Consensus_Sections_Bool_Exp>;
};


export type Subscription_RootConsensus_Sections_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootConsensus_Sections_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Consensus_Sections_Stream_Cursor_Input>>;
  where?: InputMaybe<Consensus_Sections_Bool_Exp>;
};


export type Subscription_RootDictionary_EventsArgs = {
  distinct_on?: InputMaybe<Array<Dictionary_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dictionary_Events_Order_By>>;
  where?: InputMaybe<Dictionary_Events_Bool_Exp>;
};


export type Subscription_RootDictionary_Events_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDictionary_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dictionary_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Dictionary_Events_Bool_Exp>;
};


export type Subscription_RootDictionary_ExtrinsicsArgs = {
  distinct_on?: InputMaybe<Array<Dictionary_Extrinsics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dictionary_Extrinsics_Order_By>>;
  where?: InputMaybe<Dictionary_Extrinsics_Bool_Exp>;
};


export type Subscription_RootDictionary_Extrinsics_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDictionary_Extrinsics_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dictionary_Extrinsics_Stream_Cursor_Input>>;
  where?: InputMaybe<Dictionary_Extrinsics_Bool_Exp>;
};


export type Subscription_RootDictionary_Spec_VersionsArgs = {
  distinct_on?: InputMaybe<Array<Dictionary_Spec_Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dictionary_Spec_Versions_Order_By>>;
  where?: InputMaybe<Dictionary_Spec_Versions_Bool_Exp>;
};


export type Subscription_RootDictionary_Spec_Versions_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDictionary_Spec_Versions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dictionary_Spec_Versions_Stream_Cursor_Input>>;
  where?: InputMaybe<Dictionary_Spec_Versions_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Failed_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Failed_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Failed_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Failed_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Success_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Success_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Success_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Success_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Extrinsic_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Extrinsic_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Remark_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Remark_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Remark_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Remark_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Remark_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Remark_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transaction_Fee_Paid_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transaction_Fee_Paid_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transaction_Fee_Paid_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Transaction_Fee_Paid_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Transfer_Receiver_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Account_Transfer_Sender_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Account_Transfer_Sender_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Farmer_Block_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Farmer_Block_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Farmer_Vote_And_Block_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Farmer_Vote_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Farmer_Vote_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Nominator_Deposits_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Withdrawals_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Withdrawals_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Nominator_Withdrawals_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Nominator_Withdrawals_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Bundle_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Bundle_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Bundle_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Bundle_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Operator_Bundle_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_ValuesArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_Values_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Deposits_Total_Values_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_Values_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Operator_Deposits_Total_Values_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Total_Rewards_CollectedsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Total_Rewards_Collecteds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Rewards_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Total_Rewards_Collecteds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Operator_Total_Rewards_Collecteds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Total_Tax_CollectedsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Total_Tax_Collecteds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Total_Tax_Collecteds_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Total_Tax_Collecteds_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Operator_Total_Tax_Collecteds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Withdrawals_Total_CountsArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Withdrawals_Total_Counts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Leaderboard_Operator_Withdrawals_Total_Counts_Order_By>>;
  where?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Subscription_RootLeaderboard_Operator_Withdrawals_Total_Counts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootLeaderboard_Operator_Withdrawals_Total_Counts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Stream_Cursor_Input>>;
  where?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
};


export type Subscription_RootStaking_AccountsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Accounts_Order_By>>;
  where?: InputMaybe<Staking_Accounts_Bool_Exp>;
};


export type Subscription_RootStaking_Accounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Accounts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Accounts_Order_By>>;
  where?: InputMaybe<Staking_Accounts_Bool_Exp>;
};


export type Subscription_RootStaking_Accounts_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStaking_Accounts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Staking_Accounts_Stream_Cursor_Input>>;
  where?: InputMaybe<Staking_Accounts_Bool_Exp>;
};


export type Subscription_RootStaking_DepositsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


export type Subscription_RootStaking_Deposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Deposits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Deposits_Order_By>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


export type Subscription_RootStaking_Deposits_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStaking_Deposits_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Staking_Deposits_Stream_Cursor_Input>>;
  where?: InputMaybe<Staking_Deposits_Bool_Exp>;
};


export type Subscription_RootStaking_DomainsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Domains_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Domains_Order_By>>;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
};


export type Subscription_RootStaking_Domains_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Domains_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Domains_Order_By>>;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
};


export type Subscription_RootStaking_Domains_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStaking_Domains_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Staking_Domains_Stream_Cursor_Input>>;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
};


export type Subscription_RootStaking_NominatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


export type Subscription_RootStaking_Nominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Nominators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Nominators_Order_By>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


export type Subscription_RootStaking_Nominators_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStaking_Nominators_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Staking_Nominators_Stream_Cursor_Input>>;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
};


export type Subscription_RootStaking_OperatorsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Operators_Order_By>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


export type Subscription_RootStaking_Operators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Operators_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Operators_Order_By>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


export type Subscription_RootStaking_Operators_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStaking_Operators_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Staking_Operators_Stream_Cursor_Input>>;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
};


export type Subscription_RootStaking_WithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


export type Subscription_RootStaking_Withdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Staking_Withdrawals_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Staking_Withdrawals_Order_By>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};


export type Subscription_RootStaking_Withdrawals_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootStaking_Withdrawals_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Staking_Withdrawals_Stream_Cursor_Input>>;
  where?: InputMaybe<Staking_Withdrawals_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

export type AccountsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AccountsQuery = { __typename?: 'query_root', accounts_accounts_aggregate: { __typename?: 'accounts_accounts_aggregate', aggregate?: { __typename?: 'accounts_accounts_aggregate_fields', count: number } | null }, accounts_accounts: Array<{ __typename?: 'accounts_accounts', id: string, free: any, reserved: any, total?: any | null, updated_at: any, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, timestamp: any, block?: { __typename?: 'consensus_blocks', height: any, hash: string } | null }> }> };

export type AccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type AccountByIdQuery = { __typename?: 'query_root', accounts_accounts_by_pk?: { __typename?: 'accounts_accounts', id: string, free: any, reserved: any, total?: any | null, nonce: any, updated_at: any, extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, id: string, index_in_block: number, name: string, success: boolean, timestamp: any, tip: any, block?: { __typename?: 'consensus_blocks', id: string, height: any } | null }> } | null, accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, index_in_block: any, amount: any, timestamp: any, blockHeight: any, rewardType: string }> };

export type LatestRewardsWeekQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  timestampComparison: Timestamp_Comparison_Exp;
}>;


export type LatestRewardsWeekQuery = { __typename?: 'query_root', accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, block_height: any, index_in_block: any, reward_type: string, amount: any, timestamp: any }> };

export type RewardsListQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy: Array<Accounts_Rewards_Order_By> | Accounts_Rewards_Order_By;
}>;


export type RewardsListQuery = { __typename?: 'query_root', accounts_rewards_aggregate: { __typename?: 'accounts_rewards_aggregate', aggregate?: { __typename?: 'accounts_rewards_aggregate_fields', count: number } | null }, accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, block_height: any, index_in_block: any, reward_type: string, amount: any, timestamp: any, block?: { __typename?: 'consensus_blocks', hash: string, id: string, height: any } | null, account?: { __typename?: 'accounts_accounts', id: string, free: any, reserved: any, total?: any | null, updated_at: any } | null }> };

export type ExtrinsicsByAccountIdQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  orderBy: Array<Consensus_Extrinsics_Order_By> | Consensus_Extrinsics_Order_By;
}>;


export type ExtrinsicsByAccountIdQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, name: string, success: boolean, block_height: any, timestamp: any, index_in_block: number }> };

export type TransfersByAccountIdQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
  orderBy: Array<Accounts_Transfers_Order_By> | Accounts_Transfers_Order_By;
}>;


export type TransfersByAccountIdQuery = { __typename?: 'query_root', accounts_transfers_aggregate: { __typename?: 'accounts_transfers_aggregate', aggregate?: { __typename?: 'accounts_transfers_aggregate_fields', count: number } | null }, accounts_transfers: Array<{ __typename?: 'accounts_transfers', id: string, extrinsic_id: string, event_id: string, from: string, to: string, value: any, fee: any, success: boolean, timestamp: any, date: any, created_at: any }> };

export type AllRewardForAccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type AllRewardForAccountByIdQuery = { __typename?: 'query_root', accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, block_height: any, index_in_block: any, reward_type: string, amount: any, timestamp: any }> };

export type BlocksQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Consensus_Blocks_Order_By> | Consensus_Blocks_Order_By;
}>;


export type BlocksQuery = { __typename?: 'query_root', consensus_blocks_aggregate: { __typename?: 'consensus_blocks_aggregate', aggregate?: { __typename?: 'consensus_blocks_aggregate_fields', count: number } | null }, consensus_blocks: Array<{ __typename?: 'consensus_blocks', blockchain_size: any, extrinsics_root: string, hash: string, height: any, id: string, parent_hash: string, space_pledged: any, spec_id: string, state_root: string, timestamp: any, author_id: string, events: Array<{ __typename?: 'consensus_events', id: string }>, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string }> }> };

export type BlockByIdQueryVariables = Exact<{
  blockId: Scalars['String']['input'];
}>;


export type BlockByIdQuery = { __typename?: 'query_root', consensus_blocks_by_pk?: { __typename?: 'consensus_blocks', id: string, height: any, hash: string, state_root: string, timestamp: any, extrinsics_root: string, spec_id: string, parent_hash: string, extrinsics_count: number, events_count: number, author_id: string, logs: Array<{ __typename?: 'consensus_logs', block_height: any, kind: string, id: string, block?: { __typename?: 'consensus_blocks', timestamp: any } | null }> } | null };

export type ExtrinsicsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['numeric']['input'];
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExtrinsicsByBlockIdQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, name: string, success: boolean, block_height: any, timestamp: any, index_in_block: number }> };

export type EventsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['numeric']['input'];
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EventsByBlockIdQuery = { __typename?: 'query_root', consensus_events_aggregate: { __typename?: 'consensus_events_aggregate', aggregate?: { __typename?: 'consensus_events_aggregate_fields', count: number } | null }, consensus_events: Array<{ __typename?: 'consensus_events', id: string, name: string, phase: string, index_in_block: any, block_height: any, extrinsic_id: string }> };

export type BlocksByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type BlocksByHashQuery = { __typename?: 'query_root', consensus_blocks: Array<{ __typename?: 'consensus_blocks', id: string, height: any }> };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
}>;


export type EventsQuery = { __typename?: 'query_root', consensus_events_aggregate: { __typename?: 'consensus_events_aggregate', aggregate?: { __typename?: 'consensus_events_aggregate_fields', count: number } | null }, consensus_events: Array<{ __typename?: 'consensus_events', args: string, id: string, index_in_block: any, name: string, phase: string, timestamp: any, block?: { __typename?: 'consensus_blocks', id: string, timestamp: any, height: any } | null }>, consensus_event_modules: Array<{ __typename?: 'consensus_event_modules', method: string }> };

export type EventByIdQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type EventByIdQuery = { __typename?: 'query_root', consensus_events_by_pk?: { __typename?: 'consensus_events', args: string, id: string, index_in_block: any, name: string, phase: string, timestamp: any, extrinsic?: { __typename?: 'consensus_extrinsics', args: string, success: boolean, tip: any, fee: any, id: string, signer: string } | null, block?: { __typename?: 'consensus_blocks', height: any, id: string, timestamp: any, spec_id: string, hash: string } | null } | null };

export type ExtrinsicsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
}>;


export type ExtrinsicsQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, block_height: any, index_in_block: number, success: boolean, name: string, nonce: any, timestamp: any }>, consensus_extrinsic_modules: Array<{ __typename?: 'consensus_extrinsic_modules', method: string }> };

export type ExtrinsicsByIdQueryVariables = Exact<{
  extrinsicId: Scalars['String']['input'];
}>;


export type ExtrinsicsByIdQuery = { __typename?: 'query_root', consensus_extrinsics_by_pk?: { __typename?: 'consensus_extrinsics', id: string, index_in_block: number, hash: string, block_height: any, timestamp: any, signature: string, success: boolean, tip: any, args: string, signer: string, name: string, events: Array<{ __typename?: 'consensus_events', id: string, phase: string, timestamp: any, name: string, args: string, extrinsic_id: string }> } | null };

export type ExtrinsicsByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type ExtrinsicsByHashQuery = { __typename?: 'query_root', consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, index_in_block: number, success: boolean, name: string, nonce: any, block?: { __typename?: 'consensus_blocks', id: string, timestamp: any, height: any } | null }> };

export type HomeQueryQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  accountTotal: Scalars['numeric']['input'];
}>;


export type HomeQueryQuery = { __typename?: 'query_root', consensus_blocks: Array<{ __typename?: 'consensus_blocks', id: string, hash: string, height: any, timestamp: any, state_root: string, blockchain_size: any, space_pledged: any, extrinsics_count: number, events_count: number }>, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, id: string, success: boolean, index_in_block: number, timestamp: any, name: string, block?: { __typename?: 'consensus_blocks', id: string, height: any } | null }>, accounts_accounts_aggregate: { __typename?: 'accounts_accounts_aggregate', aggregate?: { __typename?: 'accounts_accounts_aggregate_fields', count: number } | null }, consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null } };

export type LogsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
}>;


export type LogsQuery = { __typename?: 'query_root', consensus_logs_aggregate: { __typename?: 'consensus_logs_aggregate', aggregate?: { __typename?: 'consensus_logs_aggregate_fields', count: number } | null }, consensus_logs: Array<{ __typename?: 'consensus_logs', id: string, kind: string, value?: string | null, block_height: any, timestamp: any }> };

export type LogByIdQueryVariables = Exact<{
  logId: Scalars['String']['input'];
}>;


export type LogByIdQuery = { __typename?: 'query_root', consensus_logs_by_pk?: { __typename?: 'consensus_logs', id: string, kind: string, value?: string | null, block_height: any, timestamp: any, block?: { __typename?: 'consensus_blocks', id: string, events: Array<{ __typename?: 'consensus_events', id: string, args: string, name: string, phase: string, timestamp: any, block_height: any, extrinsic_id: string }> } | null } | null };

export type DomainsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Staking_Domains_Order_By> | Staking_Domains_Order_By;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
}>;


export type DomainsListQuery = { __typename?: 'query_root', staking_domains_aggregate: { __typename?: 'staking_domains_aggregate', aggregate?: { __typename?: 'staking_domains_aggregate_fields', count: number } | null }, staking_domains: Array<{ __typename?: 'staking_domains', id: string, sort_id: any, name: string, account_id: string, bundle_count: any, total_volume: any, total_tax_collected: any, total_rewards_collected: any, total_domain_execution_fee: any, total_deposits: any, total_consensus_storage_fee: any, total_burned_balance: any, runtime_info: string, runtime_id: number, runtime: string, last_domain_block_number: any, last_bundle_at: any, current_total_stake: any, current_storage_fee_deposit: any, created_at: any, completed_epoch: any, total_transfers_in: any, transfers_in_count: any, total_transfers_out: any, transfers_out_count: any, total_rejected_transfers_claimed: any, rejected_transfers_claimed_count: any, total_transfers_rejected: any, transfers_rejected_count: any, updated_at: any, total_estimated_withdrawals: any, total_withdrawals: any, current_total_shares: any, current_share_price: any, accumulated_epoch_stake: any, accumulated_epoch_storage_fee_deposit: any, accumulated_epoch_rewards: any, accumulated_epoch_shares: any, current_epoch_duration: any, last_epoch_duration: any, last6_epochs_duration: any, last144_epoch_duration: any, last1k_epoch_duration: any, operators_aggregate: { __typename?: 'staking_operators_aggregate', aggregate?: { __typename?: 'staking_operators_aggregate_fields', count: number } | null }, nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null } }> };

export type DomainsStatusQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Staking_Domains_Order_By> | Staking_Domains_Order_By;
  where?: InputMaybe<Staking_Domains_Bool_Exp>;
}>;


export type DomainsStatusQuery = { __typename?: 'query_root', staking_domains: Array<{ __typename?: 'staking_domains', id: string, name: string, last_domain_block_number: any, completed_epoch: any, current_epoch_duration: any, last_epoch_duration: any, last6_epochs_duration: any, last144_epoch_duration: any, last1k_epoch_duration: any }> };

export type DomainByIdQueryVariables = Exact<{
  domainId: Scalars['String']['input'];
}>;


export type DomainByIdQuery = { __typename?: 'query_root', staking_domains_by_pk?: { __typename?: 'staking_domains', id: string, sort_id: any, name: string, account_id: string, bundle_count: any, total_volume: any, total_tax_collected: any, total_rewards_collected: any, total_domain_execution_fee: any, total_deposits: any, total_consensus_storage_fee: any, total_burned_balance: any, runtime_info: string, runtime_id: number, runtime: string, last_domain_block_number: any, last_bundle_at: any, current_total_stake: any, current_storage_fee_deposit: any, created_at: any, completed_epoch: any, total_transfers_in: any, transfers_in_count: any, total_transfers_out: any, transfers_out_count: any, total_rejected_transfers_claimed: any, rejected_transfers_claimed_count: any, total_transfers_rejected: any, transfers_rejected_count: any, updated_at: any, total_estimated_withdrawals: any, total_withdrawals: any, accumulated_epoch_stake: any, accumulated_epoch_storage_fee_deposit: any, operators_aggregate: { __typename?: 'staking_operators_aggregate', aggregate?: { __typename?: 'staking_operators_aggregate_fields', count: number } | null }, nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null }, deposits_aggregate: { __typename?: 'staking_deposits_aggregate', aggregate?: { __typename?: 'staking_deposits_aggregate_fields', count: number } | null }, withdrawals_aggregate: { __typename?: 'staking_withdrawals_aggregate', aggregate?: { __typename?: 'staking_withdrawals_aggregate_fields', count: number } | null } } | null };

export type AccountTransferSenderTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By> | Leaderboard_Account_Transfer_Sender_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Counts_Bool_Exp>;
}>;


export type AccountTransferSenderTotalCountQuery = { __typename?: 'query_root', leaderboard_account_transfer_sender_total_counts_aggregate: { __typename?: 'leaderboard_account_transfer_sender_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_account_transfer_sender_total_counts_aggregate_fields', count: number } | null }, leaderboard_account_transfer_sender_total_counts: Array<{ __typename?: 'leaderboard_account_transfer_sender_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransferSenderTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Transfer_Sender_Total_Values_Order_By> | Leaderboard_Account_Transfer_Sender_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Account_Transfer_Sender_Total_Values_Bool_Exp>;
}>;


export type AccountTransferSenderTotalValueQuery = { __typename?: 'query_root', leaderboard_account_transfer_sender_total_values_aggregate: { __typename?: 'leaderboard_account_transfer_sender_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_account_transfer_sender_total_values_aggregate_fields', count: number } | null }, leaderboard_account_transfer_sender_total_values: Array<{ __typename?: 'leaderboard_account_transfer_sender_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransferReceiverTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By> | Leaderboard_Account_Transfer_Receiver_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Counts_Bool_Exp>;
}>;


export type AccountTransferReceiverTotalCountQuery = { __typename?: 'query_root', leaderboard_account_transfer_receiver_total_counts_aggregate: { __typename?: 'leaderboard_account_transfer_receiver_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_account_transfer_receiver_total_counts_aggregate_fields', count: number } | null }, leaderboard_account_transfer_receiver_total_counts: Array<{ __typename?: 'leaderboard_account_transfer_receiver_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransferReceiverTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By> | Leaderboard_Account_Transfer_Receiver_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Account_Transfer_Receiver_Total_Values_Bool_Exp>;
}>;


export type AccountTransferReceiverTotalValueQuery = { __typename?: 'query_root', leaderboard_account_transfer_receiver_total_values_aggregate: { __typename?: 'leaderboard_account_transfer_receiver_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_account_transfer_receiver_total_values_aggregate_fields', count: number } | null }, leaderboard_account_transfer_receiver_total_values: Array<{ __typename?: 'leaderboard_account_transfer_receiver_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountRemarkCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Remark_Counts_Order_By> | Leaderboard_Account_Remark_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Account_Remark_Counts_Bool_Exp>;
}>;


export type AccountRemarkCountQuery = { __typename?: 'query_root', leaderboard_account_remark_counts_aggregate: { __typename?: 'leaderboard_account_remark_counts_aggregate', aggregate?: { __typename?: 'leaderboard_account_remark_counts_aggregate_fields', count: number } | null }, leaderboard_account_remark_counts: Array<{ __typename?: 'leaderboard_account_remark_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountExtrinsicTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Extrinsic_Total_Counts_Order_By> | Leaderboard_Account_Extrinsic_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Total_Counts_Bool_Exp>;
}>;


export type AccountExtrinsicTotalCountQuery = { __typename?: 'query_root', leaderboard_account_extrinsic_total_counts_aggregate: { __typename?: 'leaderboard_account_extrinsic_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_account_extrinsic_total_counts_aggregate_fields', count: number } | null }, leaderboard_account_extrinsic_total_counts: Array<{ __typename?: 'leaderboard_account_extrinsic_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountExtrinsicSuccessTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By> | Leaderboard_Account_Extrinsic_Success_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Success_Total_Counts_Bool_Exp>;
}>;


export type AccountExtrinsicSuccessTotalCountQuery = { __typename?: 'query_root', leaderboard_account_extrinsic_success_total_counts_aggregate: { __typename?: 'leaderboard_account_extrinsic_success_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_account_extrinsic_success_total_counts_aggregate_fields', count: number } | null }, leaderboard_account_extrinsic_success_total_counts: Array<{ __typename?: 'leaderboard_account_extrinsic_success_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountExtrinsicFailedTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By> | Leaderboard_Account_Extrinsic_Failed_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Account_Extrinsic_Failed_Total_Counts_Bool_Exp>;
}>;


export type AccountExtrinsicFailedTotalCountQuery = { __typename?: 'query_root', leaderboard_account_extrinsic_failed_total_counts_aggregate: { __typename?: 'leaderboard_account_extrinsic_failed_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_account_extrinsic_failed_total_counts_aggregate_fields', count: number } | null }, leaderboard_account_extrinsic_failed_total_counts: Array<{ __typename?: 'leaderboard_account_extrinsic_failed_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransactionFeePaidTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By> | Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Account_Transaction_Fee_Paid_Total_Values_Bool_Exp>;
}>;


export type AccountTransactionFeePaidTotalValueQuery = { __typename?: 'query_root', leaderboard_account_transaction_fee_paid_total_values_aggregate: { __typename?: 'leaderboard_account_transaction_fee_paid_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_account_transaction_fee_paid_total_values_aggregate_fields', count: number } | null }, leaderboard_account_transaction_fee_paid_total_values: Array<{ __typename?: 'leaderboard_account_transaction_fee_paid_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Farmer_Vote_Total_Counts_Order_By> | Leaderboard_Farmer_Vote_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Counts_Bool_Exp>;
}>;


export type FarmerVoteTotalCountQuery = { __typename?: 'query_root', leaderboard_farmer_vote_total_counts_aggregate: { __typename?: 'leaderboard_farmer_vote_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_farmer_vote_total_counts_aggregate_fields', count: number } | null }, leaderboard_farmer_vote_total_counts: Array<{ __typename?: 'leaderboard_farmer_vote_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Farmer_Vote_Total_Values_Order_By> | Leaderboard_Farmer_Vote_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Farmer_Vote_Total_Values_Bool_Exp>;
}>;


export type FarmerVoteTotalValueQuery = { __typename?: 'query_root', leaderboard_farmer_vote_total_values_aggregate: { __typename?: 'leaderboard_farmer_vote_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_farmer_vote_total_values_aggregate_fields', count: number } | null }, leaderboard_farmer_vote_total_values: Array<{ __typename?: 'leaderboard_farmer_vote_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerBlockTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Farmer_Block_Total_Counts_Order_By> | Leaderboard_Farmer_Block_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Counts_Bool_Exp>;
}>;


export type FarmerBlockTotalCountQuery = { __typename?: 'query_root', leaderboard_farmer_block_total_counts_aggregate: { __typename?: 'leaderboard_farmer_block_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_farmer_block_total_counts_aggregate_fields', count: number } | null }, leaderboard_farmer_block_total_counts: Array<{ __typename?: 'leaderboard_farmer_block_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerBlockTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Farmer_Block_Total_Values_Order_By> | Leaderboard_Farmer_Block_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Farmer_Block_Total_Values_Bool_Exp>;
}>;


export type FarmerBlockTotalValueQuery = { __typename?: 'query_root', leaderboard_farmer_block_total_values_aggregate: { __typename?: 'leaderboard_farmer_block_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_farmer_block_total_values_aggregate_fields', count: number } | null }, leaderboard_farmer_block_total_values: Array<{ __typename?: 'leaderboard_farmer_block_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorTotalRewardsCollectedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Operator_Total_Rewards_Collecteds_Order_By> | Leaderboard_Operator_Total_Rewards_Collecteds_Order_By;
  where?: InputMaybe<Leaderboard_Operator_Total_Rewards_Collecteds_Bool_Exp>;
}>;


export type OperatorTotalRewardsCollectedQuery = { __typename?: 'query_root', leaderboard_operator_total_rewards_collecteds_aggregate: { __typename?: 'leaderboard_operator_total_rewards_collecteds_aggregate', aggregate?: { __typename?: 'leaderboard_operator_total_rewards_collecteds_aggregate_fields', count: number } | null }, leaderboard_operator_total_rewards_collecteds: Array<{ __typename?: 'leaderboard_operator_total_rewards_collecteds', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorTotalTaxCollectedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Operator_Total_Tax_Collecteds_Order_By> | Leaderboard_Operator_Total_Tax_Collecteds_Order_By;
  where?: InputMaybe<Leaderboard_Operator_Total_Tax_Collecteds_Bool_Exp>;
}>;


export type OperatorTotalTaxCollectedQuery = { __typename?: 'query_root', leaderboard_operator_total_tax_collecteds_aggregate: { __typename?: 'leaderboard_operator_total_tax_collecteds_aggregate', aggregate?: { __typename?: 'leaderboard_operator_total_tax_collecteds_aggregate_fields', count: number } | null }, leaderboard_operator_total_tax_collecteds: Array<{ __typename?: 'leaderboard_operator_total_tax_collecteds', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorBundleTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Operator_Bundle_Total_Counts_Order_By> | Leaderboard_Operator_Bundle_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Operator_Bundle_Total_Counts_Bool_Exp>;
}>;


export type OperatorBundleTotalCountQuery = { __typename?: 'query_root', leaderboard_operator_bundle_total_counts_aggregate: { __typename?: 'leaderboard_operator_bundle_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_operator_bundle_total_counts_aggregate_fields', count: number } | null }, leaderboard_operator_bundle_total_counts: Array<{ __typename?: 'leaderboard_operator_bundle_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorDepositsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Operator_Deposits_Total_Counts_Order_By> | Leaderboard_Operator_Deposits_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Counts_Bool_Exp>;
}>;


export type OperatorDepositsTotalCountQuery = { __typename?: 'query_root', leaderboard_operator_deposits_total_counts_aggregate: { __typename?: 'leaderboard_operator_deposits_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_operator_deposits_total_counts_aggregate_fields', count: number } | null }, leaderboard_operator_deposits_total_counts: Array<{ __typename?: 'leaderboard_operator_deposits_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorDepositsTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Operator_Deposits_Total_Values_Order_By> | Leaderboard_Operator_Deposits_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Operator_Deposits_Total_Values_Bool_Exp>;
}>;


export type OperatorDepositsTotalValueQuery = { __typename?: 'query_root', leaderboard_operator_deposits_total_values_aggregate: { __typename?: 'leaderboard_operator_deposits_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_operator_deposits_total_values_aggregate_fields', count: number } | null }, leaderboard_operator_deposits_total_values: Array<{ __typename?: 'leaderboard_operator_deposits_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorWithdrawalsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Operator_Withdrawals_Total_Counts_Order_By> | Leaderboard_Operator_Withdrawals_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Operator_Withdrawals_Total_Counts_Bool_Exp>;
}>;


export type OperatorWithdrawalsTotalCountQuery = { __typename?: 'query_root', leaderboard_operator_withdrawals_total_counts_aggregate: { __typename?: 'leaderboard_operator_withdrawals_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_operator_withdrawals_total_counts_aggregate_fields', count: number } | null }, leaderboard_operator_withdrawals_total_counts: Array<{ __typename?: 'leaderboard_operator_withdrawals_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominatorDepositsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Nominator_Deposits_Total_Counts_Order_By> | Leaderboard_Nominator_Deposits_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Counts_Bool_Exp>;
}>;


export type NominatorDepositsTotalCountQuery = { __typename?: 'query_root', leaderboard_nominator_deposits_total_counts_aggregate: { __typename?: 'leaderboard_nominator_deposits_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_nominator_deposits_total_counts_aggregate_fields', count: number } | null }, leaderboard_nominator_deposits_total_counts: Array<{ __typename?: 'leaderboard_nominator_deposits_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominatorDepositsTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Nominator_Deposits_Total_Values_Order_By> | Leaderboard_Nominator_Deposits_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Nominator_Deposits_Total_Values_Bool_Exp>;
}>;


export type NominatorDepositsTotalValueQuery = { __typename?: 'query_root', leaderboard_nominator_deposits_total_values_aggregate: { __typename?: 'leaderboard_nominator_deposits_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_nominator_deposits_total_values_aggregate_fields', count: number } | null }, leaderboard_nominator_deposits_total_values: Array<{ __typename?: 'leaderboard_nominator_deposits_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominatorWithdrawalsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By> | Leaderboard_Nominator_Withdrawals_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Nominator_Withdrawals_Total_Counts_Bool_Exp>;
}>;


export type NominatorWithdrawalsTotalCountQuery = { __typename?: 'query_root', leaderboard_nominator_withdrawals_total_counts_aggregate: { __typename?: 'leaderboard_nominator_withdrawals_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_nominator_withdrawals_total_counts_aggregate_fields', count: number } | null }, leaderboard_nominator_withdrawals_total_counts: Array<{ __typename?: 'leaderboard_nominator_withdrawals_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteAndBlockTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By> | Leaderboard_Farmer_Vote_And_Block_Total_Counts_Order_By;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Counts_Bool_Exp>;
}>;


export type FarmerVoteAndBlockTotalCountQuery = { __typename?: 'query_root', leaderboard_farmer_vote_and_block_total_counts_aggregate: { __typename?: 'leaderboard_farmer_vote_and_block_total_counts_aggregate', aggregate?: { __typename?: 'leaderboard_farmer_vote_and_block_total_counts_aggregate_fields', count: number } | null }, leaderboard_farmer_vote_and_block_total_counts: Array<{ __typename?: 'leaderboard_farmer_vote_and_block_total_counts', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteAndBlockTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By> | Leaderboard_Farmer_Vote_And_Block_Total_Values_Order_By;
  where?: InputMaybe<Leaderboard_Farmer_Vote_And_Block_Total_Values_Bool_Exp>;
}>;


export type FarmerVoteAndBlockTotalValueQuery = { __typename?: 'query_root', leaderboard_farmer_vote_and_block_total_values_aggregate: { __typename?: 'leaderboard_farmer_vote_and_block_total_values_aggregate', aggregate?: { __typename?: 'leaderboard_farmer_vote_and_block_total_values_aggregate_fields', count: number } | null }, leaderboard_farmer_vote_and_block_total_values: Array<{ __typename?: 'leaderboard_farmer_vote_and_block_total_values', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominationsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Staking_Nominators_Order_By> | Staking_Nominators_Order_By;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
}>;


export type NominationsListQuery = { __typename?: 'query_root', staking_nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null }, staking_nominators: Array<{ __typename?: 'staking_nominators', id: string, account_id: string, domain_id: string, operator_id: string, known_shares: any, known_storage_fee_deposit: any, pending_amount: any, pending_storage_fee_deposit: any, pending_effective_domain_epoch: any, total_withdrawal_amounts: any, total_storage_fee_refund: any, unlock_at_confirmed_domain_block_number: any, pending_shares: any, pending_storage_fee_refund: any, total_deposits: any, status: string, pending_action: string, created_at: any, updated_at: any, domain?: { __typename?: 'staking_domains', id: string, name: string } | null, operator?: { __typename?: 'staking_operators', id: string, account_id: string, status: string, pending_action: string, current_total_shares: any } | null, deposits: Array<{ __typename?: 'staking_deposits', id: string, amount: any, storage_fee_deposit: any, timestamp: any, extrinsic_hash: string, status: string, created_at: any, staked_at: any, updated_at: any }>, withdrawals: Array<{ __typename?: 'staking_withdrawals', id: string, shares: any, estimated_amount: any, unlocked_amount: any, unlocked_storage_fee: any, timestamp: any, withdraw_extrinsic_hash: string, unlock_extrinsic_hash: string, status: string, created_at: any, ready_at: any, unlocked_at: any, updated_at: any }> }> };

export type OperatorsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Staking_Operators_Order_By> | Staking_Operators_Order_By;
  where?: InputMaybe<Staking_Operators_Bool_Exp>;
}>;


export type OperatorsListQuery = { __typename?: 'query_root', staking_operators_aggregate: { __typename?: 'staking_operators_aggregate', aggregate?: { __typename?: 'staking_operators_aggregate_fields', count: number } | null }, staking_operators: Array<{ __typename?: 'staking_operators', id: string, sort_id: any, account_id: string, domain_id: string, current_epoch_rewards: any, current_total_stake: any, current_total_shares: any, current_share_price: any, current_storage_fee_deposit: any, minimum_nominator_stake: any, nomination_tax: number, signing_key: string, status: string, raw_status: string, pending_action: string, total_deposits: any, total_estimated_withdrawals: any, total_withdrawals: any, total_tax_collected: any, total_rewards_collected: any, total_transfers_in: any, transfers_in_count: any, total_transfers_out: any, transfers_out_count: any, total_rejected_transfers_claimed: any, rejected_transfers_claimed_count: any, total_transfers_rejected: any, transfers_rejected_count: any, total_volume: any, total_consensus_storage_fee: any, total_domain_execution_fee: any, total_burned_balance: any, accumulated_epoch_shares: any, accumulated_epoch_storage_fee_deposit: any, active_epoch_count: any, bundle_count: any, last_bundle_at: any, created_at: any, updated_at: any, domain?: { __typename?: 'staking_domains', id: string, sort_id: any, last_domain_block_number: any } | null, nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null }, deposits_aggregate: { __typename?: 'staking_deposits_aggregate', aggregate?: { __typename?: 'staking_deposits_aggregate_fields', count: number } | null }, nominators: Array<{ __typename?: 'staking_nominators', id: string, account_id: string, known_shares: any, unlock_at_confirmed_domain_block_number: any }> }> };

export type OperatorByIdQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
}>;


export type OperatorByIdQuery = { __typename?: 'query_root', staking_operators_by_pk?: { __typename?: 'staking_operators', id: string, account_id: string, domain_id: string, bundle_count: any, current_epoch_rewards: any, current_total_stake: any, current_total_shares: any, current_share_price: any, current_storage_fee_deposit: any, minimum_nominator_stake: any, total_rewards_collected: any, total_consensus_storage_fee: any, total_domain_execution_fee: any, total_burned_balance: any, total_tax_collected: any, nomination_tax: number, signing_key: string, status: string, raw_status: string, pending_action: string, last_bundle_at: any, updated_at: any, domain?: { __typename?: 'staking_domains', id: string, sort_id: any } | null, nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null }, deposits_aggregate: { __typename?: 'staking_deposits_aggregate', aggregate?: { __typename?: 'staking_deposits_aggregate_fields', count: number } | null }, withdrawals_aggregate: { __typename?: 'staking_withdrawals_aggregate', aggregate?: { __typename?: 'staking_withdrawals_aggregate_fields', count: number } | null } } | null };

export type OperatorNominatorsByIdQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Staking_Nominators_Order_By> | Staking_Nominators_Order_By;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
}>;


export type OperatorNominatorsByIdQuery = { __typename?: 'query_root', staking_nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null }, staking_nominators: Array<{ __typename?: 'staking_nominators', id: string, known_shares: any, account_id: string, domain_id: string }> };

export type NominatorsConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Staking_Nominators_Order_By> | Staking_Nominators_Order_By;
  where?: InputMaybe<Staking_Nominators_Bool_Exp>;
}>;


export type NominatorsConnectionQuery = { __typename?: 'query_root', staking_nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null }, staking_nominators: Array<{ __typename?: 'staking_nominators', id: string, known_shares: any, account_id: string, domain_id: string, updated_at: any, operator?: { __typename?: 'staking_operators', id: string, account_id: string, domain_id: string, current_epoch_rewards: any, current_total_stake: any, current_total_shares: any, current_share_price: any, minimum_nominator_stake: any, nomination_tax: number, signing_key: string, status: string, raw_status: string, pending_action: string, updated_at: any } | null }> };

export type DomainsLastBlockQueryVariables = Exact<{ [key: string]: never; }>;


export type DomainsLastBlockQuery = { __typename?: 'query_root', staking_domains: Array<{ __typename?: 'staking_domains', id: string, last_domain_block_number: any, completed_epoch: any }> };

export type AccountsTopLeaderboardQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type AccountsTopLeaderboardQuery = { __typename?: 'query_root', farmers: Array<{ __typename?: 'accounts_rewards', id: string }>, operators: Array<{ __typename?: 'accounts_rewards', id: string }>, nominators: Array<{ __typename?: 'accounts_rewards', id: string }> };

export type PendingTransactionQueryVariables = Exact<{
  subspaceAccount?: InputMaybe<Scalars['String']['input']>;
  extrinsics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type PendingTransactionQuery = { __typename?: 'query_root', accounts_accounts: Array<{ __typename?: 'accounts_accounts', id: string, extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, success: boolean, timestamp: any, name: string, events: Array<{ __typename?: 'consensus_events', name: string }>, block?: { __typename?: 'consensus_blocks', hash: string, height: any, id: string } | null }> }> };

export type ExtrinsicsSummaryQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  subspaceAccount?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExtrinsicsSummaryQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, success: boolean, timestamp: any, block_height: any, name: string }> };

export type CheckRoleQueryVariables = Exact<{
  subspaceAccount: Scalars['String']['input'];
}>;


export type CheckRoleQuery = { __typename?: 'query_root', isFarmer: Array<{ __typename?: 'accounts_rewards', account?: { __typename?: 'accounts_accounts', id: string } | null }> };

export type StakingSummaryQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  subspaceAccount?: InputMaybe<Scalars['String']['input']>;
}>;


export type StakingSummaryQuery = { __typename?: 'query_root', staking_operators: Array<{ __typename?: 'staking_operators', id: string, account_id: string, domain_id: string, current_total_stake: any, current_total_shares: any }>, staking_operators_aggregate: { __typename?: 'staking_operators_aggregate', aggregate?: { __typename?: 'staking_operators_aggregate_fields', count: number } | null }, staking_nominators: Array<{ __typename?: 'staking_nominators', id: string, known_shares: any, known_storage_fee_deposit: any, account?: { __typename?: 'staking_accounts', id: string } | null, operator?: { __typename?: 'staking_operators', id: string, account_id: string, domain_id: string, current_total_stake: any, current_total_shares: any } | null }>, staking_nominators_aggregate: { __typename?: 'staking_nominators_aggregate', aggregate?: { __typename?: 'staking_nominators_aggregate_fields', count: number } | null } };

export type LastBlockQueryVariables = Exact<{ [key: string]: never; }>;


export type LastBlockQuery = { __typename?: 'query_root', lastBlock: Array<{ __typename?: 'consensus_blocks', height: any }> };
