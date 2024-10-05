import { gql } from '@apollo/client'

export const QUERY_TOP_LEADERBOARD = gql`
  query AccountsTopLeaderboard($first: Int!) {
    farmers: accounts_rewards(
      order_by: { amount: desc }
      limit: $first
      where: {
        _or: [
          { reward_type: { _eq: "Rewards.VoteReward" } }
          { reward_type: { _eq: "Rewards.BlockReward" } }
        ]
      }
    ) {
      id
    }
  }
`

export const QUERY_PENDING_TX = gql`
  query PendingTransaction($subspaceAccount: String, $extrinsics: [String!]) {
    accounts_accounts(where: { id: { _eq: $subspaceAccount } }) {
      id
      extrinsics(where: { hash: { _in: $extrinsics } }) {
        hash
        success
        timestamp
        name
        events(limit: 1, order_by: { id: desc }) {
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
    consensus_extrinsics_aggregate(where: { signer: { _eq: $subspaceAccount } }) {
      aggregate {
        count
      }
    }
    extrinsics: consensus_extrinsics(
      order_by: { id: desc }
      limit: $first
      where: { signer: { _eq: $subspaceAccount } }
    ) {
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
`

export const QUERY_CHECK_ROLE = gql`
  query CheckRole($subspaceAccount: String!) {
    isFarmer: accounts_rewards(
      where: {
        _or: [
          { reward_type: { _eq: "Rewards.VoteReward" } }
          { reward_type: { _eq: "Rewards.BlockReward" } }
        ]
        account_id: { _eq: $subspaceAccount }
      }
      limit: 1
    ) {
      account {
        id
      }
    }
  }
`
