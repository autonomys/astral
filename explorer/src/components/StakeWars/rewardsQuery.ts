import { gql } from '@apollo/client'

export const GET_CURRENT_BLOCK_NUMBER = gql`
  query getCurrentBlockNumber {
    squidStatus {
      height
    }
  }
`

export const GET_ALL_OPERATORS = gql`
  query getAllOperators(
    $first: Int!
    $blockNumber_gte: Int
    $blockNumber_lte: Int
    $after: String
    $orderBy: [OperatorOrderByInput!]!
  ) {
    operatorsConnection(orderBy: $orderBy, first: $first, after: $after) {
      edges {
        node {
          updatedAt
          signingKey
          orderingId
          status
          totalShares
          operatorOwner
          nominatorAmount
          nominationTax
          nextDomainId
          minimumNominatorStake
          id
          currentTotalStake
          currentEpochRewards
          currentDomainId
          operatorRewards(
            where: {
              amount_gt: "0"
              blockNumber_gte: $blockNumber_gte
              blockNumber_lte: $blockNumber_lte
            }
          ) {
            amount
          }
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

export const GET_ALL_NOMINATORS = gql`
  query getAllNominators(
    $first: Int!
    $after: String
    $blockNumber_gte: Int
    $blockNumber_lte: Int
    $orderBy: [NominatorOrderByInput!]!
    $where: NominatorWhereInput
  ) {
    operatorsConnection(orderBy: orderingId_ASC) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          updatedAt
          signingKey
          orderingId
          status
          totalShares
          operatorOwner
          nominatorAmount
          nominationTax
          nextDomainId
          minimumNominatorStake
          id
          currentTotalStake
          currentEpochRewards
          currentDomainId
          operatorRewards(
            where: {
              amount_gt: "0"
              blockNumber_gte: $blockNumber_gte
              blockNumber_lte: $blockNumber_lte
            }
          ) {
            amount
          }
        }
      }
    }
    nominatorsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
      edges {
        cursor
        node {
          shares
          status
          updatedAt
          id
          operator {
            id
            currentDomainId
            currentTotalStake
            totalShares
          }
          account {
            id
          }
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
