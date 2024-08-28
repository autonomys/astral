import { gql } from '@apollo/client'

export const QUERY_STAKING_SUMMARY = gql`
  query StakingSummary($first: Int!, $subspaceAccount: String) {
    operator(
      order_by: { id: asc }
      limit: $first
      where: { account_id: { _eq: $subspaceAccount } }
    ) {
      id
      account_id
      domain_id
      current_total_stake
      current_total_shares
    }
    operator_aggregate(order_by: { id: asc }, where: { account_id: { _eq: $subspaceAccount } }) {
      aggregate {
        count
      }
    }
    nominator(
      order_by: { id: asc }
      limit: $first
      where: { account_id: { _eq: $subspaceAccount } }
    ) {
      id
      known_shares
      known_storage_fee_deposit
      account {
        id
      }
      operator {
        id
        account_id
        domain_id
        current_total_stake
        current_total_shares
      }
    }
    nominator_aggregate(order_by: { id: asc }, where: { account_id: { _eq: $subspaceAccount } }) {
      aggregate {
        count
      }
    }
  }
`
