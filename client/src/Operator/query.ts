import { gql } from '@apollo/client'

export const QUERY_OPERATOR_CONNECTION_LIST = gql`
  query OperatorsConnection(
    $first: Int!
    $after: String
    $orderBy: [OperatorOrderByInput!]!
    $where: OperatorWhereInput
  ) {
    operatorsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
      edges {
        node {
          id
          operatorOwner
          currentDomainId
          currentEpochRewards
          currentTotalStake
          minimumNominatorStake
          nextDomainId
          nominationTax
          signingKey
          status
          totalShares
          updatedAt
          nominators(limit: 256) {
            id
            shares
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

export const QUERY_OPERATOR_BY_ID = gql`
  query OperatorById($operatorId: String!) {
    operatorById(id: $operatorId) {
      id
      operatorOwner
      currentDomainId
      currentEpochRewards
      currentTotalStake
      minimumNominatorStake
      nextDomainId
      nominationTax
      signingKey
      status
      totalShares
      updatedAt
      nominators(limit: 300) {
        id
        shares
        account {
          id
        }
      }
    }
  }
`

export const QUERY_OPERATOR_CONNECTION_SUMMARY = gql`
  query OperatorsConnectionSummary(
    $first: Int!
    $orderBy: [OperatorOrderByInput!]!
    $where: OperatorWhereInput
  ) {
    operatorsConnection(orderBy: $orderBy, first: $first, where: $where) {
      edges {
        node {
          id
          operatorOwner
          currentDomainId
          currentTotalStake
          totalShares
        }
      }
      totalCount
    }
  }
`

export const QUERY_NOMINATOR_CONNECTION_LIST = gql`
  query NominatorsConnection(
    $first: Int!
    $after: String
    $orderBy: [NominatorOrderByInput!]!
    $where: NominatorWhereInput
  ) {
    nominatorsConnection(orderBy: $orderBy, first: $first, after: $after, where: $where) {
      edges {
        node {
          id
          shares
          account {
            id
          }
          operator {
            id
            operatorOwner
            currentDomainId
            currentEpochRewards
            currentTotalStake
            minimumNominatorStake
            nextDomainId
            nominationTax
            signingKey
            status
            totalShares
            updatedAt
          }
          updatedAt
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
