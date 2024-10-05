import { gql } from '@apollo/client'

export const QUERY_ACCOUNT_LIST = gql`
  query Account($limit: Int!, $offset: Int!) {
    accounts_accounts(
      limit: $limit
      offset: $offset
      order_by: { total: desc }
      where: { total: { _gt: "0" } }
    ) {
      free
      id
      reserved
      total
      updated_at
      extrinsics(limit: 100) {
        id
      }
    }
  }
`

export const QUERY_ACCOUNT_CONNECTION_LIST = gql`
  query AccountsConnection($limit: Int!, $offset: Int) {
    accounts_accounts_aggregate(where: { total: { _gt: "0" } }) {
      aggregate {
        count
      }
    }
    accounts_accounts(
      order_by: { total: desc }
      where: { total: { _gt: "0" } }
      limit: $limit
      offset: $offset
    ) {
      free
      free
      id
      reserved
      total
      updated_at
      extrinsics(limit: 300, order_by: { block_height: desc }) {
        id
        block {
          height
          hash
        }
        timestamp
      }
    }
  }
`

export const QUERY_ACCOUNT_BY_ID = gql`
  query AccountById($accountId: String!) {
    accounts_accounts_by_pk(id: $accountId) {
      free
      reserved
      id
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
    accounts_rewards(
      limit: 10
      order_by: { block_height: desc }
      where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }
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

// TODO: when gemini-2 static page PR is merged, remove this query
export const OLD_QUERY_ACCOUNT_BY_ID = gql`
  query OldAccountById($accountId: String!) {
    accounts_accounts_by_pk(id: $accountId) {
      free
      reserved
      id
      total
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
  }
`

export const QUERY_LAST_WEEK_REWARDS = gql`
  query LatestRewardsWeek($accountId: String!, $timestampComparison: timestamp_comparison_exp!) {
    accounts_rewards(
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
    $sortBy: [accounts_rewards_order_by!]!
  ) {
    accounts_rewards(
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
      block {
        height
        timestamp
      }
      index_in_block
    }
  }
`

export const QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID = gql`
  query AllRewardForAccountById($accountId: String!) {
    accounts_rewards(where: { account_id: { _eq: $accountId }, amount: { _gt: 0 } }, limit: 1) {
      id
      block_height
      index_in_block
      reward_type
      amount
      timestamp
    }
  }
`

export const QUERY_ACCOUNT_TRANSFERS = gql`
  query TransfersByAccountId(
    $limit: Int!
    $offset: Int
    $where: accounts_transfers_bool_exp
    $orderBy: [accounts_transfers_order_by!]!
  ) {
    accounts_transfers_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    accounts_transfers(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
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
