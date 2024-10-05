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
  account_id: Scalars['String']['output'];
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
  account_id?: InputMaybe<String_Comparison_Exp>;
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
  account_id?: Maybe<Scalars['String']['output']>;
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
  account_id?: Maybe<Scalars['String']['output']>;
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
  account_id?: InputMaybe<Order_By>;
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
  AccountId = 'account_id',
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
  account_id?: InputMaybe<Scalars['String']['input']>;
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
  log_kind_id: Scalars['String']['output'];
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
  log_kind_id?: InputMaybe<String_Comparison_Exp>;
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
  log_kind_id?: InputMaybe<Order_By>;
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

export type AccountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type AccountQuery = { __typename?: 'query_root', accounts_accounts: Array<{ __typename?: 'accounts_accounts', free: any, id: string, reserved: any, total?: any | null, updated_at: any, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string }> }> };

export type AccountsConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AccountsConnectionQuery = { __typename?: 'query_root', accounts_accounts_aggregate: { __typename?: 'accounts_accounts_aggregate', aggregate?: { __typename?: 'accounts_accounts_aggregate_fields', count: number } | null }, accounts_accounts: Array<{ __typename?: 'accounts_accounts', free: any, id: string, reserved: any, total?: any | null, updated_at: any, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, timestamp: any, block?: { __typename?: 'consensus_blocks', height: any, hash: string } | null }> }> };

export type AccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type AccountByIdQuery = { __typename?: 'query_root', accounts_accounts_by_pk?: { __typename?: 'accounts_accounts', free: any, reserved: any, id: string, total?: any | null, nonce: any, updated_at: any, extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, id: string, index_in_block: number, name: string, success: boolean, timestamp: any, tip: any, block?: { __typename?: 'consensus_blocks', id: string, height: any } | null }> } | null, accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, block_height: any, index_in_block: any, reward_type: string, amount: any, timestamp: any }> };

export type OldAccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type OldAccountByIdQuery = { __typename?: 'query_root', accounts_accounts_by_pk?: { __typename?: 'accounts_accounts', free: any, reserved: any, id: string, total?: any | null, updated_at: any, extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, id: string, index_in_block: number, name: string, success: boolean, timestamp: any, tip: any, block?: { __typename?: 'consensus_blocks', id: string, height: any } | null }> } | null };

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


export type RewardsListQuery = { __typename?: 'query_root', accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, block_height: any, index_in_block: any, reward_type: string, amount: any, timestamp: any, block?: { __typename?: 'consensus_blocks', hash: string, id: string, height: any } | null, account?: { __typename?: 'accounts_accounts', id: string, free: any, reserved: any, total?: any | null, updated_at: any } | null }> };

export type ExtrinsicsByAccountIdQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
  orderBy: Array<Consensus_Extrinsics_Order_By> | Consensus_Extrinsics_Order_By;
}>;


export type ExtrinsicsByAccountIdQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, name: string, success: boolean, index_in_block: number, block?: { __typename?: 'consensus_blocks', height: any, timestamp: any } | null }> };

export type AllRewardForAccountByIdQueryVariables = Exact<{
  accountId: Scalars['String']['input'];
}>;


export type AllRewardForAccountByIdQuery = { __typename?: 'query_root', accounts_rewards: Array<{ __typename?: 'accounts_rewards', id: string, block_height: any, index_in_block: any, reward_type: string, amount: any, timestamp: any }> };

export type TransfersByAccountIdQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Accounts_Transfers_Bool_Exp>;
  orderBy: Array<Accounts_Transfers_Order_By> | Accounts_Transfers_Order_By;
}>;


export type TransfersByAccountIdQuery = { __typename?: 'query_root', accounts_transfers_aggregate: { __typename?: 'accounts_transfers_aggregate', aggregate?: { __typename?: 'accounts_transfers_aggregate_fields', count: number } | null }, accounts_transfers: Array<{ __typename?: 'accounts_transfers', id: string, extrinsic_id: string, event_id: string, from: string, to: string, value: any, fee: any, success: boolean, timestamp: any, date: any, created_at: any }> };

