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
