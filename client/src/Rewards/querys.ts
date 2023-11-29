import { gql } from '@apollo/client'

export const QUERY_REWARDS_LIST = gql`
  query AccountsConnectionRewards($first: Int!, $after: String) {
    accountsConnection(
      orderBy: voteRewardsTotal_DESC
      where: { voteRewardsTotal_gt: "0", voteRewardsTotal_isNull: false }
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
        cursor
      }
    }
  }
`
