import { gql } from '@apollo/client'

export const QUERY_REWARDS_LIST = gql`
  query AccountsConnectionRewards($first: Int!, $after: String) {
    accountsConnection(
      orderBy: total_DESC
      where: { total_gt: "0" }
      first: $first
      after: $after
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          blockRewardsTotal
          free
          id
          reserved
          total
          updatedAt
          voteRewardsTotal
        }
      }
    }
  }
`
