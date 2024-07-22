import { gql } from '@apollo/client'

export const QUERY_STAKING_HEADER = gql`
  query StakingHeader(
    $opOrderBy: [OperatorOrderByInput!]!
    $noOrderBy: [NominatorOrderByInput!]!
    $opWhere: OperatorWhereInput
    $noWhere: NominatorWhereInput
  ) {
    operatorsConnection(orderBy: $opOrderBy, first: 1, where: $opWhere) {
      totalCount
    }
    nominatorsConnection(orderBy: $noOrderBy, first: 1, where: $noWhere) {
      totalCount
    }
  }
`

export const QUERY_OPERATOR_CONNECTION_LIST = gql`
  query OperatorsConnection(
    $first: Int!
    $after: String
    $orderBy: [OperatorOrderByInput!]!
    $where: OperatorWhereInput
  ) {
    lastBlock: blocks(limit: 1, orderBy: height_DESC) {
      height
    }
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
    }
  }
`

export const QUERY_OPERATOR_NOMINATORS_BY_ID = gql`
  query OperatorNominatorsById(
    $first: Int!
    $after: String
    $orderBy: [NominatorOrderByInput!]!
    $where: NominatorWhereInput
  ) {
    nominatorsConnection(first: $first, after: $after, orderBy: $orderBy, where: $where) {
      edges {
        node {
          id
          shares
          account {
            id
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
