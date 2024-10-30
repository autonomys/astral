import { gql } from '@apollo/client'

export const QUERY_ACCOUNTS = gql`
  query Accounts($limit: Int!, $offset: Int) {
    consensus_accounts_aggregate(where: { total: { _gt: "0" } }) {
      aggregate {
        count
      }
    }
    consensus_accounts(
      order_by: { total: desc }
      where: { total: { _gt: "0" } }
      limit: $limit
      offset: $offset
    ) {
      id
      free
      free
      reserved
      total
      updated_at
      extrinsics_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const QUERY_ACCOUNT_BY_ID = gql`
  query AccountById($accountId: String!) {
    consensus_accounts(where: { id: { _eq: $accountId } }) {
      id
      free
      reserved
      total
      nonce
      updated_at
      extrinsics(limit: 10, order_by: { block_height: desc }) {
        hash
        id
        index_in_block
        name
        success
        timestamp
        tip
        block {
          id
          height
        }
      }
    }
    consensus_rewards(
      limit: 10
      order_by: { block_height: desc }
      where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }
    ) {
      id
      blockHeight: block_height
      index_in_block
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
      index_in_block
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
    $sortBy: [consensus_rewards_order_by!]!
  ) {
    consensus_rewards_aggregate(where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }) {
      aggregate {
        count
      }
    }
    consensus_rewards(
      order_by: $sortBy
      limit: $limit
      offset: $offset
      where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }
    ) {
      id
      block_height
      index_in_block
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
      date
      created_at
    }
  }
`

export const QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID = gql`
  query AllRewardForAccountById($accountId: String!) {
    consensus_rewards(where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }, limit: 1) {
      id
      block_height
      index_in_block
      reward_type
      amount
      timestamp
    }
  }
`
