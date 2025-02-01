import { gql } from '@apollo/client'

export const QUERY_ACCOUNTS = gql`
  query Accounts(
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_accounts_order_by!]!
    $where: consensus_accounts_bool_exp
  ) {
    consensus_accounts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_accounts(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      nonce
      free
      reserved
      total
      createdAt: created_at
      updatedAt: updated_at
    }
  }
`

export const QUERY_ACCOUNT_BY_ID = gql`
  query AccountById($accountId: String!) {
    consensus_accounts_by_pk(id: $accountId) {
      id
      free
      reserved
      total
      nonce
    }
    consensus_rewards(
      limit: 10
      order_by: { block_height: desc }
      where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }
    ) {
      id
      blockHeight: block_height
      rewardType: reward_type
      amount
      timestamp
    }
  }
`

export const QUERY_LAST_WEEK_REWARDS = gql`
  query LatestRewardsWeek($accountId: String!, $timestampComparison: timestamp_comparison_exp!) {
    consensus_rewards(
      limit: 500
      order_by: { block_height: desc }
      where: {
        timestamp: $timestampComparison
        account_id: { _eq: $accountId }
        amount: { _gt: 0 }
      }
    ) {
      id
      block_height
      reward_type
      amount
      timestamp
    }
  }
`

export const QUERY_REWARDS_LIST = gql`
  query RewardsList(
    $accountId: String!
    $limit: Int!
    $offset: Int
    $orderBy: [consensus_rewards_order_by!]!
  ) {
    consensus_rewards_aggregate(where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }) {
      aggregate {
        count
      }
    }
    consensus_rewards(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }
    ) {
      id
      block_height
      reward_type
      amount
      timestamp
      block {
        hash
        id
        height
      }
      account {
        id
        free
        reserved
        total
        updated_at
      }
    }
  }
`

export const QUERY_ACCOUNT_EXTRINSICS = gql`
  query ExtrinsicsByAccountId(
    $limit: Int!
    $offset: Int
    $where: consensus_extrinsics_bool_exp
    $orderBy: [consensus_extrinsics_order_by!]!
  ) {
    consensus_extrinsics_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_extrinsics(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sort_id
      hash
      name
      success
      block_height
      timestamp
      index_in_block
    }
  }
`

export const QUERY_ACCOUNT_TRANSFERS = gql`
  query TransfersByAccountId(
    $limit: Int!
    $offset: Int
    $where: consensus_transfers_bool_exp
    $orderBy: [consensus_transfers_order_by!]!
  ) {
    consensus_transfers_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_transfers(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      extrinsic_id
      event_id
      from
      to
      value
      fee
      success
      timestamp
      block_height
    }
  }
`

export const QUERY_ACCOUNT_BALANCE_HISTORY = gql`
  query BalanceHistoryByAccountId(
    $limit: Int!
    $offset: Int
    $where: consensus_account_histories_bool_exp
    $orderBy: [consensus_account_histories_order_by!]!
  ) {
    consensus_account_histories_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consensus_account_histories(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id: uuid
      reserved
      total
      nonce
      free
      created_at
      _block_range
    }
  }
`
