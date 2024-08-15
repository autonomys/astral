import { gql } from '@apollo/client'

export const QUERY_ACCOUNT_LIST = gql`
  query Account($limit: Int!, $offset: Int!) {
    accounts(limit: $limit, offset: $offset, orderBy: total_DESC, where: { total_gt: "0" }) {
      free
      id
      reserved
      total
      updatedAt
      extrinsics(limit: 100) {
        id
      }
    }
  }
`

export const QUERY_ACCOUNT_CONNECTION_LIST = gql`
  query AccountsConnection($first: Int!, $after: String) {
    accountsConnection(
      orderBy: total_DESC
      where: { total_gt: "0" }
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          free
          id
          reserved
          total
          updatedAt
          extrinsics(limit: 300, orderBy: block_height_DESC) {
            id
            block {
              height
              hash
            }
            timestamp
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`

export const QUERY_ACCOUNT_BY_ID = gql`
  query AccountById($accountId: String!) {
    accountById(id: $accountId) {
      free
      reserved
      id
      total
      nonce
      updatedAt
      extrinsics(limit: 10, orderBy: block_height_DESC) {
        hash
        id
        indexInBlock
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
    rewardEvents(
      limit: 10
      orderBy: block_height_DESC
      where: { account: { id_eq: $accountId }, amount_gt: 0 }
    ) {
      amount
      id
      indexInBlock
      name
      phase
      pos
      timestamp
      block {
        height
      }
    }
  }
`

export const QUERY_ACCOUNT_BY_ID_EVM = gql`
  query AccountByIdEVM($accountId: String!) {
    accountById(id: $accountId) {
      free
      reserved
      id
      total
      updatedAt
      extrinsics(limit: 10, orderBy: block_height_DESC) {
        hash
        id
        indexInBlock
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
    rewardEvents(
      limit: 10
      orderBy: block_height_DESC
      where: { account: { id_eq: $accountId }, amount_gt: 0 }
    ) {
      amount
      id
      indexInBlock
      name
      phase
      pos
      timestamp
      block {
        height
      }
    }
  }
`

// TODO: when gemini-2 static page PR is merged, remove this query
export const OLD_QUERY_ACCOUNT_BY_ID = gql`
  query OldAccountById($accountId: String!) {
    accountById(id: $accountId) {
      free
      reserved
      id
      total
      updatedAt
      extrinsics(limit: 10, orderBy: block_height_DESC) {
        hash
        id
        indexInBlock
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
  query LatestRewardsWeek($accountId: String!, $gte: DateTime!) {
    rewardEvents(
      limit: 500
      orderBy: block_height_DESC
      where: { timestamp_gt: $gte, account: { id_eq: $accountId }, amount_gt: 0 }
    ) {
      amount
      id
      indexInBlock
      name
      phase
      pos
      timestamp
      block {
        height
      }
    }
  }
`

export const QUERY_REWARDS_LIST = gql`
  query RewardsList(
    $accountId: String!
    $first: Int!
    $after: String
    $sortBy: [RewardEventOrderByInput!]!
  ) {
    rewardEventsConnection(
      orderBy: $sortBy
      first: $first
      after: $after
      where: { account: { id_eq: $accountId }, amount_gt: 0 }
    ) {
      totalCount
      edges {
        cursor
        node {
          amount
          id
          indexInBlock
          name
          phase
          pos
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
            updatedAt
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`

export const QUERY_ACCOUNT_EXTRINSICS = gql`
  query ExtrinsicsByAccountId(
    $first: Int!
    $after: String
    $where: ExtrinsicWhereInput
    $orderBy: [ExtrinsicOrderByInput!]!
  ) {
    extrinsicsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
      edges {
        node {
          id
          hash
          name
          success
          block {
            height
            timestamp
          }
          indexInBlock
        }
        cursor
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`

export const QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID = gql`
  query AllRewardForAccountById($accountId: String!) {
    accountRewards(where: { account: { id_eq: $accountId }, amount_gt: 0 }, limit: 1) {
      amount
      block
      id
      operator
      updatedAt
      vote
    }
  }
`
