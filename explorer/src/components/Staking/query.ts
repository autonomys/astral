import { gql } from '@apollo/client'

export const QUERY_NOMINATIONS_LIST = gql`
  query NominationsList(
    $limit: Int!
    $offset: Int
    $orderBy: [staking_nominators_order_by!]!
    $where: staking_nominators_bool_exp
  ) {
    staking_nominators_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    staking_nominators(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      account_id
      domain_id
      domain {
        id
        name
      }
      operator_id
      operator {
        id
        account_id
        status
        pending_action
        current_total_shares
      }
      known_shares
      known_storage_fee_deposit
      pending_amount
      pending_storage_fee_deposit
      pending_effective_domain_epoch
      total_withdrawal_amounts
      total_storage_fee_refund
      unlock_at_confirmed_domain_block_number
      pending_shares
      pending_storage_fee_refund
      total_deposits
      status
      pending_action
      created_at
      updated_at
      deposits {
        id
        amount
        storage_fee_deposit
        timestamp
        extrinsic_hash
        status
        created_at
        staked_at
        updated_at
      }
      withdrawals {
        id
        shares
        estimated_amount
        unlocked_amount
        unlocked_storage_fee
        timestamp
        withdraw_extrinsic_hash
        unlock_extrinsic_hash
        status
        created_at
        ready_at
        unlocked_at
        updated_at
      }
    }
  }
`

export const QUERY_OPERATOR_LIST = gql`
  query OperatorsList(
    $limit: Int!
    $offset: Int
    $orderBy: [staking_operators_order_by!]!
    $where: staking_operators_bool_exp
  ) {
    staking_operators_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    staking_operators(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      sort_id
      account_id
      domain_id
      domain {
        id
        sort_id
        last_domain_block_number
      }
      current_epoch_rewards
      current_total_stake
      current_total_shares
      current_share_price
      current_storage_fee_deposit
      minimum_nominator_stake
      nomination_tax
      signing_key
      status
      raw_status
      pending_action
      total_deposits
      total_estimated_withdrawals
      total_withdrawals
      total_tax_collected
      total_rewards_collected
      total_transfers_in
      transfers_in_count
      total_transfers_out
      transfers_out_count
      total_rejected_transfers_claimed
      rejected_transfers_claimed_count
      total_transfers_rejected
      transfers_rejected_count
      total_volume
      total_consensus_storage_fee
      total_domain_execution_fee
      total_burned_balance
      accumulated_epoch_shares
      accumulated_epoch_storage_fee_deposit
      active_epoch_count
      bundle_count
      last_bundle_at
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
      nominators(limit: 256) {
        id
        account_id
        known_shares
        unlock_at_confirmed_domain_block_number
      }
      created_at
      updated_at
    }
  }
`

export const QUERY_OPERATOR_BY_ID = gql`
  query OperatorById($operatorId: String!) {
    staking_operators_by_pk(id: $operatorId) {
      id
      account_id
      domain_id
      domain {
        id
        sort_id
      }
      bundle_count
      current_epoch_rewards
      current_total_stake
      current_total_shares
      current_share_price
      current_storage_fee_deposit
      minimum_nominator_stake
      total_rewards_collected
      total_consensus_storage_fee
      total_domain_execution_fee
      total_burned_balance
      total_tax_collected
      nomination_tax
      signing_key
      status
      raw_status
      pending_action
      last_bundle_at
      updated_at
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

export const QUERY_OPERATOR_NOMINATORS_BY_ID = gql`
  query OperatorNominatorsById(
    $limit: Int!
    $offset: Int
    $orderBy: [staking_nominators_order_by!]!
    $where: staking_nominators_bool_exp
  ) {
    staking_nominators_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    staking_nominators(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      known_shares
      account_id
      domain_id
    }
  }
`

export const QUERY_NOMINATOR_CONNECTION_LIST = gql`
  query NominatorsConnection(
    $limit: Int!
    $offset: Int
    $orderBy: [staking_nominators_order_by!]!
    $where: staking_nominators_bool_exp
  ) {
    staking_nominators_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    staking_nominators(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      known_shares
      account_id
      domain_id
      operator {
        id
        account_id
        domain_id
        current_epoch_rewards
        current_total_stake
        current_total_shares
        current_share_price
        minimum_nominator_stake
        nomination_tax
        signing_key
        status
        raw_status
        pending_action
        updated_at
      }
      updated_at
    }
  }
`

export const QUERY_DOMAIN_LAST_BLOCK = gql`
  query DomainsLastBlock {
    staking_domains {
      id
      last_domain_block_number
      completed_epoch
    }
  }
`