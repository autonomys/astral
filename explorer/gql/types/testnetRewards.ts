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
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rank: Scalars['numeric']['output'];
  total_campaigns_participated: Scalars['numeric']['output'];
  total_earnings_amount_atc_token: Scalars['numeric']['output'];
  total_earnings_amount_testnet_token: Scalars['numeric']['output'];
  total_earnings_percentage_atc_token: Scalars['numeric']['output'];
  total_earnings_percentage_testnet_token: Scalars['numeric']['output'];
  updated_at: Scalars['Int']['output'];
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
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Bool_Exp>>;
  _not?: InputMaybe<Account_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  rank?: InputMaybe<Numeric_Comparison_Exp>;
  total_campaigns_participated?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_amount_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_amount_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'account_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_campaigns_participated?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'account_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_campaigns_participated?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account". */
export type Account_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  total_campaigns_participated?: InputMaybe<Order_By>;
  total_earnings_amount_atc_token?: InputMaybe<Order_By>;
  total_earnings_amount_testnet_token?: InputMaybe<Order_By>;
  total_earnings_percentage_atc_token?: InputMaybe<Order_By>;
  total_earnings_percentage_testnet_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** columns and relationships of "account_per_campaign" */
export type Account_Per_Campaign = {
  __typename?: 'account_per_campaign';
  account_id: Scalars['String']['output'];
  campaign_id: Scalars['String']['output'];
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rank: Scalars['numeric']['output'];
  total_earnings_amount_atc_token: Scalars['numeric']['output'];
  total_earnings_amount_testnet_token: Scalars['numeric']['output'];
  total_earnings_percentage_atc_token: Scalars['numeric']['output'];
  total_earnings_percentage_testnet_token: Scalars['numeric']['output'];
  updated_at: Scalars['Int']['output'];
};

/** aggregated selection of "account_per_campaign" */
export type Account_Per_Campaign_Aggregate = {
  __typename?: 'account_per_campaign_aggregate';
  aggregate?: Maybe<Account_Per_Campaign_Aggregate_Fields>;
  nodes: Array<Account_Per_Campaign>;
};

/** aggregate fields of "account_per_campaign" */
export type Account_Per_Campaign_Aggregate_Fields = {
  __typename?: 'account_per_campaign_aggregate_fields';
  avg?: Maybe<Account_Per_Campaign_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Per_Campaign_Max_Fields>;
  min?: Maybe<Account_Per_Campaign_Min_Fields>;
  stddev?: Maybe<Account_Per_Campaign_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Per_Campaign_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Per_Campaign_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Per_Campaign_Sum_Fields>;
  var_pop?: Maybe<Account_Per_Campaign_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Per_Campaign_Var_Samp_Fields>;
  variance?: Maybe<Account_Per_Campaign_Variance_Fields>;
};


