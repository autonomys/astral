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
  timestamptz: { input: any; output: any; }
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

/** columns and relationships of "account" */
export type Account = {
  __typename?: 'account';
  created_at?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  deposits: Array<Deposit>;
  /** An aggregate relationship */
  deposits_aggregate: Deposit_Aggregate;
  id: Scalars['String']['output'];
  /** An array relationship */
  nominators: Array<Nominator>;
  /** An aggregate relationship */
  nominators_aggregate: Nominator_Aggregate;
  /** An array relationship */
  operators: Array<Operator>;
  /** An aggregate relationship */
  operators_aggregate: Operator_Aggregate;
  total_deposits: Scalars['numeric']['output'];
  total_tax_collected: Scalars['numeric']['output'];
  updated_at?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  withdrawals: Array<Withdrawal>;
  /** An aggregate relationship */
  withdrawals_aggregate: Withdrawal_Aggregate;
};


/** columns and relationships of "account" */
export type AccountDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountNominatorsArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountNominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountOperatorsArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountOperators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};

/** aggregated selection of "account" */
export type Account_Aggregate = {
  __typename?: 'account_aggregate';
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

/** aggregate fields of "account" */
export type Account_Aggregate_Fields = {
  __typename?: 'account_aggregate_fields';
  avg?: Maybe<Account_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
  stddev?: Maybe<Account_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Sum_Fields>;
  var_pop?: Maybe<Account_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Var_Samp_Fields>;
  variance?: Maybe<Account_Variance_Fields>;
};


/** aggregate fields of "account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Avg_Fields = {
  __typename?: 'account_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  deposits?: InputMaybe<Deposit_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nominators?: InputMaybe<Nominator_Bool_Exp>;
  nominators_aggregate?: InputMaybe<Nominator_Aggregate_Bool_Exp>;
  operators?: InputMaybe<Operator_Bool_Exp>;
  operators_aggregate?: InputMaybe<Operator_Aggregate_Bool_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_tax_collected?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  withdrawals?: InputMaybe<Withdrawal_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'account_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'account_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account". */
export type Account_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  nominators_aggregate?: InputMaybe<Nominator_Aggregate_Order_By>;
  operators_aggregate?: InputMaybe<Operator_Aggregate_Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Order_By>;
};

