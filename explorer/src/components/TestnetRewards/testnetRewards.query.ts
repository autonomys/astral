import { gql } from '@apollo/client'

export const QUERY_CAMPAIGNS_LIST = gql`
  query CampaignsList(
    $limit: Int!
    $offset: Int
    $orderBy: [campaign_order_by!]!
    $where: campaign_bool_exp
  ) {
    campaign_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    campaign(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      name
      total_earnings_amount_testnet_token
      total_earnings_percentage_testnet_token
      total_earnings_amount_atc_token
      total_earnings_percentage_atc_token
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNTS_LIST = gql`
  query AccountsList(
    $limit: Int!
    $offset: Int
    $orderBy: [account_order_by!]!
    $where: account_bool_exp
  ) {
    account_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      total_campaigns_participated
      total_earnings_amount_testnet_token
      total_earnings_percentage_testnet_token
      total_earnings_amount_atc_token
      total_earnings_percentage_atc_token
      rank
      created_at
      updated_at
    }
  }
`

export const QUERY_ACCOUNTS_PER_CAMPAIGN_LIST = gql`
  query AccountsPerCampaignList(
    $limit: Int!
    $offset: Int
    $orderBy: [account_per_campaign_order_by!]!
    $where: account_per_campaign_bool_exp
  ) {
    account_per_campaign_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    account_per_campaign(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      account_id
      campaign_id
      total_earnings_amount_testnet_token
      total_earnings_percentage_testnet_token
      total_earnings_amount_atc_token
      total_earnings_percentage_atc_token
      rank
      created_at
      updated_at
    }
  }
`
