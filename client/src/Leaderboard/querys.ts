import { gql } from '@apollo/client'

export const QUERY_REWARDS_LIST = gql`
  query AccountsConnectionRewards($first: Int!, $after: String) {
    accountRewardsConnection(
      orderBy: amount_DESC
      first: $first
      after: $after
      where: { vote_gt: "0", vote_isNull: false, OR: { block_gt: "0", block_isNull: false } }
    ) {
      edges {
        cursor
        node {
          amount
          id
          block
          operator
          updatedAt
          vote
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

export const QUERY_NOMINATORS_REWARDS_LIST = gql`
  query AccountsNominatorsConnectionRewards(
    $first: Int!
    $after: String
    $orderBy: [AccountRewardsOrderByInput!]!
  ) {
    accountRewardsConnection(
      orderBy: $orderBy
      first: $first
      after: $after
      where: { operator_gt: "0", operator_isNull: false }
    ) {
      edges {
        cursor
        node {
          amount
          id
          block
          operator
          updatedAt
          vote
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

export const QUERY_OPERATORS_REWARDS_LIST = gql`
  query OperatorsConnectionRewards($first: Int!, $after: String) {
    operatorRewardsConnection(orderBy: amount_DESC, first: $first, after: $after) {
      edges {
        cursor
        node {
          amount
          id
          updatedAt
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
