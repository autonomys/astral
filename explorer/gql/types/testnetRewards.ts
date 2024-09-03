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
  total_earnings_percentage_atc_token: Scalars['String']['output'];
  total_earnings_percentage_testnet_token: Scalars['String']['output'];
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
  total_earnings_percentage_atc_token?: InputMaybe<String_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<String_Comparison_Exp>;
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
  total_earnings_percentage_atc_token?: Maybe<Scalars['String']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['String']['output']>;
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
  total_earnings_percentage_atc_token?: Maybe<Scalars['String']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['String']['output']>;
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
  total_earnings_percentage_atc_token: Scalars['String']['output'];
  total_earnings_percentage_testnet_token: Scalars['String']['output'];
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
  total_earnings_percentage_atc_token?: InputMaybe<String_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<String_Comparison_Exp>;
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
  total_earnings_percentage_atc_token?: Maybe<Scalars['String']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['String']['output']>;
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
  total_earnings_percentage_atc_token?: Maybe<Scalars['String']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['String']['output']>;
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
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Per_Campaign_Stddev_Pop_Fields = {
  __typename?: 'account_per_campaign_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Per_Campaign_Stddev_Samp_Fields = {
  __typename?: 'account_per_campaign_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
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
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['String']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Account_Per_Campaign_Sum_Fields = {
  __typename?: 'account_per_campaign_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Per_Campaign_Var_Pop_Fields = {
  __typename?: 'account_per_campaign_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Per_Campaign_Var_Samp_Fields = {
  __typename?: 'account_per_campaign_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Per_Campaign_Variance_Fields = {
  __typename?: 'account_per_campaign_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
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
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['String']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['String']['input']>;
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
  total_earnings_percentage_atc_token: Scalars['String']['output'];
  total_earnings_percentage_testnet_token: Scalars['String']['output'];
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
  total_earnings_percentage_atc_token?: InputMaybe<String_Comparison_Exp>;
  total_earnings_percentage_testnet_token?: InputMaybe<String_Comparison_Exp>;
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
  total_earnings_percentage_atc_token?: Maybe<Scalars['String']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['String']['output']>;
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
  total_earnings_percentage_atc_token?: Maybe<Scalars['String']['output']>;
  total_earnings_percentage_testnet_token?: Maybe<Scalars['String']['output']>;
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
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Campaign_Stddev_Pop_Fields = {
  __typename?: 'campaign_stddev_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Campaign_Stddev_Samp_Fields = {
  __typename?: 'campaign_stddev_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
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
  total_earnings_percentage_atc_token?: InputMaybe<Scalars['String']['input']>;
  total_earnings_percentage_testnet_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Campaign_Sum_Fields = {
  __typename?: 'campaign_sum_fields';
  created_at?: Maybe<Scalars['Int']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['numeric']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Campaign_Var_Pop_Fields = {
  __typename?: 'campaign_var_pop_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Campaign_Var_Samp_Fields = {
  __typename?: 'campaign_var_samp_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Campaign_Variance_Fields = {
  __typename?: 'campaign_variance_fields';
  created_at?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_atc_token?: Maybe<Scalars['Float']['output']>;
  total_earnings_amount_testnet_token?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

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

export type CampaignsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Campaign_Order_By> | Campaign_Order_By;
  where?: InputMaybe<Campaign_Bool_Exp>;
}>;


export type CampaignsListQuery = { __typename?: 'query_root', campaign_aggregate: { __typename?: 'campaign_aggregate', aggregate?: { __typename?: 'campaign_aggregate_fields', count: number } | null }, campaign: Array<{ __typename?: 'campaign', id: string, name: string, total_earnings_amount_testnet_token: any, total_earnings_percentage_testnet_token: string, total_earnings_amount_atc_token: any, total_earnings_percentage_atc_token: string, created_at: number, updated_at: number }> };

export type AccountsListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Order_By> | Account_Order_By;
  where?: InputMaybe<Account_Bool_Exp>;
}>;


export type AccountsListQuery = { __typename?: 'query_root', account_aggregate: { __typename?: 'account_aggregate', aggregate?: { __typename?: 'account_aggregate_fields', count: number } | null }, account: Array<{ __typename?: 'account', id: string, total_campaigns_participated: any, total_earnings_amount_testnet_token: any, total_earnings_percentage_testnet_token: string, total_earnings_amount_atc_token: any, total_earnings_percentage_atc_token: string, rank: any, created_at: number, updated_at: number }> };

export type AccountsPerCampaignListQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Account_Per_Campaign_Order_By> | Account_Per_Campaign_Order_By;
  where?: InputMaybe<Account_Per_Campaign_Bool_Exp>;
}>;


export type AccountsPerCampaignListQuery = { __typename?: 'query_root', account_per_campaign_aggregate: { __typename?: 'account_per_campaign_aggregate', aggregate?: { __typename?: 'account_per_campaign_aggregate_fields', count: number } | null }, account_per_campaign: Array<{ __typename?: 'account_per_campaign', id: string, account_id: string, campaign_id: string, total_earnings_amount_testnet_token: any, total_earnings_percentage_testnet_token: string, total_earnings_amount_atc_token: any, total_earnings_percentage_atc_token: string, rank: any, created_at: number, updated_at: number }> };