export type BlocksConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Consensus_Blocks_Order_By> | Consensus_Blocks_Order_By;
}>;


export type BlocksConnectionQuery = { __typename?: 'query_root', consensus_blocks_aggregate: { __typename?: 'consensus_blocks_aggregate', aggregate?: { __typename?: 'consensus_blocks_aggregate_fields', count: number } | null }, consensus_blocks: Array<{ __typename?: 'consensus_blocks', blockchain_size: any, extrinsics_root: string, hash: string, height: any, id: string, parent_hash: string, space_pledged: any, spec_id: string, state_root: string, timestamp: any, author_id: string, events: Array<{ __typename?: 'consensus_events', id: string }>, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string }> }> };

export type BlockByIdQueryVariables = Exact<{
  blockId: Scalars['numeric']['input'];
}>;


export type BlockByIdQuery = { __typename?: 'query_root', consensus_blocks: Array<{ __typename?: 'consensus_blocks', id: string, height: any, hash: string, state_root: string, timestamp: any, extrinsics_root: string, spec_id: string, parent_hash: string, extrinsics_count: number, events_count: number, author_id: string, logs: Array<{ __typename?: 'consensus_logs', kind: string, id: string, block?: { __typename?: 'consensus_blocks', height: any, timestamp: any } | null }> }> };

export type ExtrinsicsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['numeric']['input'];
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExtrinsicsByBlockIdQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, name: string, success: boolean, index_in_block: number, block?: { __typename?: 'consensus_blocks', height: any, timestamp: any } | null }> };

export type EventsByBlockIdQueryVariables = Exact<{
  blockId: Scalars['numeric']['input'];
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EventsByBlockIdQuery = { __typename?: 'query_root', consensus_events_aggregate: { __typename?: 'consensus_events_aggregate', aggregate?: { __typename?: 'consensus_events_aggregate_fields', count: number } | null }, consensus_events: Array<{ __typename?: 'consensus_events', id: string, name: string, phase: string, index_in_block: any, block?: { __typename?: 'consensus_blocks', height: any, id: string } | null, extrinsic?: { __typename?: 'consensus_extrinsics', index_in_block: number, block?: { __typename?: 'consensus_blocks', height: any, id: string } | null } | null }> };

export type BlocksByHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type BlocksByHashQuery = { __typename?: 'query_root', consensus_blocks: Array<{ __typename?: 'consensus_blocks', id: string, height: any }> };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type EventsQuery = { __typename?: 'query_root', consensus_events: Array<{ __typename?: 'consensus_events', name: string, phase: string, id: string, index_in_block: any, block?: { __typename?: 'consensus_blocks', height: any, timestamp: any } | null }> };

export type EventsConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Events_Bool_Exp>;
}>;


export type EventsConnectionQuery = { __typename?: 'query_root', consensus_events_aggregate: { __typename?: 'consensus_events_aggregate', aggregate?: { __typename?: 'consensus_events_aggregate_fields', count: number } | null }, consensus_events: Array<{ __typename?: 'consensus_events', args: string, id: string, index_in_block: any, name: string, phase: string, timestamp: any, block?: { __typename?: 'consensus_blocks', id: string, timestamp: any, height: any } | null }>, consensus_event_modules: Array<{ __typename?: 'consensus_event_modules', id: string }> };

export type EventByIdQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type EventByIdQuery = { __typename?: 'query_root', consensus_events_by_pk?: { __typename?: 'consensus_events', args: string, id: string, index_in_block: any, name: string, phase: string, timestamp: any, extrinsic?: { __typename?: 'consensus_extrinsics', args: string, success: boolean, tip: any, fee: any, id: string, signer: string } | null, block?: { __typename?: 'consensus_blocks', height: any, id: string, timestamp: any, spec_id: string, hash: string } | null } | null };

export type ExtrinsicsConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Extrinsics_Bool_Exp>;
}>;


export type ExtrinsicsConnectionQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, consensus_extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, index_in_block: number, id: string, success: boolean, name: string, nonce: any, block?: { __typename?: 'consensus_blocks', id: string, timestamp: any, height: any } | null }>, consensus_extrinsic_modules: Array<{ __typename?: 'consensus_extrinsic_modules', id: string }> };

export type ExtrinsicsByIdQueryVariables = Exact<{
  extrinsicId: Scalars['String']['input'];
}>;


export type ExtrinsicsByIdQuery = { __typename?: 'query_root', consensus_extrinsics_by_pk?: { __typename?: 'consensus_extrinsics', index_in_block: number, id: string, hash: string, signature: string, success: boolean, tip: any, args: string, signer: string, name: string, block?: { __typename?: 'consensus_blocks', height: any, id: string, timestamp: any } | null, events: Array<{ __typename?: 'consensus_events', id: string, index_in_block: any, phase: string, timestamp: any, name: string, args: string, block?: { __typename?: 'consensus_blocks', height: any } | null, extrinsic?: { __typename?: 'consensus_extrinsics', id: string, index_in_block: number, block?: { __typename?: 'consensus_blocks', height: any } | null } | null }> } | null };

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

export type LogsConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Consensus_Logs_Bool_Exp>;
}>;


export type LogsConnectionQuery = { __typename?: 'query_root', consensus_logs_aggregate: { __typename?: 'consensus_logs_aggregate', aggregate?: { __typename?: 'consensus_logs_aggregate_fields', count: number } | null }, consensus_logs: Array<{ __typename?: 'consensus_logs', id: string, kind: string, value?: string | null, block?: { __typename?: 'consensus_blocks', id: string, height: any, timestamp: any } | null }> };

export type LogByIdQueryVariables = Exact<{
  logId: Scalars['String']['input'];
}>;


export type LogByIdQuery = { __typename?: 'query_root', consensus_logs_by_pk?: { __typename?: 'consensus_logs', id: string, kind: string, value?: string | null, block?: { __typename?: 'consensus_blocks', id: string, height: any, timestamp: any, events: Array<{ __typename?: 'consensus_events', id: string, args: string, name: string, phase: string, index_in_block: any, timestamp: any, block?: { __typename?: 'consensus_blocks', height: any, hash: string } | null }> } | null } | null };

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

export type AccountsTopLeaderboardQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type AccountsTopLeaderboardQuery = { __typename?: 'query_root', farmers: Array<{ __typename?: 'accounts_rewards', id: string }> };

export type PendingTransactionQueryVariables = Exact<{
  subspaceAccount?: InputMaybe<Scalars['String']['input']>;
  extrinsics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type PendingTransactionQuery = { __typename?: 'query_root', accounts_accounts: Array<{ __typename?: 'accounts_accounts', id: string, extrinsics: Array<{ __typename?: 'consensus_extrinsics', hash: string, success: boolean, timestamp: any, name: string, events: Array<{ __typename?: 'consensus_events', name: string }>, block?: { __typename?: 'consensus_blocks', hash: string, height: any, id: string } | null }> }> };

export type ExtrinsicsSummaryQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  subspaceAccount?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExtrinsicsSummaryQuery = { __typename?: 'query_root', consensus_extrinsics_aggregate: { __typename?: 'consensus_extrinsics_aggregate', aggregate?: { __typename?: 'consensus_extrinsics_aggregate_fields', count: number } | null }, extrinsics: Array<{ __typename?: 'consensus_extrinsics', id: string, hash: string, success: boolean, name: string, block?: { __typename?: 'consensus_blocks', id: string, timestamp: any, height: any } | null }> };

export type CheckRoleQueryVariables = Exact<{
  subspaceAccount: Scalars['String']['input'];
}>;


export type CheckRoleQuery = { __typename?: 'query_root', isFarmer: Array<{ __typename?: 'accounts_rewards', account?: { __typename?: 'accounts_accounts', id: string } | null }> };

export type LastBlockQueryVariables = Exact<{ [key: string]: never; }>;


export type LastBlockQuery = { __typename?: 'query_root', lastBlock: Array<{ __typename?: 'consensus_blocks', height: any }> };