/** select columns of table "account" */
export enum Account_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalTaxCollected = 'total_tax_collected',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Account_Stddev_Fields = {
  __typename?: 'account_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Stddev_Pop_Fields = {
  __typename?: 'account_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Stddev_Samp_Fields = {
  __typename?: 'account_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account" */
export type Account_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_tax_collected?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Sum_Fields = {
  __typename?: 'account_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Var_Pop_Fields = {
  __typename?: 'account_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Var_Samp_Fields = {
  __typename?: 'account_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Variance_Fields = {
  __typename?: 'account_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "deposit" */
export type Deposit = {
  __typename?: 'deposit';
  /** An object relationship */
  account?: Maybe<Account>;
  account_id: Scalars['String']['output'];
  amount: Scalars['numeric']['output'];
  block_number: Scalars['Int']['output'];
  /** An object relationship */
  domain?: Maybe<Domain>;
  domain_id: Scalars['String']['output'];
  extrinsic_hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  nominator?: Maybe<Nominator>;
  nominator_id: Scalars['String']['output'];
  /** An object relationship */
  operator?: Maybe<Operator>;
  operator_id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  storage_fee_deposit: Scalars['numeric']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "deposit" */
export type Deposit_Aggregate = {
  __typename?: 'deposit_aggregate';
  aggregate?: Maybe<Deposit_Aggregate_Fields>;
  nodes: Array<Deposit>;
};

export type Deposit_Aggregate_Bool_Exp = {
  count?: InputMaybe<Deposit_Aggregate_Bool_Exp_Count>;
};

export type Deposit_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Deposit_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Deposit_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "deposit" */
export type Deposit_Aggregate_Fields = {
  __typename?: 'deposit_aggregate_fields';
  avg?: Maybe<Deposit_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Deposit_Max_Fields>;
  min?: Maybe<Deposit_Min_Fields>;
  stddev?: Maybe<Deposit_Stddev_Fields>;
  stddev_pop?: Maybe<Deposit_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Deposit_Stddev_Samp_Fields>;
  sum?: Maybe<Deposit_Sum_Fields>;
  var_pop?: Maybe<Deposit_Var_Pop_Fields>;
  var_samp?: Maybe<Deposit_Var_Samp_Fields>;
  variance?: Maybe<Deposit_Variance_Fields>;
};


/** aggregate fields of "deposit" */
export type Deposit_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Deposit_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "deposit" */
export type Deposit_Aggregate_Order_By = {
  avg?: InputMaybe<Deposit_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Deposit_Max_Order_By>;
  min?: InputMaybe<Deposit_Min_Order_By>;
  stddev?: InputMaybe<Deposit_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Deposit_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Deposit_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Deposit_Sum_Order_By>;
  var_pop?: InputMaybe<Deposit_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Deposit_Var_Samp_Order_By>;
  variance?: InputMaybe<Deposit_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Deposit_Avg_Fields = {
  __typename?: 'deposit_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "deposit" */
export type Deposit_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "deposit". All fields are combined with a logical 'AND'. */
export type Deposit_Bool_Exp = {
  _and?: InputMaybe<Array<Deposit_Bool_Exp>>;
  _not?: InputMaybe<Deposit_Bool_Exp>;
  _or?: InputMaybe<Array<Deposit_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  domain?: InputMaybe<Domain_Bool_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  extrinsic_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nominator?: InputMaybe<Nominator_Bool_Exp>;
  nominator_id?: InputMaybe<String_Comparison_Exp>;
  operator?: InputMaybe<Operator_Bool_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Deposit_Max_Fields = {
  __typename?: 'deposit_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['Int']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "deposit" */
export type Deposit_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Deposit_Min_Fields = {
  __typename?: 'deposit_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['Int']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "deposit" */
export type Deposit_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "deposit". */
export type Deposit_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  domain?: InputMaybe<Domain_Order_By>;
  domain_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator?: InputMaybe<Nominator_Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator?: InputMaybe<Operator_Order_By>;
  operator_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "deposit" */
export enum Deposit_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  ExtrinsicHash = 'extrinsic_hash',
  /** column name */
  Id = 'id',
  /** column name */
  NominatorId = 'nominator_id',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  Status = 'status',
  /** column name */
  StorageFeeDeposit = 'storage_fee_deposit',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Deposit_Stddev_Fields = {
  __typename?: 'deposit_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "deposit" */
export type Deposit_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Deposit_Stddev_Pop_Fields = {
  __typename?: 'deposit_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "deposit" */
export type Deposit_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Deposit_Stddev_Samp_Fields = {
  __typename?: 'deposit_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "deposit" */
export type Deposit_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "deposit" */
export type Deposit_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Deposit_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Deposit_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nominator_id?: InputMaybe<Scalars['String']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Deposit_Sum_Fields = {
  __typename?: 'deposit_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_number?: Maybe<Scalars['Int']['output']>;
  storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "deposit" */
export type Deposit_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Deposit_Var_Pop_Fields = {
  __typename?: 'deposit_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "deposit" */
export type Deposit_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Deposit_Var_Samp_Fields = {
  __typename?: 'deposit_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "deposit" */
export type Deposit_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Deposit_Variance_Fields = {
  __typename?: 'deposit_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_number?: Maybe<Scalars['Float']['output']>;
  storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "deposit" */
export type Deposit_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  storage_fee_deposit?: InputMaybe<Order_By>;
};

/** columns and relationships of "domain" */
export type Domain = {
  __typename?: 'domain';
  completed_epoch: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['Int']['output']>;
  current_storage_fee_deposit: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  /** An array relationship */
  deposits: Array<Deposit>;
  /** An aggregate relationship */
  deposits_aggregate: Deposit_Aggregate;
  id: Scalars['String']['output'];
  last_domain_block_number: Scalars['Int']['output'];
  /** An array relationship */
  nominators: Array<Nominator>;
  /** An aggregate relationship */
  nominators_aggregate: Nominator_Aggregate;
  /** An array relationship */
  operators: Array<Operator>;
  /** An aggregate relationship */
  operators_aggregate: Operator_Aggregate;
  sort_id: Scalars['Int']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_tax_collected: Scalars['numeric']['output'];
  updated_at?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  withdrawals: Array<Withdrawal>;
  /** An aggregate relationship */
  withdrawals_aggregate: Withdrawal_Aggregate;
};


/** columns and relationships of "domain" */
export type DomainDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainNominatorsArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainNominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainOperatorsArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainOperators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


/** columns and relationships of "domain" */
export type DomainWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};

/** aggregated selection of "domain" */
export type Domain_Aggregate = {
  __typename?: 'domain_aggregate';
  aggregate?: Maybe<Domain_Aggregate_Fields>;
  nodes: Array<Domain>;
};

/** aggregate fields of "domain" */
export type Domain_Aggregate_Fields = {
  __typename?: 'domain_aggregate_fields';
  avg?: Maybe<Domain_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Domain_Max_Fields>;
  min?: Maybe<Domain_Min_Fields>;
  stddev?: Maybe<Domain_Stddev_Fields>;
  stddev_pop?: Maybe<Domain_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Domain_Stddev_Samp_Fields>;
  sum?: Maybe<Domain_Sum_Fields>;
  var_pop?: Maybe<Domain_Var_Pop_Fields>;
  var_samp?: Maybe<Domain_Var_Samp_Fields>;
  variance?: Maybe<Domain_Variance_Fields>;
};


/** aggregate fields of "domain" */
export type Domain_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Domain_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Domain_Avg_Fields = {
  __typename?: 'domain_avg_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "domain". All fields are combined with a logical 'AND'. */
export type Domain_Bool_Exp = {
  _and?: InputMaybe<Array<Domain_Bool_Exp>>;
  _not?: InputMaybe<Domain_Bool_Exp>;
  _or?: InputMaybe<Array<Domain_Bool_Exp>>;
  completed_epoch?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  current_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  deposits?: InputMaybe<Deposit_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_domain_block_number?: InputMaybe<Int_Comparison_Exp>;
  nominators?: InputMaybe<Nominator_Bool_Exp>;
  nominators_aggregate?: InputMaybe<Nominator_Aggregate_Bool_Exp>;
  operators?: InputMaybe<Operator_Bool_Exp>;
  operators_aggregate?: InputMaybe<Operator_Aggregate_Bool_Exp>;
  sort_id?: InputMaybe<Int_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_tax_collected?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  withdrawals?: InputMaybe<Withdrawal_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Domain_Max_Fields = {
  __typename?: 'domain_max_fields';
  completed_epoch?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_domain_block_number?: Maybe<Scalars['Int']['output']>;
  sort_id?: Maybe<Scalars['Int']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Domain_Min_Fields = {
  __typename?: 'domain_min_fields';
  completed_epoch?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_domain_block_number?: Maybe<Scalars['Int']['output']>;
  sort_id?: Maybe<Scalars['Int']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "domain". */
export type Domain_Order_By = {
  completed_epoch?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  last_domain_block_number?: InputMaybe<Order_By>;
  nominators_aggregate?: InputMaybe<Nominator_Aggregate_Order_By>;
  operators_aggregate?: InputMaybe<Operator_Aggregate_Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Order_By>;
};

/** select columns of table "domain" */
export enum Domain_Select_Column {
  /** column name */
  CompletedEpoch = 'completed_epoch',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentStorageFeeDeposit = 'current_storage_fee_deposit',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  Id = 'id',
  /** column name */
  LastDomainBlockNumber = 'last_domain_block_number',
  /** column name */
  SortId = 'sort_id',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalTaxCollected = 'total_tax_collected',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Domain_Stddev_Fields = {
  __typename?: 'domain_stddev_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Domain_Stddev_Pop_Fields = {
  __typename?: 'domain_stddev_pop_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Domain_Stddev_Samp_Fields = {
  __typename?: 'domain_stddev_samp_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "domain" */
export type Domain_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Domain_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Domain_Stream_Cursor_Value_Input = {
  completed_epoch?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Int']['input']>;
  current_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_domain_block_number?: InputMaybe<Scalars['Int']['input']>;
  sort_id?: InputMaybe<Scalars['Int']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_tax_collected?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Domain_Sum_Fields = {
  __typename?: 'domain_sum_fields';
  completed_epoch?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  last_domain_block_number?: Maybe<Scalars['Int']['output']>;
  sort_id?: Maybe<Scalars['Int']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Domain_Var_Pop_Fields = {
  __typename?: 'domain_var_pop_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Domain_Var_Samp_Fields = {
  __typename?: 'domain_var_samp_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Domain_Variance_Fields = {
  __typename?: 'domain_variance_fields';
  completed_epoch?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_domain_block_number?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "nominator" */
export type Nominator = {
  __typename?: 'nominator';
  /** An object relationship */
  account?: Maybe<Account>;
  account_id: Scalars['String']['output'];
  created_at?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  deposits: Array<Deposit>;
  /** An aggregate relationship */
  deposits_aggregate: Deposit_Aggregate;
  /** An object relationship */
  domain?: Maybe<Domain>;
  domain_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  operator?: Maybe<Operator>;
  operator_id: Scalars['String']['output'];
  shares: Scalars['numeric']['output'];
  status: Scalars['String']['output'];
  total_deposits: Scalars['numeric']['output'];
  updated_at?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  withdrawals: Array<Withdrawal>;
  /** An aggregate relationship */
  withdrawals_aggregate: Withdrawal_Aggregate;
};


/** columns and relationships of "nominator" */
export type NominatorDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "nominator" */
export type NominatorDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "nominator" */
export type NominatorWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


/** columns and relationships of "nominator" */
export type NominatorWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};

/** aggregated selection of "nominator" */
export type Nominator_Aggregate = {
  __typename?: 'nominator_aggregate';
  aggregate?: Maybe<Nominator_Aggregate_Fields>;
  nodes: Array<Nominator>;
};

export type Nominator_Aggregate_Bool_Exp = {
  count?: InputMaybe<Nominator_Aggregate_Bool_Exp_Count>;
};

export type Nominator_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Nominator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Nominator_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "nominator" */
export type Nominator_Aggregate_Fields = {
  __typename?: 'nominator_aggregate_fields';
  avg?: Maybe<Nominator_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Nominator_Max_Fields>;
  min?: Maybe<Nominator_Min_Fields>;
  stddev?: Maybe<Nominator_Stddev_Fields>;
  stddev_pop?: Maybe<Nominator_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Nominator_Stddev_Samp_Fields>;
  sum?: Maybe<Nominator_Sum_Fields>;
  var_pop?: Maybe<Nominator_Var_Pop_Fields>;
  var_samp?: Maybe<Nominator_Var_Samp_Fields>;
  variance?: Maybe<Nominator_Variance_Fields>;
};


/** aggregate fields of "nominator" */
export type Nominator_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nominator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "nominator" */
export type Nominator_Aggregate_Order_By = {
  avg?: InputMaybe<Nominator_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Nominator_Max_Order_By>;
  min?: InputMaybe<Nominator_Min_Order_By>;
  stddev?: InputMaybe<Nominator_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Nominator_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Nominator_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Nominator_Sum_Order_By>;
  var_pop?: InputMaybe<Nominator_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Nominator_Var_Samp_Order_By>;
  variance?: InputMaybe<Nominator_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Nominator_Avg_Fields = {
  __typename?: 'nominator_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "nominator" */
export type Nominator_Avg_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "nominator". All fields are combined with a logical 'AND'. */
export type Nominator_Bool_Exp = {
  _and?: InputMaybe<Array<Nominator_Bool_Exp>>;
  _not?: InputMaybe<Nominator_Bool_Exp>;
  _or?: InputMaybe<Array<Nominator_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  deposits?: InputMaybe<Deposit_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Bool_Exp>;
  domain?: InputMaybe<Domain_Bool_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  operator?: InputMaybe<Operator_Bool_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  shares?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  withdrawals?: InputMaybe<Withdrawal_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Nominator_Max_Fields = {
  __typename?: 'nominator_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "nominator" */
export type Nominator_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Nominator_Min_Fields = {
  __typename?: 'nominator_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "nominator" */
export type Nominator_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "nominator". */
export type Nominator_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Order_By>;
  domain?: InputMaybe<Domain_Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  operator?: InputMaybe<Operator_Order_By>;
  operator_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Order_By>;
};

/** select columns of table "nominator" */
export enum Nominator_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  Id = 'id',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  Shares = 'shares',
  /** column name */
  Status = 'status',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Nominator_Stddev_Fields = {
  __typename?: 'nominator_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "nominator" */
export type Nominator_Stddev_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Nominator_Stddev_Pop_Fields = {
  __typename?: 'nominator_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "nominator" */
export type Nominator_Stddev_Pop_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Nominator_Stddev_Samp_Fields = {
  __typename?: 'nominator_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "nominator" */
export type Nominator_Stddev_Samp_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "nominator" */
export type Nominator_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Nominator_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Nominator_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Int']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Nominator_Sum_Fields = {
  __typename?: 'nominator_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "nominator" */
export type Nominator_Sum_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Nominator_Var_Pop_Fields = {
  __typename?: 'nominator_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "nominator" */
export type Nominator_Var_Pop_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Nominator_Var_Samp_Fields = {
  __typename?: 'nominator_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "nominator" */
export type Nominator_Var_Samp_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Nominator_Variance_Fields = {
  __typename?: 'nominator_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "nominator" */
export type Nominator_Variance_Order_By = {
  created_at?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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

/** columns and relationships of "operator" */
export type Operator = {
  __typename?: 'operator';
  /** An object relationship */
  account?: Maybe<Account>;
  account_id: Scalars['String']['output'];
  created_at?: Maybe<Scalars['Int']['output']>;
  current_epoch_rewards: Scalars['numeric']['output'];
  current_storage_fee_deposit: Scalars['numeric']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  /** An array relationship */
  deposits: Array<Deposit>;
  /** An aggregate relationship */
  deposits_aggregate: Deposit_Aggregate;
  /** An object relationship */
  domain?: Maybe<Domain>;
  domain_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_bundle_at: Scalars['Int']['output'];
  minimum_nominator_stake: Scalars['numeric']['output'];
  nomination_tax: Scalars['Int']['output'];
  /** An array relationship */
  nominators: Array<Nominator>;
  /** An aggregate relationship */
  nominators_aggregate: Nominator_Aggregate;
  raw_status?: Maybe<Scalars['String']['output']>;
  signing_key: Scalars['String']['output'];
  sort_id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_tax_collected: Scalars['numeric']['output'];
  updated_at?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  withdrawals: Array<Withdrawal>;
  /** An aggregate relationship */
  withdrawals_aggregate: Withdrawal_Aggregate;
};


/** columns and relationships of "operator" */
export type OperatorDepositsArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "operator" */
export type OperatorDeposits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


/** columns and relationships of "operator" */
export type OperatorNominatorsArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


/** columns and relationships of "operator" */
export type OperatorNominators_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


/** columns and relationships of "operator" */
export type OperatorWithdrawalsArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


/** columns and relationships of "operator" */
export type OperatorWithdrawals_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};

/** aggregated selection of "operator" */
export type Operator_Aggregate = {
  __typename?: 'operator_aggregate';
  aggregate?: Maybe<Operator_Aggregate_Fields>;
  nodes: Array<Operator>;
};

export type Operator_Aggregate_Bool_Exp = {
  count?: InputMaybe<Operator_Aggregate_Bool_Exp_Count>;
};

export type Operator_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Operator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Operator_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "operator" */
export type Operator_Aggregate_Fields = {
  __typename?: 'operator_aggregate_fields';
  avg?: Maybe<Operator_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Max_Fields>;
  min?: Maybe<Operator_Min_Fields>;
  stddev?: Maybe<Operator_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Sum_Fields>;
  var_pop?: Maybe<Operator_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Var_Samp_Fields>;
  variance?: Maybe<Operator_Variance_Fields>;
};


/** aggregate fields of "operator" */
export type Operator_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "operator" */
export type Operator_Aggregate_Order_By = {
  avg?: InputMaybe<Operator_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Operator_Max_Order_By>;
  min?: InputMaybe<Operator_Min_Order_By>;
  stddev?: InputMaybe<Operator_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Operator_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Operator_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Operator_Sum_Order_By>;
  var_pop?: InputMaybe<Operator_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Operator_Var_Samp_Order_By>;
  variance?: InputMaybe<Operator_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Operator_Avg_Fields = {
  __typename?: 'operator_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "operator" */
export type Operator_Avg_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "operator". All fields are combined with a logical 'AND'. */
export type Operator_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Bool_Exp>>;
  _not?: InputMaybe<Operator_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  current_epoch_rewards?: InputMaybe<Numeric_Comparison_Exp>;
  current_storage_fee_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  deposits?: InputMaybe<Deposit_Bool_Exp>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Bool_Exp>;
  domain?: InputMaybe<Domain_Bool_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_bundle_at?: InputMaybe<Int_Comparison_Exp>;
  minimum_nominator_stake?: InputMaybe<Numeric_Comparison_Exp>;
  nomination_tax?: InputMaybe<Int_Comparison_Exp>;
  nominators?: InputMaybe<Nominator_Bool_Exp>;
  nominators_aggregate?: InputMaybe<Nominator_Aggregate_Bool_Exp>;
  raw_status?: InputMaybe<String_Comparison_Exp>;
  signing_key?: InputMaybe<String_Comparison_Exp>;
  sort_id?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_tax_collected?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  withdrawals?: InputMaybe<Withdrawal_Bool_Exp>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Operator_Max_Fields = {
  __typename?: 'operator_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_bundle_at?: Maybe<Scalars['Int']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['numeric']['output']>;
  nomination_tax?: Maybe<Scalars['Int']['output']>;
  raw_status?: Maybe<Scalars['String']['output']>;
  signing_key?: Maybe<Scalars['String']['output']>;
  sort_id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "operator" */
export type Operator_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  raw_status?: InputMaybe<Order_By>;
  signing_key?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Operator_Min_Fields = {
  __typename?: 'operator_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_bundle_at?: Maybe<Scalars['Int']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['numeric']['output']>;
  nomination_tax?: Maybe<Scalars['Int']['output']>;
  raw_status?: Maybe<Scalars['String']['output']>;
  signing_key?: Maybe<Scalars['String']['output']>;
  sort_id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "operator" */
export type Operator_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  raw_status?: InputMaybe<Order_By>;
  signing_key?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "operator". */
export type Operator_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  deposits_aggregate?: InputMaybe<Deposit_Aggregate_Order_By>;
  domain?: InputMaybe<Domain_Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  nominators_aggregate?: InputMaybe<Nominator_Aggregate_Order_By>;
  raw_status?: InputMaybe<Order_By>;
  signing_key?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  withdrawals_aggregate?: InputMaybe<Withdrawal_Aggregate_Order_By>;
};

/** select columns of table "operator" */
export enum Operator_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentEpochRewards = 'current_epoch_rewards',
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
  RawStatus = 'raw_status',
  /** column name */
  SigningKey = 'signing_key',
  /** column name */
  SortId = 'sort_id',
  /** column name */
  Status = 'status',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalTaxCollected = 'total_tax_collected',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Operator_Stddev_Fields = {
  __typename?: 'operator_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "operator" */
export type Operator_Stddev_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Operator_Stddev_Pop_Fields = {
  __typename?: 'operator_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "operator" */
export type Operator_Stddev_Pop_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Operator_Stddev_Samp_Fields = {
  __typename?: 'operator_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "operator" */
export type Operator_Stddev_Samp_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "operator" */
export type Operator_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Int']['input']>;
  current_epoch_rewards?: InputMaybe<Scalars['numeric']['input']>;
  current_storage_fee_deposit?: InputMaybe<Scalars['numeric']['input']>;
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_bundle_at?: InputMaybe<Scalars['Int']['input']>;
  minimum_nominator_stake?: InputMaybe<Scalars['numeric']['input']>;
  nomination_tax?: InputMaybe<Scalars['Int']['input']>;
  raw_status?: InputMaybe<Scalars['String']['input']>;
  signing_key?: InputMaybe<Scalars['String']['input']>;
  sort_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_tax_collected?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Operator_Sum_Fields = {
  __typename?: 'operator_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  current_epoch_rewards?: Maybe<Scalars['numeric']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['numeric']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  last_bundle_at?: Maybe<Scalars['Int']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['numeric']['output']>;
  nomination_tax?: Maybe<Scalars['Int']['output']>;
  sort_id?: Maybe<Scalars['Int']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_tax_collected?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "operator" */
export type Operator_Sum_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Operator_Var_Pop_Fields = {
  __typename?: 'operator_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "operator" */
export type Operator_Var_Pop_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Operator_Var_Samp_Fields = {
  __typename?: 'operator_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "operator" */
export type Operator_Var_Samp_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Operator_Variance_Fields = {
  __typename?: 'operator_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_epoch_rewards?: Maybe<Scalars['Float']['output']>;
  current_storage_fee_deposit?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  last_bundle_at?: Maybe<Scalars['Float']['output']>;
  minimum_nominator_stake?: Maybe<Scalars['Float']['output']>;
  nomination_tax?: Maybe<Scalars['Float']['output']>;
  sort_id?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_tax_collected?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "operator" */
export type Operator_Variance_Order_By = {
  created_at?: InputMaybe<Order_By>;
  current_epoch_rewards?: InputMaybe<Order_By>;
  current_storage_fee_deposit?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  last_bundle_at?: InputMaybe<Order_By>;
  minimum_nominator_stake?: InputMaybe<Order_By>;
  nomination_tax?: InputMaybe<Order_By>;
  sort_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_tax_collected?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
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
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "deposit" */
  deposit: Array<Deposit>;
  /** fetch aggregated fields from the table: "deposit" */
  deposit_aggregate: Deposit_Aggregate;
  /** fetch data from the table: "deposit" using primary key columns */
  deposit_by_pk?: Maybe<Deposit>;
  /** fetch data from the table: "domain" */
  domain: Array<Domain>;
  /** fetch aggregated fields from the table: "domain" */
  domain_aggregate: Domain_Aggregate;
  /** fetch data from the table: "domain" using primary key columns */
  domain_by_pk?: Maybe<Domain>;
  /** fetch data from the table: "nominator" */
  nominator: Array<Nominator>;
  /** fetch aggregated fields from the table: "nominator" */
  nominator_aggregate: Nominator_Aggregate;
  /** fetch data from the table: "nominator" using primary key columns */
  nominator_by_pk?: Maybe<Nominator>;
  /** fetch data from the table: "operator" */
  operator: Array<Operator>;
  /** fetch aggregated fields from the table: "operator" */
  operator_aggregate: Operator_Aggregate;
  /** fetch data from the table: "operator" using primary key columns */
  operator_by_pk?: Maybe<Operator>;
  /** fetch data from the table: "withdrawal" */
  withdrawal: Array<Withdrawal>;
  /** fetch aggregated fields from the table: "withdrawal" */
  withdrawal_aggregate: Withdrawal_Aggregate;
  /** fetch data from the table: "withdrawal" using primary key columns */
  withdrawal_by_pk?: Maybe<Withdrawal>;
};


export type Query_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Query_RootAccount_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDepositArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


export type Query_RootDeposit_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


export type Query_RootDeposit_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDomainArgs = {
  distinct_on?: InputMaybe<Array<Domain_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Domain_Order_By>>;
  where?: InputMaybe<Domain_Bool_Exp>;
};


export type Query_RootDomain_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Domain_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Domain_Order_By>>;
  where?: InputMaybe<Domain_Bool_Exp>;
};


export type Query_RootDomain_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootNominatorArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


export type Query_RootNominator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


export type Query_RootNominator_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperatorArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


export type Query_RootOperator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


export type Query_RootOperator_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootWithdrawalArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


export type Query_RootWithdrawal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


export type Query_RootWithdrawal_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table in a streaming manner: "account" */
  account_stream: Array<Account>;
  /** fetch data from the table: "deposit" */
  deposit: Array<Deposit>;
  /** fetch aggregated fields from the table: "deposit" */
  deposit_aggregate: Deposit_Aggregate;
  /** fetch data from the table: "deposit" using primary key columns */
  deposit_by_pk?: Maybe<Deposit>;
  /** fetch data from the table in a streaming manner: "deposit" */
  deposit_stream: Array<Deposit>;
  /** fetch data from the table: "domain" */
  domain: Array<Domain>;
  /** fetch aggregated fields from the table: "domain" */
  domain_aggregate: Domain_Aggregate;
  /** fetch data from the table: "domain" using primary key columns */
  domain_by_pk?: Maybe<Domain>;
  /** fetch data from the table in a streaming manner: "domain" */
  domain_stream: Array<Domain>;
  /** fetch data from the table: "nominator" */
  nominator: Array<Nominator>;
  /** fetch aggregated fields from the table: "nominator" */
  nominator_aggregate: Nominator_Aggregate;
  /** fetch data from the table: "nominator" using primary key columns */
  nominator_by_pk?: Maybe<Nominator>;
  /** fetch data from the table in a streaming manner: "nominator" */
  nominator_stream: Array<Nominator>;
  /** fetch data from the table: "operator" */
  operator: Array<Operator>;
  /** fetch aggregated fields from the table: "operator" */
  operator_aggregate: Operator_Aggregate;
  /** fetch data from the table: "operator" using primary key columns */
  operator_by_pk?: Maybe<Operator>;
  /** fetch data from the table in a streaming manner: "operator" */
  operator_stream: Array<Operator>;
  /** fetch data from the table: "withdrawal" */
  withdrawal: Array<Withdrawal>;
  /** fetch aggregated fields from the table: "withdrawal" */
  withdrawal_aggregate: Withdrawal_Aggregate;
  /** fetch data from the table: "withdrawal" using primary key columns */
  withdrawal_by_pk?: Maybe<Withdrawal>;
  /** fetch data from the table in a streaming manner: "withdrawal" */
  withdrawal_stream: Array<Withdrawal>;
};


export type Subscription_RootAccountArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAccount_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Order_By>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootAccount_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootDepositArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


export type Subscription_RootDeposit_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deposit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deposit_Order_By>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


export type Subscription_RootDeposit_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDeposit_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Deposit_Stream_Cursor_Input>>;
  where?: InputMaybe<Deposit_Bool_Exp>;
};


export type Subscription_RootDomainArgs = {
  distinct_on?: InputMaybe<Array<Domain_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Domain_Order_By>>;
  where?: InputMaybe<Domain_Bool_Exp>;
};


export type Subscription_RootDomain_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Domain_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Domain_Order_By>>;
  where?: InputMaybe<Domain_Bool_Exp>;
};


export type Subscription_RootDomain_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDomain_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Domain_Stream_Cursor_Input>>;
  where?: InputMaybe<Domain_Bool_Exp>;
};


export type Subscription_RootNominatorArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


export type Subscription_RootNominator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Order_By>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


export type Subscription_RootNominator_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootNominator_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Nominator_Stream_Cursor_Input>>;
  where?: InputMaybe<Nominator_Bool_Exp>;
};


export type Subscription_RootOperatorArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


export type Subscription_RootOperator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Order_By>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


export type Subscription_RootOperator_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Bool_Exp>;
};


export type Subscription_RootWithdrawalArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


export type Subscription_RootWithdrawal_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdrawal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Withdrawal_Order_By>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};


export type Subscription_RootWithdrawal_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootWithdrawal_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Withdrawal_Stream_Cursor_Input>>;
  where?: InputMaybe<Withdrawal_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "withdrawal" */
export type Withdrawal = {
  __typename?: 'withdrawal';
  /** An object relationship */
  account?: Maybe<Account>;
  account_id: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  /** An object relationship */
  domain?: Maybe<Domain>;
  domain_id: Scalars['String']['output'];
  extrinsic_hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** An object relationship */
  nominator?: Maybe<Nominator>;
  nominator_id: Scalars['String']['output'];
  /** An object relationship */
  operator?: Maybe<Operator>;
  operator_id: Scalars['String']['output'];
  shares: Scalars['numeric']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** aggregated selection of "withdrawal" */
export type Withdrawal_Aggregate = {
  __typename?: 'withdrawal_aggregate';
  aggregate?: Maybe<Withdrawal_Aggregate_Fields>;
  nodes: Array<Withdrawal>;
};

export type Withdrawal_Aggregate_Bool_Exp = {
  count?: InputMaybe<Withdrawal_Aggregate_Bool_Exp_Count>;
};

export type Withdrawal_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Withdrawal_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Withdrawal_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "withdrawal" */
export type Withdrawal_Aggregate_Fields = {
  __typename?: 'withdrawal_aggregate_fields';
  avg?: Maybe<Withdrawal_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Withdrawal_Max_Fields>;
  min?: Maybe<Withdrawal_Min_Fields>;
  stddev?: Maybe<Withdrawal_Stddev_Fields>;
  stddev_pop?: Maybe<Withdrawal_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Withdrawal_Stddev_Samp_Fields>;
  sum?: Maybe<Withdrawal_Sum_Fields>;
  var_pop?: Maybe<Withdrawal_Var_Pop_Fields>;
  var_samp?: Maybe<Withdrawal_Var_Samp_Fields>;
  variance?: Maybe<Withdrawal_Variance_Fields>;
};


/** aggregate fields of "withdrawal" */
export type Withdrawal_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Withdrawal_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "withdrawal" */
export type Withdrawal_Aggregate_Order_By = {
  avg?: InputMaybe<Withdrawal_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Withdrawal_Max_Order_By>;
  min?: InputMaybe<Withdrawal_Min_Order_By>;
  stddev?: InputMaybe<Withdrawal_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Withdrawal_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Withdrawal_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Withdrawal_Sum_Order_By>;
  var_pop?: InputMaybe<Withdrawal_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Withdrawal_Var_Samp_Order_By>;
  variance?: InputMaybe<Withdrawal_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Withdrawal_Avg_Fields = {
  __typename?: 'withdrawal_avg_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "withdrawal" */
export type Withdrawal_Avg_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "withdrawal". All fields are combined with a logical 'AND'. */
export type Withdrawal_Bool_Exp = {
  _and?: InputMaybe<Array<Withdrawal_Bool_Exp>>;
  _not?: InputMaybe<Withdrawal_Bool_Exp>;
  _or?: InputMaybe<Array<Withdrawal_Bool_Exp>>;
  account?: InputMaybe<Account_Bool_Exp>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  domain?: InputMaybe<Domain_Bool_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  extrinsic_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  nominator?: InputMaybe<Nominator_Bool_Exp>;
  nominator_id?: InputMaybe<String_Comparison_Exp>;
  operator?: InputMaybe<Operator_Bool_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  shares?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Withdrawal_Max_Fields = {
  __typename?: 'withdrawal_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  block_number?: Maybe<Scalars['Int']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "withdrawal" */
export type Withdrawal_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Withdrawal_Min_Fields = {
  __typename?: 'withdrawal_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  block_number?: Maybe<Scalars['Int']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  extrinsic_hash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  nominator_id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "withdrawal" */
export type Withdrawal_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "withdrawal". */
export type Withdrawal_Order_By = {
  account?: InputMaybe<Account_Order_By>;
  account_id?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  domain?: InputMaybe<Domain_Order_By>;
  domain_id?: InputMaybe<Order_By>;
  extrinsic_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nominator?: InputMaybe<Nominator_Order_By>;
  nominator_id?: InputMaybe<Order_By>;
  operator?: InputMaybe<Operator_Order_By>;
  operator_id?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "withdrawal" */
export enum Withdrawal_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  ExtrinsicHash = 'extrinsic_hash',
  /** column name */
  Id = 'id',
  /** column name */
  NominatorId = 'nominator_id',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  Shares = 'shares',
  /** column name */
  Status = 'status',
  /** column name */
  Timestamp = 'timestamp'
}

/** aggregate stddev on columns */
export type Withdrawal_Stddev_Fields = {
  __typename?: 'withdrawal_stddev_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "withdrawal" */
export type Withdrawal_Stddev_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Withdrawal_Stddev_Pop_Fields = {
  __typename?: 'withdrawal_stddev_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "withdrawal" */
export type Withdrawal_Stddev_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Withdrawal_Stddev_Samp_Fields = {
  __typename?: 'withdrawal_stddev_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "withdrawal" */
export type Withdrawal_Stddev_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "withdrawal" */
export type Withdrawal_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Withdrawal_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Withdrawal_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  extrinsic_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nominator_id?: InputMaybe<Scalars['String']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Withdrawal_Sum_Fields = {
  __typename?: 'withdrawal_sum_fields';
  block_number?: Maybe<Scalars['Int']['output']>;
  shares?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "withdrawal" */
export type Withdrawal_Sum_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Withdrawal_Var_Pop_Fields = {
  __typename?: 'withdrawal_var_pop_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "withdrawal" */
export type Withdrawal_Var_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Withdrawal_Var_Samp_Fields = {
  __typename?: 'withdrawal_var_samp_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "withdrawal" */
export type Withdrawal_Var_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Withdrawal_Variance_Fields = {
  __typename?: 'withdrawal_variance_fields';
  block_number?: Maybe<Scalars['Float']['output']>;
  shares?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "withdrawal" */
export type Withdrawal_Variance_Order_By = {
  block_number?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
};

export type OperatorsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Order_By> | Operator_Order_By;
  where?: InputMaybe<Operator_Bool_Exp>;
}>;


export type OperatorsListQuery = { __typename?: 'query_root', operator_aggregate: { __typename?: 'operator_aggregate', aggregate?: { __typename?: 'operator_aggregate_fields', count: number } | null }, operator: Array<{ __typename?: 'operator', id: string, sort_id: number, account_id: string, domain_id: string, current_epoch_rewards: any, current_total_stake: any, current_total_shares: any, minimum_nominator_stake: any, nomination_tax: number, signing_key: string, status: string, raw_status?: string | null, updated_at?: number | null, domain?: { __typename?: 'domain', id: string, sort_id: number } | null, nominators_aggregate: { __typename?: 'nominator_aggregate', aggregate?: { __typename?: 'nominator_aggregate_fields', count: number } | null }, nominators: Array<{ __typename?: 'nominator', id: string, shares: any }> }> };

export type OperatorByIdQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
}>;


export type OperatorByIdQuery = { __typename?: 'query_root', operator_by_pk?: { __typename?: 'operator', id: string, account_id: string, domain_id: string, current_epoch_rewards: any, current_total_stake: any, current_total_shares: any, minimum_nominator_stake: any, nomination_tax: number, signing_key: string, status: string, raw_status?: string | null, updated_at?: number | null, domain?: { __typename?: 'domain', id: string, sort_id: number } | null } | null };

export type OperatorNominatorsByIdQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Nominator_Order_By> | Nominator_Order_By;
  where?: InputMaybe<Nominator_Bool_Exp>;
}>;


export type OperatorNominatorsByIdQuery = { __typename?: 'query_root', nominator_aggregate: { __typename?: 'nominator_aggregate', aggregate?: { __typename?: 'nominator_aggregate_fields', count: number } | null }, nominator: Array<{ __typename?: 'nominator', id: string, shares: any, account_id: string, domain_id: string }> };

export type NominatorsConnectionQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Nominator_Order_By> | Nominator_Order_By;
  where?: InputMaybe<Nominator_Bool_Exp>;
}>;


export type NominatorsConnectionQuery = { __typename?: 'query_root', nominator_aggregate: { __typename?: 'nominator_aggregate', aggregate?: { __typename?: 'nominator_aggregate_fields', count: number } | null }, nominator: Array<{ __typename?: 'nominator', id: string, shares: any, account_id: string, domain_id: string, updated_at?: number | null, operator?: { __typename?: 'operator', id: string, account_id: string, domain_id: string, current_epoch_rewards: any, current_total_stake: any, current_total_shares: any, minimum_nominator_stake: any, nomination_tax: number, signing_key: string, status: string, raw_status?: string | null, updated_at?: number | null } | null }> };
