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
