import { gql } from '@apollo/client'

export const QUERY_ACCOUNT_TRANSFERS = gql`
  query TransfersByAccountId(
    $limit: Int!
    $offset: Int
    $where: transfer_bool_exp
    $orderBy: [transfer_order_by!]!
  ) {
    transfer_aggregate(order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
    transfer(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      extrinsic_id
      event_id
      from
      to
      value
      fee
      success
      timestamp
      date
      created_at
    }
  }
`