/** aggregate fields of "account_per_campaign" */
export type Account_Per_Campaign_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Per_Campaign_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Per_Campaign_Avg_Fields = {
  __typename?: 'account_per_campaign_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_per_campaign". All fields are combined with a logical 'AND'. */
export type Account_Per_Campaign_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Per_Campaign_Bool_Exp>>;
  _not?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Per_Campaign_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  campaign_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  rank?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_amount_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_amount_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Account_Per_Campaign_Max_Fields = {
  __typename?: 'account_per_campaign_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Account_Per_Campaign_Min_Fields = {
  __typename?: 'account_per_campaign_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "account_per_campaign". */
export type Account_Per_Campaign_Order_By = {
  account_id?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  total_earnings_amount_atc_token?: InputMaybe<Order_By>;
  total_earnings_amount_testnet_token?: InputMaybe<Order_By>;
  total_earnings_percentage_atc_token?: InputMaybe<Order_By>;
  total_earnings_percentage_testnet_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "account_per_campaign" */
export enum Account_Per_Campaign_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Rank = 'rank',
  /** column name */
  TotalEarningsAmountAtcToken = 'total_earnings_amount_atc_token',
  /** column name */
  TotalEarningsAmountTestnetToken = 'total_earnings_amount_testnet_token',
  /** column name */
  TotalEarningsPercentageAtcToken = 'total_earnings_percentage_atc_token',
  /** column name */
  TotalEarningsPercentageTestnetToken = 'total_earnings_percentage_testnet_token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Account_Per_Campaign_Stddev_Fields = {
  __typename?: 'account_per_campaign_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Per_Campaign_Stddev_Pop_Fields = {
  __typename?: 'account_per_campaign_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Per_Campaign_Stddev_Samp_Fields = {
  __typename?: 'account_per_campaign_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_per_campaign" */
export type Account_Per_Campaign_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Per_Campaign_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Per_Campaign_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  campaign_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rank?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_amount_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_amount_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Per_Campaign_Sum_Fields = {
  __typename?: 'account_per_campaign_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Per_Campaign_Var_Pop_Fields = {
  __typename?: 'account_per_campaign_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Per_Campaign_Var_Samp_Fields = {
  __typename?: 'account_per_campaign_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Per_Campaign_Variance_Fields = {
  __typename?: 'account_per_campaign_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** select columns of table "account" */
export enum Account_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Rank = 'rank',
  /** column name */
  TotalCampaignsParticipated = 'total_campaigns_participated',
  /** column name */
  TotalEarningsAmountAtcToken = 'total_earnings_amount_atc_token',
  /** column name */
  TotalEarningsAmountTestnetToken = 'total_earnings_amount_testnet_token',
  /** column name */
  TotalEarningsPercentageAtcToken = 'total_earnings_percentage_atc_token',
  /** column name */
  TotalEarningsPercentageTestnetToken = 'total_earnings_percentage_testnet_token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Account_Stddev_Fields = {
  __typename?: 'account_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Stddev_Pop_Fields = {
  __typename?: 'account_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Stddev_Samp_Fields = {
  __typename?: 'account_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
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
  rank?: InputMaybe<Scalars['numeric']['input']>;
  total_campaigns_participated?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_amount_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_amount_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Sum_Fields = {
  __typename?: 'account_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_campaigns_participated?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Var_Pop_Fields = {
  __typename?: 'account_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Var_Samp_Fields = {
  __typename?: 'account_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Variance_Fields = {
  __typename?: 'account_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_campaigns_participated?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "campaign" */
export type Campaign = {
  __typename?: 'campaign';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  total_earnings_amount_atc_token: Scalars['numeric']['output'];
  total_earnings_amount_testnet_token: Scalars['numeric']['output'];
  total_earnings_percentage_atc_token: Scalars['numeric']['output'];
  total_earnings_percentage_testnet_token: Scalars['numeric']['output'];
  updated_at: Scalars['Int']['output'];
};

/** aggregated selection of "campaign" */
export type Campaign_Aggregate = {
  __typename?: 'campaign_aggregate';
  aggregate?: Maybe<Campaign_Aggregate_Fields>;
  nodes: Array<Campaign>;
};

/** aggregate fields of "campaign" */
export type Campaign_Aggregate_Fields = {
  __typename?: 'campaign_aggregate_fields';
  avg?: Maybe<Campaign_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Campaign_Max_Fields>;
  min?: Maybe<Campaign_Min_Fields>;
  stddev?: Maybe<Campaign_Stddev_Fields>;
  stddev_pop?: Maybe<Campaign_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Campaign_Stddev_Samp_Fields>;
  sum?: Maybe<Campaign_Sum_Fields>;
  var_pop?: Maybe<Campaign_Var_Pop_Fields>;
  var_samp?: Maybe<Campaign_Var_Samp_Fields>;
  variance?: Maybe<Campaign_Variance_Fields>;
};


/** aggregate fields of "campaign" */
export type Campaign_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Campaign_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Campaign_Avg_Fields = {
  __typename?: 'campaign_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "campaign". All fields are combined with a logical 'AND'. */
export type Campaign_Bool_Exp = {
  _and?: InputMaybe<Array<Campaign_Bool_Exp>>;
  _not?: InputMaybe<Campaign_Bool_Exp>;
  _or?: InputMaybe<Array<Campaign_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  total_earnings_amount_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_amount_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Campaign_Max_Fields = {
  __typename?: 'campaign_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Campaign_Min_Fields = {
  __typename?: 'campaign_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "campaign". */
export type Campaign_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  total_earnings_amount_atc_token?: InputMaybe<Order_By>;
  total_earnings_amount_testnet_token?: InputMaybe<Order_By>;
  total_earnings_percentage_atc_token?: InputMaybe<Order_By>;
  total_earnings_percentage_testnet_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "campaign" */
export enum Campaign_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TotalEarningsAmountAtcToken = 'total_earnings_amount_atc_token',
  /** column name */
  TotalEarningsAmountTestnetToken = 'total_earnings_amount_testnet_token',
  /** column name */
  TotalEarningsPercentageAtcToken = 'total_earnings_percentage_atc_token',
  /** column name */
  TotalEarningsPercentageTestnetToken = 'total_earnings_percentage_testnet_token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Campaign_Stddev_Fields = {
  __typename?: 'campaign_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Campaign_Stddev_Pop_Fields = {
  __typename?: 'campaign_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Campaign_Stddev_Samp_Fields = {
  __typename?: 'campaign_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "campaign" */
export type Campaign_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Campaign_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Campaign_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  total_earnings_amount_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_amount_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Campaign_Sum_Fields = {
  __typename?: 'campaign_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Campaign_Var_Pop_Fields = {
  __typename?: 'campaign_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Campaign_Var_Samp_Fields = {
  __typename?: 'campaign_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Campaign_Variance_Fields = {
  __typename?: 'campaign_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "domain" */
export type Domain = {
  __typename?: 'domain';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  updated_at: Scalars['Int']['output'];
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
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "domain". All fields are combined with a logical 'AND'. */
export type Domain_Bool_Exp = {
  _and?: InputMaybe<Array<Domain_Bool_Exp>>;
  _not?: InputMaybe<Domain_Bool_Exp>;
  _or?: InputMaybe<Array<Domain_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Domain_Max_Fields = {
  __typename?: 'domain_max_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Domain_Min_Fields = {
  __typename?: 'domain_min_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "domain". */
export type Domain_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "domain" */
export enum Domain_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Domain_Stddev_Fields = {
  __typename?: 'domain_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Domain_Stddev_Pop_Fields = {
  __typename?: 'domain_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Domain_Stddev_Samp_Fields = {
  __typename?: 'domain_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
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
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Domain_Sum_Fields = {
  __typename?: 'domain_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Domain_Var_Pop_Fields = {
  __typename?: 'domain_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Domain_Var_Samp_Fields = {
  __typename?: 'domain_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Domain_Variance_Fields = {
  __typename?: 'domain_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "nominator" */
export type Nominator = {
  __typename?: 'nominator';
  account_id: Scalars['String']['output'];
  created_at: Scalars['Int']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  domain_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  operator_id: Scalars['String']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_withdrawn: Scalars['numeric']['output'];
  updated_at: Scalars['Int']['output'];
};

/** aggregated selection of "nominator" */
export type Nominator_Aggregate = {
  __typename?: 'nominator_aggregate';
  aggregate?: Maybe<Nominator_Aggregate_Fields>;
  nodes: Array<Nominator>;
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

/** aggregate avg on columns */
export type Nominator_Avg_Fields = {
  __typename?: 'nominator_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "nominator". All fields are combined with a logical 'AND'. */
export type Nominator_Bool_Exp = {
  _and?: InputMaybe<Array<Nominator_Bool_Exp>>;
  _not?: InputMaybe<Nominator_Bool_Exp>;
  _or?: InputMaybe<Array<Nominator_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  operator_id?: InputMaybe<String_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawn?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Nominator_Max_Fields = {
  __typename?: 'nominator_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Nominator_Min_Fields = {
  __typename?: 'nominator_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  operator_id?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "nominator". */
export type Nominator_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  operator_id?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "nominator" */
export enum Nominator_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentTotalShares = 'current_total_shares',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  Id = 'id',
  /** column name */
  OperatorId = 'operator_id',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalWithdrawn = 'total_withdrawn',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Nominator_Stddev_Fields = {
  __typename?: 'nominator_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Nominator_Stddev_Pop_Fields = {
  __typename?: 'nominator_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Nominator_Stddev_Samp_Fields = {
  __typename?: 'nominator_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
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
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  operator_id?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawn?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Nominator_Sum_Fields = {
  __typename?: 'nominator_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Nominator_Var_Pop_Fields = {
  __typename?: 'nominator_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Nominator_Var_Samp_Fields = {
  __typename?: 'nominator_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Nominator_Variance_Fields = {
  __typename?: 'nominator_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
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
  account_id: Scalars['String']['output'];
  created_at: Scalars['Int']['output'];
  current_total_shares: Scalars['numeric']['output'];
  current_total_stake: Scalars['numeric']['output'];
  domain_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  total_deposits: Scalars['numeric']['output'];
  total_rewards: Scalars['numeric']['output'];
  total_withdrawn: Scalars['numeric']['output'];
  updated_at: Scalars['Int']['output'];
};

/** aggregated selection of "operator" */
export type Operator_Aggregate = {
  __typename?: 'operator_aggregate';
  aggregate?: Maybe<Operator_Aggregate_Fields>;
  nodes: Array<Operator>;
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

/** aggregate avg on columns */
export type Operator_Avg_Fields = {
  __typename?: 'operator_avg_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "operator". All fields are combined with a logical 'AND'. */
export type Operator_Bool_Exp = {
  _and?: InputMaybe<Array<Operator_Bool_Exp>>;
  _not?: InputMaybe<Operator_Bool_Exp>;
  _or?: InputMaybe<Array<Operator_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  current_total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  current_total_stake?: InputMaybe<Numeric_Comparison_Exp>;
  domain_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  total_deposits?: InputMaybe<Numeric_Comparison_Exp>;
  total_rewards?: InputMaybe<Numeric_Comparison_Exp>;
  total_withdrawn?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Operator_Max_Fields = {
  __typename?: 'operator_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_rewards?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Operator_Min_Fields = {
  __typename?: 'operator_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  domain_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_rewards?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "operator". */
export type Operator_Order_By = {
  account_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_total_shares?: InputMaybe<Order_By>;
  current_total_stake?: InputMaybe<Order_By>;
  domain_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  total_deposits?: InputMaybe<Order_By>;
  total_rewards?: InputMaybe<Order_By>;
  total_withdrawn?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "operator" */
export enum Operator_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentTotalShares = 'current_total_shares',
  /** column name */
  CurrentTotalStake = 'current_total_stake',
  /** column name */
  DomainId = 'domain_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TotalDeposits = 'total_deposits',
  /** column name */
  TotalRewards = 'total_rewards',
  /** column name */
  TotalWithdrawn = 'total_withdrawn',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Operator_Stddev_Fields = {
  __typename?: 'operator_stddev_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Operator_Stddev_Pop_Fields = {
  __typename?: 'operator_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Operator_Stddev_Samp_Fields = {
  __typename?: 'operator_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
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
  current_total_shares?: InputMaybe<Scalars['numeric']['input']>;
  current_total_stake?: InputMaybe<Scalars['numeric']['input']>;
  domain_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  total_deposits?: InputMaybe<Scalars['numeric']['input']>;
  total_rewards?: InputMaybe<Scalars['numeric']['input']>;
  total_withdrawn?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Operator_Sum_Fields = {
  __typename?: 'operator_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  current_total_shares?: Maybe<Scalars['numeric']['output']>;
  current_total_stake?: Maybe<Scalars['numeric']['output']>;
  total_deposits?: Maybe<Scalars['numeric']['output']>;
  total_rewards?: Maybe<Scalars['numeric']['output']>;
  total_withdrawn?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Operator_Var_Pop_Fields = {
  __typename?: 'operator_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Operator_Var_Samp_Fields = {
  __typename?: 'operator_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Operator_Variance_Fields = {
  __typename?: 'operator_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  current_total_shares?: Maybe<Scalars['Float']['output']>;
  current_total_stake?: Maybe<Scalars['Float']['output']>;
  total_deposits?: Maybe<Scalars['Float']['output']>;
  total_rewards?: Maybe<Scalars['Float']['output']>;
  total_withdrawn?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
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
  /** fetch data from the table: "account_per_campaign" */
  account_per_campaign: Array<Account_Per_Campaign>;
  /** fetch aggregated fields from the table: "account_per_campaign" */
  account_per_campaign_aggregate: Account_Per_Campaign_Aggregate;
  /** fetch data from the table: "account_per_campaign" using primary key columns */
  account_per_campaign_by_pk?: Maybe<Account_Per_Campaign>;
  /** fetch data from the table: "campaign" */
  campaign: Array<Campaign>;
  /** fetch aggregated fields from the table: "campaign" */
  campaign_aggregate: Campaign_Aggregate;
  /** fetch data from the table: "campaign" using primary key columns */
  campaign_by_pk?: Maybe<Campaign>;
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
  /** fetch data from the table: "reward" */
  reward: Array<Reward>;
  /** fetch aggregated fields from the table: "reward" */
  reward_aggregate: Reward_Aggregate;
  /** fetch data from the table: "reward" using primary key columns */
  reward_by_pk?: Maybe<Reward>;
  /** fetch data from the table: "total_earnings" */
  total_earnings: Array<Total_Earnings>;
  /** fetch data from the table: "total_earnings" using primary key columns */
  total_earnings_by_pk?: Maybe<Total_Earnings>;
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


export type Query_RootAccount_Per_CampaignArgs = {
  distinct_on?: InputMaybe<Array<Account_Per_Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Per_Campaign_Order_By>>;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
};


export type Query_RootAccount_Per_Campaign_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Per_Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Per_Campaign_Order_By>>;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
};


export type Query_RootAccount_Per_Campaign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootCampaignArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Query_RootCampaign_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Query_RootCampaign_By_PkArgs = {
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


export type Query_RootRewardArgs = {
  distinct_on?: InputMaybe<Array<Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reward_Order_By>>;
  where?: InputMaybe<Reward_Bool_Exp>;
};


export type Query_RootReward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reward_Order_By>>;
  where?: InputMaybe<Reward_Bool_Exp>;
};


export type Query_RootReward_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootTotal_EarningsArgs = {
  distinct_on?: InputMaybe<Array<Total_Earnings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Total_Earnings_Order_By>>;
  where?: InputMaybe<Total_Earnings_Bool_Exp>;
};


export type Query_RootTotal_Earnings_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "reward" */
export type Reward = {
  __typename?: 'reward';
  account_id: Scalars['String']['output'];
  amount: Scalars['numeric']['output'];
  campaign_id: Scalars['String']['output'];
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  updated_at: Scalars['Int']['output'];
};

/** aggregated selection of "reward" */
export type Reward_Aggregate = {
  __typename?: 'reward_aggregate';
  aggregate?: Maybe<Reward_Aggregate_Fields>;
  nodes: Array<Reward>;
};

/** aggregate fields of "reward" */
export type Reward_Aggregate_Fields = {
  __typename?: 'reward_aggregate_fields';
  avg?: Maybe<Reward_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Reward_Max_Fields>;
  min?: Maybe<Reward_Min_Fields>;
  stddev?: Maybe<Reward_Stddev_Fields>;
  stddev_pop?: Maybe<Reward_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Reward_Stddev_Samp_Fields>;
  sum?: Maybe<Reward_Sum_Fields>;
  var_pop?: Maybe<Reward_Var_Pop_Fields>;
  var_samp?: Maybe<Reward_Var_Samp_Fields>;
  variance?: Maybe<Reward_Variance_Fields>;
};


/** aggregate fields of "reward" */
export type Reward_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Reward_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Reward_Avg_Fields = {
  __typename?: 'reward_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "reward". All fields are combined with a logical 'AND'. */
export type Reward_Bool_Exp = {
  _and?: InputMaybe<Array<Reward_Bool_Exp>>;
  _not?: InputMaybe<Reward_Bool_Exp>;
  _or?: InputMaybe<Array<Reward_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  campaign_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Reward_Max_Fields = {
  __typename?: 'reward_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Reward_Min_Fields = {
  __typename?: 'reward_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  campaign_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "reward". */
export type Reward_Order_By = {
  account_id?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  campaign_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "reward" */
export enum Reward_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  CampaignId = 'campaign_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Reward_Stddev_Fields = {
  __typename?: 'reward_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Reward_Stddev_Pop_Fields = {
  __typename?: 'reward_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Reward_Stddev_Samp_Fields = {
  __typename?: 'reward_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "reward" */
export type Reward_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reward_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reward_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  campaign_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Reward_Sum_Fields = {
  __typename?: 'reward_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Reward_Var_Pop_Fields = {
  __typename?: 'reward_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Reward_Var_Samp_Fields = {
  __typename?: 'reward_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Reward_Variance_Fields = {
  __typename?: 'reward_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "account_per_campaign" */
  account_per_campaign: Array<Account_Per_Campaign>;
  /** fetch aggregated fields from the table: "account_per_campaign" */
  account_per_campaign_aggregate: Account_Per_Campaign_Aggregate;
  /** fetch data from the table: "account_per_campaign" using primary key columns */
  account_per_campaign_by_pk?: Maybe<Account_Per_Campaign>;
  /** fetch data from the table in a streaming manner: "account_per_campaign" */
  account_per_campaign_stream: Array<Account_Per_Campaign>;
  /** fetch data from the table in a streaming manner: "account" */
  account_stream: Array<Account>;
  /** fetch data from the table: "campaign" */
  campaign: Array<Campaign>;
  /** fetch aggregated fields from the table: "campaign" */
  campaign_aggregate: Campaign_Aggregate;
  /** fetch data from the table: "campaign" using primary key columns */
  campaign_by_pk?: Maybe<Campaign>;
  /** fetch data from the table in a streaming manner: "campaign" */
  campaign_stream: Array<Campaign>;
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
  /** fetch data from the table: "reward" */
  reward: Array<Reward>;
  /** fetch aggregated fields from the table: "reward" */
  reward_aggregate: Reward_Aggregate;
  /** fetch data from the table: "reward" using primary key columns */
  reward_by_pk?: Maybe<Reward>;
  /** fetch data from the table in a streaming manner: "reward" */
  reward_stream: Array<Reward>;
  /** fetch data from the table: "total_earnings" */
  total_earnings: Array<Total_Earnings>;
  /** fetch data from the table: "total_earnings" using primary key columns */
  total_earnings_by_pk?: Maybe<Total_Earnings>;
  /** fetch data from the table in a streaming manner: "total_earnings" */
  total_earnings_stream: Array<Total_Earnings>;
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


export type Subscription_RootAccount_Per_CampaignArgs = {
  distinct_on?: InputMaybe<Array<Account_Per_Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Per_Campaign_Order_By>>;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
};


export type Subscription_RootAccount_Per_Campaign_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Per_Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Per_Campaign_Order_By>>;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
};


export type Subscription_RootAccount_Per_Campaign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAccount_Per_Campaign_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Per_Campaign_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
};


export type Subscription_RootAccount_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Bool_Exp>;
};


export type Subscription_RootCampaignArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Subscription_RootCampaign_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Campaign_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Campaign_Order_By>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
};


export type Subscription_RootCampaign_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootCampaign_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Campaign_Stream_Cursor_Input>>;
  where?: InputMaybe<Campaign_Bool_Exp>;
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


export type Subscription_RootRewardArgs = {
  distinct_on?: InputMaybe<Array<Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reward_Order_By>>;
  where?: InputMaybe<Reward_Bool_Exp>;
};


export type Subscription_RootReward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reward_Order_By>>;
  where?: InputMaybe<Reward_Bool_Exp>;
};


export type Subscription_RootReward_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootReward_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Reward_Stream_Cursor_Input>>;
  where?: InputMaybe<Reward_Bool_Exp>;
};


export type Subscription_RootTotal_EarningsArgs = {
  distinct_on?: InputMaybe<Array<Total_Earnings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Total_Earnings_Order_By>>;
  where?: InputMaybe<Total_Earnings_Bool_Exp>;
};


export type Subscription_RootTotal_Earnings_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootTotal_Earnings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Total_Earnings_Stream_Cursor_Input>>;
  where?: InputMaybe<Total_Earnings_Bool_Exp>;
};

/** columns and relationships of "total_earnings" */
export type Total_Earnings = {
  __typename?: 'total_earnings';
  created_at: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  total_earnings_amount_atc_token: Scalars['numeric']['output'];
  total_earnings_amount_testnet_token: Scalars['numeric']['output'];
  total_earnings_percentage_atc_token: Scalars['numeric']['output'];
  total_earnings_percentage_testnet_token: Scalars['numeric']['output'];
  total_supply_atc_token: Scalars['numeric']['output'];
  updated_at: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "total_earnings". All fields are combined with a logical 'AND'. */
export type Total_Earnings_Bool_Exp = {
  _and?: InputMaybe<Array<Total_Earnings_Bool_Exp>>;
  _not?: InputMaybe<Total_Earnings_Bool_Exp>;
  _or?: InputMaybe<Array<Total_Earnings_Bool_Exp>>;
  created_at?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  total_earnings_amount_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_amount_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<Numeric_Comparison_Exp>;
  total_supply_atc_token?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "total_earnings". */
export type Total_Earnings_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  total_earnings_amount_atc_token?: InputMaybe<Order_By>;
  total_earnings_amount_testnet_token?: InputMaybe<Order_By>;
  total_earnings_percentage_atc_token?: InputMaybe<Order_By>;
  total_earnings_percentage_testnet_token?: InputMaybe<Order_By>;
  total_supply_atc_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "total_earnings" */
export enum Total_Earnings_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  TotalEarningsAmountAtcToken = 'total_earnings_amount_atc_token',
  /** column name */
  TotalEarningsAmountTestnetToken = 'total_earnings_amount_testnet_token',
  /** column name */
  TotalEarningsPercentageAtcToken = 'total_earnings_percentage_atc_token',
  /** column name */
  TotalEarningsPercentageTestnetToken = 'total_earnings_percentage_testnet_token',
  /** column name */
  TotalSupplyAtcToken = 'total_supply_atc_token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Streaming cursor of the table "total_earnings" */
export type Total_Earnings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Total_Earnings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Total_Earnings_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  total_earnings_amount_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_amount_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['numeric']['input']>;
  total_supply_atc_token?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

export type CampaignsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Campaign_Order_By> | Campaign_Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type CampaignsListQuery = { __typename?: 'query_root', campaign_aggregate: { __typename?: 'campaign_aggregate', aggregate?: { __typename?: 'campaign_aggregate_fields', count: number } | null }, campaign: Array<{ __typename?: 'campaign', id: string, name: string, total_earnings_amount_testnet_token: any, total_earnings_percentage_testnet_token: any, total_earnings_amount_atc_token: any, total_earnings_percentage_atc_token: any, created_at: number, updated_at: number }> };

export type AccountsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Order_By> | Account_Order_By;
  where?: InputMaybe<Account_Bool_Exp>;
}>;


export type AccountsListQuery = { __typename?: 'query_root', account_aggregate: { __typename?: 'account_aggregate', aggregate?: { __typename?: 'account_aggregate_fields', count: number } | null }, account: Array<{ __typename?: 'account', id: string, total_campaigns_participated: any, total_earnings_amount_testnet_token: any, total_earnings_percentage_testnet_token: any, total_earnings_amount_atc_token: any, total_earnings_percentage_atc_token: any, rank: any, created_at: number, updated_at: number }> };

export type AccountsPerCampaignListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Per_Campaign_Order_By> | Account_Per_Campaign_Order_By;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
}>;


export type AccountsPerCampaignListQuery = { __typename?: 'query_root', account_per_campaign_aggregate: { __typename?: 'account_per_campaign_aggregate', aggregate?: { __typename?: 'account_per_campaign_aggregate_fields', count: number } | null }, account_per_campaign: Array<{ __typename?: 'account_per_campaign', id: string, account_id: string, campaign_id: string, total_earnings_amount_testnet_token: any, total_earnings_percentage_testnet_token: any, total_earnings_amount_atc_token: any, total_earnings_percentage_atc_token: any, rank: any, created_at: number, updated_at: number }> };
