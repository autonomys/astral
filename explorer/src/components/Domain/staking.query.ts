import { gql } from '@apollo/client'

export const QUERY_DOMAIN_LIST = gql`
  query DomainsList(
    $limit: Int!
    $offset: Int
    $orderBy: [domain_order_by!]!
    $where: domain_bool_exp
  ) {
    domain_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    domain(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sort_id
      name
      account_id
      bundle_count
      total_volume
      total_tax_collected
      total_rewards_collected
      total_domain_execution_fee
      total_deposits
      total_consensus_storage_fee
      total_burned_balance
      runtime_info
      runtime_id
      runtime
      last_domain_block_number
      last_bundle_at
      current_total_stake
      current_storage_fee_deposit
      created_at
      completed_epoch
      total_transfers_in
      transfers_in_count
      total_transfers_out
      transfers_out_count
      total_rejected_transfers_claimed
      rejected_transfers_claimed_count
      total_transfers_rejected
      transfers_rejected_count
      updated_at
      total_estimated_withdrawals
      total_withdrawals
      current_total_shares
      current_share_price
      accumulated_epoch_stake
      accumulated_epoch_storage_fee_deposit
      accumulated_epoch_rewards
      accumulated_epoch_shares
      current_epoch_duration
      last_epoch_duration
      last6_epochs_duration
      last144_epoch_duration
      last1k_epoch_duration
      operators_aggregate {
        aggregate {
          count
        }
      }
      nominators_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const QUERY_DOMAIN_STATUS = gql`
  query DomainsStatus(
    $limit: Int!
    $offset: Int
    $orderBy: [domain_order_by!]!
    $where: domain_bool_exp
  ) {
    domain(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      name
      last_domain_block_number
      completed_epoch
      current_epoch_duration
      last_epoch_duration
      last6_epochs_duration
      last144_epoch_duration
      last1k_epoch_duration
    }
  }
`

export const QUERY_DOMAIN_BY_ID = gql`
  query DomainById($domainId: String!) {
    domain_by_pk(id: $domainId) {
      id
      sort_id
      name
      account_id
      bundle_count
      total_volume
      total_tax_collected
      total_rewards_collected
      total_domain_execution_fee
      total_deposits
      total_consensus_storage_fee
      total_burned_balance
      runtime_info
      runtime_id
      runtime
      last_domain_block_number
      last_bundle_at
      current_total_stake
      current_storage_fee_deposit
      created_at
      completed_epoch
      total_transfers_in
      transfers_in_count
      total_transfers_out
      transfers_out_count
      total_rejected_transfers_claimed
      rejected_transfers_claimed_count
      total_transfers_rejected
      transfers_rejected_count
      updated_at
      total_estimated_withdrawals
      total_withdrawals
      accumulated_epoch_stake
      accumulated_epoch_storage_fee_deposit
      operators_aggregate {
        aggregate {
          count
        }
      }
      nominators_aggregate {
        aggregate {
          count
        }
      }
      deposits_aggregate {
        aggregate {
          count
        }
      }
      withdrawals_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`
