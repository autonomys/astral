import { gql } from '@apollo/client'

export const QUERY_REWARDS_LIST = gql`
  query AccountsConnectionRewards(
    $first: Int!
    $after: String
    $orderBy: [AccountRewardsOrderByInput!]!
    $where: AccountRewardsWhereInput
  ) {
    accountRewardsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
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
    $where: AccountRewardsWhereInput
  ) {
    accountRewardsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
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
  query OperatorsConnectionRewards(
    $first: Int!
    $after: String
    $orderBy: [OperatorRewardsOrderByInput!]!
    $where: OperatorRewardsWhereInput
  ) {
    operatorRewardsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
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
