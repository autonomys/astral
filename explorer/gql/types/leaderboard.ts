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

/** columns and relationships of "account_extrinsic_failed_total_count" */
export type Account_Extrinsic_Failed_Total_Count = {
  __typename?: 'account_extrinsic_failed_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "account_extrinsic_failed_total_count" */
export type Account_Extrinsic_Failed_Total_Count_Aggregate = {
  __typename?: 'account_extrinsic_failed_total_count_aggregate';
  aggregate?: Maybe<Account_Extrinsic_Failed_Total_Count_Aggregate_Fields>;
  nodes: Array<Account_Extrinsic_Failed_Total_Count>;
};

/** aggregate fields of "account_extrinsic_failed_total_count" */
export type Account_Extrinsic_Failed_Total_Count_Aggregate_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_aggregate_fields';
  avg?: Maybe<Account_Extrinsic_Failed_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Extrinsic_Failed_Total_Count_Max_Fields>;
  min?: Maybe<Account_Extrinsic_Failed_Total_Count_Min_Fields>;
  stddev?: Maybe<Account_Extrinsic_Failed_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Extrinsic_Failed_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Extrinsic_Failed_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Extrinsic_Failed_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Account_Extrinsic_Failed_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Extrinsic_Failed_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Account_Extrinsic_Failed_Total_Count_Variance_Fields>;
};


