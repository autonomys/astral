import { gql } from '@apollo/client'

export const QUERY_OPERATOR_LIST = gql`
  query OperatorsList(
    $limit: Int!
    $offset: Int
    $orderBy: [operator_order_by!]!
    $where: operator_bool_exp
  ) {
    operator_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    operator(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
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
      minimum_nominator_stake
      nomination_tax
      signing_key
      status
      raw_status
      updated_at
      nominators_aggregate {
        aggregate {
          count
        }
      }
      nominators(limit: 256) {
        id
        shares
      }
    }
  }
`

export const QUERY_OPERATOR_BY_ID = gql`
  query OperatorById($operatorId: String!) {
    operator_by_pk(id: $operatorId) {
      id
      account_id
      domain_id
      domain {
        id
        sort_id
      }
      current_epoch_rewards
      current_total_stake
      current_total_shares
      minimum_nominator_stake
      nomination_tax
      signing_key
      status
      raw_status
      updated_at
    }
  }
`

export const QUERY_OPERATOR_NOMINATORS_BY_ID = gql`
  query OperatorNominatorsById(
    $limit: Int!
    $offset: Int
    $orderBy: [nominator_order_by!]!
    $where: nominator_bool_exp
  ) {
    nominator_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    nominator(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      shares
      account_id
      domain_id
    }
  }
`

export const QUERY_NOMINATOR_CONNECTION_LIST = gql`
  query NominatorsConnection(
    $limit: Int!
    $offset: Int
    $orderBy: [nominator_order_by!]!
    $where: nominator_bool_exp
  ) {
    nominator_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    nominator(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      shares
      account_id
      domain_id
      operator {
        id
        account_id
        domain_id
        current_epoch_rewards
        current_total_stake
        current_total_shares
        minimum_nominator_stake
        nomination_tax
        signing_key
        status
        raw_status
        updated_at
      }
      updated_at
    }
  }
`

export const QUERY_DOMAIN_LAST_BLOCK = gql`
  query DomainsLastBlock {
    domain {
      id
      last_domain_block_number
      completed_epoch
    }
  }
`
