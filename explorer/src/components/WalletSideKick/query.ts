import { gql } from '@apollo/client'

export const QUERY_TOP_LEADERBOARD = gql`
  query AccountsTopLeaderboard($first: Int!) {
    farmers: accountRewardsConnection(
      orderBy: amount_DESC
      first: $first
      where: { vote_gt: 0, vote_isNull: false, OR: { block_gt: 0, block_isNull: false } }
    ) {
      edges {
        cursor
        node {
          id
        }
      }
    }
    operators: operatorRewardsConnection(orderBy: amount_DESC, first: $first, where: {}) {
      edges {
        cursor
        node {
          amount
          id
        }
      }
    }
    nominators: accountRewardsConnection(
      orderBy: operator_DESC
      first: $first
      where: { operator_gt: 0, operator_isNull: false }
    ) {
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
`

export const QUERY_PENDING_TX = gql`
  query PendingTransaction($subspaceAccount: String, $extrinsics: [String!]) {
    accounts(where: { id_eq: $subspaceAccount }) {
      id
      extrinsics(where: { hash_in: $extrinsics }) {
        hash
        success
        timestamp
        name
        events(limit: 1, orderBy: id_DESC) {
          name
        }
        block {
          hash
          height
          id
        }
      }
    }
  }
`

export const QUERY_EXTRINSIC_SUMMARY = gql`
  query ExtrinsicsSummary($first: Int!, $subspaceAccount: String) {
    extrinsics: extrinsicsConnection(
      orderBy: id_DESC
      first: $first
      where: { signer: { id_eq: $subspaceAccount } }
    ) {
      edges {
        node {
          id
          hash
          success
          block {
            id
            timestamp
            height
          }
          name
        }
      }
      totalCount
    }
  }
`

export const QUERY_STAKING_SUMMARY = gql`
  query StakingSummary($first: Int!, $subspaceAccount: String) {
    operators: operatorsConnection(
      orderBy: id_ASC
      first: $first
      where: { operatorOwner_eq: $subspaceAccount }
    ) {
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
    nominators: nominatorsConnection(
      orderBy: id_ASC
      first: $first
      where: { account: { id_eq: $subspaceAccount } }
    ) {
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
            currentTotalStake
            totalShares
          }
        }
      }
      totalCount
    }
  }
`

export const QUERY_CHECK_ROLE = gql`
  query CheckRole($subspaceAccount: String!) {
    isFarmer: rewardEvents(
      where: { name_eq: "Rewards.VoteReward", account: { id_eq: $subspaceAccount } }
      limit: 1
    ) {
      account {
        id
      }
    }
  }
`