/** aggregate fields of "account_extrinsic_failed_total_count" */
export type Account_Extrinsic_Failed_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Extrinsic_Failed_Total_Count_Avg_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_extrinsic_failed_total_count". All fields are combined with a logical 'AND'. */
export type Account_Extrinsic_Failed_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Extrinsic_Failed_Total_Count_Max_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Extrinsic_Failed_Total_Count_Min_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_extrinsic_failed_total_count". */
export type Account_Extrinsic_Failed_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_extrinsic_failed_total_count" */
export enum Account_Extrinsic_Failed_Total_Count_Select_Column {
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
export type Account_Extrinsic_Failed_Total_Count_Stddev_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Extrinsic_Failed_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Extrinsic_Failed_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_extrinsic_failed_total_count" */
export type Account_Extrinsic_Failed_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Extrinsic_Failed_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Extrinsic_Failed_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Extrinsic_Failed_Total_Count_Sum_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Extrinsic_Failed_Total_Count_Var_Pop_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Extrinsic_Failed_Total_Count_Var_Samp_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Extrinsic_Failed_Total_Count_Variance_Fields = {
  __typename?: 'account_extrinsic_failed_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_extrinsic_success_total_count" */
export type Account_Extrinsic_Success_Total_Count = {
  __typename?: 'account_extrinsic_success_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "account_extrinsic_success_total_count" */
export type Account_Extrinsic_Success_Total_Count_Aggregate = {
  __typename?: 'account_extrinsic_success_total_count_aggregate';
  aggregate?: Maybe<Account_Extrinsic_Success_Total_Count_Aggregate_Fields>;
  nodes: Array<Account_Extrinsic_Success_Total_Count>;
};

/** aggregate fields of "account_extrinsic_success_total_count" */
export type Account_Extrinsic_Success_Total_Count_Aggregate_Fields = {
  __typename?: 'account_extrinsic_success_total_count_aggregate_fields';
  avg?: Maybe<Account_Extrinsic_Success_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Extrinsic_Success_Total_Count_Max_Fields>;
  min?: Maybe<Account_Extrinsic_Success_Total_Count_Min_Fields>;
  stddev?: Maybe<Account_Extrinsic_Success_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Extrinsic_Success_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Extrinsic_Success_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Extrinsic_Success_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Account_Extrinsic_Success_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Extrinsic_Success_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Account_Extrinsic_Success_Total_Count_Variance_Fields>;
};


/** aggregate fields of "account_extrinsic_success_total_count" */
export type Account_Extrinsic_Success_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Extrinsic_Success_Total_Count_Avg_Fields = {
  __typename?: 'account_extrinsic_success_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_extrinsic_success_total_count". All fields are combined with a logical 'AND'. */
export type Account_Extrinsic_Success_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Extrinsic_Success_Total_Count_Max_Fields = {
  __typename?: 'account_extrinsic_success_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Extrinsic_Success_Total_Count_Min_Fields = {
  __typename?: 'account_extrinsic_success_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_extrinsic_success_total_count". */
export type Account_Extrinsic_Success_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_extrinsic_success_total_count" */
export enum Account_Extrinsic_Success_Total_Count_Select_Column {
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
export type Account_Extrinsic_Success_Total_Count_Stddev_Fields = {
  __typename?: 'account_extrinsic_success_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Extrinsic_Success_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'account_extrinsic_success_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Extrinsic_Success_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'account_extrinsic_success_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_extrinsic_success_total_count" */
export type Account_Extrinsic_Success_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Extrinsic_Success_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Extrinsic_Success_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Extrinsic_Success_Total_Count_Sum_Fields = {
  __typename?: 'account_extrinsic_success_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Extrinsic_Success_Total_Count_Var_Pop_Fields = {
  __typename?: 'account_extrinsic_success_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Extrinsic_Success_Total_Count_Var_Samp_Fields = {
  __typename?: 'account_extrinsic_success_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Extrinsic_Success_Total_Count_Variance_Fields = {
  __typename?: 'account_extrinsic_success_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_extrinsic_total_count" */
export type Account_Extrinsic_Total_Count = {
  __typename?: 'account_extrinsic_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "account_extrinsic_total_count" */
export type Account_Extrinsic_Total_Count_Aggregate = {
  __typename?: 'account_extrinsic_total_count_aggregate';
  aggregate?: Maybe<Account_Extrinsic_Total_Count_Aggregate_Fields>;
  nodes: Array<Account_Extrinsic_Total_Count>;
};

/** aggregate fields of "account_extrinsic_total_count" */
export type Account_Extrinsic_Total_Count_Aggregate_Fields = {
  __typename?: 'account_extrinsic_total_count_aggregate_fields';
  avg?: Maybe<Account_Extrinsic_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Extrinsic_Total_Count_Max_Fields>;
  min?: Maybe<Account_Extrinsic_Total_Count_Min_Fields>;
  stddev?: Maybe<Account_Extrinsic_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Extrinsic_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Extrinsic_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Extrinsic_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Account_Extrinsic_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Extrinsic_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Account_Extrinsic_Total_Count_Variance_Fields>;
};


/** aggregate fields of "account_extrinsic_total_count" */
export type Account_Extrinsic_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Extrinsic_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Extrinsic_Total_Count_Avg_Fields = {
  __typename?: 'account_extrinsic_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_extrinsic_total_count". All fields are combined with a logical 'AND'. */
export type Account_Extrinsic_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Extrinsic_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Extrinsic_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Extrinsic_Total_Count_Max_Fields = {
  __typename?: 'account_extrinsic_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Extrinsic_Total_Count_Min_Fields = {
  __typename?: 'account_extrinsic_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_extrinsic_total_count". */
export type Account_Extrinsic_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_extrinsic_total_count" */
export enum Account_Extrinsic_Total_Count_Select_Column {
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
export type Account_Extrinsic_Total_Count_Stddev_Fields = {
  __typename?: 'account_extrinsic_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Extrinsic_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'account_extrinsic_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Extrinsic_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'account_extrinsic_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_extrinsic_total_count" */
export type Account_Extrinsic_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Extrinsic_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Extrinsic_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Extrinsic_Total_Count_Sum_Fields = {
  __typename?: 'account_extrinsic_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Extrinsic_Total_Count_Var_Pop_Fields = {
  __typename?: 'account_extrinsic_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Extrinsic_Total_Count_Var_Samp_Fields = {
  __typename?: 'account_extrinsic_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Extrinsic_Total_Count_Variance_Fields = {
  __typename?: 'account_extrinsic_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_remark_count" */
export type Account_Remark_Count = {
  __typename?: 'account_remark_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "account_remark_count" */
export type Account_Remark_Count_Aggregate = {
  __typename?: 'account_remark_count_aggregate';
  aggregate?: Maybe<Account_Remark_Count_Aggregate_Fields>;
  nodes: Array<Account_Remark_Count>;
};

/** aggregate fields of "account_remark_count" */
export type Account_Remark_Count_Aggregate_Fields = {
  __typename?: 'account_remark_count_aggregate_fields';
  avg?: Maybe<Account_Remark_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Remark_Count_Max_Fields>;
  min?: Maybe<Account_Remark_Count_Min_Fields>;
  stddev?: Maybe<Account_Remark_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Remark_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Remark_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Remark_Count_Sum_Fields>;
  var_pop?: Maybe<Account_Remark_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Remark_Count_Var_Samp_Fields>;
  variance?: Maybe<Account_Remark_Count_Variance_Fields>;
};


/** aggregate fields of "account_remark_count" */
export type Account_Remark_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Remark_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Remark_Count_Avg_Fields = {
  __typename?: 'account_remark_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_remark_count". All fields are combined with a logical 'AND'. */
export type Account_Remark_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Remark_Count_Bool_Exp>>;
  _not?: InputMaybe<Account_Remark_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Remark_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Remark_Count_Max_Fields = {
  __typename?: 'account_remark_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Remark_Count_Min_Fields = {
  __typename?: 'account_remark_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_remark_count". */
export type Account_Remark_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_remark_count" */
export enum Account_Remark_Count_Select_Column {
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
export type Account_Remark_Count_Stddev_Fields = {
  __typename?: 'account_remark_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Remark_Count_Stddev_Pop_Fields = {
  __typename?: 'account_remark_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Remark_Count_Stddev_Samp_Fields = {
  __typename?: 'account_remark_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_remark_count" */
export type Account_Remark_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Remark_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Remark_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Remark_Count_Sum_Fields = {
  __typename?: 'account_remark_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Remark_Count_Var_Pop_Fields = {
  __typename?: 'account_remark_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Remark_Count_Var_Samp_Fields = {
  __typename?: 'account_remark_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Remark_Count_Variance_Fields = {
  __typename?: 'account_remark_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_transaction_fee_paid_total_value" */
export type Account_Transaction_Fee_Paid_Total_Value = {
  __typename?: 'account_transaction_fee_paid_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "account_transaction_fee_paid_total_value" */
export type Account_Transaction_Fee_Paid_Total_Value_Aggregate = {
  __typename?: 'account_transaction_fee_paid_total_value_aggregate';
  aggregate?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Aggregate_Fields>;
  nodes: Array<Account_Transaction_Fee_Paid_Total_Value>;
};

/** aggregate fields of "account_transaction_fee_paid_total_value" */
export type Account_Transaction_Fee_Paid_Total_Value_Aggregate_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_aggregate_fields';
  avg?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Max_Fields>;
  min?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Min_Fields>;
  stddev?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Account_Transaction_Fee_Paid_Total_Value_Variance_Fields>;
};


/** aggregate fields of "account_transaction_fee_paid_total_value" */
export type Account_Transaction_Fee_Paid_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Avg_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_transaction_fee_paid_total_value". All fields are combined with a logical 'AND'. */
export type Account_Transaction_Fee_Paid_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Max_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Min_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "account_transaction_fee_paid_total_value". */
export type Account_Transaction_Fee_Paid_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_transaction_fee_paid_total_value" */
export enum Account_Transaction_Fee_Paid_Total_Value_Select_Column {
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
export type Account_Transaction_Fee_Paid_Total_Value_Stddev_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_transaction_fee_paid_total_value" */
export type Account_Transaction_Fee_Paid_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Transaction_Fee_Paid_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Transaction_Fee_Paid_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Sum_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Var_Pop_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Var_Samp_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Transaction_Fee_Paid_Total_Value_Variance_Fields = {
  __typename?: 'account_transaction_fee_paid_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_transfer_receiver_total_count" */
export type Account_Transfer_Receiver_Total_Count = {
  __typename?: 'account_transfer_receiver_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "account_transfer_receiver_total_count" */
export type Account_Transfer_Receiver_Total_Count_Aggregate = {
  __typename?: 'account_transfer_receiver_total_count_aggregate';
  aggregate?: Maybe<Account_Transfer_Receiver_Total_Count_Aggregate_Fields>;
  nodes: Array<Account_Transfer_Receiver_Total_Count>;
};

/** aggregate fields of "account_transfer_receiver_total_count" */
export type Account_Transfer_Receiver_Total_Count_Aggregate_Fields = {
  __typename?: 'account_transfer_receiver_total_count_aggregate_fields';
  avg?: Maybe<Account_Transfer_Receiver_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Transfer_Receiver_Total_Count_Max_Fields>;
  min?: Maybe<Account_Transfer_Receiver_Total_Count_Min_Fields>;
  stddev?: Maybe<Account_Transfer_Receiver_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Transfer_Receiver_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Transfer_Receiver_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Transfer_Receiver_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Account_Transfer_Receiver_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Transfer_Receiver_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Account_Transfer_Receiver_Total_Count_Variance_Fields>;
};


/** aggregate fields of "account_transfer_receiver_total_count" */
export type Account_Transfer_Receiver_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Transfer_Receiver_Total_Count_Avg_Fields = {
  __typename?: 'account_transfer_receiver_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_transfer_receiver_total_count". All fields are combined with a logical 'AND'. */
export type Account_Transfer_Receiver_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Transfer_Receiver_Total_Count_Max_Fields = {
  __typename?: 'account_transfer_receiver_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Transfer_Receiver_Total_Count_Min_Fields = {
  __typename?: 'account_transfer_receiver_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_transfer_receiver_total_count". */
export type Account_Transfer_Receiver_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_transfer_receiver_total_count" */
export enum Account_Transfer_Receiver_Total_Count_Select_Column {
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
export type Account_Transfer_Receiver_Total_Count_Stddev_Fields = {
  __typename?: 'account_transfer_receiver_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Transfer_Receiver_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'account_transfer_receiver_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Transfer_Receiver_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'account_transfer_receiver_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_transfer_receiver_total_count" */
export type Account_Transfer_Receiver_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Transfer_Receiver_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Transfer_Receiver_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Transfer_Receiver_Total_Count_Sum_Fields = {
  __typename?: 'account_transfer_receiver_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Transfer_Receiver_Total_Count_Var_Pop_Fields = {
  __typename?: 'account_transfer_receiver_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Transfer_Receiver_Total_Count_Var_Samp_Fields = {
  __typename?: 'account_transfer_receiver_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Transfer_Receiver_Total_Count_Variance_Fields = {
  __typename?: 'account_transfer_receiver_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_transfer_receiver_total_value" */
export type Account_Transfer_Receiver_Total_Value = {
  __typename?: 'account_transfer_receiver_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "account_transfer_receiver_total_value" */
export type Account_Transfer_Receiver_Total_Value_Aggregate = {
  __typename?: 'account_transfer_receiver_total_value_aggregate';
  aggregate?: Maybe<Account_Transfer_Receiver_Total_Value_Aggregate_Fields>;
  nodes: Array<Account_Transfer_Receiver_Total_Value>;
};

/** aggregate fields of "account_transfer_receiver_total_value" */
export type Account_Transfer_Receiver_Total_Value_Aggregate_Fields = {
  __typename?: 'account_transfer_receiver_total_value_aggregate_fields';
  avg?: Maybe<Account_Transfer_Receiver_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Transfer_Receiver_Total_Value_Max_Fields>;
  min?: Maybe<Account_Transfer_Receiver_Total_Value_Min_Fields>;
  stddev?: Maybe<Account_Transfer_Receiver_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Transfer_Receiver_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Transfer_Receiver_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Transfer_Receiver_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Account_Transfer_Receiver_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Transfer_Receiver_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Account_Transfer_Receiver_Total_Value_Variance_Fields>;
};


/** aggregate fields of "account_transfer_receiver_total_value" */
export type Account_Transfer_Receiver_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Transfer_Receiver_Total_Value_Avg_Fields = {
  __typename?: 'account_transfer_receiver_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_transfer_receiver_total_value". All fields are combined with a logical 'AND'. */
export type Account_Transfer_Receiver_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Transfer_Receiver_Total_Value_Max_Fields = {
  __typename?: 'account_transfer_receiver_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Account_Transfer_Receiver_Total_Value_Min_Fields = {
  __typename?: 'account_transfer_receiver_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "account_transfer_receiver_total_value". */
export type Account_Transfer_Receiver_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_transfer_receiver_total_value" */
export enum Account_Transfer_Receiver_Total_Value_Select_Column {
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
export type Account_Transfer_Receiver_Total_Value_Stddev_Fields = {
  __typename?: 'account_transfer_receiver_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Transfer_Receiver_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'account_transfer_receiver_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Transfer_Receiver_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'account_transfer_receiver_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_transfer_receiver_total_value" */
export type Account_Transfer_Receiver_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Transfer_Receiver_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Transfer_Receiver_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Account_Transfer_Receiver_Total_Value_Sum_Fields = {
  __typename?: 'account_transfer_receiver_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Transfer_Receiver_Total_Value_Var_Pop_Fields = {
  __typename?: 'account_transfer_receiver_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Transfer_Receiver_Total_Value_Var_Samp_Fields = {
  __typename?: 'account_transfer_receiver_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Transfer_Receiver_Total_Value_Variance_Fields = {
  __typename?: 'account_transfer_receiver_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_transfer_sender_total_count" */
export type Account_Transfer_Sender_Total_Count = {
  __typename?: 'account_transfer_sender_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "account_transfer_sender_total_count" */
export type Account_Transfer_Sender_Total_Count_Aggregate = {
  __typename?: 'account_transfer_sender_total_count_aggregate';
  aggregate?: Maybe<Account_Transfer_Sender_Total_Count_Aggregate_Fields>;
  nodes: Array<Account_Transfer_Sender_Total_Count>;
};

/** aggregate fields of "account_transfer_sender_total_count" */
export type Account_Transfer_Sender_Total_Count_Aggregate_Fields = {
  __typename?: 'account_transfer_sender_total_count_aggregate_fields';
  avg?: Maybe<Account_Transfer_Sender_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Transfer_Sender_Total_Count_Max_Fields>;
  min?: Maybe<Account_Transfer_Sender_Total_Count_Min_Fields>;
  stddev?: Maybe<Account_Transfer_Sender_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Transfer_Sender_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Transfer_Sender_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Transfer_Sender_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Account_Transfer_Sender_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Transfer_Sender_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Account_Transfer_Sender_Total_Count_Variance_Fields>;
};


/** aggregate fields of "account_transfer_sender_total_count" */
export type Account_Transfer_Sender_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Transfer_Sender_Total_Count_Avg_Fields = {
  __typename?: 'account_transfer_sender_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_transfer_sender_total_count". All fields are combined with a logical 'AND'. */
export type Account_Transfer_Sender_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Transfer_Sender_Total_Count_Max_Fields = {
  __typename?: 'account_transfer_sender_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Transfer_Sender_Total_Count_Min_Fields = {
  __typename?: 'account_transfer_sender_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_transfer_sender_total_count". */
export type Account_Transfer_Sender_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_transfer_sender_total_count" */
export enum Account_Transfer_Sender_Total_Count_Select_Column {
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
export type Account_Transfer_Sender_Total_Count_Stddev_Fields = {
  __typename?: 'account_transfer_sender_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Transfer_Sender_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'account_transfer_sender_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Transfer_Sender_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'account_transfer_sender_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_transfer_sender_total_count" */
export type Account_Transfer_Sender_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Transfer_Sender_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Transfer_Sender_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Transfer_Sender_Total_Count_Sum_Fields = {
  __typename?: 'account_transfer_sender_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Transfer_Sender_Total_Count_Var_Pop_Fields = {
  __typename?: 'account_transfer_sender_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Transfer_Sender_Total_Count_Var_Samp_Fields = {
  __typename?: 'account_transfer_sender_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Transfer_Sender_Total_Count_Variance_Fields = {
  __typename?: 'account_transfer_sender_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "account_transfer_sender_total_value" */
export type Account_Transfer_Sender_Total_Value = {
  __typename?: 'account_transfer_sender_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "account_transfer_sender_total_value" */
export type Account_Transfer_Sender_Total_Value_Aggregate = {
  __typename?: 'account_transfer_sender_total_value_aggregate';
  aggregate?: Maybe<Account_Transfer_Sender_Total_Value_Aggregate_Fields>;
  nodes: Array<Account_Transfer_Sender_Total_Value>;
};

/** aggregate fields of "account_transfer_sender_total_value" */
export type Account_Transfer_Sender_Total_Value_Aggregate_Fields = {
  __typename?: 'account_transfer_sender_total_value_aggregate_fields';
  avg?: Maybe<Account_Transfer_Sender_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Transfer_Sender_Total_Value_Max_Fields>;
  min?: Maybe<Account_Transfer_Sender_Total_Value_Min_Fields>;
  stddev?: Maybe<Account_Transfer_Sender_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Transfer_Sender_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Transfer_Sender_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Transfer_Sender_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Account_Transfer_Sender_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Transfer_Sender_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Account_Transfer_Sender_Total_Value_Variance_Fields>;
};


/** aggregate fields of "account_transfer_sender_total_value" */
export type Account_Transfer_Sender_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Transfer_Sender_Total_Value_Avg_Fields = {
  __typename?: 'account_transfer_sender_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_transfer_sender_total_value". All fields are combined with a logical 'AND'. */
export type Account_Transfer_Sender_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Transfer_Sender_Total_Value_Max_Fields = {
  __typename?: 'account_transfer_sender_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Account_Transfer_Sender_Total_Value_Min_Fields = {
  __typename?: 'account_transfer_sender_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "account_transfer_sender_total_value". */
export type Account_Transfer_Sender_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "account_transfer_sender_total_value" */
export enum Account_Transfer_Sender_Total_Value_Select_Column {
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
export type Account_Transfer_Sender_Total_Value_Stddev_Fields = {
  __typename?: 'account_transfer_sender_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Transfer_Sender_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'account_transfer_sender_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Transfer_Sender_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'account_transfer_sender_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_transfer_sender_total_value" */
export type Account_Transfer_Sender_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Transfer_Sender_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Transfer_Sender_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Account_Transfer_Sender_Total_Value_Sum_Fields = {
  __typename?: 'account_transfer_sender_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Transfer_Sender_Total_Value_Var_Pop_Fields = {
  __typename?: 'account_transfer_sender_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Transfer_Sender_Total_Value_Var_Samp_Fields = {
  __typename?: 'account_transfer_sender_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Transfer_Sender_Total_Value_Variance_Fields = {
  __typename?: 'account_transfer_sender_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "farmer_block_total_count" */
export type Farmer_Block_Total_Count = {
  __typename?: 'farmer_block_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "farmer_block_total_count" */
export type Farmer_Block_Total_Count_Aggregate = {
  __typename?: 'farmer_block_total_count_aggregate';
  aggregate?: Maybe<Farmer_Block_Total_Count_Aggregate_Fields>;
  nodes: Array<Farmer_Block_Total_Count>;
};

/** aggregate fields of "farmer_block_total_count" */
export type Farmer_Block_Total_Count_Aggregate_Fields = {
  __typename?: 'farmer_block_total_count_aggregate_fields';
  avg?: Maybe<Farmer_Block_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Farmer_Block_Total_Count_Max_Fields>;
  min?: Maybe<Farmer_Block_Total_Count_Min_Fields>;
  stddev?: Maybe<Farmer_Block_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Farmer_Block_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Farmer_Block_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Farmer_Block_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Farmer_Block_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Farmer_Block_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Farmer_Block_Total_Count_Variance_Fields>;
};


/** aggregate fields of "farmer_block_total_count" */
export type Farmer_Block_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Farmer_Block_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Farmer_Block_Total_Count_Avg_Fields = {
  __typename?: 'farmer_block_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "farmer_block_total_count". All fields are combined with a logical 'AND'. */
export type Farmer_Block_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Farmer_Block_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Farmer_Block_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Farmer_Block_Total_Count_Max_Fields = {
  __typename?: 'farmer_block_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Farmer_Block_Total_Count_Min_Fields = {
  __typename?: 'farmer_block_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "farmer_block_total_count". */
export type Farmer_Block_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "farmer_block_total_count" */
export enum Farmer_Block_Total_Count_Select_Column {
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
export type Farmer_Block_Total_Count_Stddev_Fields = {
  __typename?: 'farmer_block_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Farmer_Block_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'farmer_block_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Farmer_Block_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'farmer_block_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "farmer_block_total_count" */
export type Farmer_Block_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Farmer_Block_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Farmer_Block_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Farmer_Block_Total_Count_Sum_Fields = {
  __typename?: 'farmer_block_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Farmer_Block_Total_Count_Var_Pop_Fields = {
  __typename?: 'farmer_block_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Farmer_Block_Total_Count_Var_Samp_Fields = {
  __typename?: 'farmer_block_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Farmer_Block_Total_Count_Variance_Fields = {
  __typename?: 'farmer_block_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "farmer_block_total_value" */
export type Farmer_Block_Total_Value = {
  __typename?: 'farmer_block_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "farmer_block_total_value" */
export type Farmer_Block_Total_Value_Aggregate = {
  __typename?: 'farmer_block_total_value_aggregate';
  aggregate?: Maybe<Farmer_Block_Total_Value_Aggregate_Fields>;
  nodes: Array<Farmer_Block_Total_Value>;
};

/** aggregate fields of "farmer_block_total_value" */
export type Farmer_Block_Total_Value_Aggregate_Fields = {
  __typename?: 'farmer_block_total_value_aggregate_fields';
  avg?: Maybe<Farmer_Block_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Farmer_Block_Total_Value_Max_Fields>;
  min?: Maybe<Farmer_Block_Total_Value_Min_Fields>;
  stddev?: Maybe<Farmer_Block_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Farmer_Block_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Farmer_Block_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Farmer_Block_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Farmer_Block_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Farmer_Block_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Farmer_Block_Total_Value_Variance_Fields>;
};


/** aggregate fields of "farmer_block_total_value" */
export type Farmer_Block_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Farmer_Block_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Farmer_Block_Total_Value_Avg_Fields = {
  __typename?: 'farmer_block_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "farmer_block_total_value". All fields are combined with a logical 'AND'. */
export type Farmer_Block_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Farmer_Block_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Farmer_Block_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Farmer_Block_Total_Value_Max_Fields = {
  __typename?: 'farmer_block_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Farmer_Block_Total_Value_Min_Fields = {
  __typename?: 'farmer_block_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "farmer_block_total_value". */
export type Farmer_Block_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "farmer_block_total_value" */
export enum Farmer_Block_Total_Value_Select_Column {
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
export type Farmer_Block_Total_Value_Stddev_Fields = {
  __typename?: 'farmer_block_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Farmer_Block_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'farmer_block_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Farmer_Block_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'farmer_block_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "farmer_block_total_value" */
export type Farmer_Block_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Farmer_Block_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Farmer_Block_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Farmer_Block_Total_Value_Sum_Fields = {
  __typename?: 'farmer_block_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Farmer_Block_Total_Value_Var_Pop_Fields = {
  __typename?: 'farmer_block_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Farmer_Block_Total_Value_Var_Samp_Fields = {
  __typename?: 'farmer_block_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Farmer_Block_Total_Value_Variance_Fields = {
  __typename?: 'farmer_block_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "farmer_vote_and_block_total_count" */
export type Farmer_Vote_And_Block_Total_Count = {
  __typename?: 'farmer_vote_and_block_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "farmer_vote_and_block_total_count" */
export type Farmer_Vote_And_Block_Total_Count_Aggregate = {
  __typename?: 'farmer_vote_and_block_total_count_aggregate';
  aggregate?: Maybe<Farmer_Vote_And_Block_Total_Count_Aggregate_Fields>;
  nodes: Array<Farmer_Vote_And_Block_Total_Count>;
};

/** aggregate fields of "farmer_vote_and_block_total_count" */
export type Farmer_Vote_And_Block_Total_Count_Aggregate_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_aggregate_fields';
  avg?: Maybe<Farmer_Vote_And_Block_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Farmer_Vote_And_Block_Total_Count_Max_Fields>;
  min?: Maybe<Farmer_Vote_And_Block_Total_Count_Min_Fields>;
  stddev?: Maybe<Farmer_Vote_And_Block_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Farmer_Vote_And_Block_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Farmer_Vote_And_Block_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Farmer_Vote_And_Block_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Farmer_Vote_And_Block_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Farmer_Vote_And_Block_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Farmer_Vote_And_Block_Total_Count_Variance_Fields>;
};


/** aggregate fields of "farmer_vote_and_block_total_count" */
export type Farmer_Vote_And_Block_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Farmer_Vote_And_Block_Total_Count_Avg_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "farmer_vote_and_block_total_count". All fields are combined with a logical 'AND'. */
export type Farmer_Vote_And_Block_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Farmer_Vote_And_Block_Total_Count_Max_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Farmer_Vote_And_Block_Total_Count_Min_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "farmer_vote_and_block_total_count". */
export type Farmer_Vote_And_Block_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "farmer_vote_and_block_total_count" */
export enum Farmer_Vote_And_Block_Total_Count_Select_Column {
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
export type Farmer_Vote_And_Block_Total_Count_Stddev_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Farmer_Vote_And_Block_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Farmer_Vote_And_Block_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "farmer_vote_and_block_total_count" */
export type Farmer_Vote_And_Block_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Farmer_Vote_And_Block_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Farmer_Vote_And_Block_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Farmer_Vote_And_Block_Total_Count_Sum_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Farmer_Vote_And_Block_Total_Count_Var_Pop_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Farmer_Vote_And_Block_Total_Count_Var_Samp_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Farmer_Vote_And_Block_Total_Count_Variance_Fields = {
  __typename?: 'farmer_vote_and_block_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "farmer_vote_and_block_total_value" */
export type Farmer_Vote_And_Block_Total_Value = {
  __typename?: 'farmer_vote_and_block_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "farmer_vote_and_block_total_value" */
export type Farmer_Vote_And_Block_Total_Value_Aggregate = {
  __typename?: 'farmer_vote_and_block_total_value_aggregate';
  aggregate?: Maybe<Farmer_Vote_And_Block_Total_Value_Aggregate_Fields>;
  nodes: Array<Farmer_Vote_And_Block_Total_Value>;
};

/** aggregate fields of "farmer_vote_and_block_total_value" */
export type Farmer_Vote_And_Block_Total_Value_Aggregate_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_aggregate_fields';
  avg?: Maybe<Farmer_Vote_And_Block_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Farmer_Vote_And_Block_Total_Value_Max_Fields>;
  min?: Maybe<Farmer_Vote_And_Block_Total_Value_Min_Fields>;
  stddev?: Maybe<Farmer_Vote_And_Block_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Farmer_Vote_And_Block_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Farmer_Vote_And_Block_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Farmer_Vote_And_Block_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Farmer_Vote_And_Block_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Farmer_Vote_And_Block_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Farmer_Vote_And_Block_Total_Value_Variance_Fields>;
};


/** aggregate fields of "farmer_vote_and_block_total_value" */
export type Farmer_Vote_And_Block_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Farmer_Vote_And_Block_Total_Value_Avg_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "farmer_vote_and_block_total_value". All fields are combined with a logical 'AND'. */
export type Farmer_Vote_And_Block_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Farmer_Vote_And_Block_Total_Value_Max_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Farmer_Vote_And_Block_Total_Value_Min_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "farmer_vote_and_block_total_value". */
export type Farmer_Vote_And_Block_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "farmer_vote_and_block_total_value" */
export enum Farmer_Vote_And_Block_Total_Value_Select_Column {
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
export type Farmer_Vote_And_Block_Total_Value_Stddev_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Farmer_Vote_And_Block_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Farmer_Vote_And_Block_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "farmer_vote_and_block_total_value" */
export type Farmer_Vote_And_Block_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Farmer_Vote_And_Block_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Farmer_Vote_And_Block_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Farmer_Vote_And_Block_Total_Value_Sum_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Farmer_Vote_And_Block_Total_Value_Var_Pop_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Farmer_Vote_And_Block_Total_Value_Var_Samp_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Farmer_Vote_And_Block_Total_Value_Variance_Fields = {
  __typename?: 'farmer_vote_and_block_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "farmer_vote_total_count" */
export type Farmer_Vote_Total_Count = {
  __typename?: 'farmer_vote_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "farmer_vote_total_count" */
export type Farmer_Vote_Total_Count_Aggregate = {
  __typename?: 'farmer_vote_total_count_aggregate';
  aggregate?: Maybe<Farmer_Vote_Total_Count_Aggregate_Fields>;
  nodes: Array<Farmer_Vote_Total_Count>;
};

/** aggregate fields of "farmer_vote_total_count" */
export type Farmer_Vote_Total_Count_Aggregate_Fields = {
  __typename?: 'farmer_vote_total_count_aggregate_fields';
  avg?: Maybe<Farmer_Vote_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Farmer_Vote_Total_Count_Max_Fields>;
  min?: Maybe<Farmer_Vote_Total_Count_Min_Fields>;
  stddev?: Maybe<Farmer_Vote_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Farmer_Vote_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Farmer_Vote_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Farmer_Vote_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Farmer_Vote_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Farmer_Vote_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Farmer_Vote_Total_Count_Variance_Fields>;
};


/** aggregate fields of "farmer_vote_total_count" */
export type Farmer_Vote_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Farmer_Vote_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Farmer_Vote_Total_Count_Avg_Fields = {
  __typename?: 'farmer_vote_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "farmer_vote_total_count". All fields are combined with a logical 'AND'. */
export type Farmer_Vote_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Farmer_Vote_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Farmer_Vote_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Farmer_Vote_Total_Count_Max_Fields = {
  __typename?: 'farmer_vote_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Farmer_Vote_Total_Count_Min_Fields = {
  __typename?: 'farmer_vote_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "farmer_vote_total_count". */
export type Farmer_Vote_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "farmer_vote_total_count" */
export enum Farmer_Vote_Total_Count_Select_Column {
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
export type Farmer_Vote_Total_Count_Stddev_Fields = {
  __typename?: 'farmer_vote_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Farmer_Vote_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'farmer_vote_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Farmer_Vote_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'farmer_vote_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "farmer_vote_total_count" */
export type Farmer_Vote_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Farmer_Vote_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Farmer_Vote_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Farmer_Vote_Total_Count_Sum_Fields = {
  __typename?: 'farmer_vote_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Farmer_Vote_Total_Count_Var_Pop_Fields = {
  __typename?: 'farmer_vote_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Farmer_Vote_Total_Count_Var_Samp_Fields = {
  __typename?: 'farmer_vote_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Farmer_Vote_Total_Count_Variance_Fields = {
  __typename?: 'farmer_vote_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "farmer_vote_total_value" */
export type Farmer_Vote_Total_Value = {
  __typename?: 'farmer_vote_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "farmer_vote_total_value" */
export type Farmer_Vote_Total_Value_Aggregate = {
  __typename?: 'farmer_vote_total_value_aggregate';
  aggregate?: Maybe<Farmer_Vote_Total_Value_Aggregate_Fields>;
  nodes: Array<Farmer_Vote_Total_Value>;
};

/** aggregate fields of "farmer_vote_total_value" */
export type Farmer_Vote_Total_Value_Aggregate_Fields = {
  __typename?: 'farmer_vote_total_value_aggregate_fields';
  avg?: Maybe<Farmer_Vote_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Farmer_Vote_Total_Value_Max_Fields>;
  min?: Maybe<Farmer_Vote_Total_Value_Min_Fields>;
  stddev?: Maybe<Farmer_Vote_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Farmer_Vote_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Farmer_Vote_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Farmer_Vote_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Farmer_Vote_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Farmer_Vote_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Farmer_Vote_Total_Value_Variance_Fields>;
};


/** aggregate fields of "farmer_vote_total_value" */
export type Farmer_Vote_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Farmer_Vote_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Farmer_Vote_Total_Value_Avg_Fields = {
  __typename?: 'farmer_vote_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "farmer_vote_total_value". All fields are combined with a logical 'AND'. */
export type Farmer_Vote_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Farmer_Vote_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Farmer_Vote_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Farmer_Vote_Total_Value_Max_Fields = {
  __typename?: 'farmer_vote_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Farmer_Vote_Total_Value_Min_Fields = {
  __typename?: 'farmer_vote_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "farmer_vote_total_value". */
export type Farmer_Vote_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "farmer_vote_total_value" */
export enum Farmer_Vote_Total_Value_Select_Column {
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
export type Farmer_Vote_Total_Value_Stddev_Fields = {
  __typename?: 'farmer_vote_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Farmer_Vote_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'farmer_vote_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Farmer_Vote_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'farmer_vote_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "farmer_vote_total_value" */
export type Farmer_Vote_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Farmer_Vote_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Farmer_Vote_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Farmer_Vote_Total_Value_Sum_Fields = {
  __typename?: 'farmer_vote_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Farmer_Vote_Total_Value_Var_Pop_Fields = {
  __typename?: 'farmer_vote_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Farmer_Vote_Total_Value_Var_Samp_Fields = {
  __typename?: 'farmer_vote_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Farmer_Vote_Total_Value_Variance_Fields = {
  __typename?: 'farmer_vote_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "nominator_deposits_total_count" */
export type Nominator_Deposits_Total_Count = {
  __typename?: 'nominator_deposits_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "nominator_deposits_total_count" */
export type Nominator_Deposits_Total_Count_Aggregate = {
  __typename?: 'nominator_deposits_total_count_aggregate';
  aggregate?: Maybe<Nominator_Deposits_Total_Count_Aggregate_Fields>;
  nodes: Array<Nominator_Deposits_Total_Count>;
};

/** aggregate fields of "nominator_deposits_total_count" */
export type Nominator_Deposits_Total_Count_Aggregate_Fields = {
  __typename?: 'nominator_deposits_total_count_aggregate_fields';
  avg?: Maybe<Nominator_Deposits_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Nominator_Deposits_Total_Count_Max_Fields>;
  min?: Maybe<Nominator_Deposits_Total_Count_Min_Fields>;
  stddev?: Maybe<Nominator_Deposits_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Nominator_Deposits_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Nominator_Deposits_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Nominator_Deposits_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Nominator_Deposits_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Nominator_Deposits_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Nominator_Deposits_Total_Count_Variance_Fields>;
};


/** aggregate fields of "nominator_deposits_total_count" */
export type Nominator_Deposits_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nominator_Deposits_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Nominator_Deposits_Total_Count_Avg_Fields = {
  __typename?: 'nominator_deposits_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "nominator_deposits_total_count". All fields are combined with a logical 'AND'. */
export type Nominator_Deposits_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Nominator_Deposits_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Nominator_Deposits_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Nominator_Deposits_Total_Count_Max_Fields = {
  __typename?: 'nominator_deposits_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Nominator_Deposits_Total_Count_Min_Fields = {
  __typename?: 'nominator_deposits_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "nominator_deposits_total_count". */
export type Nominator_Deposits_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "nominator_deposits_total_count" */
export enum Nominator_Deposits_Total_Count_Select_Column {
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
export type Nominator_Deposits_Total_Count_Stddev_Fields = {
  __typename?: 'nominator_deposits_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Nominator_Deposits_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'nominator_deposits_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Nominator_Deposits_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'nominator_deposits_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "nominator_deposits_total_count" */
export type Nominator_Deposits_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Nominator_Deposits_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Nominator_Deposits_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Nominator_Deposits_Total_Count_Sum_Fields = {
  __typename?: 'nominator_deposits_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Nominator_Deposits_Total_Count_Var_Pop_Fields = {
  __typename?: 'nominator_deposits_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Nominator_Deposits_Total_Count_Var_Samp_Fields = {
  __typename?: 'nominator_deposits_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Nominator_Deposits_Total_Count_Variance_Fields = {
  __typename?: 'nominator_deposits_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "nominator_deposits_total_value" */
export type Nominator_Deposits_Total_Value = {
  __typename?: 'nominator_deposits_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "nominator_deposits_total_value" */
export type Nominator_Deposits_Total_Value_Aggregate = {
  __typename?: 'nominator_deposits_total_value_aggregate';
  aggregate?: Maybe<Nominator_Deposits_Total_Value_Aggregate_Fields>;
  nodes: Array<Nominator_Deposits_Total_Value>;
};

/** aggregate fields of "nominator_deposits_total_value" */
export type Nominator_Deposits_Total_Value_Aggregate_Fields = {
  __typename?: 'nominator_deposits_total_value_aggregate_fields';
  avg?: Maybe<Nominator_Deposits_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Nominator_Deposits_Total_Value_Max_Fields>;
  min?: Maybe<Nominator_Deposits_Total_Value_Min_Fields>;
  stddev?: Maybe<Nominator_Deposits_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Nominator_Deposits_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Nominator_Deposits_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Nominator_Deposits_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Nominator_Deposits_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Nominator_Deposits_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Nominator_Deposits_Total_Value_Variance_Fields>;
};


/** aggregate fields of "nominator_deposits_total_value" */
export type Nominator_Deposits_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nominator_Deposits_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Nominator_Deposits_Total_Value_Avg_Fields = {
  __typename?: 'nominator_deposits_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "nominator_deposits_total_value". All fields are combined with a logical 'AND'. */
export type Nominator_Deposits_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Nominator_Deposits_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Nominator_Deposits_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Nominator_Deposits_Total_Value_Max_Fields = {
  __typename?: 'nominator_deposits_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Nominator_Deposits_Total_Value_Min_Fields = {
  __typename?: 'nominator_deposits_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "nominator_deposits_total_value". */
export type Nominator_Deposits_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "nominator_deposits_total_value" */
export enum Nominator_Deposits_Total_Value_Select_Column {
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
export type Nominator_Deposits_Total_Value_Stddev_Fields = {
  __typename?: 'nominator_deposits_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Nominator_Deposits_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'nominator_deposits_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Nominator_Deposits_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'nominator_deposits_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "nominator_deposits_total_value" */
export type Nominator_Deposits_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Nominator_Deposits_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Nominator_Deposits_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Nominator_Deposits_Total_Value_Sum_Fields = {
  __typename?: 'nominator_deposits_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Nominator_Deposits_Total_Value_Var_Pop_Fields = {
  __typename?: 'nominator_deposits_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Nominator_Deposits_Total_Value_Var_Samp_Fields = {
  __typename?: 'nominator_deposits_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Nominator_Deposits_Total_Value_Variance_Fields = {
  __typename?: 'nominator_deposits_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "nominator_withdrawals_total_count" */
export type Nominator_Withdrawals_Total_Count = {
  __typename?: 'nominator_withdrawals_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "nominator_withdrawals_total_count" */
export type Nominator_Withdrawals_Total_Count_Aggregate = {
  __typename?: 'nominator_withdrawals_total_count_aggregate';
  aggregate?: Maybe<Nominator_Withdrawals_Total_Count_Aggregate_Fields>;
  nodes: Array<Nominator_Withdrawals_Total_Count>;
};

/** aggregate fields of "nominator_withdrawals_total_count" */
export type Nominator_Withdrawals_Total_Count_Aggregate_Fields = {
  __typename?: 'nominator_withdrawals_total_count_aggregate_fields';
  avg?: Maybe<Nominator_Withdrawals_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Nominator_Withdrawals_Total_Count_Max_Fields>;
  min?: Maybe<Nominator_Withdrawals_Total_Count_Min_Fields>;
  stddev?: Maybe<Nominator_Withdrawals_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Nominator_Withdrawals_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Nominator_Withdrawals_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Nominator_Withdrawals_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Nominator_Withdrawals_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Nominator_Withdrawals_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Nominator_Withdrawals_Total_Count_Variance_Fields>;
};


/** aggregate fields of "nominator_withdrawals_total_count" */
export type Nominator_Withdrawals_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Nominator_Withdrawals_Total_Count_Avg_Fields = {
  __typename?: 'nominator_withdrawals_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "nominator_withdrawals_total_count". All fields are combined with a logical 'AND'. */
export type Nominator_Withdrawals_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Nominator_Withdrawals_Total_Count_Max_Fields = {
  __typename?: 'nominator_withdrawals_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Nominator_Withdrawals_Total_Count_Min_Fields = {
  __typename?: 'nominator_withdrawals_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "nominator_withdrawals_total_count". */
export type Nominator_Withdrawals_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "nominator_withdrawals_total_count" */
export enum Nominator_Withdrawals_Total_Count_Select_Column {
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
export type Nominator_Withdrawals_Total_Count_Stddev_Fields = {
  __typename?: 'nominator_withdrawals_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Nominator_Withdrawals_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'nominator_withdrawals_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Nominator_Withdrawals_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'nominator_withdrawals_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "nominator_withdrawals_total_count" */
export type Nominator_Withdrawals_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Nominator_Withdrawals_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Nominator_Withdrawals_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Nominator_Withdrawals_Total_Count_Sum_Fields = {
  __typename?: 'nominator_withdrawals_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Nominator_Withdrawals_Total_Count_Var_Pop_Fields = {
  __typename?: 'nominator_withdrawals_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Nominator_Withdrawals_Total_Count_Var_Samp_Fields = {
  __typename?: 'nominator_withdrawals_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Nominator_Withdrawals_Total_Count_Variance_Fields = {
  __typename?: 'nominator_withdrawals_total_count_variance_fields';
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

/** columns and relationships of "operator_bundle_total_count" */
export type Operator_Bundle_Total_Count = {
  __typename?: 'operator_bundle_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "operator_bundle_total_count" */
export type Operator_Bundle_Total_Count_Aggregate = {
  __typename?: 'operator_bundle_total_count_aggregate';
  aggregate?: Maybe<Operator_Bundle_Total_Count_Aggregate_Fields>;
  nodes: Array<Operator_Bundle_Total_Count>;
};

/** aggregate fields of "operator_bundle_total_count" */
export type Operator_Bundle_Total_Count_Aggregate_Fields = {
  __typename?: 'operator_bundle_total_count_aggregate_fields';
  avg?: Maybe<Operator_Bundle_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Bundle_Total_Count_Max_Fields>;
  min?: Maybe<Operator_Bundle_Total_Count_Min_Fields>;
  stddev?: Maybe<Operator_Bundle_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Bundle_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Bundle_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Bundle_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Operator_Bundle_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Bundle_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Operator_Bundle_Total_Count_Variance_Fields>;
};


/** aggregate fields of "operator_bundle_total_count" */
export type Operator_Bundle_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Bundle_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Operator_Bundle_Total_Count_Avg_Fields = {
  __typename?: 'operator_bundle_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator_bundle_total_count". All fields are combined with a logical 'AND'. */
export type Operator_Bundle_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Bundle_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Bundle_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Bundle_Total_Count_Max_Fields = {
  __typename?: 'operator_bundle_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Operator_Bundle_Total_Count_Min_Fields = {
  __typename?: 'operator_bundle_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "operator_bundle_total_count". */
export type Operator_Bundle_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "operator_bundle_total_count" */
export enum Operator_Bundle_Total_Count_Select_Column {
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
export type Operator_Bundle_Total_Count_Stddev_Fields = {
  __typename?: 'operator_bundle_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Bundle_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'operator_bundle_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Bundle_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'operator_bundle_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "operator_bundle_total_count" */
export type Operator_Bundle_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Bundle_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Bundle_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Operator_Bundle_Total_Count_Sum_Fields = {
  __typename?: 'operator_bundle_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Bundle_Total_Count_Var_Pop_Fields = {
  __typename?: 'operator_bundle_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Bundle_Total_Count_Var_Samp_Fields = {
  __typename?: 'operator_bundle_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Bundle_Total_Count_Variance_Fields = {
  __typename?: 'operator_bundle_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "operator_deposits_total_count" */
export type Operator_Deposits_Total_Count = {
  __typename?: 'operator_deposits_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "operator_deposits_total_count" */
export type Operator_Deposits_Total_Count_Aggregate = {
  __typename?: 'operator_deposits_total_count_aggregate';
  aggregate?: Maybe<Operator_Deposits_Total_Count_Aggregate_Fields>;
  nodes: Array<Operator_Deposits_Total_Count>;
};

/** aggregate fields of "operator_deposits_total_count" */
export type Operator_Deposits_Total_Count_Aggregate_Fields = {
  __typename?: 'operator_deposits_total_count_aggregate_fields';
  avg?: Maybe<Operator_Deposits_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Deposits_Total_Count_Max_Fields>;
  min?: Maybe<Operator_Deposits_Total_Count_Min_Fields>;
  stddev?: Maybe<Operator_Deposits_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Deposits_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Deposits_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Deposits_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Operator_Deposits_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Deposits_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Operator_Deposits_Total_Count_Variance_Fields>;
};


/** aggregate fields of "operator_deposits_total_count" */
export type Operator_Deposits_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Deposits_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Operator_Deposits_Total_Count_Avg_Fields = {
  __typename?: 'operator_deposits_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator_deposits_total_count". All fields are combined with a logical 'AND'. */
export type Operator_Deposits_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Deposits_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Deposits_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Deposits_Total_Count_Max_Fields = {
  __typename?: 'operator_deposits_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Operator_Deposits_Total_Count_Min_Fields = {
  __typename?: 'operator_deposits_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "operator_deposits_total_count". */
export type Operator_Deposits_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "operator_deposits_total_count" */
export enum Operator_Deposits_Total_Count_Select_Column {
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
export type Operator_Deposits_Total_Count_Stddev_Fields = {
  __typename?: 'operator_deposits_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Deposits_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'operator_deposits_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Deposits_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'operator_deposits_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "operator_deposits_total_count" */
export type Operator_Deposits_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Deposits_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Deposits_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Operator_Deposits_Total_Count_Sum_Fields = {
  __typename?: 'operator_deposits_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Deposits_Total_Count_Var_Pop_Fields = {
  __typename?: 'operator_deposits_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Deposits_Total_Count_Var_Samp_Fields = {
  __typename?: 'operator_deposits_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Deposits_Total_Count_Variance_Fields = {
  __typename?: 'operator_deposits_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "operator_deposits_total_value" */
export type Operator_Deposits_Total_Value = {
  __typename?: 'operator_deposits_total_value';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "operator_deposits_total_value" */
export type Operator_Deposits_Total_Value_Aggregate = {
  __typename?: 'operator_deposits_total_value_aggregate';
  aggregate?: Maybe<Operator_Deposits_Total_Value_Aggregate_Fields>;
  nodes: Array<Operator_Deposits_Total_Value>;
};

/** aggregate fields of "operator_deposits_total_value" */
export type Operator_Deposits_Total_Value_Aggregate_Fields = {
  __typename?: 'operator_deposits_total_value_aggregate_fields';
  avg?: Maybe<Operator_Deposits_Total_Value_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Deposits_Total_Value_Max_Fields>;
  min?: Maybe<Operator_Deposits_Total_Value_Min_Fields>;
  stddev?: Maybe<Operator_Deposits_Total_Value_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Deposits_Total_Value_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Deposits_Total_Value_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Deposits_Total_Value_Sum_Fields>;
  var_pop?: Maybe<Operator_Deposits_Total_Value_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Deposits_Total_Value_Var_Samp_Fields>;
  variance?: Maybe<Operator_Deposits_Total_Value_Variance_Fields>;
};


/** aggregate fields of "operator_deposits_total_value" */
export type Operator_Deposits_Total_Value_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Deposits_Total_Value_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Operator_Deposits_Total_Value_Avg_Fields = {
  __typename?: 'operator_deposits_total_value_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator_deposits_total_value". All fields are combined with a logical 'AND'. */
export type Operator_Deposits_Total_Value_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Deposits_Total_Value_Bool_Exp>>;
  _not?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Deposits_Total_Value_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Deposits_Total_Value_Max_Fields = {
  __typename?: 'operator_deposits_total_value_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Operator_Deposits_Total_Value_Min_Fields = {
  __typename?: 'operator_deposits_total_value_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "operator_deposits_total_value". */
export type Operator_Deposits_Total_Value_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "operator_deposits_total_value" */
export enum Operator_Deposits_Total_Value_Select_Column {
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
export type Operator_Deposits_Total_Value_Stddev_Fields = {
  __typename?: 'operator_deposits_total_value_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Deposits_Total_Value_Stddev_Pop_Fields = {
  __typename?: 'operator_deposits_total_value_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Deposits_Total_Value_Stddev_Samp_Fields = {
  __typename?: 'operator_deposits_total_value_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "operator_deposits_total_value" */
export type Operator_Deposits_Total_Value_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Deposits_Total_Value_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Deposits_Total_Value_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Operator_Deposits_Total_Value_Sum_Fields = {
  __typename?: 'operator_deposits_total_value_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Deposits_Total_Value_Var_Pop_Fields = {
  __typename?: 'operator_deposits_total_value_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Deposits_Total_Value_Var_Samp_Fields = {
  __typename?: 'operator_deposits_total_value_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Deposits_Total_Value_Variance_Fields = {
  __typename?: 'operator_deposits_total_value_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "operator_total_rewards_collected" */
export type Operator_Total_Rewards_Collected = {
  __typename?: 'operator_total_rewards_collected';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "operator_total_rewards_collected" */
export type Operator_Total_Rewards_Collected_Aggregate = {
  __typename?: 'operator_total_rewards_collected_aggregate';
  aggregate?: Maybe<Operator_Total_Rewards_Collected_Aggregate_Fields>;
  nodes: Array<Operator_Total_Rewards_Collected>;
};

/** aggregate fields of "operator_total_rewards_collected" */
export type Operator_Total_Rewards_Collected_Aggregate_Fields = {
  __typename?: 'operator_total_rewards_collected_aggregate_fields';
  avg?: Maybe<Operator_Total_Rewards_Collected_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Total_Rewards_Collected_Max_Fields>;
  min?: Maybe<Operator_Total_Rewards_Collected_Min_Fields>;
  stddev?: Maybe<Operator_Total_Rewards_Collected_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Total_Rewards_Collected_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Total_Rewards_Collected_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Total_Rewards_Collected_Sum_Fields>;
  var_pop?: Maybe<Operator_Total_Rewards_Collected_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Total_Rewards_Collected_Var_Samp_Fields>;
  variance?: Maybe<Operator_Total_Rewards_Collected_Variance_Fields>;
};


/** aggregate fields of "operator_total_rewards_collected" */
export type Operator_Total_Rewards_Collected_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Total_Rewards_Collected_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Operator_Total_Rewards_Collected_Avg_Fields = {
  __typename?: 'operator_total_rewards_collected_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator_total_rewards_collected". All fields are combined with a logical 'AND'. */
export type Operator_Total_Rewards_Collected_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Total_Rewards_Collected_Bool_Exp>>;
  _not?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Total_Rewards_Collected_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Total_Rewards_Collected_Max_Fields = {
  __typename?: 'operator_total_rewards_collected_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Operator_Total_Rewards_Collected_Min_Fields = {
  __typename?: 'operator_total_rewards_collected_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "operator_total_rewards_collected". */
export type Operator_Total_Rewards_Collected_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "operator_total_rewards_collected" */
export enum Operator_Total_Rewards_Collected_Select_Column {
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
export type Operator_Total_Rewards_Collected_Stddev_Fields = {
  __typename?: 'operator_total_rewards_collected_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Total_Rewards_Collected_Stddev_Pop_Fields = {
  __typename?: 'operator_total_rewards_collected_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Total_Rewards_Collected_Stddev_Samp_Fields = {
  __typename?: 'operator_total_rewards_collected_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "operator_total_rewards_collected" */
export type Operator_Total_Rewards_Collected_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Total_Rewards_Collected_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Total_Rewards_Collected_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Operator_Total_Rewards_Collected_Sum_Fields = {
  __typename?: 'operator_total_rewards_collected_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Total_Rewards_Collected_Var_Pop_Fields = {
  __typename?: 'operator_total_rewards_collected_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Total_Rewards_Collected_Var_Samp_Fields = {
  __typename?: 'operator_total_rewards_collected_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Total_Rewards_Collected_Variance_Fields = {
  __typename?: 'operator_total_rewards_collected_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "operator_total_tax_collected" */
export type Operator_Total_Tax_Collected = {
  __typename?: 'operator_total_tax_collected';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['numeric']['output'];
};

/** aggregated selection of "operator_total_tax_collected" */
export type Operator_Total_Tax_Collected_Aggregate = {
  __typename?: 'operator_total_tax_collected_aggregate';
  aggregate?: Maybe<Operator_Total_Tax_Collected_Aggregate_Fields>;
  nodes: Array<Operator_Total_Tax_Collected>;
};

/** aggregate fields of "operator_total_tax_collected" */
export type Operator_Total_Tax_Collected_Aggregate_Fields = {
  __typename?: 'operator_total_tax_collected_aggregate_fields';
  avg?: Maybe<Operator_Total_Tax_Collected_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Total_Tax_Collected_Max_Fields>;
  min?: Maybe<Operator_Total_Tax_Collected_Min_Fields>;
  stddev?: Maybe<Operator_Total_Tax_Collected_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Total_Tax_Collected_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Total_Tax_Collected_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Total_Tax_Collected_Sum_Fields>;
  var_pop?: Maybe<Operator_Total_Tax_Collected_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Total_Tax_Collected_Var_Samp_Fields>;
  variance?: Maybe<Operator_Total_Tax_Collected_Variance_Fields>;
};


/** aggregate fields of "operator_total_tax_collected" */
export type Operator_Total_Tax_Collected_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Total_Tax_Collected_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Operator_Total_Tax_Collected_Avg_Fields = {
  __typename?: 'operator_total_tax_collected_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator_total_tax_collected". All fields are combined with a logical 'AND'. */
export type Operator_Total_Tax_Collected_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Total_Tax_Collected_Bool_Exp>>;
  _not?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Total_Tax_Collected_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Total_Tax_Collected_Max_Fields = {
  __typename?: 'operator_total_tax_collected_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Operator_Total_Tax_Collected_Min_Fields = {
  __typename?: 'operator_total_tax_collected_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "operator_total_tax_collected". */
export type Operator_Total_Tax_Collected_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "operator_total_tax_collected" */
export enum Operator_Total_Tax_Collected_Select_Column {
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
export type Operator_Total_Tax_Collected_Stddev_Fields = {
  __typename?: 'operator_total_tax_collected_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Total_Tax_Collected_Stddev_Pop_Fields = {
  __typename?: 'operator_total_tax_collected_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Total_Tax_Collected_Stddev_Samp_Fields = {
  __typename?: 'operator_total_tax_collected_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "operator_total_tax_collected" */
export type Operator_Total_Tax_Collected_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Total_Tax_Collected_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Total_Tax_Collected_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Operator_Total_Tax_Collected_Sum_Fields = {
  __typename?: 'operator_total_tax_collected_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Total_Tax_Collected_Var_Pop_Fields = {
  __typename?: 'operator_total_tax_collected_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Total_Tax_Collected_Var_Samp_Fields = {
  __typename?: 'operator_total_tax_collected_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Total_Tax_Collected_Variance_Fields = {
  __typename?: 'operator_total_tax_collected_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "operator_withdrawals_total_count" */
export type Operator_Withdrawals_Total_Count = {
  __typename?: 'operator_withdrawals_total_count';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  last_contribution_at: Scalars['timestamptz']['output'];
  rank: Scalars['Int']['output'];
  updated_at: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "operator_withdrawals_total_count" */
export type Operator_Withdrawals_Total_Count_Aggregate = {
  __typename?: 'operator_withdrawals_total_count_aggregate';
  aggregate?: Maybe<Operator_Withdrawals_Total_Count_Aggregate_Fields>;
  nodes: Array<Operator_Withdrawals_Total_Count>;
};

/** aggregate fields of "operator_withdrawals_total_count" */
export type Operator_Withdrawals_Total_Count_Aggregate_Fields = {
  __typename?: 'operator_withdrawals_total_count_aggregate_fields';
  avg?: Maybe<Operator_Withdrawals_Total_Count_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Operator_Withdrawals_Total_Count_Max_Fields>;
  min?: Maybe<Operator_Withdrawals_Total_Count_Min_Fields>;
  stddev?: Maybe<Operator_Withdrawals_Total_Count_Stddev_Fields>;
  stddev_pop?: Maybe<Operator_Withdrawals_Total_Count_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Operator_Withdrawals_Total_Count_Stddev_Samp_Fields>;
  sum?: Maybe<Operator_Withdrawals_Total_Count_Sum_Fields>;
  var_pop?: Maybe<Operator_Withdrawals_Total_Count_Var_Pop_Fields>;
  var_samp?: Maybe<Operator_Withdrawals_Total_Count_Var_Samp_Fields>;
  variance?: Maybe<Operator_Withdrawals_Total_Count_Variance_Fields>;
};


/** aggregate fields of "operator_withdrawals_total_count" */
export type Operator_Withdrawals_Total_Count_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Operator_Withdrawals_Total_Count_Avg_Fields = {
  __typename?: 'operator_withdrawals_total_count_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator_withdrawals_total_count". All fields are combined with a logical 'AND'. */
export type Operator_Withdrawals_Total_Count_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Bool_Exp>>;
  _not?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_contribution_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Withdrawals_Total_Count_Max_Fields = {
  __typename?: 'operator_withdrawals_total_count_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Operator_Withdrawals_Total_Count_Min_Fields = {
  __typename?: 'operator_withdrawals_total_count_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_contribution_at?: Maybe<Scalars['timestamptz']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "operator_withdrawals_total_count". */
export type Operator_Withdrawals_Total_Count_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_contribution_at?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "operator_withdrawals_total_count" */
export enum Operator_Withdrawals_Total_Count_Select_Column {
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
export type Operator_Withdrawals_Total_Count_Stddev_Fields = {
  __typename?: 'operator_withdrawals_total_count_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Withdrawals_Total_Count_Stddev_Pop_Fields = {
  __typename?: 'operator_withdrawals_total_count_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Withdrawals_Total_Count_Stddev_Samp_Fields = {
  __typename?: 'operator_withdrawals_total_count_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "operator_withdrawals_total_count" */
export type Operator_Withdrawals_Total_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Operator_Withdrawals_Total_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Operator_Withdrawals_Total_Count_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_contribution_at?: InputMaybe<Scalars['timestamptz']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Operator_Withdrawals_Total_Count_Sum_Fields = {
  __typename?: 'operator_withdrawals_total_count_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Withdrawals_Total_Count_Var_Pop_Fields = {
  __typename?: 'operator_withdrawals_total_count_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Withdrawals_Total_Count_Var_Samp_Fields = {
  __typename?: 'operator_withdrawals_total_count_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Withdrawals_Total_Count_Variance_Fields = {
  __typename?: 'operator_withdrawals_total_count_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
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
  /** fetch data from the table: "account_extrinsic_failed_total_count" */
  account_extrinsic_failed_total_count: Array<Account_Extrinsic_Failed_Total_Count>;
  /** fetch aggregated fields from the table: "account_extrinsic_failed_total_count" */
  account_extrinsic_failed_total_count_aggregate: Account_Extrinsic_Failed_Total_Count_Aggregate;
  /** fetch data from the table: "account_extrinsic_failed_total_count" using primary key columns */
  account_extrinsic_failed_total_count_by_pk?: Maybe<Account_Extrinsic_Failed_Total_Count>;
  /** fetch data from the table: "account_extrinsic_success_total_count" */
  account_extrinsic_success_total_count: Array<Account_Extrinsic_Success_Total_Count>;
  /** fetch aggregated fields from the table: "account_extrinsic_success_total_count" */
  account_extrinsic_success_total_count_aggregate: Account_Extrinsic_Success_Total_Count_Aggregate;
  /** fetch data from the table: "account_extrinsic_success_total_count" using primary key columns */
  account_extrinsic_success_total_count_by_pk?: Maybe<Account_Extrinsic_Success_Total_Count>;
  /** fetch data from the table: "account_extrinsic_total_count" */
  account_extrinsic_total_count: Array<Account_Extrinsic_Total_Count>;
  /** fetch aggregated fields from the table: "account_extrinsic_total_count" */
  account_extrinsic_total_count_aggregate: Account_Extrinsic_Total_Count_Aggregate;
  /** fetch data from the table: "account_extrinsic_total_count" using primary key columns */
  account_extrinsic_total_count_by_pk?: Maybe<Account_Extrinsic_Total_Count>;
  /** fetch data from the table: "account_remark_count" */
  account_remark_count: Array<Account_Remark_Count>;
  /** fetch aggregated fields from the table: "account_remark_count" */
  account_remark_count_aggregate: Account_Remark_Count_Aggregate;
  /** fetch data from the table: "account_remark_count" using primary key columns */
  account_remark_count_by_pk?: Maybe<Account_Remark_Count>;
  /** fetch data from the table: "account_transaction_fee_paid_total_value" */
  account_transaction_fee_paid_total_value: Array<Account_Transaction_Fee_Paid_Total_Value>;
  /** fetch aggregated fields from the table: "account_transaction_fee_paid_total_value" */
  account_transaction_fee_paid_total_value_aggregate: Account_Transaction_Fee_Paid_Total_Value_Aggregate;
  /** fetch data from the table: "account_transaction_fee_paid_total_value" using primary key columns */
  account_transaction_fee_paid_total_value_by_pk?: Maybe<Account_Transaction_Fee_Paid_Total_Value>;
  /** fetch data from the table: "account_transfer_receiver_total_count" */
  account_transfer_receiver_total_count: Array<Account_Transfer_Receiver_Total_Count>;
  /** fetch aggregated fields from the table: "account_transfer_receiver_total_count" */
  account_transfer_receiver_total_count_aggregate: Account_Transfer_Receiver_Total_Count_Aggregate;
  /** fetch data from the table: "account_transfer_receiver_total_count" using primary key columns */
  account_transfer_receiver_total_count_by_pk?: Maybe<Account_Transfer_Receiver_Total_Count>;
  /** fetch data from the table: "account_transfer_receiver_total_value" */
  account_transfer_receiver_total_value: Array<Account_Transfer_Receiver_Total_Value>;
  /** fetch aggregated fields from the table: "account_transfer_receiver_total_value" */
  account_transfer_receiver_total_value_aggregate: Account_Transfer_Receiver_Total_Value_Aggregate;
  /** fetch data from the table: "account_transfer_receiver_total_value" using primary key columns */
  account_transfer_receiver_total_value_by_pk?: Maybe<Account_Transfer_Receiver_Total_Value>;
  /** fetch data from the table: "account_transfer_sender_total_count" */
  account_transfer_sender_total_count: Array<Account_Transfer_Sender_Total_Count>;
  /** fetch aggregated fields from the table: "account_transfer_sender_total_count" */
  account_transfer_sender_total_count_aggregate: Account_Transfer_Sender_Total_Count_Aggregate;
  /** fetch data from the table: "account_transfer_sender_total_count" using primary key columns */
  account_transfer_sender_total_count_by_pk?: Maybe<Account_Transfer_Sender_Total_Count>;
  /** fetch data from the table: "account_transfer_sender_total_value" */
  account_transfer_sender_total_value: Array<Account_Transfer_Sender_Total_Value>;
  /** fetch aggregated fields from the table: "account_transfer_sender_total_value" */
  account_transfer_sender_total_value_aggregate: Account_Transfer_Sender_Total_Value_Aggregate;
  /** fetch data from the table: "account_transfer_sender_total_value" using primary key columns */
  account_transfer_sender_total_value_by_pk?: Maybe<Account_Transfer_Sender_Total_Value>;
  /** fetch data from the table: "farmer_block_total_count" */
  farmer_block_total_count: Array<Farmer_Block_Total_Count>;
  /** fetch aggregated fields from the table: "farmer_block_total_count" */
  farmer_block_total_count_aggregate: Farmer_Block_Total_Count_Aggregate;
  /** fetch data from the table: "farmer_block_total_count" using primary key columns */
  farmer_block_total_count_by_pk?: Maybe<Farmer_Block_Total_Count>;
  /** fetch data from the table: "farmer_block_total_value" */
  farmer_block_total_value: Array<Farmer_Block_Total_Value>;
  /** fetch aggregated fields from the table: "farmer_block_total_value" */
  farmer_block_total_value_aggregate: Farmer_Block_Total_Value_Aggregate;
  /** fetch data from the table: "farmer_block_total_value" using primary key columns */
  farmer_block_total_value_by_pk?: Maybe<Farmer_Block_Total_Value>;
  /** fetch data from the table: "farmer_vote_and_block_total_count" */
  farmer_vote_and_block_total_count: Array<Farmer_Vote_And_Block_Total_Count>;
  /** fetch aggregated fields from the table: "farmer_vote_and_block_total_count" */
  farmer_vote_and_block_total_count_aggregate: Farmer_Vote_And_Block_Total_Count_Aggregate;
  /** fetch data from the table: "farmer_vote_and_block_total_count" using primary key columns */
  farmer_vote_and_block_total_count_by_pk?: Maybe<Farmer_Vote_And_Block_Total_Count>;
  /** fetch data from the table: "farmer_vote_and_block_total_value" */
  farmer_vote_and_block_total_value: Array<Farmer_Vote_And_Block_Total_Value>;
  /** fetch aggregated fields from the table: "farmer_vote_and_block_total_value" */
  farmer_vote_and_block_total_value_aggregate: Farmer_Vote_And_Block_Total_Value_Aggregate;
  /** fetch data from the table: "farmer_vote_and_block_total_value" using primary key columns */
  farmer_vote_and_block_total_value_by_pk?: Maybe<Farmer_Vote_And_Block_Total_Value>;
  /** fetch data from the table: "farmer_vote_total_count" */
  farmer_vote_total_count: Array<Farmer_Vote_Total_Count>;
  /** fetch aggregated fields from the table: "farmer_vote_total_count" */
  farmer_vote_total_count_aggregate: Farmer_Vote_Total_Count_Aggregate;
  /** fetch data from the table: "farmer_vote_total_count" using primary key columns */
  farmer_vote_total_count_by_pk?: Maybe<Farmer_Vote_Total_Count>;
  /** fetch data from the table: "farmer_vote_total_value" */
  farmer_vote_total_value: Array<Farmer_Vote_Total_Value>;
  /** fetch aggregated fields from the table: "farmer_vote_total_value" */
  farmer_vote_total_value_aggregate: Farmer_Vote_Total_Value_Aggregate;
  /** fetch data from the table: "farmer_vote_total_value" using primary key columns */
  farmer_vote_total_value_by_pk?: Maybe<Farmer_Vote_Total_Value>;
  /** fetch data from the table: "nominator_deposits_total_count" */
  nominator_deposits_total_count: Array<Nominator_Deposits_Total_Count>;
  /** fetch aggregated fields from the table: "nominator_deposits_total_count" */
  nominator_deposits_total_count_aggregate: Nominator_Deposits_Total_Count_Aggregate;
  /** fetch data from the table: "nominator_deposits_total_count" using primary key columns */
  nominator_deposits_total_count_by_pk?: Maybe<Nominator_Deposits_Total_Count>;
  /** fetch data from the table: "nominator_deposits_total_value" */
  nominator_deposits_total_value: Array<Nominator_Deposits_Total_Value>;
  /** fetch aggregated fields from the table: "nominator_deposits_total_value" */
  nominator_deposits_total_value_aggregate: Nominator_Deposits_Total_Value_Aggregate;
  /** fetch data from the table: "nominator_deposits_total_value" using primary key columns */
  nominator_deposits_total_value_by_pk?: Maybe<Nominator_Deposits_Total_Value>;
  /** fetch data from the table: "nominator_withdrawals_total_count" */
  nominator_withdrawals_total_count: Array<Nominator_Withdrawals_Total_Count>;
  /** fetch aggregated fields from the table: "nominator_withdrawals_total_count" */
  nominator_withdrawals_total_count_aggregate: Nominator_Withdrawals_Total_Count_Aggregate;
  /** fetch data from the table: "nominator_withdrawals_total_count" using primary key columns */
  nominator_withdrawals_total_count_by_pk?: Maybe<Nominator_Withdrawals_Total_Count>;
  /** fetch data from the table: "operator_bundle_total_count" */
  operator_bundle_total_count: Array<Operator_Bundle_Total_Count>;
  /** fetch aggregated fields from the table: "operator_bundle_total_count" */
  operator_bundle_total_count_aggregate: Operator_Bundle_Total_Count_Aggregate;
  /** fetch data from the table: "operator_bundle_total_count" using primary key columns */
  operator_bundle_total_count_by_pk?: Maybe<Operator_Bundle_Total_Count>;
  /** fetch data from the table: "operator_deposits_total_count" */
  operator_deposits_total_count: Array<Operator_Deposits_Total_Count>;
  /** fetch aggregated fields from the table: "operator_deposits_total_count" */
  operator_deposits_total_count_aggregate: Operator_Deposits_Total_Count_Aggregate;
  /** fetch data from the table: "operator_deposits_total_count" using primary key columns */
  operator_deposits_total_count_by_pk?: Maybe<Operator_Deposits_Total_Count>;
  /** fetch data from the table: "operator_deposits_total_value" */
  operator_deposits_total_value: Array<Operator_Deposits_Total_Value>;
  /** fetch aggregated fields from the table: "operator_deposits_total_value" */
  operator_deposits_total_value_aggregate: Operator_Deposits_Total_Value_Aggregate;
  /** fetch data from the table: "operator_deposits_total_value" using primary key columns */
  operator_deposits_total_value_by_pk?: Maybe<Operator_Deposits_Total_Value>;
  /** fetch data from the table: "operator_total_rewards_collected" */
  operator_total_rewards_collected: Array<Operator_Total_Rewards_Collected>;
  /** fetch aggregated fields from the table: "operator_total_rewards_collected" */
  operator_total_rewards_collected_aggregate: Operator_Total_Rewards_Collected_Aggregate;
  /** fetch data from the table: "operator_total_rewards_collected" using primary key columns */
  operator_total_rewards_collected_by_pk?: Maybe<Operator_Total_Rewards_Collected>;
  /** fetch data from the table: "operator_total_tax_collected" */
  operator_total_tax_collected: Array<Operator_Total_Tax_Collected>;
  /** fetch aggregated fields from the table: "operator_total_tax_collected" */
  operator_total_tax_collected_aggregate: Operator_Total_Tax_Collected_Aggregate;
  /** fetch data from the table: "operator_total_tax_collected" using primary key columns */
  operator_total_tax_collected_by_pk?: Maybe<Operator_Total_Tax_Collected>;
  /** fetch data from the table: "operator_withdrawals_total_count" */
  operator_withdrawals_total_count: Array<Operator_Withdrawals_Total_Count>;
  /** fetch aggregated fields from the table: "operator_withdrawals_total_count" */
  operator_withdrawals_total_count_aggregate: Operator_Withdrawals_Total_Count_Aggregate;
  /** fetch data from the table: "operator_withdrawals_total_count" using primary key columns */
  operator_withdrawals_total_count_by_pk?: Maybe<Operator_Withdrawals_Total_Count>;
};


export type Query_RootAccount_Extrinsic_Failed_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Extrinsic_Failed_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Extrinsic_Failed_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Extrinsic_Success_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Extrinsic_Success_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Extrinsic_Success_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Extrinsic_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Extrinsic_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Extrinsic_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Remark_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Remark_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Remark_Count_Order_By>>;
  where?: InputMaybe<Account_Remark_Count_Bool_Exp>;
};


export type Query_RootAccount_Remark_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Remark_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Remark_Count_Order_By>>;
  where?: InputMaybe<Account_Remark_Count_Bool_Exp>;
};


export type Query_RootAccount_Remark_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Transaction_Fee_Paid_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
};


export type Query_RootAccount_Transaction_Fee_Paid_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
};


export type Query_RootAccount_Transaction_Fee_Paid_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Transfer_Receiver_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Receiver_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Receiver_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Transfer_Receiver_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Receiver_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Receiver_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Transfer_Sender_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Sender_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Sender_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAccount_Transfer_Sender_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Sender_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
};


export type Query_RootAccount_Transfer_Sender_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFarmer_Block_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
};


export type Query_RootFarmer_Block_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
};


export type Query_RootFarmer_Block_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFarmer_Block_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
};


export type Query_RootFarmer_Block_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
};


export type Query_RootFarmer_Block_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFarmer_Vote_And_Block_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
};


export type Query_RootFarmer_Vote_And_Block_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
};


export type Query_RootFarmer_Vote_And_Block_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFarmer_Vote_And_Block_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
};


export type Query_RootFarmer_Vote_And_Block_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
};


export type Query_RootFarmer_Vote_And_Block_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFarmer_Vote_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
};


export type Query_RootFarmer_Vote_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
};


export type Query_RootFarmer_Vote_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFarmer_Vote_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
};


export type Query_RootFarmer_Vote_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
};


export type Query_RootFarmer_Vote_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootNominator_Deposits_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
};


export type Query_RootNominator_Deposits_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
};


export type Query_RootNominator_Deposits_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootNominator_Deposits_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
};


export type Query_RootNominator_Deposits_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
};


export type Query_RootNominator_Deposits_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootNominator_Withdrawals_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Query_RootNominator_Withdrawals_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Query_RootNominator_Withdrawals_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperator_Bundle_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Operator_Bundle_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Bundle_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
};


export type Query_RootOperator_Bundle_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Bundle_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Bundle_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
};


export type Query_RootOperator_Bundle_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperator_Deposits_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
};


export type Query_RootOperator_Deposits_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
};


export type Query_RootOperator_Deposits_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperator_Deposits_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
};


export type Query_RootOperator_Deposits_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
};


export type Query_RootOperator_Deposits_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperator_Total_Rewards_CollectedArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Rewards_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Rewards_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
};


export type Query_RootOperator_Total_Rewards_Collected_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Rewards_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Rewards_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
};


export type Query_RootOperator_Total_Rewards_Collected_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperator_Total_Tax_CollectedArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Tax_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Tax_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
};


export type Query_RootOperator_Total_Tax_Collected_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Tax_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Tax_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
};


export type Query_RootOperator_Total_Tax_Collected_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootOperator_Withdrawals_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Query_RootOperator_Withdrawals_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Query_RootOperator_Withdrawals_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account_extrinsic_failed_total_count" */
  account_extrinsic_failed_total_count: Array<Account_Extrinsic_Failed_Total_Count>;
  /** fetch aggregated fields from the table: "account_extrinsic_failed_total_count" */
  account_extrinsic_failed_total_count_aggregate: Account_Extrinsic_Failed_Total_Count_Aggregate;
  /** fetch data from the table: "account_extrinsic_failed_total_count" using primary key columns */
  account_extrinsic_failed_total_count_by_pk?: Maybe<Account_Extrinsic_Failed_Total_Count>;
  /** fetch data from the table in a streaming manner: "account_extrinsic_failed_total_count" */
  account_extrinsic_failed_total_count_stream: Array<Account_Extrinsic_Failed_Total_Count>;
  /** fetch data from the table: "account_extrinsic_success_total_count" */
  account_extrinsic_success_total_count: Array<Account_Extrinsic_Success_Total_Count>;
  /** fetch aggregated fields from the table: "account_extrinsic_success_total_count" */
  account_extrinsic_success_total_count_aggregate: Account_Extrinsic_Success_Total_Count_Aggregate;
  /** fetch data from the table: "account_extrinsic_success_total_count" using primary key columns */
  account_extrinsic_success_total_count_by_pk?: Maybe<Account_Extrinsic_Success_Total_Count>;
  /** fetch data from the table in a streaming manner: "account_extrinsic_success_total_count" */
  account_extrinsic_success_total_count_stream: Array<Account_Extrinsic_Success_Total_Count>;
  /** fetch data from the table: "account_extrinsic_total_count" */
  account_extrinsic_total_count: Array<Account_Extrinsic_Total_Count>;
  /** fetch aggregated fields from the table: "account_extrinsic_total_count" */
  account_extrinsic_total_count_aggregate: Account_Extrinsic_Total_Count_Aggregate;
  /** fetch data from the table: "account_extrinsic_total_count" using primary key columns */
  account_extrinsic_total_count_by_pk?: Maybe<Account_Extrinsic_Total_Count>;
  /** fetch data from the table in a streaming manner: "account_extrinsic_total_count" */
  account_extrinsic_total_count_stream: Array<Account_Extrinsic_Total_Count>;
  /** fetch data from the table: "account_remark_count" */
  account_remark_count: Array<Account_Remark_Count>;
  /** fetch aggregated fields from the table: "account_remark_count" */
  account_remark_count_aggregate: Account_Remark_Count_Aggregate;
  /** fetch data from the table: "account_remark_count" using primary key columns */
  account_remark_count_by_pk?: Maybe<Account_Remark_Count>;
  /** fetch data from the table in a streaming manner: "account_remark_count" */
  account_remark_count_stream: Array<Account_Remark_Count>;
  /** fetch data from the table: "account_transaction_fee_paid_total_value" */
  account_transaction_fee_paid_total_value: Array<Account_Transaction_Fee_Paid_Total_Value>;
  /** fetch aggregated fields from the table: "account_transaction_fee_paid_total_value" */
  account_transaction_fee_paid_total_value_aggregate: Account_Transaction_Fee_Paid_Total_Value_Aggregate;
  /** fetch data from the table: "account_transaction_fee_paid_total_value" using primary key columns */
  account_transaction_fee_paid_total_value_by_pk?: Maybe<Account_Transaction_Fee_Paid_Total_Value>;
  /** fetch data from the table in a streaming manner: "account_transaction_fee_paid_total_value" */
  account_transaction_fee_paid_total_value_stream: Array<Account_Transaction_Fee_Paid_Total_Value>;
  /** fetch data from the table: "account_transfer_receiver_total_count" */
  account_transfer_receiver_total_count: Array<Account_Transfer_Receiver_Total_Count>;
  /** fetch aggregated fields from the table: "account_transfer_receiver_total_count" */
  account_transfer_receiver_total_count_aggregate: Account_Transfer_Receiver_Total_Count_Aggregate;
  /** fetch data from the table: "account_transfer_receiver_total_count" using primary key columns */
  account_transfer_receiver_total_count_by_pk?: Maybe<Account_Transfer_Receiver_Total_Count>;
  /** fetch data from the table in a streaming manner: "account_transfer_receiver_total_count" */
  account_transfer_receiver_total_count_stream: Array<Account_Transfer_Receiver_Total_Count>;
  /** fetch data from the table: "account_transfer_receiver_total_value" */
  account_transfer_receiver_total_value: Array<Account_Transfer_Receiver_Total_Value>;
  /** fetch aggregated fields from the table: "account_transfer_receiver_total_value" */
  account_transfer_receiver_total_value_aggregate: Account_Transfer_Receiver_Total_Value_Aggregate;
  /** fetch data from the table: "account_transfer_receiver_total_value" using primary key columns */
  account_transfer_receiver_total_value_by_pk?: Maybe<Account_Transfer_Receiver_Total_Value>;
  /** fetch data from the table in a streaming manner: "account_transfer_receiver_total_value" */
  account_transfer_receiver_total_value_stream: Array<Account_Transfer_Receiver_Total_Value>;
  /** fetch data from the table: "account_transfer_sender_total_count" */
  account_transfer_sender_total_count: Array<Account_Transfer_Sender_Total_Count>;
  /** fetch aggregated fields from the table: "account_transfer_sender_total_count" */
  account_transfer_sender_total_count_aggregate: Account_Transfer_Sender_Total_Count_Aggregate;
  /** fetch data from the table: "account_transfer_sender_total_count" using primary key columns */
  account_transfer_sender_total_count_by_pk?: Maybe<Account_Transfer_Sender_Total_Count>;
  /** fetch data from the table in a streaming manner: "account_transfer_sender_total_count" */
  account_transfer_sender_total_count_stream: Array<Account_Transfer_Sender_Total_Count>;
  /** fetch data from the table: "account_transfer_sender_total_value" */
  account_transfer_sender_total_value: Array<Account_Transfer_Sender_Total_Value>;
  /** fetch aggregated fields from the table: "account_transfer_sender_total_value" */
  account_transfer_sender_total_value_aggregate: Account_Transfer_Sender_Total_Value_Aggregate;
  /** fetch data from the table: "account_transfer_sender_total_value" using primary key columns */
  account_transfer_sender_total_value_by_pk?: Maybe<Account_Transfer_Sender_Total_Value>;
  /** fetch data from the table in a streaming manner: "account_transfer_sender_total_value" */
  account_transfer_sender_total_value_stream: Array<Account_Transfer_Sender_Total_Value>;
  /** fetch data from the table: "farmer_block_total_count" */
  farmer_block_total_count: Array<Farmer_Block_Total_Count>;
  /** fetch aggregated fields from the table: "farmer_block_total_count" */
  farmer_block_total_count_aggregate: Farmer_Block_Total_Count_Aggregate;
  /** fetch data from the table: "farmer_block_total_count" using primary key columns */
  farmer_block_total_count_by_pk?: Maybe<Farmer_Block_Total_Count>;
  /** fetch data from the table in a streaming manner: "farmer_block_total_count" */
  farmer_block_total_count_stream: Array<Farmer_Block_Total_Count>;
  /** fetch data from the table: "farmer_block_total_value" */
  farmer_block_total_value: Array<Farmer_Block_Total_Value>;
  /** fetch aggregated fields from the table: "farmer_block_total_value" */
  farmer_block_total_value_aggregate: Farmer_Block_Total_Value_Aggregate;
  /** fetch data from the table: "farmer_block_total_value" using primary key columns */
  farmer_block_total_value_by_pk?: Maybe<Farmer_Block_Total_Value>;
  /** fetch data from the table in a streaming manner: "farmer_block_total_value" */
  farmer_block_total_value_stream: Array<Farmer_Block_Total_Value>;
  /** fetch data from the table: "farmer_vote_and_block_total_count" */
  farmer_vote_and_block_total_count: Array<Farmer_Vote_And_Block_Total_Count>;
  /** fetch aggregated fields from the table: "farmer_vote_and_block_total_count" */
  farmer_vote_and_block_total_count_aggregate: Farmer_Vote_And_Block_Total_Count_Aggregate;
  /** fetch data from the table: "farmer_vote_and_block_total_count" using primary key columns */
  farmer_vote_and_block_total_count_by_pk?: Maybe<Farmer_Vote_And_Block_Total_Count>;
  /** fetch data from the table in a streaming manner: "farmer_vote_and_block_total_count" */
  farmer_vote_and_block_total_count_stream: Array<Farmer_Vote_And_Block_Total_Count>;
  /** fetch data from the table: "farmer_vote_and_block_total_value" */
  farmer_vote_and_block_total_value: Array<Farmer_Vote_And_Block_Total_Value>;
  /** fetch aggregated fields from the table: "farmer_vote_and_block_total_value" */
  farmer_vote_and_block_total_value_aggregate: Farmer_Vote_And_Block_Total_Value_Aggregate;
  /** fetch data from the table: "farmer_vote_and_block_total_value" using primary key columns */
  farmer_vote_and_block_total_value_by_pk?: Maybe<Farmer_Vote_And_Block_Total_Value>;
  /** fetch data from the table in a streaming manner: "farmer_vote_and_block_total_value" */
  farmer_vote_and_block_total_value_stream: Array<Farmer_Vote_And_Block_Total_Value>;
  /** fetch data from the table: "farmer_vote_total_count" */
  farmer_vote_total_count: Array<Farmer_Vote_Total_Count>;
  /** fetch aggregated fields from the table: "farmer_vote_total_count" */
  farmer_vote_total_count_aggregate: Farmer_Vote_Total_Count_Aggregate;
  /** fetch data from the table: "farmer_vote_total_count" using primary key columns */
  farmer_vote_total_count_by_pk?: Maybe<Farmer_Vote_Total_Count>;
  /** fetch data from the table in a streaming manner: "farmer_vote_total_count" */
  farmer_vote_total_count_stream: Array<Farmer_Vote_Total_Count>;
  /** fetch data from the table: "farmer_vote_total_value" */
  farmer_vote_total_value: Array<Farmer_Vote_Total_Value>;
  /** fetch aggregated fields from the table: "farmer_vote_total_value" */
  farmer_vote_total_value_aggregate: Farmer_Vote_Total_Value_Aggregate;
  /** fetch data from the table: "farmer_vote_total_value" using primary key columns */
  farmer_vote_total_value_by_pk?: Maybe<Farmer_Vote_Total_Value>;
  /** fetch data from the table in a streaming manner: "farmer_vote_total_value" */
  farmer_vote_total_value_stream: Array<Farmer_Vote_Total_Value>;
  /** fetch data from the table: "nominator_deposits_total_count" */
  nominator_deposits_total_count: Array<Nominator_Deposits_Total_Count>;
  /** fetch aggregated fields from the table: "nominator_deposits_total_count" */
  nominator_deposits_total_count_aggregate: Nominator_Deposits_Total_Count_Aggregate;
  /** fetch data from the table: "nominator_deposits_total_count" using primary key columns */
  nominator_deposits_total_count_by_pk?: Maybe<Nominator_Deposits_Total_Count>;
  /** fetch data from the table in a streaming manner: "nominator_deposits_total_count" */
  nominator_deposits_total_count_stream: Array<Nominator_Deposits_Total_Count>;
  /** fetch data from the table: "nominator_deposits_total_value" */
  nominator_deposits_total_value: Array<Nominator_Deposits_Total_Value>;
  /** fetch aggregated fields from the table: "nominator_deposits_total_value" */
  nominator_deposits_total_value_aggregate: Nominator_Deposits_Total_Value_Aggregate;
  /** fetch data from the table: "nominator_deposits_total_value" using primary key columns */
  nominator_deposits_total_value_by_pk?: Maybe<Nominator_Deposits_Total_Value>;
  /** fetch data from the table in a streaming manner: "nominator_deposits_total_value" */
  nominator_deposits_total_value_stream: Array<Nominator_Deposits_Total_Value>;
  /** fetch data from the table: "nominator_withdrawals_total_count" */
  nominator_withdrawals_total_count: Array<Nominator_Withdrawals_Total_Count>;
  /** fetch aggregated fields from the table: "nominator_withdrawals_total_count" */
  nominator_withdrawals_total_count_aggregate: Nominator_Withdrawals_Total_Count_Aggregate;
  /** fetch data from the table: "nominator_withdrawals_total_count" using primary key columns */
  nominator_withdrawals_total_count_by_pk?: Maybe<Nominator_Withdrawals_Total_Count>;
  /** fetch data from the table in a streaming manner: "nominator_withdrawals_total_count" */
  nominator_withdrawals_total_count_stream: Array<Nominator_Withdrawals_Total_Count>;
  /** fetch data from the table: "operator_bundle_total_count" */
  operator_bundle_total_count: Array<Operator_Bundle_Total_Count>;
  /** fetch aggregated fields from the table: "operator_bundle_total_count" */
  operator_bundle_total_count_aggregate: Operator_Bundle_Total_Count_Aggregate;
  /** fetch data from the table: "operator_bundle_total_count" using primary key columns */
  operator_bundle_total_count_by_pk?: Maybe<Operator_Bundle_Total_Count>;
  /** fetch data from the table in a streaming manner: "operator_bundle_total_count" */
  operator_bundle_total_count_stream: Array<Operator_Bundle_Total_Count>;
  /** fetch data from the table: "operator_deposits_total_count" */
  operator_deposits_total_count: Array<Operator_Deposits_Total_Count>;
  /** fetch aggregated fields from the table: "operator_deposits_total_count" */
  operator_deposits_total_count_aggregate: Operator_Deposits_Total_Count_Aggregate;
  /** fetch data from the table: "operator_deposits_total_count" using primary key columns */
  operator_deposits_total_count_by_pk?: Maybe<Operator_Deposits_Total_Count>;
  /** fetch data from the table in a streaming manner: "operator_deposits_total_count" */
  operator_deposits_total_count_stream: Array<Operator_Deposits_Total_Count>;
  /** fetch data from the table: "operator_deposits_total_value" */
  operator_deposits_total_value: Array<Operator_Deposits_Total_Value>;
  /** fetch aggregated fields from the table: "operator_deposits_total_value" */
  operator_deposits_total_value_aggregate: Operator_Deposits_Total_Value_Aggregate;
  /** fetch data from the table: "operator_deposits_total_value" using primary key columns */
  operator_deposits_total_value_by_pk?: Maybe<Operator_Deposits_Total_Value>;
  /** fetch data from the table in a streaming manner: "operator_deposits_total_value" */
  operator_deposits_total_value_stream: Array<Operator_Deposits_Total_Value>;
  /** fetch data from the table: "operator_total_rewards_collected" */
  operator_total_rewards_collected: Array<Operator_Total_Rewards_Collected>;
  /** fetch aggregated fields from the table: "operator_total_rewards_collected" */
  operator_total_rewards_collected_aggregate: Operator_Total_Rewards_Collected_Aggregate;
  /** fetch data from the table: "operator_total_rewards_collected" using primary key columns */
  operator_total_rewards_collected_by_pk?: Maybe<Operator_Total_Rewards_Collected>;
  /** fetch data from the table in a streaming manner: "operator_total_rewards_collected" */
  operator_total_rewards_collected_stream: Array<Operator_Total_Rewards_Collected>;
  /** fetch data from the table: "operator_total_tax_collected" */
  operator_total_tax_collected: Array<Operator_Total_Tax_Collected>;
  /** fetch aggregated fields from the table: "operator_total_tax_collected" */
  operator_total_tax_collected_aggregate: Operator_Total_Tax_Collected_Aggregate;
  /** fetch data from the table: "operator_total_tax_collected" using primary key columns */
  operator_total_tax_collected_by_pk?: Maybe<Operator_Total_Tax_Collected>;
  /** fetch data from the table in a streaming manner: "operator_total_tax_collected" */
  operator_total_tax_collected_stream: Array<Operator_Total_Tax_Collected>;
  /** fetch data from the table: "operator_withdrawals_total_count" */
  operator_withdrawals_total_count: Array<Operator_Withdrawals_Total_Count>;
  /** fetch aggregated fields from the table: "operator_withdrawals_total_count" */
  operator_withdrawals_total_count_aggregate: Operator_Withdrawals_Total_Count_Aggregate;
  /** fetch data from the table: "operator_withdrawals_total_count" using primary key columns */
  operator_withdrawals_total_count_by_pk?: Maybe<Operator_Withdrawals_Total_Count>;
  /** fetch data from the table in a streaming manner: "operator_withdrawals_total_count" */
  operator_withdrawals_total_count_stream: Array<Operator_Withdrawals_Total_Count>;
};


export type Subscription_RootAccount_Extrinsic_Failed_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Failed_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Failed_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Failed_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Extrinsic_Failed_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Extrinsic_Failed_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Success_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Success_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Success_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Success_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Extrinsic_Success_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Extrinsic_Success_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Extrinsic_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Extrinsic_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Extrinsic_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Extrinsic_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Extrinsic_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Remark_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Remark_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Remark_Count_Order_By>>;
  where?: InputMaybe<Account_Remark_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Remark_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Remark_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Remark_Count_Order_By>>;
  where?: InputMaybe<Account_Remark_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Remark_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Remark_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Remark_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Remark_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transaction_Fee_Paid_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transaction_Fee_Paid_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transaction_Fee_Paid_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transaction_Fee_Paid_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Transaction_Fee_Paid_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Receiver_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Receiver_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Receiver_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Transfer_Receiver_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Transfer_Receiver_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Receiver_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Receiver_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Receiver_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Receiver_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Transfer_Receiver_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Transfer_Receiver_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Sender_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Sender_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Count_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Sender_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Transfer_Sender_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Transfer_Sender_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Sender_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Sender_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transfer_Sender_Total_Value_Order_By>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
};


export type Subscription_RootAccount_Transfer_Sender_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Transfer_Sender_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Transfer_Sender_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Block_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Block_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Block_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFarmer_Block_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Farmer_Block_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Block_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Block_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Block_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFarmer_Block_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Farmer_Block_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_And_Block_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_And_Block_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_And_Block_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFarmer_Vote_And_Block_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Farmer_Vote_And_Block_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_And_Block_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_And_Block_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_And_Block_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_And_Block_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFarmer_Vote_And_Block_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Farmer_Vote_And_Block_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Count_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFarmer_Vote_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Farmer_Vote_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Farmer_Vote_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Farmer_Vote_Total_Value_Order_By>>;
  where?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
};


export type Subscription_RootFarmer_Vote_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFarmer_Vote_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Farmer_Vote_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
};


export type Subscription_RootNominator_Deposits_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
};


export type Subscription_RootNominator_Deposits_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
};


export type Subscription_RootNominator_Deposits_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootNominator_Deposits_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Nominator_Deposits_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
};


export type Subscription_RootNominator_Deposits_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
};


export type Subscription_RootNominator_Deposits_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
};


export type Subscription_RootNominator_Deposits_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootNominator_Deposits_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Nominator_Deposits_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
};


export type Subscription_RootNominator_Withdrawals_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Subscription_RootNominator_Withdrawals_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nominator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Subscription_RootNominator_Withdrawals_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootNominator_Withdrawals_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Nominator_Withdrawals_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Bundle_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Operator_Bundle_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Bundle_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Bundle_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Bundle_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Bundle_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Bundle_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_Bundle_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Bundle_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Deposits_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Deposits_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Deposits_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_Deposits_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Deposits_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Deposits_Total_ValueArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
};


export type Subscription_RootOperator_Deposits_Total_Value_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Deposits_Total_Value_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Deposits_Total_Value_Order_By>>;
  where?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
};


export type Subscription_RootOperator_Deposits_Total_Value_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_Deposits_Total_Value_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Deposits_Total_Value_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
};


export type Subscription_RootOperator_Total_Rewards_CollectedArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Rewards_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Rewards_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
};


export type Subscription_RootOperator_Total_Rewards_Collected_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Rewards_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Rewards_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
};


export type Subscription_RootOperator_Total_Rewards_Collected_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_Total_Rewards_Collected_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Total_Rewards_Collected_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
};


export type Subscription_RootOperator_Total_Tax_CollectedArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Tax_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Tax_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
};


export type Subscription_RootOperator_Total_Tax_Collected_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Total_Tax_Collected_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Total_Tax_Collected_Order_By>>;
  where?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
};


export type Subscription_RootOperator_Total_Tax_Collected_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_Total_Tax_Collected_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Total_Tax_Collected_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
};


export type Subscription_RootOperator_Withdrawals_Total_CountArgs = {
  distinct_on?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Withdrawals_Total_Count_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Operator_Withdrawals_Total_Count_Order_By>>;
  where?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
};


export type Subscription_RootOperator_Withdrawals_Total_Count_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootOperator_Withdrawals_Total_Count_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Operator_Withdrawals_Total_Count_Stream_Cursor_Input>>;
  where?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
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

export type AccountTransferSenderTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Transfer_Sender_Total_Count_Order_By> | Account_Transfer_Sender_Total_Count_Order_By;
  where?: InputMaybe<Account_Transfer_Sender_Total_Count_Bool_Exp>;
}>;


export type AccountTransferSenderTotalCountQuery = { __typename?: 'query_root', account_transfer_sender_total_count_aggregate: { __typename?: 'account_transfer_sender_total_count_aggregate', aggregate?: { __typename?: 'account_transfer_sender_total_count_aggregate_fields', count: number } | null }, account_transfer_sender_total_count: Array<{ __typename?: 'account_transfer_sender_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransferSenderTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Transfer_Sender_Total_Value_Order_By> | Account_Transfer_Sender_Total_Value_Order_By;
  where?: InputMaybe<Account_Transfer_Sender_Total_Value_Bool_Exp>;
}>;


export type AccountTransferSenderTotalValueQuery = { __typename?: 'query_root', account_transfer_sender_total_value_aggregate: { __typename?: 'account_transfer_sender_total_value_aggregate', aggregate?: { __typename?: 'account_transfer_sender_total_value_aggregate_fields', count: number } | null }, account_transfer_sender_total_value: Array<{ __typename?: 'account_transfer_sender_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransferReceiverTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Transfer_Receiver_Total_Count_Order_By> | Account_Transfer_Receiver_Total_Count_Order_By;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Count_Bool_Exp>;
}>;


export type AccountTransferReceiverTotalCountQuery = { __typename?: 'query_root', account_transfer_receiver_total_count_aggregate: { __typename?: 'account_transfer_receiver_total_count_aggregate', aggregate?: { __typename?: 'account_transfer_receiver_total_count_aggregate_fields', count: number } | null }, account_transfer_receiver_total_count: Array<{ __typename?: 'account_transfer_receiver_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransferReceiverTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Transfer_Receiver_Total_Value_Order_By> | Account_Transfer_Receiver_Total_Value_Order_By;
  where?: InputMaybe<Account_Transfer_Receiver_Total_Value_Bool_Exp>;
}>;


export type AccountTransferReceiverTotalValueQuery = { __typename?: 'query_root', account_transfer_receiver_total_value_aggregate: { __typename?: 'account_transfer_receiver_total_value_aggregate', aggregate?: { __typename?: 'account_transfer_receiver_total_value_aggregate_fields', count: number } | null }, account_transfer_receiver_total_value: Array<{ __typename?: 'account_transfer_receiver_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountRemarkCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Remark_Count_Order_By> | Account_Remark_Count_Order_By;
  where?: InputMaybe<Account_Remark_Count_Bool_Exp>;
}>;


export type AccountRemarkCountQuery = { __typename?: 'query_root', account_remark_count_aggregate: { __typename?: 'account_remark_count_aggregate', aggregate?: { __typename?: 'account_remark_count_aggregate_fields', count: number } | null }, account_remark_count: Array<{ __typename?: 'account_remark_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountExtrinsicTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Extrinsic_Total_Count_Order_By> | Account_Extrinsic_Total_Count_Order_By;
  where?: InputMaybe<Account_Extrinsic_Total_Count_Bool_Exp>;
}>;


export type AccountExtrinsicTotalCountQuery = { __typename?: 'query_root', account_extrinsic_total_count_aggregate: { __typename?: 'account_extrinsic_total_count_aggregate', aggregate?: { __typename?: 'account_extrinsic_total_count_aggregate_fields', count: number } | null }, account_extrinsic_total_count: Array<{ __typename?: 'account_extrinsic_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountExtrinsicSuccessTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Extrinsic_Success_Total_Count_Order_By> | Account_Extrinsic_Success_Total_Count_Order_By;
  where?: InputMaybe<Account_Extrinsic_Success_Total_Count_Bool_Exp>;
}>;


export type AccountExtrinsicSuccessTotalCountQuery = { __typename?: 'query_root', account_extrinsic_success_total_count_aggregate: { __typename?: 'account_extrinsic_success_total_count_aggregate', aggregate?: { __typename?: 'account_extrinsic_success_total_count_aggregate_fields', count: number } | null }, account_extrinsic_success_total_count: Array<{ __typename?: 'account_extrinsic_success_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountExtrinsicFailedTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Extrinsic_Failed_Total_Count_Order_By> | Account_Extrinsic_Failed_Total_Count_Order_By;
  where?: InputMaybe<Account_Extrinsic_Failed_Total_Count_Bool_Exp>;
}>;


export type AccountExtrinsicFailedTotalCountQuery = { __typename?: 'query_root', account_extrinsic_failed_total_count_aggregate: { __typename?: 'account_extrinsic_failed_total_count_aggregate', aggregate?: { __typename?: 'account_extrinsic_failed_total_count_aggregate_fields', count: number } | null }, account_extrinsic_failed_total_count: Array<{ __typename?: 'account_extrinsic_failed_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type AccountTransactionFeePaidTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Transaction_Fee_Paid_Total_Value_Order_By> | Account_Transaction_Fee_Paid_Total_Value_Order_By;
  where?: InputMaybe<Account_Transaction_Fee_Paid_Total_Value_Bool_Exp>;
}>;


export type AccountTransactionFeePaidTotalValueQuery = { __typename?: 'query_root', account_transaction_fee_paid_total_value_aggregate: { __typename?: 'account_transaction_fee_paid_total_value_aggregate', aggregate?: { __typename?: 'account_transaction_fee_paid_total_value_aggregate_fields', count: number } | null }, account_transaction_fee_paid_total_value: Array<{ __typename?: 'account_transaction_fee_paid_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Farmer_Vote_Total_Count_Order_By> | Farmer_Vote_Total_Count_Order_By;
  where?: InputMaybe<Farmer_Vote_Total_Count_Bool_Exp>;
}>;


export type FarmerVoteTotalCountQuery = { __typename?: 'query_root', farmer_vote_total_count_aggregate: { __typename?: 'farmer_vote_total_count_aggregate', aggregate?: { __typename?: 'farmer_vote_total_count_aggregate_fields', count: number } | null }, farmer_vote_total_count: Array<{ __typename?: 'farmer_vote_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Farmer_Vote_Total_Value_Order_By> | Farmer_Vote_Total_Value_Order_By;
  where?: InputMaybe<Farmer_Vote_Total_Value_Bool_Exp>;
}>;


export type FarmerVoteTotalValueQuery = { __typename?: 'query_root', farmer_vote_total_value_aggregate: { __typename?: 'farmer_vote_total_value_aggregate', aggregate?: { __typename?: 'farmer_vote_total_value_aggregate_fields', count: number } | null }, farmer_vote_total_value: Array<{ __typename?: 'farmer_vote_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerBlockTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Farmer_Block_Total_Count_Order_By> | Farmer_Block_Total_Count_Order_By;
  where?: InputMaybe<Farmer_Block_Total_Count_Bool_Exp>;
}>;


export type FarmerBlockTotalCountQuery = { __typename?: 'query_root', farmer_block_total_count_aggregate: { __typename?: 'farmer_block_total_count_aggregate', aggregate?: { __typename?: 'farmer_block_total_count_aggregate_fields', count: number } | null }, farmer_block_total_count: Array<{ __typename?: 'farmer_block_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerBlockTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Farmer_Block_Total_Value_Order_By> | Farmer_Block_Total_Value_Order_By;
  where?: InputMaybe<Farmer_Block_Total_Value_Bool_Exp>;
}>;


export type FarmerBlockTotalValueQuery = { __typename?: 'query_root', farmer_block_total_value_aggregate: { __typename?: 'farmer_block_total_value_aggregate', aggregate?: { __typename?: 'farmer_block_total_value_aggregate_fields', count: number } | null }, farmer_block_total_value: Array<{ __typename?: 'farmer_block_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorTotalRewardsCollectedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Total_Rewards_Collected_Order_By> | Operator_Total_Rewards_Collected_Order_By;
  where?: InputMaybe<Operator_Total_Rewards_Collected_Bool_Exp>;
}>;


export type OperatorTotalRewardsCollectedQuery = { __typename?: 'query_root', operator_total_rewards_collected_aggregate: { __typename?: 'operator_total_rewards_collected_aggregate', aggregate?: { __typename?: 'operator_total_rewards_collected_aggregate_fields', count: number } | null }, operator_total_rewards_collected: Array<{ __typename?: 'operator_total_rewards_collected', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorTotalTaxCollectedQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Total_Tax_Collected_Order_By> | Operator_Total_Tax_Collected_Order_By;
  where?: InputMaybe<Operator_Total_Tax_Collected_Bool_Exp>;
}>;


export type OperatorTotalTaxCollectedQuery = { __typename?: 'query_root', operator_total_tax_collected_aggregate: { __typename?: 'operator_total_tax_collected_aggregate', aggregate?: { __typename?: 'operator_total_tax_collected_aggregate_fields', count: number } | null }, operator_total_tax_collected: Array<{ __typename?: 'operator_total_tax_collected', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorBundleTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Bundle_Total_Count_Order_By> | Operator_Bundle_Total_Count_Order_By;
  where?: InputMaybe<Operator_Bundle_Total_Count_Bool_Exp>;
}>;


export type OperatorBundleTotalCountQuery = { __typename?: 'query_root', operator_bundle_total_count_aggregate: { __typename?: 'operator_bundle_total_count_aggregate', aggregate?: { __typename?: 'operator_bundle_total_count_aggregate_fields', count: number } | null }, operator_bundle_total_count: Array<{ __typename?: 'operator_bundle_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorDepositsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Deposits_Total_Count_Order_By> | Operator_Deposits_Total_Count_Order_By;
  where?: InputMaybe<Operator_Deposits_Total_Count_Bool_Exp>;
}>;


export type OperatorDepositsTotalCountQuery = { __typename?: 'query_root', operator_deposits_total_count_aggregate: { __typename?: 'operator_deposits_total_count_aggregate', aggregate?: { __typename?: 'operator_deposits_total_count_aggregate_fields', count: number } | null }, operator_deposits_total_count: Array<{ __typename?: 'operator_deposits_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorDepositsTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Deposits_Total_Value_Order_By> | Operator_Deposits_Total_Value_Order_By;
  where?: InputMaybe<Operator_Deposits_Total_Value_Bool_Exp>;
}>;


export type OperatorDepositsTotalValueQuery = { __typename?: 'query_root', operator_deposits_total_value_aggregate: { __typename?: 'operator_deposits_total_value_aggregate', aggregate?: { __typename?: 'operator_deposits_total_value_aggregate_fields', count: number } | null }, operator_deposits_total_value: Array<{ __typename?: 'operator_deposits_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type OperatorWithdrawalsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Operator_Withdrawals_Total_Count_Order_By> | Operator_Withdrawals_Total_Count_Order_By;
  where?: InputMaybe<Operator_Withdrawals_Total_Count_Bool_Exp>;
}>;


export type OperatorWithdrawalsTotalCountQuery = { __typename?: 'query_root', operator_withdrawals_total_count_aggregate: { __typename?: 'operator_withdrawals_total_count_aggregate', aggregate?: { __typename?: 'operator_withdrawals_total_count_aggregate_fields', count: number } | null }, operator_withdrawals_total_count: Array<{ __typename?: 'operator_withdrawals_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominatorDepositsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Nominator_Deposits_Total_Count_Order_By> | Nominator_Deposits_Total_Count_Order_By;
  where?: InputMaybe<Nominator_Deposits_Total_Count_Bool_Exp>;
}>;


export type NominatorDepositsTotalCountQuery = { __typename?: 'query_root', nominator_deposits_total_count_aggregate: { __typename?: 'nominator_deposits_total_count_aggregate', aggregate?: { __typename?: 'nominator_deposits_total_count_aggregate_fields', count: number } | null }, nominator_deposits_total_count: Array<{ __typename?: 'nominator_deposits_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominatorDepositsTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Nominator_Deposits_Total_Value_Order_By> | Nominator_Deposits_Total_Value_Order_By;
  where?: InputMaybe<Nominator_Deposits_Total_Value_Bool_Exp>;
}>;


export type NominatorDepositsTotalValueQuery = { __typename?: 'query_root', nominator_deposits_total_value_aggregate: { __typename?: 'nominator_deposits_total_value_aggregate', aggregate?: { __typename?: 'nominator_deposits_total_value_aggregate_fields', count: number } | null }, nominator_deposits_total_value: Array<{ __typename?: 'nominator_deposits_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };

export type NominatorWithdrawalsTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Nominator_Withdrawals_Total_Count_Order_By> | Nominator_Withdrawals_Total_Count_Order_By;
  where?: InputMaybe<Nominator_Withdrawals_Total_Count_Bool_Exp>;
}>;


export type NominatorWithdrawalsTotalCountQuery = { __typename?: 'query_root', nominator_withdrawals_total_count_aggregate: { __typename?: 'nominator_withdrawals_total_count_aggregate', aggregate?: { __typename?: 'nominator_withdrawals_total_count_aggregate_fields', count: number } | null }, nominator_withdrawals_total_count: Array<{ __typename?: 'nominator_withdrawals_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteAndBlockTotalCountQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Farmer_Vote_And_Block_Total_Count_Order_By> | Farmer_Vote_And_Block_Total_Count_Order_By;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Count_Bool_Exp>;
}>;


export type FarmerVoteAndBlockTotalCountQuery = { __typename?: 'query_root', farmer_vote_and_block_total_count_aggregate: { __typename?: 'farmer_vote_and_block_total_count_aggregate', aggregate?: { __typename?: 'farmer_vote_and_block_total_count_aggregate_fields', count: number } | null }, farmer_vote_and_block_total_count: Array<{ __typename?: 'farmer_vote_and_block_total_count', id: string, rank: number, value: number, last_contribution_at: any, created_at: number, updated_at: number }> };

export type FarmerVoteAndBlockTotalValueQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Farmer_Vote_And_Block_Total_Value_Order_By> | Farmer_Vote_And_Block_Total_Value_Order_By;
  where?: InputMaybe<Farmer_Vote_And_Block_Total_Value_Bool_Exp>;
}>;


export type FarmerVoteAndBlockTotalValueQuery = { __typename?: 'query_root', farmer_vote_and_block_total_value_aggregate: { __typename?: 'farmer_vote_and_block_total_value_aggregate', aggregate?: { __typename?: 'farmer_vote_and_block_total_value_aggregate_fields', count: number } | null }, farmer_vote_and_block_total_value: Array<{ __typename?: 'farmer_vote_and_block_total_value', id: string, rank: number, value: any, last_contribution_at: any, created_at: number, updated_at: number }> };
