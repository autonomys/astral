import { gql } from '@apollo/client'

export const QUERY_OPERATOR_CONNECTION_LIST = gql`
  query OperatorsConnection($first: Int!, $after: String) {
    operatorsConnection(orderBy: id_ASC, first: $first, after: $after) {
      edges {
        node {
          id
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
      nominators(limit: 10) {
        id
        shares
        account {
          id
        }
      }
    }
  }
`
