import { gql } from '@apollo/client'

export const QUERY_ACCOUNT_LIST = gql`
  query Account($limit: Int!, $offset: Int!) {
    accounts(limit: $limit, offset: $offset, orderBy: total_DESC) {
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
      first: $first
      after: $after
      where: { total_isNull: false }
    ) {
      edges {
        cursor
        node {
          free
          id
          reserved
          total
          updatedAt
          extrinsics(limit: 300) {
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
  query AccountById($accountId: String!, $hexAddress: String!) {
    accountById(id: $accountId) {
      free
      reserved
      id
      total
      updatedAt
      extrinsics(limit: 10) {
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
    rewardEvents(limit: 10, where: { account: { id_eq: $hexAddress } }) {
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
      extrinsics(limit: 10) {
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
    rewardEvents(limit: 500, where: { timestamp_gte: $gte, account: { id_eq: $accountId } }) {
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
  query RewardsList($accountId: String!, $first: Int!, $after: String) {
    rewardEventsConnection(
      orderBy: id_ASC
      first: $first
      after: $after
      where: { account: { id_eq: $accountId } }
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
  query ExtrinsicsByAccountId($accountId: String!, $first: Int!, $after: String) {
    extrinsicsConnection(
      orderBy: indexInBlock_ASC
      first: $first
      after: $after
      where: { signer: { id_eq: $accountId } }
    ) {
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
